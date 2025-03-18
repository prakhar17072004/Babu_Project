import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/db/index";
import { users } from "@/app/db/schema";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email, mobile_number, password, role } = await req.json();

    // Validate input
    if (!first_name || !last_name || !email || !mobile_number || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if the email already exists
    const existingUser = await db.select().from(users).where(users.email.eq(email)).execute();
    if (existingUser.length > 0) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    await db.insert(users).values({
      first_name,
      last_name,
      email,
      mobile_number,
      password: hashedPassword,
      role,
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}
