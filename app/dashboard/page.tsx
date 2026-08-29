"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [guilds, setGuilds] = useState<DiscordGuild[]>([]);
  const [loadingGuilds, setLoadingGuilds] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGuilds() {
      if (!session?.accessToken) return;

      try {
        const response = await fetch("https://discord.com/api/v10/users/@me/guilds", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Discord servers");
        }

        const data: DiscordGuild[] = await response.json();
        setGuilds(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoadingGuilds(false);
      }
    }

    if (session) {
      fetchGuilds();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="animate-pulse text-lg font-medium">Loading session...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* User Profile Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
          <div className="flex items-center gap-4">
            {session?.user?.image && (
              <img
                src={session.user.image}
                alt="Avatar"
                className="w-16 h-16 rounded-full border-2 border-indigo-500"
              />
            )}
            <div>
              <h1 className="text-xl font-bold">{session?.user?.name}</h1>
              <p className="text-sm text-zinc-400">Connected Discord Account</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-lg bg-red-600/20 px-4 py-2 text-sm font-medium text-red-400 border border-red-500/30 hover:bg-red-600/30 transition"
          >
            Disconnect Account
          </button>
        </div>

        {/* Guilds List Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Discord Servers</h2>

          {loadingGuilds ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-zinc-900 border border-zinc-800 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          ) : guilds.length === 0 ? (
            <p className="text-zinc-400">No servers found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {guilds.map((guild) => {
                const iconUrl = guild.icon
                  ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
                  : null;

                return (
                  <div
                    key={guild.id}
                    className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-4 hover:border-indigo-500/50 transition"
                  >
                    {iconUrl ? (
                      <img
                        src={iconUrl}
                        alt={guild.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex w-12 h-12 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                        {guild.name.charAt(0)}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="font-semibold truncate">{guild.name}</p>
                      {guild.owner && (
                        <span className="inline-block mt-1 text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                          Owner
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
