import { NextRequest, NextResponse } from "next/server";
import { adminSupabase } from "@/lib/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const id = form.get("id")?.toString();

  if (!id) {
    return NextResponse.json(
      { message: "ID kosong" },
      { status: 400 }
    );
  }

  const { data } = await adminSupabase
    .from("files")
    .select("preview")
    .eq("id", id)
    .single();

  if (data?.preview) {
    const fileName = data.preview.split("/").pop();

    if (fileName) {
      await adminSupabase.storage
        .from("preview")
        .remove([fileName]);
    }
  }

  const { error } = await adminSupabase
    .from("files")
    .delete()
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
