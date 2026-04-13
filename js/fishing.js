/**
 * Data fishing (ikan). id = "{jenis}-{ukuran}".
 * Ikon WebP di /assets/, nama file `{ukuran}-{jenis}.webp` (mis. tiny-herring.webp).
 * Gems per unit: perkiraan fan-made; sesuaikan angka jika ada data resmi in-game.
 */
const FISHING_ITEM_ICON_BASE = "assets";

const FISHING_GROUP_ORDER = ["herring", "kingfish", "butterflyfish", "goldfish", "carp", "acidpuffer", "tuna", "halibut", "seaangler", "crab", "dumbfish", "piranha"];

const FISHING_GROUP_META = {
  herring: { label: "HERRING GEMS", accent: "#94a3b8" },
  kingfish: { label: "KINGFISH GEMS", accent: "#38bdf8" },
  butterflyfish: { label: "BUTTERFLYFISH GEMS", accent: "#f472b6" },
  goldfish: { label: "GOLDFISH GEMS", accent: "#fbbf24" },
  carp: { label: "CARP GEMS", accent: "#fb923c" },
  acidpuffer: { label: "ACID PUFFER GEMS", accent: "#a3e635" },
  tuna: { label: "TUNA GEMS", accent: "#60a5fa" },
  halibut: { label: "HALIBUT GEMS", accent: "#cbd5e1" },
  seaangler: { label: "SEA ANGLER GEMS", accent: "#c4b5fd" },
  crab: { label: "CRAB GEMS", accent: "#f87171" },
  dumbfish: { label: "DUMBFISH GEMS", accent: "#22d3ee" },
  piranha: { label: "PIRANHA GEMS", accent: "#f43f5e" },
};

const FISHING_SIZE_ORDER = ["tiny", "small", "medium", "large", "huge"];

