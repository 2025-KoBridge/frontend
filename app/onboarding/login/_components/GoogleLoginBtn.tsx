'use client';

import Image from 'next/image';
import { useState } from 'react';

interface GoogleSignInButtonProps {
  onClick?: () => void;
}

export default function GoogleSignInButton({
  onClick,
}: GoogleSignInButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      // Mobile
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      // Desktop
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        flex items-center justify-center gap-3 w-screen max-w-92 py-3 rounded-2xl
        bg-white text-black text-bd2-bold
        transition-all duration-150
        ${isPressed ? 'translate-y-1' : 'shadow-gray-900 shadow-lg'}
        hover:shadow-lg
      `}
    >
      <Image
        src="/icons/google-logo.svg"
        alt="Google"
        width={17.64}
        height={18}
      />
      Sign in with Google
    </button>
  );
}
