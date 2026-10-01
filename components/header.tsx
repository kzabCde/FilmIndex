"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { messages, parseLocale, withLocale } from "@/lib/i18n";
import { BrandIcon } from "./brand-icon";
import { GlobalSearch } from "./search";

export function Header() {
  const [dark, setDark] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const locale = parseLocale(search.get("lang"));
  const copy = messages[locale];

  useEffect(() => {
    const savedTheme = localStorage.getItem("filmindex-theme");
    const initial = savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(initial);
    document.documentElement.dataset.theme = initial ? "dark" : "light";
    const savedLocale = localStorage.getItem("filmindex-locale");
    if (!search.get("lang") && (savedLocale === "th" || savedLocale === "en")) {
      const params = new URLSearchParams(search.toString());
      params.set("lang", savedLocale);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname, router, search]);

  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("filmindex-theme", next ? "dark" : "light");
  }

  function toggleLocale() {
    const next = locale === "en" ? "th" : "en";
    const params = new URLSearchParams(search.toString());
    params.set("lang", next);
    localStorage.setItem("filmindex-locale", next);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <header className="site-header">
      <Link className="wordmark" href={withLocale("/", locale)} aria-label="FilmIndex home"><BrandIcon /><span>FILMINDEX</span></Link>
      <nav aria-label="Primary navigation">
        <Link href={withLocale("/films", locale)}>{copy.nav.films}</Link>
        <Link href={withLocale("/cameras", locale)}>{copy.nav.cameras}</Link>
        <Link href={withLocale("/lenses", locale)}>{locale === "th" ? "เลนส์" : "Lenses"}</Link>
        <Link href={withLocale("/mounts", locale)}>{locale === "th" ? "เมาท์" : "Mounts"}</Link>
        <Link href={withLocale("/finder", locale)}>{locale === "th" ? "ค้นหาฟิล์ม" : "Finder"}</Link>
        <Link href={withLocale("/tools", locale)}>{locale === "th" ? "เครื่องมือ" : "Tools"}</Link>
        <Link href={withLocale("/techniques", locale)}>{copy.nav.techniques}</Link>
        <Link href={withLocale("/compare", locale)}>{copy.nav.compare}</Link>
      </nav>
      <div className="header-actions">
        <GlobalSearch compact />
        <Link className="icon-button shelf-link" href={withLocale("/favorites", locale)} aria-label={locale === "th" ? "ชั้นฟิล์มของฉัน" : "My Film Shelf"}>♡</Link>
        <button className="icon-button lang-button" onClick={toggleLocale} aria-label={locale === "en" ? "Switch to Thai" : "เปลี่ยนเป็นภาษาอังกฤษ"}>{locale === "en" ? "TH" : "EN"}</button>
        <button className="icon-button" onClick={toggleTheme} aria-label="Toggle color theme">{dark ? "☀" : "◐"}</button>
      </div>
    </header>
  );
}
