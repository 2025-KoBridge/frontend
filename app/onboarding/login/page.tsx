'use client';

import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import GoogleSignInButton from './_components/GoogleLoginBtn';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center  justify-center h-svh bg-gradient gap-16">
      {/* Logo */}
      <motion.div
        initial={{ scale: 1, y: 144 }}
        animate={{ scale: 0.65, y: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className=""
      >
        <Logo />
      </motion.div>
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5, ease: 'easeIn' }}
        className="flex flex-col items-center gap-2 "
      >
        <h1 className="text-h1-bold text-black">안녕하세요, 반가워요!</h1>
        <p className="text-trans-cp1-regular text-gray-500">
          Hello, nice to meet you!
        </p>
      </motion.div>
      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.4, ease: 'easeIn' }}
        className="mt-10"
      >
        <GoogleSignInButton />
      </motion.div>
    </div>
  );
}
