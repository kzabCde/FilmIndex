"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cameras, films, lenses } from "@/lib/catalog";
import { cameraTypeLabel } from "@/lib/camera-types";
import { characteristicValueLabel, filmTypeLabel, messages, parseLocale } from "@/lib/i18n";

type CompareMode = "film" | "camera" | "lens";
type CellValue = string | number;
type CompareRecord = {
  slug: string;
  name: string;
  brand: string;
  href: string;
  values: Record<string, CellValue>;
};
type RowDefinition = { key: string; label: string };

const MAX_COMPARE_ITEMS = 4;

function inferMode(search: URLSearchParams): CompareMode {
  if (search.get("lens")) return "lens";
  if (search.get("camera")) return "camera";
  if (search.get("film")) return "film";
  const view = search.get("view");
  if (view === "film" || view === "camera" || view === "lens") return view;
  return search.get("type") === "cameras" ? "camera" : "film";
}

function parseSlugs(value: string | null) {
  return [...new Set((value ?? "").split(",").map((item) => item.trim()).filter(Boolean))].slice(0, MAX_COMPARE_ITEMS);
}

function normalizeCell(value: CellValue) {
  return String(value).trim().toLocaleLowerCase();
}

export function CompareClient() {
  const router = useRouter();
  const search = useSearchParams();
  const locale = parseLocale(search.get("lang"));
  const copy = messages[locale];
  const isTh = locale === "th";
  const mode = inferMode(search);
  const [filter, setFilter] = useState("");
  const [copied, setCopied] = useState(false);

  const directSelection = parseSlugs(search.get(mode));
  const legacySelection = !search.get("film") && !search.get("camera") && !search.get("lens")
    ? parseSlugs(search.get("items"))
    : [];
  const selected = directSelection.length ? directSelection : legacySelection;

  const { records, rows } = useMemo<{ records: CompareRecord[]; rows: RowDefinition[] }>(() => {
    if (mode === "camera") {
      return {
        records: cameras.map((camera) => ({
          slug: camera.slug,
          name: camera.name,
          brand: camera.brand,
          href: `/cameras/${camera.slug}`,
          values: {
            brand: camera.brand,
            year: camera.releaseYear,
            format: camera.filmFormat,
            type: cameraTypeLabel(camera.cameraType, locale),
            mount: camera.lensMount,
            shutter: camera.shutter,
            shutterSpeed: camera.shutterSpeed,
            metering: camera.metering,
            exposureModes: camera.exposureModes.join(", "),
            battery: camera.battery,
            weight: camera.weight,
            flashSync: camera.flashSync,
          },
        })),
        rows: [
          { key: "brand", label: isTh ? "ผู้ผลิต" : "Manufacturer" },
          { key: "year", label: isTh ? "ปีเปิดตัว" : "Release year" },
          { key: "format", label: isTh ? "ฟอร์แมต" : "Format" },
          { key: "type", label: isTh ? "ประเภท" : "Type" },
          { key: "mount", label: isTh ? "เมาท์" : "Mount" },
          { key: "shutter", label: isTh ? "ชัตเตอร์" : "Shutter" },
          { key: "shutterSpeed", label: isTh ? "ความเร็วชัตเตอร์" : "Shutter speeds" },
          { key: "metering", label: isTh ? "ระบบวัดแสง" : "Metering" },
          { key: "exposureModes", label: isTh ? "โหมดรับแสง" : "Exposure modes" },
          { key: "battery", label: isTh ? "แบตเตอรี่" : "Battery" },
          { key: "weight", label: isTh ? "น้ำหนัก" : "Weight" },
          { key: "flashSync", label: isTh ? "แฟลชซิงก์" : "Flash sync" },
        ],
      };
    }

    if (mode === "lens") {
      return {
        records: lenses.map((lens) => ({
          slug: lens.slug,
          name: lens.name,
          brand: lens.brand,
          href: `/lenses/${lens.slug}`,
          values: {
            brand: lens.brand,
            mount: lens.mount,
            focalLength: lens.focalLength,
            maxAperture: lens.maxAperture,
            focusType: lens.focusType,
            coverage: lens.coverage,
            minFocus: lens.minFocusM ? `${lens.minFocusM} m` : "—",
            filterThread: lens.filterThread ? `Ø ${lens.filterThread}` : "—",
            weight: lens.weight ?? "—",
          },
        })),
        rows: [
          { key: "brand", label: isTh ? "ผู้ผลิต" : "Manufacturer" },
          { key: "mount", label: isTh ? "เมาท์" : "Mount" },
          { key: "focalLength", label: isTh ? "ทางยาวโฟกัส" : "Focal length" },
          { key: "maxAperture", label: isTh ? "รูรับแสงกว้างสุด" : "Max aperture" },
          { key: "focusType", label: isTh ? "ระบบโฟกัส" : "Focus" },
          { key: "coverage", label: isTh ? "ขนาดภาพที่ครอบคลุม" : "Coverage" },
          { key: "minFocus", label: isTh ? "ระยะโฟกัสใกล้สุด" : "Minimum focus" },
          { key: "filterThread", label: isTh ? "ขนาดฟิลเตอร์" : "Filter thread" },
          { key: "weight", label: isTh ? "น้ำหนัก" : "Weight" },
        ],
      };
    }

    return {
      records: films.map((film) => ({
        slug: film.slug,
        name: film.name,
        brand: film.brand,
        href: `/films/${film.slug}`,
        values: {
          brand: film.brand,
          iso: film.iso,
          type: filmTypeLabel(film.filmType, locale),
          process: film.process,
          formats: film.formats.join(", "),
          grain: characteristicValueLabel(film.characteristics.Grain ?? "—", locale),
          contrast: characteristicValueLabel(film.characteristics.Contrast ?? "—", locale),
          latitude: characteristicValueLabel(film.characteristics["Exposure latitude"] ?? "—", locale),
          uses: film.uses.join(", "),
        },
      })),
      rows: [
        { key: "brand", label: isTh ? "ผู้ผลิต" : "Manufacturer" },
        { key: "iso", label: "ISO" },
        { key: "type", label: isTh ? "ประเภท" : "Type" },
        { key: "process", label: isTh ? "กระบวนการล้าง" : "Process" },
        { key: "formats", label: isTh ? "ฟอร์แมต" : "Formats" },
        { key: "grain", label: isTh ? "เกรน" : "Grain" },
        { key: "contrast", label: isTh ? "คอนทราสต์" : "Contrast" },
        { key: "latitude", label: isTh ? "ช่วงเผื่อการรับแสง" : "Exposure latitude" },
        { key: "uses", label: isTh ? "การใช้งานทั่วไป" : "Typical uses" },
      ],
    };
  }, [isTh, locale, mode]);

  const recordBySlug = useMemo(() => new Map(records.map((record) => [record.slug, record])), [records]);
  const chosen = selected.map((slug) => recordBySlug.get(slug)).filter((record): record is CompareRecord => Boolean(record));
  const normalizedFilter = filter.trim().toLocaleLowerCase();
  const visibleRecords = normalizedFilter
    ? records.filter((record) => `${record.brand} ${record.name}`.toLocaleLowerCase().includes(normalizedFilter))
    : records;

  const comparisonRows = rows.map((row) => {
    const values = chosen.map((record) => record.values[row.key] ?? "—");
    return {
      ...row,
      values,
      different: values.length >= 2 && new Set(values.map(normalizeCell)).size > 1,
    };
  });

  function replaceUrl(nextMode: CompareMode, nextSelection: string[]) {
    const params = new URLSearchParams();
    if (nextSelection.length) params.set(nextMode, nextSelection.join(","));
    else params.set("view", nextMode);
    if (locale === "th") params.set("lang", "th");
    router.replace(`/compare?${params.toString()}`, { scroll: false });
    setCopied(false);
  }

  function toggleSelection(slug: string) {
    const active = selected.includes(slug);
    const next = active
      ? selected.filter((item) => item !== slug)
      : selected.length < MAX_COMPARE_ITEMS ? [...selected, slug] : selected;
    replaceUrl(mode, next);
  }

  function changeMode(nextMode: CompareMode) {
    setFilter("");
    replaceUrl(nextMode, []);
  }

  async function copyShareUrl() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const modeLabels: Record<CompareMode, string> = {
    film: copy.nav.films,
    camera: copy.nav.cameras,
    lens: isTh ? "เลนส์" : "Lenses",
  };

  return <div className="advanced-compare">
    <div className="compare-toolbar advanced-compare-tabs" role="tablist" aria-label={isTh ? "ประเภทข้อมูลที่เปรียบเทียบ" : "Comparison category"}>
      {(Object.keys(modeLabels) as CompareMode[]).map((key) => <button key={key} className={mode === key ? "active" : ""} onClick={() => changeMode(key)} aria-selected={mode === key} role="tab">{modeLabels[key]}</button>)}
    </div>

    <div className="compare-picker-header">
      <label className="compare-search-field">
        <span>{isTh ? "ค้นหารายการ" : "Find an item"}</span>
        <input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder={isTh ? `ค้นหา${modeLabels[mode]}…` : `Search ${modeLabels[mode].toLowerCase()}…`} />
      </label>
      <div className="compare-selection-meta">
        <strong>{selected.length}/{MAX_COMPARE_ITEMS}</strong>
        <span>{isTh ? "เลือกแล้ว" : "selected"}</span>
      </div>
    </div>

    {selected.length ? <div className="compare-selected-strip" aria-label={isTh ? "รายการที่เลือก" : "Selected items"}>{chosen.map((item) => <button key={item.slug} onClick={() => toggleSelection(item.slug)}><span>{item.name}</span><strong aria-hidden="true">×</strong></button>)}</div> : null}

    <div className="advanced-picker-grid">{visibleRecords.map((item) => {
      const active = selected.includes(item.slug);
      const locked = !active && selected.length >= MAX_COMPARE_ITEMS;
      return <button key={item.slug} className={active ? "active" : ""} disabled={locked} aria-pressed={active} onClick={() => toggleSelection(item.slug)}>
        <span>{item.name}</span><small>{item.brand}</small>
      </button>;
    })}</div>
    {visibleRecords.length === 0 ? <p className="empty-state">{isTh ? "ไม่พบรายการที่ตรงกับคำค้น" : "No items match this search."}</p> : null}

    <div className="compare-share-row">
      <p className="micro">{copy.compare.select}</p>
      <button className="compare-share-button" onClick={copyShareUrl} disabled={!selected.length}>{copied ? (isTh ? "คัดลอกลิงก์แล้ว ✓" : "Link copied ✓") : (isTh ? "คัดลอกลิงก์เปรียบเทียบ" : "Copy comparison link")}</button>
    </div>

    {chosen.length >= 2 ? <div className="advanced-compare-scroll">
      <table className="advanced-compare-table">
        <thead><tr><th>{copy.compare.attribute}</th>{chosen.map((item) => <th key={item.slug}><Link href={`${item.href}${locale === "th" ? "?lang=th" : ""}`}><span>{item.brand}</span><strong>{item.name}</strong></Link></th>)}</tr></thead>
        <tbody>{comparisonRows.map((row) => <tr key={row.key} className={row.different ? "has-difference" : ""}>
          <th><span>{row.label}</span>{row.different ? <small title={isTh ? "ค่าของรายการที่เลือกแตกต่างกัน" : "Selected values differ"}>Δ</small> : null}</th>
          {row.values.map((value, index) => <td key={`${row.key}-${chosen[index].slug}`} className={row.different ? "compare-value-different" : ""}>{value}</td>)}
        </tr>)}</tbody>
      </table>
    </div> : <p className="empty-state">{copy.compare.choose}</p>}
  </div>;
}
