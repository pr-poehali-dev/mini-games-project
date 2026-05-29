export interface GameStats {
  gamesPlayed: number;
  totalScore: number;
  lastPlayed: string | null;
  highScore: number;
}

export interface PlayerProfile {
  name: string;
  avatar: string;
  joinDate: string;
  gameStats: Record<string, GameStats>;
}

const STORAGE_KEY = "gamehub_player";

export const defaultProfile: PlayerProfile = {
  name: "Игрок",
  avatar: "🎮",
  joinDate: new Date().toISOString(),
  gameStats: {},
};

export function loadProfile(): PlayerProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultProfile };
    return JSON.parse(raw);
  } catch {
    return { ...defaultProfile };
  }
}

export function saveProfile(profile: PlayerProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function updateGameStats(
  gameId: string,
  score: number,
  profile: PlayerProfile
): PlayerProfile {
  const prev = profile.gameStats[gameId] ?? {
    gamesPlayed: 0,
    totalScore: 0,
    lastPlayed: null,
    highScore: 0,
  };

  const updated: PlayerProfile = {
    ...profile,
    gameStats: {
      ...profile.gameStats,
      [gameId]: {
        gamesPlayed: prev.gamesPlayed + 1,
        totalScore: prev.totalScore + score,
        lastPlayed: new Date().toISOString(),
        highScore: Math.max(prev.highScore, score),
      },
    },
  };

  saveProfile(updated);
  return updated;
}
