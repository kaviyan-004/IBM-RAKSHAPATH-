import type { UserProfile } from "@/types";
import { mockUser } from "@/data/mock/user";
import { apiPost, mockDelay, USE_MOCK } from "@/services/httpClient";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
}

/** POST /api/auth/login */
export async function login(request: LoginRequest): Promise<UserProfile> {
  if (USE_MOCK) return mockDelay({ ...mockUser, email: request.email || mockUser.email }, 400);
  return apiPost<UserProfile>("/api/auth/login", request);
}

/** POST /api/auth/signup */
export async function signup(request: SignupRequest): Promise<UserProfile> {
  if (USE_MOCK) {
    const initials = request.fullName
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase();
    return mockDelay({ ...mockUser, name: request.fullName, initials, email: request.email }, 400);
  }
  return apiPost<UserProfile>("/api/auth/signup", request);
}
