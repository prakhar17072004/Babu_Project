import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

// Users Table (Common for all roles)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  first_name: varchar("first_name", { length: 25 }).notNull(),
  last_name: varchar("last_name", { length: 25 }).notNull(),
  email: varchar("email", { length: 20 }).notNull().unique(),
  mobile_number: varchar("mobile_number", { length: 10 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 10 }).notNull(), // Can be "user", "babu", or "admin"
});

// Babus Table (Specific details for Babu role)
export const babus = pgTable("babus", {
  id: serial("id").primaryKey(),
  first_name: varchar("first_name", { length: 25 }).notNull(),
  last_name: varchar("last_name", { length: 25 }).notNull(),
  mobile_number: varchar("mobile_number", { length: 10 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  babu_id: varchar("babu_id", { length: 20 }).notNull().unique(), // Unique Babu Identifier
});

// Admins Table (Specific details for Admin role)
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  first_name: varchar("first_name", { length: 25 }).notNull(),
  last_name: varchar("last_name", { length: 25 }).notNull(),
  mobile_number: varchar("mobile_number", { length: 10 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  admin_code: varchar("admin_code", { length: 20 }).notNull(), // Unique Admin Code
});
