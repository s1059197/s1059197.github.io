import { useState, useEffect } from "react";
import {
  Car,
  Train,
  Plane,
  Bed,
  ChevronDown,
  Mountain,
  Beer,
  Waves,
  Music,
  Castle,
  TreePine,
  MountainSnow,
  Droplets,
  Cookie,
  Clock,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
//  CITIES
// ═══════════════════════════════════════════════════════════════════════════
const cities = {
  munich:         { name: "Munich",         country: "DE", lat: 48.137, lng: 11.575 },
  dachau:         { name: "Dachau",         country: "DE", lat: 48.263, lng: 11.434 },
  salzburg:       { name: "Salzburg",       country: "AT", lat: 47.811, lng: 13.055 },
  eaglesNest:     { name: "Eagle's Nest",   country: "DE", lat: 47.611, lng: 13.041 },
  badToelz:       { name: "Bad Tölz",       country: "DE", lat: 47.761, lng: 11.557 },
  neuschwanstein: { name: "Neuschwanstein", country: "DE", lat: 47.557, lng: 10.750 },
  vaduz:          { name: "Vaduz",          country: "LI", lat: 47.141, lng: 9.521 },
  grindelwald:    { name: "Grindelwald",    country: "CH", lat: 46.624, lng: 8.041 },
  interlaken:     { name: "Interlaken",     country: "CH", lat: 46.686, lng: 7.866 },
  lauterbrunnen:  { name: "Lauterbrunnen",  country: "CH", lat: 46.594, lng: 7.908 },
  gruyeres:       { name: "Gruyères",       country: "CH", lat: 46.583, lng: 7.082 },
  zurich:         { name: "Zürich",         country: "CH", lat: 47.377, lng: 8.541 },
};

// ═══════════════════════════════════════════════════════════════════════════
//  CARTOGRAPHIC FEATURES
// ═══════════════════════════════════════════════════════════════════════════
const lakes = [
  { name: "Bodensee",        points: [[8.85, 47.78], [9.18, 47.81], [9.55, 47.77], [9.7, 47.62], [9.5, 47.55], [9.2, 47.55], [8.95, 47.6], [8.85, 47.7]] },
  { name: "Vierwaldstätter", points: [[8.27, 47.0], [8.4, 47.07], [8.55, 47.05], [8.7, 47.02], [8.62, 46.95], [8.5, 46.94], [8.38, 46.96]] },
  { name: "Zürichsee",       points: [[8.55, 47.37], [8.7, 47.32], [8.85, 47.25], [8.95, 47.2], [8.85, 47.2], [8.72, 47.25], [8.6, 47.32]] },
  { name: "Thunersee",       points: [[7.62, 46.72], [7.75, 46.78], [7.86, 46.71], [7.78, 46.65], [7.68, 46.67]] },
  { name: "Brienzersee",     points: [[7.85, 46.72], [7.98, 46.75], [8.08, 46.73], [8.05, 46.69], [7.92, 46.69]] },
  { name: "Walensee",        points: [[9.07, 47.13], [9.35, 47.13], [9.35, 47.1], [9.07, 47.1]] },
  { name: "Chiemsee",        points: [[12.4, 47.92], [12.55, 47.92], [12.55, 47.8], [12.4, 47.8]] },
  { name: "Königssee",       points: [[12.97, 47.6], [13.0, 47.6], [13.0, 47.5], [12.97, 47.5]] },
];

const mountains = [
  { name: "Watzmann",      lat: 47.55, lng: 12.92 },
  { name: "Zugspitze",     lat: 47.42, lng: 10.98 },
  { name: "Eiger",         lat: 46.58, lng: 8.00 },
  { name: "Jungfrau",      lat: 46.54, lng: 7.96 },
  { name: "Säntis",        lat: 47.25, lng: 9.35 },
  { name: "Piz Bernina",   lat: 46.38, lng: 9.91 },
  { name: "Wildspitze",    lat: 46.88, lng: 10.87 },
  { name: "Allgäuer Alps", lat: 47.40, lng: 10.30 },
];

const countryLabels = [
  { name: "GERMANY",       lat: 48.20, lng: 11.50, size: "large" },
  { name: "AUSTRIA",       lat: 47.35, lng: 12.20, size: "large" },
  { name: "SWITZERLAND",   lat: 46.85, lng: 8.40,  size: "large" },
  { name: "ITALY",         lat: 45.95, lng: 9.50,  size: "medium" },
  { name: "FRANCE",        lat: 46.40, lng: 6.70,  size: "medium" },
  { name: "LIECHTENSTEIN", lat: 47.13, lng: 9.55,  size: "small" },
];

// ═══════════════════════════════════════════════════════════════════════════
//  LINK URLS (kept here to keep schedule readable)
// ═══════════════════════════════════════════════════════════════════════════
const URL_STAY_KOOOK    = "https://www.staykooook.com/munich-city/en/";
const URL_BREAD_MARKET  = "https://www.brotmarkt.com/";
const URL_VIKTUALIEN    = "https://www.viktualienmarkt-muenchen.de/en/home/";
const URL_BMW_WELT      = "https://www.bmw-welt.com/en/index.html";
const URL_PRINZ_MYSHKIN = "https://prinzmyshkin.com/en";
const URL_MIDNIGHT_BAZ  = "https://midnightbazar.de/";
const URL_DACHAU        = "https://www.kz-gedenkstaette-dachau.de/en/";
const URL_NIGHT_WATCH   = "https://www.getyourguide.com/munich-l26/munich-night-watchman-tour-in-english-t867818/?ranking_uuid=17b56102-6eec-461e-b211-2bc8a0a74933&date_from=2026-06-12&date_to=2026-06-13";
const URL_DIGITAL_VIG   = "https://www.google.com/search?q=Digital+Vignette";
const URL_MARIONETTE    = "https://marionetten.at/en/kalender";
const URL_EAGLES_NEST   = "https://destinationwwii.com/truth-about-visiting-hitlers-eagles-nest-berchtesgaden-germany/#what-is-the-eagles-nest-now";
const URL_TEGELBERG     = "https://www.tegelbergbahn.de/de";
const URL_MILCHMANUFAKT = "https://milchmanufaktur.ch/";
const URL_HOTTUBBOAT    = "https://en.pirate-bay.ch/de/hottubboat-mieten/";
const URL_IMBODEN       = "https://www.imboden-bike.ch/en/rental";
const URL_STREETFOOD    = "https://www.myswitzerland.com/en-gb/experiences/events/streetfood-festival-interlaken-ost/";
const URL_BALLET        = "https://www.opernhaus.ch/en/spielplan/calendar/nachttraeume/2025-2026/";
const URL_OUTDOOR_POOLS = "https://www.zuerich.com/en/inform-plan/seasons-and-climate/zurich-in-summer/outdoor-pools-in-zurich";
const URL_TRIP_MAP      = "https://www.google.com/maps/d/u/0/embed?mid=1PuqInIXwNSK81S9gjweqdp8bKKw&z=8&ll=46.71592039526829%2C7.764968446874958";

// ═══════════════════════════════════════════════════════════════════════════
//  DAYS — itinerary
// ═══════════════════════════════════════════════════════════════════════════
const days = [
  {
    number: 1,
    date: "Friday, June 12",
    title: "Arrival in Munich",
    posterLine: "WILLKOMMEN",
    poster: { bg: "#A87528", burst: "#F0E0BC" },
    motif: Beer,
    locations: ["munich"],
    route: null,
    isTravelDay: false,
    sleep: { city: "Munich", hotel: `[Stay Koook](${URL_STAY_KOOOK}) (city)` },
    transport: { mode: "train", label: "S1 + walking" },
    schedule: [
      { time: "AM",    text: "Land at MUC. Complete EES registration at immigration — eat/hydrate on plane." },
      { time: "AM",    text: "S1 train to Hauptbahnhof (~40 min). MVGO group ticket €32.50." },
      { time: "AM",    text: `Drop bags at [Stay Koook](${URL_STAY_KOOOK}) (mobile check-in). REWE quick stop.` },
      { time: "AM",    text: `[Bread Market](${URL_BREAD_MARKET}) — 15 artisan stalls.`, optional: true },
      { time: "11:00", text: "Marienplatz + Glockenspiel show (11 or 12)." },
      { time: "Noon",  text: "New Town Hall Tower or Alter Peter climb (300 steps), Residenz Palace." },
      { time: "Lunch", text: `[Viktualienmarkt](${URL_VIKTUALIEN}) — Munich Soup Kitchen or Caspar Plautz (potato place).` },
      { time: "PM",    text: "Picknweight vintage, Viscardigasse, Kaufingerstrasse, Asamkirche." },
      { time: "PM",    text: `U3 to [BMW Welt Museum](${URL_BMW_WELT}) (closes 6pm, ~1.5 hr).` },
      { time: "PM",    text: "Olympic Tower nearby.", optional: true },
      { time: "19:00", text: `Dinner: [Prinz Myshkin](${URL_PRINZ_MYSHKIN}) (RSVP'd).`, anchor: true },
      { time: "Eve",   text: `[Midnight Bazaar](${URL_MIDNIGHT_BAZ}) flea market + Filipino street food (5pm–midnight).` },
      { time: "Eve",   text: "F1 Exhibition is in the same park as the Bazaar — worth a look.", optional: true },
    ],
    reservations: [
      { name: `[Prinz Myshkin](${URL_PRINZ_MYSHKIN})`,   time: "19:00" },
      { name: `[BMW Welt Museum](${URL_BMW_WELT})`,      time: "Ticket in email" },
    ],
    notes: [
      "EES is new — expect extra time at immigration.",
      "MVGO group ticket (€32.50) covers all city transit today.",
      "Lidl near the hotel — grab breakfast items for the first two mornings.",
      "Bring Ben's college ID for student discounts.",
    ],
  },
  {
    number: 2,
    date: "Saturday, June 13",
    title: "Dachau & Munich",
    posterLine: "REMEMBRANCE · RIVERWAVES",
    poster: { bg: "#3F4F60", burst: "#E8A765" },
    motif: Waves,
    locations: ["dachau", "munich"],
    route: null,
    isTravelDay: false,
    sleep: { city: "Munich", hotel: `[Stay Koook](${URL_STAY_KOOOK}) (city)` },
    transport: { mode: "train", label: "Day ticket M+Zone1" },
    schedule: [
      { time: "AM",     text: "Day ticket via MVGO app — M Zone + Zone 1 covers bus, ~$15." },
      { time: "9:00",   text: `Train to [Dachau Memorial Site](${URL_DACHAU}) (~45 min). Audio guide. Open 9–5.` },
      { time: "Midday", text: "Nymphenburg Palace — gondola rides in the canal." },
      { time: "PM",     text: "English Garden (bike rental), Eisbach surfers, Chinese Tower music." },
      { time: "PM",     text: "NS-Dokumentationszentrum (near hotel).", optional: true },
      { time: "PM",     text: "Alte Pinakothek art museum.", optional: true },
      { time: "PM",     text: "Holareidulijö used clothing near the art museum.", optional: true },
      { time: "18:30",  text: "Dinner: Giorgia Trattoria (WhatsApp reservation).", anchor: true },
      { time: "Eve",    text: "Hofbräuhaus + Mandarin Oriental Mahjong rooftop bar.", optional: true },
      { time: "20:30",  text: `[Night Watchman walking tour](${URL_NIGHT_WATCH}) (English).`, anchor: true },
    ],
    reservations: [
      { name: "Giorgia Trattoria",                              time: "18:30" },
      { name: `[Night Watchman tour](${URL_NIGHT_WATCH})`,      time: "20:30" },
    ],
    notes: [
      "Dachau audio guide recommended — full visit is 3–4 hrs.",
      "Eisbach wave: check tide times for likely surfing.",
    ],
  },
  {
    number: 3,
    date: "Sunday, June 14",
    title: "Salzburg & Eagle's Nest",
    posterLine: "MOZART · MOUNTAINS · MEMORY",
    poster: { bg: "#2A5560", burst: "#E8A765" },
    motif: Music,
    locations: ["munich", "salzburg", "eaglesNest", "badToelz"],
    route: ["munich", "salzburg", "eaglesNest", "badToelz"],
    isTravelDay: true,
    sleep: { city: "Bad Tölz", hotel: "Hotel Bergblick" },
    transport: { mode: "car", label: "Sixt — 8am pickup" },
    driving: {
      total: "~4h 40min",
      km: 305,
      legs: [
        { from: "Munich",       to: "Salzburg",     time: "~2h",     km: 145 },
        { from: "Salzburg",     to: "Eagle's Nest", time: "~40 min", km: 30 },
        { from: "Eagle's Nest", to: "Bad Tölz",     time: "~2h",     km: 130 },
      ],
    },
    schedule: [
      { time: "8:00",   text: "Sixt car pickup. Reservation in email/app.", anchor: true },
      { time: "AM",     text: `Austrian vignette — [digital](${URL_DIGITAL_VIG}) via ASFINAG app OR sticker at border gas station.` },
      { time: "AM",     text: "Drive Munich → Salzburg (~2 hrs)." },
      { time: "Midday", text: "Salzburg Old Town, Mozart sites, Mirabell Gardens." },
      { time: "Midday", text: "Sunday street music in Old Town 10:30–14:30." },
      { time: "Midday", text: `[Salzburg Marionette Theater](${URL_MARIONETTE}) — check calendar.`, optional: true },
      { time: "12:00",  text: "Lunch: Ludwig Burger — RSVP'd for 12:00.", anchor: true },
      { time: "PM",     text: "Getreidegasse + Mozart Birthplace. Konditorei Fürst (pistachio marzipan)." },
      { time: "PM",     text: "Café Tomaselli — oldest coffee house in Austria.", optional: true },
      { time: "PM",     text: "Stiftsbäckerei St Peter (monastery rye)." },
      { time: "PM",     text: "Hohensalzburg Fortress via railway.", optional: true },
      { time: "PM",     text: "Red Bull Hangar 7 (~1 hr).", optional: true },
      { time: "14:00",  text: "⚠ In car by 14:00 — Eagle's Nest drive is 35 min, closes 5pm.", anchor: true },
      { time: "PM",     text: "Sommerrodelbahn Keltenblitz toboggan en route.", optional: true },
      { time: "PM",     text: "Two nearby salt mines with rides + tours.", optional: true },
      { time: "PM",     text: `Eagle's Nest (Kehlsteinhaus). Park at Hintereck, take the bus up. [Background reading](${URL_EAGLES_NEST}).` },
      { time: "Eve",    text: "Drive ~2 hrs to Hotel Bergblick (Bad Tölz)." },
    ],
    reservations: [
      { name: "Sixt car",        time: "08:00 pickup" },
      { name: "Ludwig Burger",   time: "12:00 RSVP" },
      { name: "Hotel Bergblick", time: "Cancel by Jun 6" },
    ],
    notes: [
      "Austrian vignette REQUIRED before crossing border.",
      "Eagle's Nest closes 5pm — last bus from Hintereck is earlier. Be aggressive about timing.",
      "Burger King / McDonald's en route have plant-based options.",
      "Review the Sixt reservation details before pickup.",
    ],
  },
  {
    number: 4,
    date: "Monday, June 15",
    title: "Neuschwanstein & Paragliding",
    posterLine: "FAIRYTALE CASTLES · ALPINE FLIGHT",
    poster: { bg: "#4A4D6E", burst: "#E8A765" },
    motif: Castle,
    locations: ["badToelz", "neuschwanstein", "vaduz"],
    route: ["badToelz", "neuschwanstein", "vaduz"],
    isTravelDay: true,
    sleep: { city: "Vaduz, Liechtenstein", hotel: "Jugendherberge Schaan-Vaduz" },
    transport: { mode: "car", label: "Driving day" },
    driving: {
      total: "~4h",
      km: 310,
      legs: [
        { from: "Bad Tölz",  to: "Tegelberg", time: "~1h 30min", km: 100 },
        { from: "Tegelberg", to: "Vaduz",     time: "~2h 30min", km: 210 },
      ],
    },
    schedule: [
      { time: "8:00",    text: "Breakfast at Bergblick. In car by 9:00." },
      { time: "AM",      text: "Drive 1.5 hrs from Bad Tölz to Tegelberg." },
      { time: "AM",      text: `[Tegelberg Cable Car](${URL_TEGELBERG}) — views or paragliding.` },
      { time: "10:30",   text: "Paragliding slots (also 12:00). Coordinate via WhatsApp.", anchor: true },
      { time: "Midday",  text: "Tegelberg Toboggan Run. Lunch near cable car." },
      { time: "PM",      text: "Neuschwanstein Castle exterior. Marienbrücke viewpoint. Füssen drive-through." },
      { time: "PM",      text: "Highline 179 — longest suspension bridge (15 min back into AT).", optional: true },
      { time: "PM",      text: "Drive ~2 hrs to Vaduz." },
      { time: "PM",      text: "St. Gallen + Appenzeller Schaukäserei (cheese show dairy, 30 min extra).", optional: true },
      { time: "PM",      text: "Berggasthaus Aescher + Wildkirchli (cableway from Wasserauen).", optional: true },
      { time: "Late PM", text: "Vaduz: Liechtenstein Center (passport stamp + Snack Box pickup, closes 5pm), Postal Museum, Kunstmuseum, Castle exterior." },
      { time: "Late PM", text: "Winery of the Prince (closes 6pm).", optional: true },
      { time: "18:30",   text: "Dinner: Brasserie Burg (Simply Thai backup).", anchor: true },
      { time: "Eve",     text: "Alte Rheinbrücke — walk across the border." },
    ],
    reservations: [
      { name: "Paragliding",                 time: "10:30 / 12:00" },
      { name: "Brasserie Burg, Vaduz",       time: "18:30" },
      { name: "Jugendherberge Schaan-Vaduz", time: "Hostel — booked" },
    ],
    notes: [
      "Liechtenstein is NOT in EU — uses Swiss Francs.",
      "Most Vaduz attractions close 5–6pm.",
      "Highline 179 detour returns to AT — vignette still valid.",
    ],
  },
  {
    number: 5,
    date: "Tuesday, June 16",
    title: "Vaduz → Grindelwald",
    posterLine: "ACROSS THE SWISS HEARTLAND",
    poster: { bg: "#3D5C44", burst: "#E8A765" },
    motif: TreePine,
    locations: ["vaduz", "grindelwald"],
    route: ["vaduz", "grindelwald"],
    isTravelDay: true,
    sleep: { city: "Grindelwald", hotel: "AirBnB (4 nights)" },
    transport: { mode: "car", label: "~3 hour drive" },
    driving: {
      total: "~3h",
      km: 230,
      legs: [
        { from: "Vaduz", to: "Grindelwald", time: "~3h", km: 230 },
      ],
    },
    schedule: [
      { time: "AM",   text: "Drive Vaduz → Grindelwald (~3 hrs). Pick 2–3 stops max." },
      { time: "Stop", text: "Rodelbahn Floomzer luge ride.", optional: true },
      { time: "Stop", text: `[Milchmanufaktur Einsiedeln](${URL_MILCHMANUFAKT}) (milk processor).`, optional: true },
      { time: "Stop", text: "Lucerne walk OR Stoos Ridge Trail (4.5 km, 2–3 hrs).", optional: true },
      { time: "Stop", text: "Aare Gorge (Aareschlucht).", optional: true },
      { time: "Stop", text: `[Brienz hot tub boat](${URL_HOTTUBBOAT}).`, optional: true },
      { time: "Stop", text: "Ballenberg Open-Air Museum — Blacknose Sheep in June.", optional: true },
      { time: "Stop", text: "Gelmerbahn + 4.5 km lake hike + Handeckfallbrücke.", optional: true },
      { time: "19:00", text: "Dinner: Barry's (RSVP'd; Basecamp as walk-in backup).", anchor: true },
      { time: "Eve",  text: "Coop near AirBnB — breakfast x4, snacks, maybe Wed lunch + dinners." },
    ],
    reservations: [
      { name: "Barry's (Basecamp backup)", time: "19:00" },
      { name: "Grindelwald AirBnB",        time: "Check-in" },
    ],
    notes: [
      "Swiss motorway vignette REQUIRED (~CHF 40) — separate from Austrian one. Buy at border.",
      "Stock the kitchen — 4 mornings of breakfast saves time and money.",
      "Confirm the Grindelwald apartment check-in time.",
    ],
  },
  {
    number: 6,
    date: "Wednesday, June 17",
    title: "Grindelwald First",
    posterLine: "TOP OF ADVENTURE",
    poster: { bg: "#B85A2D", burst: "#F5C56A" },
    motif: MountainSnow,
    locations: ["grindelwald"],
    route: null,
    isTravelDay: false,
    sleep: { city: "Grindelwald", hotel: "AirBnB" },
    transport: { mode: "car", label: "Gondolas + cable cars" },
    schedule: [
      { time: "8:00",  text: "Gondolas open. 30-min ride to top. Coffee en route." },
      { time: "AM",    text: "Grindelwald First — Top of Adventure." },
      { time: "AM",    text: "First Flyer + Glider + Mountain Cart + Trottibike (confirm tickets)." },
      { time: "12:00", text: "AlpinBort lunch (requested via Gmail — confirm).", anchor: true },
      { time: "PM",    text: "Männlichen cable car — look for the Ricola Karaoke gondola." },
      { time: "PM",    text: "Gondola to Wengen + drink at Hotel Belvedere.", optional: true },
      { time: "19:00", text: "Dinner: Golden India.", anchor: true },
    ],
    reservations: [
      { name: "AlpinBort lunch", time: "12:00 (requested)" },
      { name: "Golden India",    time: "19:00" },
    ],
    notes: [
      "First Flyer is weather-dependent — check before riding up.",
      "Ricola Karaoke gondola is a specific car on the Männlichen line — random luck.",
    ],
  },
  {
    number: 7,
    date: "Thursday, June 18",
    title: "Canyoning & Lauterbrunnen",
    posterLine: "DEEP IN THE GORGE",
    poster: { bg: "#1E5963", burst: "#E8A765" },
    motif: Droplets,
    locations: ["interlaken", "lauterbrunnen", "grindelwald"],
    route: null,
    isTravelDay: false,
    sleep: { city: "Grindelwald", hotel: "AirBnB" },
    transport: { mode: "car", label: "Short drives" },
    driving: {
      total: "~1h 30min total",
      km: 50,
      legs: [
        { from: "Grindelwald",   to: "Wilderswil",    time: "22 min",  km: 22 },
        { from: "Wilderswil",    to: "Lauterbrunnen", time: "15 min",  km: 12 },
        { from: "Lauterbrunnen", to: "Grindelwald",   time: "~40 min", km: 30 },
      ],
    },
    schedule: [
      { time: "AM",     text: "Drive 22 min Grindelwald → Wilderswil. Arrive 10 min early." },
      { time: "10:15",  text: "Canyoning — Outdoor Interlaken, Industriestrasse 17, Wilderswil.", anchor: true },
      { time: "13:15",  text: "Canyoning ends (3 hrs total)." },
      { time: "Lunch",  text: "Flavours or AirTime Cafe (near bike rental)." },
      { time: "PM",     text: "Drive 15 min to Lauterbrunnen Valley — fairytale villages, waterfalls." },
      { time: "PM",     text: `[Imboden bike rental](${URL_IMBODEN}) (#103113). Valley floor → Stechelberg.`, optional: true },
      { time: "PM",     text: "Cheese vending machines along the route (~2 hrs total).", optional: true },
      { time: "Dinner", text: "Onkel Tom's — no reservations, may be busy." },
    ],
    reservations: [
      { name: "Canyoning",                              time: "10:15" },
      { name: `[Imboden bikes](${URL_IMBODEN})`,        time: "#103113" },
    ],
    notes: [
      "Canyoning is OUTDOOR + WEATHER-DEPENDENT — have a backup (Trümmelbach Falls, Aareschlucht).",
      "Onkel Tom's: arrive at opening to avoid the wait.",
    ],
  },
  {
    number: 8,
    date: "Friday, June 19",
    title: "Chocolate, Cheese, Gruyères",
    posterLine: "CHOCOLATE TRAIL · CHEESE COUNTRY",
    poster: { bg: "#6B4226", burst: "#E8A765" },
    motif: Cookie,
    locations: ["grindelwald", "gruyeres"],
    route: ["grindelwald", "gruyeres", "grindelwald"],
    isTravelDay: true,
    sleep: { city: "Grindelwald", hotel: "AirBnB" },
    transport: { mode: "car", label: "Round trip (~4h driving)" },
    driving: {
      total: "~4h 30min round trip",
      km: 260,
      legs: [
        { from: "Grindelwald",    to: "Maison Cailler", time: "~2h",   km: 130 },
        { from: "Maison Cailler", to: "Gruyères",       time: "5 min", km: 5 },
        { from: "Gruyères",       to: "Grindelwald",    time: "~2h",   km: 125 },
      ],
    },
    schedule: [
      { time: "AM",     text: "Breakfast in the car. Coffee to go." },
      { time: "8:45",   text: "Leave by 8:45 for the 10:30 chocolate ticket.", anchor: true },
      { time: "10:30",  text: "Maison Cailler Chocolate Factory — ticket #1606386.", anchor: true },
      { time: "Midday", text: "La Maison du Gruyère cheese factory." },
      { time: "Midday", text: "5-min drive to Gruyères downtown." },
      { time: "PM",     text: "HR Giger Museum & Bar (alien-themed).", optional: true },
      { time: "PM",     text: "La Combaz d'Amont — Valois Blacknose Sheep BnB (20 min away).", optional: true },
      { time: "PM",     text: "Gstaad detour on the way back.", optional: true },
      { time: "Eve",    text: `[Interlaken Street Food Festival](${URL_STREETFOOD}) (Jun 19–21) — music + 45 stalls.`, optional: true },
    ],
    reservations: [
      { name: "Maison Cailler", time: "10:30 (#1606386)" },
    ],
    notes: [
      "Long driving day — ~2 hrs each way. Pack snacks.",
      "Maison Cailler ticket is timed — being late = no entry.",
      "Hit Interlaken food festival on the drive back if energy holds.",
    ],
  },
  {
    number: 9,
    date: "Saturday, June 20",
    title: "Grindelwald → Zürich",
    posterLine: "LAKES · LIMMAT · LAST NIGHT",
    poster: { bg: "#5C4258", burst: "#E8A765" },
    motif: Clock,
    locations: ["grindelwald", "zurich"],
    route: ["grindelwald", "zurich"],
    isTravelDay: true,
    sleep: { city: "Zürich", hotel: "Mama Shelter (2 rooms)" },
    transport: { mode: "car", label: "Drive + drop car" },
    driving: {
      total: "~3h with Lucerne stop",
      km: 220,
      legs: [
        { from: "Grindelwald", to: "Lucerne", time: "~1h 30min", km: 100 },
        { from: "Lucerne",     to: "Zürich",  time: "~1h",       km: 55 },
      ],
    },
    schedule: [
      { time: "AM",     text: "Kambly Experience Shop (cracker/biscuit) — just north of Interlaken.", optional: true },
      { time: "Midday", text: "Drive through Lucerne — walk Chapel Bridge." },
      { time: "Midday", text: "Lucerne extras: Amorino Gelato (only branch on route) + Lindt factory outlet near Chapel Bridge.", optional: true },
      { time: "PM",     text: "Arrive Zürich. Drop car." },
      { time: "PM",     text: "Left Hand Promenade on the Limmat — local music + buskers." },
      { time: "PM",     text: "Beyer Clock & Watch Museum.", optional: true },
      { time: "PM",     text: "Museum Rietberg art collection.", optional: true },
      { time: "PM",     text: "Chinese Garden + Le Corbusier Pavilion.", optional: true },
      { time: "PM",     text: "Augustinergasse walk, FABRIKAT pen store.", optional: true },
      { time: "PM",     text: "Polybahn funicular to ETH for panoramic views.", optional: true },
      { time: "19:00",  text: "Dinner: Haus Hiltl (reservation in email).", anchor: true },
      { time: "Eve",    text: `[Absurdist Ballet at Opernhaus](${URL_BALLET}).`, optional: true },
      { time: "Eve",    text: `[Outdoor pools](${URL_OUTDOOR_POOLS}).`, optional: true },
    ],
    reservations: [
      { name: "Haus Hiltl",   time: "19:00" },
      { name: "Mama Shelter", time: "2 rooms — booked direct" },
    ],
    notes: [
      "Zürich is dense — pick 2–3 stops max before dinner.",
      "Return rental car — confirm Sixt drop-off and fuel policy.",
    ],
  },
  {
    number: 10,
    date: "Sunday, June 21",
    title: "Zürich → Home",
    posterLine: "AUF WIEDERSEHEN",
    poster: { bg: "#45525E", burst: "#E8A765" },
    motif: Plane,
    locations: ["zurich"],
    route: null,
    isTravelDay: false,
    sleep: { city: "Home", hotel: "—" },
    transport: { mode: "plane", label: "Flight 13:20 · AA OIWHWD" },
    schedule: [
      { time: "AM",    text: "Light Zürich morning — Polybahn, Limmat walk, coffee + pastries." },
      { time: "11:00", text: "Head to ZRH airport (~2 hrs+ before international flight)." },
      { time: "13:20", text: "Flight departs.", anchor: true },
    ],
    reservations: [
      { name: "Flight", time: "13:20 (AA OIWHWD)" },
    ],
    notes: [
      "Confirm American Airlines vegetarian meal ordering for the home leg (conf. OIWHWD).",
      "AA carry-on limit 22×14×9 in — CVG flight is a 737-800 (3-3 seating).",
      "International check-in: allow 2 hrs minimum at ZRH.",
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
//  RICH TEXT — parses [text](url) markdown links into anchor tags
// ═══════════════════════════════════════════════════════════════════════════
function RichText({ text }) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={`l-${key++}`}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "var(--accent)",
          textDecoration: "underline",
          textDecorationThickness: "1px",
          textUnderlineOffset: "2px",
        }}
      >
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

// ═══════════════════════════════════════════════════════════════════════════
//  MAP PROJECTION
// ═══════════════════════════════════════════════════════════════════════════
function getBoundsForDay(day) {
  const ids = day.route || day.locations;
  const coords = ids.map((id) => cities[id]);
  const lats = coords.map((c) => c.lat);
  const lngs = coords.map((c) => c.lng);

  let west = Math.min(...lngs);
  let east = Math.max(...lngs);
  let south = Math.min(...lats);
  let north = Math.max(...lats);

  if (east - west < 0.8) {
    const cx = (east + west) / 2;
    east = cx + 0.8;
    west = cx - 0.8;
  }
  if (north - south < 0.5) {
    const cy = (north + south) / 2;
    north = cy + 0.5;
    south = cy - 0.5;
  }

  const padX = (east - west) * 0.30;
  const padY = (north - south) * 0.40;
  return {
    west:  west  - padX,
    east:  east  + padX,
    south: south - padY,
    north: north + padY,
  };
}

function project(lat, lng, bounds, w, h) {
  const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * w;
  const y = ((bounds.north - lat) / (bounds.north - bounds.south)) * h;
  return { x, y };
}

function inBounds(lat, lng, bounds) {
  return lng >= bounds.west && lng <= bounds.east && lat >= bounds.south && lat <= bounds.north;
}

// ═══════════════════════════════════════════════════════════════════════════
//  DAY MAP
// ═══════════════════════════════════════════════════════════════════════════
function DayMap({ day }) {
  const W = 800;
  const H = 500;
  const bounds = getBoundsForDay(day);
  const dayCityIds = new Set(day.locations);

  const visibleLakes = lakes.filter((lake) =>
    lake.points.some(([lng, lat]) => inBounds(lat, lng, bounds))
  );
  const visibleMountains = mountains.filter((m) => inBounds(m.lat, m.lng, bounds));
  const visibleCountries = countryLabels.filter((c) => inBounds(c.lat, c.lng, bounds));

  const contextDots = Object.entries(cities)
    .filter(([id]) => !dayCityIds.has(id))
    .filter(([, c]) => inBounds(c.lat, c.lng, bounds))
    .map(([id, c]) => {
      const { x, y } = project(c.lat, c.lng, bounds, W, H);
      return { id, c, x, y };
    });

  const primaryMarkers = day.locations.map((id) => {
    const c = cities[id];
    const { x, y } = project(c.lat, c.lng, bounds, W, H);
    return { id, c, x, y };
  });

  let routePts = null;
  if (day.route && day.route.length > 1) {
    routePts = day.route.map((id) => {
      const c = cities[id];
      return project(c.lat, c.lng, bounds, W, H);
    });
  }

  const kmPerPxLng = 76 * Math.cos(47 * Math.PI / 180) / (W / (bounds.east - bounds.west));
  const scale50km = 50 / kmPerPxLng;

  const countrySize = { large: 22, medium: 16, small: 11 };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        border: "1px solid var(--ink)",
        boxShadow: "0 0 0 4px var(--paper), 0 0 0 5px var(--ink-faint)",
        backgroundColor: "var(--paper-map)",
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full h-auto"
        aria-label={`Map for day ${day.number}`}
      >
        <defs>
          <pattern id={`mapPaper-${day.number}`} patternUnits="userSpaceOnUse" width="8" height="8">
            <rect width="8" height="8" fill="var(--paper-map)" />
            <circle cx="2" cy="3" r="0.35" fill="var(--ink-faint)" opacity="0.5" />
            <circle cx="6" cy="6" r="0.3"  fill="var(--ink-faint)" opacity="0.4" />
            <circle cx="4" cy="1" r="0.25" fill="var(--ink-faint)" opacity="0.5" />
          </pattern>

          <filter id={`rough-${day.number}`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="0.9" />
          </filter>

          <filter id={`roughHeavy-${day.number}`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="1.6" />
          </filter>

          <pattern id={`water-${day.number}`} patternUnits="userSpaceOnUse" width="6" height="6">
            <rect width="6" height="6" fill="var(--lake)" />
            <path d="M0,3 Q1.5,2 3,3 T6,3" stroke="var(--lake-stroke)" strokeWidth="0.3" fill="none" opacity="0.6" />
          </pattern>
        </defs>

        <rect x="0" y="0" width={W} height={H} fill={`url(#mapPaper-${day.number})`} />

        <g stroke="var(--ink-faintest)" strokeWidth="0.4" fill="none" opacity="0.8">
          {[0.2, 0.4, 0.6, 0.8].map((t) => (
            <line key={`h${t}`} x1="0" y1={H * t} x2={W} y2={H * t} strokeDasharray="2 4" />
          ))}
          {[0.2, 0.4, 0.6, 0.8].map((t) => (
            <line key={`v${t}`} x1={W * t} y1="0" x2={W * t} y2={H} strokeDasharray="2 4" />
          ))}
        </g>

        {visibleCountries.map((c) => {
          const { x, y } = project(c.lat, c.lng, bounds, W, H);
          return (
            <text
              key={c.name}
              x={x}
              y={y}
              textAnchor="middle"
              fontSize={countrySize[c.size]}
              fill="var(--ink-faint)"
              fontFamily="'Bebas Neue', sans-serif"
              letterSpacing="0.25em"
              opacity="0.7"
            >
              {c.name}
            </text>
          );
        })}

        {visibleLakes.map((lake) => {
          const pts = lake.points.map(([lng, lat]) => project(lat, lng, bounds, W, H));
          const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";
          const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
          const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
          return (
            <g key={lake.name}>
              <path d={path} fill={`url(#water-${day.number})`} stroke="var(--lake-stroke)" strokeWidth="0.8" filter={`url(#rough-${day.number})`} />
              <text
                x={cx}
                y={cy + 3}
                textAnchor="middle"
                fontSize="9"
                fill="var(--lake-stroke)"
                fontFamily="'Spectral', serif"
                fontStyle="italic"
                opacity="0.85"
              >
                {lake.name}
              </text>
            </g>
          );
        })}

        {visibleMountains.map((m) => {
          const { x, y } = project(m.lat, m.lng, bounds, W, H);
          return (
            <g key={m.name}>
              <path
                d={`M${x - 7},${y + 4} L${x},${y - 8} L${x + 7},${y + 4} Z`}
                fill="none"
                stroke="var(--ink-muted)"
                strokeWidth="0.9"
                filter={`url(#rough-${day.number})`}
              />
              <path
                d={`M${x - 3.5},${y - 2} L${x},${y - 8} L${x + 3.5},${y - 2}`}
                fill="var(--ink-muted)"
                opacity="0.5"
              />
              <text
                x={x}
                y={y + 14}
                textAnchor="middle"
                fontSize="7"
                fill="var(--ink-muted)"
                fontFamily="'Spectral', serif"
                fontStyle="italic"
                opacity="0.75"
              >
                {m.name}
              </text>
            </g>
          );
        })}

        {contextDots.map(({ id, c, x, y }) => (
          <g key={id} opacity="0.5">
            <circle cx={x} cy={y} r="2.5" fill="none" stroke="var(--ink-muted)" strokeWidth="0.7" />
            <text
              x={x + 6}
              y={y + 3}
              fontSize="10"
              fill="var(--ink-muted)"
              fontFamily="'Spectral', serif"
            >
              {c.name}
            </text>
          </g>
        ))}

        {routePts && (
          <g>
            <path
              d={routePts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
              stroke="var(--accent)"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="7 4"
              filter={`url(#roughHeavy-${day.number})`}
              opacity="0.9"
            />
            {routePts.slice(0, -1).map((p, i) => {
              const next = routePts[i + 1];
              const mx = (p.x + next.x) / 2;
              const my = (p.y + next.y) / 2;
              const angle = Math.atan2(next.y - p.y, next.x - p.x) * 180 / Math.PI;
              return (
                <g key={i} transform={`translate(${mx}, ${my}) rotate(${angle})`}>
                  <path d="M-6,-4 L0,0 L-6,4" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1" />
                </g>
              );
            })}
          </g>
        )}

        {primaryMarkers.map(({ id, c, x, y }) => (
          <g key={id}>
            <circle cx={x} cy={y} r="14" fill="var(--accent)" opacity="0.12" />
            <circle cx={x} cy={y} r="9" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
            <circle cx={x} cy={y} r="4.5" fill="var(--accent)" stroke="var(--paper)" strokeWidth="1.5" />
            <g transform={`translate(${x + 12}, ${y - 12})`}>
              <text
                fontSize="14"
                fontWeight="700"
                fill="var(--ink)"
                fontFamily="'Bebas Neue', sans-serif"
                letterSpacing="0.06em"
              >
                {c.name.toUpperCase()}
              </text>
              <text
                y="11"
                fontSize="8.5"
                fill="var(--ink-muted)"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="0.15em"
              >
                {c.country} · {c.lat.toFixed(2)}°N
              </text>
            </g>
          </g>
        ))}

        <g transform={`translate(${W - 58}, 50)`} opacity="0.75">
          <circle cx="0" cy="0" r="24" fill="var(--paper)" stroke="var(--ink)" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="18" fill="none" stroke="var(--ink-muted)" strokeWidth="0.4" />
          <path d="M0,-20 L4,0 L0,20 L-4,0 Z" fill="var(--ink)" />
          <path d="M0,-20 L4,0 L0,0 Z" fill="var(--accent)" />
          <text x="0" y="-28" textAnchor="middle" fontSize="10" fill="var(--ink)" fontFamily="'Bebas Neue', sans-serif" letterSpacing="0.1em">N</text>
          <text x="0" y="36" textAnchor="middle" fontSize="9" fill="var(--ink-muted)" fontFamily="'Bebas Neue', sans-serif">S</text>
          <text x="-32" y="3" textAnchor="middle" fontSize="9" fill="var(--ink-muted)" fontFamily="'Bebas Neue', sans-serif">W</text>
          <text x="32" y="3" textAnchor="middle" fontSize="9" fill="var(--ink-muted)" fontFamily="'Bebas Neue', sans-serif">E</text>
        </g>

        <g transform={`translate(40, ${H - 35})`}>
          <line x1="0" y1="0" x2={scale50km} y2="0" stroke="var(--ink)" strokeWidth="1.5" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="var(--ink)" strokeWidth="1.5" />
          <line x1={scale50km} y1="-4" x2={scale50km} y2="4" stroke="var(--ink)" strokeWidth="1.5" />
          <line x1={scale50km / 2} y1="-3" x2={scale50km / 2} y2="3" stroke="var(--ink)" strokeWidth="1" />
          <text x={scale50km / 2} y="-8" textAnchor="middle" fontSize="9" fill="var(--ink)" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.1em">
            50 KM
          </text>
        </g>

        <g transform="translate(40, 40)">
          <rect x="0" y="0" width="135" height="44" fill="var(--paper)" stroke="var(--ink)" strokeWidth="0.8" />
          <rect x="3" y="3" width="129" height="38" fill="none" stroke="var(--ink)" strokeWidth="0.4" />
          <text x="68" y="18" textAnchor="middle" fontSize="9" fill="var(--ink-muted)" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.25em">
            DAY {day.number.toString().padStart(2, "0")}
          </text>
          <text x="68" y="35" textAnchor="middle" fontSize="13" fill="var(--ink)" fontFamily="'Bebas Neue', sans-serif" letterSpacing="0.1em">
            {day.isTravelDay && day.driving ? day.driving.km + " KM" : "STATIONARY"}
          </text>
        </g>
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  POSTER BANNER — uses per-day colors and motif
// ═══════════════════════════════════════════════════════════════════════════
function PosterBanner({ day }) {
  const bg = day.poster?.bg || "#2A5560";
  const burst = day.poster?.burst || "#E8A765";
  const Motif = day.motif;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundColor: bg,
        color: "var(--paper)",
        border: "1px solid var(--ink)",
        boxShadow: "0 0 0 4px var(--paper), 0 0 0 5px var(--ink-faint)",
      }}
    >
      {/* sunburst */}
      <svg
        className="absolute"
        style={{ right: "-60px", top: "-40px", width: "260px", height: "260px", opacity: 0.22 }}
        viewBox="0 0 200 200"
      >
        <g transform="translate(100,100)">
          {Array.from({ length: 24 }).map((_, i) => (
            <path
              key={i}
              d="M0,0 L4,-90 L-4,-90 Z"
              fill={burst}
              transform={`rotate(${i * 15})`}
            />
          ))}
          <circle r="34" fill={burst} />
        </g>
      </svg>

      {/* mountain silhouette */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 800 100"
        preserveAspectRatio="none"
        style={{ height: "80px", opacity: 0.25 }}
      >
        <path
          d="M0,100 L0,70 L80,40 L140,55 L210,20 L290,50 L360,30 L440,60 L520,25 L600,55 L680,35 L760,60 L800,45 L800,100 Z"
          fill="var(--paper)"
        />
        <path
          d="M0,100 L0,82 L60,65 L130,75 L200,55 L280,72 L350,60 L430,78 L510,58 L590,76 L670,62 L750,80 L800,70 L800,100 Z"
          fill="var(--paper)"
          opacity="0.5"
        />
      </svg>

      <div className="relative px-5 sm:px-8 py-6 sm:py-10">
        <div
          className="text-[0.65rem] sm:text-xs mb-1 sm:mb-2"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: "var(--paper)",
            letterSpacing: "0.3em",
          }}
        >
          —— DAY {day.number.toString().padStart(2, "0")} · {day.date.toUpperCase()} ——
        </div>
        <h2
          className="leading-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 8vw, 4.5rem)",
            letterSpacing: "0.02em",
            color: "var(--paper)",
            textShadow: "2px 2px 0 var(--ink)",
          }}
        >
          {day.title.toUpperCase()}
        </h2>
        <div
          className="mt-3 text-xs sm:text-sm opacity-90 flex items-center gap-2"
          style={{ fontFamily: "'Bebas Neue', sans-serif", color: "var(--paper)", letterSpacing: "0.25em" }}
        >
          {Motif && <Motif size={16} style={{ opacity: 0.9 }} />}
          <span>{day.posterLine}</span>
        </div>

        <div className="flex gap-1.5 mt-4">
          {Array.from(new Set(day.locations.map((id) => cities[id].country))).map((cc) => (
            <span
              key={cc}
              className="px-2 py-0.5 text-xs"
              style={{
                backgroundColor: "var(--paper)",
                color: "var(--ink)",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.15em",
              }}
            >
              {cc}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  TRANSPORT ICON
// ═══════════════════════════════════════════════════════════════════════════
function transportIcon(mode, size = 13) {
  const props = { size, className: "shrink-0" };
  switch (mode) {
    case "car":   return <Car {...props} />;
    case "train": return <Train {...props} />;
    case "plane": return <Plane {...props} />;
    default:      return <Car {...props} />;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  SCHEDULE LIST
// ═══════════════════════════════════════════════════════════════════════════
function ScheduleList({ schedule }) {
  return (
    <ol className="space-y-0">
      {schedule.map((item, i) => {
        const isOptional = item.optional;
        const isAnchor = item.anchor;
        return (
          <li
            key={i}
            className="flex gap-3 sm:gap-4 py-2.5"
            style={{ borderBottom: "1px dashed var(--ink-faintest)" }}
          >
            <div
              className="shrink-0 w-14 sm:w-16 text-xs pt-0.5"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: isAnchor ? "var(--accent)" : isOptional ? "var(--ink-faint)" : "var(--ink-muted)",
                fontWeight: isAnchor ? 600 : 400,
                letterSpacing: "0.05em",
              }}
            >
              {item.time}
            </div>
            <div className="flex-1 flex items-start gap-2">
              {isOptional && (
                <span
                  className="shrink-0 mt-0.5"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "var(--ink-faint)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.15em",
                    border: "1px solid var(--ink-faint)",
                    padding: "1px 4px",
                  }}
                >
                  OPT
                </span>
              )}
              <div
                className="flex-1 text-sm leading-relaxed"
                style={{
                  color: isOptional ? "var(--ink-muted)" : "var(--ink)",
                  fontStyle: isOptional ? "italic" : "normal",
                  fontFamily: "'Spectral', serif",
                  fontWeight: isAnchor ? 600 : 400,
                }}
              >
                <RichText text={item.text} />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  SECTION LABEL
// ═══════════════════════════════════════════════════════════════════════════
function SectionLabel({ children }) {
  return (
    <div
      className="mb-3 pb-1.5"
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        letterSpacing: "0.3em",
        fontSize: "0.8rem",
        color: "var(--ink)",
        borderBottom: "2px solid var(--ink)",
      }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  DAY BODY
// ═══════════════════════════════════════════════════════════════════════════
function DayBody({ day }) {
  return (
    <div className="space-y-6 sm:space-y-8 mt-5 sm:mt-7">
      <PosterBanner day={day} />

      <DayMap day={day} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        <div className="lg:col-span-3">
          <SectionLabel>Itinerary</SectionLabel>
          <ScheduleList schedule={day.schedule} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div>
            <SectionLabel>Reservations</SectionLabel>
            <ul className="space-y-2.5">
              {day.reservations.map((r, i) => (
                <li key={i} className="flex justify-between items-baseline gap-3 text-sm">
                  <span style={{ fontFamily: "'Spectral', serif", color: "var(--ink)" }}>
                    <RichText text={r.name} />
                  </span>
                  <span
                    className="shrink-0 text-right text-xs"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "var(--ink-muted)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {r.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {day.driving && (
            <div>
              <SectionLabel>Driving</SectionLabel>
              <div className="mb-3 flex items-baseline gap-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                <span style={{ fontSize: "1.5rem", color: "var(--accent)", letterSpacing: "0.04em" }}>{day.driving.total}</span>
                <span style={{ fontSize: "0.95rem", color: "var(--ink-muted)", letterSpacing: "0.12em" }}>· {day.driving.km} KM</span>
              </div>
              <ul className="space-y-1.5 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--ink-muted)" }}>
                {day.driving.legs.map((leg, i) => (
                  <li key={i} className="flex justify-between gap-2">
                    <span>{leg.from} → {leg.to}</span>
                    <span style={{ color: "var(--ink)" }}>{leg.time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 text-xs italic" style={{ color: "var(--ink-faint)", fontFamily: "'Spectral', serif" }}>
                Estimates — confirm before departing.
              </div>
            </div>
          )}

          {day.notes.length > 0 && (
            <div>
              <SectionLabel>Notes</SectionLabel>
              <ul className="space-y-2">
                {day.notes.map((n, i) => (
                  <li
                    key={i}
                    className="text-sm leading-relaxed flex gap-2"
                    style={{ fontFamily: "'Spectral', serif", color: "var(--ink)" }}
                  >
                    <span style={{ color: "var(--accent)" }}>✦</span>
                    <span><RichText text={n} /></span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <SectionLabel>Sleeping</SectionLabel>
            <div style={{ fontFamily: "'Spectral', serif" }}>
              <div className="text-base" style={{ color: "var(--ink)", fontWeight: 600 }}>
                <RichText text={day.sleep.hotel} />
              </div>
              <div className="text-sm" style={{ color: "var(--ink-muted)" }}>{day.sleep.city}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  DAY CARD (accordion item)
// ═══════════════════════════════════════════════════════════════════════════
function DayCard({ day, isOpen, onToggle }) {
  return (
    <div
      style={{
        backgroundColor: "var(--paper)",
        border: isOpen ? "2px solid var(--ink)" : "1px solid var(--ink-faint)",
        transition: "border-color 0.2s",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left flex items-stretch gap-0"
        aria-expanded={isOpen}
      >
        <div
          className="shrink-0 flex flex-col items-center justify-center px-3 sm:px-4 py-3 sm:py-4"
          style={{
            backgroundColor: isOpen ? "var(--accent)" : "var(--ink)",
            color: "var(--paper)",
            minWidth: "68px",
            transition: "background-color 0.2s",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.25em",
              opacity: 0.75,
            }}
          >
            DAY
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "2.25rem",
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            {day.number.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="flex-1 px-3 sm:px-5 py-3 sm:py-4 min-w-0">
          <div
            className="mb-0.5"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "var(--ink-muted)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            {day.date}
          </div>
          <div
            className="leading-tight truncate"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.4rem",
              color: "var(--ink)",
              letterSpacing: "0.02em",
            }}
          >
            {day.title.toUpperCase()}
          </div>
          <div
            className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-xs"
            style={{ color: "var(--ink-muted)", fontFamily: "'Spectral', serif" }}
          >
            <span className="flex items-center gap-1">
              <Bed size={11} className="shrink-0" />
              <span>{day.sleep.city}</span>
            </span>
            <span className="flex items-center gap-1">
              {transportIcon(day.transport.mode, 11)}
              <span className="truncate">{day.transport.label}</span>
            </span>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-end justify-center gap-1.5 px-3 sm:px-4 py-3">
          {day.isTravelDay && (
            <div
              className="px-1.5 py-0.5"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
              }}
            >
              TRANSIT
            </div>
          )}
          <ChevronDown
            size={20}
            style={{
              color: "var(--ink-muted)",
              transform: isOpen ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.2s",
            }}
          />
        </div>
      </button>

      {isOpen && (
        <div
          className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
          style={{ borderTop: "1px solid var(--ink-faint)" }}
        >
          <DayBody day={day} />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  PAGE HEADER (tagline lines removed, space tightened)
// ═══════════════════════════════════════════════════════════════════════════
function PageHeader() {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--ink)" }} />
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: "var(--ink)",
          }}
        >
          ◆ THE WITTMER GRAND TOUR · MMXXVI ◆
        </div>
        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--ink)" }} />
      </div>

      <div className="text-center">
        <div
          className="mb-2"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "0.95rem",
            letterSpacing: "0.4em",
            color: "var(--ink-muted)",
          }}
        >
          JUNE ELEVEN — TWENTY-ONE
        </div>
        <h1
          className="leading-[0.85]"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.5rem, 10vw, 5.5rem)",
            letterSpacing: "0.01em",
            color: "var(--ink)",
          }}
        >
          GERMANY · AUSTRIA
        </h1>
        <h1
          className="leading-[0.85] mt-1"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.5rem, 10vw, 5.5rem)",
            letterSpacing: "0.01em",
            color: "var(--accent)",
          }}
        >
          LIECHTENSTEIN · SWITZERLAND
        </h1>
      </div>

      <div className="flex items-center gap-3 mt-5">
        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--ink)" }} />
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: "var(--ink)",
          }}
        >
          ◆ ◆ ◆
        </div>
        <div style={{ flex: 1, height: "1px", backgroundColor: "var(--ink)" }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  ROOT
// ═══════════════════════════════════════════════════════════════════════════
export default function TripDashboard() {
  const [openDay, setOpenDay] = useState(null);

  useEffect(() => {
    if (document.getElementById("trip-fonts")) return;
    const link = document.createElement("link");
    link.id = "trip-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        "--paper":        "#F0E6D2",
        "--paper-deep":   "#E5D9BD",
        "--paper-map":    "#EFE3C7",
        "--ink":          "#1F1812",
        "--ink-muted":    "#6B5847",
        "--ink-faint":    "#B8A988",
        "--ink-faintest": "#D4C7AC",
        "--accent":       "#C84A2C",
        "--accent-soft":  "#E8A765",
        "--lake":         "#C9DCDE",
        "--lake-stroke":  "#4A7A95",
        fontFamily: "'Spectral', serif",
        backgroundColor: "var(--paper)",
        color: "var(--ink)",
      }}
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        <PageHeader />

        <div className="space-y-2 sm:space-y-3">
          {days.map((day) => (
            <DayCard
              key={day.number}
              day={day}
              isOpen={openDay === day.number}
              onToggle={() => setOpenDay(openDay === day.number ? null : day.number)}
            />
          ))}
        </div>

        <div className="mt-12 pt-6 text-center" style={{ borderTop: "1px solid var(--ink-faint)" }}>
          <div
            className="mb-3"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              color: "var(--ink-muted)",
            }}
          >
            ◆ END OF ITINERARY ◆
          </div>
          <a
            href={URL_TRIP_MAP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "0.85rem",
              letterSpacing: "0.25em",
              color: "var(--accent)",
              textDecoration: "underline",
              textDecorationThickness: "1px",
              textUnderlineOffset: "3px",
            }}
          >
            ▸ SNACK BOX TOUR MAP
          </a>
        </div>
      </div>
    </div>
  );
}
