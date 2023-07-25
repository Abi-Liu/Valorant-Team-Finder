/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import { Match } from "../interfaces/MatchResponse";

export type User = {
  ign: string;
  team: string;
  cardSmall: string;
  cardLarge: string;
  _id: string;
  rank: string;
  rankImage: string;
  puuid: string;
  region: string;
  matches: [Match] | [];
};

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const defaultState = {
  user: {
    ign: "",
    team: "",
    cardSmall: "",
    cardLarge: "",
    rank: "",
    rankImage: "",
    puuid: "",
    region: "",
    matches: [],
    _id: "",
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: (_user: User) => {},
  loggedIn: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoggedIn: (_loggedIn: boolean) => {},
} as UserContextInterface;

const UserContext = createContext<UserContextInterface>(defaultState);

// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
  return useContext(UserContext);
}

type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({
    ign: "",
    team: "",
    cardSmall: "",
    cardLarge: "",
    _id: "",
    rank: "",
    rankImage: "",
    puuid: "",
    region: "",
    matches: [],
  });
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
