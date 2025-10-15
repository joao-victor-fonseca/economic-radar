import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

const prisma = global.__prisma ?? new PrismaClient({
  datasources: { db: { url: connectionString } },
});

if (process.env.NODE_ENV !== "production") global.__prisma = prisma;

export default prisma;
