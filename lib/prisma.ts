import { PrismaClient } from '@prisma/client';
import { Pool } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

// Create a pool instance for serverless drivers (kept exported for future use).
export const pool = new Pool({ connectionString });

// Ensure a single PrismaClient instance during hot-reloads in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const client =
  global.prisma ||
  new PrismaClient({
    datasources: { db: { url: connectionString } },
  });

if (process.env.NODE_ENV !== 'production') global.prisma = client;

export default client;
