import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Clyde Replacement Dashboard",
  description: "AI-powered Discord Assistant Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500 selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
