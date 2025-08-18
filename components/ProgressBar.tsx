interface ProgressBarProps {
  totalSteps: number; // 바의 총 개수
  currentStep: number; // 현재 진행 상태 (누적된 값)
  incompleteColor?: string;
  className?: string;
}

export default function ProgressBar({
  totalSteps,
  currentStep,
  incompleteColor = 'bg-secondary',
  className,
}: ProgressBarProps) {
  if (totalSteps <= 0) {
    return null;
  }

  const segments = Array(totalSteps).fill(1);
  const totalSegments = segments.length;
  const gap = totalSteps === 4 ? 16 : totalSteps <= 3 ? 8 : 0;

  return (
    <div className={`flex h-2 ${className}`} style={{ gap: `${gap}px` }}>
      {segments.map((_, index) => {
        const isCurrentOrCompleted = index < Math.ceil(currentStep);

        return (
          <div
            key={index}
            style={{ width: `${100 / totalSegments}%` }}
            className={`h-full rounded-sm ${
              isCurrentOrCompleted ? 'bg-primary' : incompleteColor
            }`}
          ></div>
        );
      })}
    </div>
  );
}
