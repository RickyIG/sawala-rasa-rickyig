// import { PrismaClient } from "@/app/generated/prisma";
// import { notFound } from "next/navigation";

// type Props = {
//   params: { slug: string };
// };

// export default async function ArticlePage({ params }: Props) {
//   const prisma = new PrismaClient();

//   const { slug } = await params;

//   const article = await prisma.articles.findUnique({
//     where: { slug },
//     include: { author: true },
//   });

//   if (!article) return notFound();

//   return (
//     <main className="max-w-2xl mx-auto py-10 space-y-4">
//       <h1 className="text-3xl font-bold">{article.title}</h1>
//       <p className="text-muted-foreground">by {article.author.name}</p>
//       <div className="prose">{article.content}</div>
//     </main>
//   );
// }

import { PrismaClient } from "@/app/generated/prisma";
import { notFound } from "next/navigation";
import { CommentList } from "@/components/comment-list";

// type Props = {
//   params: { slug: string };
// };

type Params = Promise<{ slug: string }>;

export default async function ArticlePage({ params }: { params: Params }) {
  const prisma = new PrismaClient();
  const { slug } = await params;

  const article = await prisma.articles.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!article) return notFound();

  return (
    <main className="max-w-2xl mx-auto py-10 space-y-4">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <p className="text-muted-foreground">by {article.author.name}</p>
<p className="text-muted-foreground text-sm">
  Dipublikasikan pada{" "}
  {new Date(article.createdAt).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}{" "}
  WIB
</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none">{article.content}</div>
      <hr className="my-6" />
      <CommentList slug={slug} />
    </main>
  );
}
