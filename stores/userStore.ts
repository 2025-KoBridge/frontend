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
}

export const useUserStore = create(
  persist<UserStore>(
    set => ({
      username: '',
      setUsername: name => set({ username: name }),
      age: '',
      setAge: age => set({ age: age }),
      school: '',
      setSchool: school => set({ school }),
      grade: '',
      setGrade: grade => set({ grade }),
    }),
    {
      name: 'user-store', // localStorage key
    },
  ),
);
