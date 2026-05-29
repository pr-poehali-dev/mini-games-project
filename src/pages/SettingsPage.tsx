import { useState } from "react";
import { PlayerProfile, saveProfile, defaultProfile } from "@/lib/storage";
import Icon from "@/components/ui/icon";

interface SettingsPageProps {
  profile: PlayerProfile;
  onUpdate: (p: PlayerProfile) => void;
}

export default function SettingsPage({ profile, onUpdate }: SettingsPageProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = () => {
    const fresh: PlayerProfile = {
      ...defaultProfile,
      name: profile.name,
      avatar: profile.avatar,
      joinDate: profile.joinDate,
      gameStats: {},
    };
    saveProfile(fresh);
    onUpdate(fresh);
    setConfirmReset(false);
  };

  const totalGames = Object.values(profile.gameStats).reduce((s, g) => s + g.gamesPlayed, 0);

  return (
    <div className="h-full overflow-y-auto px-6 py-6">
      <h1 className="text-xl font-semibold text-white mb-6">Настройки</h1>

      <Section title="Аккаунт">
        <Row icon="User" label="Имя игрока" value={profile.name} />
        <Row icon="Calendar" label="Дата регистрации" value={new Date(profile.joinDate).toLocaleDateString("ru-RU")} />
        <Row icon="Gamepad2" label="Игр сыграно" value={String(totalGames)} />
      </Section>

      <Section title="Данные">
        <div className="rounded-2xl overflow-hidden">
          {confirmReset ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
              <p className="text-white/80 text-sm mb-3">Весь прогресс и статистика будут удалены. Имя и аватар сохранятся.</p>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Да, сбросить
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-sm hover:bg-white/15 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full flex items-center gap-3 px-4 py-3.5 glass rounded-2xl hover:bg-red-500/10 transition-colors group"
            >
              <div className="w-8 h-8 rounded-xl bg-red-500/15 flex items-center justify-center">
                <Icon name="Trash2" size={15} className="text-red-400" />
              </div>
              <span className="text-red-400 text-sm font-medium">Сбросить прогресс</span>
            </button>
          )}
        </div>
      </Section>

      <Section title="О приложении">
        <Row icon="Info" label="Версия" value="1.0.0" />
        <Row icon="Shield" label="Хранение данных" value="Локально" />
        <Row icon="Zap" label="Игр в каталоге" value="12" />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="text-xs text-white/40 mb-2.5 font-medium uppercase tracking-wider px-1">{title}</div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 glass rounded-2xl">
      <div className="w-8 h-8 rounded-xl bg-white/8 flex items-center justify-center shrink-0">
        <Icon name={icon} size={15} className="text-white/50" />
      </div>
      <span className="text-white/70 text-sm flex-1">{label}</span>
      <span className="text-white/40 text-sm">{value}</span>
    </div>
  );
}
