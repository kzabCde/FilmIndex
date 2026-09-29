"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { messages, parseLocale, withLocale } from "@/lib/i18n";

export function Footer() {
  const search = useSearchParams();
  const locale = parseLocale(search.get("lang"));
  const copy = messages[locale];

  return <footer>
    <div><strong>FILMINDEX</strong><p>{copy.footer.tagline}</p></div>
    <div>
      <Link href={withLocale("/films", locale)}>{copy.nav.films}</Link>
      <Link href={withLocale("/cameras", locale)}>{copy.nav.cameras}</Link>
      <Link href={withLocale("/techniques", locale)}>{copy.nav.techniques}</Link>
      <Link href={withLocale("/compare", locale)}>{copy.nav.compare}</Link>
      <Link href={withLocale("/sources", locale)}>{copy.nav.sources}</Link>
    </div>
    <p className="footer-note">{copy.footer.note}</p>
  </footer>;
}
