export interface MatchResponse {
  __v: number;
  _id: string;
  expiryTime: Date;
  matches: Match[];
  user: string;
}

export interface Match {
  _id: string;
  adr: number;
  blueWon: Won;
  character: string;
  image: string;
  playerStats: PlayerStats;
  redWon: Won;
  team: string;
}

export interface PlayerStats {
  assists: number;
  bodyshots: number;
  deaths: number;
  headshots: number;
  kills: number;
  legshots: number;
  score: number;
}

export interface Won {
  has_won: boolean;
  roster: null;
  rounds_lost: number;
  rounds_won: number;
}
