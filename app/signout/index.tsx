"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { signOutAction } from "./action";

export default function SignOutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await signOutAction();
        router.push("/");
      } catch (error) {
        console.error("Error during sign out:", error);
      }
    });
  };

  return (
    <button
      type="button"
      className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center"
      onClick={handleSignOut}
      disabled={isPending}
    >
      {isPending ? (
        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
      ) : (
        "Sign Out"
      )}
    </button>
  );
}
