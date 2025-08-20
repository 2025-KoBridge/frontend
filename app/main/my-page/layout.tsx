import { ReactNode } from 'react';

export default function MyPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-svh w-svw bg-white -mx-4">{children}</div>
  );
}
