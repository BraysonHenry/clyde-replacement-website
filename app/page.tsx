"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-6">
      <div className="max-w-lg text-center space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Clyde Replacement
        </h1>
        <p className="text-zinc-400 text-lg">
          Connect your Discord account to access your personal dashboard.
        </p>

        {session ? (
          <Link
            href="/dashboard"
            className="inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <button
            onClick={() =>
              signIn("discord", {
                callbackUrl: "https://clyde-replacement-gg.vercel.app/dashboard",
              })
            }
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 transition"
          >
            Connect Discord Account
          </button>
        )}
      </div>
    </main>
  );
}
