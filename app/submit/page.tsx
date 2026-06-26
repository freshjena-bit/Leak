"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SubmitPage() {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [uploader, setUploader] = useState("");
  const [description, setDescription] = useState("");
  const [download, setDownload] = useState("");
  const [image, setImage] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!image) {
      alert("Pilih gambar preview.");
      return;
    }

    setLoading(true);

    const ext = image.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("preview")
      .upload(fileName, image);

    if (uploadError) {
      alert(uploadError.message);
      setLoading(false);
      return;
    }

    const { data } = supabase.storage
      .from("preview")
      .getPublicUrl(fileName);

    const preview = data.publicUrl;

    const { error } = await supabase.from("files").insert({
      title,
      uploader,
      description,
      download,
      preview,
      approved: false,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Berhasil dikirim. Menunggu persetujuan admin.");

    setTitle("");
    setUploader("");
    setDescription("");
    setDownload("");
    setImage(null);
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Upload File
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          className="border rounded-lg w-full p-3"
          placeholder="Nama Anda"
          value={uploader}
          onChange={(e) => setUploader(e.target.value)}
          required
        />

        <input
          className="border rounded-lg w-full p-3"
          placeholder="Judul File"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="border rounded-lg w-full p-3"
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />

        <input
          className="border rounded-lg w-full p-3"
          placeholder="Link Download"
          value={download}
          onChange={(e) => setDownload(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files?.[0] || null)
          }
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white rounded-lg w-full py-3"
        >
          {loading ? "Mengirim..." : "Kirim"}
        </button>
      </form>
    </main>
  );
      }
