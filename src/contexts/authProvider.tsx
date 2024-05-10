"use client";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState
} from "react";

type AuthContextType = {
  userId: string | null;
  role: string | null;
  isAuthenticated: boolean;
  checkSession: () => Promise<{
    userId: string | null;
    role: string | null;
  }>;
  handleLogout: () => Promise<void>;
  changeUser: (userId: string | null, role: string | null) => void;
  isChekingSession: boolean;
  // setUserId: Dispatch<SetStateAction<string | null>>;
  // setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  // setRole: Dispatch<SetStateAction<string | null>>;
};

export const AuthContext = createContext({} as AuthContextType);

type PropsAuthProvider = {
  children: React.ReactNode;
  authAction: () => Promise<{ userId: string; role: string } | void>;
  logoutAction: () => Promise<void>;
  decodedToken: void | {
    userId: string;
    role: string;
  };
};

function AuthProvider({
  children,
  authAction,
  logoutAction,
  decodedToken
}: PropsAuthProvider) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(
    decodedToken?.userId || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!decodedToken?.userId
  );
  const [role, setRole] = useState<string | null>(decodedToken?.role || null);
  const [isChekingSession, setIsChekingSession] = useState(false);

  const checkSession = async (): Promise<{
    userId: string | null;
    role: string | null;
  }> => {
    try {
      setIsChekingSession(true);
      const tokenDecoded = await authAction();
      setIsChekingSession(false);

      const isAuthenticated: boolean = !!tokenDecoded?.userId;

      setUserId(tokenDecoded?.userId || null);
      setIsAuthenticated(isAuthenticated);
      setRole(tokenDecoded?.role || null);

      return {
        userId: tokenDecoded?.userId || null,
        role: tokenDecoded?.role || null
      };
    } catch (error) {
      return {
        userId: null,
        role: null
      };
    }
  };

  const handleLogout = async () => {
    try {
      setUserId(null);
      setIsAuthenticated(false);
      setRole(null);

      await logoutAction();

      router.push("/login");
    } catch (error) {
      return;
    }
  };

  const changeUser = (userId: string | null, role: string | null) => {
    setUserId(userId);
    setRole(role);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        role,
        isAuthenticated,
        changeUser,
        checkSession,
        handleLogout,
        isChekingSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
