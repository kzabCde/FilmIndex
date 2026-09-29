import { FavoritesShelf } from "@/components/favorites-shelf";
import { parseLocale } from "@/lib/i18n";

export default async function FavoritesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const isTh = locale === "th";

  return (
    <section className="shell listing-page">
      <header>
        <p className="eyebrow">{isTh ? "เก็บไว้ในเครื่องนี้" : "Saved on this device"}</p>
        <h1>{isTh ? "My Film Shelf" : "My Film Shelf"}</h1>
        <p>{isTh ? "ฟิล์มที่คุณกดบันทึกจะอยู่ใน localStorage ของ browser เครื่องนี้เท่านั้น ไม่มี account และไม่มีการอัปโหลดขึ้นฐานข้อมูล" : "Films you save live only in this browser's localStorage. There is no account and nothing is uploaded to a database."}</p>
      </header>
      <FavoritesShelf locale={locale} />
    </section>
  );
}
