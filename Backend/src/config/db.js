import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/logger.js";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export async function connectDB() {
  try {
    await prisma.$connect();
    logger.info("✓ PostgreSQL connected successfully via Prisma ORM");
  } catch (error) {
    logger.error("❌ PostgreSQL connection failed:", error.message);
    logger.warn("⚠️ Ensure PostgreSQL is running and DATABASE_URL in .env is valid.");
  }
}

