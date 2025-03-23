import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/db/index";
import { users, babus, admins } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const role = req.headers.role as string;

    if (!role) {
      return res.status(400).json({ error: "Role is required" });
    }

    let userList = [];

    switch (role) {
      case "user":
        userList = await db.select().from(users).where(eq(users.role, "user"));
        break;
      case "babu":
        userList = await db.select().from(babus).where(eq(babus.role, "babu"));
        break;
      case "admin":
        userList = await db.select().from(admins).where(eq(admins.role, "admin"));
        break;
      default:
        return res.status(401).json({ error: "Unauthorized role" });
    }

    return res.status(200).json({ users: userList });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
}
