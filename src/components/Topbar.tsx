import Icon from "@/components/ui/icon";
import { PlayerProfile } from "@/lib/storage";

type Page = "home" | "profile" | "settings";

interface TopbarProps {
  current: Page;
  onChange: (page: Page) => void;
  profile: PlayerProfile;
}

interface NavItem {
  id: Page | null;
  icon: string;
  label: string;
  badge?: number;
}

const NAV: NavItem[] = [
  { id: "home", icon: "House", label: "Dashboard" },
  { id: null, icon: "ShoppingBag", label: "Orders", badge: 2 },
  { id: null, icon: "Archive", label: "Products" },
  { id: "profile", icon: "User", label: "Customers", badge: 4 },
  { id: null, icon: "BarChart3", label: "Analytics" },
  { id: null, icon: "Target", label: "Marketing" },
  { id: null, icon: "Landmark", label: "Finance", badge: 2 },
  { id: null, icon: "Truck", label: "Shipping" },
];

export default function Topbar({ current, onChange, profile }: TopbarProps) {
  return (
    <header className="w-full h-16 shrink-0 bg-white border-b border-gray-200 flex items-center px-5 gap-6">
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
          <Icon name="Flower2" size={18} />
        </div>
        <span className="text-blue-600 font-bold text-lg tracking-tight">
          Shopall
        </span>
      </div>

      <div className="flex items-center gap-1 shrink-0 pl-4 border-l border-gray-200">
        <button className="flex items-center gap-2 h-9 px-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <span className="w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            C
          </span>
          <span className="text-sm font-medium text-gray-900">Capstore</span>
          <Icon name="ChevronDown" size={16} className="text-gray-400" />
        </button>
      </div>

      <nav className="flex items-center gap-1 flex-1 overflow-x-auto">
        {NAV.map((item, i) => {
          const active = item.id !== null && current === item.id;
          return (
            <button
              key={i}
              onClick={() => item.id && onChange(item.id)}
              className={`flex items-center gap-2 h-9 px-3 rounded-lg whitespace-nowrap transition-colors ${
                active
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span className="text-sm font-medium">{item.label}</span>
              {item.badge && (
                <span className="text-xs font-medium text-gray-500 border border-gray-200 rounded-md px-1.5 leading-5">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-1 shrink-0 pl-4 border-l border-gray-200">
        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
          title="Messages"
        >
          <Icon name="Mail" size={18} />
        </button>
        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
          title="Notifications"
        >
          <Icon name="Bell" size={18} />
        </button>
        <button
          onClick={() => onChange("settings")}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
          title="Settings"
        >
          <Icon name="Settings" size={18} />
        </button>

        <button
          onClick={() => onChange("profile")}
          className="flex items-center gap-2 h-10 pl-1.5 pr-2 ml-1 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-sm overflow-hidden">
            {profile.avatar}
          </span>
          <span className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-sm font-semibold text-gray-900">
              {profile.name}
            </span>
          </span>
          <Icon name="ChevronDown" size={16} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
}
