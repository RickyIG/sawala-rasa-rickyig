import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

/**
 * Mengambil data user yang sedang login dari session + database
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.users.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return user;
}
