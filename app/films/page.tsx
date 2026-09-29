import type { Metadata } from "next";
import { CatalogFilters } from "@/components/catalog-filters";
import { EntityCard } from "@/components/entity-card";
import { films } from "@/lib/catalog";
import { filmTypeLabel, messages, parseLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Films", description: "Browse photographic film stocks by brand, ISO, type, format, and process." };

const stringParam = (value: string | string[] | undefined) => typeof value === "string" ? value : "";

function matchesIsoBand(iso: number, band: string) {
  if (!band) return true;
  if (band === "25-100") return iso >= 25 && iso <= 100;
  if (band === "125-250") return iso >= 101 && iso <= 250;
  if (band === "400") return iso >= 251 && iso <= 500;
  if (band === "800") return iso >= 501 && iso <= 1000;
  if (band === "1600+") return iso >= 1600;
  return true;
}

export default async function FilmsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const copy = messages[locale].films;
  const brand = stringParam(params.brand);
  const type = stringParam(params.type);
  const iso = stringParam(params.iso);
  const format = stringParam(params.format);
  const process = stringParam(params.process);

  const visible = films.filter((film) =>
    (!brand || film.brand === brand) &&
    (!type || film.filmType === type) &&
    matchesIsoBand(film.iso, iso) &&
    (!format || film.formats.includes(format)) &&
    (!process || film.process === process)
  );

  const brands = [...new Set(films.map((film) => film.brand))].sort();
  const types = [...new Set(films.map((film) => film.filmType))].sort();
  const formats = [...new Set(films.flatMap((film) => film.formats))].sort();
  const processes = [...new Set(films.map((film) => film.process))].sort();
  const filterCopy = locale === "th"
    ? { brand: "แบรนด์", type: "ประเภทฟิล์ม", iso: "ช่วง ISO", format: "ฟอร์แมต", process: "กระบวนการล้าง", apply: "ใช้ตัวกรอง", clear: "ล้างตัวกรอง", results: "รายการ" }
    : { brand: "Brand", type: "Film type", iso: "ISO range", format: "Format", process: "Process", apply: "Apply filters", clear: "Clear filters", results: "results" };

  return (
    <section className="shell listing-page">
      <header><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.copy}</p></header>
      <CatalogFilters
        action="/films"
        locale={locale}
        values={{ brand, type, iso, format, process }}
        applyLabel={filterCopy.apply}
        clearLabel={filterCopy.clear}
        resultLabel={filterCopy.results}
        resultCount={visible.length}
        filters={[
          { name: "brand", label: filterCopy.brand, options: brands.map((value) => ({ value, label: value })) },
          { name: "type", label: filterCopy.type, options: types.map((value) => ({ value, label: filmTypeLabel(value, locale) })) },
          { name: "iso", label: filterCopy.iso, options: [
            { value: "25-100", label: "ISO 25–100" },
            { value: "125-250", label: "ISO 125–250" },
            { value: "400", label: "ISO 400" },
            { value: "800", label: "ISO 800" },
            { value: "1600+", label: "ISO 1600+" },
          ] },
          { name: "format", label: filterCopy.format, options: formats.map((value) => ({ value, label: value })) },
          { name: "process", label: filterCopy.process, options: processes.map((value) => ({ value, label: value })) },
        ]}
      />
      <div className="card-grid">{visible.map((film, index) => <EntityCard key={film.slug} item={film} index={index} locale={locale} />)}</div>
      {!visible.length && <p className="empty-state">{copy.empty}</p>}
    </section>
  );
}
