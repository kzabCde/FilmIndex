import { cameras, films, techniques } from "@/lib/data";

export default function SourcesPage() {
  const images = [...films.flatMap((x) => x.image ? [x.image] : []), ...cameras.map((x) => x.image), ...techniques.flatMap((x) => x.image ? [x.image] : [])];
  return <section className="shell listing-page"><header><p className="eyebrow">Transparency</p><h1>Sources & attribution</h1><p>FilmIndex separates factual specifications from editorial descriptions and records provenance for external imagery.</p></header><div className="prose-panel"><h2>Data policy</h2><p>Manufacturer documentation, manuals, and datasheets should be preferred for technical facts. Editorial characteristics such as perceived grain, color rendering, or typical use are not manufacturer specifications and are labeled accordingly.</p><h2>Image records</h2><div className="source-list">{images.map((image) => <a key={image.sourceUrl} href={image.sourceUrl} target="_blank" rel="noreferrer"><strong>{image.alt}</strong><span>{image.sourceName} · {image.creator} · {image.license}</span></a>)}</div></div></section>;
}
