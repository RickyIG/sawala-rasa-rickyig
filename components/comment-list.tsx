// "use client";

// import useSWR from "swr";
// import { useSession } from "next-auth/react";
// import { useState } from "react";

// export function CommentList({ slug }: { slug: string }) {
//   const { data: session } = useSession();
//   const { data: comments = [], mutate } = useSWR(`/api/comments/${slug}`, (url) =>
//     fetch(url).then((res) => res.json())
//   );
//   const [newContent, setNewContent] = useState("");
//   const [editing, setEditing] = useState<{ id: string; content: string } | null>(null);

//   const handleCreate = async () => {
//     if (!newContent.trim()) return;
//     await fetch(`/api/comments/${slug}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ content: newContent }),
//     });
//     setNewContent("");
//     mutate();
//   };

//   const handleUpdate = async (id: string) => {
//     if (!editing || !editing.content.trim()) return;
//     await fetch(`/api/comments/${slug}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id, content: editing.content }),
//     });
//     setEditing(null);
//     mutate();
//   };

//   const handleDelete = async (id: string) => {
//     await fetch(`/api/comments/${slug}`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     mutate();
//   };

//   return (
//     <div className="space-y-4 mt-8">
//       <h3 className="text-xl font-semibold">Komentar</h3>
//       {comments.map((comment: any) => (
//         <div key={comment.id} className="border p-3 rounded-md">
//           <p className="text-sm text-muted-foreground">{comment.author.name}</p>
//           {editing?.id === comment.id ? (
//             <div className="space-y-2 mt-1">
//               <textarea
//                 value={editing?.content ?? ""}
//                 onChange={(e) =>
//                   setEditing((prev) => prev ? { ...prev, content: e.target.value } : null)
//                 }
//                 className="w-full border p-2 rounded"
//               />
//               <button
//                 className="text-sm text-blue-500"
//                 onClick={() => handleUpdate(comment.id)}
//               >
//                 Simpan
//               </button>
//             </div>
//           ) : (
//             <p className="mt-1">{comment.content}</p>
//           )}
//           {session?.user?.email === comment.author.email && (
//             <div className="space-x-2 mt-2">
//               <button
//                 className="text-xs text-yellow-600"
//                 onClick={() =>
//                   setEditing({ id: comment.id, content: comment.content })
//                 }
//               >
//                 Edit
//               </button>
//               <button
//                 className="text-xs text-red-600"
//                 onClick={() => handleDelete(comment.id)}
//               >
//                 Hapus
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//       {session ? (
//         <div className="space-y-2 mt-4">
//           <textarea
//             value={newContent}
//             onChange={(e) => setNewContent(e.target.value)}
//             placeholder="Tulis komentar..."
//             className="w-full border p-2 rounded"
//           />
//           <button
//             className="bg-blue-500 text-white px-4 py-1 rounded"
//             onClick={handleCreate}
//           >
//             Kirim
//           </button>
//         </div>
//       ) : (
//         <p className="text-sm text-muted-foreground mt-4">
//           Silakan login untuk memberi komentar.
//         </p>
//       )}
//     </div>
//   );
// }

// File: CommentList.tsx

// "use client";

// import useSWR from "swr";
// import { useSession } from "next-auth/react";
// import { useState } from "react";

// export function CommentList({ slug }: { slug: string }) {
//   const { data: session } = useSession();
//   const { data: comments = [], mutate } = useSWR(`/api/comments/${slug}`, (url) => fetch(url).then(res => res.json()));
//   const [newContent, setNewContent] = useState("");
//   const [editing, setEditing] = useState<{ id: string; content: string } | null>(null);

//   const handleCreate = async () => {
//     if (!newContent.trim()) return;
//     await fetch(`/api/comments/${slug}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ content: newContent }),
//     });
//     setNewContent("");
//     mutate();
//   };

//   const handleUpdate = async (id: string) => {
//     if (!editing || !editing.content.trim()) return;
//     await fetch(`/api/comments/${slug}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id, content: editing.content }),
//     });
//     setEditing(null);
//     mutate();
//   };

//   const handleDelete = async (id: string) => {
//     await fetch(`/api/comments/${slug}`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     mutate();
//   };

