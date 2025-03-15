export interface SocialMedia {
  instagram: string;
  github: string;
  linkedin: string;
}

export interface UserStats {
  quizzesTaken: number;
  correctAnswers: number;
  wrongAnswers: number;
  averageTime: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  bio: string;
  profilePic: string;
  social: SocialMedia;
  score: number;
  profileShared: boolean;
  durationOnLeaderboard: string;
  levelFinished: number;
  averageScore: number;
  badges: string[];
  interests: string[];
  stats: UserStats;
}

export interface LeaderboardThreshold {
  score: number;
  level: number;
}

export interface UserData {
  users: User[];
  leaderboardThreshold: LeaderboardThreshold;
}