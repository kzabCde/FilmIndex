"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { allEntities } from "@/lib/data";

const routeFor = (kind: string, slug: string) => kind === "film" ? `/films/${slug}` : kind === "camera" ? `/cameras/${slug}` : `/techniques/${slug}`;

export function GlobalSearch({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
        ? `${item.name} ${item.brand} ${item.filmType} ${item.process}`
        : item.kind === "camera"
          ? `${item.name} ${item.brand} ${item.cameraType} ${item.lensMount}`
          : `${item.name} ${item.category} ${item.summary}`;
      return haystack.toLowerCase().includes(q);
    }).slice(0, 10);
  }, [query]);

  return (
    <>
      <button className={compact ? "search-trigger compact" : "search-trigger"} onClick={() => setOpen(true)}>
        <span>Search FilmIndex</span><kbd>⌘K</kbd>
      </button>
      {open && (
        <div className="search-backdrop" role="presentation" onMouseDown={(e) => { if (e.currentTarget === e.target) setOpen(false); }}>
          <section className="search-dialog" role="dialog" aria-modal="true" aria-label="Search FilmIndex">
            <input ref={inputRef} autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search films, cameras or techniques…" aria-label="Search" />
            <div className="search-results">
              {results.map((item) => (
                <Link key={`${item.kind}-${item.slug}`} href={routeFor(item.kind, item.slug)} onClick={() => setOpen(false)}>
                  <span className="result-kind">{item.kind}</span>
                  <strong>{item.name}</strong>
                  <span>{item.kind === "film" ? `${item.brand} · ISO ${item.iso}` : item.kind === "camera" ? `${item.brand} · ${item.releaseYear}` : item.category}</span>
                </Link>
              ))}
              {!results.length && <p className="empty-state">No matching entries.</p>}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
