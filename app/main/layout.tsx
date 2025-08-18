import { ReactNode } from 'react';
import NavigationBar from './_components/NavigationBar';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-svh w-svw px-4 bg-gradient-reverse">
      {children}
      <NavigationBar />
    </div>
  );
}
