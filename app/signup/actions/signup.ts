"use server";

import { z } from "zod";
import { hash } from "bcryptjs";
import { db } from "@/db/drizzle";
import { usersTable } from "@/db/schema/userSchema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function signUpAction(formData: FormData) {
  const validatedFields = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    const [newUser] = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning();

    cookies().set("session", newUser.id.toString(), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to create user" };
  }
}
