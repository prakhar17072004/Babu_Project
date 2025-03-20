import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/db/index";
import { users, babus, admins } from "@/app/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm"; // Drizzle query helper

export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email, mobile_number, password, role, admin_code, babu_id } = await req.json();

    // Validate common fields
    if (!first_name || !last_name || !email || !mobile_number || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if email already exists in any table
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    const existingBabu = await db.select().from(babus).where(eq(babus.email, email));
    const existingAdmin = await db.select().from(admins).where(eq(admins.email, email));

    if (existingUser.length > 0 || existingBabu.length > 0 || existingAdmin.length > 0) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine role and insert into the correct table
    if (role === "user") {
      await db.insert(users).values({ first_name, last_name, email, mobile_number, password: hashedPassword, role });
    } else if (role === "babu") {
      if (!babu_id) return NextResponse.json({ error: "babu_id is required" }, { status: 400 });
      await db.insert(babus).values({ first_name, last_name, email, mobile_number, password: hashedPassword, role, babu_id });
    } else if (role === "admin") {
      if (!admin_code) return NextResponse.json({ error: "admin_code is required" }, { status: 400 });
      await db.insert(admins).values({ first_name, last_name, email, mobile_number, password: hashedPassword, role, admin_code });
    } else {
      return NextResponse.json({ error: "Invalid role specified" }, { status: 400 });
    }

    return NextResponse.json({ message: `${role} registered successfully` }, { status: 201 });

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}
