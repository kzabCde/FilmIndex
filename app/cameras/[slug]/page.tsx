import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DataQualityPanel } from "@/components/data-quality-panel";
import { cameras, findBySlug, lenses } from "@/lib/catalog";
import { cameraTypeLabel } from "@/lib/camera-types";
import { messages, parseLocale, pick, withLocale } from "@/lib/i18n";
import { getCameraLensMatches, getMountRecord } from "@/lib/lens-ecosystem";

export function generateStaticParams() {
  return cameras.map(({ slug }) => ({ slug }));
}

export default async function CameraDetail({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { slug } = await params;
  const query = await searchParams;
  const locale = parseLocale(query.lang);
  const isTh = locale === "th";
  const copy = messages[locale].detail;
  const camera = findBySlug(cameras, slug);
  if (!camera) notFound();

  const mount = getMountRecord(camera.lensMount);
  const matches = getCameraLensMatches(camera, lenses);
  const nativeMatches = matches.filter(({ compatibility }) => compatibility.status === "native");
  const adapterMatches = matches.filter(({ compatibility }) => compatibility.status === "adapter");
  const incompatibleCount = matches.filter(({ compatibility }) => compatibility.status === "not-compatible").length;
  const fixedLens = matches.some(({ compatibility }) => compatibility.status === "fixed-lens");

  const specs = isTh
    ? { ผู้ผลิต: camera.brand, "ปีเปิดตัว": camera.releaseYear, "ฟอร์แมต": camera.filmFormat, "ประเภท": cameraTypeLabel(camera.cameraType, locale), "เมาท์เลนส์": camera.lensMount, "ชัตเตอร์": camera.shutter, "ความเร็วชัตเตอร์": camera.shutterSpeed, "ระบบวัดแสง": camera.metering, "โหมดรับแสง": camera.exposureModes.join(", "), "แบตเตอรี่": camera.battery, "น้ำหนัก": camera.weight, "แฟลชซิงก์": camera.flashSync }
    : { Manufacturer: camera.brand, "Release year": camera.releaseYear, Format: camera.filmFormat, Type: cameraTypeLabel(camera.cameraType, locale), Mount: camera.lensMount, Shutter: camera.shutter, "Shutter speeds": camera.shutterSpeed, Metering: camera.metering, "Exposure modes": camera.exposureModes.join(", "), Battery: camera.battery, Weight: camera.weight, "Flash sync": camera.flashSync };

  return <article className="shell detail-page">
    <div className="detail-hero">
      <div><Image src={camera.image.url} alt={camera.image.alt} width={1200} height={900} priority /></div>
      <div>
        <p className="eyebrow">{camera.brand} · {camera.releaseYear}</p>
        <h1>{camera.name}</h1>
        <p className="lede">{pick(locale, camera.description, camera.descriptionTh)}</p>
        <div className="facts"><span>{camera.filmFormat}</span><span>{cameraTypeLabel(camera.cameraType, locale)}</span><span>{camera.lensMount}</span></div>
        {mount ? <p style={{ marginTop:20 }}><Link className="mount-link" href={`/mounts/${mount.slug}?lang=${locale}`}>{isTh ? "ดูฐานข้อมูลเมาท์" : "Open mount database"} · {mount.name} ↗</Link></p> : null}
      </div>
    </div>

    <section>
      <p className="eyebrow">{copy.factual}</p><h2>{copy.specifications}</h2>
      <dl className="spec-grid">{Object.entries(specs).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
    </section>

    <section className="compatibility-ecosystem">
      <div className="compatibility-heading">
        <div><p className="eyebrow">v0.9 · Lens ecosystem</p><h2>{isTh ? "เลนส์ที่ใช้กับกล้องนี้" : "Lens compatibility"}</h2></div>
        <div className="compatibility-summary"><span>Native {nativeMatches.length}</span><span>Adapter {adapterMatches.length}</span><span>Not compatible {incompatibleCount}</span></div>
      </div>

      {fixedLens ? <div className="compatibility-note-box"><strong>{isTh ? "Fixed lens" : "Fixed lens"}</strong><br />{isTh ? "กล้องรุ่นนี้ใช้เลนส์ติดตาย จึงไม่มีระบบเลนส์เปลี่ยนได้ให้จับคู่" : "This camera has a built-in lens, so interchangeable-lens compatibility does not apply."}</div> : <>
        {[...nativeMatches, ...adapterMatches].length ? <div className="compatibility-list">{[...nativeMatches, ...adapterMatches].map(({ lens, compatibility }) => <Link className="compatibility-row" href={`/lenses/${lens.slug}?lang=${locale}`} key={lens.slug}>
          <div className="compatibility-entity"><strong>{lens.name}</strong><span>{lens.focalLength} · {lens.maxAperture} · {lens.mount}</span></div>
          <span className={`compatibility-status ${compatibility.status}`}>{compatibility.status === "native" ? "Native" : "Adapter"}</span>
          <p>{isTh && compatibility.adapter?.noteTh ? compatibility.adapter.noteTh : compatibility.note}</p>
        </Link>)}</div> : <div className="compatibility-note-box"><span className="compatibility-status not-compatible">Not compatible</span><p>{isTh ? "ยังไม่มีเลนส์ในฐานข้อมูลที่ตรงเมาท์หรือมีเส้นทางอะแดปเตอร์ที่บันทึกไว้" : "No lens in the current database has a native or explicitly recorded adapter path to this body."}</p></div>}
        <p className="micro" style={{ marginTop:14 }}>{isTh ? `เลนส์อีก ${incompatibleCount} รุ่นถูกจัดเป็น Not compatible เพราะไม่มี native match หรือ adapter path ที่ FilmIndex บันทึกไว้` : `${incompatibleCount} additional lenses are classified Not compatible because FilmIndex has no native match or explicit adapter path for them.`}</p>
      </>}
    </section>

    <DataQualityPanel provenance={camera.provenance} locale={locale} />
    <section className="source-card"><h2>{copy.imageSource}</h2><p>{camera.image.creator} · {camera.image.license}</p><a href={camera.image.sourceUrl} target="_blank" rel="noreferrer">{copy.openSource}</a></section>
    <Link className="back-link" href={withLocale("/cameras", locale)}>{copy.backCameras}</Link>
  </article>;
}
