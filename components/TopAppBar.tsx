'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface TopAppBarProps {
  title?: string;
}

export default function TopAppBar({ title }: TopAppBarProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="relative flex flex-row items-center justify-center w-full my-6">
      {/* 뒤로가기 버튼 */}
      <button onClick={handleGoBack} className="absolute left-0">
        <Image
          src={'/icons/chevron-left.svg'}
          alt={'chevron left btn'}
          width={24}
          height={24}
        />
      </button>
      {/* 가운데 타이틀 */}
      {title && (
        <span className="text-bd1-regular text-black text-center">{title}</span>
      )}
    </div>
  );
}
