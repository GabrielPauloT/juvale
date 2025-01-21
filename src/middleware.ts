import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const dashboardURL = new URL("/dashboard", baseUrl);

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(dashboardURL);
  }
}

export const config = {
  matcher: ["/", "/dashboard", "/usuarios", "/funcionarios", "/relatorio", "/vt", "/vr"],
};
