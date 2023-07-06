import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type User = {
  ign: string;
  team: string;
  _id: string;
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
    _id: "",
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: (user: User) => {},
  loggedIn: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoggedIn: (loggedIn: boolean) => {},
} as UserContextInterface;

const UserContext = createContext<UserContextInterface>(defaultState);

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
    _id: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
