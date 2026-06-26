"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    setLoading(false);

    if (!res.ok) {
      alert("Username atau password salah");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={login}
        className="bg-white shadow rounded-xl p-8 w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-6">
          Admin Login
        </h1>

        <input
          className="border rounded-lg p-3 w-full mb-4"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          className="border rounded-lg p-3 w-full mb-6"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full rounded-lg py-3"
        >
          {loading ? "Loading..." : "Login"}
        </button>

      </form>

    </main>
  );
          }
