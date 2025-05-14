// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SSC Mock Test",
  description: "Take free SSC mock tests with timer, results, and leaderboard",
  keywords: ["SSC mock test", "free SSC exam", "online test", "mock paper", "quiz"],
  authors: [{ name: "Saket" }],
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-100 text-gray-800"}>
        {children}
      </body>
    </html>
  );
}
