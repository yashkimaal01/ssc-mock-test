"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim()) {
      router.push(`/quiz?name=${encodeURIComponent(name)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">SSC Mock Test</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded mb-4 w-64"
      />
      <button
        onClick={handleStart}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Start Test
      </button>
    </div>
  );
}
