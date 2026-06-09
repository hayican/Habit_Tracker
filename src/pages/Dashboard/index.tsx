import { useState } from "react";
import { useHabitStore } from "../../store/useHabitStore";
import { HabitForm } from "../../components/features/habit/HabitForm";
import { HabitCard } from "../../components/features/habit/HabitCard";
import { StatsBoard } from "../../components/features/habit/StatsBoard";
import { cn } from "../../utils/cn"; 
import { useThemeStore } from "../../store/useThemeStore";

export default function Dashboard() {
  const habits = useHabitStore((state) => state.habits);
  
  // 1. Kertas buram buat nginget tab filter mana yang lagi aktif
  const [activeFilter, setActiveFilter] = useState<"semua" | "belum" | "selesai">("semua");
  
  // 2. Panggil brankas temanya di sini
  const { isDarkMode, toggleTheme } = useThemeStore();

  const today = new Date().toISOString().split("T")[0];

  // 3. Mesin penyaring data
  const filteredHabits = habits.filter((habit) => {
    const isDoneToday = habit.completedDates.includes(today);

    if (activeFilter === "selesai") return isDoneToday; // Cuma nampilin yang udah kelar
    if (activeFilter === "belum") return !isDoneToday;  // Cuma nampilin yang masih bolong
    return true; // Kalau milih "semua", ya lolosin semua
  });

  return (
    <div className="flex flex-col gap-lg max-w-3xl w-full">
      {/* Header Halaman & Tombol Tema */}
      <div className="flex justify-between items-start mb-xxs">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-ink dark:text-white">
            Dashboard
          </h1>
          <p className="text-slate text-body-md mb-lg dark:text-gray-400">
            Pantau progres habit lu hari ini.
          </p>
        </div>

        {/* Ini dia tombol saklarnya */}
        <button 
          onClick={toggleTheme}
          className="text-2xl p-2 rounded-full hover:bg-surface-soft dark:hover:bg-slate-800 transition-colors"
          title="Ganti Tema"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <StatsBoard />
      <HabitForm />

      {/* Area Daftar Habit dengan Filter */}
      <div className="flex flex-col mt-sm">
        
        {/* Tombol Filter ala Tabs */}
        {habits.length > 0 && (
          <div className="flex gap-sm mb-md border-b border-hairline-strong pb-sm">
            {(["semua", "belum", "selesai"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={cn(
                  "px-sm py-xxs rounded-full text-sm font-medium transition-colors capitalize",
                  activeFilter === tab
                    ? "bg-primary text-on-dark shadow-level-1" // Kalau aktif, warnanya ungu
                    : "bg-surface-soft text-slate hover:text-ink" // Kalau nggak, abu-abu pudar
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Render List yang Udah Disaring */}
        <div className="flex flex-col gap-sm">
          {habits.length === 0 ? (
            <div className="text-center py-xl border border-dashed border-hairline-strong rounded-lg text-slate">
              Belum ada habit nih bro. Yuk bikin satu di atas!
            </div>
          ) : filteredHabits.length === 0 ? (
            <div className="text-center py-xl border border-dashed border-hairline-strong rounded-lg text-slate">
              Nggak ada habit di kategori ini bro.
            </div>
          ) : (
            filteredHabits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}