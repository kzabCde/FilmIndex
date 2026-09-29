"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ImageCredit } from "@/types";
import type { Locale } from "@/lib/i18n";
import styles from "@/app/films/[slug]/film-samples.module.css";

export function FilmSampleGallery({ images, locale }: { images: ImageCredit[]; locale: Locale }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((value) => value === null ? null : (value + 1) % images.length);
      if (event.key === "ArrowLeft") setActive((value) => value === null ? null : (value - 1 + images.length) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, images.length]);

  const activeImage = active === null ? null : images[active];
  const openLabel = locale === "th" ? "เปิดภาพขนาดใหญ่" : "Open large image";
  const sourceLabel = locale === "th" ? "เปิดแหล่งที่มาของภาพ ↗" : "Open photograph source ↗";

  return (
    <>
      <div className={styles.grid}>
        {images.map((image, index) => (
          <figure className={styles.card} key={image.sourceUrl}>
            <button className="sample-open-button" type="button" onClick={() => setActive(index)} aria-label={`${openLabel}: ${image.alt}`}>
              <div className={styles.image}><Image src={image.url} alt={image.alt} fill sizes="(max-width: 720px) 100vw, 50vw" /></div>
            </button>
            <figcaption className={styles.caption}>
              <strong>{image.alt}</strong>
              <span>{image.creator} · {image.license}</span>
              <a href={image.sourceUrl} target="_blank" rel="noreferrer">{sourceLabel}</a>
            </figcaption>
          </figure>
        ))}
      </div>

      {activeImage && (
        <div className="sample-lightbox" role="dialog" aria-modal="true" aria-label={activeImage.alt} onMouseDown={(event) => { if (event.currentTarget === event.target) setActive(null); }}>
          <button className="sample-lightbox-close" type="button" onClick={() => setActive(null)} aria-label={locale === "th" ? "ปิดภาพ" : "Close image"}>×</button>
          {images.length > 1 && <button className="sample-lightbox-nav prev" type="button" onClick={() => setActive((active! - 1 + images.length) % images.length)} aria-label={locale === "th" ? "ภาพก่อนหน้า" : "Previous image"}>←</button>}
          <div className="sample-lightbox-card">
            <div className="sample-lightbox-image"><Image src={activeImage.url} alt={activeImage.alt} fill sizes="92vw" priority /></div>
            <div className="sample-lightbox-meta"><strong>{activeImage.alt}</strong><span>{activeImage.creator} · {activeImage.license}</span><a href={activeImage.sourceUrl} target="_blank" rel="noreferrer">{sourceLabel}</a></div>
          </div>
          {images.length > 1 && <button className="sample-lightbox-nav next" type="button" onClick={() => setActive((active! + 1) % images.length)} aria-label={locale === "th" ? "ภาพถัดไป" : "Next image"}>→</button>}
        </div>
      )}
    </>
  );
}
