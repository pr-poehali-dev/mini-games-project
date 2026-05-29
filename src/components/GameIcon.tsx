import { Game } from "@/lib/games";
import { GameStats } from "@/lib/storage";

interface GameIconProps {
  game: Game;
  stats?: GameStats;
  onClick: () => void;
  index: number;
}

export default function GameIcon({ game, stats, onClick, index }: GameIconProps) {
  return (
    <div
      className="flex flex-col items-center gap-2 cursor-pointer group animate-pop-in"
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: "both", opacity: 0 }}
      onClick={onClick}
    >
      <div className="game-icon w-16 h-16 sm:w-[72px] sm:h-[72px] shadow-lg">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />

        {stats && stats.gamesPlayed > 0 && (
          <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow">
            {stats.gamesPlayed > 99 ? "99" : stats.gamesPlayed}
          </div>
        )}
      </div>

      <span className="text-[11px] text-white/60 font-medium text-center leading-tight max-w-[72px] truncate group-hover:text-white/90 transition-colors">
        {game.title}
      </span>
    </div>
  );
}