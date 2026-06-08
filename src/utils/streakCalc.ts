export const calculateCurrentStreak = (completedDates: string[]): number => {
  // Kalau belum pernah ngerjain sama sekali, streak-nya otomatis 0
  if (!completedDates || completedDates.length === 0) return 0;

  let currentStreak = 0;
  
  // Ambil tanggal hari ini dan kita bersihin jam/menitnya biar perbandingannya pas
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Variabel buat nyatet "hari apa yang lagi kita cek sekarang"
  const checkDate = new Date(today);

  // Kita ubah tanggal yang lagi dicek jadi format "YYYY-MM-DD"
  const formatDate = (date: Date) => {
    // Hindari masalah zona waktu dengan ngerakit string manual pakai offset lokal
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Cek apakah HARI INI udah diceklis
  const isDoneToday = completedDates.includes(formatDate(checkDate));

  // Kalau hari ini belum diceklis, rentetan belum tentu putus!
  // Bisa aja dia ngerjain kemarin, tapi hari ini dia belum buka app.
  // Jadi, kita mulai ngeceknya mundur dari KEMARIN.
  if (!isDoneToday) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  // Looping mundur hari demi hari (maksimal cek mundur 1000 hari biar aman)
  for (let i = 0; i < 1000; i++) {
    const dateString = formatDate(checkDate);
    
    if (completedDates.includes(dateString)) {
      // Kalau tanggal tersebut ada di daftar, streak nambah 1
      currentStreak++;
      // Mundur lagi ke hari sebelumnya
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      // Kalau pas dicek ternyata tanggalnya nggak ada di daftar, rentetan PUTUS
      break; 
    }
  }

  return currentStreak;
};