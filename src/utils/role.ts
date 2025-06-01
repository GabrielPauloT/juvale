import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role?: string;
  [key: string]: unknown;
}

export function getUserRoleFromToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token="))
    ?.split("=")[1];

  if (!token) return null;

  try {
    const decoded: JwtPayload = jwtDecode(token);
    return decoded?.role ?? null;
  } catch {
    return null;
  }
}
