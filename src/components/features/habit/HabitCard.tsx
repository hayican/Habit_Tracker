import { useState } from "react";
import { Habit } from "../../../types/habit.types";
import { useHabitStore } from "../../../store/useHabitStore";
import { Card } from "../../common/Card";
import { Button } from "../../common/Button";
import { CalendarView } from "./CalendarView";
import { calculateCurrentStreak } from "../../../utils/streakCalc"; 

interface HabitCardProps {
  habit: Habit;
}

export const HabitCard = ({ habit }: HabitCardProps) => {
  // Panggil semua fungsi dari brankas lu
  const toggleHabit = useHabitStore((state) => state.toggleHabit);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);
  const editHabit = useHabitStore((state) => state.editHabit); // <-- Ini fungsi edit yang kemaren kita tambahin

  // Kertas buram buat ngatur mode edit
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(habit.name);

  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.completedDates.includes(today);
  const currentStreak = calculateCurrentStreak(habit.completedDates);

  // Fungsi pas tombol simpan diklik
  const handleSave = () => {
    if (newName.trim() !== "") {
      editHabit(habit.id, newName); // Kirim nama baru ke brankas
      setIsEditing(false); // Tutup kolom inputnya
    }
  };

  return (
    <Card variant="base" elevation="level-1" className="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
      
      {/* Bagian Kiri: Info Habit & Kalender Mini */}
      <div className="flex flex-col gap-md flex-1">
        
        {/* Judul atau Kolom Input */}
        <div>
          {isEditing ? (
            // Wajah Editing (Kalau lagi diedit)
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full sm:w-2/3 h-[36px] rounded-md border border-hairline-strong bg-canvas dark:bg-slate-800 px-sm py-xs text-ink dark:text-white focus:border-primary focus:outline-none"
              autoFocus
            />
          ) : (
            // Wajah Normal
            <h3 className="text-xl font-semibold text-ink dark:text-white">{habit.name}</h3>
          )}
          
          <div className="flex items-center gap-xs mt-xs">
            <span className="text-sm text-slate dark:text-gray-400">
              Total Selesai: {habit.completedDates.length} kali
            </span>
            <span className="text-slate text-sm dark:text-gray-500">•</span>
            <span className="text-xs font-semibold text-semantic-warning bg-orange-50 dark:bg-orange-900/30 px-[8px] py-[2px] rounded-sm border border-orange-100 dark:border-orange-800/50">
              🔥 {currentStreak} Hari Streak
            </span>
          </div>
        </div>

        {/* Kalender Mini */}
        <CalendarView completedDates={habit.completedDates} />
        
      </div>
      
      {/* Bagian Kanan: Tombol Aksi */}
      <div className="flex flex-wrap gap-sm sm:self-start">
        {isEditing ? (
          // Tombol pas lagi mode edit
          <>
            <Button variant="primary" onClick={handleSave}>
              Simpan
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => { 
                setIsEditing(false); 
                setNewName(habit.name); // Balikin nama ke awal kalau batal
              }}
            >
              Batal
            </Button>
          </>
        ) : (
          // Tombol pas mode normal
          <>
            <Button 
              variant={isDoneToday ? "secondary" : "primary"} 
              onClick={() => toggleHabit(habit.id, today)}
            >
              {isDoneToday ? "Batal" : "Selesai"}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setIsEditing(true)}
              className="text-slate hover:text-ink dark:hover:text-white"
            >
              Edit
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => deleteHabit(habit.id)}
              className="text-semantic-error hover:bg-semantic-error/10"
            >
              Hapus
            </Button>
          </>
        )}
      </div>
      
    </Card>
  );
};