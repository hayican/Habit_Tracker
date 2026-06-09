import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  isDarkMode: boolean; // Status lampunya (true = mati/gelap, false = nyala/terang)
  toggleTheme: () => void; // Fungsi buat cetek saklarnya
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: false, // Default-nya terang
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'theme-storage', // Disimpen di laci terpisah dari habit
    }
  )
);