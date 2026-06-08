import { Habit } from "../../../types/habit.types";
import { useHabitStore } from "../../../store/useHabitStore";
import { Card } from "../../common/Card";
import { Button } from "../../common/Button"; // <-- Udah gw fix jadi 'B' besar ya bro!
import { CalendarView } from "./CalendarView";
import { calculateCurrentStreak } from "../../../utils/streakCalc"; 

interface HabitCardProps {
  habit: Habit;
}

export const HabitCard = ({ habit }: HabitCardProps) => {
  const toggleHabit = useHabitStore((state) => state.toggleHabit);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);

  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.completedDates.includes(today);

  const currentStreak = calculateCurrentStreak(habit.completedDates);

  return (
    <Card variant="base" elevation="level-1" className="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
      
      {/* Bagian Kiri: Info Habit & Kalender Mini */}
      <div className="flex flex-col gap-md">
        
        {/* Judul & Lencana Streak */}
        <div>
          <h3 className="text-xl font-semibold text-ink">{habit.name}</h3>
          
          <div className="flex items-center gap-xs mt-xs">
            <span className="text-sm text-slate">
              Total Selesai: {habit.completedDates.length} kali
            </span>
            <span className="text-slate text-sm">•</span>
            <span className="text-xs font-semibold text-semantic-warning bg-orange-50 px-[8px] py-[2px] rounded-sm border border-orange-100">
              🔥 {currentStreak} Hari Streak
            </span>
          </div>
        </div>

        {/* Ini dia Kalender Mini-nya kita pasang di sini! */}
        <CalendarView completedDates={habit.completedDates} />
        
      </div>
      
      {/* Bagian Kanan: Tombol Aksi */}
      <div className="flex gap-sm sm:self-start">
        <Button 
          variant={isDoneToday ? "secondary" : "primary"} 
          onClick={() => toggleHabit(habit.id, today)}
        >
          {isDoneToday ? "Batal" : "Selesai"}
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={() => deleteHabit(habit.id)}
          className="text-semantic-error hover:bg-semantic-error/10"
        >
          Hapus
        </Button>
      </div>
      
    </Card>
  );
};