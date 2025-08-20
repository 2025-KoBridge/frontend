import { FONT_CLASS } from '@/constants/languages';
import { useLanguageStore } from '@/stores/languageStore';
import Image from 'next/image';

interface CharacterTextProps {
  title: string;
  subtitle: string;
  audio?: boolean;
  image?: string;
  className?: string;
}

export default function CharacterLevelText({
  title,
  subtitle,
  audio = false,
  image = '/character/default.webp',
  className,
}: CharacterTextProps) {
  const { currentLanguage } = useLanguageStore();

  return (
    <div
      className={`flex flex-row w-full items-center-safe gap-2 mt-6 ${className}`}
    >
      {/* 캐릭터 이미지 */}
      {image && (
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <Image src={image} alt="character" width={118} height={118} />
        </div>
      )}
      {/* 텍스트 영역 */}
      <div className="text-left px-5 py-2 bg-white-70 rounded-t-2xl rounded-br-2xl rounded-bl-sm">
        <h2 className="text-secondary-300 text-bd2-bold flex items-center gap-1">
          {title}
          {audio && (
            <Image
              src="/icons/audio.svg"
              alt="audio icon"
              width={20}
              height={20}
              className="mb-1"
            />
          )}
        </h2>
        {/* 구분선 */}
        <div className="w-full border-b border-dashed border-gray-700 my-1"></div>
        <p
          className={`text-gray-500 text-trans-cp2-regular mt-1 ${FONT_CLASS[currentLanguage.code]}`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
