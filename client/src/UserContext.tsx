import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type User = {
  ign: string;
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
    _id: "",
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: (user: User) => {},
} as UserContextInterface;

export const UserContext = createContext<UserContextInterface>(defaultState);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({
    ign: "",
    _id: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
