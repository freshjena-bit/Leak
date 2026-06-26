import { NextRequest, NextResponse } from "next/server";
import { adminSupabase } from "@/lib/server";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const form = await req.formData();

    const id = form.get("id")?.toString();

    if (!id) {
      return NextResponse.json(
        { error: "ID kosong" },
        { status: 400 }
      );
    }

    await adminSupabase
      .from("files")
      .update({
        approved: true,
      })
      .eq("id", id);

    return NextResponse.redirect(
      new URL("/admin/dashboard", req.url)
    );
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
