import Image from 'next/image';
import { Message } from './ChatMessageList';
import ChatMessageList from './ChatMessageList';

type ChatLessonProps = {
  totalRounds: number;
  currentRound: number;
  messages: Message[];
  questionHints: string[];
};

export default function ChatLesson({
  totalRounds,
  currentRound,
  messages,
  questionHints,
}: ChatLessonProps) {
  return (
    <div className="flex flex-col w-full text-white pb-24 overflow-y-auto">
      {Array.from({ length: currentRound }).map((_, roundIndex) => {
        const roundMessages = messages.filter(m => m.round === roundIndex + 1);

        return (
          <div key={roundIndex} className="mb-6">
            {/* 라운드 구분선 */}
            <div className="relative flex items-center py-3">
              <div className="flex-grow border-t border-gray-700" />
              <span className="mx-4 text-xs text-gray-400 whitespace-nowrap">
                대화 횟수: {roundIndex + 1}/{totalRounds}
              </span>
              <div className="flex-grow border-t border-gray-700" />
            </div>

            {roundMessages.map(msg => (
              <div key={msg.id}>
                <ChatMessageList messages={[msg]} />

                {/* AI 질문 메시지 뒤에만 힌트 표시 */}
                {msg.role === 'ai' &&
                  msg.isQuestion &&
                  questionHints[roundIndex] && (
                    <div className="flex flex-row justify-center items-center gap-1 mt-3">
                      <Image
                        src="/icons/mic-gray.svg"
                        alt="hint"
                        width={16}
                        height={16}
                        className="pb-0.5"
                      />
                      <div className="text-sm text-gray-400">
                        {questionHints[roundIndex]}
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
