import type { ImageCredit } from "@/types";

const commonsFile = (name: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}?width=1800`;

const commonsSource = (name: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(name).replaceAll("%20", "_")}`;

const sample = (name: string, creator: string, license: string, alt: string): ImageCredit => ({
  url: commonsFile(name),
  sourceName: "Wikimedia Commons",
  sourceUrl: commonsSource(name),
  creator,
  license,
  attributionRequired: license !== "Public Domain" && license !== "CC0 1.0",
  alt,
});

export const filmSamples: Record<string, ImageCredit[]> = {
  "kodak-portra-400": [sample(
    "九份 Taipei - Portra 400 - Lomo LC-A - Flickr - Toomore.jpg",
    "Toomore Chiang",
    "CC BY 2.0",
    "Jiufen street scene photographed on Kodak Portra 400 with a Lomo LC-A+",
  )],
  "kodak-portra-160": [sample(
    "Kodak Portra 160 - Mamiya 7ii - Flickr - minka6.jpg",
    "minka6",
    "See source page",
    "Hawaii photograph made with a Mamiya 7II on Kodak Portra 160",
  )],
  "kodak-portra-800": [sample(
    "120-Kodak Portra 800-Fish Eye - Marathalli Bridge.jpg",
    "Veera.sj",
    "CC BY-SA 4.0",
    "Night view of Marathalli Bridge photographed on Kodak Portra 800",
  )],
  "kodak-gold-200": [sample(
    "Hay's Mews 2026-05-09.jpg",
    "Tom Page",
    "See source page",
    "Hay's Mews photographed on Kodak Gold 200",
  )],
  "kodak-ektar-100": [sample(
    "2003 BMW Mini Cooper velvet red metallic.jpg",
    "Dennis Bratland",
    "CC BY-SA 3.0",
    "Red Mini Cooper photographed on Kodak Ektar 100",
  )],
  "kodak-colorplus-200": [sample(
    "Ambassador Hotel Kaohsiung 2016-02.jpg",
    "See source page",
    "CC BY 2.0",
    "Ambassador Hotel Kaohsiung photographed on Kodak ColorPlus 200",
  )],
  "kodak-ultramax-400": [sample(
    "2026-05-16 - Stoke Newington railway station - 01.jpg",
    "Tom Page",
    "See source page",
    "Stoke Newington railway station photographed on Kodak UltraMax 400",
  )],
  "ilford-hp5-plus": [sample(
    "Bahnersatzbusse BN Bruennen 170717.jpg",
    "NAC",
    "See source page",
    "Rail replacement buses photographed on Ilford HP5 Plus",
  )],
  "ilford-fp4-plus": [sample(
    "A man with a metal detector (8562058286).jpg",
    "Ivan Bandura",
    "CC BY 2.0",
    "Man with a metal detector photographed on Ilford FP4 Plus",
  )],
  "ilford-delta-400": [sample(
    "1 Catania Piazza Stesicoro 090917 IIIc Summitar 5cm Delta400.jpg",
    "NAC",
    "CC BY-SA 4.0",
    "Piazza Stesicoro photographed on Ilford Delta 400",
  )],
  "cinestill-800t": [sample(
    "Long Exposure at Night of a Road on Cinestill 800T.jpg",
    "Arandomphotographer",
    "See source page",
    "Long-exposure night road photograph made on CineStill 800T",
  )],
  "ilford-delta-100": [sample(
    "1 Saluting battery 080917 Ilford Delta 100.jpg",
    "NAC",
    "CC BY-SA 4.0",
    "Troops at the Saluting Battery photographed on Ilford Delta 100",
  )],
  "ilford-delta-3200": [sample(
    "Locarno Festival 120817 IIIc Elmar9cm Delta3200.jpg",
    "NAC",
    "See source page",
    "Locarno Film Festival photographed on Ilford Delta 3200",
  )],
  "ilford-pan-f-plus": [sample(
    "Backyard fireweed (7842858542).jpg",
    "Anthony DeLorenzo",
    "CC BY 2.0",
    "Backyard fireweed photographed on Ilford Pan F Plus",
  )],
  "kentmere-pan-100": [sample(
    "Desert Highway - Flickr - incidencematrix.jpg",
    "incidencematrix",
    "See source page",
    "Desert highway photographed on Kentmere Pan 100",
  )],
  "kentmere-pan-400": [sample(
    "Borough Market 2025-06-10.jpg",
    "Tom Page",
    "CC BY-SA 4.0",
    "Borough Market photographed on Kentmere Pan 400",
  )],
  "cinestill-400d": [sample(
    "At Costco (52587900878).jpg",
    "Matthew Bellemare",
    "CC BY-SA 2.0",
    "Costco interior photographed on CineStill 400D",
  )],
  "kodak-ektachrome-e100": [sample(
    "Crimean trolleybus 7012 2021-05 Alusta trolleybus station 3.jpg",
    "Artem Svetlov",
    "CC0 1.0",
    "Trolleybus station scene photographed on Kodak Ektachrome 100",
  )],
  "fujifilm-velvia-50": [sample(
    "Velviascene.jpg",
    "TFNorman",
    "Public Domain",
    "Landscape photograph made on Fujifilm Velvia 50",
  )],
  "fomapan-100-classic": [sample(
    "Gajisan Makgeri - BW.jpg",
    "책읽는달팽",
    "See source page",
    "Still-life photograph made with a Mamiya RB67 on Fomapan 100",
  )],
};
