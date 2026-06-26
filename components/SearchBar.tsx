"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();

  const [keyword, setKeyword] = useState(
    params.get("q") ?? ""
  );

  function search(e: React.FormEvent) {
    e.preventDefault();

    const url = new URLSearchParams();

    if (keyword.trim()) {
      url.set("q", keyword.trim());
    }

    url.set("page", "1");

    router.push("/?" + url.toString());
  }

  return (
    <form
      onSubmit={search}
      className="flex gap-3 mb-8"
    >

      <input
        className="border rounded-lg p-3 flex-1"
        placeholder="Cari File..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-6 rounded-lg"
      >
        Cari
      </button>

    </form>
  );
}
