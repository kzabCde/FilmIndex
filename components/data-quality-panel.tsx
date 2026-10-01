import type { RecordProvenance } from "@/types";

type Props = {
  provenance: RecordProvenance;
  locale: "th" | "en";
};

const confidenceLabel = (value: RecordProvenance["confidence"], isTh: boolean) => {
  if (value === "verified") return isTh ? "ตรวจสอบแล้ว" : "Verified";
  if (value === "community-reference") return isTh ? "อ้างอิงระดับแคตตาล็อก/ชุมชน" : "Catalog / community reference";
  return isTh ? "ข้อมูลยังไม่สมบูรณ์" : "Incomplete";
};

const statusLabel = (value: RecordProvenance["productStatus"], isTh: boolean) => {
  const labels = isTh
    ? { current: "ยังอยู่ในสายผลิต/จำหน่าย", discontinued: "ยุติการผลิต", historical: "รายการเชิงประวัติศาสตร์", unknown: "ยังไม่ยืนยันสถานะปัจจุบัน" }
    : { current: "Current", discontinued: "Discontinued", historical: "Historical record", unknown: "Current status not confirmed" };
  return labels[value];
};

export function DataQualityPanel({ provenance, locale }: Props) {
  const isTh = locale === "th";
  return <section className="data-quality-panel" aria-labelledby="data-quality-title">
    <div className="data-quality-heading">
      <div>
        <p className="eyebrow">Data Quality</p>
        <h2 id="data-quality-title">{isTh ? "ความน่าเชื่อถือของข้อมูล" : "Record provenance"}</h2>
      </div>
      <span className={`quality-badge quality-${provenance.confidence}`}>{confidenceLabel(provenance.confidence, isTh)}</span>
    </div>

    <dl className="data-quality-facts">
      <div><dt>{isTh ? "ตรวจสอบล่าสุด" : "Last verified"}</dt><dd>{provenance.lastVerified}</dd></div>
      <div><dt>{isTh ? "สถานะผลิตภัณฑ์" : "Product status"}</dt><dd>{statusLabel(provenance.productStatus, isTh)}</dd></div>
      {provenance.introducedYear ? <div><dt>{isTh ? "เริ่มเปิดตัว" : "Introduced"}</dt><dd>{provenance.introducedYear}</dd></div> : null}
      {provenance.productionYears?.from ? <div><dt>{isTh ? "ช่วงการผลิต" : "Production"}</dt><dd>{provenance.productionYears.from}–{provenance.productionYears.to ?? (isTh ? "ปัจจุบัน/ไม่ยืนยัน" : "current / unconfirmed")}</dd></div> : null}
      {provenance.countryOfManufacture ? <div><dt>{isTh ? "ประเทศผลิต" : "Manufacture"}</dt><dd>{provenance.countryOfManufacture}</dd></div> : null}
      {provenance.generation ? <div><dt>{isTh ? "เจเนอเรชัน/ตระกูล" : "Generation / family"}</dt><dd>{provenance.generation}</dd></div> : null}
    </dl>

    {provenance.variants?.length ? <div className="data-quality-block"><strong>{isTh ? "ชื่อ/รุ่นที่เกี่ยวข้อง" : "Related names / variants"}</strong><div className="tag-row">{provenance.variants.map((variant) => <span key={variant}>{variant}</span>)}</div></div> : null}
    {provenance.notes?.length ? <div className="data-quality-block"><strong>{isTh ? "หมายเหตุการตรวจสอบ" : "Verification notes"}</strong>{provenance.notes.map((note) => <p className="notice" key={note}>{note}</p>)}</div> : null}

    <div className="data-quality-block">
      <strong>{isTh ? "แหล่งอ้างอิงของ record นี้" : "Record sources"}</strong>
      <div className="record-source-list">
        {provenance.sources.map((item) => <a key={`${item.scope}-${item.url}`} href={item.url} target="_blank" rel="noreferrer">
          <span>{item.label}</span>
          <small>{item.publisher} · {item.scope}</small>
        </a>)}
      </div>
    </div>
  </section>;
}
