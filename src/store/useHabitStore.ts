import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Habit } from '../types/habit.types';

// 1. Kita bikin cetakan buat Brankasnya (Store)
interface HabitStore {
  habits: Habit[]; // Daftar habit pakai cetakan yang udah lu bikin sebelumnya
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  toggleHabit: (id: string, date: string) => void; // Buat ceklis/un-ceklis hari ini
}

// 2. Kita bikin Brankas Aslinya
export const useHabitStore = create<HabitStore>()(
  // Fitur persist ini yang bikin data lu masuk otomatis ke Local Storage
  persist(
    (set) => ({
      habits: [], // Pas restoran baru buka, catatannya kosong dong

      // LOGIKA NAMBAH HABIT
      addHabit: (name) => set((state) => ({
        habits: [
          ...state.habits, // Ambil semua habit yang udah ada sebelumnya
          {
            id: crypto.randomUUID(), // Bikin ID acak unik (bawaan browser)
            name: name,
            createdAt: new Date().toISOString(),
            completedDates: [], // Awal bikin, belum pernah diceklis pastinya
          }
        ]
      })),

      // LOGIKA HAPUS HABIT
      deleteHabit: (id) => set((state) => ({
        // Filter: Sisain semua habit yang ID-nya BUKAN ID yang mau dihapus
        habits: state.habits.filter((habit) => habit.id !== id)
      })),

      // LOGIKA CEKLIS HABIT
      toggleHabit: (id, date) => set((state) => ({
        habits: state.habits.map((habit) => {
          // Cari habit yang lagi diklik
          if (habit.id === id) {
            // Cek, tanggal ini udah ada di daftar completedDates belum?
            const isAlreadyCompleted = habit.completedDates.includes(date);
            
            return {
              ...habit,
              // Kalau udah pernah diceklis, kita hapus tanggalnya (un-ceklis)
              // Kalau belum, kita tambahin tanggalnya ke daftar
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
      name: 'habitup-storage', // Ini nama file rahasia di brankas browser lu
    }
  )
);