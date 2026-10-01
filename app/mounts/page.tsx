import Link from "next/link";
import { mounts } from "@/data/mounts";
import { cameras, lenses } from "@/lib/catalog";
import { parseLocale } from "@/lib/i18n";
import { normalizeMount } from "@/lib/lens-ecosystem";

export default async function MountDatabasePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const locale = parseLocale(query.lang);
  const isTh = locale === "th";

  return <section className="shell listing-page">
    <header>
      <p className="eyebrow">v0.9 · Compatibility & Ecosystem</p>
      <h1>{isTh ? "ฐานข้อมูลเมาท์" : "Mount Database"}</h1>
      <p>{isTh ? "ดูระบบเมาท์เป็นฐานข้อมูลกลาง เชื่อมกล้อง เลนส์ ระยะ flange และเส้นทางอะแดปเตอร์ที่ FilmIndex บันทึกไว้อย่างชัดเจน" : "A shared mount layer connecting cameras, lenses, flange focal distance, and explicitly recorded adapter paths across FilmIndex."}</p>
    </header>

    <div className="compatibility-note-box">
      {isTh ? "สถานะ Adapter หมายถึง FilmIndex มีเส้นทางอะแดปเตอร์ที่บันทึกไว้โดยเฉพาะ ไม่ได้สรุปจากระยะ flange เพียงอย่างเดียว และการควบคุมรูรับแสง/มิเตอร์/AF อาจต่างกันตามอุปกรณ์จริง" : "Adapter status means FilmIndex has an explicit recorded adapter path. It is never inferred from flange distance alone, and aperture, metering, or AF behavior can still vary with the real hardware."}
    </div>

    <div className="mount-grid">
      {mounts.map((mount) => {
        const nativeCameras = cameras.filter((camera) => normalizeMount(camera.lensMount) === mount.name).length;
        const nativeLenses = lenses.filter((lens) => normalizeMount(lens.mount) === mount.name).length;
        return <Link key={mount.slug} className="mount-card" href={`/mounts/${mount.slug}?lang=${locale}`}>
          <p className="eyebrow">{mount.system}</p>
          <h2>{mount.name}</h2>
          <p>{isTh ? mount.descriptionTh : mount.description}</p>
          <div className="mount-card-footer">
            <strong>{mount.flangeDistanceMm.toFixed(2)} mm</strong>
            <span>{nativeCameras} {isTh ? "กล้อง" : "cameras"}<br />{nativeLenses} {isTh ? "เลนส์" : "lenses"}</span>
          </div>
        </Link>;
      })}
    </div>
  </section>;
}
