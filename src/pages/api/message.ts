import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/db/index";
import { messages } from "@/app/db/schema";
import {eq} from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { serviceId } = req.query;
      if (!serviceId) {
        return res.status(400).json({ error: "Service ID is required" });
      }

      const messagesData = await db
  .select()
  .from(messages)
  .where(eq(messages.service_id, Number(serviceId))); // ✅ Correct usage

      res.status(200).json({ messages: messagesData });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const { service_id, sender, message } = req.body;

      if (!service_id || !sender || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      await db.insert(messages).values({ service_id, sender, message });

      res.status(201).json({ message: "Message Sent" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
