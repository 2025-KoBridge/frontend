'use client';

import { useEffect, useRef } from 'react';
import MotionFadeIn from '@/components/_animations/MotionFadeIn';
import CharacterFrontText from './_components/CharacterFrontText';
import LevelButton from './_components/roadmap/LevelButton';
import { useUserStore } from '@/stores/userStore';

export default function MyLearningPage() {
  const { username } = useUserStore();
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // 부드러운 스크롤 함수
  const smoothScrollTo = (
    container: HTMLElement,
    target: number,
    duration: number,
  ) => {
    const start = container.scrollTop;
    const change = target - start;
    let currentTime = 0;
    const increment = 16; // 약 60fps

    const animateScroll = () => {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);
      container.scrollTop = val;

      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };
    animateScroll();
  };

  // easing 함수
  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  //TODO: 사용자 진도로 자동 스크롤, 커스텀 훅 혹은 유틸로 리팩토링
  useEffect(() => {
    const smoothScrollTo = (
      container: HTMLElement,
      target: number,
      duration: number,
    ) => {
      const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const start = container.scrollTop;
      const change = target - start;
      let currentTime = 0;
      const increment = 16;

      const animateScroll = () => {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        container.scrollTop = val;

        if (currentTime < duration) {
          requestAnimationFrame(animateScroll);
        }
      };
      animateScroll();
    };

    const timer = setTimeout(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const levelElement = container.querySelector(
          `[data-level='${currentLevel}']`,
        ) as HTMLElement | null;

        if (levelElement) {
          const targetTop =
            levelElement.offsetTop -
            container.offsetTop -
            container.clientHeight / 2 +
            levelElement.clientHeight / 2;
          const maxScroll = container.scrollHeight - container.clientHeight;
          const scrollPosition = Math.min(Math.max(targetTop, 0), maxScroll);
          smoothScrollTo(container, scrollPosition, 1000);
        }
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [currentLevel]);

  return (
    <div className="h-screen flex flex-col scrollbar-hide">
      <MotionFadeIn>
        <CharacterFrontText
          title={`${username}! 오늘도 왔구나!`}
          subtitle={'Lets do this together!'}
          audio
        />
      </MotionFadeIn>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto pb-40 scrollbar-hide"
      >
        <div className="flex flex-col-reverse gap-3">
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
                data-level={levelNum}
                className={`flex w-full ${
                  levelNum % 2 === 0 ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className="w-1/2 relative">
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
