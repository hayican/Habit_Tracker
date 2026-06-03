import { cn } from "../../utils/cn";

export const Sidebar = () => {
  // Untuk sementara kita hardcode 'Dashboard' sebagai menu aktif
  // Nanti kita ganti dinamis pakai React Router
  const activePath = "/";

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Calendar View", path: "/calendar" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r border-hairline bg-surface-soft p-md md:flex">
      <div className="flex flex-col gap-xs mt-sm">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className={cn(
              "px-sm py-xs rounded-md text-sm transition-colors",
              activePath === item.path
                ? "bg-canvas text-ink font-medium shadow-level-1 border border-hairline"
                : "text-slate hover:bg-surface hover:text-ink"
            )}
          >
            {item.name}
          </a>
        ))}
      </div>
    </aside>
  );
};