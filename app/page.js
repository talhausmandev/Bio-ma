"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [bioName, setBioName] = useState("");

  const handleView = () => {
    if (!bioName.trim()) return alert("Please enter a bio short name");
    router.push(`/bio/${bioName}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-lime-400 to-green-600 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-2">📇 Bio<span className="text-lime-600">.ma</span></h1>
        <p className="text-gray-600 mb-6">Create and share your personal bio with one simple link.</p>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => router.push("/create-new-bio")}
            className="bg-lime-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-lime-700 transition"
          >
            ➕ Create Bio
          </button>

          <button
            onClick={() => router.push(`/bio/edit/${bioName}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            ✏️ Edit Bio
          </button>
        </div>

        <div className="mt-4">
          <p className="text-gray-700 mb-2 font-medium">🔍 View a Bio by Short Name:</p>
          <div className="flex justify-center gap-2 flex-wrap">
            <input
              type="text"
              value={bioName}
              onChange={(e) => setBioName(e.target.value)}
              placeholder="Enter short name e.g. talha123"
              className="border px-4 py-2 rounded-lg w-64"
            />
            <button
              onClick={handleView}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              View
            </button>
          </div>
        </div>

        <footer className="text-gray-400 text-sm mt-10">
          Made with 💚 by Talha Usman
        </footer>
      </div>
    </main>
  );
}
