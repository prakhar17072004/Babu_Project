import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { admins } from "@/db/schema";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email,mobile_number, password, role, admin_code } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(admins).values({
      first_name,
      last_name,
      email,
      mobile_number,
      password: hashedPassword,
      role,
      admin_code,
    });

    return NextResponse.json({ message: "Admin registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to register admin" }, { status: 500 });
  }
}
