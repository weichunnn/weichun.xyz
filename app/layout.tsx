import "./globals.css";

import { GeistSans } from "geist/font/sans";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/providers";

import Menubar from "@/components/Menubar";
import { HOST } from "./constants/constant";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Wei Chun</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>"
        />
      </head>
      <body className={`${GeistSans.className} pb-10`}>
        <Providers>
          <main className="px-6 mt-10 mx-auto md:max-w-4xl md:px-12 md:mt-20">
            <div className="flex flex-col md:flex-row">
              <div className="pb-10 w-full md:max-w-[12rem]">
                <Menubar />
              </div>
              <div className="flex-grow">{children}</div>
            </div>
            <SpeedInsights />
            <Analytics />
          </main>
        </Providers>
      </body>
    </html>
  );
}
