import type { Camera, Film, Lens, RecordProvenance, RecordSource } from "@/types";

export const CATALOG_VERIFIED_ON = "2026-10-02";

type CatalogRecord = Film | Camera | Lens;

type SourcePreset = Omit<RecordSource, "scope"> & { scope?: RecordSource["scope"] };

const source = (label: string, publisher: string, url: string, scope: RecordSource["scope"]): RecordSource => ({
  label,
  publisher,
  url,
  scope,
});

const filmBrandSources: Record<string, SourcePreset> = {
  Kodak: { label: "Kodak Still Film", publisher: "Eastman Kodak Company", url: "https://www.kodak.com/en/still-film/products/", scope: "brand-catalog" },
  Ilford: { label: "ILFORD PHOTO film range", publisher: "HARMAN technology", url: "https://www.ilfordphoto.com/black-white-film/", scope: "brand-catalog" },
  Kentmere: { label: "Kentmere film range", publisher: "HARMAN technology", url: "https://www.ilfordphoto.com/film/kentmere-film/", scope: "brand-catalog" },
  Harman: { label: "HARMAN film range", publisher: "HARMAN technology", url: "https://www.harmanphoto.co.uk/film/", scope: "brand-catalog" },
  Fujifilm: { label: "Fujifilm photographic film", publisher: "FUJIFILM", url: "https://www.fujifilm.com/us/en/consumer/films", scope: "brand-catalog" },
  CineStill: { label: "CineStill film catalog", publisher: "CineStill Film", url: "https://cinestillfilm.com/collections/film", scope: "brand-catalog" },
  ADOX: { label: "ADOX films", publisher: "ADOX", url: "https://www.adox.de/Photo/films/", scope: "brand-catalog" },
  Foma: { label: "FOMA photographic films", publisher: "FOMA BOHEMIA", url: "https://www.foma.cz/en/photographic-films", scope: "brand-catalog" },
  Rollei: { label: "Rollei Analog", publisher: "Rollei", url: "https://www.rolleianalog.com/", scope: "brand-catalog" },
  Lomography: { label: "Lomography film catalog", publisher: "Lomography", url: "https://shop.lomography.com/films", scope: "brand-catalog" },
};

const cameraBrandSources: Record<string, SourcePreset> = {
  Canon: { label: "Canon Camera Museum", publisher: "Canon", url: "https://global.canon/en/c-museum/", scope: "brand-catalog" },
  Nikon: { label: "Nikon imaging product archive", publisher: "Nikon", url: "https://imaging.nikon.com/imaging/information/products/", scope: "brand-catalog" },
  Pentax: { label: "PENTAX camera history", publisher: "RICOH IMAGING", url: "https://www.ricoh-imaging.co.jp/english/products/spotlight/archives/", scope: "brand-catalog" },
  Olympus: { label: "Olympus camera museum", publisher: "Olympus", url: "https://www.olympus-global.com/technology/museum/camera/", scope: "brand-catalog" },
  Leica: { label: "Leica photography system", publisher: "Leica Camera", url: "https://leica-camera.com/en-int/photography", scope: "brand-catalog" },
  Polaroid: { label: "Polaroid cameras", publisher: "Polaroid", url: "https://www.polaroid.com/collections/instant-cameras", scope: "brand-catalog" },
  Contax: { label: "Contax camera reference", publisher: "Camera-wiki.org", url: "https://camera-wiki.org/wiki/Contax", scope: "community" },
  Mamiya: { label: "Mamiya camera reference", publisher: "Camera-wiki.org", url: "https://camera-wiki.org/wiki/Mamiya", scope: "community" },
  Hasselblad: { label: "Hasselblad historical reference", publisher: "Hasselblad Historical", url: "https://www.hasselbladhistorical.eu/", scope: "community" },
};

