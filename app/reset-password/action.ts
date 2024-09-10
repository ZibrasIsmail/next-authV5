"use server";

import { db } from "@/db/drizzle";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { usersTable } from "@/db/schema/userSchema";
import { eq } from "drizzle-orm";

const initiateResetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function initiatePasswordReset(
  formData: z.infer<typeof initiateResetSchema>
) {
  const result = initiateResetSchema.safeParse(formData);

  if (!result.success) {
    return { error: "Invalid input" };
  }

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, result.data.email));

  // the email doesn't exist then return the error user not found
  if (!user || user.length === 0) {
    return {
      error: "User not found",
    };
  }

  if (!user || user.length === 0) {
    // Don't reveal if the email exists or not for security reasons
    return {
      success:
        "If an account with that email exists, we've sent a password reset link.",
    };
  }

  // Generate a unique token (you might want to use a library for this)
  const resetToken = Math.random().toString(36).substr(2, 10);
  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

  // Save the token and expiry to the user's record
  await db
    .update(usersTable)
    .set({ resetToken, resetTokenExpiry })
    .where(eq(usersTable.id, user[0].id));

  // Send an email with the reset link
  //   await sendEmail({
  //     to: user[0].email,
  //     subject: "Password Reset",
  //     text: `Click this link to reset your password: http://localhost:3000/reset-password?token=${resetToken}`,
  //   });

  console.log(`http://localhost:3000/reset-password?token=${resetToken}`);

  return {
    success:
      "If an account with that email exists, we've sent a password reset link.",
  };
}

export async function resetPassword(
  formData: z.infer<typeof resetPasswordSchema>
) {
  const result = resetPasswordSchema.safeParse(formData);

  if (!result.success) {
    return { error: "Invalid input" };
  }

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.resetToken, result.data.token));

  if (!user || user.length === 0) {
    return { error: "Invalid or expired reset token" };
  }

  const hashedPassword = await hash(result.data.password, 12);

  await db
    .update(usersTable)
    .set({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    })
    .where(eq(usersTable.id, user[0].id));

  revalidatePath("/reset-password");
  return {
    success:
      "Password reset successfully. You can now log in with your new password.",
  };
}
