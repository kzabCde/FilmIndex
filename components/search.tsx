"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { allEntities } from "@/lib/data";
import { cameraTypeLabel, filmTypeLabel, messages, parseLocale, pick, techniqueCategoryLabel, withLocale } from "@/lib/i18n";

const routeFor = (kind: string, slug: string) => kind === "film" ? `/films/${slug}` : kind === "camera" ? `/cameras/${slug}` : `/techniques/${slug}`;

export function GlobalSearch({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const search = useSearchParams();
  const locale = parseLocale(search.get("lang"));
  const copy = messages[locale].search;

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allEntities.slice(0, 8);
    return allEntities.filter((item) => {
      const haystack = item.kind === "film"
        ? `${item.name} ${item.brand} ${item.filmType} ${item.process} ${item.descriptionTh ?? ""}`
        : item.kind === "camera"
          ? `${item.name} ${item.brand} ${item.cameraType} ${item.lensMount} ${item.descriptionTh ?? ""}`
          : `${item.name} ${item.nameTh ?? ""} ${item.category} ${item.summary} ${item.summaryTh ?? ""}`;
      return haystack.toLowerCase().includes(q);
    }).slice(0, 10);
  }, [query]);

  return (
    <>
      <button className={compact ? "search-trigger compact" : "search-trigger"} onClick={() => setOpen(true)}>
        <span>{copy.trigger}</span><kbd>⌘K</kbd>
      </button>
      {open && (
        <div className="search-backdrop" role="presentation" onMouseDown={(e) => { if (e.currentTarget === e.target) setOpen(false); }}>
          <section className="search-dialog" role="dialog" aria-modal="true" aria-label={copy.aria}>
            <input ref={inputRef} autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder={copy.placeholder} aria-label={copy.aria} />
            <div className="search-results">
              {results.map((item) => (
                <Link key={`${item.kind}-${item.slug}`} href={withLocale(routeFor(item.kind, item.slug), locale)} onClick={() => setOpen(false)}>
                  <span className="result-kind">{item.kind === "film" ? messages[locale].nav.films : item.kind === "camera" ? messages[locale].nav.cameras : messages[locale].nav.techniques}</span>
                  <strong>{item.kind === "technique" ? pick(locale, item.name, item.nameTh) : item.name}</strong>
                  <span>{item.kind === "film" ? `${item.brand} · ISO ${item.iso} · ${filmTypeLabel(item.filmType, locale)}` : item.kind === "camera" ? `${item.brand} · ${item.releaseYear} · ${cameraTypeLabel(item.cameraType, locale)}` : techniqueCategoryLabel(item.category, locale)}</span>
                </Link>
              ))}
              {!results.length && <p className="empty-state">{copy.empty}</p>}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
