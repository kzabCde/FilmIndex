"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const storageKey = "filmindex-favorite-films";

function readFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function FavoriteButton({ slug, locale }: { slug: string; locale: Locale }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(readFavorites().includes(slug));
  }, [slug]);

  function toggle() {
    const current = readFavorites();
    const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug];
    localStorage.setItem(storageKey, JSON.stringify(next));
    setFavorite(next.includes(slug));
    window.dispatchEvent(new Event("filmindex-favorites-changed"));
  }

  return <button type="button" className={favorite ? "favorite-button active" : "favorite-button"} onClick={toggle} aria-pressed={favorite}>{favorite ? "♥" : "♡"} {locale === "th" ? (favorite ? "อยู่ในชั้นฟิล์ม" : "เพิ่มลงชั้นฟิล์ม") : (favorite ? "In My Film Shelf" : "Add to My Film Shelf")}</button>;
}

export { storageKey as favoriteStorageKey };
