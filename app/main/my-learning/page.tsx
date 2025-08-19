'use client';

import MotionFadeIn from '@/components/_animations/MotionFadeIn';
import CharacterFrontText from './_components/CharacterFrontText';
import LevelButton from './_components/roadmap/LevelButton';
import { useUserStore } from '@/stores/userStore';

export default function MyLearningPage() {
  const { username } = useUserStore();
  const levelData = [
    { text: '학교에 가자!', subText: "Let's go to School!" },
    { text: '숙제를 하자!', subText: "Let's do Homework!" },
    { text: '책 읽기', subText: 'Reading Books' },
    { text: '운동하기', subText: 'Exercise Time' },
    { text: '음악 듣기', subText: 'Listening Music' },
    { text: '영화 보기', subText: 'Watch a Movie' },
    { text: '친구 만나기', subText: 'Meeting Friends' },
    { text: '게임 하기', subText: 'Play Games' },
  ];

  const currentLevel = 1; // 현재 레벨 예시

  return (
    <div className="h-screen flex flex-col scrollbar-hide">
      {/* 캐릭터 인사말 */}
      <MotionFadeIn>
        <CharacterFrontText
          title={`${username}! 오늘도 왔구나!`}
          subtitle={'Lets do this together!'}
          audio
        />
      </MotionFadeIn>

      {/* 스크롤 가능한 roadmap 영역 */}
      <div className="flex-1 overflow-y-auto pb-40 scrollbar-hide">
        <div className="flex flex-col-reverse gap-3 ">
          {levelData.map((level, idx) => {
            const levelNum = idx + 1;
            const status =
              levelNum === currentLevel
                ? 'current'
                : levelNum < currentLevel
                  ? 'complete'
                  : 'locked';

            return (
              <div
                key={levelNum}
                className={`flex w-full  ${
                  levelNum % 2 === 0 ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className="w-1/2 relative">
                  {/* LevelButton 그림자와 UI 자체는 LevelButton 내부에서 처리 */}
                  <LevelButton
                    text={level.text}
                    subText={level.subText}
                    status={status}
                    levelNum={levelNum}
                    className="w-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
