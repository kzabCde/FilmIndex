import type { Metadata } from "next";
import Link from "next/link";
import { techniques } from "@/lib/data";

export const metadata: Metadata = { title: "Techniques", description: "Learn analog photography techniques, exposure, processing, and film handling." };

export default function TechniquesPage() {
  return <section className="shell listing-page"><header><p className="eyebrow">Knowledge Base</p><h1>Techniques</h1><p>Clear explanations for exposure, film handling, processing, and creative analog workflows.</p></header><div className="article-grid large">{techniques.map((item) => <Link key={item.slug} href={`/techniques/${item.slug}`}><span>{item.category}</span><h2>{item.name}</h2><p>{item.summary}</p><small>{item.minutes} min · {item.difficulty}</small></Link>)}</div></section>;
}
