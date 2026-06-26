"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/?q=" + encodeURIComponent(q));
  }

  return (
    <form
      onSubmit={submit}
      className="flex gap-2 my-6"
    >
      <input
        className="border rounded-lg px-4 py-3 w-full"
        placeholder="Cari file..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-5 rounded-lg"
      >
        Cari
      </button>
    </form>
  );
}
