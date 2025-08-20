'use client';

import { ROUTES } from '@/constants/routes';
import {
  motion,
  useAnimation,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function SwipeButton() {
  const pathname = usePathname();

  const trackRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);

  const controls = useAnimation();
  const x = useMotionValue(0);

  const [maxX, setMaxX] = useState(180); // fallback
  const [completed, setCompleted] = useState(false);

  // 트랙과 노란원 실제 너비로 최대 이동거리 계산
  useEffect(() => {
    const measure = () => {
      const trackW = trackRef.current?.offsetWidth ?? 244;
      const knobW = knobRef.current?.offsetWidth ?? 56; // w-14 = 56px
      setMaxX(trackW - knobW);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // 라우트 바뀔 때/초기 마운트 때 항상 리셋
  useEffect(() => {
    setCompleted(false);
    x.set(0);
    controls.set({ x: 0 });
  }, [pathname, controls, x]);

  // bfcache로 뒤로가기 복귀 시에도 리셋
  useEffect(() => {
    const onPageShow = () => {
      setCompleted(false);
      x.set(0);
      controls.set({ x: 0 });
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, [controls, x]);

  // x 변화 구독: 끝에 '도착'하면 트리거
  useMotionValueEvent(x, 'change', latest => {
    if (!completed && latest >= maxX - 1) {
      setCompleted(true);
      window.location.href = ROUTES.MAIN.CONVERSATION.CALLING;
    }
  });

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[244px]">
        {/* 회색 트랙 */}
        <div
          ref={trackRef}
          className="h-[43px] rounded-full bg-gray-950 flex items-center"
        >
          <span className="ml-16 text-gray-500 text-bd2-regular">
            밀어서 시작하기 →
          </span>
        </div>

        {/* 노란 원 아이콘 */}
        <motion.div
          ref={knobRef}
          drag="x"
          style={{ x }}
          dragConstraints={{ left: 0, right: maxX }}
          dragElastic={0.1}
          onDragEnd={() => {
            if (!completed) {
              // 끝에 못 닿았으면 '툭!' 하고 복귀
              controls.start({
                x: 0,
                transition: { duration: 0.15, ease: 'easeOut' },
              });
            }
          }}
          animate={controls}
          className="absolute top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary flex items-center justify-center cursor-pointer"
        >
          <Image
            src="/icons/nav-phone-blue.svg"
            alt="phone"
            width={24}
            height={24}
          />
        </motion.div>
      </div>
    </div>
  );
}