//   return (
//     <div className="space-y-4 mt-8">
//       <h3 className="text-xl font-semibold">Komentar</h3>
//       {comments.map((comment: any) => (
//         <div key={comment.id} className="border p-3 rounded-md">
//           <p className="text-sm text-muted-foreground">{comment.author.name}</p>
//           {editing?.id === comment.id ? (
//             <div className="space-y-2 mt-1">
//               <textarea
//                 value={editing?.content ?? ""}
//                 onChange={(e) =>
//                   setEditing((prev) => prev ? { ...prev, content: e.target.value } : null)
//                 }
//                 className="w-full border p-2 rounded"
//               />
//               <button className="text-sm text-blue-500" onClick={() => handleUpdate(comment.id)}>Simpan</button>
//             </div>
//           ) : (
//             <p className="mt-1">{comment.content}</p>
//           )}
//           {session?.user?.email && comment.author.email === session.user.email && (
//             <div className="space-x-2 mt-2">
//               <button className="text-xs text-yellow-600" onClick={() => setEditing({ id: comment.id, content: comment.content })}>Edit</button>
//               <button className="text-xs text-red-600" onClick={() => handleDelete(comment.id)}>Hapus</button>
//             </div>
//           )}
//         </div>
//       ))}
//       {session ? (
//         <div className="space-y-2 mt-4">
//           <textarea
//             value={newContent}
//             onChange={(e) => setNewContent(e.target.value)}
//             placeholder="Tulis komentar..."
//             className="w-full border p-2 rounded"
//           />
//           <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={handleCreate}>Kirim</button>
//         </div>
//       ) : (
//         <p className="text-sm text-muted-foreground mt-4">Silakan login untuk memberi komentar.</p>
//       )}
//     </div>
//   );
// }

// File: components/comment-list.tsx

"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export function CommentList({ slug }: { slug: string }) {
  const { data: session } = useSession();
  const { data: comments = [], mutate } = useSWR(`/api/comments/${slug}`, (url) =>
    fetch(url).then((res) => res.json())
  );

    // console.log("Data Sesi:", session);
//   console.log("Data Komentar:", comments);

  const [newContent, setNewContent] = useState("");
  const [editing, setEditing] = useState<{ id: string; content: string } | null>(null);

  const handleCreate = async () => {
    if (!newContent.trim()) return;
    await fetch(`/api/comments/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newContent }),
    });
    setNewContent("");
    mutate();
  };

  const handleUpdate = async (id: string) => {
    if (!editing || !editing.content.trim()) return;
    await fetch(`/api/comments/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, content: editing.content }),
    });
    setEditing(null);
    mutate();
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Yakin ingin menghapus komentar ini?");
    if (!confirmed) return;

    await fetch(`/api/comments/${slug}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    mutate();
  };

  return (
    <div className="space-y-4 mt-8">
      <h3 className="text-xl font-semibold">Komentar</h3>

      {comments.map((comment: any) => (
        <div key={comment.id} className="border p-3 rounded-md">
          <p className="text-sm text-muted-foreground">
  {comment.author?.name ?? "Anonim"} ·{" "}
  {new Date(comment.createdAt).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  })}
  {comment.updatedAt !== comment.createdAt && (
    <span className="text-xs text-gray-500"> (updated)</span>
  )}
</p>

          {editing?.id == comment.id ? (
            <div className="space-y-2 mt-1">
              <textarea
                value={editing?.content}
                onChange={(e) =>
                  setEditing((prev) => (prev ? { ...prev, content: e.target.value } : null))
                }
                className="w-full border p-2 rounded"
              />
              <div className="flex gap-2 mt-1">
                <button
                  className="px-2 py-1 bg-blue-500 text-white text-sm rounded"
                  onClick={() => handleUpdate(comment.id)}
                >
                  Simpan
                </button>
                <button
                  className="px-2 py-1 bg-gray-300 text-sm rounded"
                  onClick={() => setEditing(null)}
                >
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-1">{comment.content}</p>
          )}

          {session?.user?.email && comment.author?.email == session.user.email && (
            <div className="flex gap-2 mt-2 text-sm">
              <button
                className="text-yellow-600 hover:underline"
                onClick={() => setEditing({ id: comment.id, content: comment.content })}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDelete(comment.id)}
              >
                Hapus
              </button>
            </div>
          )}
        </div>
      ))}

      {session ? (
        <div className="space-y-2 mt-4">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Tulis komentar..."
            className="w-full border p-2 rounded"
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            onClick={handleCreate}
          >
            Kirim
          </button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground mt-4">Silakan login untuk memberi komentar.</p>
      )}

            <div className="flex flex-col sm:flex-row gap-2 pt-4">
        <Button asChild variant="outline" className="text-sm">
          <Link href="/">← Kembali ke Home</Link>
        </Button>
        {session && (
          <Button asChild variant="outline" className="text-sm">
            <Link href="/dashboard">← Kembali ke Dashboard</Link>
          </Button>
        )}
      </div>
    </div>

    
  );
}
