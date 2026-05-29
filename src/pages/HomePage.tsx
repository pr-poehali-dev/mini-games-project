import { useState } from "react";
import { GAMES } from "@/lib/games";
import { PlayerProfile } from "@/lib/storage";
import GameIcon from "@/components/GameIcon";
import GameModal from "@/components/GameModal";
import Icon from "@/components/ui/icon";

interface HomePageProps {
  profile: PlayerProfile;
}

export default function HomePage({ profile }: HomePageProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const game = GAMES.find((g) => g.id === selectedGame);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="shrink-0 flex items-center justify-center gap-6 px-6 py-4">
        <button className="w-10 h-10 flex items-center justify-center rounded-2xl text-white/50 hover:text-white hover:bg-white/5 transition-all">
          <Icon name="Search" size={20} />
        </button>
        <button className="relative w-10 h-10 flex items-center justify-center rounded-2xl text-white/50 hover:text-white hover:bg-white/5 transition-all">
          <Icon name="Gamepad2" size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[980px] px-6 py-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-7 justify-items-center">
            {GAMES.map((game, i) => (
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