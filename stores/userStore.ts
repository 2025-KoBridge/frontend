import { SchoolOption } from '@/constants/dropdown/schools';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  username: string;
  setUsername: (name: string) => void;
  age: string;
  setAge: (age: string) => void;
  school: SchoolOption['value'];
  setSchool: (school: SchoolOption['value']) => void;
  grade: string;
  setGrade: (grade: string) => void;

  currentLevel: number;
  setCurrentLevel: (level: number) => void;
  increaseLevel: () => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      username: '',
      setUsername: name => set({ username: name }),
      age: '',
      setAge: age => set({ age: age }),
      school: '',
      setSchool: school => set({ school }),
      grade: '',
      setGrade: grade => set({ grade }),

      currentLevel: 1,
      setCurrentLevel: level => set({ currentLevel: level }),
      increaseLevel: () => {
        const { currentLevel } = get();
        set({ currentLevel: currentLevel + 1 });
      },
    }),
    {
      name: 'user-store', // localStorage key
    },
  ),
);
