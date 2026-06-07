import { useState } from "react";
import { useHabitStore } from "../../../store/useHabitStore";
import { Button } from "../../common/button";

export const HabitForm = () => {
  // 1. Ini untuk nyimpen teks yang lagi lu ketik sementara
  const [title, setTitle] = useState("");
  
  // 2. Ini kita panggil fungsi nambah data dari brankas Zustand lu
  const addHabit = useHabitStore((state) => state.addHabit);

  // 3. Fungsi ini jalan pas lu nekan tombol "Tambah" atau pencet Enter
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Biar webnya gak ke-refresh pas form dikirim
    
    // Cegah user masukin teks kosong
    if (title.trim() === "") return;

    addHabit(title); // Masukin teksnya ke brankas
    setTitle("");    // Kosongin lagi kolom inputnya
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-sm">
      <input
        type="text"
        placeholder="Tulis habit baru lu di sini..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-[44px] flex-1 rounded-md border border-hairline-strong bg-canvas px-md py-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none"
      />
      <Button type="submit" variant="primary">
        Tambah
      </Button>
    </form>
  );
};