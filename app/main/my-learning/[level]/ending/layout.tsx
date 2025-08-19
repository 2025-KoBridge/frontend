import { ReactNode } from 'react';

export default function LevelCompleteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col h-svh w-svw bg-gradient -mx-4 px-4">
      {children}
    </div>
  );
}
