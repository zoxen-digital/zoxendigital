import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: "Dashboard password is not configured on the server" }, { status: 500 });
  }

  if (password !== process.env.DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("zoxen_dashboard_auth", "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("zoxen_dashboard_auth", "", { path: "/", maxAge: 0 });
  return res;
}
