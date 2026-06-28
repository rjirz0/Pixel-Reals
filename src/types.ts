export interface Material {
  id: string;
  name: string;
  icon: string; // Emoji or SVG path representation
  color: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic';
}

export interface Recipe {
  id: string;
  outputName: string;
  outputIcon: string;
  outputCount: number;
  pattern: (string | null)[]; // Array of 9 slots (3x3 grid)
  description: string;
  achievement: string;
}

export interface GameMode {
  id: string;
  title: string;
  description: string;
  playersOnline: number;
  version: string;
  tag: string;
  icon: string;
  accentColor: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'UPDATE' | 'EVENT' | 'MAINTENANCE';
  summary: string;
  author: string;
  likes: number;
}

export interface LeaderboardPlayer {
  rank: number;
  username: string;
  avatar: string;
  score: string;
  badge: string;
}
