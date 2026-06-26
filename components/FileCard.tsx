import Image from "next/image";

type Props = {
  file: any;
};

export default function FileCard({ file }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <Image
        src={file.preview || "/no-image.png"}
        width={400}
        height={250}
        alt={file.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">

        <h2 className="font-bold text-lg">
          {file.title}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Upload oleh {file.uploader}
        </p>

        <p className="mt-3 line-clamp-3">
          {file.description}
        </p>

        <a
          href={file.download}
          target="_blank"
          className="mt-5 inline-block bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Download
        </a>

      </div>

    </div>
  );
}
