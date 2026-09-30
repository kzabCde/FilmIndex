import Image from "next/image";
import Link from "next/link";
import type { Camera, Film } from "@/types";
import type { Locale } from "@/lib/i18n";
import { cameraTypeLabel } from "@/lib/camera-types";
import { filmTypeLabel, messages, withLocale } from "@/lib/i18n";

export function EntityCard({ item, index, locale = "en" }: { item: Film | Camera; index: number; locale?: Locale }) {
  const href = item.kind === "film" ? `/films/${item.slug}` : `/cameras/${item.slug}`;
  const meta = item.kind === "film"
    ? `ISO ${item.iso} · ${filmTypeLabel(item.filmType, locale)}`
    : `${item.releaseYear} · ${cameraTypeLabel(item.cameraType, locale)}`;
  const image = item.image;

  return (
    <article className="entity-card">
      <Link href={withLocale(href, locale)} aria-label={`${messages[locale].misc.open} ${item.name}`}>
        <div className="entity-image">
          {image ? <Image src={image.url} alt={image.alt} fill sizes="(max-width: 720px) 100vw, 33vw" /> : <div className="image-missing">{messages[locale].misc.imagePending}</div>}
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
