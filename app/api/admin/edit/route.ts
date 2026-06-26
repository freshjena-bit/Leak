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

  const title = form.get("title")?.toString() ?? "";
  const uploader = form.get("uploader")?.toString() ?? "";
  const description = form.get("description")?.toString() ?? "";
  const download = form.get("download")?.toString() ?? "";
  const preview = form.get("preview")?.toString() ?? "";
  const approved = form.get("approved") === "on";

  const { error } = await adminSupabase
    .from("files")
    .update({
      title,
      uploader,
      description,
      download,
      preview,
      approved,
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }

  return NextResponse.redirect(
    new URL("/admin/dashboard", req.url)
  );
}
