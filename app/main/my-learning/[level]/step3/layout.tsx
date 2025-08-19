import TopAppBar from '@/components/TopAppBar';
import { ReactNode } from 'react';

export default function LevelStep3Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col w-svw bg-bg-solid -mx-4 px-4">
      <TopAppBar title="마무리" />
      {children}
    </div>
  );
}
