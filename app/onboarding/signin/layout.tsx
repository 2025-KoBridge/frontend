import TopAppBar from '@/components/TopAppBar';
import { ReactNode } from 'react';

export default function SigninLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-svh w-svw bg-bg-solid px-4">
      <TopAppBar />
      {children}
    </div>
  );
}
