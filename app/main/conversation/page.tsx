'use client';

import TitleText from '@/components/TitleText';
import text from './_locales/text.json';
import CharacterText from '@/components/CharacterText';
import SwipeButton from './_components/SwipeButton';
import MotionFadeIn from '@/components/_animations/MotionFadeIn';
import { useCallStore } from '@/stores/callStore';

export default function ConversationPage() {
  const { remainingCalls } = useCallStore();
  const { title, subText } = text.conversation;
  return (
    <MotionFadeIn className="flex flex-col h-full">
      <h4 className="mt-12 text-secondary-300 text-bd1-regular">
        오늘 남은 통화 횟수: {remainingCalls}
      </h4>
      <TitleText
        title={title}
        subText={subText}
        lang={'en'}
        className="mt-6 mb-10"
      />
      <CharacterText
        title={'안녕, 오늘도 나와 대화하자!'}
        subtitle={'Hi, Lets talk again today!'}
        audio
      />
      <div className="mt-auto mb-24">
        <SwipeButton />
      </div>
    </MotionFadeIn>
  );
}
