import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function signAdminToken(username: string) {
  return jwt.sign(
    {
      username,
      role: "admin",
    },
    SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyAdminToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
