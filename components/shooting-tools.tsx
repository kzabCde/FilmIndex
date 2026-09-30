"use client";

import { useMemo, useState } from "react";
import { RollLogbook } from "@/components/roll-logbook";
import type { Locale } from "@/lib/i18n";
import {
  APERTURE_STOPS,
  FILM_FORMATS,
  SCAN_FORMATS,
  SHUTTER_OPTIONS,
  calculateDepthOfField,
  calculateEquivalentExposures,
  calculateEv100,
  calculateFilmCost,
  calculateReciprocityCorrection,
  calculateScanResolution,
  formatShutter,
  type FilmFormatKey,
  type ScanFormatKey,
} from "@/lib/photography-tools";

const standardShutters = [8000, 4000, 2000, 1000, 500, 250, 125, 60, 30, 15, 8, 4, 2, 1];
const sunnyApertures = [2, 2.8, 4, 5.6, 8, 11, 16, 22];

function nearestShutter(seconds: number) {
  if (seconds >= 1) return `${Math.max(1, Math.round(seconds))}s`;
  const denominator = 1 / seconds;
  const nearest = standardShutters.reduce((best, candidate) => Math.abs(candidate - denominator) < Math.abs(best - denominator) ? candidate : best, standardShutters[0]);
  return `1/${nearest}s`;
}

function formatDistance(value: number, isTh: boolean) {
  if (!Number.isFinite(value)) return isTh ? "∞ (ถึงอนันต์)" : "∞ (infinity)";
  if (value >= 100) return `${Math.round(value)} m`;
  if (value >= 10) return `${value.toFixed(1)} m`;
  return `${value.toFixed(2)} m`;
}

