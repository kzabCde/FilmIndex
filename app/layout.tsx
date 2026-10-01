import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BrandIcon } from "@/components/brand-icon";
import { SearchableSelectLayer } from "@/components/searchable-select-layer";
import "./globals.css";
import "./v02.css";
import "./ui-polish.css";
import "./tools-expansion.css";
import "./tool-pages.css";
import "./lens-ecosystem.css";
import "./techniques.css";
import "./searchable-selects.css";
import "./lens-media.css";

export const metadata: Metadata = {
  title: { default: "FilmIndex — Analog Photography Database", template: "%s | FilmIndex" },
  description: "Explore films, classic cameras, lenses, analog techniques, discovery tools, specifications, sources, and comparisons in one modern archive.",
  icons: {
    icon: "/filmindex-icon.svg",
    shortcut: "/filmindex-icon.svg",
    apple: "/filmindex-icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Suspense fallback={<header className="site-header"><strong className="wordmark"><BrandIcon /><span>FILMINDEX</span></strong></header>}><Header /></Suspense>
        <main>{children}</main>
        <Suspense fallback={null}><Footer /></Suspense>
        <SearchableSelectLayer />
      </body>
    </html>
  );
}
