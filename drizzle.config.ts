import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/app/db/schema.ts",
  out: "./src/app/db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL as string, // Ensure it's a string
  },
});