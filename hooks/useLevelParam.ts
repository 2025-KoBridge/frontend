'use client';
import { usePathname } from 'next/navigation';

export function useLevelParam(defaultLevel = 1): number {
  const pathname = usePathname(); // 예: /main/my-learning/level-2/intro
  const match = pathname.match(/level-(\d+)/);
  const level = match ? Number(match[1]) : defaultLevel;
  return level;
}