const FISHING_ITEMS = [
  { id: "herring-tiny", name: "Herring (Tiny)", gemsPerUnit: 10 },
  { id: "herring-small", name: "Herring (Small)", gemsPerUnit: 40 },
  { id: "herring-medium", name: "Herring (Medium)", gemsPerUnit: 70 },
  { id: "herring-large", name: "Herring (Large)", gemsPerUnit: 100 },
  { id: "herring-huge", name: "Herring (Huge)", gemsPerUnit: 300 },
  { id: "kingfish-tiny", name: "Kingfish (Tiny)", gemsPerUnit: 10 },
  { id: "kingfish-small", name: "Kingfish (Small)", gemsPerUnit: 40 },
  { id: "kingfish-medium", name: "Kingfish (Medium)", gemsPerUnit: 70 },
  { id: "kingfish-large", name: "Kingfish (Large)", gemsPerUnit: 100 },
  { id: "kingfish-huge", name: "Kingfish (Huge)", gemsPerUnit: 300 },
  { id: "butterflyfish-tiny", name: "Butterflyfish (Tiny)", gemsPerUnit: 15 },
  { id: "butterflyfish-small", name: "Butterflyfish (Small)", gemsPerUnit: 60 },
  { id: "butterflyfish-medium", name: "Butterflyfish (Medium)", gemsPerUnit: 105 },
  { id: "butterflyfish-large", name: "Butterflyfish (Large)", gemsPerUnit: 150 },
  { id: "butterflyfish-huge", name: "Butterflyfish (Huge)", gemsPerUnit: 450 },
  { id: "goldfish-tiny", name: "Goldfish (Tiny)", gemsPerUnit: 15 },
  { id: "goldfish-small", name: "Goldfish (Small)", gemsPerUnit: 60 },
  { id: "goldfish-medium", name: "Goldfish (Medium)", gemsPerUnit: 105 },
  { id: "goldfish-large", name: "Goldfish (Large)", gemsPerUnit: 150 },
  { id: "goldfish-huge", name: "Goldfish (Huge)", gemsPerUnit: 450, icon: "assets/huge-godlfish.webp" },
  { id: "carp-tiny", name: "Carp (Tiny)", gemsPerUnit: 20 },
  { id: "carp-small", name: "Carp (Small)", gemsPerUnit: 80 },
  { id: "carp-medium", name: "Carp (Medium)", gemsPerUnit: 140 },
  { id: "carp-large", name: "Carp (Large)", gemsPerUnit: 200 },
  { id: "carp-huge", name: "Carp (Huge)", gemsPerUnit: 600 },
  { id: "acidpuffer-tiny", name: "Acid Puffer (Tiny)", gemsPerUnit: 80 },
  { id: "acidpuffer-small", name: "Acid Puffer (Small)", gemsPerUnit: 320 },
  { id: "acidpuffer-medium", name: "Acid Puffer (Medium)", gemsPerUnit: 560 },
  { id: "acidpuffer-large", name: "Acid Puffer (Large)", gemsPerUnit: 800 },
  { id: "acidpuffer-huge", name: "Acid Puffer (Huge)", gemsPerUnit: 2400 },
  { id: "tuna-tiny", name: "Tuna (Tiny)", gemsPerUnit: 40 },
  { id: "tuna-small", name: "Tuna (Small)", gemsPerUnit: 160 },
  { id: "tuna-medium", name: "Tuna (Medium)", gemsPerUnit: 280 },
  { id: "tuna-large", name: "Tuna (Large)", gemsPerUnit: 400 },
  { id: "tuna-huge", name: "Tuna (Huge)", gemsPerUnit: 1200 },
  { id: "halibut-tiny", name: "Halibut (Tiny)", gemsPerUnit: 20 },
  { id: "halibut-small", name: "Halibut (Small)", gemsPerUnit: 80 },
  { id: "halibut-medium", name: "Halibut (Medium)", gemsPerUnit: 140 },
  { id: "halibut-large", name: "Halibut (Large)", gemsPerUnit: 200 },
  { id: "halibut-huge", name: "Halibut (Huge)", gemsPerUnit: 600 },
  { id: "seaangler-tiny", name: "Sea Angler (Tiny)", gemsPerUnit: 30 },
  { id: "seaangler-small", name: "Sea Angler (Small)", gemsPerUnit: 120 },
  { id: "seaangler-medium", name: "Sea Angler (Medium)", gemsPerUnit: 210 },
  { id: "seaangler-large", name: "Sea Angler (Large)", gemsPerUnit: 300 },
  { id: "seaangler-huge", name: "Sea Angler (Huge)", gemsPerUnit: 900 },
  { id: "crab-tiny", name: "Crab (Tiny)", gemsPerUnit: 150 },
  { id: "crab-small", name: "Crab (Small)", gemsPerUnit: 600 },
  { id: "crab-medium", name: "Crab (Medium)", gemsPerUnit: 1200 },
  { id: "crab-large", name: "Crab (Large)", gemsPerUnit: 1800 },
  { id: "crab-huge", name: "Crab (Huge)", gemsPerUnit: 7000 },
  { id: "dumbfish-tiny", name: "Dumbfish (Tiny)", gemsPerUnit: 5 },
  { id: "dumbfish-small", name: "Dumbfish (Small)", gemsPerUnit: 10 },
  { id: "dumbfish-medium", name: "Dumbfish (Medium)", gemsPerUnit: 30 },
  { id: "dumbfish-large", name: "Dumbfish (Large)", gemsPerUnit: 50 },
  { id: "dumbfish-huge", name: "Dumbfish (Huge)", gemsPerUnit: 100 },
  { id: "piranha-tiny", name: "Piranha (Tiny)", gemsPerUnit: 0 },
  { id: "piranha-small", name: "Piranha (Small)", gemsPerUnit: 0 },
  { id: "piranha-medium", name: "Piranha (Medium)", gemsPerUnit: 0 },
  { id: "piranha-large", name: "Piranha (Large)", gemsPerUnit: 0 },
  { id: "piranha-huge", name: "Piranha (Huge)", gemsPerUnit: 0 }
];
