import { motion } from 'framer-motion';
import { CSSProperties, ReactNode } from 'react';

interface MotionFadeInProps {
  children: ReactNode;
  initial?: any;
  animate?: any;
  transition?: any;
  className?: string;
  style?: CSSProperties;
}

export default function MotionFadeIn({
  children,
  initial = { opacity: 0, y: 10 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.6, delay: 0.2, ease: 'easeIn' },
  className,
  style,
}: MotionFadeInProps) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
