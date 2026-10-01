import { cameras, catalogQualityStats, films, lenses, techniques } from "@/lib/catalog";
import { filmSamples } from "@/lib/film-samples";
import { messages, parseLocale } from "@/lib/i18n";

export default async function SourcesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const isTh = locale === "th";
  const copy = messages[locale].sources;
  const sampleImages = Object.values(filmSamples).flat();
  const images = [
    ...films.flatMap((x) => x.image ? [x.image] : []),
    ...sampleImages,
    ...cameras.map((x) => x.image),
    ...lenses.flatMap((x) => x.image ? [x.image] : []),
    ...techniques.flatMap((x) => x.image ? [x.image] : []),
  ];
  const uniqueImages = Array.from(new Map(images.map((item) => [item.sourceUrl, item])).values());
  const recordSources = Array.from(new Map(
    [...films, ...cameras, ...lenses]
      .flatMap((record) => record.provenance.sources)
      .filter((item) => item.scope !== "image")
      .map((item) => [item.url, item] as const),
  ).values());

  return <section className="shell listing-page">
    <header><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.copy}</p></header>
    <div className="prose-panel">
      <h2>{isTh ? "สถานะคุณภาพฐานข้อมูล" : "Catalog data quality"}</h2>
      <p>{isTh ? "FilmIndex แยกความมั่นใจของข้อมูลออกจากตัวเนื้อหาอย่างชัดเจน และไม่ใช้คำว่า Verified หาก record ไม่มีแหล่งอ้างอิงระดับรุ่นหรือคู่มือโดยตรง" : "FilmIndex separates record confidence from editorial content and does not mark a record Verified unless it has a model-level or manual-level source."}</p>
      <div className="quality-summary-grid">
        <div><strong>{catalogQualityStats.verified}</strong><span>{isTh ? "Verified" : "Verified"}</span></div>
        <div><strong>{catalogQualityStats.communityReference}</strong><span>{isTh ? "Catalog / community reference" : "Catalog / community reference"}</span></div>
        <div><strong>{catalogQualityStats.incomplete}</strong><span>{isTh ? "Incomplete" : "Incomplete"}</span></div>
        <div><strong>{catalogQualityStats.sourceCoverage}/{catalogQualityStats.total}</strong><span>{isTh ? "มีแหล่งอ้างอิง" : "Source coverage"}</span></div>
      </div>

      <h2>{isTh ? "ความหมายของสถานะ" : "Confidence definitions"}</h2>
      <p><strong>Verified</strong> — {isTh ? "มี source ระดับรุ่นหรือคู่มือโดยตรงสำหรับข้อมูลหลักของ record" : "A model-level or manual-level source supports the record's core factual fields."}</p>
      <p><strong>Catalog / community reference</strong> — {isTh ? "อ้างอิงจากแคตตาล็อกระดับแบรนด์/ระบบ หรือฐานข้อมูลชุมชนที่ระบุไว้ แต่ยังไม่ได้ยืนยันทุกฟิลด์กับเอกสารตรงรุ่น" : "Supported by a brand/system catalog or an identified community reference, but not every field has been checked against a model-specific document."}</p>
      <p><strong>Incomplete</strong> — {isTh ? "ยังขาดแหล่งอ้างอิงทางเทคนิคเพียงพอ จึงควรใช้เป็นจุดเริ่มต้นในการค้นคว้ามากกว่าข้อสรุป" : "Technical sourcing is still incomplete; treat the record as a research starting point rather than a final authority."}</p>

      <h2>{copy.dataPolicy}</h2><p>{copy.dataCopy}</p>
      <h2>{isTh ? "แหล่งข้อมูลของ record" : "Record references"}</h2>
      <div className="source-list">{recordSources.map((item) => <a key={item.url} href={item.url} target="_blank" rel="noreferrer"><strong>{item.label}</strong><span>{item.publisher} · {item.scope}</span></a>)}</div>

      <h2>{copy.imageRecords}</h2>
      <div className="source-list">{uniqueImages.map((image) => <a key={image.sourceUrl} href={image.sourceUrl} target="_blank" rel="noreferrer"><strong>{image.alt}</strong><span>{image.sourceName} · {image.creator} · {image.license}</span></a>)}</div>
    </div>
  </section>;
}
