"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RollLogbook } from "@/components/roll-logbook";
import type { Locale } from "@/lib/i18n";
import {
  APERTURE_STOPS,
  EXPIRED_STORAGE_DEFAULTS,
  FILM_FORMATS,
  SCAN_FORMATS,
  SHUTTER_OPTIONS,
  calculateDepthOfField,
  calculateDevelopmentTemperature,
  calculateDilution,
  calculateEquivalentExposures,
  calculateEv100,
  calculateExpiredFilmStartingPoint,
  calculateFilmCost,
  calculatePushPullPlan,
  calculateReciprocalRule,
  calculateReciprocityCorrection,
  calculateScanResolution,
  formatDuration,
  formatShutter,
  type ExpiredStorage,
  type FilmFormatKey,
  type ScanFormatKey,
} from "@/lib/photography-tools";

function NumberField({ label, value, onChange, min, max, step = 1 }: { label: string; value: number; onChange: (value: number) => void; min?: number; max?: number; step?: number }) {
  return <label><span>{label}</span><input type="number" value={value} min={min} max={max} step={step} onChange={(event) => onChange(Number(event.target.value) || 0)} /></label>;
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

function ExposureTool({ isTh }: { isTh: boolean }) {
  const [iso, setIso] = useState(400);
  const [aperture, setAperture] = useState(8);
  const [shutter, setShutter] = useState(1 / 125);
  const input = useMemo(() => ({ iso, aperture, shutterSeconds: shutter }), [iso, aperture, shutter]);
  const ev100 = useMemo(() => calculateEv100(input), [input]);
  const equivalents = useMemo(() => calculateEquivalentExposures(input), [input]);

  return <section className="tool-card tool-detail-card">
    <div className="tool-controls three">
      <NumberField label="ISO" value={iso} onChange={(value) => setIso(Math.max(1, value))} min={1} max={25600} />
      <label><span>{isTh ? "รูรับแสง" : "Aperture"}</span><select value={aperture} onChange={(event) => setAperture(Number(event.target.value))}>{APERTURE_STOPS.map((value) => <option key={value} value={value}>f/{value}</option>)}</select></label>
      <label><span>{isTh ? "ชัตเตอร์" : "Shutter"}</span><select value={shutter} onChange={(event) => setShutter(Number(event.target.value))}>{SHUTTER_OPTIONS.map((option) => <option key={option.label} value={option.seconds}>{option.label}</option>)}</select></label>
    </div>
    <div className="tool-result"><span>EV100</span><strong>{ev100.toFixed(1)}</strong></div>
    <div className="tool-equivalent-grid">{equivalents.map((item) => <div key={item.aperture}><span>f/{item.aperture}</span><strong>{formatShutter(item.shutterSeconds)}</strong></div>)}</div>
    <p className="micro">{isTh ? "ชุดค่าด้านบนคง exposure เท่าเดิมที่ ISO เดิม แต่ motion blur และ depth of field จะเปลี่ยนตามค่าที่เลือก" : "These combinations preserve exposure at the same ISO, while motion blur and depth of field still change."}</p>
  </section>;
}

function ReciprocityTool({ isTh }: { isTh: boolean }) {
  const [seconds, setSeconds] = useState(8);
  const [exponent, setExponent] = useState(1.2);
  const result = useMemo(() => calculateReciprocityCorrection(seconds, exponent), [seconds, exponent]);
  return <section className="tool-card tool-detail-card">
    <div className="tool-controls two">
      <NumberField label={isTh ? "เวลาจากมิเตอร์ (วินาที)" : "Metered time (seconds)"} value={seconds} onChange={(value) => setSeconds(Math.max(0.001, value))} min={0.001} max={86400} step={0.1} />
      <label><span>{isTh ? "โมเดลชดเชย" : "Correction model"}</span><select value={exponent} onChange={(event) => setExponent(Number(event.target.value))}><option value={1}>1.0 · {isTh ? "ไม่ชดเชย" : "None"}</option><option value={1.1}>1.1 · {isTh ? "อ่อน" : "Mild"}</option><option value={1.2}>1.2 · {isTh ? "ปานกลาง" : "Moderate"}</option><option value={1.3}>1.3 · {isTh ? "มาก" : "Strong"}</option></select></label>
    </div>
    <div className="tool-result"><span>{isTh ? "เวลาหลังชดเชย" : "Corrected time"}</span><strong>{formatShutter(result.correctedSeconds)}</strong></div>
    <div className="tool-stat-row"><span>{isTh ? "ชดเชยประมาณ" : "Approx. compensation"}</span><strong>+{result.compensationStops.toFixed(2)} stops</strong></div>
    <p className="micro warning">{isTh ? "โมเดลนี้เป็น generic estimator ไม่ใช่ค่าเฉพาะ film stock ให้ใช้ datasheet ของผู้ผลิตเมื่อมีข้อมูล" : "This is a generic estimator, not a film-stock-specific table. Prefer manufacturer data when available."}</p>
  </section>;
}

function DofTool({ isTh }: { isTh: boolean }) {
  const [format, setFormat] = useState<FilmFormatKey>("35mm");
  const [focal, setFocal] = useState(50);
  const [aperture, setAperture] = useState(5.6);
  const [distance, setDistance] = useState(3);
  const result = useMemo(() => calculateDepthOfField({ focalLengthMm: focal, aperture, subjectDistanceM: distance, format }), [focal, aperture, distance, format]);
  return <section className="tool-card tool-detail-card">
    <div className="tool-controls four">
      <label><span>{isTh ? "ฟอร์แมต" : "Format"}</span><select value={format} onChange={(event) => setFormat(event.target.value as FilmFormatKey)}>{Object.entries(FILM_FORMATS).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select></label>
      <NumberField label={isTh ? "ทางยาวโฟกัส (มม.)" : "Focal length (mm)"} value={focal} onChange={(value) => setFocal(Math.max(1, value))} min={1} max={1000} />
      <label><span>{isTh ? "รูรับแสง" : "Aperture"}</span><select value={aperture} onChange={(event) => setAperture(Number(event.target.value))}>{APERTURE_STOPS.map((value) => <option key={value} value={value}>f/{value}</option>)}</select></label>
      <NumberField label={isTh ? "ระยะวัตถุ (เมตร)" : "Subject distance (m)"} value={distance} onChange={(value) => setDistance(Math.max(0.1, value))} min={0.1} max={10000} step={0.1} />
    </div>
    <div className="tool-metric-grid four"><div><span>{isTh ? "ใกล้สุด" : "Near"}</span><strong>{formatDistance(result.nearM, isTh)}</strong></div><div><span>{isTh ? "ไกลสุด" : "Far"}</span><strong>{formatDistance(result.farM, isTh)}</strong></div><div><span>{isTh ? "ช่วงชัดรวม" : "Total DOF"}</span><strong>{formatDistance(result.totalM, isTh)}</strong></div><div><span>Hyperfocal</span><strong>{formatDistance(result.hyperfocalM, isTh)}</strong></div></div>
    <p className="micro">{isTh ? "เป็นค่าประมาณจาก circle of confusion มาตรฐาน การพิมพ์และระยะรับชมมีผลต่อ perceived sharpness" : "Uses conventional circle-of-confusion values; print size and viewing distance affect perceived sharpness."}</p>
  </section>;
}

function Sunny16Tool({ isTh }: { isTh: boolean }) {
  const [iso, setIso] = useState(400);
  const [aperture, setAperture] = useState(16);
  const [condition, setCondition] = useState(0);
  const seconds = useMemo(() => (1 / Math.max(1, iso)) * Math.pow(aperture / 16, 2) * Math.pow(2, condition), [iso, aperture, condition]);
  return <section className="tool-card tool-detail-card">
    <div className="tool-controls three">
      <NumberField label="ISO" value={iso} onChange={(value) => setIso(Math.max(1, value))} min={1} max={25600} />
      <label><span>{isTh ? "รูรับแสง" : "Aperture"}</span><select value={aperture} onChange={(event) => setAperture(Number(event.target.value))}>{[2, 2.8, 4, 5.6, 8, 11, 16, 22].map((value) => <option key={value} value={value}>f/{value}</option>)}</select></label>
      <label><span>{isTh ? "สภาพแสง" : "Light"}</span><select value={condition} onChange={(event) => setCondition(Number(event.target.value))}><option value={0}>{isTh ? "แดดจัด" : "Bright sun"}</option><option value={1}>{isTh ? "แดดอ่อน / เมฆบาง" : "Hazy sun"}</option><option value={2}>{isTh ? "ครึ้ม" : "Overcast"}</option><option value={3}>{isTh ? "ร่มเงา / ครึ้มมาก" : "Open shade"}</option></select></label>
    </div>
    <div className="tool-result"><span>{isTh ? "ค่าเริ่มต้น" : "Starting point"}</span><strong>f/{aperture} · {formatShutter(seconds)}</strong></div>
    <p className="micro">{isTh ? "Sunny 16 เป็นเพียงจุดเริ่มต้น ใช้ light meter เมื่อความแม่นยำสำคัญ" : "Sunny 16 is a starting point; use a light meter when precision matters."}</p>
  </section>;
}

function ReciprocalRuleTool({ isTh }: { isTh: boolean }) {
  const [focal, setFocal] = useState(50);
  const [crop, setCrop] = useState(1);
  const [safety, setSafety] = useState(0);
  const result = useMemo(() => calculateReciprocalRule(focal, crop, safety), [focal, crop, safety]);
  return <section className="tool-card tool-detail-card">
    <div className="tool-controls three">
      <NumberField label={isTh ? "ทางยาวโฟกัส (มม.)" : "Focal length (mm)"} value={focal} onChange={(value) => setFocal(Math.max(1, value))} min={1} max={2000} />
      <NumberField label={isTh ? "Crop factor" : "Crop factor"} value={crop} onChange={(value) => setCrop(Math.max(0.1, value))} min={0.1} max={8} step={0.1} />
      <label><span>{isTh ? "เผื่อความปลอดภัย" : "Safety margin"}</span><select value={safety} onChange={(event) => setSafety(Number(event.target.value))}><option value={0}>0 stop</option><option value={1}>+1 stop</option><option value={2}>+2 stops</option></select></label>
    </div>
    <div className="tool-result"><span>{isTh ? "ชัตเตอร์ขั้นต่ำแนะนำ" : "Suggested minimum shutter"}</span><strong>1/{result.denominator}s</strong></div>
    <p className="micro">{isTh ? `Equivalent focal length สำหรับสูตรนี้ ≈ ${result.effectiveFocalLength.toFixed(0)}mm เป็นแนวทางทั่วไป เทคนิคการถือกล้องและระบบกันสั่นทำให้ผลต่างกันได้` : `Effective focal length for this rule ≈ ${result.effectiveFocalLength.toFixed(0)}mm. This remains a general guideline; technique and stabilization matter.`}</p>
  </section>;
}

function FilmCostTool({ isTh }: { isTh: boolean }) {
  const [film, setFilm] = useState(400);
  const [develop, setDevelop] = useState(120);
  const [scan, setScan] = useState(100);
  const [other, setOther] = useState(0);
  const [frames, setFrames] = useState(36);
  const [currency, setCurrency] = useState("฿");
  const result = useMemo(() => calculateFilmCost({ filmPrice: film, developCost: develop, scanCost: scan, otherCost: other, frames }), [film, develop, scan, other, frames]);
  return <section className="tool-card tool-detail-card">
    <div className="tool-controls three">
      <label><span>{isTh ? "สัญลักษณ์เงิน" : "Currency"}</span><input maxLength={4} value={currency} onChange={(event) => setCurrency(event.target.value)} /></label>
      <NumberField label={isTh ? "ราคาฟิล์ม" : "Film"} value={film} onChange={setFilm} min={0} />
      <NumberField label={isTh ? "ค่าล้าง" : "Develop"} value={develop} onChange={setDevelop} min={0} />
      <NumberField label={isTh ? "ค่าสแกน" : "Scan"} value={scan} onChange={setScan} min={0} />
      <NumberField label={isTh ? "ค่าอื่น" : "Other"} value={other} onChange={setOther} min={0} />
      <NumberField label={isTh ? "จำนวนเฟรม" : "Frames"} value={frames} onChange={(value) => setFrames(Math.max(1, value))} min={1} max={100} />
    </div>
    <div className="tool-result"><span>{isTh ? "รวมต่อม้วน" : "Total per roll"}</span><strong>{formatMoney(result.total, currency)}</strong></div>
    <div className="tool-stat-row"><span>{isTh ? "ต้นทุนต่อเฟรม" : "Cost per frame"}</span><strong>{formatMoney(result.costPerFrame, currency)}</strong></div>
  </section>;
}

function ScanResolutionTool({ isTh }: { isTh: boolean }) {
  const [format, setFormat] = useState<ScanFormatKey>("35mm");
  const [dpi, setDpi] = useState(2400);
  const result = useMemo(() => calculateScanResolution(format, dpi), [format, dpi]);
  return <section className="tool-card tool-detail-card">
    <div className="tool-controls two"><label><span>{isTh ? "ฟอร์แมต" : "Format"}</span><select value={format} onChange={(event) => setFormat(event.target.value as ScanFormatKey)}>{Object.entries(SCAN_FORMATS).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}</select></label><NumberField label="DPI" value={dpi} onChange={(value) => setDpi(Math.max(72, value))} min={72} max={12800} step={100} /></div>
    <div className="tool-result"><span>{isTh ? "ขนาดภาพโดยประมาณ" : "Approx. dimensions"}</span><strong>{result.widthPx.toLocaleString()} × {result.heightPx.toLocaleString()}</strong></div>
    <div className="tool-metric-grid three"><div><span>Megapixels</span><strong>{result.megapixels.toFixed(1)} MP</strong></div><div><span>RGB 8-bit</span><strong>{result.rgb8Mb.toFixed(1)} MB</strong></div><div><span>RGB 16-bit</span><strong>{result.rgb16Mb.toFixed(1)} MB</strong></div></div>
    <p className="micro">{isTh ? "ขนาด MB เป็น uncompressed pixel data ไม่ใช่ขนาดไฟล์ JPEG/TIFF จริง" : "MB figures are uncompressed pixel data, not final JPEG/TIFF file sizes."}</p>
  </section>;
}

function DevelopmentTool({ isTh }: { isTh: boolean }) {
  const [baseMinutes, setBaseMinutes] = useState(9);
  const [baseTemp, setBaseTemp] = useState(20);
  const [targetTemp, setTargetTemp] = useState(20);
  const [q10, setQ10] = useState(2);
  const [volume, setVolume] = useState(500);
  const [concentrateParts, setConcentrateParts] = useState(1);
  const [waterParts, setWaterParts] = useState(31);
  const temperature = useMemo(() => calculateDevelopmentTemperature({ baseTimeSeconds: baseMinutes * 60, baseTemperatureC: baseTemp, targetTemperatureC: targetTemp, q10 }), [baseMinutes, baseTemp, targetTemp, q10]);
  const dilution = useMemo(() => calculateDilution({ totalVolumeMl: volume, concentrateParts, waterParts }), [volume, concentrateParts, waterParts]);

  return <section className="tool-card tool-detail-card">
    <div className="tool-callout"><strong>{isTh ? "เริ่มจากเวลาที่เชื่อถือได้" : "Start from a trusted time"}</strong><span>{isTh ? "นำ Base time / temperature จาก datasheet ของฟิล์ม-น้ำยา หรือแล็บ แล้ว FilmIndex ช่วยคำนวณการเปลี่ยนอุณหภูมิและ dilution" : "Take the base time/temperature from the film-developer datasheet or your lab; FilmIndex only applies transparent temperature and dilution math."}</span></div>
    <div className="tool-controls four">
      <NumberField label={isTh ? "Base time (นาที)" : "Base time (minutes)"} value={baseMinutes} onChange={(value) => setBaseMinutes(Math.max(0.1, value))} min={0.1} max={120} step={0.1} />
      <NumberField label={isTh ? "Base temp °C" : "Base temp °C"} value={baseTemp} onChange={setBaseTemp} min={5} max={50} step={0.1} />
      <NumberField label={isTh ? "อุณหภูมิจริง °C" : "Actual temp °C"} value={targetTemp} onChange={setTargetTemp} min={5} max={50} step={0.1} />
      <label><span>Q10 model</span><select value={q10} onChange={(event) => setQ10(Number(event.target.value))}><option value={1.8}>1.8</option><option value={2}>2.0</option><option value={2.2}>2.2</option></select></label>
    </div>
    <div className="tool-result"><span>{isTh ? "เวลาที่ปรับตามอุณหภูมิ" : "Temperature-adjusted time"}</span><strong>{formatDuration(temperature.adjustedTimeSeconds)}</strong></div>
    <div className="tool-stat-row"><span>{isTh ? "ตัวคูณเวลา" : "Time multiplier"}</span><strong>×{temperature.multiplier.toFixed(3)}</strong></div>
    <div className="tool-divider" />
    <div className="tool-controls three">
      <NumberField label={isTh ? "ปริมาตรรวม (ml)" : "Total volume (ml)"} value={volume} onChange={(value) => setVolume(Math.max(1, value))} min={1} max={10000} />
      <NumberField label={isTh ? "ส่วน Concentrate" : "Concentrate parts"} value={concentrateParts} onChange={(value) => setConcentrateParts(Math.max(0.0001, value))} min={0.0001} max={1000} step={0.1} />
      <NumberField label={isTh ? "ส่วนน้ำ" : "Water parts"} value={waterParts} onChange={(value) => setWaterParts(Math.max(0, value))} min={0} max={1000} step={0.1} />
    </div>
    <div className="tool-metric-grid two"><div><span>{isTh ? "น้ำยาเข้มข้น" : "Concentrate"}</span><strong>{dilution.concentrateMl.toFixed(1)} ml</strong></div><div><span>{isTh ? "น้ำ" : "Water"}</span><strong>{dilution.waterMl.toFixed(1)} ml</strong></div></div>
    <p className="micro warning">{isTh ? "Q10 เป็นโมเดลอุณหภูมิทั่วไป ไม่ใช่ replacement ของ temperature chart จากผู้ผลิต โดยเฉพาะกระบวนการสีที่ควรควบคุมอุณหภูมิตาม process specification" : "Q10 is a generic temperature model, not a replacement for a manufacturer temperature chart—especially for color processes with tightly specified temperatures."}</p>
  </section>;
}

function PushPullTool({ isTh }: { isTh: boolean }) {
  const [boxIso, setBoxIso] = useState(400);
  const [stops, setStops] = useState(1);
  const [baseMinutes, setBaseMinutes] = useState(9);
  const [percent, setPercent] = useState(0);
  const result = useMemo(() => calculatePushPullPlan({ boxIso, stops, baseTimeSeconds: baseMinutes * 60, percentPerStop: percent }), [boxIso, stops, baseMinutes, percent]);
  return <section className="tool-card tool-detail-card">
    <div className="tool-controls four">
      <NumberField label={isTh ? "ISO บนกล่อง" : "Box ISO"} value={boxIso} onChange={(value) => setBoxIso(Math.max(1, value))} min={1} max={25600} />
      <label><span>{isTh ? "Push / Pull" : "Push / Pull"}</span><select value={stops} onChange={(event) => setStops(Number(event.target.value))}><option value={-2}>Pull −2</option><option value={-1}>Pull −1</option><option value={0}>{isTh ? "ปกติ" : "Normal"}</option><option value={1}>Push +1</option><option value={2}>Push +2</option><option value={3}>Push +3</option></select></label>
      <NumberField label={isTh ? "เวลาล้างปกติ (นาที)" : "Normal dev time (min)"} value={baseMinutes} onChange={(value) => setBaseMinutes(Math.max(0.1, value))} min={0.1} max={120} step={0.1} />
      <NumberField label={isTh ? "% ปรับเวลาต่อ stop" : "% time change / stop"} value={percent} onChange={(value) => setPercent(Math.max(0, value))} min={0} max={100} step={1} />
    </div>
    <div className="tool-metric-grid two"><div><span>{isTh ? "ตั้งมิเตอร์ที่" : "Meter at"}</span><strong>EI {result.effectiveIso}</strong></div><div><span>{isTh ? "เวลาล้างหลังปรับ" : "Adjusted dev time"}</span><strong>{result.adjustedTimeSeconds === null ? (isTh ? "ใส่ % จากแหล่งอ้างอิง" : "Enter sourced %") : formatDuration(result.adjustedTimeSeconds)}</strong></div></div>
    <p className="micro warning">{isTh ? "ค่า % ตั้งต้นเป็น 0 โดยตั้งใจ เพราะการ Push/Pull แตกต่างตาม film + developer ให้กรอกเปอร์เซ็นต์จาก datasheet/แล็บ หรือใช้เวลาที่แล็บระบุโดยตรง" : "The default adjustment is intentionally 0 because push/pull development varies by film and developer. Enter a percentage from a datasheet/lab, or follow the lab's stated time directly."}</p>
  </section>;
}

function ExpiredFilmTool({ isTh }: { isTh: boolean }) {
  const currentYear = new Date().getFullYear();
  const [boxIso, setBoxIso] = useState(400);
  const [expiryYear, setExpiryYear] = useState(currentYear - 10);
  const [storage, setStorage] = useState<ExpiredStorage>("room");
  const [stopsPerDecade, setStopsPerDecade] = useState(EXPIRED_STORAGE_DEFAULTS.room);
  const [filmType, setFilmType] = useState("color-negative");
  const result = useMemo(() => calculateExpiredFilmStartingPoint({ boxIso, expiryYear, currentYear, stopsPerDecade }), [boxIso, expiryYear, currentYear, stopsPerDecade]);

  function changeStorage(value: ExpiredStorage) {
    setStorage(value);
    setStopsPerDecade(EXPIRED_STORAGE_DEFAULTS[value]);
  }

  return <section className="tool-card tool-detail-card">
    <div className="tool-controls four">
      <NumberField label={isTh ? "ISO บนกล่อง" : "Box ISO"} value={boxIso} onChange={(value) => setBoxIso(Math.max(1, value))} min={1} max={25600} />
      <NumberField label={isTh ? "ปีหมดอายุ" : "Expiry year"} value={expiryYear} onChange={setExpiryYear} min={1900} max={currentYear + 20} />
      <label><span>{isTh ? "การเก็บรักษา" : "Storage"}</span><select value={storage} onChange={(event) => changeStorage(event.target.value as ExpiredStorage)}><option value="frozen">{isTh ? "แช่แข็ง" : "Frozen"}</option><option value="refrigerated">{isTh ? "แช่เย็น" : "Refrigerated"}</option><option value="cool">{isTh ? "ที่เย็น/แห้ง" : "Cool / dry"}</option><option value="room">{isTh ? "อุณหภูมิห้อง" : "Room temperature"}</option><option value="hot-unknown">{isTh ? "ร้อน / ไม่ทราบ" : "Hot / unknown"}</option></select></label>
      <label><span>{isTh ? "ชนิดฟิล์ม" : "Film type"}</span><select value={filmType} onChange={(event) => setFilmType(event.target.value)}><option value="color-negative">Color negative</option><option value="bw">B&W negative</option><option value="slide">Slide / reversal</option></select></label>
    </div>
    <div className="heuristic-control"><label><span>{isTh ? "Heuristic: ชดเชยต่อ 10 ปี" : "Heuristic: stops per decade"}</span><input type="range" min="0" max="2" step="0.25" value={stopsPerDecade} onChange={(event) => setStopsPerDecade(Number(event.target.value))} /><strong>{stopsPerDecade.toFixed(2)} stops / 10y</strong></label></div>
    <div className="tool-metric-grid three"><div><span>{isTh ? "อายุหลังหมดอายุ" : "Past expiry"}</span><strong>{result.ageYears} {isTh ? "ปี" : "years"}</strong></div><div><span>{isTh ? "ชดเชยตาม heuristic" : "Heuristic compensation"}</span><strong>+{result.compensationStops.toFixed(2)} stops</strong></div><div><span>{isTh ? "EI ตั้งต้นทดลอง" : "Test starting EI"}</span><strong>EI {result.suggestedEi}</strong></div></div>
    <p className="micro warning">{filmType === "slide" ? (isTh ? "Slide film มี latitude แคบและการเสื่อมสีซับซ้อน สูตรชดเชย exposure ทั่วไปอาจไม่ช่วย แนะนำ bracket/test roll" : "Slide film has narrow latitude and complex color aging; a generic exposure heuristic may not help. Bracket or test a roll.") : (isTh ? "แนวคิด one-stop-per-decade เป็นเพียง heuristic ไม่ใช่กฎ ฟิล์มที่แช่เย็น/แช่แข็งอาจต้องชดเชยน้อยมาก ขณะที่ฟิล์มโดนร้อนอาจเสียสภาพเกินแก้ด้วย exposure" : "The one-stop-per-decade idea is only a heuristic, not a rule. Cold-stored film may need little compensation, while heat-damaged film may not be recoverable through exposure alone.")}</p>
  </section>;
}

function NegativeConversionTool({ isTh }: { isTh: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageVersion, setImageVersion] = useState(0);
  const [fileName, setFileName] = useState("");
  const [autoMask, setAutoMask] = useState(true);
  const [exposure, setExposure] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [red, setRed] = useState(100);
  const [green, setGreen] = useState(100);
  const [blue, setBlue] = useState(100);

  useEffect(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas) return;
    const maxSide = 1800;
    const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;
    context.drawImage(image, 0, 0, width, height);
    const frame = context.getImageData(0, 0, width, height);
    const data = frame.data;

    const border = Math.max(1, Math.floor(Math.min(width, height) * 0.04));
    let rSum = 0, gSum = 0, bSum = 0, count = 0;
    for (let y = 0; y < height; y += 4) {
      for (let x = 0; x < width; x += 4) {
        if (x >= border && x < width - border && y >= border && y < height - border) continue;
        const i = (y * width + x) * 4;
        rSum += data[i]; gSum += data[i + 1]; bSum += data[i + 2]; count += 1;
      }
    }
    const mask = count > 0 ? [rSum / count, gSum / count, bSum / count] : [255, 255, 255];
    const baseInv = mask.map((value) => 255 - value);
    const exposureGain = Math.pow(2, exposure);
    const contrastGain = Math.max(0, 1 + contrast / 100);
    const channelGain = [red / 100, green / 100, blue / 100];

    for (let i = 0; i < data.length; i += 4) {
      for (let channel = 0; channel < 3; channel += 1) {
        let value = 255 - data[i + channel];
        if (autoMask) {
          const black = baseInv[channel];
          value = ((value - black) * 255) / Math.max(1, 255 - black);
        }
        value *= exposureGain;
        value = (value - 128) * contrastGain + 128;
        value *= channelGain[channel];
        data[i + channel] = Math.max(0, Math.min(255, Math.round(value)));
      }
    }
    context.putImageData(frame, 0, 0);
  }, [imageVersion, autoMask, exposure, contrast, red, green, blue]);

  function loadFile(file: File | undefined) {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      imageRef.current = image;
      setFileName(file.name);
      setImageVersion((value) => value + 1);
      URL.revokeObjectURL(url);
    };
    image.src = url;
  }

  function exportPng() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${fileName.replace(/\.[^.]+$/, "") || "film-negative"}-positive.png`;
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  }

  return <section className="tool-card tool-detail-card negative-tool">
    <div className="negative-upload">
      <label className="negative-drop"><strong>{isTh ? "เลือกภาพเนกาทีฟ" : "Choose negative image"}</strong><span>{isTh ? "JPG / PNG / WebP · ประมวลผลใน browser" : "JPG / PNG / WebP · processed in your browser"}</span><input type="file" accept="image/*" onChange={(event) => loadFile(event.target.files?.[0])} /></label>
      {fileName ? <span className="tool-status-pill">{fileName}</span> : null}
    </div>
    <div className="negative-workspace">
      <div className="negative-preview"><canvas ref={canvasRef} /><span className="negative-placeholder">{fileName ? "" : (isTh ? "ภาพ Preview จะแสดงที่นี่" : "Preview appears here")}</span></div>
      <div className="negative-controls">
        <label className="toggle-row"><input type="checkbox" checked={autoMask} onChange={(event) => setAutoMask(event.target.checked)} /><span>{isTh ? "Auto orange-mask neutralization" : "Auto orange-mask neutralization"}</span></label>
        <label><span>{isTh ? "Exposure" : "Exposure"} {exposure > 0 ? "+" : ""}{exposure.toFixed(1)} EV</span><input type="range" min="-3" max="3" step="0.1" value={exposure} onChange={(event) => setExposure(Number(event.target.value))} /></label>
        <label><span>{isTh ? "Contrast" : "Contrast"} {contrast}</span><input type="range" min="-80" max="100" step="1" value={contrast} onChange={(event) => setContrast(Number(event.target.value))} /></label>
        <label><span>Red {red}%</span><input type="range" min="25" max="200" value={red} onChange={(event) => setRed(Number(event.target.value))} /></label>
        <label><span>Green {green}%</span><input type="range" min="25" max="200" value={green} onChange={(event) => setGreen(Number(event.target.value))} /></label>
        <label><span>Blue {blue}%</span><input type="range" min="25" max="200" value={blue} onChange={(event) => setBlue(Number(event.target.value))} /></label>
        <button type="button" className="tool-primary-button" onClick={exportPng} disabled={!fileName}>{isTh ? "Export PNG" : "Export PNG"}</button>
      </div>
    </div>
    <p className="micro">{isTh ? "ไฟล์ภาพไม่ถูกอัปโหลด การ neutralize orange mask ใช้ค่าเฉลี่ยจากขอบภาพ จึงควรมีพื้นที่ฟิล์มฐานติดอยู่ในสแกนเพื่อผลลัพธ์ที่ดีขึ้น" : "The image is never uploaded. Orange-mask neutralization samples the image border, so leaving some unexposed film base in the scan can improve the starting result."}</p>
  </section>;
}

export function ToolDetail({ slug, locale }: { slug: string; locale: Locale }) {
  const isTh = locale === "th";
  switch (slug) {
    case "exposure": return <ExposureTool isTh={isTh} />;
    case "reciprocity": return <ReciprocityTool isTh={isTh} />;
    case "depth-of-field": return <DofTool isTh={isTh} />;
    case "sunny-16": return <Sunny16Tool isTh={isTh} />;
    case "reciprocal-rule": return <ReciprocalRuleTool isTh={isTh} />;
    case "film-cost": return <FilmCostTool isTh={isTh} />;
    case "scan-resolution": return <ScanResolutionTool isTh={isTh} />;
    case "roll-logbook": return <RollLogbook locale={locale} />;
    case "development": return <DevelopmentTool isTh={isTh} />;
    case "push-pull": return <PushPullTool isTh={isTh} />;
    case "expired-film": return <ExpiredFilmTool isTh={isTh} />;
    case "negative-conversion": return <NegativeConversionTool isTh={isTh} />;
    default: return null;
  }
}
