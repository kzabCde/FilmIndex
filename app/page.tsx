import Link from "next/link";
import { EntityCard } from "@/components/entity-card";
import { GlobalSearch } from "@/components/search";
import { cameras, films, techniques } from "@/lib/catalog";
import { difficultyLabel, messages, parseLocale, pick, techniqueCategoryLabel, withLocale } from "@/lib/i18n";

export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const copy = messages[locale];
  const isTh = locale === "th";
  return (
    <>
      <section className="hero shell">
        <p className="eyebrow">{copy.home.eyebrow}</p>
        <h1>{copy.home.titleTop}<br />{copy.home.titleBottom}</h1>
        <p className="hero-copy">{copy.home.copy}</p>
        <GlobalSearch />
        <div className="quick-links"><Link href={withLocale("/finder", locale)}>{isTh ? "ค้นหาฟิล์ม" : "Film Finder"}</Link><Link href={withLocale("/tools", locale)}>{isTh ? "เครื่องมือช่วยถ่าย" : "Shooting Tools"}</Link><Link href={withLocale("/films", locale)}>{copy.nav.films}</Link><Link href={withLocale("/cameras", locale)}>{copy.nav.cameras}</Link><Link href={withLocale("/compare", locale)}>{copy.nav.compare}</Link></div>
      </section>

      <section className="shell section-block">
        <div className="section-heading"><div><p className="eyebrow">{isTh ? "00 / Discovery" : "00 / Discovery"}</p><h2>{isTh ? "เลือกฟิล์มและออกไปถ่าย" : "Choose. Plan. Shoot."}</h2></div></div>
        <div className="article-grid large">
          <Link href={withLocale("/finder", locale)}><span>{isTh ? "แนะนำฟิล์ม" : "Guided discovery"}</span><h3>Film Finder</h3><p>{isTh ? "ตอบโจทย์สั้น ๆ เรื่องงานที่ถ่าย แสง ประเภทฟิล์ม และเกรน แล้วดูคำแนะนำพร้อมเหตุผล" : "Rank the local catalog by subject, light, film family, and grain preference with explainable matches."}</p><small>{isTh ? "เปิดเครื่องมือ →" : "Open finder →"}</small></Link>
          <Link href={withLocale("/tools", locale)}><span>{isTh ? "ช่วยตั้งค่าแสง" : "Shooting utilities"}</span><h3>{isTh ? "เครื่องมือช่วยถ่าย" : "Shooting Tools"}</h3><p>{isTh ? "Sunny 16, Effective ISO สำหรับ Push/Pull และ reference ที่คำนวณใน browser" : "Sunny 16, effective ISO planning for push/pull, and practical references calculated in the browser."}</p><small>{isTh ? "เปิดเครื่องมือ →" : "Open tools →"}</small></Link>
          <Link href={withLocale("/favorites", locale)}><span>{isTh ? "เก็บไว้ในเครื่อง" : "Local collection"}</span><h3>My Film Shelf</h3><p>{isTh ? "บันทึกฟิล์มที่สนใจไว้ใน browser เครื่องนี้โดยไม่ต้องสมัครสมาชิก" : "Save film stocks you want to revisit in this browser without creating an account."}</p><small>{isTh ? "เปิดชั้นฟิล์ม →" : "Open shelf →"}</small></Link>
        </div>
      </section>

      <section className="shell section-block">
        <div className="section-heading"><div><p className="eyebrow">{copy.home.materials}</p><h2>{copy.home.popularFilms}</h2></div><Link href={withLocale("/films", locale)}>{copy.home.viewAll}</Link></div>
        <div className="card-grid">{films.slice(0, 4).map((film, index) => <EntityCard key={film.slug} item={film} index={index} locale={locale} />)}</div>
      </section>

      <section className="shell section-block">
        <div className="section-heading"><div><p className="eyebrow">{copy.home.hardware}</p><h2>{copy.home.exploreCameras}</h2></div><Link href={withLocale("/cameras", locale)}>{copy.home.viewAll}</Link></div>
        <div className="card-grid">{cameras.slice(0, 4).map((camera, index) => <EntityCard key={camera.slug} item={camera} index={index} locale={locale} />)}</div>
      </section>

      <section className="shell section-block">
        <div className="section-heading"><div><p className="eyebrow">{copy.home.knowledge}</p><h2>{copy.home.learn}</h2></div><Link href={withLocale("/techniques", locale)}>{copy.home.viewAll}</Link></div>
        <div className="article-grid">{techniques.slice(0, 8).map((item) => <Link key={item.slug} href={withLocale(`/techniques/${item.slug}`, locale)}><span>{techniqueCategoryLabel(item.category, locale)}</span><h3>{pick(locale, item.name, item.nameTh)}</h3><p>{pick(locale, item.summary, item.summaryTh)}</p><small>{item.minutes} {copy.misc.minutes} · {difficultyLabel(item.difficulty, locale)}</small></Link>)}</div>
      </section>
    </>
  );
}
