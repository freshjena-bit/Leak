import { NextRequest, NextResponse } from "next/server";
import { adminSupabase } from "@/lib/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const id = form.get("id")?.toString();

  if (!id) {
    return NextResponse.json(
      { message: "ID tidak ditemukan" },
      { status: 400 }
    );
  }

  const { error } = await adminSupabase
    .from("files")
    .update({
      approved: true
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json(error, {
      status: 500
    });
  }

  return NextResponse.redirect(
    new URL("/admin/dashboard", req.url)
  );
}
