import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DataQualityPanel } from "@/components/data-quality-panel";
import { cameras, findBySlug, lenses } from "@/lib/catalog";
import { parseLocale } from "@/lib/i18n";
import { checkCameraLensCompatibility } from "@/lib/lens-ecosystem";

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
  const nativeCameras = cameras.filter((camera) => checkCameraLensCompatibility(camera, lens).status === "native").slice(0, 10);

  return <section className="shell detail-page lens-detail-page">
    <nav className="tool-breadcrumb" aria-label="Breadcrumb"><Link href={`/lenses?lang=${locale}`}>{isTh ? "เลนส์ทั้งหมด" : "All lenses"}</Link><span>/</span><span>{lens.name}</span></nav>
    <header className="lens-detail-header">
      <div><p className="eyebrow">{lens.mount} · {lens.coverage}</p><h1>{lens.name}</h1><p>{isTh ? lens.descriptionTh : lens.description}</p></div>
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

    <DataQualityPanel provenance={lens.provenance} locale={locale} />

    <section className="lens-compatible-section">
      <p className="eyebrow">Native camera matches</p>
      <h2>{isTh ? "กล้องในฐานข้อมูลที่ใช้เมาท์เดียวกัน" : "Cameras with a native mount match"}</h2>
      {nativeCameras.length ? <div className="lens-camera-list">{nativeCameras.map((camera) => <Link href={`/cameras/${camera.slug}?lang=${locale}`} key={camera.slug}><strong>{camera.name}</strong><span>{camera.filmFormat} · {camera.lensMount}</span></Link>)}</div> : <p className="micro">{isTh ? "ยังไม่พบกล้องที่ตรงแบบ native ในฐานข้อมูลปัจจุบัน" : "No native camera match is currently recorded in the camera database."}</p>}
      <Link className="tool-primary-button inline-tool-link" href={`/tools/camera-lens-compatibility?lang=${locale}`}>{isTh ? "เปิด Compatibility Checker" : "Open Compatibility Checker"}</Link>
    </section>
  </section>;
}
