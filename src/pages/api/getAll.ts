import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { db } from "@/app/db/index";
import { users, babus, admins } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key"; // Store in .env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

    let user = null;
    let role = "";

    // Fetch user from respective role table
    user = await db.select().from(users).where(eq(users.email, email));
    if (user.length > 0) role = "user";

    if (!user.length) {
      user = await db.select().from(babus).where(eq(babus.email, email));
      if (user.length > 0) role = "babu";
    }

    if (!user.length) {
      user = await db.select().from(admins).where(eq(admins.email, email));
      if (user.length > 0) role = "admin";
    }

    if (!user.length) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) return res.status(401).json({ error: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign({ id: user[0].id, role }, SECRET_KEY, { expiresIn: "1h" });

    // Store token in HTTP-only cookie
    res.setHeader("Set-Cookie", serialize("auth_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", path: "/" }));

    return res.status(200).json({ role });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
