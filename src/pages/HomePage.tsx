import { useState } from "react";
import { GAMES } from "@/lib/games";
import { PlayerProfile } from "@/lib/storage";
import GameIcon from "@/components/GameIcon";
import GameModal from "@/components/GameModal";

interface HomePageProps {
  profile: PlayerProfile;
}

export default function HomePage({ profile }: HomePageProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const game = GAMES.find((g) => g.id === selectedGame);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[980px] px-6 py-6">
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-x-4 gap-y-6">
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