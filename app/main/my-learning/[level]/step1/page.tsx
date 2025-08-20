'use client';

import MotionFadeIn from '@/components/_animations/MotionFadeIn';
import ProgressBar from '@/components/ProgressBar';
import { useLanguageStore } from '@/stores/languageStore';
import text from '../../_locales/text.json';
import Button from '@/components/buttons/_index';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useLevelParam } from '@/hooks/useLevelParam';
import PhrasePracticeText from '../../_components/step1/PhrasePracticeText';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import VoiceKeyboard from '@/components/buttons/VoiceKeyboard';

export default function LevelStep1Page() {
  const router = useRouter();
  const levelParam = useLevelParam();
  const { currentLanguage } = useLanguageStore();
  const { title, subText } = text.step1;

  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  //TODO: API 연결
  const phrases = [
    {
      phrase: '너는 취미가 뭐야?',
      romanization: 'Neo nun / chui mi ga / muh ya',
      translation: 'What is your hobby?',
    },
    {
      phrase: '오늘 날씨 어때?',
      romanization: 'Oneul nalssi eottae?',
      translation: 'How is the weather today?',
    },
    {
      phrase: '무슨 음식을 좋아해?',
      romanization: 'Museun eumsigeul joahae?',
      translation: 'What food do you like?',
    },
  ];

  // 상태
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputText, setInputText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleComplete = () => {
    if (inputText.trim() !== '') {
      setShowEvaluation(true);
      setShowInput(false);
    }
  };

  const handleRetry = () => {
    setInputText('');
    setShowInput(false);
    setShowEvaluation(false);
    setResetKey(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentIndex < phrases.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInputText('');
      setShowInput(false);
      setShowEvaluation(false);
      setResetKey(prev => prev + 1);
    } else {
      // 마지막 문장이면 step2로 이동
      router.push(ROUTES.MAIN.MY_LEARNING.getStep(levelParam, 'intro2'));
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <ProgressBar
        totalSteps={3}
        currentStep={1}
        incompleteColor="bg-gray-900"
        className="mt-2 mb-12"
      />

      <MotionFadeIn>
        <h3 className="text-h3-bold text-black whitespace-pre-wrap mb-1">
          {title}
        </h3>
        <p className="text-trans-cp2-regular text-gray-500 whitespace-pre-wrap mb-6">
          {subText[currentLanguage.code]}
        </p>
      </MotionFadeIn>

      <MotionFadeIn transition={{ duration: 1, delay: 1, ease: 'easeIn' }}>
        <PhrasePracticeText
          key={resetKey}
          phrase={phrases[currentIndex].phrase}
          romanization={phrases[currentIndex].romanization}
          translation={phrases[currentIndex].translation}
          inputText={inputText}
          showEvaluation={showEvaluation}
        />
      </MotionFadeIn>

      {!showInput && !showEvaluation && (
        <div className="flex justify-center mt-auto pb-0">
          <VoiceKeyboard
            onClick={(mode, data) => {
              if (mode === 'keyboard' && typeof data === 'string') {
                setInputText(data);
                setShowInput(true);
                setShowEvaluation(true);
                setAudioBlob(null); // 키보드 입력이면 오디오 초기화
              }
              if (mode === 'mic' && data instanceof Blob) {
                console.log('녹음된 오디오:', data);
                setAudioBlob(data); // 오디오 Blob 저장
                setShowInput(true);
                setShowEvaluation(true);
              }
            }}
          />
        </div>
      )}
      <AnimatePresence mode="wait" initial={false}>
        <div className="flex flex-row mt-auto pb-6 gap-2 min-h-[64px]">
          {showEvaluation && (
            <motion.div
              key="evaluation-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-row w-full gap-2"
            >
              <Button
                text="다시하기"
                iconPath="/icons/retry.svg"
                btnColor="bg-primary-900"
                className="flex-1"
                onClick={handleRetry}
              />
              <Button
                text={
                  currentIndex < phrases.length - 1 ? '다음으로' : '다음 단계'
                }
                iconPath="/icons/arrow-right.svg"
                onClick={handleNext}
                className="flex-2"
              />
            </motion.div>
          )}
        </div>
      </AnimatePresence>
      {/* 녹음된 오디오 재생 / 다운로드 */}
      {/* {audioBlob && (
        <div className="flex flex-col items-center gap-2 mt-4 pb-6">
          <audio controls src={URL.createObjectURL(audioBlob)} />
          <button
            onClick={() => {
              const a = document.createElement('a');
              a.href = URL.createObjectURL(audioBlob);
              a.download = `recording.mp4`;
              a.click();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            다운로드
          </button>
        </div>
      )} */}
    </div>
  );
}
