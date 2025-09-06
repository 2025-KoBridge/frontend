'use server';
import { signIn } from '@/app/api/auth/[...nextauth]/auth';
import { API } from '@/constants/routes';

export async function signInWithGoogle() {
  await signIn('google', { redirectTo: API.AUTH.TOKEN });
}
