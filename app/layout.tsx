import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BrandIcon } from "@/components/brand-icon";
import "./globals.css";
import "./v02.css";
import "./ui-polish.css";

export const metadata: Metadata = {
  title: { default: "FilmIndex — Analog Photography Database", template: "%s | FilmIndex" },
  description: "Explore films, classic cameras, analog techniques, discovery tools, specifications, sources, and comparisons in one modern archive.",
  icons: {
    icon: "/filmindex-icon.png",
    shortcut: "/filmindex-icon.png",
    apple: "/filmindex-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Suspense fallback={<header className="site-header"><strong className="wordmark"><BrandIcon /><span>FILMINDEX</span></strong></header>}><Header /></Suspense>
        <main>{children}</main>
        <Suspense fallback={null}><Footer /></Suspense>
      </body>
    </html>
  );
}
