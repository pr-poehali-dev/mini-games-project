import Icon from "@/components/ui/icon";

type Page = "home" | "profile" | "settings";

interface SidebarProps {
  current: Page;
  onChange: (page: Page) => void;
}

const NAV = [
  { id: "home" as Page, icon: "Grid3X3", label: "Игры" },
  { id: "profile" as Page, icon: "User", label: "Профиль" },
  { id: "settings" as Page, icon: "Settings", label: "Настройки" },
];

export default function Sidebar({ current, onChange }: SidebarProps) {
  return (
    <aside className="flex flex-col items-center w-[72px] h-screen py-6 glass border-r border-white/[0.06] shrink-0 z-10">
      <div className="mb-8 text-xl select-none">🎮</div>

      <nav className="flex flex-col gap-2 flex-1">
        {NAV.map((item) => {
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`nav-item w-12 h-12 relative group ${active ? "active" : ""}`}
              title={item.label}
            >
              {active && (
                <span className="absolute inset-0 rounded-2xl bg-white/10" />
              )}
              <Icon
                name={item.icon}
                size={20}
                className={
                  active
                    ? "text-white"
                    : "text-white/40 group-hover:text-white/70 transition-colors"
                }
              />
              <span
                className={`text-[9px] font-medium tracking-wide transition-colors ${
                  active ? "text-white" : "text-white/30 group-hover:text-white/50"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto text-[9px] text-white/20 tracking-widest uppercase rotate-90 origin-center">
        Hub
      </div>
    </aside>
  );
}
