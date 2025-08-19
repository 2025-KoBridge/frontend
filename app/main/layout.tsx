'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import NavigationBar from './_components/NavigationBar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  // 네비바를 보여줄 루트 경로
  const showNavbarRoots = [
    '/main/my-learning',
    '/main/conversation',
    '/main/my-page',
  ];

  // 네비바를 숨길 하위 경로 패턴
  const hideNavbarPaths = ['/main/my-learning/level-'];

  // show 조건: 루트 경로 포함 + 숨김 패턴 미포함
  const showNavbar =
    showNavbarRoots.some(root => pathname === root) &&
    !hideNavbarPaths.some(pattern => pathname.startsWith(pattern));

  return (
    <div className="flex flex-col h-svh w-svw px-4 bg-gradient-reverse">
      <main className="flex-1">{children}</main>
      {showNavbar && <NavigationBar />}
    </div>
  );
}
