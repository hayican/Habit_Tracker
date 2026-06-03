import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      {/* Etalase Atas */}
      <Navbar />
      
      {/* Container Utama dengan max-width 1280px sesuai DESIGN.md */}
      <div className="mx-auto flex w-full max-w-[1280px] flex-1 overflow-hidden">
        {/* Menu Samping */}
        <Sidebar />
        
        {/* Area Konten yang bakal ganti-ganti (Dashboard, Settings, dll) */}
        <main className="flex-1 overflow-y-auto p-md md:p-xl">
          {children}
        </main>
      </div>
    </div>
  );
};