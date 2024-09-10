import SignOutButton from "@/app/signout/index";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-card text-card-foreground shadow-md">
        <div className="p-4 bg-primary text-primary-foreground">
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>
        <nav className="mt-4">
          <Link
            href="/dashboard"
            className="block py-2 px-4 text-sm hover:bg-accent hover:text-accent-foreground transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/dashboard/profile"
            className="block py-2 px-4 text-sm hover:bg-accent hover:text-accent-foreground transition duration-300"
          >
            Profile
          </Link>
          <Link
            href="/dashboard/settings"
            className="block py-2 px-4 text-sm hover:bg-accent hover:text-accent-foreground transition duration-300"
          >
            Settings
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
          <SignOutButton />
        </header>
        {children}
      </main>
    </div>
  );
}
