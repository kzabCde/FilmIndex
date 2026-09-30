import Link from "next/link";
import { lenses } from "@/lib/catalog";
import { parseLocale } from "@/lib/i18n";

export default async function LensesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const isTh = locale === "th";
  const query = typeof params.q === "string" ? params.q.trim().toLowerCase() : "";
  const brand = typeof params.brand === "string" ? params.brand : "All";
  const mount = typeof params.mount === "string" ? params.mount : "All";
  const brands = [...new Set(lenses.map((lens) => lens.brand))].sort();
  const mounts = [...new Set(lenses.map((lens) => lens.mount))].sort();
  const filtered = lenses.filter((lens) => {
    const matchesQuery = !query || `${lens.name} ${lens.brand} ${lens.mount} ${lens.focalLength} ${lens.description}`.toLowerCase().includes(query);
    return matchesQuery && (brand === "All" || lens.brand === brand) && (mount === "All" || lens.mount === mount);
  });

  return <section className="shell listing-page lens-page">
    <header>
      <p className="eyebrow">Lens Database</p>
      <h1>{isTh ? "ฐานข้อมูลเลนส์" : "Lenses"}</h1>
      <p>{isTh ? `ฐานข้อมูลเลนส์ฟิล์มแบบ local จำนวน ${lenses.length} รุ่น ครอบคลุมระบบ SLR, Rangefinder และ Medium Format หลัก` : `${lenses.length} locally bundled film-camera lenses across major SLR, rangefinder, and medium-format systems.`}</p>
    </header>

    <form className="lens-filter-form" action="/lenses">
      <input type="hidden" name="lang" value={locale} />
      <label><span>{isTh ? "ค้นหา" : "Search"}</span><input name="q" defaultValue={typeof params.q === "string" ? params.q : ""} placeholder={isTh ? "ชื่อเลนส์ เมาท์ หรือทางยาวโฟกัส" : "Lens, mount, or focal length"} /></label>
      <label><span>{isTh ? "แบรนด์" : "Brand"}</span><select name="brand" defaultValue={brand}><option value="All">{isTh ? "ทั้งหมด" : "All"}</option>{brands.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label><span>{isTh ? "เมาท์" : "Mount"}</span><select name="mount" defaultValue={mount}><option value="All">{isTh ? "ทั้งหมด" : "All"}</option>{mounts.map((item) => <option key={item}>{item}</option>)}</select></label>
      <button type="submit">{isTh ? "กรอง" : "Filter"}</button>
    </form>

    <div className="lens-results-meta"><strong>{filtered.length}</strong><span>{isTh ? "รายการ" : "lenses"}</span></div>
    <div className="lens-grid">
      {filtered.map((lens) => <Link className="lens-card" href={`/lenses/${lens.slug}?lang=${locale}`} key={lens.slug}>
        <div className="lens-card-top"><span>{lens.mount}</span><strong>{lens.focalLength}</strong></div>
        <h2>{lens.name}</h2>
        <p>{lens.brand} · {lens.maxAperture} · {lens.focusType}</p>
        <div className="lens-card-meta"><span>{lens.coverage}</span>{lens.filterThread ? <span>Ø {lens.filterThread}</span> : null}{lens.minFocusM ? <span>{lens.minFocusM} m min</span> : null}</div>
      </Link>)}
    </div>
  </section>;
}
