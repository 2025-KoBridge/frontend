'use client';

import ProgressBar from '@/components/ProgressBar';
import { useEffect, useRef, useState } from 'react';
import VoiceKeyboard from '@/components/buttons/VoiceKeyboard';
import ChatLesson from '../../_components/step2/chat/ChatLesson';
import { Message } from '../../_components/step2/chat/ChatMessageList';
import { useVoiceSubmit } from '@/hooks/useVoiceSubmit';
import Button from '@/components/buttons/_index';
import BottomSheet from '@/app/onboarding/signin/components/BottomSheet';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useLevelParam } from '@/hooks/useLevelParam';

type QuestionItem = {
  question: string;
  questionTrans: string;
  hint: string;
  translation?: string;
  correction?: string;
  explanation?: string;
  answer: string;
};

const questions: QuestionItem[] = [
  {
    question: '안녕 오늘 첫 수업 뭐였지?',
    questionTrans: 'Hi what is first class today again?',
    hint: 'Start by saying a subject in Korean!',
    translation: 'I think it was Korean class',
    correction: '국어 시간이었던 것 같아.',
    explanation:
      '‘이였던거’는 ‘였던 것’으로 교정할 수 있어요. 또한, ‘같아’는 ‘같애’로 바꾸는 것이 더 자연스러워요.',
    answer: '맞아, 국어 시간이지! 알려줘서 고마워!',
  },
  {
    question: '국어 시간 언제 시작 하더라?',
    questionTrans: 'When does Korean class start?',
    hint: 'Say a number in Korean',
    translation: 'nine',
    correction: '아홉시',
    explanation:
      '문장이 올바르게 표현되었습니다. 시간 표현이 명확하고 간결합니다.',
    answer: '쉬는 시간 얼마 안남았네!',
  },
  {
    question: '혹시 숙제 다 했어?',
    questionTrans: 'Did you do your homework?',
    hint: "Try to say '응' or '아니'",
    translation: 'Yeah, I finished all my homework.',
    correction: '응 숙제 다 했어.',
    explanation: '문장이 자연스럽고 맞습니다. 잘 하셨어요!',
    answer: '대단해! 숙제를 다 했다니 정말 멋져!',
  },
];

export default function LevelStep2Page() {
  const router = useRouter();
  const levelParam = useLevelParam();
  const { handleVoiceSubmit } = useVoiceSubmit();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      role: 'ai',
      text: questions[0].question,
      questionTrans: questions[0].questionTrans,
      round: 1,
      isQuestion: true,
    },
  ]);
  const [currentRound, setCurrentRound] = useState(1);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const handleUserSubmit = (text: string) => {
    const newRound = currentRound;
    const q = questions[newRound - 1];

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString() + '_sys',
        role: 'system',
        round: newRound,
        feedback: {
          userInput: text,
          translation: q.translation ?? '(번역)',
          correction: q.correction ?? '(올바른 한국어 예시)',
          explanation: q.explanation ?? '(왜 맞고 틀린지 설명)',
        },
        isQuestion: false,
      },
    ]);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + '_ai',
          role: 'ai',
          text: q.answer ?? '그에 대한 간단한 답변',
          round: newRound,
          isQuestion: false,
        },
      ]);
    }, 2000);

    // 마지막 라운드 체크
    if (newRound === questions.length) {
      setTimeout(() => {
        setShowSummaryModal(true);
      }, 5000); // 답변 보여주고 잠깐 후 모달
    } else {
      const nextRound = newRound + 1;
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString() + '_next',
            role: 'ai',
            text: questions[nextRound - 1].question,
            questionTrans: questions[nextRound - 1].questionTrans,
            round: nextRound,
            isQuestion: true,
          },
        ]);
        setCurrentRound(nextRound);
      }, 4000);
    }
  };

  // messages가 바뀔 때마다 스크롤
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const container = chatContainerRef.current;
      if (container) {
        container.scrollTo({
          top:
            container.scrollTop +
            (container.scrollHeight - container.clientHeight) * 0.6,
          behavior: 'smooth',
        });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <div className="flex flex-col relative">
      <ProgressBar
        totalSteps={3}
        currentStep={2}
        incompleteColor="bg-gray-900"
        className="mt-2 mb-4"
      />

      <main className="flex justify-center items-center flex-1 overflow-hidden scrollbar-hide">
        <div
          ref={chatContainerRef}
          className="w-full max-w-md flex-1 h-100 overflow-y-auto scrollbar-hide"
        >
          <ChatLesson
            totalRounds={questions.length}
            currentRound={currentRound}
            messages={messages}
            questionHints={questions.map(q => q.hint)}
          />
        </div>
      </main>

      <div className="flex justify-center mt-auto pt-4 pb-16">
        <VoiceKeyboard
          onClick={async (mode, data) => {
            if (mode === 'mic' && data instanceof Blob) {
              const text = await handleVoiceSubmit(data);
              if (text) handleUserSubmit(text);
            }
            if (mode === 'keyboard' && typeof data === 'string') {
              handleUserSubmit(data);
            }
          }}
        />
      </div>

      <BottomSheet
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        title={'잘했어요! 오늘 대화를 요약했어요.'}
        subText={"Good job! I summarized today's conversation."}
      >
        <div className="bg-bg-solid px-4 py-3 rounded-2xl mt-6 mb-8">
          {questions.map((q, i) => (
            <div key={i} className="flex flex-row items-start">
              <div className="mt-2 mr-1">
                <Image
                  src="/icons/flag.svg"
                  alt="Flag"
                  width={12}
                  height={12}
                />
              </div>
              <div className="flex flex-col my-1">
                <span className="text-black text-bd2-bold">{q.question}</span>
                <span className="text-gray-300 text-trans-cp2-regular">
                  {q.translation}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row w-full gap-2">
          <Button
            text="다시하기"
            iconPath="/icons/retry.svg"
            btnColor="bg-primary-900"
            className="flex-1"
            //onClick={handleRetry}
          />
          <Button
            text={'다음'}
            iconPath="/icons/arrow-right.svg"
            onClick={() => {
              router.push(ROUTES.MAIN.MY_LEARNING.getStep(levelParam, 'step3'));
            }}
            className="flex-2"
          />
        </div>
      </BottomSheet>
    </div>
  );
}
