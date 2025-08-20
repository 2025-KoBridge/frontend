import ProgressBar from '@/components/ProgressBar';
import TopAppBar from '@/components/TopAppBar';
import { ReactNode } from 'react';

export default function VoiceSelectLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col h-svh w-svw bg-bg-solid -mx-4 px-4">
      <TopAppBar />
      <ProgressBar totalSteps={1} currentStep={1} className="mt-2" />
      {children}
    </div>
  );
}
