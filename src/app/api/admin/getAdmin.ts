import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { users } from "@/lib/schema";

export async function GET() {
  try {
    const allAdmins = await db.select().from(users).where(users.role.equals("admin"));
    return NextResponse.json(allAdmins, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch admin users" }, { status: 500 });
  }
}
