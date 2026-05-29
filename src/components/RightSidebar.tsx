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
          className="w-10 h-10 flex items-center justify-center rounded-2xl text-white/50 hover:text-white hover:bg-white/5 transition-all"
          title="Расписание"
        >
          <Icon name="CalendarDays" size={20} />
        </button>

        <button
          onClick={() => onChange("profile")}
          className="w-10 h-10 flex items-center justify-center rounded-2xl text-white/50 hover:text-white hover:bg-white/5 transition-all"
          title="Профиль"
        >
          <Icon name="UserRound" size={20} />
        </button>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-2xl text-white/50 hover:text-white hover:bg-white/5 transition-all"
          title="Добавить"
        >
          <Icon name="Plus" size={20} />
        </button>
      </div>
    </aside>
  );
}