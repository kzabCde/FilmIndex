import type { Metadata } from "next";
import { EntityCard } from "@/components/entity-card";
import { cameras } from "@/lib/data";

export const metadata: Metadata = { title: "Cameras", description: "Browse classic film cameras and technical specifications." };

export default async function CamerasPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const brand = typeof params.brand === "string" ? params.brand.toLowerCase() : "";
  const type = typeof params.type === "string" ? params.type.toLowerCase() : "";
  const visible = cameras.filter((camera) => (!brand || camera.brand.toLowerCase() === brand) && (!type || camera.cameraType.toLowerCase() === type));
  return <section className="shell listing-page"><header><p className="eyebrow">Camera Database</p><h1>Cameras</h1><p>Technical references for classic analog cameras with authentic, attributed photography.</p></header><div className="filter-row"><a href="/cameras">All</a><a href="/cameras?brand=canon">Canon</a><a href="/cameras?brand=nikon">Nikon</a><a href="/cameras?type=slr">SLR</a><a href="/cameras?type=rangefinder">Rangefinder</a></div><div className="card-grid">{visible.map((camera, index) => <EntityCard key={camera.slug} item={camera} index={index} />)}</div></section>;
}
