import React from "react";
import "./globals.css";

export const metadata = {
  title: "AI (Replacement for Clyde)",
  description: "The ultimate conversational replacement for Discord's Clyde AI bot.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-white">{children}</body>
    </html>
  );
}
