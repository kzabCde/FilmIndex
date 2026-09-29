import Link from "next/link";
import { EntityCard } from "@/components/entity-card";
import { GlobalSearch } from "@/components/search";
import { cameras, films, techniques } from "@/lib/data";
import { difficultyLabel, messages, parseLocale, pick, techniqueCategoryLabel, withLocale } from "@/lib/i18n";

export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const copy = messages[locale];
  return (
    <>
      <section className="hero shell">
        <p className="eyebrow">{copy.home.eyebrow}</p>
        <h1>{copy.home.titleTop}<br />{copy.home.titleBottom}</h1>
        <p className="hero-copy">{copy.home.copy}</p>
        <GlobalSearch />
        <div className="quick-links"><Link href={withLocale("/films", locale)}>{copy.nav.films}</Link><Link href={withLocale("/cameras", locale)}>{copy.nav.cameras}</Link><Link href={withLocale("/techniques", locale)}>{copy.nav.techniques}</Link><Link href={withLocale("/compare", locale)}>{copy.nav.compare}</Link></div>
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
        <div className="article-grid">{techniques.map((item) => <Link key={item.slug} href={withLocale(`/techniques/${item.slug}`, locale)}><span>{techniqueCategoryLabel(item.category, locale)}</span><h3>{pick(locale, item.name, item.nameTh)}</h3><p>{pick(locale, item.summary, item.summaryTh)}</p><small>{item.minutes} {copy.misc.minutes} · {difficultyLabel(item.difficulty, locale)}</small></Link>)}</div>
      </section>
    </>
  );
}
