import "./globals.css";

import { GeistSans } from "geist/font/sans";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/providers";

import Menubar from "@/components/Menubar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Wei Chun</title>
        <link rel="icon" href="/images/favicon/favicon.ico" sizes="any" />
      </head>
      <body className={`${GeistSans.className} pb-10`}>
        <Providers>
          <main className="px-6 mt-10 mx-auto md:max-w-4xl md:px-12 md:mt-20">
            <div className="flex flex-col md:flex-row md:gap-10">
              <div className="pb-10 w-full md:w-[12rem]">
                <Menubar />
              </div>
              <div className="w-full">{children}</div>
            </div>
            <SpeedInsights />
            <Analytics />
          </main>
        </Providers>
      </body>
    </html>
  );
}
