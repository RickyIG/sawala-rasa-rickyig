"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function CommentForm({ slug }: { slug: string }) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    setLoading(true);

    const res = await fetch(`/api/article/${slug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      setContent("");
      // Optional: bisa trigger revalidate atau update comment list
    } else {
      const data = await res.json();
      alert(data.message || "Gagal menambahkan komentar.");
    }

    setLoading(false);
  };

  if (!session) {
    return <p className="text-gray-500">Login untuk menulis komentar.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
      <textarea
        className="w-full border rounded p-2"
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis komentar..."
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Mengirim..." : "Kirim"}
      </button>
    </form>
  );
}
