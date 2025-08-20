import { createClient } from '@deepgram/sdk';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const deepgram = createClient(process.env.DEEPGRAM_API_KEY!);

    // JSON으로 Base64 보내는 경우
    const contentType = req.headers.get('content-type') || '';
    let audioBuffer: Buffer | null = null;

    if (contentType.includes('application/json')) {
      const { audioBase64 } = await req.json();
      if (!audioBase64) {
        return NextResponse.json(
          { error: 'No audioBase64 provided' },
          { status: 400 },
        );
      }
      audioBuffer = Buffer.from(audioBase64, 'base64');
    }
    // FormData로 보내는 경우
    else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const audioFile = formData.get('file') as File;
      if (!audioFile) {
        return NextResponse.json(
          { error: 'No audio file provided' },
          { status: 400 },
        );
      }
      const arrayBuffer = await audioFile.arrayBuffer();
      audioBuffer = Buffer.from(arrayBuffer);
    } else {
      return NextResponse.json(
        { error: 'Unsupported Content-Type' },
        { status: 400 },
      );
    }

    // Deepgram STT
    const { result } = await deepgram.listen.prerecorded.transcribeFile(
      audioBuffer,
      {
        model: 'nova-2',
        language: 'ko',
        smart_format: true,
      },
    );

    // 안전하게 transcript 추출
    const transcript =
      result?.results?.channels?.[0]?.alternatives?.[0]?.transcript || '';

    return NextResponse.json({ transcript });
  } catch (err) {
    console.error('STT Error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 },
    );
  }
};
