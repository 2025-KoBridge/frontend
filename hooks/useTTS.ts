'use client';

import { useState } from 'react';

export function useTTS() {
  const [playing, setPlaying] = useState(false);

  const playTTS = async (text: string, voiceName: string) => {
    if (playing) return;
    setPlaying(true);

    try {
      const res = await fetch('/api/tts/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceName }),
      });

      const data = await res.json();
      if (!data.audio) return;

      const audioBlob = new Blob(
        [Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))],
        { type: 'audio/mpeg' },
      );
      const audioURL = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioURL);

      audio.addEventListener('ended', () => setPlaying(false));
      await audio.play();
    } finally {
      setPlaying(false);
    }
  };

  return { playTTS, playing };
}
