import TopAppBar from '@/components/TopAppBar';
import { ReactNode } from 'react';

export default function LevelIntro1Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col h-svh w-svw bg-bg-solid -mx-4 px-4">
      <TopAppBar title="따라하기" />
      {children}
    </div>
  );
}
