import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg"

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Neon
});

export const db = drizzle(pool);