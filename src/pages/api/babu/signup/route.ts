// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/app/db/index";
// import { babus} from "@/app/db/schema";
// import bcrypt from "bcrypt";

// export async function POST(req: NextRequest) {
//   try {
//     const { first_name, last_name, email, mobile_number, password, babu_id,role } = await req.json();

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await db.insert(babus).values({
//       first_name,
//       last_name,
//       email,
//       mobile_number,
//       password: hashedPassword,
//       role,
//       babu_id,
//     });

//     return NextResponse.json({ message: "Babu registered successfully" }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to register babu" }, { status: 500 });
//   }
// }
