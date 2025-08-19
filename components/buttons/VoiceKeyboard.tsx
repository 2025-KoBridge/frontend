'use client';

import { useState, KeyboardEvent } from 'react';
import Image from 'next/image';
import TextFieldChat from '../textfields/TextFieldChat';

type VoiceKeyboardProps = {
  placeholder?: string;
  onClick?: (mode: 'mic' | 'keyboard', data?: Blob | string) => void;
};

export default function VoiceKeyboard({
  placeholder = '텍스트를 입력하세요...',
  onClick,
}: VoiceKeyboardProps) {
  const [mode, setMode] = useState<'mic' | 'keyboard'>('mic');
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // 마이크 버튼 클릭 → 녹음 시작
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks([]);

      recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        console.log('🎙️ 녹음 완료 Blob:', audioBlob);
        onClick?.('mic', audioBlob);
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('마이크 권한 필요:', err);
    }
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  // 모드 전환
  const handleToggle = (newMode: 'mic' | 'keyboard') => {
    setMode(newMode);
    if (newMode === 'mic') {
      stopRecording();
      startRecording();
    } else {
      stopRecording();
    }
  };

  // 입력 완료 시 상위 전달
  const handleInputSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onClick?.('keyboard', inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* 버튼 + 입력창을 담는 고정 영역 */}
      <div className="relative w-full h-20 flex flex-col items-center">
        {/* 토글 버튼 영역 (항상 중앙 고정) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-12 flex items-center justify-center">
          {/* 회색 직사각형 바 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[118px] h-[42px] bg-gray-950 rounded-full" />
          </div>
          {/* 마이크 배경 원 */}
          <div className="absolute left-0 top-1/2 -translate-y-6 w-14 h-14 flex items-center justify-center">
            <div
              className={`w-14 h-14 rounded-full ${
                mode === 'mic' ? 'bg-primary-dimensional' : 'bg-transparent'
              }`}
            />
          </div>

          {/* 키보드 배경 원 */}
          <div className="absolute right-0 top-1/2 -translate-y-6 w-14 h-14 flex items-center justify-center">
            <div
              className={`w-14 h-14 rounded-full ${
                mode === 'keyboard' ? 'bg-secondary' : 'bg-transparent'
              }`}
            />
          </div>
          {/* 마이크 버튼 */}
          <button
            onClick={() => handleToggle('mic')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full transition ${
              mode === 'mic' ? 'bg-primary' : 'bg-transparent'
            }`}
          >
            <Image src="/icons/mic.svg" alt="mic" width={24} height={24} />
          </button>

          {/* 키보드 버튼 */}
          <button
            onClick={() => handleToggle('keyboard')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full transition ${
              mode === 'keyboard' ? 'bg-bg-solid' : 'bg-transparent'
            }`}
          >
            <Image
              src="/icons/keyboard.svg"
              alt="keyboard"
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* 입력 필드 (버튼 밑에 absolute 배치) */}
        {mode === 'keyboard' && (
          <div className="absolute -bottom-12 w-screen px-4 flex justify-center">
            <TextFieldChat
              placeholder={placeholder}
              onSubmit={val => {
                onClick?.('keyboard', val);
                setInputValue('');
              }}
            />
          </div>
        )}
      </div>

      {/* 녹음 상태 표시 */}
      {isRecording && mode === 'mic' && (
        <p className="mt-2 text-sm text-red-500">🎤 녹음 중...</p>
      )}
    </div>
  );
}
