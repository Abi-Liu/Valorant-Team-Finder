export enum Region {
  na = "na",
  br = "br",
  eu = "eu",
  ap = "ap",
  kr = "kr",
  latam = "latam",
}

export interface ProfileResponse {
  puuid: string;
  region: Region;
  cardSmall: string;
  cardLarge: string;
  rank: string;
  rankImage: string;
  user: string;
  _id: string;
}

export interface Match {
  playerTeam: string;
  playerStats: object;
  adr: number;
  character: string;
  redWon: object;
  blueWon: object;
}

export interface MatchArrayResponse {
  matches: [Match];
  user: string;
  _id: string;
}
