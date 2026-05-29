import Icon from "@/components/ui/icon";
import { PlayerProfile } from "@/lib/storage";

type Page = "home" | "profile" | "settings";

interface SidebarProps {
  current: Page;
  onChange: (page: Page) => void;
  profile: PlayerProfile;
}

export default function Sidebar({ current, onChange, profile }: SidebarProps) {
  return (
    <aside className="flex flex-col items-center py-4 px-3 h-full w-16 shrink-0 bg-background">
      <button
        onClick={() => onChange("home")}
        className="w-9 h-9 rounded-xl bg-[#f05a3c] flex items-center justify-center text-white shadow-md mb-10"
        title="Главная"
      >
        <Icon name="Gamepad2" size={20} />
      </button>

      <div className="flex flex-col items-center gap-4 flex-1">
        <NavButton
          icon="House"
          active={current === "home"}
          onClick={() => onChange("home")}
          title="Игры"
        />
        <NavButton
          icon="Users"
          active={current === "profile"}
          onClick={() => onChange("profile")}
          title="Друзья"
        />

        <button
          className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
          title="Добавить"
        >
          <Icon name="Plus" size={20} />
        </button>

        <NavButton icon="FileText" onClick={() => {}} title="Документы" />
        <NavButton icon="Layers" onClick={() => {}} title="Слои" />
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => onChange("profile")}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm overflow-hidden"
          title="Профиль"
        >
          {profile.avatar}
        </button>
        <button
          onClick={() => onChange("settings")}
          className="w-9 h-9 flex items-center justify-center text-white/40 hover:text-white transition-colors"
          title="Ещё"
        >
          <Icon name="MoreHorizontal" size={20} />
        </button>
      </div>
    </aside>
  );
}

function NavButton({
  icon,
  active,
  onClick,
  title,
}: {
  icon: string;
  active?: boolean;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
        active
          ? "bg-white/10 text-white"
          : "text-white/40 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon name={icon} size={20} />
    </button>
  );
}