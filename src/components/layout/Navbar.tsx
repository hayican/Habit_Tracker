import { Button } from "../common/Button";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex h-[64px] w-full items-center justify-between border-b border-hairline bg-canvas px-md md:px-xl">
      {/* Bagian Kiri: Logo & Nama App */}
      <div className="flex items-center gap-sm">
        <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-ink-deep text-on-dark font-bold">
          H
        </div>
        <span className="text-body-md font-semibold text-ink">HabitUp</span>
      </div>

      {/* Bagian Kanan: Tombol Aksi */}
      <div className="flex items-center gap-sm">
        <Button variant="ghost" className="hidden sm:inline-flex">
          Log in
        </Button>
        <Button variant="primary">
          Get Started
        </Button>
      </div>
    </nav>
  );
};