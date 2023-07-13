export interface DatabaseUserInterface {
  ign: string;
  email: string;
  password: string;
  team: string;
  _id: string;
}

export interface MatchDBInterface {
  user: string;
  redPlayers: [Object];
  bluePlayers: [Object];
  redWon: Object;
  blueWon: Object;
  _id: string;
}
