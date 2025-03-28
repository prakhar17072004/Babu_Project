import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/db/index"; // Adjust import if needed
import { appliedServices } from "@/app/db/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      console.log("Fetching applied services...");
      const services = await db.select().from(appliedServices);
      console.log("Services Fetched:", services);
      res.status(200).json({ services });
    } catch (error) {
      console.error("Database Error (GET):", error);
      
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      res.status(500).json({ error: "Internal Server Error", details: errorMessage });
    }
  } else if (req.method === "POST") {
    try {
      const { serviceName, userName, userMobile, babuId } = req.body;

      if (!serviceName || !userName || !userMobile) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const insertedService = await db
        .insert(appliedServices)
        .values({ serviceName, userName, userMobile }) // Handle undefined
        .returning();

      console.log("Inserted Service:", insertedService);
      res.status(201).json({ message: "Service Applied", service: insertedService });
    } catch (error) {
      console.error("Database Error (GET):", error);
      
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      res.status(500).json({ error: "Internal Server Error", details: errorMessage });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