const lensMountSources: Record<string, SourcePreset> = {
  "Canon FD": { label: "Canon Camera Museum — FD lenses", publisher: "Canon", url: "https://global.canon/en/c-museum/series_search.html?t=lens&s=fd", scope: "series" },
  "Canon EF": { label: "Canon Camera Museum — EF lenses", publisher: "Canon", url: "https://global.canon/en/c-museum/series_search.html?t=lens&s=ef", scope: "series" },
  "Nikon F": { label: "NIKKOR lens history", publisher: "Nikon", url: "https://imaging.nikon.com/imaging/information/story/", scope: "series" },
  M42: { label: "M42 lens reference", publisher: "Camera-wiki.org", url: "https://camera-wiki.org/wiki/M42_lens_mount", scope: "community" },
  "Pentax K": { label: "Pentax K-mount lens reviews and reference", publisher: "PentaxForums", url: "https://www.pentaxforums.com/lensreviews/", scope: "community" },
  "Minolta SR": { label: "Minolta SR lens reference", publisher: "Rokkor Files", url: "http://www.rokkorfiles.com/Lenses.html", scope: "community" },
  "Olympus OM": { label: "Olympus OM Zuiko lens reference", publisher: "MIR", url: "https://www.mir.com.my/rb/photography/hardwares/classics/olympusom1n2/shared/zuiko/", scope: "community" },
  "Leica M": { label: "Leica M-Lenses", publisher: "Leica Camera", url: "https://leica-camera.com/en-int/photography/lenses/m", scope: "series" },
  "Contax/Yashica": { label: "Contax/Yashica lens reference", publisher: "Camera-wiki.org", url: "https://camera-wiki.org/wiki/Contax/Yashica", scope: "community" },
  "Mamiya 645": { label: "Mamiya 645 system reference", publisher: "Camera-wiki.org", url: "https://camera-wiki.org/wiki/Mamiya_M645", scope: "community" },
  "Hasselblad V": { label: "Hasselblad V-system reference", publisher: "Hasselblad Historical", url: "https://www.hasselbladhistorical.eu/", scope: "community" },
  "Pentax 67": { label: "Pentax 67 lens reference", publisher: "PentaxForums", url: "https://www.pentaxforums.com/lensreviews/Pentax-67-Lenses-c26.html", scope: "community" },
};

const genericSources = {
  film: source("List of photographic films", "Wikipedia contributors", "https://en.wikipedia.org/wiki/List_of_photographic_films", "community"),
  camera: source("Camera-wiki camera reference", "Camera-wiki.org", "https://camera-wiki.org/wiki/Main_Page", "community"),
  lens: source("Lens database reference", "Lens-DB", "https://lens-db.com/", "community"),
} as const;

