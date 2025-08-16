'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TopAppBar() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-row items-center h-14 p-4">
      <button onClick={handleGoBack}>
        <Image
          src={'/icons/chevron-left.svg'}
          alt={'chevron left btn'}
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
