"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      onClick={() =>
        signIn("discord", {
          callbackUrl: "https://clyde-replacement-gg.vercel.app/dashboard",
        })
      }
      className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
    >
      Log in with Discord
    </button>
  );
}
