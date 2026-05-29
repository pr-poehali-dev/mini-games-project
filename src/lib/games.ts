export interface Game {
  id: string;
  title: string;
  emoji: string;
  gradient: string;
  description: string;
  category: string;
}

export const GAMES: Game[] = [
  {
    id: "snake",
    title: "Змейка",
    emoji: "🐍",
    gradient: "from-green-500 to-emerald-700",
    description: "Классическая змейка",
    category: "Аркада",
  },
  {
    id: "memory",
    title: "Память",
    emoji: "🧠",
    gradient: "from-purple-500 to-violet-700",
    description: "Найди пары карточек",
    category: "Логика",
  },
  {
    id: "2048",
    title: "2048",
    emoji: "🔢",
    gradient: "from-orange-400 to-red-600",
    description: "Складывай плитки",
    category: "Логика",
  },
  {
    id: "pong",
    title: "Понг",
    emoji: "🏓",
    gradient: "from-blue-400 to-cyan-600",
    description: "Классический пинг-понг",
    category: "Аркада",
  },
  {
    id: "asteroids",
    title: "Астероиды",
    emoji: "🚀",
    gradient: "from-slate-500 to-indigo-700",
    description: "Уничтожай астероиды",
    category: "Аркада",
  },
  {
    id: "tetris",
    title: "Тетрис",
    emoji: "🧱",
    gradient: "from-yellow-400 to-amber-600",
    description: "Складывай блоки",
    category: "Логика",
  },
  {
    id: "minesweeper",
    title: "Сапёр",
    emoji: "💣",
    gradient: "from-gray-500 to-gray-700",
    description: "Найди все мины",
    category: "Логика",
  },
  {
    id: "flappy",
    title: "Флаппи",
    emoji: "🐦",
    gradient: "from-sky-400 to-blue-600",
    description: "Лети сквозь трубы",
    category: "Аркада",
  },
  {
    id: "breakout",
    title: "Арканоид",
    emoji: "🎯",
    gradient: "from-pink-400 to-rose-600",
    description: "Разбивай блоки",
    category: "Аркада",
  },
  {
    id: "sudoku",
    title: "Судоку",
    emoji: "📐",
    gradient: "from-teal-400 to-cyan-700",
    description: "Заполни сетку цифрами",
    category: "Головоломка",
  },
  {
    id: "quiz",
    title: "Квиз",
    emoji: "❓",
    gradient: "from-lime-400 to-green-600",
    description: "Проверь свои знания",
    category: "Головоломка",
  },
  {
    id: "typing",
    title: "Печатайка",
    emoji: "⌨️",
    gradient: "from-fuchsia-400 to-purple-600",
    description: "Скорость печати",
    category: "Навык",
  },
];
