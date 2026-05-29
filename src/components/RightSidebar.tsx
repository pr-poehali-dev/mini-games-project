import Icon from "@/components/ui/icon";
import { PlayerProfile } from "@/lib/storage";

type Page = "home" | "profile" | "settings";

interface RightSidebarProps {
  current: Page;
  onChange: (page: Page) => void;
  profile: PlayerProfile;
}

export default function RightSidebar({ current, onChange, profile }: RightSidebarProps) {
  return (
    <aside className="flex flex-col items-center py-5 px-2 gap-4 h-full w-16 shrink-0">
      <button
        onClick={() => onChange("profile")}
        className="w-10 h-10 rounded-full bg-[#1a2744] flex items-center justify-center text-white text-lg shadow-lg mb-2"
        title="Профиль"
      >
        {typeof profile.avatar === "string" && profile.avatar.length <= 2
          ? profile.avatar
          : <Icon name="User" size={18} />}
      </button>

      <div className="flex flex-col items-center gap-3 flex-1">
        <button
          onClick={() => onChange("home")}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            current === "home"
              ? "bg-white/15 text-white"
              : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"
          }`}
          title="Игры"
        >
          <Icon name="LayoutGrid" size={18} />
        </button>

        <button
          onClick={() => onChange("profile")}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            current === "profile"
              ? "bg-white/15 text-white"
              : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"
          }`}
          title="Профиль"
        >
          <Icon name="User" size={18} />
        </button>

        <button
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70 transition-all"
          title="Добавить"
        >
          <Icon name="Plus" size={18} />
        </button>
      </div>
    </aside>
  );
}
