import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "@/app/db/index";
import { users, babus, admins } from "@/app/db/schema";
import { eq } from "drizzle-orm";

const SECRET_KEY = process.env.JWT_SECRET as string;

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "Email, password, and role are required" });
    }

    let user;

    switch (role) {
      case "user":
        user = await db.select().from(users).where(eq(users.email, email));
        break;
      case "babu":
        user = await db.select().from(babus).where(eq(babus.email, email));
        break;
      case "admin":
        user = await db.select().from(admins).where(eq(admins.email, email));
        break;
      default:
        return res.status(401).json({ error: "Unauthorized role" });
    }

    if (!user || user.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const storedHashedPassword = user[0].password;
    const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ email: user[0].email, role: user[0].role }, SECRET_KEY, { expiresIn: "1h" });

    const { password: _, ...userData } = user[0]; // Exclude password from response

    return res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });

  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Failed to log in" });
  }
}
