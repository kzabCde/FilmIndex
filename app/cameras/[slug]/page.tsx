import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DataQualityPanel } from "@/components/data-quality-panel";
import { cameras, findBySlug } from "@/lib/catalog";
import { cameraTypeLabel } from "@/lib/camera-types";
import { messages, parseLocale, pick, withLocale } from "@/lib/i18n";

export function generateStaticParams() { return cameras.map(({ slug }) => ({ slug })); }

export default async function CameraDetail({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { slug } = await params;
  const query = await searchParams;
  const locale = parseLocale(query.lang);
  const copy = messages[locale].detail;
  const camera = findBySlug(cameras, slug);
  if (!camera) notFound();
  const specs = locale === "th"
    ? { ผู้ผลิต: camera.brand, "ปีเปิดตัว": camera.releaseYear, "ฟอร์แมต": camera.filmFormat, "ประเภท": cameraTypeLabel(camera.cameraType, locale), "เมาท์เลนส์": camera.lensMount, "ชัตเตอร์": camera.shutter, "ความเร็วชัตเตอร์": camera.shutterSpeed, "ระบบวัดแสง": camera.metering, "โหมดรับแสง": camera.exposureModes.join(", "), "แบตเตอรี่": camera.battery, "น้ำหนัก": camera.weight, "แฟลชซิงก์": camera.flashSync }
    : { Manufacturer: camera.brand, "Release year": camera.releaseYear, Format: camera.filmFormat, Type: cameraTypeLabel(camera.cameraType, locale), Mount: camera.lensMount, Shutter: camera.shutter, "Shutter speeds": camera.shutterSpeed, Metering: camera.metering, "Exposure modes": camera.exposureModes.join(", "), Battery: camera.battery, Weight: camera.weight, "Flash sync": camera.flashSync };
  return <article className="shell detail-page"><div className="detail-hero"><div><Image src={camera.image.url} alt={camera.image.alt} width={1200} height={900} priority /></div><div><p className="eyebrow">{camera.brand} · {camera.releaseYear}</p><h1>{camera.name}</h1><p className="lede">{pick(locale, camera.description, camera.descriptionTh)}</p><div className="facts"><span>{camera.filmFormat}</span><span>{cameraTypeLabel(camera.cameraType, locale)}</span><span>{camera.lensMount}</span></div></div></div><section><p className="eyebrow">{copy.factual}</p><h2>{copy.specifications}</h2><dl className="spec-grid">{Object.entries(specs).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></section><DataQualityPanel provenance={camera.provenance} locale={locale} /><section className="source-card"><h2>{copy.imageSource}</h2><p>{camera.image.creator} · {camera.image.license}</p><a href={camera.image.sourceUrl} target="_blank" rel="noreferrer">{copy.openSource}</a></section><Link className="back-link" href={withLocale("/cameras", locale)}>{copy.backCameras}</Link></article>;
}
