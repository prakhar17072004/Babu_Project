import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email, mobile_number, password } = await req.json();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    await db.insert(users).values({
      first_name,
      last_name,
      email,
      mobile_number,
      password: hashedPassword,
      role:"user",
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}
