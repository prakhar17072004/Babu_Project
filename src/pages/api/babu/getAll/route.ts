// import { NextResponse } from "next/server";
// import { db } from "@/app/db/index";
// import { babus } from "@/app/db/schema";
// import { eq } from "drizzle-orm"; // Import eq for filtering

// export async function GET() {
//   try {
//     // Fetch users where role is "user"
//     const userList = await db.select().from(babus).where(eq(babus.role, "babu"));

//     return NextResponse.json({ users: userList }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
//   }
// }
