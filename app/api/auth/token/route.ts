import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { ROUTES } from '@/constants/routes';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const jwt = await getToken({ req, secret: process.env.AUTH_SECRET });
  const idTokenGoogle = (jwt as any)?.idToken;

  if (!idTokenGoogle) {
    return NextResponse.redirect(
      new URL('/onboarding/login?error=no-token', req.url),
    );
  }

  const headers: Record<string, string> = { accept: 'application/json' };
  if (idTokenGoogle) headers['id-token'] = idTokenGoogle;

  let resp: Response;
  try {
    resp = await fetch(`${process.env.API_BASE}/user/google-login`, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });
  } catch (e: any) {
    console.error('[auth/token] backend fetch error', { msg: e?.message });
    return NextResponse.redirect(
      new URL('/onboarding/login?error=exchange-network', req.url),
    );
  }

  if (!resp.ok) {
    const body = await resp.text().catch(() => '');
    console.error('[auth/token] exchange failed', {
      status: resp.status,
      body,
    });
    return NextResponse.redirect(
      new URL('/onboarding/login?error=exchange-failed', req.url),
    );
  }

  const json = await resp.json().catch(() => null);
  const data = json?.data ?? {};
  const { accessToken, refreshToken, firstLogin } = data as {
    accessToken?: string;
    refreshToken?: string;
    firstLogin?: boolean;
  };

  const nextPath = firstLogin
    ? ROUTES.ONBOARDING.SIGNIN.getStep(1)
    : ROUTES.MAIN.ROOT;
  const res = NextResponse.redirect(new URL(nextPath, req.url));

  return res;
}
