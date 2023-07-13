export default interface MatchRootObject {
  data: Datum[];
  status: number;
}

export interface Datum {
  coaches: any[];
  kills: Kill[];
  metadata: Metadata;
  observers: any[];
  players: Players;
  rounds: Round[];
  teams: Teams;
}

export interface Kill {
  assistants: Assistant[];
  damage_weapon_assets: DamageWeaponAssetsClass;
  damage_weapon_id: string;
  damage_weapon_name?: string | null;
  kill_time_in_match: number;
  kill_time_in_round: number;
  killer_display_name: string;
  killer_puuid: string;
  killer_team: Team;
  player_locations_on_kill: PlayerLocationsOn[];
  round?: number;
  secondary_fire_mode: boolean;
  victim_death_location: Location;
  victim_display_name: string;
  victim_puuid: string;
  victim_team: Team;
}

export interface Assistant {
  assistant_display_name: string;
  assistant_puuid: string;
  assistant_team: Team;
}

export enum Team {
  Blue = "Blue",
  Red = "Red",
}

export interface DamageWeaponAssetsClass {
  display_icon?: null | string;
  killfeed_icon?: null | string;
}

export interface PlayerLocationsOn {
  location: Location;
  player_display_name: string;
  player_puuid: string;
  player_team: Team;
  view_radians: number;
}

export interface Location {
  x: number;
  y: number;
}

export interface Metadata {
  cluster: string;
  game_length: number;
  game_start: number;
  game_start_patched: string;
  game_version: string;
  map: string;
  matchid: string;
  mode: string;
  mode_id: string;
  platform: string;
  premier_info: PremierInfo;
  queue: string;
  region: string;
  rounds_played: number;
  season_id: string;
}

export interface PremierInfo {
  matchup_id: null;
  tournament_id: null;
}

export interface Players {
  all_players: AllPlayer[];
  blue: [Object];
  red: [Object];
}

export interface AllPlayer {
  ability_casts: AllPlayerAbilityCasts;
  assets: AllPlayerAssets;
  behavior: Behavior;
  character: string;
  currenttier: number;
  currenttier_patched: string;
  damage_made: number;
  damage_received: number;
  economy: AllPlayerEconomy;
  level: number;
  name: string;
  party_id: string;
  platform: PlatformClass;
  player_card: string;
  player_title: string;
  puuid: string;
  session_playtime: SessionPlaytime;
  stats: Stats;
  tag: string;
  team: Team;
}

export interface AllPlayerAbilityCasts {
  c_cast: number;
  e_cast: number;
  q_cast: number;
  x_cast: number;
}

export interface AllPlayerAssets {
  agent: Agent;
  card: Card;
}

export interface Agent {
  bust: string;
  full: string;
  killfeed: string;
  small: string;
}

export interface Card {
  large: string;
  small: string;
  wide: string;
}

export interface Behavior {
  afk_rounds: number;
  friendly_fire: FriendlyFire;
  rounds_in_spawn: number;
}

export interface FriendlyFire {
  incoming: number;
  outgoing: number;
}

export interface AllPlayerEconomy {
  loadout_value: LoadoutValue;
  spent: LoadoutValue;
}

export interface LoadoutValue {
  average: number;
  overall: number;
}

export interface PlatformClass {
  os: OS;
  type: string;
}

export interface OS {
  name: string;
  string: string;
}

export interface SessionPlaytime {
  milliseconds: number;
  minutes: number;
  seconds: number;
}

export interface Stats {
  assists: number;
  bodyshots: number;
  deaths: number;
  headshots: number;
  kills: number;
  legshots: number;
  score: number;
}

export interface Round {
  bomb_defused: boolean;
  bomb_planted: boolean;
  defuse_events: DefuseEvents;
  end_type: string;
  plant_events: PlantEvents;
  player_stats: PlayerStat[];
  winning_team: Team;
}

export interface DefuseEvents {
  defuse_location: Location | null;
  defuse_time_in_round: number | null;
  defused_by: EdBy | null;
  player_locations_on_defuse: PlayerLocationsOn[] | null;
}

export interface EdBy {
  display_name: string;
  puuid: string;
  team: Team;
}

export interface PlantEvents {
  plant_location: Location | null;
  plant_site: PlantSite | null;
  plant_time_in_round: number | null;
  planted_by: EdBy | null;
  player_locations_on_plant: PlayerLocationsOn[] | null;
}

export enum PlantSite {
  A = "A",
  B = "B",
  C = "C",
}

export interface PlayerStat {
  ability_casts: PlayerStatAbilityCasts;
  bodyshots: number;
  damage: number;
  damage_events: DamageEvent[];
  economy: PlayerStatEconomy;
  headshots: number;
  kill_events: Kill[];
  kills: number;
  legshots: number;
  player_display_name: string;
  player_puuid: string;
  player_team: Team;
  score: number;
  stayed_in_spawn: boolean;
  was_afk: boolean;
  was_penalized: boolean;
}

export interface PlayerStatAbilityCasts {
  c_casts: null;
  e_cast: null;
  q_casts: null;
  x_cast: null;
}

export interface DamageEvent {
  bodyshots: number;
  damage: number;
  headshots: number;
  legshots: number;
  receiver_display_name: string;
  receiver_puuid: string;
  receiver_team: Team;
}

export interface PlayerStatEconomy {
  armor: Armor;
  loadout_value: number;
  remaining: number;
  spent: number;
  weapon: Weapon;
}

export interface Armor {
  assets: ArmorAssets;
  id: null | string;
  name: ArmorName | null;
}

export interface ArmorAssets {
  display_icon: null | string;
}

export enum ArmorName {
  HeavyShields = "Heavy Shields",
  LightShields = "Light Shields",
}

export interface Weapon {
  assets: DamageWeaponAssetsClass;
  id: string;
  name: string;
}

export interface Teams {
  blue: Blue;
  red: Blue;
}

export interface Blue {
  has_won: boolean;
  roster: null;
  rounds_lost: number;
  rounds_won: number;
}
