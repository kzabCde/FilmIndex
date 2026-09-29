"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cameras, films } from "@/lib/data";

type Mode = "films" | "cameras";

export function CompareClient() {
  const router = useRouter();
  const search = useSearchParams();
  const initialMode: Mode = search.get("type") === "cameras" ? "cameras" : "films";
  const [mode, setMode] = useState<Mode>(initialMode);
  const selected = (search.get("items") || "").split(",").filter(Boolean).slice(0, 4);
  const items = mode === "films" ? films : cameras;
  const chosen = items.filter((item) => selected.includes(item.slug));

  const rows = useMemo(() => mode === "films"
    ? [
      ["Manufacturer", (x: any) => x.brand], ["ISO", (x: any) => x.iso], ["Type", (x: any) => x.filmType], ["Process", (x: any) => x.process], ["Formats", (x: any) => x.formats.join(", ")], ["Grain", (x: any) => x.characteristics.Grain], ["Contrast", (x: any) => x.characteristics.Contrast], ["Exposure latitude", (x: any) => x.characteristics["Exposure latitude"]],
    ]
    : [
      ["Manufacturer", (x: any) => x.brand], ["Year", (x: any) => x.releaseYear], ["Format", (x: any) => x.filmFormat], ["Type", (x: any) => x.cameraType], ["Mount", (x: any) => x.lensMount], ["Shutter", (x: any) => x.shutterSpeed], ["Metering", (x: any) => x.metering], ["Battery", (x: any) => x.battery], ["Weight", (x: any) => x.weight],
    ], [mode]);

  function setSelection(next: string[]) { router.replace(`/compare?type=${mode}&items=${next.join(",")}`, { scroll: false }); }
  function changeMode(next: Mode) { setMode(next); router.replace(`/compare?type=${next}`, { scroll: false }); }

  return <div><div className="compare-toolbar"><button className={mode === "films" ? "active" : ""} onClick={() => changeMode("films")}>Films</button><button className={mode === "cameras" ? "active" : ""} onClick={() => changeMode("cameras")}>Cameras</button></div><div className="picker-grid">{items.map((item) => { const active = selected.includes(item.slug); return <button key={item.slug} className={active ? "active" : ""} onClick={() => setSelection(active ? selected.filter((s) => s !== item.slug) : selected.length < 4 ? [...selected, item.slug] : selected)}>{item.name}</button>; })}</div><p className="micro">Select 2–4 {mode}. The URL updates automatically and can be shared.</p>{chosen.length >= 2 ? <div className="compare-scroll"><table><thead><tr><th>Attribute</th>{chosen.map((item) => <th key={item.slug}>{item.name}</th>)}</tr></thead><tbody>{rows.map(([label, getter]: any) => <tr key={label}><th>{label}</th>{chosen.map((item) => <td key={item.slug}>{getter(item)}</td>)}</tr>)}</tbody></table></div> : <p className="empty-state">Choose at least two items to compare.</p>}</div>;
}
