"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";

type RollEntry = {
  id: string;
  camera: string;
  film: string;
  ratedIso: number;
  framesTotal: number;
  framesShot: number;
  loadedAt: string;
  notes: string;
};

const STORAGE_KEY = "filmindex-roll-log-v1";

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function RollLogbook({ locale }: { locale: Locale }) {
  const isTh = locale === "th";
  const [rolls, setRolls] = useState<RollEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [camera, setCamera] = useState("");
  const [film, setFilm] = useState("");
  const [ratedIso, setRatedIso] = useState(400);
  const [framesTotal, setFramesTotal] = useState(36);
  const [loadedAt, setLoadedAt] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setRolls(parsed);
      }
    } catch {
      // Ignore malformed local state and continue with a clean logbook.
    }
    setLoadedAt(new Date().toISOString().slice(0, 10));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rolls));
  }, [hydrated, rolls]);

  const activeCount = useMemo(() => rolls.filter((roll) => roll.framesShot < roll.framesTotal).length, [rolls]);

  function addRoll(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedCamera = camera.trim();
    const trimmedFilm = film.trim();
    if (!trimmedCamera || !trimmedFilm) return;

    setRolls((current) => [
      {
        id: makeId(),
        camera: trimmedCamera,
        film: trimmedFilm,
        ratedIso: Math.max(1, Math.round(ratedIso)),
        framesTotal: Math.max(1, Math.round(framesTotal)),
        framesShot: 0,
        loadedAt,
        notes: notes.trim(),
      },
      ...current,
    ]);
    setCamera("");
    setFilm("");
    setRatedIso(400);
    setFramesTotal(36);
    setNotes("");
  }

  function changeFrames(id: string, delta: number) {
    setRolls((current) => current.map((roll) => roll.id === id
      ? { ...roll, framesShot: Math.min(roll.framesTotal, Math.max(0, roll.framesShot + delta)) }
      : roll));
  }

  function removeRoll(id: string) {
    setRolls((current) => current.filter((roll) => roll.id !== id));
  }

  return (
    <section className="tool-card full-span roll-logbook">
      <div className="tool-card-heading">
        <div>
          <p className="eyebrow">Roll Logbook</p>
          <h2>{isTh ? "สมุดบันทึกม้วนฟิล์ม" : "Film roll logbook"}</h2>
        </div>
        <span className="tool-status-pill">{isTh ? `${activeCount} ม้วนกำลังใช้งาน` : `${activeCount} active rolls`}</span>
      </div>
      <p>{isTh ? "บันทึกว่าฟิล์มม้วนไหนอยู่ในกล้องตัวใด ถ่ายไปแล้วกี่เฟรม และโน้ตสำคัญ ข้อมูลทั้งหมดอยู่ใน browser เครื่องนี้เท่านั้น" : "Track which roll is loaded in each camera, how many frames have been exposed, and any field notes. Everything stays in this browser."}</p>

      <form className="roll-form" onSubmit={addRoll}>
        <label><span>{isTh ? "กล้อง" : "Camera"}</span><input required value={camera} onChange={(event) => setCamera(event.target.value)} placeholder="Nikon F3" /></label>
        <label><span>{isTh ? "ฟิล์ม" : "Film"}</span><input required value={film} onChange={(event) => setFilm(event.target.value)} placeholder="Kodak Portra 400" /></label>
        <label><span>{isTh ? "ตั้ง ISO / EI" : "Rated ISO / EI"}</span><input type="number" min="1" max="25600" value={ratedIso} onChange={(event) => setRatedIso(Number(event.target.value) || 1)} /></label>
        <label><span>{isTh ? "จำนวนเฟรม" : "Frames"}</span><input type="number" min="1" max="100" value={framesTotal} onChange={(event) => setFramesTotal(Number(event.target.value) || 1)} /></label>
        <label><span>{isTh ? "วันที่ใส่ฟิล์ม" : "Loaded"}</span><input type="date" value={loadedAt} onChange={(event) => setLoadedAt(event.target.value)} /></label>
        <label className="roll-notes"><span>{isTh ? "โน้ต" : "Notes"}</span><input value={notes} onChange={(event) => setNotes(event.target.value)} placeholder={isTh ? "Push +1, ถ่ายกลางคืน..." : "Push +1, night shooting..."} /></label>
        <button type="submit" className="tool-primary-button">{isTh ? "เพิ่มม้วน" : "Add roll"}</button>
      </form>

      <div className="roll-list" aria-live="polite">
        {!hydrated ? <p className="micro">{isTh ? "กำลังโหลดสมุดบันทึก..." : "Loading logbook..."}</p> : null}
        {hydrated && rolls.length === 0 ? <div className="roll-empty"><strong>{isTh ? "ยังไม่มีม้วนที่บันทึก" : "No rolls logged yet"}</strong><span>{isTh ? "เพิ่มม้วนแรกด้านบน แล้วใช้ปุ่ม +1 ทุกครั้งที่ถ่าย" : "Add your first roll above, then tap +1 after each frame."}</span></div> : null}
        {rolls.map((roll) => {
          const remaining = Math.max(0, roll.framesTotal - roll.framesShot);
          const complete = remaining === 0;
          return (
            <article className={`roll-entry${complete ? " complete" : ""}`} key={roll.id}>
              <div className="roll-entry-main">
                <div><span className="eyebrow">{roll.camera}</span><h3>{roll.film}</h3></div>
                <strong className="roll-counter">{roll.framesShot}/{roll.framesTotal}</strong>
              </div>
              <div className="roll-meta">
                <span>EI {roll.ratedIso}</span>
                {roll.loadedAt ? <span>{isTh ? "ใส่เมื่อ" : "Loaded"} {roll.loadedAt}</span> : null}
                <span>{complete ? (isTh ? "ถ่ายครบแล้ว" : "Completed") : (isTh ? `เหลือ ${remaining} เฟรม` : `${remaining} remaining`)}</span>
              </div>
              {roll.notes ? <p className="roll-entry-notes">{roll.notes}</p> : null}
              <div className="roll-actions">
                <button type="button" onClick={() => changeFrames(roll.id, -1)} disabled={roll.framesShot <= 0}>−1</button>
                <button type="button" onClick={() => changeFrames(roll.id, 1)} disabled={complete}>+1 {isTh ? "เฟรม" : "frame"}</button>
                <button type="button" className="danger" onClick={() => removeRoll(roll.id)}>{isTh ? "ลบ" : "Delete"}</button>
              </div>
            </article>
          );
        })}
      </div>
      <p className="micro">{isTh ? "FilmIndex ไม่อัปโหลดสมุดบันทึกนี้ไปยังเซิร์ฟเวอร์ การล้างข้อมูลเว็บไซต์หรือ localStorage จะลบรายการเหล่านี้" : "FilmIndex does not upload this logbook. Clearing site data or localStorage will remove these entries."}</p>
    </section>
  );
}
