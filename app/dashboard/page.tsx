'use client';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
}

export default function DashboardPage() {
  // Safely evaluate session context
  const sessionResult = useSession();
  const session = sessionResult?.data;
  const status = sessionResult?.status || "loading";

  const [guilds, setGuilds] = useState<DiscordGuild[]>([]);
  const [loadingGuilds, setLoadingGuilds] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<boolean>(false);

  useEffect(() => {
    async function loadGuilds() {
      if (!session?.accessToken) {
        setLoadingGuilds(false);
        return;
      }

      try {
        const res = await fetch("https://discord.com/api/v10/users/@me/guilds", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load servers");
        }

        const data: DiscordGuild[] = await res.json();
        setGuilds(data);
      } catch {
        setFetchError(true);
      } finally {
        setLoadingGuilds(false);
      }
    }

    if (status === "authenticated") {
      loadGuilds();
    } else if (status === "unauthenticated") {
      setLoadingGuilds(false);
    }
  }, [session, status]);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-300">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <p className="text-sm font-medium font-sans">Authenticating session...</p>
        </div>
      </main>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-6 text-center text-zinc-100">
        <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-400">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold">Authentication Required</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Log in with your Discord account to access your Clyde control panel.
          </p>
          <button
            onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
            className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-500 active:bg-indigo-700"
          >
            Connect Discord
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-6 text-zinc-100 md:p-12">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* User Navigation Header */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur sm:flex-row">
          <div className="flex items-center gap-4">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt="Avatar"
                className="h-14 w-14 rounded-full border-2 border-indigo-500/50"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                {session.user?.name?.charAt(0) || "U"}
              </div>
            )}
            <div>
              <h1 className="text-lg font-bold">{session.user?.name}</h1>
              <p className="text-xs text-zinc-400">Discord Connected</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-xs font-medium text-zinc-400 transition hover:border-red-500/30 hover:text-red-400"
          >
            Sign Out
          </button>
        </div>

        {/* Guilds / Servers Grid */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Your Servers</h2>
            <span className="text-xs text-zinc-500">{guilds.length} available</span>
          </div>

          {loadingGuilds ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 animate-pulse rounded-xl border border-zinc-800/80 bg-zinc-900/40" />
              ))}
            </div>
          ) : fetchError ? (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-400">
              Could not retrieve Discord servers automatically. Check your OAuth scopes or reconnect your account.
            </div>
          ) : guilds.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-8 text-center text-sm text-zinc-400">
              No servers found for this account.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {guilds.map((guild) => {
                const iconUrl = guild.icon
                  ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
                  : null;

                return (
                  <div
                    key={guild.id}
                    className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-indigo-500/50 hover:bg-zinc-900"
                  >
                    {iconUrl ? (
                      <img
                        src={iconUrl}
                        alt={guild.name}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/20 font-bold text-indigo-400">
                        {guild.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-zinc-100">{guild.name}</p>
                      {guild.owner ? (
                        <span className="inline-block mt-1 text-[10px] font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          Owner
                        </span>
                      ) : (
                        <span className="inline-block mt-1 text-[10px] font-medium text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                          Member
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
