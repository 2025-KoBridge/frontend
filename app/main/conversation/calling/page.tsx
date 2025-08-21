'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useCallStore } from '@/stores/callStore';
import { useVoiceStore } from '@/stores/voiceStore';
import { useTTS } from '@/hooks/useTTS';

export default function CallingPage() {
  const router = useRouter();
  const decrementCall = useCallStore(state => state.decrementCall);
  const selectedVoice = useVoiceStore(state => state.selectedVoice);
  const { playTTS } = useTTS();

  const [showConnecting, setShowConnecting] = useState(true);
  const [callTime, setCallTime] = useState(0);

  // textStep: 0 = 첫번째, 1 = 세번째 텍스트
  const [textStep, setTextStep] = useState(0);
  // ttsStep: 0 = 첫번째 TTS, 1 = 세번째 TTS
  const [ttsStep, setTtsStep] = useState(0);

  const CONNECTING_DURATION = 5000; // 연결 화면 유지 시간 (ms)

  // 텍스트 & TTS 정의
  const TEXTS = [
    {
      text: '안녕! 오늘은 어떤 얘기할래?',
      translation: 'What do you want to talk about today?',
    }, // 첫번째
    {
      text: '그런 일이 있었구나. 속상했겠다.. 그럼 나랑 오늘 한국어로 대화 많이 해보면서 공부해보자',
      translation:
        'I see… that must have been upsetting. Let’s practice a lot of Korean conversation today!',
    }, // 세번째
  ];

  // 연결 화면 타이머
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConnecting(false);
      setCallTime(0);
    }, CONNECTING_DURATION);
    return () => clearTimeout(timer);
  }, []);

  // 통화 타이머
  // @ts-ignore
  useEffect(() => {
    let interval: number | undefined;
    if (!showConnecting) {
      interval = window.setInterval(() => setCallTime(prev => prev + 1), 1000);
    }
    return () => interval && clearInterval(interval);
  }, [showConnecting]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(1, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // TODO: PROTO 화면 클릭 시 TTS 재생 & 텍스트 단계 변경
  const handleUserInteraction = async () => {
    if (!showConnecting && selectedVoice) {
      if (ttsStep === 0) {
        // 첫번째 클릭: 첫번째 TTS
        await playTTS(TEXTS[0].text, selectedVoice.voiceName);
        setTtsStep(1); // 다음 TTS는 세번째
      } else if (ttsStep === 1) {
        setTtsStep(-1);
        setTextStep(1);
        // 두번째 클릭: 두번째 TTS (세번째 텍스트)
        await playTTS(TEXTS[1].text, selectedVoice.voiceName);
        console.log(ttsStep);
      } else {
        return;
      }
    }
  };

  const handleEndCall = () => {
    decrementCall();
    router.replace(ROUTES.MAIN.CONVERSATION.ROOT);
  };

  return (
    <div
      className="flex flex-col h-full relative"
      onClick={handleUserInteraction}
    >
      {showConnecting ? (
        <motion.div
          className="text-center text-white mt-45 mb-12"
          animate={{ y: [0, -5, 0], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <h1 className="text-h1-bold">코디에게 연결 중...</h1>
          <h2>Connecting the call to Kody...</h2>
        </motion.div>
      ) : (
        <>
          {/* 통화 타이머 */}
          <motion.div
            className="text-center text-white mt-12 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className="text-bd1-regular">{formatTime(callTime)}</p>
            <h1 className="text-h2-bold mt-6">코디</h1>
            <h2>Kody</h2>
          </motion.div>

          {/* 캐릭터 대사 */}
          <motion.div
            className="mb-4 px-6 py-3 bg-white-70 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-secondary-300 text-bd1-bold gap-1">
              {textStep === 0 ? TEXTS[0].text : TEXTS[1].text}
            </h2>
            <div className="w-full border-b border-dashed border-gray-700 my-1"></div>
            <p className="text-gray-500 text-trans-cp2-regular mt-1">
              {textStep === 0 ? TEXTS[0].translation : TEXTS[1].translation}
            </p>
          </motion.div>
        </>
      )}

      {/* 캐릭터 + 종료 버튼 */}
      <motion.div
        className="flex flex-col items-center relative h-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: showConnecting ? 0 : 0.3 }}
      >
        <Image
          src={'/character/default.webp'}
          alt={'character profile'}
          width={118}
          height={118}
          className="rounded-full"
        />

        <Image
          src={'/icons/call-end.svg'}
          alt={'call end'}
          width={59}
          height={59}
          className="mt-auto mb-20 cursor-pointer"
          onClick={handleEndCall}
        />
      </motion.div>
    </div>
  );
}
