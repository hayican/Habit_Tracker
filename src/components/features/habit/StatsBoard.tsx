import { useHabitStore } from "../../../store/useHabitStore";
import { Card } from "../../common/Card";

export const StatsBoard = () => {
  // Ambil semua data habit dari brankas
  const habits = useHabitStore((state) => state.habits);
  
  // 1. Hitung total habit
  const totalHabits = habits.length;
  
  // 2. Hitung yang selesai HARI INI
  const today = new Date().toISOString().split("T")[0];
  const completedToday = habits.filter((habit) => 
    habit.completedDates.includes(today)
  ).length;
  
  // 3. Hitung persentase (pakai Math.round biar angkanya genap, misal 67%)
  // Kita cek dulu totalHabits-nya nol atau nggak, biar nggak error (dibagi nol itu dilarang di matematika)
  const progressPercentage = totalHabits === 0 
    ? 0 
    : Math.round((completedToday / totalHabits) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-md mb-lg">
      
      {/* Kotak 1: Total Habit */}
      <Card variant="base" elevation="level-1" className="flex flex-col border-l-4 border-l-slate">
        <span className="text-sm font-medium text-slate mb-xs">Total Habit</span>
        <span className="text-3xl font-semibold text-ink">{totalHabits}</span>
      </Card>

      {/* Kotak 2: Selesai Hari Ini */}
      <Card variant="base" elevation="level-1" className="flex flex-col border-l-4 border-l-semantic-success">
        <span className="text-sm font-medium text-slate mb-xs">Selesai Hari Ini</span>
        <div className="flex items-baseline gap-xs">
          <span className="text-3xl font-semibold text-ink">{completedToday}</span>
          <span className="text-sm text-slate">/ {totalHabits}</span>
        </div>
      </Card>

      {/* Kotak 3: Persentase Progres */}
      <Card variant="base" elevation="level-1" className="flex flex-col border-l-4 border-l-primary">
        <span className="text-sm font-medium text-slate mb-xs">Progres Harian</span>
        <span className="text-3xl font-semibold text-ink">{progressPercentage}%</span>
      </Card>

    </div>
  );
};