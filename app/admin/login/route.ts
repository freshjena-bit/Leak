import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const username = body.username?.trim();
  const password = body.password;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json(
      { message: "Username atau password salah" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    {
      username
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d"
    }
  );

  const response = NextResponse.json({
    success: true
  });

  response.cookies.set({
    name: "admin-token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return response;
}
