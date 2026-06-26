import { NextRequest, NextResponse } from "next/server";
import { signAdminToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (
    body.username !== process.env.ADMIN_USERNAME ||
    body.password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json(
      {
        message: "Username atau Password salah",
      },
      {
        status: 401,
      }
    );
  }

  const token = signAdminToken(body.username);

  const res = NextResponse.json({
    success: true,
  });

  res.cookies.set({
    name: "admin-token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
