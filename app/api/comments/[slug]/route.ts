// File: app/api/comments/[slug]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
//   try {
//     const article = await prisma.articles.findUnique({
//       where: { slug: params.slug },
//       select: {
//         comments: {
//           orderBy: { createdAt: "desc" },
//           include: {
//             author: { select: { name: true, email: true } },
//           },
//         },
//       },
//     });

const prisma = new PrismaClient();

type Props = {
  params: { slug: string };
};

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;
    const article = await prisma.articles.findUnique({
      where: { slug },
      select: {
        comments: {
          orderBy: { createdAt: "desc" },
          include: {
            author: { select: { name: true, email: true } },
          },
        },
      },
    });

    return NextResponse.json(article?.comments ?? []);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { content } = body;

  try {
    const article = await prisma.articles.findUnique({
      where: { slug: params.slug },
    });
    if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });

    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
    });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: user.id,
        articleId: article.id,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, content } = await req.json();

  try {
    const user = await prisma.users.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const existing = await prisma.comment.findUnique({ where: { id } });
    if (existing?.authorId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.comment.update({
      where: { id },
      data: { content },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  try {
    const user = await prisma.users.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const existing = await prisma.comment.findUnique({ where: { id } });
    if (existing?.authorId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.comment.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
