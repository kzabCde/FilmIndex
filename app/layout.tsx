import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "FilmIndex — Analog Photography Database", template: "%s | FilmIndex" },
  description: "Explore films, classic cameras, analog techniques, specifications, sources, and comparisons in one modern archive.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        <main>{children}</main>
        <footer>
          <div><strong>FILMINDEX</strong><p>Explore analog photography.</p></div>
          <div><Link href="/films">Films</Link><Link href="/cameras">Cameras</Link><Link href="/techniques">Techniques</Link><Link href="/compare">Compare</Link><Link href="/sources">Sources</Link></div>
          <p className="footer-note">FilmIndex is an independent analog photography reference project. Manufacturer names and trademarks belong to their respective owners.</p>
        </footer>
      </body>
    </html>
  );
}
