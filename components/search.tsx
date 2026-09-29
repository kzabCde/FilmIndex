"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { allEntities } from "@/lib/catalog";
import { cameraTypeLabel, filmTypeLabel, messages, parseLocale, pick, techniqueCategoryLabel, withLocale } from "@/lib/i18n";

const routeFor = (kind: string, slug: string) => kind === "film" ? `/films/${slug}` : kind === "camera" ? `/cameras/${slug}` : `/techniques/${slug}`;
const recentKey = "filmindex-recent-searches";

function withinOneEdit(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i += 1;
      j += 1;
      continue;
    }
    edits += 1;
    if (edits > 1) return false;
    if (a.length > b.length) i += 1;
    else if (b.length > a.length) j += 1;
    else {
      i += 1;
      j += 1;
    }
  }
  return edits + (i < a.length || j < b.length ? 1 : 0) <= 1;
}

function tokenMatches(haystack: string, token: string) {
  if (haystack.includes(token)) return true;
  if (token.length < 4) return false;
  return haystack.split(/[^a-z0-9ก-๙]+/i).some((word) => word.length >= 4 && withinOneEdit(word, token));
}

function aliasesFor(kind: string) {
  if (kind === "film") return "film stock ฟิล์ม เนกาทีฟ negative slide reversal สไลด์ ขาวดำ black white bw portrait พอร์ตเทรต night กลางคืน street สตรีท";
  if (kind === "camera") return "camera กล้อง slr rangefinder เรนจ์ไฟน์เดอร์ compact คอมแพค medium format manual aperture priority shutter priority";
  return "technique เทคนิค exposure ค่าแสง development ล้างฟิล์ม scanning สแกน beginner เริ่มต้น";
}

export function GlobalSearch({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const search = useSearchParams();
  const locale = parseLocale(search.get("lang"));
  const copy = messages[locale].search;

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(recentKey) ?? "[]");
      if (Array.isArray(stored)) setRecent(stored.filter((item): item is string => typeof item === "string").slice(0, 5));
    } catch {
      setRecent([]);
    }
  }, []);

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
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return allEntities.slice(0, 12);
    return allEntities.filter((item) => {
      const haystack = item.kind === "film"
        ? `${item.name} ${item.brand} ${item.filmType} ${item.process} ${item.formats.join(" ")} ${item.description} ${item.descriptionTh ?? ""} ${item.uses.join(" ")} ${aliasesFor(item.kind)}`
        : item.kind === "camera"
          ? `${item.name} ${item.brand} ${item.cameraType} ${item.filmFormat} ${item.lensMount} ${item.exposureModes.join(" ")} ${item.description} ${item.descriptionTh ?? ""} ${aliasesFor(item.kind)}`
          : `${item.name} ${item.nameTh ?? ""} ${item.category} ${item.summary} ${item.summaryTh ?? ""} ${aliasesFor(item.kind)}`;
      const normalized = haystack.toLowerCase();
      return tokens.every((token) => tokenMatches(normalized, token));
    }).slice(0, 18);
  }, [query]);

  const grouped = useMemo(() => ["film", "camera", "technique"].map((kind) => ({ kind, items: results.filter((item) => item.kind === kind) })).filter((group) => group.items.length), [results]);

  useEffect(() => setActiveIndex(0), [query, open]);

  function saveRecent(value: string) {
    const clean = value.trim();
    if (!clean) return;
    const next = [clean, ...recent.filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
    setRecent(next);
    localStorage.setItem(recentKey, JSON.stringify(next));
  }

  function openResult(index: number) {
    const item = results[index];
    if (!item) return;
    saveRecent(query);
    setOpen(false);
    router.push(withLocale(routeFor(item.kind, item.slug), locale));
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((value) => Math.min(value + 1, Math.max(0, results.length - 1)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((value) => Math.max(0, value - 1));
    } else if (event.key === "Enter" && results.length) {
      event.preventDefault();
      openResult(activeIndex);
    }
  }

  const kindLabel = (kind: string) => kind === "film" ? messages[locale].nav.films : kind === "camera" ? messages[locale].nav.cameras : messages[locale].nav.techniques;

  return (
    <>
      <button className={compact ? "search-trigger compact" : "search-trigger"} onClick={() => setOpen(true)}>
        <span>{copy.trigger}</span><kbd>⌘K</kbd>
      </button>
      {open && (
        <div className="search-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setOpen(false); }}>
          <section className="search-dialog" role="dialog" aria-modal="true" aria-label={copy.aria}>
            <input ref={inputRef} autoFocus value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={onInputKeyDown} placeholder={copy.placeholder} aria-label={copy.aria} />
            {!query && recent.length > 0 && <div className="recent-searches"><span>{locale === "th" ? "ค้นหาล่าสุด" : "Recent searches"}</span>{recent.map((item) => <button key={item} type="button" onClick={() => { setQuery(item); inputRef.current?.focus(); }}>{item}</button>)}</div>}
            <div className="search-results">
              {grouped.map((group) => <div className="search-group" key={group.kind}><p className="search-group-title">{kindLabel(group.kind)}</p>{group.items.map((item) => {
                const index = results.findIndex((result) => result.kind === item.kind && result.slug === item.slug);
                return <Link className={index === activeIndex ? "active" : ""} key={`${item.kind}-${item.slug}`} href={withLocale(routeFor(item.kind, item.slug), locale)} onMouseEnter={() => setActiveIndex(index)} onClick={() => { saveRecent(query); setOpen(false); }}>
                  <span className="result-kind">{kindLabel(item.kind)}</span>
                  <strong>{item.kind === "technique" ? pick(locale, item.name, item.nameTh) : item.name}</strong>
                  <span>{item.kind === "film" ? `${item.brand} · ISO ${item.iso} · ${filmTypeLabel(item.filmType, locale)}` : item.kind === "camera" ? `${item.brand} · ${item.releaseYear} · ${cameraTypeLabel(item.cameraType, locale)}` : techniqueCategoryLabel(item.category, locale)}</span>
                </Link>;
              })}</div>)}
              {!results.length && <p className="empty-state">{copy.empty}</p>}
            </div>
            <div className="search-hints"><span>↑↓ {locale === "th" ? "เลือก" : "navigate"}</span><span>Enter {locale === "th" ? "เปิด" : "open"}</span><span>Esc {locale === "th" ? "ปิด" : "close"}</span></div>
          </section>
        </div>
      )}
    </>
  );
}
