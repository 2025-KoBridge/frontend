'use client';

import { useEffect, useRef } from 'react';
import MotionFadeIn from '@/components/_animations/MotionFadeIn';
import CharacterFrontText from './_components/CharacterFrontText';
import LevelButton from './_components/roadmap/LevelButton';
import { useUserStore } from '@/stores/userStore';

export default function MyLearningPage() {
  const { username, currentLevel } = useUserStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const levelData = [
    { text: '학교에 가자!', subText: "Let's go to school!" },
    { text: '친구랑 인사하기', subText: 'Greeting with a friend' },
    { text: '밥 먹으러 가자!', subText: "Let's go eat!" },
    { text: '길을 물어보기', subText: 'Asking for directions' },
    { text: '가족 소개하기', subText: 'Introducing family' },
    { text: '날씨 이야기', subText: 'Talking about the weather' },
    { text: '쇼핑하기', subText: 'Going shopping' },
    { text: '취미 이야기', subText: 'Talking about hobbies' },
    { text: '시간 말하기', subText: 'Telling the time' },
    { text: '병원 가기', subText: 'Going to the hospital' },
    // { text: '교통수단 이용하기', subText: 'Using transportation' },
    // { text: '음식 주문하기', subText: 'Ordering food' },
    // { text: '학교 생활 이야기', subText: 'Talking about school life' },
    // { text: '수학여행 가기', subText: 'Going on a school trip' },
    // { text: '미래 꿈 이야기', subText: 'Talking about future dreams' },
  ];

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
