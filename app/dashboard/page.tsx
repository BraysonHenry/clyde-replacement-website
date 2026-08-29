"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Guild {
  id: string;
  name: string;
  icon: string | null;
  permissions: string;
  owner?: boolean;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session && (session as any).accessToken) {
      fetch("https://discord.com/api/v10/users/@me/guilds", {
        headers: {
          Authorization: `Bearer ${(session as any).accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            // Filter to servers where user is Owner or has Administrator permission (0x8)
            const adminGuilds = data.filter(
              (g: Guild) => (BigInt(g.permissions) & BigInt(0x8)) === BigInt(0x8) || g.owner
            );
            setGuilds(adminGuilds);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else if (status !== "loading") {
      setLoading(false);
    }
  }, [session, status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading your Discord servers...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard Access Required</h1>
        <p className="text-slate-400 mb-6 max-w-md">
          Log in with your Discord account to configure AI (Replacement for Clyde) for your servers.
        </p>
        <button
          onClick={() => signIn("discord")}
          className="bg-[#5865F2] hover:bg-[#4752C4] font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-[#5865F2]/20 text-white"
        >
          Sign In with Discord
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Your Servers</h1>
            <p className="text-slate-400 text-sm mt-1">Select a server to manage Clyde AI settings.</p>
          </div>
          <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
            <span className="text-sm font-semibold text-slate-300">{session.user?.name}</span>
          </div>
        </div>

        {guilds.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
            <p className="text-slate-400">No manageable servers found. You must be an owner or administrator.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {guilds.map((guild) => (
              <div
                key={guild.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col items-center text-center hover:border-[#5865F2] transition"
              >
                {guild.icon ? (
                  <img
                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                    alt={guild.name}
                    className="w-16 h-16 rounded-full mb-4 shadow-md"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#5865F2] flex items-center justify-center font-bold text-xl mb-4 text-white shadow-md">
                    {guild.name.substring(0, 2)}
                  </div>
                )}
                <h3 className="font-bold text-lg mb-4 text-slate-100 line-clamp-1">{guild.name}</h3>
                <Link
                  href={`/dashboard/${guild.id}`}
                  className="w-full bg-slate-800 hover:bg-[#5865F2] text-sm font-semibold py-2.5 rounded-xl transition text-white"
                >
                  Configure Bot
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
