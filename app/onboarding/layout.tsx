import { ReactNode } from 'react';

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col h-svh w-svw px-4 bg-gradient">{children}</div>
  );
}
