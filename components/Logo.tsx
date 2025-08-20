'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo() {
  return (
    <motion.div layoutId="app-logo">
      <Image src="/icons/logo.svg" alt="logo" width={290} height={66} />
    </motion.div>
  );
}
