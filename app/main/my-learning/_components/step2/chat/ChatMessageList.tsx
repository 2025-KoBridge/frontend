'use client';

import { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBubble from './ChatBubble';
import UserFeedbackCard from './UserFeedbackCard';

export type Role = 'ai' | 'user' | 'system';

export type Message = {
  isQuestion: boolean;
  id: string;
  role: Role;
  text?: string; // 기존 일반 텍스트
  questionTrans?: string;
  feedback?: {
    userInput: string;
    translation: string;
    correction: string;
    explanation: string;
  };
  round?: number;
  showAudio?: boolean;
  showTranslate?: boolean;
};

export type OptionItem = { label: string; muted?: string };

export default function ChatMessageList({
  messages,
  options,
  onSelectOption,
  onRetry,
}: {
  messages: Message[];
  options?: OptionItem[];
  onSelectOption?: (i: number) => void;
  onRetry?: () => void;
}) {
  return (
    <AnimatePresence>
      {messages.map(m => (
        <Fragment key={m.id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {m.feedback ? (
              <UserFeedbackCard
                userInput={m.feedback.userInput}
                translation={m.feedback.translation}
                correction={m.feedback.correction}
                explanation={m.feedback.explanation}
              />
            ) : (
              <ChatBubble
                role={m.role}
                text={m.text || ''}
                translation={m.questionTrans}
                showAudio={true}
                showTranslate={true}
              />
            )}
          </motion.div>
        </Fragment>
      ))}
    </AnimatePresence>
  );
}
