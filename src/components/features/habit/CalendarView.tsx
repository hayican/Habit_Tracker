import { cn } from "../../../utils/cn";

interface CalendarViewProps {
  completedDates: string[]; // Kita cuma butuh daftar tanggal dari habitnya
}

export const CalendarView = ({ completedDates }: CalendarViewProps) => {
  // 1. Bikin daftar 7 hari terakhir (dari 6 hari yang lalu sampai hari ini)
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i)); // Mundur dari index
    return d.toISOString().split("T")[0]; // Format ke "YYYY-MM-DD"
  });

  return (
    <div className="flex gap-xs">
      {last7Days.map((date) => {
        // Cek apakah tanggal ini ada di brankas
        const isDone = completedDates.includes(date);
        
        // Ambil angka harinya doang (misal dari "2026-06-08" jadi "08")
        const dayNum = date.split("-")[2];

        return (
          <div
            key={date}
            title={date} // Munculin tooltip tanggal kalau mouse diarahin ke kotaknya
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-sm text-xs font-medium transition-colors cursor-default",
              isDone
                ? "bg-semantic-success text-on-dark shadow-level-1" // Hijau sukses kalau beres
                : "bg-surface-soft text-slate border border-hairline" // Abu-abu pucat kalau bolong
            )}
          >
            {dayNum}
          </div>
        );
      })}
    </div>
  );
};