import Image from "next/image";
import Link from "next/link";

type FileItem = {
  id: string;
  title: string;
  uploader: string;
  description: string;
  preview: string;
  downloads: number;
};

export default function FileCard({
  file,
}: {
  file: FileItem;
}) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      <Image
        src={file.preview || "/no-image.png"}
        alt={file.title}
        width={600}
        height={350}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">

        <h2 className="font-bold text-lg line-clamp-2">
          {file.title}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Upload: {file.uploader}
        </p>

        <p className="mt-3 text-gray-700 line-clamp-3">
          {file.description}
        </p>

        <div className="flex justify-between items-center mt-5">

          <span className="text-sm text-gray-500">
            {file.downloads} Download
          </span>

          <Link
            href={`/file/${file.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Lihat
          </Link>

        </div>

      </div>

    </div>
  );
}
