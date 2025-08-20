import { ReactNode } from 'react';

export default function CallingLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex flex-col w-svw h-svh -mx-4 px-4 bg-center bg-cover"
      style={{ backgroundImage: "url('/character/bg.webp')" }}
    >
      <main className="flex flex-col h-full w-full">{children}</main>
    </div>
  );
}
