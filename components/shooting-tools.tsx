"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";

const standardShutters = [8000, 4000, 2000, 1000, 500, 250, 125, 60, 30, 15, 8, 4, 2, 1];
const apertures = [2, 2.8, 4, 5.6, 8, 11, 16, 22];

function nearestShutter(seconds: number) {
  if (seconds >= 1) return `${Math.max(1, Math.round(seconds))}s`;
  const denominator = 1 / seconds;
  const nearest = standardShutters.reduce((best, candidate) => Math.abs(candidate - denominator) < Math.abs(best - denominator) ? candidate : best, standardShutters[0]);
  return `1/${nearest}s`;
}

export function ShootingTools({ locale }: { locale: Locale }) {
  const isTh = locale === "th";
  const [iso, setIso] = useState(400);
  const [aperture, setAperture] = useState(16);
  const [condition, setCondition] = useState(0);
  const [pushIso, setPushIso] = useState(400);
  const [pushStops, setPushStops] = useState(1);

  const sunny16 = useMemo(() => {
    const baseSeconds = 1 / Math.max(1, iso);
    const apertureFactor = Math.pow(aperture / 16, 2);
    const conditionFactor = Math.pow(2, condition);
    const seconds = baseSeconds * apertureFactor * conditionFactor;
    return nearestShutter(seconds);
  }, [iso, aperture, condition]);

  const effectiveIso = Math.round(pushIso * Math.pow(2, pushStops));

  return (
    <div className="tools-grid">
      <section className="tool-card">
        <p className="eyebrow">Sunny 16</p>
        <h2>{isTh ? "คำนวณค่าแสงกลางวัน" : "Daylight exposure helper"}</h2>
        <p>{isTh ? "ใช้กฎ Sunny 16 เป็นจุดเริ่มต้น แล้วชดเชยตามรูรับแสงและสภาพท้องฟ้า" : "Use Sunny 16 as a starting point, then compensate for aperture and sky condition."}</p>
        <div className="tool-controls">
          <label><span>ISO</span><input type="number" min="25" max="12800" step="25" value={iso} onChange={(event) => setIso(Number(event.target.value) || 100)} /></label>
          <label><span>{isTh ? "รูรับแสง" : "Aperture"}</span><select value={aperture} onChange={(event) => setAperture(Number(event.target.value))}>{apertures.map((value) => <option key={value} value={value}>f/{value}</option>)}</select></label>
          <label><span>{isTh ? "สภาพแสง" : "Light"}</span><select value={condition} onChange={(event) => setCondition(Number(event.target.value))}><option value={0}>{isTh ? "แดดจัด" : "Bright sun"}</option><option value={1}>{isTh ? "แดดอ่อน / มีเมฆบาง" : "Hazy sun"}</option><option value={2}>{isTh ? "ครึ้ม" : "Overcast"}</option><option value={3}>{isTh ? "ร่มเงา / ครึ้มมาก" : "Open shade"}</option></select></label>
        </div>
        <div className="tool-result"><span>{isTh ? "ค่าตั้งต้นโดยประมาณ" : "Approximate starting point"}</span><strong>f/{aperture} · {sunny16}</strong></div>
        <p className="micro">{isTh ? "เป็นค่าประมาณสำหรับเริ่มต้นเท่านั้น ควรใช้มิเตอร์เมื่อความแม่นยำสำคัญ" : "This is an estimate for a starting exposure. Use a meter when precision matters."}</p>
      </section>

      <section className="tool-card">
        <p className="eyebrow">Push / Pull</p>
        <h2>{isTh ? "วางแผน Effective ISO" : "Effective ISO planner"}</h2>
        <p>{isTh ? "คำนวณ EI เมื่อตั้งใจ Push หรือ Pull ก่อนถ่าย โดยไม่เดาเวลาล้าง" : "Calculate the EI you intend to meter for when pushing or pulling, without inventing development times."}</p>
        <div className="tool-controls">
          <label><span>{isTh ? "ISO บนกล่อง" : "Box ISO"}</span><input type="number" min="25" max="12800" step="25" value={pushIso} onChange={(event) => setPushIso(Number(event.target.value) || 100)} /></label>
          <label><span>{isTh ? "จำนวนสต็อป" : "Stops"}</span><select value={pushStops} onChange={(event) => setPushStops(Number(event.target.value))}><option value={-2}>Pull −2</option><option value={-1}>Pull −1</option><option value={0}>{isTh ? "ปกติ" : "Normal"}</option><option value={1}>Push +1</option><option value={2}>Push +2</option><option value={3}>Push +3</option></select></label>
        </div>
        <div className="tool-result"><span>{isTh ? "ตั้งมิเตอร์ที่" : "Meter at"}</span><strong>EI {effectiveIso}</strong></div>
        <p className="micro">{isTh ? "การ Push/Pull ต้องปรับการล้างตามฟิล์ม น้ำยา และกระบวนการจริง ให้ยึด datasheet หรือคำแนะนำของแล็บ" : "Push/pull development depends on the film, developer, chemistry, and lab process. Follow the relevant datasheet or lab guidance."}</p>
      </section>

      <section className="tool-card compact-tool">
        <p className="eyebrow">Quick reference</p>
        <h2>{isTh ? "กฎส่วนกลับ" : "Reciprocal rule"}</h2>
        <p>{isTh ? "สำหรับการถือกล้องด้วยมือ จุดเริ่มต้นทั่วไปคือใช้ความเร็วชัตเตอร์ไม่น้อยกว่าส่วนกลับของทางยาวโฟกัส เช่น 50 มม. → ประมาณ 1/60s หรือเร็วกว่า" : "For handheld shooting, a common starting point is a shutter speed no slower than roughly the reciprocal of focal length; for example, 50mm → about 1/60s or faster."}</p>
        <p className="micro">{isTh ? "เป็นแนวทางทั่วไป การสั่นของผู้ถ่าย น้ำหนักกล้อง และระบบกันสั่นทำให้ผลต่างกันได้" : "This is only a general guideline; technique, camera mass, and stabilization can change the result."}</p>
      </section>
    </div>
  );
}
