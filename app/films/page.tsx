import type { Metadata } from "next";
import { EntityCard } from "@/components/entity-card";
import { films } from "@/lib/data";
import { messages, parseLocale, withLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Films", description: "Browse photographic film stocks by brand, ISO, type, format, and process." };

export default async function FilmsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const copy = messages[locale].films;
  const brand = typeof params.brand === "string" ? params.brand.toLowerCase() : "";
  const iso = typeof params.iso === "string" ? Number(params.iso) : undefined;
  const visible = films.filter((film) => (!brand || film.brand.toLowerCase() === brand) && (!iso || film.iso === iso));

  return <section className="shell listing-page"><header><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.copy}</p></header><div className="filter-row"><a href={withLocale("/films", locale)}>{copy.all}</a><a href={withLocale("/films?brand=kodak", locale)}>Kodak</a><a href={withLocale("/films?brand=ilford", locale)}>Ilford</a><a href={withLocale("/films?iso=400", locale)}>ISO 400</a><a href={withLocale("/films?iso=800", locale)}>ISO 800</a></div><div className="card-grid">{visible.map((film, index) => <EntityCard key={film.slug} item={film} index={index} locale={locale} />)}</div>{!visible.length && <p className="empty-state">{copy.empty}</p>}</section>;
}
