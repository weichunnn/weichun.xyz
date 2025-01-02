import "./globals.css";

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
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="981ff842-1a60-4807-b264-0241e83311f4"
        ></script>
      </head>
      <body className="pb-10">
        <Providers>
          <main className="px-6 my-10 mx-auto w-full md:max-w-3xl md:my-20">
            <div className="mb-24 w-full">
              <Menubar />
            </div>
            <div className="w-full">{children}</div>
            <SpeedInsights />
            <Analytics />
          </main>
        </Providers>
      </body>
    </html>
  );
}
