import Image from "next/image";
import Link from "next/link";
import type { Camera, Film } from "@/types";

export function EntityCard({ item, index }: { item: Film | Camera; index: number }) {
  const href = item.kind === "film" ? `/films/${item.slug}` : `/cameras/${item.slug}`;
  const meta = item.kind === "film"
    ? `ISO ${item.iso} · ${item.filmType}`
    : `${item.releaseYear} · ${item.cameraType}`;
  const image = item.image;

  return (
    <article className="entity-card">
      <Link href={href} aria-label={`Open ${item.name}`}>
        <div className="entity-image">
          {image ? <Image src={image.url} alt={image.alt} fill sizes="(max-width: 720px) 100vw, 33vw" /> : <div className="image-missing">Image pending source verification</div>}
          <span className="frame-number">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="entity-copy">
          <p className="eyebrow">{item.brand}</p>
          <h3>{item.name}</h3>
          <p>{meta}</p>
          <p className="micro">{item.kind === "film" ? item.formats.join(" · ") : `${item.filmFormat} · ${item.lensMount}`}</p>
        </div>
      </Link>
    </article>
  );
}
