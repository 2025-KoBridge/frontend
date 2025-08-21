// app/api/tts/speak/route.ts
import { NextResponse } from 'next/server';
import textToSpeech from '@google-cloud/text-to-speech';

export async function POST(req: Request) {
  try {
    const { text, voiceName } = await req.json();

    // 서버에서만 JSON 키 읽기
    const client = new textToSpeech.TextToSpeechClient({
      credentials: JSON.parse(process.env.GOOGLE_TTS_KEY!),
    });

    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: {
        name: voiceName || 'ko-KR-Chirp3-HD-Fenrir',
        languageCode: 'ko-KR',
      },
      audioConfig: { audioEncoding: 'MP3' },
    });

    const audioContent = response.audioContent;
    if (!audioContent)
      return NextResponse.json({ error: 'No audio content' }, { status: 500 });

    // ArrayBuffer → Base64
    const base64Audio = Buffer.from(audioContent).toString('base64');

    return NextResponse.json({ audio: base64Audio });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'TTS failed' }, { status: 500 });
  }
}