function formatMoney(value: number, currency: string) {
  return `${currency}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

export function ShootingTools({ locale }: { locale: Locale }) {
  const isTh = locale === "th";

  const [iso, setIso] = useState(400);
  const [sunnyAperture, setSunnyAperture] = useState(16);
  const [condition, setCondition] = useState(0);
  const [pushIso, setPushIso] = useState(400);
  const [pushStops, setPushStops] = useState(1);

  const [exposureIso, setExposureIso] = useState(400);
  const [exposureAperture, setExposureAperture] = useState(8);
  const [exposureShutter, setExposureShutter] = useState(1 / 125);

  const [reciprocityTime, setReciprocityTime] = useState(8);
  const [reciprocityExponent, setReciprocityExponent] = useState(1.2);

  const [dofFormat, setDofFormat] = useState<FilmFormatKey>("35mm");
  const [focalLength, setFocalLength] = useState(50);
  const [dofAperture, setDofAperture] = useState(5.6);
  const [subjectDistance, setSubjectDistance] = useState(3);

  const [filmPrice, setFilmPrice] = useState(400);
  const [developCost, setDevelopCost] = useState(120);
  const [scanCost, setScanCost] = useState(100);
  const [otherCost, setOtherCost] = useState(0);
  const [frames, setFrames] = useState(36);
  const [currency, setCurrency] = useState("฿");

  const [scanFormat, setScanFormat] = useState<ScanFormatKey>("35mm");
  const [scanDpi, setScanDpi] = useState(2400);

  const sunny16 = useMemo(() => {
    const baseSeconds = 1 / Math.max(1, iso);
    const apertureFactor = Math.pow(sunnyAperture / 16, 2);
    const conditionFactor = Math.pow(2, condition);
    const seconds = baseSeconds * apertureFactor * conditionFactor;
    return nearestShutter(seconds);
  }, [iso, sunnyAperture, condition]);

  const effectiveIso = Math.round(pushIso * Math.pow(2, pushStops));

  const exposureInput = useMemo(() => ({ iso: exposureIso, aperture: exposureAperture, shutterSeconds: exposureShutter }), [exposureIso, exposureAperture, exposureShutter]);
  const ev100 = useMemo(() => calculateEv100(exposureInput), [exposureInput]);
  const equivalentExposures = useMemo(() => calculateEquivalentExposures(exposureInput), [exposureInput]);
  const reciprocity = useMemo(() => calculateReciprocityCorrection(reciprocityTime, reciprocityExponent), [reciprocityTime, reciprocityExponent]);
  const dof = useMemo(() => calculateDepthOfField({ focalLengthMm: focalLength, aperture: dofAperture, subjectDistanceM: subjectDistance, format: dofFormat }), [focalLength, dofAperture, subjectDistance, dofFormat]);
  const cost = useMemo(() => calculateFilmCost({ filmPrice, developCost, scanCost, otherCost, frames }), [filmPrice, developCost, scanCost, otherCost, frames]);
  const scan = useMemo(() => calculateScanResolution(scanFormat, scanDpi), [scanFormat, scanDpi]);

  return (
    <div className="tools-stack">
      <div className="tool-section-heading">
        <p className="eyebrow">Exposure & field</p>
        <h2>{isTh ? "ตั้งค่าแสงและระยะชัด" : "Exposure and focus"}</h2>
      </div>

      <div className="tools-grid">
        <section className="tool-card">
          <p className="eyebrow">Exposure Calculator</p>
          <h2>{isTh ? "คำนวณ EV และค่าแสงเทียบเท่า" : "EV & equivalent exposures"}</h2>
          <p>{isTh ? "ใส่ ISO รูรับแสง และความเร็วชัตเตอร์ของค่าปัจจุบัน แล้วดู EV100 พร้อมชุดค่าที่ให้ปริมาณแสงเท่ากัน" : "Enter the current ISO, aperture, and shutter speed to calculate EV100 and equivalent exposure combinations."}</p>
          <div className="tool-controls three">
            <label><span>ISO</span><input type="number" min="1" max="25600" value={exposureIso} onChange={(event) => setExposureIso(Number(event.target.value) || 1)} /></label>
            <label><span>{isTh ? "รูรับแสง" : "Aperture"}</span><select value={exposureAperture} onChange={(event) => setExposureAperture(Number(event.target.value))}>{APERTURE_STOPS.map((value) => <option key={value} value={value}>f/{value}</option>)}</select></label>
            <label><span>{isTh ? "ชัตเตอร์" : "Shutter"}</span><select value={exposureShutter} onChange={(event) => setExposureShutter(Number(event.target.value))}>{SHUTTER_OPTIONS.map((option) => <option key={option.label} value={option.seconds}>{option.label}</option>)}</select></label>
          </div>
          <div className="tool-result"><span>EV100</span><strong>{ev100.toFixed(1)}</strong></div>
          <div className="tool-equivalent-grid">
            {equivalentExposures.map((item) => <div key={item.aperture}><span>f/{item.aperture}</span><strong>{formatShutter(item.shutterSeconds)}</strong></div>)}
          </div>
          <p className="micro">{isTh ? "ชุดค่าด้านบนคง exposure เดิมที่ ISO เดิมไว้ การเคลื่อนไหวและระยะชัดจะเปลี่ยนตามค่าที่เลือก" : "These combinations preserve the same exposure at the same ISO; motion rendering and depth of field still change."}</p>
        </section>

        <section className="tool-card">
          <p className="eyebrow">Reciprocity Calculator</p>
          <h2>{isTh ? "ประมาณการชดเชย Long Exposure" : "Long-exposure reciprocity estimate"}</h2>
          <p>{isTh ? "คำนวณเวลาชัตเตอร์ที่ยาวขึ้นด้วยโมเดล exponent แบบทั่วไป เหมาะสำหรับวางแผนคร่าว ๆ เมื่อยังไม่มีตารางของผู้ผลิต" : "Estimate a longer shutter time with a generic exponent model when a manufacturer-specific reciprocity table is not available."}</p>
          <div className="tool-controls two">
            <label><span>{isTh ? "เวลาที่มิเตอร์วัดได้ (วินาที)" : "Metered time (seconds)"}</span><input type="number" min="0.001" max="86400" step="0.1" value={reciprocityTime} onChange={(event) => setReciprocityTime(Number(event.target.value) || 0.001)} /></label>
            <label><span>{isTh ? "โมเดลชดเชย" : "Correction model"}</span><select value={reciprocityExponent} onChange={(event) => setReciprocityExponent(Number(event.target.value))}><option value={1}>1.0 · {isTh ? "ไม่ชดเชย" : "No correction"}</option><option value={1.1}>1.1 · {isTh ? "อ่อน" : "Mild generic"}</option><option value={1.2}>1.2 · {isTh ? "ปานกลาง" : "Moderate generic"}</option><option value={1.3}>1.3 · {isTh ? "มาก" : "Strong generic"}</option></select></label>
          </div>
          <div className="tool-result"><span>{isTh ? "เวลาหลังชดเชย" : "Corrected time"}</span><strong>{formatShutter(reciprocity.correctedSeconds)}</strong></div>
          <div className="tool-stat-row"><span>{isTh ? "เพิ่มแสงประมาณ" : "Added exposure"}</span><strong>+{reciprocity.compensationStops.toFixed(2)} stops</strong></div>
          <p className="micro warning">{isTh ? "นี่เป็นโมเดลทั่วไป ไม่ใช่ข้อมูลเฉพาะฟิล์ม ควรใช้ datasheet ของผู้ผลิตเมื่อมีข้อมูล เพราะ reciprocity failure ต่างกันมากในแต่ละ stock" : "This is a generic model, not film-specific data. Prefer the film manufacturer’s datasheet whenever available because reciprocity behavior varies by stock."}</p>
        </section>

        <section className="tool-card full-span">
          <p className="eyebrow">Depth of Field Calculator</p>
          <h2>{isTh ? "คำนวณระยะชัดและ Hyperfocal" : "Depth of field & hyperfocal"}</h2>
          <p>{isTh ? "เลือกรูปแบบฟิล์ม ทางยาวโฟกัส รูรับแสง และระยะวัตถุ เพื่อประมาณ Near/Far limit และ Hyperfocal distance" : "Choose film format, focal length, aperture, and subject distance to estimate near/far limits and hyperfocal distance."}</p>
          <div className="tool-controls four">
            <label><span>{isTh ? "ฟอร์แมต" : "Format"}</span><select value={dofFormat} onChange={(event) => setDofFormat(event.target.value as FilmFormatKey)}>{Object.entries(FILM_FORMATS).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select></label>
            <label><span>{isTh ? "ทางยาวโฟกัส (มม.)" : "Focal length (mm)"}</span><input type="number" min="1" max="1000" value={focalLength} onChange={(event) => setFocalLength(Number(event.target.value) || 1)} /></label>
            <label><span>{isTh ? "รูรับแสง" : "Aperture"}</span><select value={dofAperture} onChange={(event) => setDofAperture(Number(event.target.value))}>{APERTURE_STOPS.map((value) => <option key={value} value={value}>f/{value}</option>)}</select></label>
            <label><span>{isTh ? "ระยะวัตถุ (เมตร)" : "Subject distance (m)"}</span><input type="number" min="0.1" max="10000" step="0.1" value={subjectDistance} onChange={(event) => setSubjectDistance(Number(event.target.value) || 0.1)} /></label>
          </div>
          <div className="tool-metric-grid four">
            <div><span>{isTh ? "ใกล้สุด" : "Near limit"}</span><strong>{formatDistance(dof.nearM, isTh)}</strong></div>
            <div><span>{isTh ? "ไกลสุด" : "Far limit"}</span><strong>{formatDistance(dof.farM, isTh)}</strong></div>
            <div><span>{isTh ? "ช่วงชัดรวม" : "Total DOF"}</span><strong>{formatDistance(dof.totalM, isTh)}</strong></div>
            <div><span>Hyperfocal</span><strong>{formatDistance(dof.hyperfocalM, isTh)}</strong></div>
          </div>
          <p className="micro">{isTh ? "ผลลัพธ์เป็นค่าประมาณจาก circle of confusion มาตรฐานของแต่ละฟอร์แมต การพิมพ์ ขนาดรับชม และความละเอียดของภาพมีผลต่อความรู้สึกว่าคมชัด" : "Results use conventional circle-of-confusion values; print size, viewing distance, and capture resolution can affect perceived sharpness."}</p>
        </section>
      </div>

      <div className="tool-section-heading">
        <p className="eyebrow">Planning & scanning</p>
        <h2>{isTh ? "วางแผนต้นทุนและไฟล์สแกน" : "Cost and scan planning"}</h2>
      </div>

      <div className="tools-grid">
        <section className="tool-card">
          <p className="eyebrow">Film Cost Calculator</p>
          <h2>{isTh ? "ต้นทุนต่อม้วนและต่อเฟรม" : "Cost per roll & frame"}</h2>
          <p>{isTh ? "รวมราคาฟิล์ม ค่าล้าง ค่าสแกน และค่าใช้จ่ายอื่น เพื่อเห็นต้นทุนจริงต่อหนึ่งเฟรม" : "Combine film, development, scanning, and other costs to see the real cost of each frame."}</p>
          <div className="tool-controls two">
            <label><span>{isTh ? "สัญลักษณ์เงิน" : "Currency"}</span><input maxLength={4} value={currency} onChange={(event) => setCurrency(event.target.value)} /></label>
            <label><span>{isTh ? "จำนวนเฟรม" : "Frames"}</span><input type="number" min="1" max="100" value={frames} onChange={(event) => setFrames(Number(event.target.value) || 1)} /></label>
            <label><span>{isTh ? "ราคาฟิล์ม" : "Film"}</span><input type="number" min="0" step="1" value={filmPrice} onChange={(event) => setFilmPrice(Number(event.target.value) || 0)} /></label>
            <label><span>{isTh ? "ค่าล้าง" : "Develop"}</span><input type="number" min="0" step="1" value={developCost} onChange={(event) => setDevelopCost(Number(event.target.value) || 0)} /></label>
            <label><span>{isTh ? "ค่าสแกน" : "Scan"}</span><input type="number" min="0" step="1" value={scanCost} onChange={(event) => setScanCost(Number(event.target.value) || 0)} /></label>
            <label><span>{isTh ? "ค่าใช้จ่ายอื่น" : "Other"}</span><input type="number" min="0" step="1" value={otherCost} onChange={(event) => setOtherCost(Number(event.target.value) || 0)} /></label>
          </div>
          <div className="tool-result"><span>{isTh ? "รวมต่อม้วน" : "Total per roll"}</span><strong>{formatMoney(cost.total, currency)}</strong></div>
          <div className="tool-stat-row"><span>{isTh ? "ต้นทุนต่อเฟรม" : "Cost per frame"}</span><strong>{formatMoney(cost.costPerFrame, currency)}</strong></div>
        </section>

        <section className="tool-card">
          <p className="eyebrow">Scan Resolution Calculator</p>
          <h2>{isTh ? "คำนวณขนาดไฟล์จาก DPI" : "Scan size from DPI"}</h2>
          <p>{isTh ? "ประมาณ pixel dimensions, megapixels และขนาดข้อมูล RGB แบบไม่บีบอัดจากขนาดเนกาทีฟและความละเอียดสแกน" : "Estimate pixel dimensions, megapixels, and uncompressed RGB data size from negative format and scan resolution."}</p>
          <div className="tool-controls two">
            <label><span>{isTh ? "ฟอร์แมต" : "Format"}</span><select value={scanFormat} onChange={(event) => setScanFormat(event.target.value as ScanFormatKey)}>{Object.entries(SCAN_FORMATS).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select></label>
            <label><span>DPI</span><input type="number" min="72" max="12800" step="100" value={scanDpi} onChange={(event) => setScanDpi(Number(event.target.value) || 72)} /></label>
          </div>
          <div className="tool-result"><span>{isTh ? "ขนาดภาพโดยประมาณ" : "Approx. image size"}</span><strong>{scan.widthPx.toLocaleString()} × {scan.heightPx.toLocaleString()}</strong></div>
          <div className="tool-metric-grid three">
            <div><span>Megapixels</span><strong>{scan.megapixels.toFixed(1)} MP</strong></div>
            <div><span>RGB 8-bit</span><strong>{scan.rgb8Mb.toFixed(1)} MB</strong></div>
            <div><span>RGB 16-bit</span><strong>{scan.rgb16Mb.toFixed(1)} MB</strong></div>
          </div>
          <p className="micro">{isTh ? "ขนาด MB เป็นข้อมูลภาพแบบไม่บีบอัด ไม่รวม metadata และ overhead; JPEG/TIFF/PNG จริงอาจเล็กหรือใหญ่ต่างกัน" : "MB figures represent uncompressed pixel data only; actual JPEG/TIFF/PNG files vary with compression, metadata, and overhead."}</p>
        </section>
      </div>

      <RollLogbook locale={locale} />

      <div className="tool-section-heading">
        <p className="eyebrow">Classic helpers</p>
        <h2>{isTh ? "เครื่องมือเดิมที่ยังใช้งานได้ครบ" : "Existing shooting helpers"}</h2>
      </div>

      <div className="tools-grid">
        <section className="tool-card">
          <p className="eyebrow">Sunny 16</p>
          <h2>{isTh ? "คำนวณค่าแสงกลางวัน" : "Daylight exposure helper"}</h2>
          <p>{isTh ? "ใช้กฎ Sunny 16 เป็นจุดเริ่มต้น แล้วชดเชยตามรูรับแสงและสภาพท้องฟ้า" : "Use Sunny 16 as a starting point, then compensate for aperture and sky condition."}</p>
          <div className="tool-controls three">
            <label><span>ISO</span><input type="number" min="25" max="12800" step="25" value={iso} onChange={(event) => setIso(Number(event.target.value) || 100)} /></label>
            <label><span>{isTh ? "รูรับแสง" : "Aperture"}</span><select value={sunnyAperture} onChange={(event) => setSunnyAperture(Number(event.target.value))}>{sunnyApertures.map((value) => <option key={value} value={value}>f/{value}</option>)}</select></label>
            <label><span>{isTh ? "สภาพแสง" : "Light"}</span><select value={condition} onChange={(event) => setCondition(Number(event.target.value))}><option value={0}>{isTh ? "แดดจัด" : "Bright sun"}</option><option value={1}>{isTh ? "แดดอ่อน / มีเมฆบาง" : "Hazy sun"}</option><option value={2}>{isTh ? "ครึ้ม" : "Overcast"}</option><option value={3}>{isTh ? "ร่มเงา / ครึ้มมาก" : "Open shade"}</option></select></label>
          </div>
          <div className="tool-result"><span>{isTh ? "ค่าตั้งต้นโดยประมาณ" : "Approximate starting point"}</span><strong>f/{sunnyAperture} · {sunny16}</strong></div>
          <p className="micro">{isTh ? "เป็นค่าประมาณสำหรับเริ่มต้นเท่านั้น ควรใช้มิเตอร์เมื่อความแม่นยำสำคัญ" : "This is an estimate for a starting exposure. Use a meter when precision matters."}</p>
        </section>

        <section className="tool-card">
          <p className="eyebrow">Push / Pull</p>
          <h2>{isTh ? "วางแผน Effective ISO" : "Effective ISO planner"}</h2>
          <p>{isTh ? "คำนวณ EI เมื่อตั้งใจ Push หรือ Pull ก่อนถ่าย โดยไม่เดาเวลาล้าง" : "Calculate the EI you intend to meter for when pushing or pulling, without inventing development times."}</p>
          <div className="tool-controls two">
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
    </div>
  );
}
