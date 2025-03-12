import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { users } from "@/lib/schema";

export async function GET() {
  try {
    const allUsers = await db.select().from(users).where(users.role.equals("user"));
    return NextResponse.json(allUsers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
