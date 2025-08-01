"use client";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function CommentSection({ articleId }: { articleId: string }) {
  const { data: session } = useSession();
  const { data: comments, mutate } = useSWR(`/api/article/${articleId}/comments`, fetcher);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articleId, content }),
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      if (!res.ok) {
        alert(data.message || "Gagal menambahkan komentar.");
      } else {
        setContent("");
        mutate(); // Refresh comments
      }
    } catch (err) {
      console.error("Respon bukan JSON:", text);
      alert("Terjadi kesalahan.");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4 mt-6">
      {session ? (
        <form onSubmit={handleSubmit} className="space-y-2">
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
      ) : (
        <p className="text-gray-500">Login untuk menulis komentar.</p>
      )}

      <div className="mt-6 space-y-2">
        {comments?.length === 0 && <p className="text-gray-500">Belum ada komentar.</p>}
        {comments?.map((c: any) => (
          <div key={c.id} className="p-2 border rounded">
            <p className="text-sm text-gray-700">{c.content}</p>
            {c.author?.name && (
              <p className="text-xs text-gray-400 mt-1">oleh {c.author.name}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
