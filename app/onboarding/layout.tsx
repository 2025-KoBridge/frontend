import { ReactNode } from 'react';

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[100svh] flex-col items-center bg-gradient">
      {children}
    </div>
  );
}
