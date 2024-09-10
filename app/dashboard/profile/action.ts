"use server";

import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { compare, hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { usersTable } from "@/db/schema/userSchema";
import { eq } from "drizzle-orm";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters long"),
});

export async function changePassword(
  formData: z.infer<typeof changePasswordSchema>
) {
  const result = changePasswordSchema.safeParse(formData);

  if (!result.success) {
    return { error: "Invalid input" };
  }

  const session = await auth();
  if (!session || !session.user) {
    return { error: "Not authenticated" };
  }

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, Number(session.user.id)));

  if (!user) {
    return { error: "User not found" };
  }

  const passwordsMatch = await compare(
    result.data.currentPassword,
    user[0].password
  );
  if (!passwordsMatch) {
    return { error: "Current password is incorrect" };
  }

  const hashedPassword = await hash(result.data.newPassword, 12);

  await db
    .update(usersTable)
    .set({ password: hashedPassword })
    .where(eq(usersTable.id, user[0].id));

  revalidatePath("/dashboard/profile");
  return { success: "Password changed successfully" };
}
