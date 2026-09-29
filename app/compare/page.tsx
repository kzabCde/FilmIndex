import { Suspense } from "react";
import { CompareClient } from "@/components/compare-client";

export default function ComparePage() {
  return <section className="shell listing-page"><header><p className="eyebrow">Side by side</p><h1>Compare</h1><p>Compare 2–4 films or cameras. Factual data and editorial film characteristics remain visibly distinct.</p></header><Suspense fallback={<p>Loading comparison…</p>}><CompareClient /></Suspense></section>;
}
