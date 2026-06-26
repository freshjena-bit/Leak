import UploadForm from "@/components/upload-form";

export default function UploadPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">
        Upload File
      </h1>

      <UploadForm />
    </main>
  );
}
