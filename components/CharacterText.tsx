import { FONT_CLASS } from '@/constants/languages';
import { useLanguageStore } from '@/stores/languageStore';
import Image from 'next/image';

interface CharacterTextProps {
  title: string;
  subtitle: string;
  audio?: boolean;
  image?: string; // 이미지 URL
}

export default function CharacterText({
  title,
  subtitle,
  audio = false,
  image = '/character/default.webp', // 기본 이미지 URL
}: CharacterTextProps) {
  const { currentLanguage } = useLanguageStore();

  return (
    <div className="flex flex-col items-center p-4 w-full">
      {/* 텍스트 영역 */}
      <div className="text-center mb-4 px-6 py-4 bg-white rounded-2xl">
        <h2 className="text-secondary-300 text-lg font-bold flex items-center justify-center gap-1">
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
          className={`text-gray-400 text-sm mt-1 ${FONT_CLASS[currentLanguage.code]}`}
        >
          {subtitle}
        </p>
      </div>
      {/* 캐릭터 이미지 */}
      {image && (
        <div className="w-29.5 h-29.5 rounded-full overflow-hidden">
          <Image src={image} alt="character" width={118} height={118} />
        </div>
      )}
    </div>
  );
}
