import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cameras, findBySlug } from "@/lib/data";

export function generateStaticParams() { return cameras.map(({ slug }) => ({ slug })); }

export default async function CameraDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const camera = findBySlug(cameras, slug);
  if (!camera) notFound();
  const specs = { Manufacturer: camera.brand, "Release year": camera.releaseYear, Format: camera.filmFormat, Type: camera.cameraType, Mount: camera.lensMount, Shutter: camera.shutter, "Shutter speeds": camera.shutterSpeed, Metering: camera.metering, "Exposure modes": camera.exposureModes.join(", "), Battery: camera.battery, Weight: camera.weight, "Flash sync": camera.flashSync };
  return <article className="shell detail-page"><div className="detail-hero"><div><Image src={camera.image.url} alt={camera.image.alt} width={1200} height={900} priority /></div><div><p className="eyebrow">{camera.brand} · {camera.releaseYear}</p><h1>{camera.name}</h1><p className="lede">{camera.description}</p><div className="facts"><span>{camera.filmFormat}</span><span>{camera.cameraType}</span><span>{camera.lensMount}</span></div></div></div><section><p className="eyebrow">Factual data</p><h2>Specifications</h2><dl className="spec-grid">{Object.entries(specs).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></section><section className="source-card"><h2>Image source</h2><p>{camera.image.creator} · {camera.image.license}</p><a href={camera.image.sourceUrl} target="_blank" rel="noreferrer">Open source record ↗</a></section><Link className="back-link" href="/cameras">← Back to cameras</Link></article>;
}
