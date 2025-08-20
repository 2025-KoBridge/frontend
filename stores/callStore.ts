import { create } from 'zustand';

interface CallState {
  remainingCalls: number;
  decrementCall: () => void;
  resetCalls: (count: number) => void;
}

export const useCallStore = create<CallState>(set => ({
  remainingCalls: 3, // 초기값
  decrementCall: () =>
    set(state => ({
      remainingCalls: state.remainingCalls > 0 ? state.remainingCalls - 1 : 0,
    })),
  resetCalls: (count: number) => set({ remainingCalls: count }),
}));
