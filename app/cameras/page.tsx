import type { Metadata } from "next";
import { EntityCard } from "@/components/entity-card";
import { cameras } from "@/lib/data";
import { messages, parseLocale, withLocale } from "@/lib/i18n";

export const metadata: Metadata = { title: "Cameras", description: "Browse classic film cameras and technical specifications." };

export default async function CamerasPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const copy = messages[locale].cameras;
  const brand = typeof params.brand === "string" ? params.brand.toLowerCase() : "";
  const type = typeof params.type === "string" ? params.type.toLowerCase() : "";
  const visible = cameras.filter((camera) => (!brand || camera.brand.toLowerCase() === brand) && (!type || camera.cameraType.toLowerCase() === type));
  return <section className="shell listing-page"><header><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.copy}</p></header><div className="filter-row"><a href={withLocale("/cameras", locale)}>{copy.all}</a><a href={withLocale("/cameras?brand=canon", locale)}>Canon</a><a href={withLocale("/cameras?brand=nikon", locale)}>Nikon</a><a href={withLocale("/cameras?type=slr", locale)}>SLR</a><a href={withLocale("/cameras?type=rangefinder", locale)}>Rangefinder</a></div><div className="card-grid">{visible.map((camera, index) => <EntityCard key={camera.slug} item={camera} index={index} locale={locale} />)}</div></section>;
}
