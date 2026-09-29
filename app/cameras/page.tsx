import type { Metadata } from "next";
import { CatalogFilters } from "@/components/catalog-filters";
import { EntityCard } from "@/components/entity-card";
import { cameras } from "@/lib/catalog";
import { cameraTypeLabel, messages, parseLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Cameras", description: "Browse classic film cameras and technical specifications." };

const stringParam = (value: string | string[] | undefined) => typeof value === "string" ? value : "";

export default async function CamerasPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const copy = messages[locale].cameras;
  const brand = stringParam(params.brand);
  const type = stringParam(params.type);
  const format = stringParam(params.format);
  const exposure = stringParam(params.exposure);
  const lens = stringParam(params.lens);

  const visible = cameras.filter((camera) => {
    const fixedLens = camera.lensMount.toLowerCase().startsWith("fixed");
    return (
      (!brand || camera.brand === brand) &&
      (!type || camera.cameraType === type) &&
      (!format || camera.filmFormat.toLowerCase().includes(format.toLowerCase())) &&
      (!exposure || camera.exposureModes.includes(exposure)) &&
      (!lens || (lens === "fixed" ? fixedLens : !fixedLens))
    );
  });

  const brands = [...new Set(cameras.map((camera) => camera.brand))].sort();
  const types = [...new Set(cameras.map((camera) => camera.cameraType))].sort();
  const filterCopy = locale === "th"
    ? { brand: "แบรนด์", type: "ประเภทกล้อง", format: "ฟอร์แมตฟิล์ม", exposure: "โหมดรับแสง", lens: "ประเภทเลนส์", apply: "ใช้ตัวกรอง", clear: "ล้างตัวกรอง", results: "รายการ", fixed: "เลนส์ติดตาย", interchangeable: "เปลี่ยนเลนส์ได้" }
    : { brand: "Brand", type: "Camera type", format: "Film format", exposure: "Exposure mode", lens: "Lens type", apply: "Apply filters", clear: "Clear filters", results: "results", fixed: "Fixed lens", interchangeable: "Interchangeable lens" };

  return (
    <section className="shell listing-page">
      <header><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.copy}</p></header>
      <CatalogFilters
        action="/cameras"
        locale={locale}
        values={{ brand, type, format, exposure, lens }}
        applyLabel={filterCopy.apply}
        clearLabel={filterCopy.clear}
        resultLabel={filterCopy.results}
        resultCount={visible.length}
        filters={[
          { name: "brand", label: filterCopy.brand, options: brands.map((value) => ({ value, label: value })) },
          { name: "type", label: filterCopy.type, options: types.map((value) => ({ value, label: cameraTypeLabel(value, locale) })) },
          { name: "format", label: filterCopy.format, options: [
            { value: "35mm", label: "35mm" },
            { value: "120", label: "120 / Medium Format" },
          ] },
          { name: "exposure", label: filterCopy.exposure, options: ["Manual", "Aperture Priority", "Shutter Priority", "Program"].map((value) => ({ value, label: value })) },
          { name: "lens", label: filterCopy.lens, options: [
            { value: "fixed", label: filterCopy.fixed },
            { value: "interchangeable", label: filterCopy.interchangeable },
          ] },
        ]}
      />
      <div className="card-grid">{visible.map((camera, index) => <EntityCard key={camera.slug} item={camera} index={index} locale={locale} />)}</div>
      {!visible.length && <p className="empty-state">{locale === "th" ? "ไม่พบกล้องที่ตรงกับตัวกรอง" : "No cameras match these filters."}</p>}
    </section>
  );
}
