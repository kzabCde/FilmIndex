import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "FilmIndex — Analog Photography Database", template: "%s | FilmIndex" },
  description: "Explore films, classic cameras, analog techniques, specifications, sources, and comparisons in one modern archive.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Suspense fallback={<header className="site-header"><strong className="wordmark">FILMINDEX</strong></header>}><Header /></Suspense>
        <main>{children}</main>
        <Suspense fallback={null}><Footer /></Suspense>
      </body>
    </html>
  );
}
