"use client";

import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="animate-pulse text-lg">Connecting to Discord...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-6">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl text-center">
        {session?.user?.image && (
          <img
            src={session.user.image}
            alt="Discord Avatar"
            className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-indigo-500"
          />
        )}
        <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}!</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Your Discord account is connected.
        </p>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-6 w-full rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 transition"
        >
          Disconnect Account
        </button>
      </div>
    </main>
  );
}
