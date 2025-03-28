import { pgTable, serial, varchar, text, integer, timestamp, pgEnum} from "drizzle-orm/pg-core";

export const senderEnum = pgEnum("sender_enum", ["user", "babu"]);
export const statusEnum = pgEnum("status_enum", ["Pending", "Approved", "Rejected", "Completed"]);

// Users Table (Common for all roles)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  first_name: varchar("first_name", { length: 50 }).notNull(),
  last_name: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  mobile_number: varchar("mobile_number", { length: 15 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 200 }).notNull(), // Can be "user", "babu", or "admin"
});

// Babus Table (Specific details for Babu role)
export const babus = pgTable("babus", {
  id: serial("id").primaryKey(),
  first_name: varchar("first_name", { length: 50 }).notNull(),
  last_name: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  mobile_number: varchar("mobile_number", { length: 15 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).notNull(), // Can be "user", "babu", or "admin"
  babu_id: varchar("babu_id", { length: 20 }).notNull().unique(), // Unique Babu Identifier
});

// Admins Table (Specific details for Admin role)
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  first_name: varchar("first_name", { length: 50}).notNull(),
  last_name: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  mobile_number: varchar("mobile_number", { length: 15 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).notNull(), // Can be "user", "babu", or "admin"
  admin_code: varchar("admin_code", { length: 20 }).notNull(), // Unique Admin Code
});


// Applied Services Table
export const appliedServices = pgTable("applied_services", {
  id: serial("id").primaryKey(),
  serviceName: varchar("service_name", { length: 255 }).notNull(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  userMobile: varchar("user_mobile", { length: 20 }).notNull(),
  userDetails: text("user_details"),
  
  status: statusEnum("status").notNull().default("Pending"),
  appliedAt: timestamp("applied_at").defaultNow(),
});

// Messages Table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id")
    .notNull()
    .references(() => appliedServices.id, { onDelete: "cascade" }),
  sender: senderEnum("sender").notNull(), // ✅ Corrected
  message: text("message").notNull(),
  sentAt: timestamp("sent_at").defaultNow(),
});
