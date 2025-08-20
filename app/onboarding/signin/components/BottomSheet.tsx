'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bottomSheetVariants } from '@/components/_animations/bottomSheetMotion';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subText: string;
  children?: ReactNode;
}

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  subText,
  children,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [sheetHeight, setSheetHeight] = useState<number | 'auto'>('auto');

  // 내용 높이 자동 감지
  useEffect(() => {
    if (sheetRef.current) {
      const contentHeight = sheetRef.current.scrollHeight;
      const maxHeight = window.innerHeight * 0.9; // 화면 최대 90%
      setSheetHeight(contentHeight > maxHeight ? maxHeight : contentHeight);
    }
  }, [children, isOpen]);

  // body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 스크롤 조금만 내려도 닫기
  useEffect(() => {
    const el = sheetRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (el.scrollTop > 10) {
        onClose();
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [onClose, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="bottomSheet"
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 배경 */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            aria-hidden="true"
          />
          <motion.div
            ref={sheetRef}
            className="relative w-full bg-white rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto"
            variants={bottomSheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
            style={{ whiteSpace: 'pre-line' }}
            transition={{ type: 'spring', stiffness: 100 }}
            // drag="y"
            // dragConstraints={{ top: 0, bottom: 0 }} // 위로는 못 끌고, 아래로만
            // dragElastic={0.1} // 살짝 탄성
            // onDragEnd={(event, info) => {
            //   if (info.offset.y > 50) {
            //     // 50px 이상 아래로 끌면 닫힘
            //     onClose();
            //   }
            // }}
          >
            {/* 회색 그랩바 */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1.25 bg-gray-700 rounded-full" />

            <h3 className="text-bd1-bold text-black mt-2">{title}</h3>
            <h4 className="pt-3 text-trans-cp2-regular text-gray-500">
              {subText}
            </h4>
            <div className="mt-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
