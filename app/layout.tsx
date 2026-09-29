import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";
import "./v02.css";
import "./ui-polish.css";

export const metadata: Metadata = {
  title: { default: "FilmIndex — Analog Photography Database", template: "%s | FilmIndex" },
  description: "Explore films, classic cameras, analog techniques, discovery tools, specifications, sources, and comparisons in one modern archive.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Suspense fallback={<header className="site-header"><strong className="wordmark"><span className="brand-mark" aria-hidden="true">FI</span><span>FILMINDEX</span></strong></header>}><Header /></Suspense>
        <main>{children}</main>
        <Suspense fallback={null}><Footer /></Suspense>
      </body>
    </html>
  );
}
