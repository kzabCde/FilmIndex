import { cameras, films, techniques } from "@/lib/data";
import { messages, parseLocale } from "@/lib/i18n";

export default async function SourcesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const copy = messages[locale].sources;
  const images = [...films.flatMap((x) => x.image ? [x.image] : []), ...cameras.map((x) => x.image), ...techniques.flatMap((x) => x.image ? [x.image] : [])];
  return <section className="shell listing-page"><header><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.copy}</p></header><div className="prose-panel"><h2>{copy.dataPolicy}</h2><p>{copy.dataCopy}</p><h2>{copy.imageRecords}</h2><div className="source-list">{images.map((image) => <a key={image.sourceUrl} href={image.sourceUrl} target="_blank" rel="noreferrer"><strong>{image.alt}</strong><span>{image.sourceName} · {image.creator} · {image.license}</span></a>)}</div></div></section>;
}
