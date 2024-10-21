"use client";
import { User } from "@/@types/User";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { CartContext } from "./CartProvider";

type UserContext = {
  user: User | undefined;
  getUserLogged: () => Promise<User | undefined>;
  changeUserLogged: (user: User) => void;
  handleLogout: () => Promise<void>;
};

export const UserContext = createContext({} as UserContext);

type UserProviderProps = {
  getUserLoggedAction: () => Promise<User | undefined>;
  logoutAction: () => Promise<void>;
  children: React.ReactNode;
};

function UserProvider({
  getUserLoggedAction,
  logoutAction,
  children
}: UserProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { changeCartId, changeCartItems } = useContext(CartContext);
  const router = useRouter();

  const getUserLogged = async (): Promise<User | undefined> => {
    const user: User | undefined = await getUserLoggedAction();

    setUser(user);

    if (!user) {
      await logoutAction();
    }

    return user;
  };

  const changeUserLogged = (user: User) => setUser(user);

  const handleLogout = async () => {
    try {
      await logoutAction();

      setUser(undefined);

      changeCartId(undefined);
      changeCartItems([]);

      router.push("/login");
    } catch (error) {
      router.push("/login");
      return;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        getUserLogged,
        changeUserLogged,
        handleLogout
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
