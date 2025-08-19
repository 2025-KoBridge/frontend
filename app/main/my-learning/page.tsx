'use client';

import MotionFadeIn from '@/components/_animations/MotionFadeIn';
import CharacterFrontText from './_components/CharacterFrontText';
import LevelButton from './_components/roadmap/LevelButton';

export default function MyLearningPage() {
  return (
    <>
      <MotionFadeIn>
        <CharacterFrontText
          title={'첨지 오늘도 왔구나!'}
          subtitle={'ㅇㄴㅇㄴㄴㅇ'}
          audio
        />
      </MotionFadeIn>
      <LevelButton
        text={'학교에 가자!'}
        subText={'Lets go to School!'}
        status={'current'}
        levelNum={1}
      />
      <LevelButton
        text={'학교에 가자!'}
        subText={'Lets go to School!'}
        status={'complete'}
        levelNum={2}
      />
      <LevelButton
        text={'학교에 가자!'}
        subText={'Lets go to School!'}
        status={'locked'}
        levelNum={3}
      />
    </>
  );
}
