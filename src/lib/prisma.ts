import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// TODO: Remove logs if needed
const prisma =
  globalThis.prisma ||
  new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV === "development") {
  globalThis.prisma = prisma;
}

export { prisma };
