"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { cameras, films, lenses } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import {
  calculateEv100FromLux,
  calculateExposureFromEv,
  calculateRelativeEv,
  checkCameraLensCompatibility,
  normalizeMount,
  recommendFilmsForCamera,
  type FilmScenario,
} from "@/lib/lens-ecosystem";
import { APERTURE_STOPS, formatShutter } from "@/lib/photography-tools";

function NumberField({ label, value, onChange, min, max, step = 1 }: { label: string; value: number; onChange: (value: number) => void; min?: number; max?: number; step?: number }) {
  return <label><span>{label}</span><input type="number" value={value} min={min} max={max} step={step} onChange={(event) => onChange(Number(event.target.value) || 0)} /></label>;
}

function CameraLensCompatibilityTool({ locale }: { locale: Locale }) {
  const isTh = locale === "th";
  const defaultCamera = cameras.find((camera) => normalizeMount(camera.lensMount) !== "Fixed lens") ?? cameras[0];
  const [cameraSlug, setCameraSlug] = useState(defaultCamera?.slug ?? "");
  const [lensSlug, setLensSlug] = useState(lenses[0]?.slug ?? "");
  const camera = cameras.find((item) => item.slug === cameraSlug) ?? defaultCamera;
  const lens = lenses.find((item) => item.slug === lensSlug) ?? lenses[0];
  const result = useMemo(() => camera && lens ? checkCameraLensCompatibility(camera, lens) : null, [camera, lens]);

  const labels = {
    native: isTh ? "ใช้งานตรงเมาท์" : "Native match",
    adapter: isTh ? "ใช้ผ่านอะแดปเตอร์" : "Adapter path",
    "fixed-lens": isTh ? "กล้องเลนส์ติดตาย" : "Fixed-lens camera",
    "not-compatible": isTh ? "ไม่พบเส้นทางที่รองรับ" : "No supported path",
  } as const;

  return <section className="tool-card tool-detail-card compatibility-tool">
    <div className="tool-controls two">
      <label><span>{isTh ? "กล้อง" : "Camera"}</span><select value={cameraSlug} onChange={(event) => setCameraSlug(event.target.value)}>{cameras.map((item) => <option key={item.slug} value={item.slug}>{item.brand} · {item.name}</option>)}</select></label>
      <label><span>{isTh ? "เลนส์" : "Lens"}</span><select value={lensSlug} onChange={(event) => setLensSlug(event.target.value)}>{lenses.map((item) => <option key={item.slug} value={item.slug}>{item.brand} · {item.name}</option>)}</select></label>
    </div>
    {result && camera && lens ? <>
      <div className={`compatibility-result ${result.status}`}>
        <span>{isTh ? "ผลการตรวจสอบ" : "Compatibility"}</span>
        <strong>{labels[result.status]}</strong>
      </div>
      <div className="tool-metric-grid three">
        <div><span>{isTh ? "เมาท์กล้อง" : "Camera mount"}</span><strong>{result.cameraMount}</strong></div>
        <div><span>{isTh ? "เมาท์เลนส์" : "Lens mount"}</span><strong>{result.lensMount}</strong></div>
        <div><span>{isTh ? "ฟอร์แมต" : "Format"}</span><strong>{camera.filmFormat} / {lens.coverage}</strong></div>
      </div>
      <p className="compatibility-note">{result.note}</p>
      <div className="tool-link-row">
        <Link href={`/cameras/${camera.slug}?lang=${locale}`}>{isTh ? "ดูข้อมูลกล้อง" : "Camera details"} ↗</Link>
        <Link href={`/lenses/${lens.slug}?lang=${locale}`}>{isTh ? "ดูข้อมูลเลนส์" : "Lens details"} ↗</Link>
      </div>
    </> : null}
    <p className="micro warning">{isTh ? "ผลลัพธ์นี้ตรวจจากข้อมูล mount/format และ adapter path ที่ FilmIndex บันทึกไว้เท่านั้น การทำงานของมิเตอร์ รูรับแสง ออโต้โฟกัส และระยะอินฟินิตี้อาจต่างกันตามบอดี้/อะแดปเตอร์จริง" : "This checks recorded mount/format data and explicit adapter paths only. Meter coupling, aperture control, autofocus, and infinity focus can still vary by body and adapter."}</p>
  </section>;
}

