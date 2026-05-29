import { useState } from "react";
import { PlayerProfile, saveProfile } from "@/lib/storage";
import { GAMES } from "@/lib/games";
import Icon from "@/components/ui/icon";

interface ProfilePageProps {
  profile: PlayerProfile;
  onUpdate: (p: PlayerProfile) => void;
}

const AVATARS = ["🎮", "🕹️", "👾", "🦊", "🐉", "⚡", "🔥", "🌙", "💎", "🚀"];

export default function ProfilePage({ profile, onUpdate }: ProfilePageProps) {
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(profile.name);

  const totalGames = Object.values(profile.gameStats).reduce((s, g) => s + g.gamesPlayed, 0);
  const totalScore = Object.values(profile.gameStats).reduce((s, g) => s + g.totalScore, 0);
  const bestGame = GAMES.find(
    (g) =>
      profile.gameStats[g.id]?.highScore ===
      Math.max(...Object.values(profile.gameStats).map((s) => s.highScore), 0)
  );

  const saveName = () => {
    const updated = { ...profile, name: name.trim() || "Игрок" };
    saveProfile(updated);
    onUpdate(updated);
    setEditingName(false);
  };

  const pickAvatar = (emoji: string) => {
    const updated = { ...profile, avatar: emoji };
    saveProfile(updated);
    onUpdate(updated);
  };

  const joinDate = new Date(profile.joinDate).toLocaleDateString("ru-RU", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="h-full overflow-y-auto px-6 py-6">
      <h1 className="text-xl font-semibold text-white mb-6">Профиль</h1>

      <div className="glass rounded-3xl p-6 mb-4">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-3xl shrink-0">
            {profile.avatar}
          </div>
          <div className="flex-1 min-w-0">
            {editingName ? (
              <div className="flex gap-2">
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveName()}
                  className="bg-white/10 text-white rounded-xl px-3 py-1.5 text-sm flex-1 outline-none border border-white/20 focus:border-white/40"
                  maxLength={20}
                />
                <button onClick={saveName} className="p-1.5 rounded-xl bg-white/10 hover:bg-white/15">
                  <Icon name="Check" size={14} className="text-white" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-lg truncate">{profile.name}</span>
                <button onClick={() => setEditingName(true)} className="opacity-40 hover:opacity-70 transition-opacity">
                  <Icon name="Pencil" size={13} className="text-white" />
                </button>
              </div>
            )}
            <p className="text-white/30 text-xs mt-1">С нами с {joinDate}</p>
          </div>
        </div>

        <div className="text-xs text-white/40 mb-2 font-medium uppercase tracking-wider">Аватар</div>
        <div className="flex flex-wrap gap-2">
          {AVATARS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => pickAvatar(emoji)}
              className={`w-9 h-9 rounded-xl text-lg transition-all ${
                profile.avatar === emoji
                  ? "bg-white/20 scale-110"
                  : "bg-white/6 hover:bg-white/12"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <StatCard label="Игр сыграно" value={totalGames} icon="Gamepad2" />
        <StatCard label="Всего очков" value={totalScore} icon="Star" />
        <StatCard label="Игр открыто" value={Object.keys(profile.gameStats).length} icon="Trophy" />
      </div>

      {bestGame && profile.gameStats[bestGame.id]?.highScore > 0 && (
        <div className="glass rounded-3xl p-4 flex items-center gap-3">
          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${bestGame.gradient} flex items-center justify-center text-xl`}>
            {bestGame.emoji}
          </div>
          <div>
            <div className="text-xs text-white/40 mb-0.5">Лучшая игра</div>
            <div className="text-white font-semibold text-sm">{bestGame.title}</div>
            <div className="text-xs text-white/50">Рекорд: {profile.gameStats[bestGame.id].highScore}</div>
          </div>
        </div>
      )}

      {Object.keys(profile.gameStats).length > 0 && (
        <div className="mt-4">
          <div className="text-xs text-white/40 mb-3 font-medium uppercase tracking-wider">История игр</div>
          <div className="flex flex-col gap-2">
            {GAMES.filter((g) => profile.gameStats[g.id]).map((game) => {
              const stats = profile.gameStats[game.id];
              return (
                <div key={game.id} className="glass rounded-2xl px-4 py-3 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-lg shrink-0`}>
                    {game.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium">{game.title}</div>
                    <div className="text-white/40 text-xs">{stats.gamesPlayed} игр · рекорд {stats.highScore}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="glass rounded-2xl p-4 flex flex-col gap-2">
      <Icon name={icon} size={16} className="text-white/40" />
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-[10px] text-white/40 leading-tight">{label}</div>
    </div>
  );
}
