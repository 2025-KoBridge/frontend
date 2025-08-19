'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number; // 자동 닫힘 시간 (ms)
}

export default function Toast({
  message,
  isOpen,
  onClose,
  duration = 2000,
}: ToastProps) {
  // 일정 시간 후 자동 닫기
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  return (
    <div className="flex justify-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: -50 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-10 px-6 py-1 rounded-full shadow-lg z-50 text-bd2-regular bg-black-70 text-white"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
