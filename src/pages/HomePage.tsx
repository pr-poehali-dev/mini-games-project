import { useState } from "react";
import { GAMES } from "@/lib/games";
import { PlayerProfile } from "@/lib/storage";
import GameIcon from "@/components/GameIcon";
import GameModal from "@/components/GameModal";

interface HomePageProps {
  profile: PlayerProfile;
}

const CATEGORIES = ["Все", "Аркада", "Логика", "Головоломка", "Навык"];

export default function HomePage({ profile }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const filtered = selectedCategory === "Все"
    ? GAMES
    : GAMES.filter((g) => g.category === selectedCategory);

  const game = GAMES.find((g) => g.id === selectedGame);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="shrink-0 sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="mx-auto w-full max-w-[980px] px-6 pt-5 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold text-white">Игры</h1>
              <p className="text-xs text-white/40 mt-0.5">{GAMES.length} игр доступно</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-600 flex items-center justify-center text-sm shrink-0">
              {profile.avatar}
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white/70"
                }`}
                style={selectedCategory !== cat ? { background: "rgba(255,255,255,0.08)" } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[980px] px-6 py-6">
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-x-4 gap-y-6">
            {filtered.map((game, i) => (
              <GameIcon
                key={game.id}
                game={game}
                stats={profile.gameStats[game.id]}
                onClick={() => setSelectedGame(game.id)}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>

      {game && (
        <GameModal
          game={game}
          stats={profile.gameStats[game.id]}
          onClose={() => setSelectedGame(null)}
          onPlay={() => {
            alert(`Игра "${game.title}" скоро будет добавлена!`);
            setSelectedGame(null);
          }}
        />
      )}
    </div>
  );
}