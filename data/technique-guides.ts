import type { ImageCredit } from "@/types";

export type TechniqueGuide = {
  quickSteps: string[];
  quickStepsTh: string[];
  mistakes: string[];
  mistakesTh: string[];
  checklist: string[];
  checklistTh: string[];
  relatedTools?: string[];
  referenceImages?: ImageCredit[];
  references?: { label: string; url: string }[];
};

const commonsFile = (name: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=1400`;

export const techniqueGuides: Record<string, TechniqueGuide> = {
  "sunny-16-rule": {
    quickSteps: [
      "Set shutter speed close to the reciprocal of the film ISO: ISO 100 ≈ 1/125s, ISO 400 ≈ 1/500s.",
      "Start at f/16 in hard direct sun, then open the aperture as the light becomes hazier, overcast, or shaded.",
      "Make a deliberate creative trade: opening the aperture requires a faster shutter if you want to keep the same exposure.",
      "When the scene is important, verify with a meter or bracket rather than treating the rule as exact.",
    ],
    quickStepsTh: [
      "ตั้งความเร็วชัตเตอร์ใกล้ส่วนกลับของ ISO เช่น ISO 100 ≈ 1/125s และ ISO 400 ≈ 1/500s",
      "เริ่มที่ f/16 เมื่ออยู่กลางแดดจัด แล้วเปิดรูรับแสงเพิ่มเมื่อแสงฟุ้ง ครึ้ม หรืออยู่ในร่ม",
      "ถ้าต้องการเปิดรูรับแสงเพื่อระยะชัดตื้น ให้เพิ่มความเร็วชัตเตอร์ชดเชยเพื่อรักษาค่าแสงเดิม",
      "ถ้าภาพสำคัญ ให้เช็กด้วยมิเตอร์หรือถ่าย bracket แทนการใช้กฎนี้แบบตายตัว",
    ],
    mistakes: ["Using f/16 mechanically in every daylight condition.", "Forgetting that snow, beach, backlight, and deep shade can move the scene far from the rule-of-thumb baseline."],
    mistakesTh: ["ยึด f/16 ทุกสถานการณ์แม้สภาพแสงเปลี่ยนไปมาก", "ลืมว่าหิมะ ชายหาด ย้อนแสง และเงาลึกทำให้ฉากต่างจากค่าตั้งต้นของ Sunny 16 มาก"],
    checklist: ["Film ISO confirmed", "Weather/light judged", "Shutter/aperture pair chosen", "Important frame metered or bracketed"],
    checklistTh: ["เช็ก ISO ฟิล์ม", "ประเมินสภาพแสง", "เลือกคู่ Shutter/Aperture", "ภาพสำคัญวัดแสงหรือ bracket แล้ว"],
    relatedTools: ["sunny-16", "exposure", "advanced-light-meter"],
    references: [{ label: "Wikimedia Commons — Photography terms / Sunny 16", url: "https://commons.wikimedia.org/wiki/Commons:Photography_terms#Sunny_16_rule" }],
  },
  "push-processing": {
    quickSteps: [
      "Choose the EI before shooting and keep it consistent for the whole roll whenever possible.",
      "Meter normally at the chosen EI; push processing does not restore shadow information that was never recorded.",
      "Mark the cassette or roll clearly with the requested push value.",
      "Use the exact film/developer or lab guidance for development time, agitation, and temperature.",
    ],
    quickStepsTh: [
      "เลือกค่า EI ก่อนถ่ายและพยายามใช้ค่าเดียวกันทั้งม้วน",
      "วัดแสงตาม EI ที่เลือกตามปกติ เพราะการ Push ตอนล้างไม่สามารถสร้างรายละเอียดเงาที่ไม่ได้รับแสงมาตั้งแต่ต้นได้",
      "ทำเครื่องหมายบนตลับหรือม้วนให้ชัดว่าต้องการ Push กี่ stop",
      "ใช้เวลาล้าง การเขย่า และอุณหภูมิจากคู่ฟิล์ม/น้ำยาหรือแล็บที่ใช้จริง",
    ],
    mistakes: ["Assuming push processing is the same as simply increasing ISO on a digital camera.", "Using a universal development percentage for every film/developer combination."],
    mistakesTh: ["คิดว่า Push Processing เหมือนการเพิ่ม ISO ในกล้องดิจิทัล", "ใช้เปอร์เซ็นต์เพิ่มเวลาล้างสูตรเดียวกับฟิล์มและน้ำยาทุกคู่"],
    checklist: ["EI decided", "Roll labeled", "Lab/developer data checked", "Contrast/grain trade-off accepted"],
    checklistTh: ["กำหนด EI แล้ว", "ติดป้ายม้วนแล้ว", "เช็กข้อมูลแล็บ/น้ำยา", "ยอมรับผลด้านคอนทราสต์และเกรนแล้ว"],
    relatedTools: ["push-pull", "development"],
  },
  "loading-35mm-film": {
    quickSteps: [
      "Open the camera back only in subdued light and place the cartridge in the film chamber.",
      "Pull out only enough leader to reach the take-up spool and engage it according to the camera design.",
      "Advance one or two frames while watching for movement at the rewind crank or transport indicator.",
      "Close the back, advance to frame 1, and confirm the rewind control still moves when you wind on.",
    ],
    quickStepsTh: [
      "เปิดฝาหลังในบริเวณที่ไม่มีแสงแรงและใส่ตลับฟิล์มลงช่อง",
      "ดึงปลายฟิล์มเท่าที่จำเป็นให้ถึงแกนรับ แล้วเกี่ยวตามรูปแบบของกล้อง",
      "ขึ้นฟิล์ม 1–2 ครั้ง พร้อมดูว่าก้านกรอหรือตัวบอกการเดินฟิล์มขยับหรือไม่",
      "ปิดฝาหลัง ขึ้นถึงเฟรม 1 แล้วเช็กอีกครั้งว่าฟิล์มเดินจริง",
    ],
    mistakes: ["Pulling out excessive leader and wasting frames.", "Closing the back before confirming the sprockets/take-up spool have engaged the film."],
    mistakesTh: ["ดึงปลายฟิล์มยาวเกินจำเป็นจนเสียเฟรม", "ปิดฝาหลังก่อนเช็กว่ารูหนามและแกนรับจับฟิล์มอยู่จริง"],
    checklist: ["Leader engaged", "Sprockets aligned", "Rewind crank moves", "Frame counter reset"],
    checklistTh: ["ปลายฟิล์มเกี่ยวแล้ว", "รูหนามตรง", "ก้านกรอขยับ", "ตัวนับเฟรมพร้อม"],
  },
  "long-exposure": {
    quickSteps: [
      "Stabilize the camera on a solid tripod and disable anything that can introduce movement.",
      "Meter the scene and calculate the base shutter time before adding reciprocity correction.",
      "Apply manufacturer-specific reciprocity guidance whenever it exists.",
      "Use a cable release, self-timer, or remote trigger and record the actual exposure time for later comparison.",
    ],
    quickStepsTh: [
      "ยึดกล้องกับขาตั้งที่มั่นคงและลดทุกปัจจัยที่ทำให้กล้องสั่น",
      "วัดแสงและหาค่าเวลาพื้นฐานก่อนคำนวณ Reciprocity",
      "ถ้ามีข้อมูลจากผู้ผลิตของฟิล์มรุ่นนั้น ให้ใช้ข้อมูลเฉพาะรุ่นแทนสูตรทั่วไป",
      "ใช้สายลั่น Self-timer หรือรีโมต และจดเวลาจริงไว้เทียบผลภายหลัง",
    ],
    mistakes: ["Applying one reciprocity formula to every film stock.", "Forgetting that wind, unstable tripods, vibration, and moving subjects can dominate the result even when exposure is correct."],
    mistakesTh: ["ใช้สูตร Reciprocity สูตรเดียวกับฟิล์มทุกชนิด", "สนใจค่าแสงแต่ลืมลม ขาตั้งไม่มั่นคง การสั่น และการเคลื่อนไหวของวัตถุ"],
    checklist: ["Tripod locked", "Base exposure measured", "Reciprocity data checked", "Timer/release ready", "Exposure logged"],
    checklistTh: ["ล็อกขาตั้ง", "วัดค่าแสงพื้นฐาน", "เช็ก Reciprocity", "เตรียมตัวจับเวลา/ลั่นชัตเตอร์", "จดค่าแสง"],
    relatedTools: ["reciprocity", "exposure"],
  },
  "exposure-triangle": {
    quickSteps: [
      "Choose the image characteristic that matters most first: motion rendering or depth of field.",
      "Set shutter speed for motion or aperture for depth of field, then balance the other control for exposure.",
      "Treat film ISO as the sensitivity of the loaded stock; changing EI is a deliberate exposure/development decision, not a free third dial.",
      "Practice one-stop swaps until equivalent exposures become intuitive.",
    ],
    quickStepsTh: [
      "เริ่มจากตัดสินใจก่อนว่าอะไรสำคัญกว่า ระหว่างการหยุด/ลากการเคลื่อนไหวกับระยะชัด",
      "ตั้ง Shutter ตามการเคลื่อนไหว หรือ Aperture ตาม DOF แล้วค่อยชดเชยอีกตัวให้ได้ค่าแสง",
      "มอง ISO ฟิล์มเป็นความไวของฟิล์มที่ใส่อยู่ การเปลี่ยน EI เป็นการตัดสินใจด้าน exposure/development ไม่ใช่ปุ่มฟรีแบบดิจิทัล",
      "ฝึกแลกค่าทีละ 1 stop จนมอง Equivalent Exposure ได้คล่อง",
    ],
    mistakes: ["Thinking ISO changes the amount of light physically reaching the film.", "Changing two controls in the same direction and unintentionally moving exposure by multiple stops."],
    mistakesTh: ["คิดว่า ISO เปลี่ยนปริมาณแสงที่ตกถึงฟิล์มโดยตรง", "ปรับสองตัวแปรไปทิศเดียวกันจนค่าแสงเปลี่ยนหลาย stop โดยไม่ตั้งใจ"],
    checklist: ["Creative priority chosen", "Film ISO/EI known", "Equivalent exposure checked", "Motion and DOF consequences considered"],
    checklistTh: ["เลือกความสำคัญเชิงภาพ", "รู้ ISO/EI", "เช็ก Equivalent Exposure", "คิดผลต่อ Motion และ DOF"],
    relatedTools: ["exposure", "depth-of-field"],
    referenceImages: [{
      url: commonsFile("Exposure triangle - aperture, shutter speed and ISO.svg"),
      sourceName: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Exposure_triangle_-_aperture,_shutter_speed_and_ISO.svg",
      creator: "WClarke and Samsara",
      license: "CC BY-SA 4.0",
      attributionRequired: true,
      alt: "Exposure triangle diagram showing aperture, shutter speed, and ISO",
    }],
  },
  "film-metering": {
    quickSteps: [
      "Confirm the EI you are actually using for the loaded film.",
      "For reflected metering, identify whether the metered area is much lighter or darker than a middle tone.",
      "For incident metering, place the diffuser at the subject and point it according to the meter's method.",
      "When scene contrast is high, meter important highlights and shadows separately before deciding where to place exposure.",
    ],
    quickStepsTh: [
      "ยืนยัน EI ที่ใช้จริงกับม้วนฟิล์มก่อนวัด",
      "ถ้าใช้ reflected meter ให้ดูว่าบริเวณที่วัดสว่างหรือมืดกว่ากลางมากแค่ไหน",
      "ถ้าใช้ incident meter ให้วางโดมที่ตำแหน่งวัตถุและหันตามวิธีของมิเตอร์",
      "ถ้าฉากคอนทราสต์สูง ให้วัดไฮไลต์และเงาที่สำคัญแยกกันก่อนตัดสินใจค่าแสง",
    ],
    mistakes: ["Trusting a reflected reading from snow, a black wall, or a backlit subject without interpretation.", "Changing EI between frames on the same roll without tracking the decision."],
    mistakesTh: ["เชื่อค่ามิเตอร์สะท้อนจากหิมะ กำแพงดำ หรือวัตถุย้อนแสงโดยไม่ตีความ", "เปลี่ยน EI ไปมาระหว่างม้วนโดยไม่จด"],
    checklist: ["EI set", "Meter mode understood", "Important tones checked", "Compensation recorded"],
    checklistTh: ["ตั้ง EI", "รู้ว่าใช้มิเตอร์แบบไหน", "วัดโทนสำคัญ", "จดค่าชดเชย"],
    relatedTools: ["advanced-light-meter", "exposure"],
    referenceImages: [{
      url: commonsFile("Sekonic Twinmate L-208. Esposimetro analogico (02).jpg"),
      sourceName: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Sekonic_Twinmate_L-208._Esposimetro_analogico_(02).jpg",
      creator: "Wikimedia Commons contributor (see source page)",
      license: "See source page",
      attributionRequired: true,
      alt: "Sekonic Twinmate L-208 analog photographic exposure meter",
    }],
  },
  "exposure-latitude": {
    quickSteps: ["Identify whether the stock is color negative, black-and-white negative, or reversal/slide film.", "Bracket a controlled scene around box speed when learning an unfamiliar film.", "Compare shadow texture, highlight density, scanability, and color rather than judging only overall brightness.", "Build a personal EI preference from repeatable tests instead of internet folklore."],
    quickStepsTh: ["ระบุว่าฟิล์มเป็น Color Negative, B&W Negative หรือ Slide/Reversal", "เมื่อทดลองฟิล์มใหม่ ให้ bracket ฉากควบคุมรอบค่า box speed", "เทียบรายละเอียดเงา ความหนาแน่นไฮไลต์ ความง่ายในการสแกน และสี ไม่ใช่ดูแค่ความสว่างรวม", "สร้าง EI ที่ชอบจากการทดสอบซ้ำได้ แทนการยึดกฎจากอินเทอร์เน็ต"],
    mistakes: ["Treating exposure latitude as a single universal number.", "Assuming a scanner can recover information that the film never recorded."],
    mistakesTh: ["มอง Exposure Latitude เป็นตัวเลขสากลค่าเดียว", "คิดว่าสแกนเนอร์กู้รายละเอียดที่ฟิล์มไม่เคยบันทึกได้"],
    checklist: ["Film family identified", "Scene contrast known", "Bracket/test plan ready", "Development and scan kept consistent"],
    checklistTh: ["รู้ชนิดฟิล์ม", "รู้คอนทราสต์ฉาก", "มีแผน bracket/test", "คุมการล้างและสแกนให้เหมือนกัน"],
  },
  "pull-processing": {
    quickSteps: ["Choose a lower EI than box speed before exposure.", "Meter the roll consistently at that EI.", "Label the roll with the pull amount.", "Use film/developer-specific guidance to reduce development; do not apply a universal percentage."],
    quickStepsTh: ["เลือก EI ต่ำกว่า Box Speed ก่อนถ่าย", "วัดแสงทั้งม้วนตาม EI นั้นให้สม่ำเสมอ", "ติดป้ายระบุ Pull กี่ stop", "ลดเวลาล้างตามข้อมูลคู่ฟิล์ม/น้ำยา ไม่ใช้เปอร์เซ็นต์สูตรเดียว"],
    mistakes: ["Pulling simply to 'make film less contrasty' without considering exposure and scene contrast.", "Mixing frames shot at box speed and pull EI on one roll without a development plan."],
    mistakesTh: ["Pull เพียงเพราะอยากให้ภาพคอนทราสต์ต่ำลงโดยไม่ดูค่าแสงและคอนทราสต์ฉาก", "ถ่ายค่า Box Speed และ Pull ปนกันในม้วนเดียวโดยไม่มีแผนล้าง"],
    checklist: ["EI chosen", "Roll consistently metered", "Roll labeled", "Development source checked"],
    checklistTh: ["เลือก EI", "วัดทั้งม้วนสม่ำเสมอ", "ติดป้ายม้วน", "เช็กแหล่งข้อมูลการล้าง"],
    relatedTools: ["push-pull", "development"],
  },
  "double-exposure": {
    quickSteps: ["Check whether the camera has a dedicated multiple-exposure control or requires a model-specific method.", "Decide which exposure should provide shadows and which should provide highlights/texture.", "Consider reducing exposure per pass when large bright areas overlap.", "Keep a note of frame number and exposure settings so successful combinations can be repeated."],
    quickStepsTh: ["เช็กว่ากล้องมี Multiple Exposure โดยตรงหรือใช้วิธีเฉพาะรุ่น", "วางแผนว่าภาพไหนจะเป็นฐานเงา และภาพไหนจะเติมไฮไลต์/texture", "ถ้าพื้นที่สว่างซ้อนกันมาก ให้พิจารณาลดค่าแสงของแต่ละ pass", "จดเลขเฟรมและค่ากล้องเพื่อทำซ้ำสูตรที่ได้ผล"],
    mistakes: ["Assuming two normal exposures always equal a good double exposure.", "Advancing the film accidentally between exposures."],
    mistakesTh: ["คิดว่าถ่ายปกติเต็มค่า 2 ครั้งแล้วจะได้ผลดีเสมอ", "เผลอขึ้นฟิล์มไปเฟรมถัดไประหว่างการซ้อน"],
    checklist: ["Camera method confirmed", "Layer order planned", "Exposure overlap considered", "Frame/settings logged"],
    checklistTh: ["รู้วิธีของกล้อง", "วางลำดับภาพ", "คิดพื้นที่ซ้อนสว่าง", "จดเฟรม/ค่าแสง"],
    referenceImages: [{
      url: commonsFile("Photo Double Exposure.jpg"),
      sourceName: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Photo_Double_Exposure.jpg",
      creator: "Plismo",
      license: "CC BY-SA 3.0",
      attributionRequired: true,
      alt: "Film photograph showing an accidental double exposure",
    }],
  },
  "film-storage": {
    quickSteps: ["Keep unopened film cool, dry, and away from sustained heat.", "For refrigerated/frozen film, leave the sealed package closed until it reaches room temperature.", "Store exposed but undeveloped film carefully and process it without unnecessary delay.", "Label bulk or long-term stock with purchase date, expiry date, and storage history."],
    quickStepsTh: ["เก็บฟิล์มที่ยังไม่เปิดในที่เย็น แห้ง และห่างความร้อนต่อเนื่อง", "ฟิล์มแช่เย็น/แช่แข็งควรคงซีลไว้จนกลับสู่อุณหภูมิห้อง", "ฟิล์มที่ถ่ายแล้วแต่ยังไม่ล้างควรเก็บดีและไม่ปล่อยไว้นานโดยไม่จำเป็น", "ฟิล์มที่เก็บยาวควรติดป้ายวันที่ซื้อ วันหมดอายุ และประวัติการเก็บ"],
    mistakes: ["Opening cold film immediately and allowing condensation on the emulsion.", "Assuming refrigeration reverses damage that already happened during earlier hot storage."],
    mistakesTh: ["เปิดฟิล์มเย็นทันทีจนเกิดการควบแน่นบนอิมัลชัน", "คิดว่าการแช่เย็นภายหลังจะย้อนความเสียหายจากการเก็บร้อนก่อนหน้าได้"],
    checklist: ["Cool/dry location", "Film sealed during warm-up", "Storage history labeled", "Exposed rolls processed promptly"],
    checklistTh: ["ที่เก็บเย็น/แห้ง", "อุ่นกลับขณะยังซีล", "ติดป้ายประวัติ", "ล้างม้วนที่ถ่ายแล้วไม่ช้าเกินไป"],
  },
  "expired-film": {
    quickSteps: ["Find the expiry date and, more importantly, learn as much as possible about storage history.", "Treat high-speed and slide film more cautiously than slow color-negative or B&W stock.", "Shoot a test roll or bracket important frames when the stock is valuable or irreplaceable.", "Record EI and development so the result informs the next roll."],
    quickStepsTh: ["ดูวันหมดอายุและพยายามรู้ประวัติการเก็บให้มากที่สุด เพราะสำคัญกว่าวันหมดอายุเพียงอย่างเดียว", "ระวังฟิล์มความไวสูงและ Slide มากกว่าฟิล์มเนกาทีฟความไวต่ำ", "ถ้าฟิล์มหายากหรือภาพสำคัญ ให้ทดสอบหรือ bracket", "จด EI และการล้างไว้ใช้ตัดสินใจม้วนถัดไป"],
    mistakes: ["Applying the one-stop-per-decade rule blindly.", "Using an important once-only subject as the first test of an unknown expired roll."],
    mistakesTh: ["ใช้กฎ 1 stop ต่อ 10 ปีแบบตายตัว", "ใช้เหตุการณ์สำคัญครั้งเดียวเป็นม้วนทดสอบของฟิล์มหมดอายุที่ไม่รู้สภาพ"],
    checklist: ["Expiry/storage known", "Film family considered", "Test/bracket plan", "EI logged"],
    checklistTh: ["รู้วันหมดอายุ/การเก็บ", "คิดถึงชนิดฟิล์ม", "มีแผน test/bracket", "จด EI"],
    relatedTools: ["expired-film"],
  },
  "airport-xray-film": {
    quickSteps: ["Keep film in carry-on luggage rather than checked baggage when local rules allow.", "Before travel, check whether the airport uses conventional X-ray or CT scanners for carry-on screening.", "Keep film loose or in a transparent bag so a hand-inspection request is easy to understand.", "Respect security staff instructions; hand inspection availability varies by airport and jurisdiction."],
    quickStepsTh: ["ถ้ากฎพื้นที่อนุญาต ให้พกฟิล์มในกระเป๋าถือแทนโหลดใต้เครื่อง", "เช็กก่อนเดินทางว่าสนามบินใช้ X-ray แบบเดิมหรือ CT สำหรับกระเป๋าถือ", "จัดฟิล์มแยกในถุงใสเพื่อขอตรวจด้วยมือได้ง่าย", "ทำตามเจ้าหน้าที่ความปลอดภัย เพราะการตรวจด้วยมือไม่ได้รับประกันทุกสนามบิน"],
    mistakes: ["Assuming all airport scanners have the same effect on film.", "Packing high-speed film deep inside checked baggage."],
    mistakesTh: ["คิดว่าเครื่องสแกนสนามบินทุกชนิดมีผลต่อฟิล์มเท่ากัน", "ใส่ฟิล์มความไวสูงไว้ลึกในกระเป๋าโหลด"],
    checklist: ["Scanner policy checked", "Film easy to access", "High-speed stock identified", "Hand-check request prepared"],
    checklistTh: ["เช็กนโยบายสแกน", "หยิบฟิล์มง่าย", "แยกฟิล์ม ISO สูง", "เตรียมขอตรวจด้วยมือ"],
    referenceImages: [{
      url: commonsFile("2016 04 19 Airport Security-4 (26140078903).jpg"),
      sourceName: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2016_04_19_Airport_Security-4_(26140078903).jpg",
      creator: "AMISOM Public Information / Tobin Jones",
      license: "CC0 1.0",
      attributionRequired: false,
      alt: "Airport luggage passing through an X-ray security scanner",
    }],
  },
  "rewinding-35mm-film": {
    quickSteps: ["Finish the roll gently; do not force the advance lever when resistance suddenly increases.", "Press or operate the camera's rewind release.", "Turn the rewind crank in the indicated direction with steady, light tension.", "Wait until resistance drops clearly before opening the back."],
    quickStepsTh: ["เมื่อขึ้นฟิล์มแล้วเจอแรงต้านเพิ่มทันที อย่าฝืนก้าน", "กดหรือใช้งาน Rewind Release ของกล้อง", "หมุนก้านกรอตามทิศที่ระบุด้วยแรงสม่ำเสมอ", "รอจนแรงต้านลดลงชัดก่อนเปิดฝาหลัง"],
    mistakes: ["Forcing the advance lever at the end of the roll and tearing sprocket holes.", "Opening the camera before the film has fully returned to the cartridge."],
    mistakesTh: ["ฝืนก้านขึ้นฟิล์มจนรูหนามฉีก", "เปิดฝาหลังก่อนฟิล์มกลับตลับหมด"],
    checklist: ["Rewind release engaged", "Correct direction", "Resistance dropped", "Back opened only after rewind"],
    checklistTh: ["ปลด Rewind Release", "หมุนทิศถูก", "แรงต้านลดแล้ว", "เปิดหลังหลังกรอเสร็จ"],
  },
  "c41-development": {
    quickSteps: ["Read the instructions for the exact chemistry kit and prepare all solutions before starting.", "Bring chemistry and tank close to the required process temperature and verify with a reliable thermometer.", "Run developer, bleach/fix or separate bleach/fix, wash, and final rinse in the sequence specified by the chemistry maker.", "Dry film in a clean, low-dust area and avoid touching the emulsion."],
    quickStepsTh: ["อ่านคู่มือของชุดเคมีที่ใช้จริงและเตรียมน้ำยาทุกตัวให้พร้อมก่อนเริ่ม", "ปรับอุณหภูมิน้ำยาและถังให้ใกล้ค่าที่กำหนด พร้อมเช็กด้วยเทอร์โมมิเตอร์ที่ไว้ใจได้", "ทำ Developer, Bleach/Fix หรือ Bleach+Fix แยก, Wash และ Final Rinse ตามลำดับของผู้ผลิต", "ตากในที่สะอาดฝุ่นน้อยและไม่สัมผัสผิวอิมัลชัน"],
    mistakes: ["Borrowing time/temperature values from a different chemistry kit.", "Starting before all bottles, timers, water baths, and rinse steps are ready."],
    mistakesTh: ["ยืมเวลา/อุณหภูมิจากชุดเคมีคนละยี่ห้อหรือคนละสูตร", "เริ่มล้างก่อนเตรียมน้ำยา ตัวจับเวลา Water Bath และขั้นล้างน้ำให้พร้อม"],
    checklist: ["Exact kit instructions open", "Thermometer verified", "Solutions labeled", "Timer ready", "Drying area clean"],
    checklistTh: ["เปิดคู่มือชุดเคมี", "เช็กเทอร์โมมิเตอร์", "ติดฉลากน้ำยา", "เตรียม Timer", "ที่ตากสะอาด"],
    relatedTools: ["development"],
    referenceImages: [{
      url: commonsFile("Agfa Rondinax 35 U.jpg"),
      sourceName: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Agfa_Rondinax_35_U.jpg",
      creator: "Dirk Meyer",
      license: "GFDL / see source page",
      attributionRequired: true,
      alt: "Agfa Rondinax 35 U daylight film developing tank",
    }],
  },
  "film-scanning": {
    quickSteps: ["Clean the film and holder before capture; dust removal is easier before scanning than after.", "Keep the film flat and confirm focus at grain level or the sharpest image detail.", "Capture a neutral, non-clipped master with enough bit depth for later inversion and tonal work.", "Apply inversion, color balance, dust cleanup, and output sharpening as separate reproducible steps."],
    quickStepsTh: ["ทำความสะอาดฟิล์มและ holder ก่อนสแกน เพราะป้องกันฝุ่นง่ายกว่าลบทีหลัง", "ทำฟิล์มให้ราบและเช็กโฟกัสที่ระดับเกรนหรือรายละเอียดที่คมที่สุด", "เก็บ Master ที่เป็นกลาง ไม่ clip และมี bit depth เพียงพอสำหรับกลับสี/ปรับโทนภายหลัง", "แยกขั้น Inversion, Color Balance, Dust Cleanup และ Output Sharpening ให้ทำซ้ำได้"],
    mistakes: ["Confusing scanner DPI with actual optical detail resolved from the film.", "Baking strong creative grading into the only master file."],
    mistakesTh: ["คิดว่า DPI ที่ตั้งสูงเท่ากับรายละเอียด Optical จริงที่อ่านได้เสมอ", "ปรับโทนจัดลงในไฟล์ Master เพียงชุดเดียวจนย้อนกลับไม่ได้"],
    checklist: ["Film/holder clean", "Film flat", "Focus checked", "Highlights/shadows not clipped", "Neutral master saved"],
    checklistTh: ["ฟิล์ม/Holder สะอาด", "ฟิล์มราบ", "เช็กโฟกัส", "ไม่ clip เงา/ไฮไลต์", "เก็บ Neutral Master"],
    relatedTools: ["scan-resolution", "negative-conversion"],
    referenceImages: [{
      url: commonsFile("Epson F-3200 Film Scanner (3974180129).jpg"),
      sourceName: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Epson_F-3200_Film_Scanner_(3974180129).jpg",
      creator: "contri / Wikimedia Commons (see source page)",
      license: "CC BY-SA 2.0",
      attributionRequired: true,
      alt: "Epson F-3200 dedicated film scanner",
    }],
  },
};

export function getTechniqueGuide(slug: string) {
  return techniqueGuides[slug];
}
