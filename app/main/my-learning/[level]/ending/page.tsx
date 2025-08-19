'use client';

import TitleText from '@/components/TitleText';
import { useLanguageStore } from '@/stores/languageStore';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/buttons/_index';
import MotionFadeIn from '@/components/_animations/MotionFadeIn';
import CharacterText from '@/components/CharacterText';
import { useLevelParam } from '@/hooks/useLevelParam';

export default function LevelCompletionPage() {
  const router = useRouter();
  const { currentLanguage } = useLanguageStore();
  const levelParam = useLevelParam();

  const handleBtnClick = () => {
    router.push(ROUTES.MAIN.ROOT);
  };

  return (
    <>
      <MotionFadeIn>
        <TitleText
          title={
            <>
              <span className="text-secondary-300">Lv. {levelParam}</span>
              완료!
            </>
          }
          subText={{
            en: `Level ${levelParam} Done!`,
            jp: `レベル ${levelParam} 完了!`,
            vt: `Hoàn thành Level ${levelParam}!`,
            chn: `第 ${levelParam} 关完成!`,
          }}
          lang={currentLanguage.code}
          className="mt-26 mb-8"
        />
        <CharacterText
          title={'내일도 즐겁게 공부해 보자!'}
          subtitle={"Let's have fun studying tomorrow!"}
          audio
        />
      </MotionFadeIn>
      {/* 하단 버튼 */}
      <div className="mt-auto pb-6">
        <Button
          text={'완료'}
          iconPath="/icons/arrow-right.svg"
          onClick={handleBtnClick}
        />
      </div>
    </>
  );
}
