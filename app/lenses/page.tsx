import Image from "next/image";
import Link from "next/link";
import { CatalogFilters } from "@/components/catalog-filters";
import { lenses } from "@/lib/catalog";
import { parseLocale } from "@/lib/i18n";

const stringParam = (value: string | string[] | undefined) => typeof value === "string" ? value : "";

export default async function LensesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const isTh = locale === "th";
  const brand = stringParam(params.brand);
  const mount = stringParam(params.mount);
  const focalLength = stringParam(params.focalLength);
  const focusType = stringParam(params.focusType);
  const coverage = stringParam(params.coverage);

  const brands = [...new Set(lenses.map((lens) => lens.brand))].sort();
  const mounts = [...new Set(lenses.map((lens) => lens.mount))].sort();
  const focalLengths = [...new Set(lenses.map((lens) => lens.focalLength))].sort((a, b) => parseFloat(a) - parseFloat(b));
  const focusTypes = [...new Set(lenses.map((lens) => lens.focusType))].sort();
  const coverages = [...new Set(lenses.map((lens) => lens.coverage))].sort();

  const filtered = lenses.filter((lens) =>
    (!brand || lens.brand === brand) &&
    (!mount || lens.mount === mount) &&
    (!focalLength || lens.focalLength === focalLength) &&
    (!focusType || lens.focusType === focusType) &&
    (!coverage || lens.coverage === coverage)
  );

  const filterCopy = isTh
    ? {
        brand: "แบรนด์",
        mount: "เมาท์",
        focalLength: "ทางยาวโฟกัส",
        focusType: "ระบบโฟกัส",
        coverage: "ขนาดฟิล์ม",
        manual: "แมนนวล",
        autofocus: "ออโต้โฟกัส",
        apply: "ใช้ตัวกรอง",
        clear: "ล้างตัวกรอง",
        results: "รายการ",
      }
    : {
        brand: "Brand",
        mount: "Mount",
        focalLength: "Focal length",
        focusType: "Focus type",
        coverage: "Coverage",
        manual: "Manual",
        autofocus: "Autofocus",
        apply: "Apply filters",
        clear: "Clear filters",
        results: "results",
      };

  return <section className="shell listing-page lens-page">
    <header>
      <p className="eyebrow">Lens Database</p>
      <h1>{isTh ? "ฐานข้อมูลเลนส์" : "Lenses"}</h1>
      <p>{isTh ? `ฐานข้อมูลเลนส์ฟิล์มแบบ local จำนวน ${lenses.length} รุ่น ครอบคลุมระบบ SLR, Rangefinder และ Medium Format หลัก พร้อมภาพอ้างอิงและแหล่งที่มา` : `${lenses.length} locally bundled film-camera lenses across major SLR, rangefinder, and medium-format systems, now with sourced reference media.`}</p>
    </header>

    <CatalogFilters
      action="/lenses"
      locale={locale}
      values={{ brand, mount, focalLength, focusType, coverage }}
      applyLabel={filterCopy.apply}
      clearLabel={filterCopy.clear}
      resultLabel={filterCopy.results}
      resultCount={filtered.length}
      filters={[
        { name: "brand", label: filterCopy.brand, options: brands.map((value) => ({ value, label: value })) },
        { name: "mount", label: filterCopy.mount, options: mounts.map((value) => ({ value, label: value })) },
        { name: "focalLength", label: filterCopy.focalLength, options: focalLengths.map((value) => ({ value, label: value })) },
        { name: "focusType", label: filterCopy.focusType, options: focusTypes.map((value) => ({ value, label: value === "Manual" ? filterCopy.manual : filterCopy.autofocus })) },
        { name: "coverage", label: filterCopy.coverage, options: coverages.map((value) => ({ value, label: value })) },
      ]}
    />

    <div className="lens-grid">
      {filtered.map((lens) => <Link className="lens-card lens-card-with-media" href={`/lenses/${lens.slug}?lang=${locale}`} key={lens.slug}>
        {lens.image ? <div className="lens-card-media"><Image src={lens.image.url} alt={lens.image.alt} width={900} height={650} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /><span>{lens.imageMatch === "representative" ? (isTh ? "ภาพอ้างอิงระบบ/ตระกูล" : "System/family reference") : (isTh ? "ภาพอ้างอิงรุ่น" : "Model reference")}</span></div> : null}
        <div className="lens-card-body">
          <div className="lens-card-top"><span>{lens.mount}</span><strong>{lens.focalLength}</strong></div>
          <h2>{lens.name}</h2>
          <p>{lens.brand} · {lens.maxAperture} · {lens.focusType}</p>
          <div className="lens-card-meta"><span>{lens.coverage}</span>{lens.filterThread ? <span>Ø {lens.filterThread}</span> : null}{lens.minFocusM ? <span>{lens.minFocusM} m min</span> : null}</div>
        </div>
      </Link>)}
    </div>
    {!filtered.length && <p className="empty-state">{isTh ? "ไม่พบเลนส์ที่ตรงกับตัวกรอง" : "No lenses match these filters."}</p>}
  </section>;
}