const exactSources: Record<string, { provenance: Partial<RecordProvenance>; sources: RecordSource[] }> = {
  "kodak-gold-200": {
    provenance: { confidence: "verified", productStatus: "current", countryOfManufacture: "United States" },
    sources: [source("KODAK GOLD 200 Film", "Eastman Kodak Company", "https://www.kodak.com/en/still-film/product/consumer/gold-200-film/", "model")],
  },
  "kodak-ultramax-400": {
    provenance: { confidence: "verified", productStatus: "current", countryOfManufacture: "United States" },
    sources: [source("KODAK ULTRAMAX 400 Film", "Eastman Kodak Company", "https://www.kodak.com/en/still-film/product/consumer/ultramax-400-film/", "model")],
  },
  "kodak-ektar-100": {
    provenance: { confidence: "verified", productStatus: "current", introducedYear: 2008, countryOfManufacture: "United States" },
    sources: [source("KODAK EKTAR 100 Film", "Eastman Kodak Company", "https://www.kodak.com/en/still-film/product/professional/ektar-100-film/", "model")],
  },
  "kodak-ektapan-100": {
    provenance: {
      confidence: "verified",
      productStatus: "current",
      introducedYear: 2026,
      countryOfManufacture: "United States",
      generation: "EKTAPAN / T-Grain 100-speed family",
      variants: ["KODAK PROFESSIONAL T-MAX 100 (Kodak Alaris-distributed related name/emulsion family)"],
      notes: ["Eastman Kodak introduced the EKTAPAN 100 direct-distribution name in 2026. The sample image is explicitly an emulsion-family reference made on T-MAX 100 rather than an image labelled EKTAPAN 100 at capture time."],
    },
    sources: [source("KODAK EKTAPAN 100 Black & White Negative Film", "Eastman Kodak Company", "https://www.kodak.com/en/still-film/product/professional/ektapan/ektapan-100-film/", "model")],
  },
  "kodak-portra-160": {
    provenance: {
      confidence: "community-reference",
      productStatus: "unknown",
      generation: "Portra / EKTACOLOR PRO 160 emulsion family",
      variants: ["KODAK EKTACOLOR PRO 160 (Eastman Kodak direct-distribution name, 2026)"],
      notes: ["Eastman Kodak introduced EKTACOLOR PRO 160 in 2026 as the direct-distribution counterpart to the familiar Portra 160 emulsion family; Portra-branded inventory may still coexist in the market."],
    },
    sources: [source("KODAK EKTACOLOR PRO 160", "Eastman Kodak Company", "https://www.kodak.com/en/still-film/product/professional/ektacolor/ektacolor-pro-160-film/", "series")],
  },
  "kodak-portra-400": {
    provenance: {
      confidence: "community-reference",
      productStatus: "unknown",
      generation: "Portra / EKTACOLOR PRO 400 emulsion family",
      variants: ["KODAK EKTACOLOR PRO 400 (Eastman Kodak direct-distribution name, 2026)"],
      notes: ["Eastman Kodak introduced EKTACOLOR PRO 400 in 2026 as the direct-distribution counterpart to the familiar Portra 400 emulsion family; Portra-branded inventory may still coexist in the market."],
    },
    sources: [source("KODAK EKTACOLOR PRO 400", "Eastman Kodak Company", "https://www.kodak.com/en/still-film/product/professional/ektacolor/ektacolor-pro-400-film/", "series")],
  },
  "kodak-portra-800": {
    provenance: {
      confidence: "community-reference",
      productStatus: "unknown",
      generation: "Portra / EKTACOLOR PRO 800 emulsion family",
      variants: ["KODAK EKTACOLOR PRO 800 (Eastman Kodak direct-distribution name, 2026)"],
      notes: ["Eastman Kodak introduced EKTACOLOR PRO 800 in 2026 as the direct-distribution counterpart to the familiar Portra 800 emulsion family; Portra-branded inventory may still coexist in the market."],
    },
    sources: [source("KODAK EKTACOLOR PRO 800", "Eastman Kodak Company", "https://www.kodak.com/en/still-film/product/professional/ektacolor/ektacolor-pro-800-film/", "series")],
  },
  "canon-af35ml": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1981, generation: "Canon AF35M / Autoboy autofocus compact series" },
    sources: [source("AF35ML / Super Sure Shot", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film104.html", "model")],
  },
  "canon-af35m-ii": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1983, generation: "Canon AF35M / Autoboy autofocus compact series" },
    sources: [source("AF35M II / (New) Sure Shot / Autoboy 2", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film110.html", "model")],
  },
  "canon-sure-shot-supreme": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1986, generation: "Canon Autoboy / Sure Shot autofocus compact series" },
    sources: [source("Sure Shot Supreme / Autoboy 3 / Top Shot", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film120.html", "model")],
  },
  "canon-sure-shot-tele-max": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1991, generation: "Canon Autoboy Mini / Sure Shot compact series" },
    sources: [source("Sure Shot Tele Max / Autoboy Mini T / Prima Twin S", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film152.html", "model")],
  },
  "canon-autoboy-zoom-105": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1991, generation: "Canon Autoboy Zoom / Sure Shot Mega Zoom series" },
    sources: [source("Autoboy Zoom 105 / Sure Shot Mega Zoom 105", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film146.html", "model")],
  },
  "canon-ae-1": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1976, countryOfManufacture: "Japan", generation: "Canon A-series" },
    sources: [source("AE-1", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film93.html", "model")],
  },
  "canon-a-1": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1978, countryOfManufacture: "Japan", generation: "Canon A-series" },
    sources: [source("A-1", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film100.html", "model")],
  },
  "canon-at-1": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1976, countryOfManufacture: "Japan", generation: "Canon A-series" },
    sources: [source("AT-1", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film96.html", "model")],
  },
  "canon-ef-1973": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1973, countryOfManufacture: "Japan", generation: "Canon FD electronic SLR" },
    sources: [source("EF", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film88.html", "model")],
  },
  "canon-ft-ql": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1966, countryOfManufacture: "Japan", generation: "Canon FL SLR" },
    sources: [source("FTQL", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film62.html", "model")],
  },
  "canon-tlb": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1976, countryOfManufacture: "Japan", generation: "Canon FD manual SLR" },
    sources: [source("TLb", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film94.html", "model")],
  },
  "canon-t50": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1983, countryOfManufacture: "Japan", generation: "Canon T-series" },
    sources: [source("T50", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film109.html", "model")],
  },
  "canon-t70": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1984, countryOfManufacture: "Japan", generation: "Canon T-series" },
    sources: [source("T70", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film112.html", "model")],
  },
  "canon-t80": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1985, countryOfManufacture: "Japan", generation: "Canon T-series autofocus transition" },
    sources: [source("T80", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film115.html", "model")],
  },
  "canon-t60": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1990, countryOfManufacture: "Japan", generation: "Canon T-series" },
    sources: [source("T60", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film143.html", "model")],
  },
  "canon-eos-620": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1987, countryOfManufacture: "Japan", generation: "Canon EOS film SLR" },
    sources: [source("EOS620", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film123.html", "model")],
  },
  "canon-al-1": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1982, countryOfManufacture: "Japan", generation: "Canon A-series focus-assist SLR" },
    sources: [source("AL-1", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film106.html", "model")],
  },
  "canon-p": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1959, countryOfManufacture: "Japan", generation: "Canon screw-mount rangefinder" },
    sources: [source("P (Populaire)", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film37.html", "model")],
  },
  "canonet-ql19": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1965, countryOfManufacture: "Japan", generation: "Canonet QL rangefinder" },
    sources: [source("Canonet QL19", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film54.html", "model")],
  },
  "canonet-giii-19": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1972, countryOfManufacture: "Japan", generation: "Canonet G-III rangefinder" },
    sources: [source("Canonet G-III 19", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film85.html", "model")],
  },
  "nikon-fm3a": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 2001, countryOfManufacture: "Japan", generation: "Nikon FM / FE hybrid lineage" },
    sources: [source("Nikon FM3A Camera Chronicle and major specifications", "Nikon", "https://imaging.nikon.com/imaging/information/chronicle/history-fm3a/", "model")],
  },
  "canon-eos-1v": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 2000, countryOfManufacture: "Japan", generation: "EOS-1 professional film SLR" },
    sources: [source("EOS-1V", "Canon Camera Museum", "https://global.canon/en/c-museum/product/film218.html", "model")],
  },
  "contax-g2": {
    provenance: { confidence: "community-reference", productStatus: "historical", introducedYear: 1996, countryOfManufacture: "Japan", generation: "Contax G autofocus rangefinder system" },
    sources: [source("Contax G system reference", "Camera-wiki.org", "https://camera-wiki.org/wiki/Contax_G", "community")],
  },
  "mamiya-7": {
    provenance: { confidence: "community-reference", productStatus: "historical", introducedYear: 1995, productionYears: { from: 1995, to: 1999 }, countryOfManufacture: "Japan", generation: "Mamiya 7 6×7 rangefinder system" },
    sources: [source("Mamiya 7 specifications", "Camera_DATA", "https://camera-data.com/camera/rangefinder/mamiya/7", "community")],
  },
  "hasselblad-503cw": {
    provenance: { confidence: "verified", productStatus: "historical", introducedYear: 1996, productionYears: { from: 1996, to: 2013 }, countryOfManufacture: "Sweden", generation: "Hasselblad V-system 500 series" },
    sources: [source("Hasselblad 503CW Service Manual", "Hasselblad service documentation mirror", "https://manualzz.com/doc/3204070/hasselblad-500-c-m--501-c--501-cm--503-cw--503-cxi--503-c...", "manual")],
  },
};

