import { cookies } from "next/headers";
import { verifyAdminToken } from "./auth";

export async function requireAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin-token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const payload = verifyAdminToken(token);

  if (!payload) {
    throw new Error("Unauthorized");
  }

  return payload;
}
