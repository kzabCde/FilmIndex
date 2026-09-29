"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GlobalSearch } from "./search";

export function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("filmindex-theme");
    const initial = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(initial);
    document.documentElement.dataset.theme = initial ? "dark" : "light";
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("filmindex-theme", next ? "dark" : "light");
  }

  return (
    <header className="site-header">
      <Link className="wordmark" href="/">FILMINDEX</Link>
      <nav aria-label="Primary navigation">
        <Link href="/films">Films</Link>
        <Link href="/cameras">Cameras</Link>
        <Link href="/techniques">Techniques</Link>
        <Link href="/compare">Compare</Link>
      </nav>
      <div className="header-actions">
        <GlobalSearch compact />
        <button className="icon-button" onClick={toggleTheme} aria-label="Toggle color theme">{dark ? "☀" : "◐"}</button>
      </div>
    </header>
  );
}
