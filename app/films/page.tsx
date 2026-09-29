import type { Metadata } from "next";
import { EntityCard } from "@/components/entity-card";
import { films } from "@/lib/data";

export const metadata: Metadata = { title: "Films", description: "Browse photographic film stocks by brand, ISO, type, format, and process." };

export default async function FilmsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const brand = typeof params.brand === "string" ? params.brand.toLowerCase() : "";
  const iso = typeof params.iso === "string" ? Number(params.iso) : undefined;
  const visible = films.filter((film) => (!brand || film.brand.toLowerCase() === brand) && (!iso || film.iso === iso));

  return <section className="shell listing-page"><header><p className="eyebrow">Film Database</p><h1>Films</h1><p>Factual specifications and clearly labeled editorial characteristics, with source-aware imagery.</p></header><div className="filter-row"><a href="/films">All</a><a href="/films?brand=kodak">Kodak</a><a href="/films?brand=ilford">Ilford</a><a href="/films?iso=400">ISO 400</a><a href="/films?iso=800">ISO 800</a></div><div className="card-grid">{visible.map((film, index) => <EntityCard key={film.slug} item={film} index={index} />)}</div>{!visible.length && <p className="empty-state">No films match these filters.</p>}</section>;
}
