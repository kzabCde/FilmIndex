import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DataQualityPanel } from "@/components/data-quality-panel";
import { cameras, findBySlug, lenses } from "@/lib/catalog";
import { parseLocale } from "@/lib/i18n";
import { getLensCameraMatches, getMountRecord } from "@/lib/lens-ecosystem";

export function generateStaticParams() {
  return lenses.map((lens) => ({ slug: lens.slug }));
}

export default async function LensDetailPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { slug } = await params;
  const query = await searchParams;
  const locale = parseLocale(query.lang);
  const isTh = locale === "th";
  const lens = findBySlug(lenses, slug);
  if (!lens) notFound();

  const mount = getMountRecord(lens.mount);
  const matches = getLensCameraMatches(lens, cameras);
  const nativeMatches = matches.filter(({ compatibility }) => compatibility.status === "native");
  const adapterMatches = matches.filter(({ compatibility }) => compatibility.status === "adapter");
  const incompatibleCount = matches.filter(({ compatibility }) => compatibility.status === "not-compatible" || compatibility.status === "fixed-lens").length;

  return <section className="shell detail-page lens-detail-page">
    <nav className="tool-breadcrumb" aria-label="Breadcrumb"><Link href={`/lenses?lang=${locale}`}>{isTh ? "เลนส์ทั้งหมด" : "All lenses"}</Link><span>/</span><span>{lens.name}</span></nav>
    <header className="lens-detail-header">
      <div><p className="eyebrow">{lens.mount} · {lens.coverage}</p><h1>{lens.name}</h1><p>{isTh ? lens.descriptionTh : lens.description}</p>{mount ? <p><Link className="mount-link" href={`/mounts/${mount.slug}?lang=${locale}`}>{isTh ? "ดูฐานข้อมูลเมาท์" : "Open mount database"} · {mount.name} ↗</Link></p> : null}</div>
      <div className="lens-hero-spec"><span>{lens.focalLength}</span><strong>{lens.maxAperture}</strong></div>
    </header>

    {lens.image ? <figure className="lens-detail-media">
      <Image src={lens.image.url} alt={lens.image.alt} width={1400} height={950} sizes="(max-width: 900px) 100vw, 1100px" priority />
      <figcaption>
        <span><strong>{lens.imageMatch === "representative" ? (isTh ? "ภาพอ้างอิงระบบ/ตระกูล — ไม่ใช่ภาพยืนยันรุ่นตรง" : "System/family reference — not an exact-model identification") : (isTh ? "ภาพอ้างอิงรุ่น" : "Model reference")}</strong></span>
        <span>{lens.image.creator} · {lens.image.license}</span>
        <a href={lens.image.sourceUrl} target="_blank" rel="noreferrer">{isTh ? "ดูแหล่งที่มา" : "View source"} ↗</a>
      </figcaption>
    </figure> : null}

    <div className="lens-spec-grid">
      <div><span>{isTh ? "แบรนด์" : "Brand"}</span><strong>{lens.brand}</strong></div>
      <div><span>{isTh ? "เมาท์" : "Mount"}</span><strong>{lens.mount}</strong></div>
      <div><span>{isTh ? "โฟกัส" : "Focus"}</span><strong>{lens.focusType}</strong></div>
      <div><span>{isTh ? "ครอบคลุม" : "Coverage"}</span><strong>{lens.coverage}</strong></div>
      {lens.minFocusM ? <div><span>{isTh ? "โฟกัสใกล้สุด" : "Min focus"}</span><strong>{lens.minFocusM} m</strong></div> : null}
      {lens.filterThread ? <div><span>{isTh ? "ฟิลเตอร์" : "Filter"}</span><strong>Ø {lens.filterThread}</strong></div> : null}
    </div>

    <section className="compatibility-ecosystem">
      <div className="compatibility-heading">
        <div><p className="eyebrow">v0.9 · Camera ecosystem</p><h2>{isTh ? "กล้องที่ใช้กับเลนส์นี้" : "Compatible camera bodies"}</h2></div>
        <div className="compatibility-summary"><span>Native {nativeMatches.length}</span><span>Adapter {adapterMatches.length}</span><span>Not compatible {incompatibleCount}</span></div>
      </div>
      {[...nativeMatches, ...adapterMatches].length ? <div className="compatibility-list">{[...nativeMatches, ...adapterMatches].map(({ camera, compatibility }) => <Link className="compatibility-row" href={`/cameras/${camera.slug}?lang=${locale}`} key={camera.slug}>
        <div className="compatibility-entity"><strong>{camera.name}</strong><span>{camera.filmFormat} · {camera.lensMount}</span></div>
        <span className={`compatibility-status ${compatibility.status}`}>{compatibility.status === "native" ? "Native" : "Adapter"}</span>
        <p>{isTh && compatibility.adapter?.noteTh ? compatibility.adapter.noteTh : compatibility.note}</p>
      </Link>)}</div> : <div className="compatibility-note-box"><span className="compatibility-status not-compatible">Not compatible</span><p>{isTh ? "ยังไม่มีกล้องในฐานข้อมูลที่มี native match หรือ adapter path ที่บันทึกไว้สำหรับเลนส์นี้" : "No camera in the current database has a native match or explicitly recorded adapter path for this lens."}</p></div>}
      <p className="micro" style={{ marginTop:14 }}>{isTh ? `กล้องอีก ${incompatibleCount} รุ่นถูกจัดเป็น Not compatible หรือเป็นกล้องเลนส์ติดตาย` : `${incompatibleCount} additional bodies are classified Not compatible or use fixed lenses.`}</p>
      <Link className="tool-primary-button inline-tool-link" href={`/tools/camera-lens-compatibility?lang=${locale}`}>{isTh ? "เปิด Compatibility Checker" : "Open Compatibility Checker"}</Link>
    </section>

    <DataQualityPanel provenance={lens.provenance} locale={locale} />
  </section>;
}
