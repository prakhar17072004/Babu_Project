import { NextResponse } from "next/server";
import { db } from "@/app/db/index";
import { users, babus, admins } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export default async function GET(request) {
  try {
    // Extract user role from request (assuming it's coming from headers or cookies)
    const role = request.headers.get("role"); // Adjust based on your auth system
    
    let userList = [];

    if (role === "user") {
      userList = await db.select().from(users).where(eq(users.role, "user"));
    } else if (role === "babu") {
      userList = await db.select().from(babus).where(eq(babus.role, "babu"));
    } else if (role === "admin") {
      userList = await db.select().from(admins).where(eq(admins.role, "admin"));
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ users: userList }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
