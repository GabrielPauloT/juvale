import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {

  const dashboardURL = new URL("/dashboard", "http://localhost:3000");

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(dashboardURL);
  }
}

export const config = {
  matcher: ["/", "/dashboard", "/usuarios", "/funcionarios", "/relatorio", "/vt", "/vr"],
};
