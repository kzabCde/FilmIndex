import Link from "next/link";
import { EntityCard } from "@/components/entity-card";
import { films } from "@/lib/catalog";
import { scoreFilms, type FilmFamilyPreference, type GrainPreference, type LightPreference } from "@/lib/discovery";
import { parseLocale, withLocale } from "@/lib/i18n";

const valueOf = (value: string | string[] | undefined) => typeof value === "string" ? value : "";

export default async function FilmFinderPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const locale = parseLocale(params.lang);
  const isTh = locale === "th";
  const use = valueOf(params.use);
  const light = (valueOf(params.light) || "any") as LightPreference;
  const family = (valueOf(params.family) || "any") as FilmFamilyPreference;
  const grain = (valueOf(params.grain) || "any") as GrainPreference;
  const hasPreferences = Boolean(use || light !== "any" || family !== "any" || grain !== "any");
  const matches = scoreFilms(films, { use, light, family, grain }).slice(0, 6);
  const uses = [...new Set(films.flatMap((film) => film.uses))].sort();

  const reasonLabel = (reason: string) => {
    const labels = isTh
      ? { use: "เหมาะกับงานที่เลือก", light: "เหมาะกับสภาพแสง", grain: "เกรนตรงความต้องการ", family: "ประเภทฟิล์มตรงกัน" }
      : { use: "Matches your subject", light: "Fits the light", grain: "Matches grain preference", family: "Matches film family" };
    return labels[reason as keyof typeof labels] ?? reason;
  };

  return (
    <section className="shell listing-page discovery-page">
      <header>
        <p className="eyebrow">{isTh ? "ค้นหาฟิล์มที่เหมาะกับคุณ" : "Guided discovery"}</p>
        <h1>{isTh ? "Film Finder" : "Film Finder"}</h1>
        <p>{isTh ? "เลือกสิ่งที่ต้องการถ่าย สภาพแสง ประเภทฟิล์ม และลักษณะเกรน แล้ว FilmIndex จะจัดอันดับฟิล์มจาก catalog ในเว็บพร้อมบอกเหตุผล" : "Choose what you shoot, the available light, film family, and grain preference. FilmIndex ranks the bundled catalog and explains each match."}</p>
      </header>

      <form method="get" action="/finder" className="discovery-form">
        <input type="hidden" name="lang" value={locale} />
        <label><span>{isTh ? "งานที่ถ่าย" : "Subject / use"}</span><select name="use" defaultValue={use}><option value="">{isTh ? "อะไรก็ได้" : "Any"}</option>{uses.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label><span>{isTh ? "สภาพแสง" : "Light"}</span><select name="light" defaultValue={light}><option value="any">{isTh ? "อะไรก็ได้" : "Any"}</option><option value="bright">{isTh ? "กลางวัน / แสงมาก" : "Bright daylight"}</option><option value="mixed">{isTh ? "แสงผสม / ใช้ทั่วไป" : "Mixed / general"}</option><option value="low">{isTh ? "แสงน้อย / กลางคืน" : "Low light / night"}</option></select></label>
        <label><span>{isTh ? "ประเภทฟิล์ม" : "Film family"}</span><select name="family" defaultValue={family}><option value="any">{isTh ? "อะไรก็ได้" : "Any"}</option><option value="color">{isTh ? "เนกาทีฟสี" : "Color negative"}</option><option value="bw">{isTh ? "ขาวดำ" : "Black & white"}</option><option value="slide">{isTh ? "สไลด์" : "Slide / reversal"}</option></select></label>
        <label><span>{isTh ? "ลักษณะเกรน" : "Grain"}</span><select name="grain" defaultValue={grain}><option value="any">{isTh ? "อะไรก็ได้" : "Any"}</option><option value="fine">{isTh ? "ละเอียด" : "Fine"}</option><option value="balanced">{isTh ? "สมดุล" : "Balanced"}</option><option value="visible">{isTh ? "เห็นเกรนชัด" : "Visible grain"}</option></select></label>
        <div className="discovery-actions"><button type="submit">{isTh ? "ค้นหาฟิล์ม" : "Find films"}</button><Link href={withLocale("/finder", locale)}>{isTh ? "ล้างตัวเลือก" : "Reset"}</Link></div>
      </form>

      {hasPreferences ? (
        <section className="finder-results">
          <div className="section-heading"><div><p className="eyebrow">{isTh ? "เรียงตามความเข้ากัน" : "Ranked locally"}</p><h2>{isTh ? "ฟิล์มที่น่าสนใจ" : "Best matches"}</h2></div><span className="micro">{matches.length} {isTh ? "รายการ" : "results"}</span></div>
          <div className="finder-grid">
            {matches.map((match, index) => <div className="finder-match" key={match.film.slug}><EntityCard item={match.film} index={index} locale={locale} /><div className="match-reasons"><strong>{isTh ? `คะแนน ${match.score}` : `Match ${match.score}`}</strong>{match.reasons.map((reason) => <span key={reason}>{reasonLabel(reason)}</span>)}</div></div>)}
          </div>
          <p className="notice">{isTh ? "คำแนะนำนี้เป็นการจัดอันดับจากข้อมูลใน FilmIndex ไม่ใช่กฎตายตัว ผลลัพธ์จริงขึ้นกับแสง การเปิดรับแสง การล้าง และการสแกน" : "Recommendations are a ranking derived from FilmIndex data, not a guarantee. Light, exposure, development, and scanning still shape the final result."}</p>
        </section>
      ) : <p className="empty-state">{isTh ? "เลือกอย่างน้อยหนึ่งเงื่อนไขเพื่อเริ่มค้นหา" : "Choose at least one preference to start."}</p>}
    </section>
  );
}
