import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MSWProvider } from "@/components/msw-provider";

if (process.env.NEXT_RUNTIME === "nodejs") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { server } = require("@/mocks/node");
  server.listen();
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pet Insurance App",
  description: "Pet insurance web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
