'use client';

import { useState, KeyboardEvent, useEffect } from 'react';
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
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  // 마이크 권한 먼저 띄우기
  useEffect(() => {
    const requestMicPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.warn('마이크 권한 거부됨', err);
      }
    };
    requestMicPermission();
  }, []);

  // 녹음 시작
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/mp4')
        ? 'audio/mp4'
        : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : '';
      if (!mimeType) return alert('녹음을 지원하지 않는 브라우저입니다.');

      const recorder = new MediaRecorder(stream, { mimeType });
      setMediaRecorder(recorder);

      const chunks: Blob[] = [];

      recorder.ondataavailable = e => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        onClick?.('mic', blob);
        setIsRecording(false);
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('마이크 권한 필요:', err);
      alert('마이크 권한을 허용해주세요.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) mediaRecorder.stop();
    setIsRecording(false);
  };

  const handleToggle = (newMode: 'mic' | 'keyboard') => {
    setMode(newMode);
    if (newMode === 'keyboard') {
      stopRecording(); // 키보드 모드일 때는 녹음 중지
    }
    // mic 모드일 때는 녹음 시작하지 않음! 눌렀을 때만 녹음
  };

  // 키보드 입력
  const handleInputSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onClick?.('keyboard', inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* 버튼 + 입력창 영역 */}
      <div className="relative w-full h-20 flex flex-col items-center">
        {/* 토글 버튼 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-12 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[118px] h-[42px] bg-gray-950 rounded-full" />
          </div>

          {/* 마이크 배경 */}
          <div className="absolute left-0 top-1/2 -translate-y-6 w-14 h-14 flex items-center justify-center">
            <div
              className={`w-14 h-14 rounded-full ${mode === 'mic' ? 'bg-primary-dimensional' : 'bg-transparent'}`}
            />
          </div>

          {/* 키보드 배경 */}
          <div className="absolute right-0 top-1/2 -translate-y-6 w-14 h-14 flex items-center justify-center">
            <div
              className={`w-14 h-14 rounded-full ${mode === 'keyboard' ? 'bg-secondary' : 'bg-transparent'}`}
            />
          </div>

          {/* 마이크 버튼 */}
          <button
            onClick={() => handleToggle('mic')}
            onMouseDown={() => {
              if (mode === 'mic') {
                startRecording();
                setIsRecording(true);
              }
            }}
            onMouseUp={() => {
              if (mode === 'mic') stopRecording();
            }}
            onTouchStart={() => {
              if (mode === 'mic') {
                startRecording();
                setIsRecording(true);
              }
            }}
            onTouchEnd={() => {
              if (mode === 'mic') stopRecording();
            }}
            className={`absolute left-0 top-1/2 ${
              isRecording ? '-translate-y-6' : '-translate-y-1/2'
            } w-14 h-14 flex items-center justify-center rounded-full transition-all duration-150 ${
              mode === 'mic' ? 'bg-primary' : 'bg-transparent'
            }`}
            style={{
              userSelect: 'none', // 텍스트 선택 막기
              WebkitUserSelect: 'none', // 사파리/모바일 대응
              touchAction: 'manipulation', // 터치 동작 최적화
            }}
          >
            <Image
              src="/icons/mic.svg"
              alt="mic"
              width={24}
              height={24}
              style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                pointerEvents: 'none', // 이미지 자체 클릭/드래그 방지
              }}
            />
          </button>

          {/* 키보드 버튼 */}
          <button
            onClick={() => handleToggle('keyboard')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full transition ${mode === 'keyboard' ? 'bg-bg-solid' : 'bg-transparent'}`}
          >
            <Image
              src="/icons/keyboard.svg"
              alt="keyboard"
              width={24}
              height={24}
              style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                pointerEvents: 'none', // 이미지 자체 클릭/드래그 방지
              }}
            />
          </button>
        </div>

        {/* 키보드 입력 필드 */}
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
      {/* {mode === 'mic' && (
        <div className="mt-2 flex flex-col items-center">
          {isRecording ? (
            <button onClick={stopRecording} className="mb-2 px-4 py-2 bg-red-500 rounded text-white">
              ⏹️ 녹음 중지
            </button>
          ) : (
            <button onClick={startRecording} className="mb-2 px-4 py-2 bg-blue-500 rounded text-white">
              ▶️ 녹음 시작
            </button>
          )}
          {audioURL && (
            <div className="flex flex-col items-center mt-2">
              <audio controls src={audioURL} className="mb-2" />
              <a href={audioURL} download="recording" className="text-blue-600 underline">
                ⬇️ 다운로드
              </a>
            </div>
          )}
        </div>
      )} */}
    </div>
  );
}
