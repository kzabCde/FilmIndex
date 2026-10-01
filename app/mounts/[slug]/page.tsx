import Link from "next/link";
import { notFound } from "next/navigation";
import { findMountBySlug, mountAdapters, mounts } from "@/data/mounts";
import { cameras, lenses } from "@/lib/catalog";
import { parseLocale } from "@/lib/i18n";
import { normalizeMount } from "@/lib/lens-ecosystem";

export function generateStaticParams() {
  return mounts.map(({ slug }) => ({ slug }));
}

export default async function MountDetailPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { slug } = await params;
  const query = await searchParams;
  const locale = parseLocale(query.lang);
  const isTh = locale === "th";
  const mount = findMountBySlug(slug);
  if (!mount) notFound();

  const nativeCameras = cameras.filter((camera) => normalizeMount(camera.lensMount) === mount.name);
  const nativeLenses = lenses.filter((lens) => normalizeMount(lens.mount) === mount.name);
  const outbound = mountAdapters.filter((adapter) => adapter.fromMount === mount.name);
  const inbound = mountAdapters.filter((adapter) => adapter.toMount === mount.name);

  return <article className="shell detail-page">
    <nav className="tool-breadcrumb" aria-label="Breadcrumb"><Link href={`/mounts?lang=${locale}`}>{isTh ? "ฐานข้อมูลเมาท์" : "Mount Database"}</Link><span>/</span><span>{mount.name}</span></nav>

    <header className="mount-detail-header">
      <div>
        <p className="eyebrow">{mount.system} · {mount.format}</p>
        <h1>{mount.name}</h1>
        <p>{isTh ? mount.descriptionTh : mount.description}</p>
      </div>
      <div className="flange-display"><span>{isTh ? "ระยะ Flange" : "Flange focal distance"}</span><strong>{mount.flangeDistanceMm.toFixed(2)}</strong><small>mm</small></div>
    </header>

    <div className="mount-spec-strip">
      <div><span>{isTh ? "ระบบ" : "System"}</span><strong>{mount.system}</strong></div>
      <div><span>{isTh ? "ชนิดเมาท์" : "Mount type"}</span><strong>{mount.mountType}</strong></div>
      <div><span>{isTh ? "ฟอร์แมตหลัก" : "Primary format"}</span><strong>{mount.format}</strong></div>
      <div><span>{isTh ? "เปิดตัว" : "Introduced"}</span><strong>{mount.introducedYear ?? "—"}</strong></div>
    </div>

    <section>
      <div className="compatibility-heading"><div><p className="eyebrow">Native ecosystem</p><h2>{isTh ? "กล้องและเลนส์เมาท์ตรง" : "Native cameras & lenses"}</h2></div><div className="compatibility-summary"><span>{nativeCameras.length} {isTh ? "กล้อง" : "cameras"}</span><span>{nativeLenses.length} {isTh ? "เลนส์" : "lenses"}</span></div></div>
      {nativeCameras.length ? <><p className="eyebrow">{isTh ? "กล้อง" : "Cameras"}</p><div className="mount-native-grid">{nativeCameras.map((camera) => <Link key={camera.slug} href={`/cameras/${camera.slug}?lang=${locale}`}><strong>{camera.name}</strong><span>{camera.filmFormat} · {camera.releaseYear}</span></Link>)}</div></> : <p className="micro">{isTh ? "ยังไม่มีกล้องเมาท์นี้ในฐานข้อมูล" : "No native camera record is currently available for this mount."}</p>}
      {nativeLenses.length ? <><p className="eyebrow" style={{ marginTop:32 }}>{isTh ? "เลนส์" : "Lenses"}</p><div className="mount-native-grid">{nativeLenses.map((lens) => <Link key={lens.slug} href={`/lenses/${lens.slug}?lang=${locale}`}><strong>{lens.name}</strong><span>{lens.focalLength} · {lens.maxAperture}</span></Link>)}</div></> : <p className="micro">{isTh ? "ยังไม่มีเลนส์เมาท์นี้ในฐานข้อมูล" : "No native lens record is currently available for this mount."}</p>}
    </section>

    <section>
      <div className="compatibility-heading"><div><p className="eyebrow">Adapter registry</p><h2>{isTh ? "เส้นทางอะแดปเตอร์" : "Recorded adapter paths"}</h2></div><div className="compatibility-summary"><span>{outbound.length} {isTh ? "ออก" : "outbound"}</span><span>{inbound.length} {isTh ? "เข้า" : "inbound"}</span></div></div>
      {[...outbound, ...inbound].length ? <div className="adapter-grid">{[...outbound, ...inbound].map((adapter, index) => <div className="adapter-card" key={`${adapter.fromMount}-${adapter.toMount}-${index}`}>
        <div className="adapter-route"><strong>{adapter.fromMount}</strong><span>→</span><strong>{adapter.toMount}</strong></div>
        <div className="adapter-meta"><span>Infinity: {adapter.infinityFocus === "yes" ? "Yes" : adapter.infinityFocus === "optical-correction" ? "Optical correction" : "No"}</span><span>Aperture: {adapter.apertureControl}</span><span>AF: {adapter.autofocus ? "Yes" : "No"}</span></div>
        <p>{isTh ? adapter.noteTh : adapter.note}</p>
      </div>)}</div> : <p className="compatibility-note-box">{isTh ? "ยังไม่มีเส้นทางอะแดปเตอร์ที่ FilmIndex บันทึกไว้อย่างชัดเจนสำหรับเมาท์นี้" : "FilmIndex does not currently record an explicit adapter path for this mount."}</p>}
    </section>

    <section className="source-card"><h2>{isTh ? "แหล่งข้อมูลระยะเมาท์" : "Mount reference"}</h2><p>{mount.sourceLabel}</p><a href={mount.sourceUrl} target="_blank" rel="noreferrer">{isTh ? "เปิดแหล่งข้อมูล" : "Open source"} ↗</a></section>
  </article>;
}
