import Link from "next/link";
import { EntityCard } from "@/components/entity-card";
import { GlobalSearch } from "@/components/search";
import { cameras, films, techniques } from "@/lib/data";

export default function Home() {
  return (
    <>
      <section className="hero shell">
        <p className="eyebrow">Analog Photography Knowledge Database</p>
        <h1>Everything Analog.<br />One Index.</h1>
        <p className="hero-copy">Explore photographic films, classic cameras, shooting techniques, and technical specifications in one searchable archive.</p>
        <GlobalSearch />
        <div className="quick-links"><Link href="/films">Films</Link><Link href="/cameras">Cameras</Link><Link href="/techniques">Techniques</Link><Link href="/compare">Compare</Link></div>
      </section>

      <section className="shell section-block">
        <div className="section-heading"><div><p className="eyebrow">01 / Materials</p><h2>Popular films</h2></div><Link href="/films">View all →</Link></div>
        <div className="card-grid">{films.slice(0, 4).map((film, index) => <EntityCard key={film.slug} item={film} index={index} />)}</div>
      </section>

      <section className="shell section-block">
        <div className="section-heading"><div><p className="eyebrow">02 / Hardware</p><h2>Explore cameras</h2></div><Link href="/cameras">View all →</Link></div>
        <div className="card-grid">{cameras.slice(0, 4).map((camera, index) => <EntityCard key={camera.slug} item={camera} index={index} />)}</div>
      </section>

      <section className="shell section-block">
        <div className="section-heading"><div><p className="eyebrow">03 / Knowledge</p><h2>Learn film photography</h2></div><Link href="/techniques">View all →</Link></div>
        <div className="article-grid">{techniques.map((item) => <Link key={item.slug} href={`/techniques/${item.slug}`}><span>{item.category}</span><h3>{item.name}</h3><p>{item.summary}</p><small>{item.minutes} min · {item.difficulty}</small></Link>)}</div>
      </section>
    </>
  );
}
