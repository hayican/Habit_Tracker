import { Habit } from "../../../types/habit.types";
import { useHabitStore } from "../../../store/useHabitStore";
import { Card } from "../../common/Card";
import { Button } from "../../common/button";

interface HabitCardProps {
  habit: Habit; // Minta data habit sesuai cetakan yang udah lu bikin
}

export const HabitCard = ({ habit }: HabitCardProps) => {
  // Panggil fungsi toggle (ceklis) dan delete (hapus) dari brankas
  const toggleHabit = useHabitStore((state) => state.toggleHabit);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);

  // Ambil tanggal hari ini (format: YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];
  
  // Cek apakah tanggal hari ini ada di dalam daftar completedDates habit ini
  const isDoneToday = habit.completedDates.includes(today);

  return (
    <Card variant="base" elevation="level-1" className="flex items-center justify-between">
      {/* Bagian Kiri: Info Habit */}
      <div>
        <h3 className="text-xl font-semibold text-ink">{habit.name}</h3>
        <p className="text-sm text-slate mt-xs">
          Total Selesai: {habit.completedDates.length} kali
        </p>
      </div>
      
      {/* Bagian Kanan: Tombol Aksi */}
      <div className="flex gap-sm">
        {/* Tombol Ceklis */}
        <Button 
          variant={isDoneToday ? "secondary" : "primary"} 
          onClick={() => toggleHabit(habit.id, today)}
        >
          {isDoneToday ? "Batal" : "Selesai"}
        </Button>
        
        {/* Tombol Hapus */}
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