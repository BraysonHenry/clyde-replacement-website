import Link from "next/link";

export default function Home() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "1543122832723152937";
  const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=1543122832723152937&permissions=8&integration_type=0&scope=bot+applications.commands`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center font-bold text-lg text-white shadow-md">
            AI
          </div>
          <span className="font-bold text-xl tracking-tight">AI (Replacement for Clyde)</span>
        </div>
        <Link
          href="/dashboard"
          className="bg-slate-800 hover:bg-slate-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition border border-slate-700/50"
        >
          Dashboard Login
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto text-center px-6 py-16">
        <span className="bg-[#5865F2]/10 text-[#5865F2] border border-[#5865F2]/20 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          Discord AI Companion
        </span>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight mt-6 mb-6 leading-tight">
          Bring <span className="text-[#5865F2]">Clyde</span> back to your Discord server.
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
          The ultimate conversational replacement for Discord’s sunset AI chatbot. Respond to @mentions, run customizable prompts, and engage server members automatically.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#5865F2] hover:bg-[#4752C4] font-semibold px-8 py-3.5 rounded-xl transition shadow-lg shadow-[#5865F2]/25 text-white"
          >
            Add to Discord
          </a>
          <a
            href="#features"
            className="bg-slate-900 border border-slate-800 hover:bg-slate-800 font-semibold px-8 py-3.5 rounded-xl transition"
          >
            View Features
          </a>
        </div>
      </main>

      {/* Feature Cards */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
          <div className="w-10 h-10 rounded-lg bg-[#5865F2]/20 text-[#5865F2] flex items-center justify-center font-bold mb-4">
            @
          </div>
          <h3 className="font-bold text-lg mb-2">Native @Mention Replies</h3>
          <p className="text-slate-400 text-sm">
            Ping the bot anywhere in enabled channels to trigger intelligent AI responses and auto-created threads.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
          <div className="w-10 h-10 rounded-lg bg-[#5865F2]/20 text-[#5865F2] flex items-center justify-center font-bold mb-4">
            ⚙️
          </div>
          <h3 className="font-bold text-lg mb-2">Custom System Prompts</h3>
          <p className="text-slate-400 text-sm">
            Customize the bot's tone, instructions, and personality for each individual server from the web dashboard.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
          <div className="w-10 h-10 rounded-lg bg-[#5865F2]/20 text-[#5865F2] flex items-center justify-center font-bold mb-4">
            /
          </div>
          <h3 className="font-bold text-lg mb-2">Slash Commands</h3>
          <p className="text-slate-400 text-sm">
            Full support for Discord application slash commands to chat, generate text, or query knowledge bases.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-slate-600 text-sm border-t border-slate-900">
        AI (Replacement for Clyde) &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
