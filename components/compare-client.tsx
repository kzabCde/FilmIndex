"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cameras, films } from "@/lib/catalog";
import { cameraTypeLabel, characteristicValueLabel, filmTypeLabel, messages, parseLocale } from "@/lib/i18n";

type Mode = "films" | "cameras";

export function CompareClient() {
  const router = useRouter();
  const search = useSearchParams();
  const locale = parseLocale(search.get("lang"));
  const copy = messages[locale];
  const initialMode: Mode = search.get("type") === "cameras" ? "cameras" : "films";
  const [mode, setMode] = useState<Mode>(initialMode);
  const selected = (search.get("items") || "").split(",").filter(Boolean).slice(0, 4);
  const items = mode === "films" ? films : cameras;
  const chosen = items.filter((item) => selected.includes(item.slug));

  const rows = useMemo(() => mode === "films"
    ? [
      [locale === "th" ? "ผู้ผลิต" : "Manufacturer", (x: any) => x.brand], ["ISO", (x: any) => x.iso], [locale === "th" ? "ประเภท" : "Type", (x: any) => filmTypeLabel(x.filmType, locale)], [locale === "th" ? "กระบวนการล้าง" : "Process", (x: any) => x.process], [locale === "th" ? "ฟอร์แมต" : "Formats", (x: any) => x.formats.join(", ")], [locale === "th" ? "เกรน" : "Grain", (x: any) => characteristicValueLabel(x.characteristics.Grain, locale)], [locale === "th" ? "คอนทราสต์" : "Contrast", (x: any) => characteristicValueLabel(x.characteristics.Contrast, locale)], [locale === "th" ? "ช่วงเผื่อการรับแสง" : "Exposure latitude", (x: any) => characteristicValueLabel(x.characteristics["Exposure latitude"], locale)],
    ]
    : [
      [locale === "th" ? "ผู้ผลิต" : "Manufacturer", (x: any) => x.brand], [locale === "th" ? "ปี" : "Year", (x: any) => x.releaseYear], [locale === "th" ? "ฟอร์แมต" : "Format", (x: any) => x.filmFormat], [locale === "th" ? "ประเภท" : "Type", (x: any) => cameraTypeLabel(x.cameraType, locale)], [locale === "th" ? "เมาท์" : "Mount", (x: any) => x.lensMount], [locale === "th" ? "ชัตเตอร์" : "Shutter", (x: any) => x.shutterSpeed], [locale === "th" ? "ระบบวัดแสง" : "Metering", (x: any) => x.metering], [locale === "th" ? "โหมดรับแสง" : "Exposure modes", (x: any) => x.exposureModes.join(", ")], [locale === "th" ? "แบตเตอรี่" : "Battery", (x: any) => x.battery], [locale === "th" ? "น้ำหนัก" : "Weight", (x: any) => x.weight],
    ], [locale, mode]);

  function setSelection(next: string[]) { router.replace(`/compare?type=${mode}&items=${next.join(",")}&lang=${locale}`, { scroll: false }); }
  function changeMode(next: Mode) { setMode(next); router.replace(`/compare?type=${next}&lang=${locale}`, { scroll: false }); }

  return <div><div className="compare-toolbar"><button className={mode === "films" ? "active" : ""} onClick={() => changeMode("films")}>{copy.nav.films}</button><button className={mode === "cameras" ? "active" : ""} onClick={() => changeMode("cameras")}>{copy.nav.cameras}</button></div><div className="picker-grid">{items.map((item) => { const active = selected.includes(item.slug); return <button key={item.slug} className={active ? "active" : ""} onClick={() => setSelection(active ? selected.filter((s) => s !== item.slug) : selected.length < 4 ? [...selected, item.slug] : selected)}>{item.name}</button>; })}</div><p className="micro">{copy.compare.select}</p>{chosen.length >= 2 ? <div className="compare-scroll"><table><thead><tr><th>{copy.compare.attribute}</th>{chosen.map((item) => <th key={item.slug}>{item.name}</th>)}</tr></thead><tbody>{rows.map(([label, getter]: any) => <tr key={label}><th>{label}</th>{chosen.map((item) => <td key={item.slug}>{getter(item)}</td>)}</tr>)}</tbody></table></div> : <p className="empty-state">{copy.compare.choose}</p>}</div>;
}
