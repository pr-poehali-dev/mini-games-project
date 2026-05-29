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
    <aside className="flex flex-col items-center pt-5 pb-8 px-3 gap-6 h-full w-14 shrink-0">
      <button
        onClick={() => onChange("profile")}
        className="w-10 h-10 rounded-full bg-[#1a2744] flex items-center justify-center text-white font-bold text-base shadow-md shrink-0"
        title="Профиль"
      >
        ?
      </button>

      <div className="flex flex-col items-center gap-5 flex-1">
        <button
          onClick={() => onChange("home")}
          className="flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
          title="Расписание"
        >
          <Icon name="CalendarDays" size={22} />
        </button>

        <button
          onClick={() => onChange("profile")}
          className="flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
          title="Профиль"
        >
          <Icon name="UserRound" size={22} />
        </button>

        <button
          className="flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
          title="Добавить"
        >
          <Icon name="Plus" size={22} />
        </button>
      </div>
    </aside>
  );
}
