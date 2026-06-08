import { useHabitStore } from "../../store/useHabitStore";
import { HabitForm } from "../../components/features/habit/HabitForm";
import { HabitCard } from "../../components/features/habit/HabitCard";

export default function Dashboard() {
  // Ambil daftar habit dari brankas Zustand
  const habits = useHabitStore((state) => state.habits);

  return (
    <div className="flex flex-col gap-lg max-w-3xl">
      {/* Header Halaman & Formulir Tambah Habit */}
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-ink mb-xxs">
          Dashboard
        </h1>
        <p className="text-slate text-body-md mb-md">
          Pantau progres habit lu hari ini.
        </p>
        
        {/* Panggil komponen HabitForm lu di sini */}
        <HabitForm />
      </div>

      {/* Area Daftar Habit */}
      <div className="flex flex-col gap-sm mt-md">
        {habits.length === 0 ? (
          // Tampilan kalau brankas masih kosong (Empty State)
          <div className="text-center py-xl border border-dashed border-hairline-strong rounded-lg text-slate">
            Belum ada habit nih bro. Yuk bikin satu di atas!
          </div>
        ) : (
          // Looping data habit jadi barisan kartu
          habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))
        )}
      </div>
    </div>
  );
}