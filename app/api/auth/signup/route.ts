import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { hash } from "bcryptjs";
import { usersTable } from "@/db/schema/userSchema";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await hash(password, 10);

    const user = await db.insert(usersTable).values({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      user,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
}
