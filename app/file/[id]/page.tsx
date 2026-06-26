import { adminSupabase } from "@/lib/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function FileDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: file } = await adminSupabase
    .from("files")
    .select("*")
    .eq("id", id)
    .eq("approved", true)
    .single();

  if (!file) {
    notFound();
  }

  await adminSupabase
    .from("files")
    .update({
      downloads: (file.downloads ?? 0) + 1,
    })
    .eq("id", id);

  return (
    <main className="max-w-4xl mx-auto p-6">

      <Image
        src={file.preview}
        width={900}
        height={500}
        alt={file.title}
        className="rounded-xl w-full"
      />

      <h1 className="text-4xl font-bold mt-6">
        {file.title}
      </h1>

      <p className="text-gray-500 mt-2">
        Upload oleh {file.uploader}
      </p>

      <p className="mt-5 whitespace-pre-wrap">
        {file.description}
      </p>

      <div className="mt-8 flex gap-4">

        <a
          href={file.download}
          target="_blank"
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Download
        </a>

      </div>

      <p className="mt-6 text-sm text-gray-500">
        Download : {file.downloads}
      </p>

    </main>
  );
          }
