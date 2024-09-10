import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background text-foreground">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <h1 className="text-6xl font-bold">Welcome to Next.js with Auth!</h1>
        <div className="flex mt-6 space-x-4">
          <Link
            href="/signin"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-2 px-4 rounded transition duration-300"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold py-2 px-4 rounded transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
