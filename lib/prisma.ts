import { PrismaClient } from "@prisma/client";
import { Pool } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

// Verifica se o DATABASE_URL_UNPOOLED foi definido. Caso contrário, usa DATABASE_URL.
const connectionString =
  process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

// Configura o pool de conexões para o Neon (se necessário, dependendo do ambiente).
const pool = new Pool({ connectionString });

// Inicializa o Prisma Client com a URL correta
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionString,
    },
  },
});

export default prisma;
