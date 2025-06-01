import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_JWT_SECRET!
);

async function getRoleFromToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload?.role;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = await getRoleFromToken(token);

  const isAdminRoute = req.nextUrl.pathname === "/usuario";

  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/usuarios",
    "/funcionarios",
    "/relatorio",
    "/usuario",
  ],
};
