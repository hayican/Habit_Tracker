import { Card } from "../../components/common/Card";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-lg">
      {/* Header Halaman */}
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-ink mb-xxs">
          Dashboard
        </h1>
        <p className="text-slate text-body-md">
          Pantau progres habit lu hari ini.
        </p>
      </div>

      {/* Kartu Contoh (Nanti diganti sama list habit beneran) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        <Card variant="feature-yellow-bold">
          <h3 className="text-xl font-semibold mb-xs">Semangat Pagi!</h3>
          <p>Lu punya 3 habit yang belum diselesaiin hari ini.</p>
        </Card>
        
        <Card variant="base" elevation="level-1">
          <h3 className="text-xl font-semibold text-ink mb-xs">Statistik</h3>
          <p className="text-slate">Total Streak: 12 Hari</p>
        </Card>
      </div>
    </div>
  );
}