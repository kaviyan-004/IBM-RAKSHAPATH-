export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
export const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? "true") !== "false";

/**
 * Thin wrapper so every api/* module hits the real backend once VITE_USE_MOCK=false,
 * without any page component needing to change.
 */
export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`GET ${path} failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`POST ${path} failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/** Simulates network latency in mock mode so loading states are exercised. */
export function mockDelay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
