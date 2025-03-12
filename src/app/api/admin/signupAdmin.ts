import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { users } from "@/lib/schema";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password, adminCode } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "admin",
      adminCode,
    });

    return NextResponse.json({ message: "Admin registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to register admin" }, { status: 500 });
  }
}
