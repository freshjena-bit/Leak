import { adminSupabase } from "@/lib/server";
import { notFound } from "next/navigation";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: file } = await adminSupabase
    .from("files")
    .select("*")
    .eq("id", id)
    .single();

  if (!file) notFound();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit File
      </h1>

      <form
        action="/api/admin/edit"
        method="POST"
        className="space-y-4"
      >
        <input
          type="hidden"
          name="id"
          defaultValue={file.id}
        />

        <input
          name="title"
          defaultValue={file.title}
          className="border rounded-lg w-full p-3"
        />

        <input
          name="uploader"
          defaultValue={file.uploader}
          className="border rounded-lg w-full p-3"
        />

        <textarea
          name="description"
          defaultValue={file.description}
          className="border rounded-lg w-full p-3"
          rows={5}
        />

        <input
          name="download"
          defaultValue={file.download}
          className="border rounded-lg w-full p-3"
        />

        <input
          name="preview"
          defaultValue={file.preview}
          className="border rounded-lg w-full p-3"
        />

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            name="approved"
            defaultChecked={file.approved}
          />
          Approved
        </label>

        <button className="bg-blue-600 text-white rounded-lg px-5 py-3">
          Simpan
        </button>
      </form>
    </main>
  );
          }
