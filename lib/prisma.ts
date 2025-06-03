import { PrismaClient } from "@prisma/client";
import { Pool } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const connectionString =
  process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

// Configura o pool para queries diretas, se quiser usar sem Prisma
export const pool = new Pool({ connectionString });

// Evita criar múltiplas instâncias do Prisma em desenvolvimento
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: connectionString,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
