import { useState } from 'react';

export function useVoiceSubmit() {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVoiceSubmit = async (blob: Blob) => {
    setIsProcessing(true);
    try {
      const base64 = await blobToBase64(blob);
      const res = await fetch('/api/deepgram/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioBase64: base64 }),
      });
      const data = await res.json();
      if (data.transcript) {
        setInputText(data.transcript);
        return data.transcript;
      } else {
        console.error('STT 실패:', data.error);
        return '';
      }
    } catch (err) {
      console.error('STT 에러:', err);
      return '';
    } finally {
      setIsProcessing(false);
    }
  };

  return { inputText, isProcessing, handleVoiceSubmit };
}

// Blob → Base64
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
