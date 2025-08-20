'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useCallStore } from '@/stores/callStore';

export default function CallingPage() {
  const router = useRouter();
  const decrementCall = useCallStore(state => state.decrementCall);
  const [showConnecting, setShowConnecting] = useState(true);
  const [callTime, setCallTime] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConnecting(false);
      setCallTime(0);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: number | undefined;

    if (!showConnecting) {
      interval = window.setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval !== undefined) {
        window.clearInterval(interval);
      }
    };
  }, [showConnecting]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(1, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleEndCall = () => {
    decrementCall();
    router.replace(ROUTES.MAIN.CONVERSATION.ROOT);
  };

  return (
    <div className="flex flex-col h-full relative">
      {showConnecting ? (
        // 연결 중 모션
        <motion.div
          className="text-center text-white mt-45 mb-12"
          animate={{ y: [0, -5, 0], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <h1 className="text-h1-bold">코디에게 연결 중...</h1>
          <h2>Connecting the call to Kody...</h2>
        </motion.div>
      ) : (
        <>
          {/* 통화 시작 텍스트 모션 */}
          <motion.div
            className="text-center text-white mt-12 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className="text-bd1-regular">{formatTime(callTime)}</p>
            <h1 className="text-h2-bold mt-6">코디</h1>
            <h2>Kody</h2>
          </motion.div>

          {/* 캐릭터 번역 텍스트 모션 */}
          <motion.div
            className="mb-4 px-6 py-3 bg-white-70 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 3 }} //TODO: 시간 조절
          >
            <h2 className="text-secondary-300 text-bd1-bold gap-1">
              안녕! 오늘은 어떤 얘기할래?
            </h2>
            <div className="w-full border-b border-dashed border-gray-700 my-1"></div>
            <p className="text-gray-500 text-trans-cp2-regular mt-1">
              What do you want to talk about today?
            </p>
          </motion.div>
        </>
      )}

      {/* 이미지 영역 */}
      <motion.div
        className="flex flex-col items-center relative h-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: showConnecting ? 0 : 0.3 }}
      >
        <Image
          src={'/character/default.webp'}
          alt={'character profile'}
          width={118}
          height={118}
          className="rounded-full"
        />

        <Image
          src={'/icons/call-end.svg'}
          alt={'call end'}
          width={59}
          height={59}
          className="mt-auto mb-20 cursor-pointer"
          onClick={handleEndCall}
        />
      </motion.div>
    </div>
  );
}
