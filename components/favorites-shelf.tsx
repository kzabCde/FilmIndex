"use client";

import { useEffect, useMemo, useState } from "react";
import { EntityCard } from "@/components/entity-card";
import { films } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { favoriteStorageKey } from "@/components/favorite-button";

function readFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem(favoriteStorageKey) ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function FavoritesShelf({ locale }: { locale: Locale }) {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setSlugs(readFavorites());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("filmindex-favorites-changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("filmindex-favorites-changed", sync);
    };
  }, []);

  const items = useMemo(() => films.filter((film) => slugs.includes(film.slug)), [slugs]);

  if (!items.length) {
    return <p className="empty-state">{locale === "th" ? "ยังไม่มีฟิล์มในชั้นของคุณ เปิดหน้าฟิล์มแล้วกด ♡ เพื่อเพิ่ม" : "Your shelf is empty. Open a film and press ♡ to add it."}</p>;
  }

  return <div className="card-grid">{items.map((film, index) => <EntityCard key={film.slug} item={film} index={index} locale={locale} />)}</div>;
}
