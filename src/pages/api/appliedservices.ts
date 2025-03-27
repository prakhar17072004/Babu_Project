import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db/drizzle";
import { appliedServices } from "@/db/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const services = await db.select().from(appliedServices);
      res.status(200).json({ services });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const { serviceName, userName, userMobile, babuName, babuMobile } = req.body;

      if (!serviceName || !userName || !userMobile) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const [service] = await db
        .insert(appliedServices)
        .values({ serviceName, userName, userMobile, babuName, babuMobile })
        .returning();

      res.status(201).json({ message: "Service Applied", service });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
