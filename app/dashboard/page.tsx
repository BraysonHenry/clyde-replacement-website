"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="p-8 text-white">Loading session...</div>;
  }

  if (!session) {
    return <div className="p-8 text-white">Please log in with Discord.</div>;
  }

  return (
    <main className="p-8 text-white">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
    </main>
  );
}
