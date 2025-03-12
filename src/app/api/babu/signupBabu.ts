import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { babus} from "@/db/schema";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { first_name, last_name, email, mobile_number, password, babuId } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(babus).values({
      first_name,
      last_name,
      email,
      mobile_number,
      password: hashedPassword,
      role: "babu",
      babuId,
    });

    return NextResponse.json({ message: "Babu registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to register babu" }, { status: 500 });
  }
}
