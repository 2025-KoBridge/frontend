'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import { ROUTES } from '@/constants/routes';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // TODO: 로그인 여부에 따라 라우팅, 로컬에 로그인 상태 여부 저장
      const isLoggedIn = false;
      // TODO: 메인 홈 라우트 구현 및 상수화
      router.push(isLoggedIn ? '/main' : ROUTES.ONBOARDING.LOGIN);
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-svh flex-col items-center justify-center bg-gradient">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
      >
        <Logo />
      </motion.div>
    </div>
  );
}
