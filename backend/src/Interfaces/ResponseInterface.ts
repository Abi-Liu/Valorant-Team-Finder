export interface ProfileRootObject {
  data: ProfileData;
  status: number;
}

export interface ProfileData {
  account_level: number;
  card: ProfileCard;
  last_update: string;
  last_update_raw: number;
  name: string;
  puuid: string;
  region: string;
  tag: string;
}

export interface ProfileCard {
  id: string;
  large: string;
  small: string;
  wide: string;
}

export interface RankRootObject {
  data: RankData;
  status: number;
}

export interface RankData {
  currenttier: number;
  currenttierpatched: string;
  elo: number;
  images: Images;
  mmr_change_to_last_game: number;
  name: string;
  old: boolean;
  ranking_in_tier: number;
  tag: string;
}

export interface Images {
  large: string;
  small: string;
  triangle_down: string;
  triangle_up: string;
}
