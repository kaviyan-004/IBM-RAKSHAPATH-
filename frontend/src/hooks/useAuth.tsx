import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { UserProfile } from "@/types";
import { login as loginApi, signup as signupApi, type LoginRequest, type SignupRequest } from "@/api/auth";

const STORAGE_KEY = "rakshapath.user";

interface AuthContextValue {
  user: UserProfile | undefined;
  isAuthenticated: boolean;
  login: (req: LoginRequest) => Promise<void>;
  signup: (req: SignupRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | undefined>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as UserProfile) : undefined;
    } catch {
      return undefined;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {
      // ignore storage failures (private browsing, etc.)
    }
  }, [user]);

  const login = async (req: LoginRequest) => {
    const profile = await loginApi(req);
    setUser(profile);
  };

  const signup = async (req: SignupRequest) => {
    const profile = await signupApi(req);
    setUser(profile);
  };

  const logout = () => {
    setUser(undefined);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), login, signup, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
