'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const showLogoPaths = ['/onboarding', '/onboarding/login']; // 로고를 보여줄 페이지
  const showLogo = showLogoPaths.includes(pathname);

  return (
    <div className="flex min-h-svh flex-col items-center bg-gradient">
      {showLogo && (
        <div className="mt-38 text-h1-bold text-black ">KoBridge LOGO</div>
      )}
      {children}
    </div>
  );
}
