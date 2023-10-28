import "./globals.css";

import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Wei Chun</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>"
        />
      </head>
      <body className={inter.className}>
        <main className="max-w-4xl px-12 mt-20 mx-auto">
          <div className="flex">
            <div style={{ maxWidth: "12rem", width: "100%" }}>
              <Sidebar />
            </div>
            <div className="flex-grow">{children}</div>
          </div>
          <Analytics />
        </main>
      </body>
    </html>
  );
}
