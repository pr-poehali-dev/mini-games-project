import { Game } from "@/lib/games";
import { GameStats } from "@/lib/storage";
import Icon from "@/components/ui/icon";

interface GameModalProps {
  game: Game;
  stats?: GameStats;
  onClose: () => void;
  onPlay: () => void;
}

export default function GameModal({ game, stats, onClose, onPlay }: GameModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="glass rounded-3xl w-full max-w-sm overflow-hidden animate-pop-in shadow-2xl border border-white/10">
        <div className={`h-36 bg-gradient-to-br ${game.gradient} flex items-center justify-center relative`}>
          <span className="text-7xl">{game.emoji}</span>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            <Icon name="X" size={14} className="text-white" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-xl font-semibold text-white">{game.title}</h2>
            <span className="text-xs text-white/40 bg-white/8 px-2 py-1 rounded-full">{game.category}</span>
          </div>
          <p className="text-sm text-white/50 mb-5">{game.description}</p>

          {stats && stats.gamesPlayed > 0 ? (
            <div className="grid grid-cols-3 gap-3 mb-5">
              <Stat label="Игр сыграно" value={stats.gamesPlayed} />
              <Stat label="Рекорд" value={stats.highScore} />
              <Stat label="Всего очков" value={stats.totalScore} />
            </div>
          ) : (
            <div className="text-center text-white/30 text-sm mb-5 py-2">Ещё не играли в эту игру</div>
          )}

          <button
            onClick={onPlay}
            className={`w-full py-3.5 rounded-2xl bg-gradient-to-r ${game.gradient} text-white font-semibold text-sm tracking-wide hover:opacity-90 active:scale-95 transition-all`}
          >
            Играть
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center bg-white/5 rounded-2xl py-3 px-2">
      <div className="text-lg font-bold text-white">{value}</div>
      <div className="text-[10px] text-white/40 mt-0.5">{label}</div>
    </div>
  );
}
