import { ReactNode } from 'react';

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col items-center bg-gradient">
      {children}
    </div>
  );
}
