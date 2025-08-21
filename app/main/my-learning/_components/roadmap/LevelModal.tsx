'use client';

import Button from '@/components/buttons/_index';
import { motion, AnimatePresence } from 'framer-motion';
import LevelModalList from './LevelModalList';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useUserStore } from '@/stores/userStore';

interface LevelModalProps {
  levelNum: number;
  title: string;
  onClose: () => void;
  showButton?: boolean;
}

export default function LevelModal({
  levelNum,
  title,
  onClose,
  showButton = false,
}: LevelModalProps) {
  const router = useRouter();
  const { currentLevel } = useUserStore();

  // TODO: API 연동
  const levelGoalsMap: Record<number, { goal: string; sub: string }[]> = {
    1: [
      {
        goal: '사용할 문장 알아볼까?',
        sub: "Let's check out some sentences to use.",
      },
      { goal: '같이 대화해볼까?', sub: 'Wanna try a conversation together?' },
      { goal: '오늘의 레슨은 어땠어?', sub: "How was today's lesson?" },
    ],
    2: [
      { goal: '친구랑 어떻게 말할까?', sub: 'How do you talk with a friend?' },
      { goal: '인사 연습해보자!', sub: "Let's practice greetings!" },
      {
        goal: '오늘 배운 인사, 어땠어?',
        sub: 'How were the greetings you learned today?',
      },
    ],
  };

  const levelGoals = levelGoalsMap[levelNum] || [];

  const handleStart = () => {
    router.push(ROUTES.MAIN.MY_LEARNING.getStep(levelNum, 'intro1'));
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 bg-black-70 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // 배경 클릭 시 모달 닫기
      >
        <motion.div
          key="modal"
          className="bg-white rounded-3xl w-full m-4 p-4 text-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={e => e.stopPropagation()} // 내부 클릭 시 닫히지 않게
        >
          {/* 상단 제목 */}
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-trans-cp3-regular text-secondary-300 bg-primary-800 px-2 py-1.5 rounded-xl">
              Lv. {levelNum}
            </h2>
            <p className="text-bd2-bold text-black">{title}</p>
          </div>
          {/* 리스트 */}
          <div className="flex flex-col gap-2 my-6">
            {levelGoals.map((item, idx) => (
              <LevelModalList
                key={idx}
                levelGoalText={item.goal}
                levelGoalSubText={item.sub}
                completeGoal={levelNum !== currentLevel}
              />
            ))}
          </div>
          {/* 버튼 */}
          {showButton && (
            <Button
              text="시작하기"
              iconPath="/icons/arrow-right.svg"
              onClick={handleStart}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
