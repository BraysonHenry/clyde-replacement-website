"use client";

import { useState } from "react";
import Link from "next/link";

export default function GuildSettings({ params }: { params: { guildId: string } }) {
  const [prompt, setPrompt] = useState(
    "You are Clyde AI, a helpful, witty, and friendly AI companion for this Discord server."
  );
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      await fetch(`/api/guild/${params.guildId}/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemPrompt: prompt }),
      });
    } catch (e) {
      // API call placeholder until database route is connected
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/dashboard" 
          className="text-slate-400 hover:text-white text-sm mb-6 inline-block font-medium transition"
        >
          &larr; Back to Server List
        </Link>

        <div className="mb-8 border-b border-slate-900 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">Bot Configuration</h1>
          <p className="text-slate-400 text-sm mt-1">
            Managing Server ID: <span className="font-mono text-indigo-400 bg-slate-900 px-2 py-0.5 rounded">{params.guildId}</span>
          </p>
        </div>

        {/* System Prompt Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-xl">
          <label className="block font-bold text-lg mb-2 text-slate-100">
            Custom AI System Prompt
          </label>
          <p className="text-slate-400 text-sm mb-4">
            Instruct the AI on how to behave, set its personality tone, or define custom rules for this server.
          </p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-[#5865F2] transition text-sm font-sans"
            placeholder="Type instructions for your bot here..."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            className="bg-[#5865F2] hover:bg-[#4752C4] font-semibold px-6 py-3 rounded-xl transition text-white shadow-lg shadow-[#5865F2]/20"
          >
            {saved ? "Settings Saved!" : "Save Configuration"}
          </button>
        </div>
      </div>
    </div>
  );
}
