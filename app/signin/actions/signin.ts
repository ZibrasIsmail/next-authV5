"use server";

import { db } from "@/db/drizzle";
import { usersTable } from "@/db/schema/userSchema";
import { signIn } from "@/lib/auth";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function signInAction(email: string, password: string) {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const validatedFields = loginSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.errors[0].message ?? "Invalid fields",
    };
  }

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, error: "Invalid password" };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    console.error("Error during sign in:", error);
    return { success: false, error: "Sign in failed" };
  }
}
