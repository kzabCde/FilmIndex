import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolDetail } from "@/components/tool-detail";
import { getToolBySlug, TOOL_CATALOG } from "@/lib/tool-catalog";
import { parseLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return TOOL_CATALOG.map((tool) => ({ tool: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tools" };
  return {
    title: tool.title,
    description: tool.description,
  };
}

export default async function ToolPage({
  params,
  searchParams,
}: {
  params: Promise<{ tool: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { tool: slug } = await params;
  const query = await searchParams;
  const locale = parseLocale(query.lang);
  const isTh = locale === "th";
  const tool = getToolBySlug(slug);
  if (!tool) notFound();
  const langQuery = `?lang=${locale}`;

  return (
    <section className="shell listing-page tool-detail-page">
      <nav className="tool-breadcrumb" aria-label="Breadcrumb">
        <Link href={`/tools${langQuery}`}>{isTh ? "Tools ทั้งหมด" : "All tools"}</Link>
        <span>/</span>
        <span>{isTh ? tool.titleTh : tool.title}</span>
      </nav>
      <header className="tool-detail-header">
        <p className="eyebrow">{tool.code} · {tool.category === "lab" ? "Film Lab Tools" : tool.category === "planning" ? "Planning & Workflow" : "Exposure & Shooting"}</p>
        <h1>{isTh ? tool.titleTh : tool.title}</h1>
        <p>{isTh ? tool.descriptionTh : tool.description}</p>
      </header>
      <ToolDetail slug={tool.slug} locale={locale} />
      <footer className="tool-detail-footer">
        <Link href={`/tools${langQuery}`}>← {isTh ? "กลับไป Tool Hub" : "Back to Tool Hub"}</Link>
      </footer>
    </section>
  );
}
