import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function createUser(user: Prisma.UserCreateInput, res: any) {
  return prisma.user.create({ data: user });
}