const SCENARIO_LABELS: Record<FilmScenario, { en: string; th: string }> = {
  daylight: { en: "Bright daylight", th: "กลางวันแสงจัด" },
  everyday: { en: "Everyday / travel", th: "ทั่วไป / ท่องเที่ยว" },
  portrait: { en: "Portrait", th: "พอร์ตเทรต" },
  night: { en: "Night / low light", th: "กลางคืน / แสงน้อย" },
  street: { en: "Street", th: "สตรีท" },
  landscape: { en: "Landscape", th: "ภูมิทัศน์" },
};

function FilmCameraRecommendationTool({ locale }: { locale: Locale }) {
  const isTh = locale === "th";
  const defaultCamera = cameras.find((camera) => /35|120|6x/i.test(camera.filmFormat)) ?? cameras[0];
  const [cameraSlug, setCameraSlug] = useState(defaultCamera?.slug ?? "");
  const [scenario, setScenario] = useState<FilmScenario>("everyday");
  const [filmType, setFilmType] = useState("Any");
  const camera = cameras.find((item) => item.slug === cameraSlug) ?? defaultCamera;
  const filmTypes = useMemo(() => [...new Set(films.map((film) => film.filmType))].sort(), []);
  const recommendations = useMemo(() => camera ? recommendFilmsForCamera(camera, films, scenario, filmType) : [], [camera, scenario, filmType]);

  return <section className="tool-card tool-detail-card recommendation-tool">
    <div className="tool-controls three">
      <label><span>{isTh ? "กล้อง" : "Camera"}</span><select value={cameraSlug} onChange={(event) => setCameraSlug(event.target.value)}>{cameras.map((item) => <option key={item.slug} value={item.slug}>{item.brand} · {item.name}</option>)}</select></label>
      <label><span>{isTh ? "สถานการณ์" : "Scenario"}</span><select value={scenario} onChange={(event) => setScenario(event.target.value as FilmScenario)}>{(Object.keys(SCENARIO_LABELS) as FilmScenario[]).map((key) => <option key={key} value={key}>{isTh ? SCENARIO_LABELS[key].th : SCENARIO_LABELS[key].en}</option>)}</select></label>
      <label><span>{isTh ? "ประเภทฟิล์ม" : "Film type"}</span><select value={filmType} onChange={(event) => setFilmType(event.target.value)}><option value="Any">{isTh ? "ทั้งหมด" : "Any"}</option>{filmTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
    </div>
    {camera ? <div className="recommendation-camera-strip"><strong>{camera.name}</strong><span>{camera.filmFormat} · {camera.cameraType} · {camera.metering}</span></div> : null}
    {recommendations.length ? <div className="film-recommendation-list">{recommendations.map(({ film, score, reasons }, index) => <Link href={`/films/${film.slug}?lang=${locale}`} key={film.slug} className="film-recommendation-card">
      <span className="recommendation-rank">{String(index + 1).padStart(2, "0")}</span>
      <div><p className="eyebrow">{film.brand} · ISO {film.iso}</p><h3>{film.name}</h3><p>{film.filmType} · {film.process}</p><div className="recommendation-reasons">{reasons.slice(0, 3).map((reason) => <span key={reason}>{reason}</span>)}</div></div>
      <strong className="recommendation-score">{Math.round(score)}</strong>
    </Link>)}</div> : <div className="roll-empty"><strong>{isTh ? "ยังไม่มีฟิล์มที่ตรงเงื่อนไข" : "No matching film yet"}</strong><span>{isTh ? "ลองเปลี่ยนประเภทฟิล์มหรือเลือกกล้องที่ใช้ 35mm/120" : "Try another film type or a camera using 35mm/120 film."}</span></div>}
    <p className="micro">{isTh ? "คะแนนเป็น local heuristic จากฟอร์แมต ISO, typical uses, latitude และลักษณะกล้อง ไม่ใช่การรับรองผลลัพธ์หรือความชอบส่วนบุคคล" : "Ranking is a local heuristic based on format, ISO, typical uses, latitude, and camera characteristics—not a guarantee of aesthetic results."}</p>
  </section>;
}

type AmbientSensorLike = {
  illuminance?: number;
  start: () => void;
  stop: () => void;
  addEventListener: (name: string, callback: () => void) => void;
};

type AmbientSensorConstructor = new (options?: { frequency?: number }) => AmbientSensorLike;

function AdvancedLightMeterTool({ locale }: { locale: Locale }) {
  const isTh = locale === "th";
  const [lux, setLux] = useState(1000);
  const [iso, setIso] = useState(400);
  const [aperture, setAperture] = useState(5.6);
  const [constant, setConstant] = useState(250);
  const [sensorState, setSensorState] = useState<"idle" | "active" | "unsupported" | "error">("idle");
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [luma, setLuma] = useState(0);
  const [referenceLuma, setReferenceLuma] = useState<number | null>(null);
  const [referenceEv, setReferenceEv] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sensorRef = useRef<AmbientSensorLike | null>(null);

  const incidentEv = useMemo(() => calculateEv100FromLux(lux, constant), [lux, constant]);
  const relativeEv = useMemo(() => referenceLuma && referenceEv !== null && luma > 0 ? calculateRelativeEv(referenceEv, referenceLuma, luma) : null, [referenceLuma, referenceEv, luma]);
  const activeEv = relativeEv ?? incidentEv;
  const exposure = useMemo(() => calculateExposureFromEv(activeEv, iso, aperture), [activeEv, iso, aperture]);

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    sensorRef.current?.stop();
  }, []);

  function startAmbientSensor() {
    const Sensor = (window as typeof window & { AmbientLightSensor?: AmbientSensorConstructor }).AmbientLightSensor;
    if (!Sensor) {
      setSensorState("unsupported");
      return;
    }
    try {
      sensorRef.current?.stop();
      const sensor = new Sensor({ frequency: 2 });
      sensor.addEventListener("reading", () => {
        if (typeof sensor.illuminance === "number" && Number.isFinite(sensor.illuminance)) setLux(Math.max(0.01, sensor.illuminance));
      });
      sensor.addEventListener("error", () => setSensorState("error"));
      sensor.start();
      sensorRef.current = sensor;
      setSensorState("active");
    } catch {
      setSensorState("error");
    }
  }

  function sampleVideo() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) return;
    const width = 64;
    const height = 48;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;
    context.drawImage(video, 0, 0, width, height);
    const data = context.getImageData(0, 0, width, height).data;
    let sum = 0;
    let count = 0;
    for (let i = 0; i < data.length; i += 16) {
      sum += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
      count += 1;
    }
    if (count) setLuma(sum / count);
  }

  async function startCamera() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError(isTh ? "Browser นี้ไม่รองรับการเปิดกล้อง" : "Camera access is not supported by this browser.");
      return;
    }
    try {
      setCameraError("");
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(sampleVideo, 500);
    } catch {
      setCameraError(isTh ? "ไม่สามารถเปิดกล้องได้ กรุณาตรวจ permission และ HTTPS" : "Could not open the camera. Check permission and HTTPS access.");
    }
  }

  function stopCamera() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
    setLuma(0);
    setReferenceLuma(null);
    setReferenceEv(null);
  }

  function calibrateCamera() {
    if (luma <= 0) return;
    setReferenceLuma(luma);
    setReferenceEv(incidentEv);
  }

  return <section className="tool-card tool-detail-card light-meter-tool">
    <div className="meter-mode-grid">
      <div className="meter-panel">
        <p className="eyebrow">Incident / lux</p>
        <h3>{isTh ? "ค่าแสงจาก Lux" : "Exposure from lux"}</h3>
        <div className="tool-controls two">
          <NumberField label="Lux" value={lux} onChange={(value) => setLux(Math.max(0.01, value))} min={0.01} max={200000} step={1} />
          <NumberField label={isTh ? "ค่าคาลิเบรต C" : "Calibration constant C"} value={constant} onChange={(value) => setConstant(Math.max(1, value))} min={1} max={1000} step={1} />
        </div>
        <button type="button" className="secondary-tool-button" onClick={startAmbientSensor}>{sensorState === "active" ? (isTh ? "กำลังอ่าน Ambient Light Sensor" : "Ambient sensor active") : (isTh ? "ลองใช้ Ambient Light Sensor" : "Try Ambient Light Sensor")}</button>
        {sensorState === "unsupported" ? <p className="micro">{isTh ? "อุปกรณ์/Browser นี้ไม่มี Ambient Light Sensor API ให้กรอก Lux เองได้" : "Ambient Light Sensor API is unavailable; enter lux manually instead."}</p> : null}
        {sensorState === "error" ? <p className="micro warning">{isTh ? "Sensor ถูกบล็อกหรือ permission ไม่พร้อม" : "Sensor access was blocked or unavailable."}</p> : null}
      </div>

      <div className="meter-panel camera-meter-panel">
        <p className="eyebrow">Camera assist</p>
        <h3>{isTh ? "วัดความสว่างแบบ Relative" : "Relative camera meter"}</h3>
        <div className="meter-video-wrap"><video ref={videoRef} muted playsInline /><canvas ref={canvasRef} hidden />{!cameraActive ? <span>{isTh ? "Camera preview" : "Camera preview"}</span> : null}</div>
        <div className="meter-camera-actions">{cameraActive ? <><button type="button" className="tool-primary-button" onClick={calibrateCamera}>{isTh ? "Calibrate จาก EV ปัจจุบัน" : "Calibrate to current EV"}</button><button type="button" className="secondary-tool-button" onClick={stopCamera}>{isTh ? "ปิดกล้อง" : "Stop camera"}</button></> : <button type="button" className="tool-primary-button" onClick={startCamera}>{isTh ? "เปิดกล้อง" : "Start camera"}</button>}</div>
        {cameraError ? <p className="micro warning">{cameraError}</p> : null}
        <div className="tool-stat-row"><span>{isTh ? "Relative luminance" : "Relative luminance"}</span><strong>{luma > 0 ? luma.toFixed(3) : "—"}</strong></div>
        {referenceLuma ? <p className="micro">{isTh ? "กล้องถูก calibrate กับ EV จาก Lux ปัจจุบันแล้ว ค่าต่อไปเป็นความต่างแบบ relative" : "Camera brightness is calibrated to the current lux-derived EV; subsequent readings are relative changes."}</p> : null}
      </div>
    </div>

    <div className="tool-controls two meter-exposure-controls">
      <NumberField label="ISO" value={iso} onChange={(value) => setIso(Math.max(1, value))} min={1} max={25600} />
      <label><span>{isTh ? "รูรับแสง" : "Aperture"}</span><select value={aperture} onChange={(event) => setAperture(Number(event.target.value))}>{APERTURE_STOPS.map((value) => <option key={value} value={value}>f/{value}</option>)}</select></label>
    </div>
    <div className="tool-metric-grid three">
      <div><span>EV100</span><strong>{activeEv.toFixed(1)}</strong></div>
      <div><span>{isTh ? "ที่ ISO นี้" : "EV at ISO"}</span><strong>{exposure.evAtIso.toFixed(1)}</strong></div>
      <div><span>{isTh ? "ชัตเตอร์แนะนำ" : "Suggested shutter"}</span><strong>{formatShutter(exposure.shutterSeconds)}</strong></div>
    </div>
    <p className="micro warning">{isTh ? "กล้องเว็บมักใช้ Auto Exposure และ browser ไม่เปิดเผย exposure metadata อย่างสม่ำเสมอ จึงไม่ควรใช้ Camera Assist เป็น absolute light meter โดยไม่ calibrate; โหมด Lux/Ambient Sensor เหมาะกว่าสำหรับค่า absolute เมื่อ sensor เชื่อถือได้" : "Web cameras usually auto-expose and browsers do not expose reliable exposure metadata, so Camera Assist should not be treated as an absolute meter without calibration. Lux/Ambient Sensor mode is preferable for absolute readings when the sensor is trustworthy."}</p>
  </section>;
}

export function EcosystemTool({ slug, locale }: { slug: string; locale: Locale }) {
  switch (slug) {
    case "camera-lens-compatibility": return <CameraLensCompatibilityTool locale={locale} />;
    case "film-camera-recommendation": return <FilmCameraRecommendationTool locale={locale} />;
    case "advanced-light-meter": return <AdvancedLightMeterTool locale={locale} />;
    default: return null;
  }
}
