'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export default function NavigationBar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: '나의 학습',
      href: ROUTES.MAIN.MY_LEARNING.ROOT,
      icon: '/icons/nav-book.svg',
    },
    {
      label: '대화',
      href: ROUTES.MAIN.CONVERSATION,
      icon: '/icons/nav-phone.svg',
    },
    {
      label: '마이페이지',
      href: ROUTES.MAIN.MY_PAGE,
      icon: '/icons/nav-user.svg',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white-70 border-t border-gray-900 flex justify-around items-center h-18">
      {navItems.map(item => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center gap-2"
          >
            <Image src={item.icon} alt={item.label} width={24} height={24} />
            <span
              className={
                isActive
                  ? 'text-secondary-400 text-cp2-bold'
                  : 'text-gray-500 text-cp2-regular'
              }
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
