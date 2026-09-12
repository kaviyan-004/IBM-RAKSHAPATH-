import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Sector, UserProfile } from "@/types";
import { login as loginApi, signup as signupApi, type LoginRequest, type SignupRequest } from "@/api/auth";

const STORAGE_KEY = "rakshapath.user";
const SECTOR_STORAGE_KEY = "rakshapath.sector";

interface AuthContextValue {
  user: UserProfile | undefined;
  sector: Sector | undefined;
  isAuthenticated: boolean;
  login: (req: LoginRequest) => Promise<void>;
  signup: (req: SignupRequest) => Promise<void>;
  setSector: (sector: Sector) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readSector(): Sector | undefined {
  try {
    const raw = localStorage.getItem(SECTOR_STORAGE_KEY);
    return raw === "government" || raw === "technical" || raw === "public" ? raw : undefined;
  } catch {
    return undefined;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | undefined>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as UserProfile) : undefined;
    } catch {
      return undefined;
    }
  });
  const [sector, setSectorState] = useState<Sector | undefined>(readSector);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {
      // ignore storage failures (private browsing, etc.)
    }
  }, [user]);

  useEffect(() => {
    try {
      if (sector) localStorage.setItem(SECTOR_STORAGE_KEY, sector);
    } catch {
      // ignore storage failures
    }
  }, [sector]);

  const login = async (req: LoginRequest) => {
    // The backend login contract is strictly { email, password } — sector is
    // frontend-only navigation context and is never sent to the API.
    const profile = await loginApi(req);
    setUser(profile);
  };

  const signup = async (req: SignupRequest) => {
    const profile = await signupApi(req);
    setUser(profile);
  };

  const setSector = (next: Sector) => setSectorState(next);

  const logout = () => {
    setUser(undefined);
    setSectorState(undefined);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SECTOR_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ user, sector, isAuthenticated: Boolean(user), login, signup, setSector, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