function familyMetadata(record: CatalogRecord): Partial<RecordProvenance> {
  if (record.kind === "camera") {
    return {
      introducedYear: record.releaseYear,
      productStatus: record.releaseYear <= 2015 ? "historical" : "unknown",
    };
  }

  if (record.kind === "lens") {
    const generations: Record<string, string> = {
      "Canon FD": "Canon FD manual-focus system",
      "Canon EF": "Canon EF / EOS film-era autofocus system",
      "Nikon F": record.name.includes("AI-S") ? "Nikon AI-S" : "Nikon F",
      M42: record.name.includes("Takumar") ? "Asahi Pentax Super-Takumar / M42" : "M42 screw mount",
      "Pentax K": record.name.includes("Pentax-M") ? "SMC Pentax-M" : "Pentax K",
      "Minolta SR": record.name.includes("MC") ? "Minolta MC" : "Minolta MD / SR",
      "Olympus OM": "Olympus OM-System Zuiko",
      "Leica M": "Leica M",
      "Contax/Yashica": "Contax/Yashica Carl Zeiss T*",
      "Mamiya 645": "Mamiya-Sekor C / M645",
      "Hasselblad V": "Hasselblad V-system / Carl Zeiss",
      "Pentax 67": "Pentax 6x7 / 67 system",
    };
    const japanMounts = new Set(["Canon FD", "Canon EF", "Nikon F", "M42", "Pentax K", "Minolta SR", "Olympus OM", "Mamiya 645", "Pentax 67"]);
    return {
      generation: generations[record.mount],
      productStatus: "historical",
      countryOfManufacture: japanMounts.has(record.mount) ? "Japan (system-family reference; individual production runs may vary)" : undefined,
    };
  }

  return { productStatus: "unknown" };
}

