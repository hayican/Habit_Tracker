import { useEffect } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import {useThemeStore} from "./store/useThemeStore";

export default function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark'); // Matiin lampu
    } else {
      document.documentElement.classList.remove('dark'); // Nyalain lampu
    }
  }, [isDarkMode]);;

  return (
    <div className="min-h-screen bg-canvas dark:bg-slate-900 transition-colors duration-300 py-lg px-md flex justify-center">
      <Dashboard />
    </div>
  );
}
