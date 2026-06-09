import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit } from '../types/habit.types';

interface HabitStore {
  habits: Habit[];
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  toggleHabit: (id: string, date: string) => void;
  editHabit: (id: string, newName: string) => void;
}

export const useHabitStore = create<HabitStore>()(
  persist(
    (set) => ({
      habits: [], 

      // LOGIKA EDIT HABIT
      editHabit: (id, newName) => set((state) => ({
        habits: state.habits.map((habit) =>
          habit.id === id ? { ...habit, name: newName } : habit
        )
      })), // <--- Ini dia pahlawan kita: tutup kurung dan koma!

      // LOGIKA NAMBAH HABIT
      addHabit: (name) => set((state) => ({
        habits: [
          ...state.habits,
          {
            id: crypto.randomUUID(),
            name: name,
            createdAt: new Date().toISOString(),
            completedDates: [],
          }
        ]
      })),

      // LOGIKA HAPUS HABIT
      deleteHabit: (id) => set((state) => ({
        habits: state.habits.filter((habit) => habit.id !== id)
      })),

      // LOGIKA CEKLIS HABIT
      toggleHabit: (id, date) => set((state) => ({
        habits: state.habits.map((habit) => {
          if (habit.id === id) {
            const isAlreadyCompleted = habit.completedDates.includes(date);
            return {
              ...habit,
              completedDates: isAlreadyCompleted
                ? habit.completedDates.filter((d) => d !== date)
                : [...habit.completedDates, date]
            };
          }
          return habit;
        })        
      }))
    }),
    {
      name: 'habitup-storage',
    }
  )
);