import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/db/index";
import { users, babus, admins } from "@/app/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { first_name, last_name, email, mobile_number, password, role, admin_code, babu_id } = req.body;

    if (!first_name || !last_name || !email || !mobile_number || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await db.select().from(users).where(eq(users.email, email));
    const existingBabu = await db.select().from(babus).where(eq(babus.email, email));
    const existingAdmin = await db.select().from(admins).where(eq(admins.email, email));

    if (existingUser.length > 0 || existingBabu.length > 0 || existingAdmin.length > 0) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "user") {
      await db.insert(users).values({ first_name, last_name, email, mobile_number, password: hashedPassword, role });
    } else if (role === "babu") {
      if (!babu_id) return res.status(400).json({ error: "babu_id is required" });
      await db.insert(babus).values({ first_name, last_name, email, mobile_number, password: hashedPassword, role, babu_id });
    } else if (role === "admin") {
      if (!admin_code) return res.status(400).json({ error: "admin_code is required" });
      await db.insert(admins).values({ first_name, last_name, email, mobile_number, password: hashedPassword, role, admin_code });
    } else {
      return res.status(400).json({ error: "Invalid role specified" });
    }

    return res.status(201).json({ message: `${role} registered successfully` });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ error: "Failed to register user" });
  }
}
