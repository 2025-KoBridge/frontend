import Image from 'next/image';

export default function TopAppBar() {
  return (
    <div className="flex flex-row items-center h-14 p-4">
      <button>
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
