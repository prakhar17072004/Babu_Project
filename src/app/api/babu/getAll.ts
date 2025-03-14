import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { users } from "@/lib/schema";

export async function GET() {
  try {
    const allBabus = await db.select().from(users).where(users.role.equals("babu"));
    return NextResponse.json(allBabus, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch babu users" }, { status: 500 });
  }
}