function registrySource(record: CatalogRecord): RecordSource | undefined {
  let preset: SourcePreset | undefined;
  if (record.kind === "film") preset = filmBrandSources[record.brand];
  if (record.kind === "camera") preset = cameraBrandSources[record.brand];
  if (record.kind === "lens") preset = lensMountSources[record.mount];
  if (!preset) return undefined;
  return source(preset.label, preset.publisher, preset.url, preset.scope ?? "brand-catalog");
}

function imageSource(record: CatalogRecord): RecordSource | undefined {
  if (!record.image) return undefined;
  return source(`${record.name} image source`, record.image.sourceName, record.image.sourceUrl, "image");
}

export function withProvenance<T extends CatalogRecord>(record: T): T & { provenance: RecordProvenance } {
  const explicit = exactSources[record.slug];
  const registry = registrySource(record);
  const image = imageSource(record);
  const sources = [
    ...(explicit?.sources ?? []),
    ...(registry ? [registry] : []),
    ...(image ? [image] : []),
  ];

  if (!sources.length) sources.push(genericSources[record.kind]);
  if (!registry && !explicit) sources.push(genericSources[record.kind]);

  const hasReferenceSource = sources.some((item) => item.scope !== "image");
  const hasModelSource = sources.some((item) => item.scope === "model" || item.scope === "manual");
  const defaultConfidence: RecordProvenance["confidence"] = hasModelSource
    ? "verified"
    : hasReferenceSource
      ? "community-reference"
      : "incomplete";

  const provenance: RecordProvenance = {
    confidence: explicit?.provenance.confidence ?? defaultConfidence,
    lastVerified: CATALOG_VERIFIED_ON,
    productStatus: "unknown",
    sources,
    ...familyMetadata(record),
    ...explicit?.provenance,
  };

  return { ...record, provenance };
}
