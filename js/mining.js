/**
 * Data mining gemstones. id = "{jenis}-{ukuran}".
 * Ikon PNG di /assets/, nama file `{ukuran}-{jenis}.png` (mis. tiny-topaz.png).
 */
const MINING_ITEM_ICON_BASE = "assets";

const MINING_GROUP_ORDER = ["topaz", "emerald", "sapphire", "ruby", "diamond"];

const MINING_GROUP_META = {
  topaz: { label: "TOPAZ GEMS", accent: "#f59e0b" },
  emerald: { label: "EMERALD GEMS", accent: "#34d399" },
  sapphire: { label: "SAPPHIRE GEMS", accent: "#38bdf8" },
  ruby: { label: "RUBY GEMS", accent: "#fb7185" },
  diamond: { label: "DIAMOND GEMS", accent: "#e2e8f0" },
};

const MINING_SIZE_ORDER = ["tiny", "small", "medium", "large", "huge"];

const MINING_GEMSTONES = [
  { id: "topaz-tiny", name: "Topaz (Tiny)", gemsPerUnit: 3 },
  { id: "topaz-small", name: "Topaz (Small)", gemsPerUnit: 6 },
  { id: "topaz-medium", name: "Topaz (Medium)", gemsPerUnit: 12 },
  { id: "topaz-large", name: "Topaz (Large)", gemsPerUnit: 30 },
  { id: "topaz-huge", name: "Topaz (Huge)", gemsPerUnit: 60 },
  { id: "emerald-tiny", name: "Emerald (Tiny)", gemsPerUnit: 5 },
  { id: "emerald-small", name: "Emerald (Small)", gemsPerUnit: 10 },
  { id: "emerald-medium", name: "Emerald (Medium)", gemsPerUnit: 20 },
  { id: "emerald-large", name: "Emerald (Large)", gemsPerUnit: 50 },
  { id: "emerald-huge", name: "Emerald (Huge)", gemsPerUnit: 100 },
  { id: "sapphire-tiny", name: "Sapphire (Tiny)", gemsPerUnit: 10 },
  { id: "sapphire-small", name: "Sapphire (Small)", gemsPerUnit: 20 },
  { id: "sapphire-medium", name: "Sapphire (Medium)", gemsPerUnit: 40 },
  { id: "sapphire-large", name: "Sapphire (Large)", gemsPerUnit: 100 },
  { id: "sapphire-huge", name: "Sapphire (Huge)", gemsPerUnit: 200 },
  { id: "ruby-tiny", name: "Ruby (Tiny)", gemsPerUnit: 15 },
  { id: "ruby-small", name: "Ruby (Small)", gemsPerUnit: 30 },
  { id: "ruby-medium", name: "Ruby (Medium)", gemsPerUnit: 60 },
  { id: "ruby-large", name: "Ruby (Large)", gemsPerUnit: 150 },
  { id: "ruby-huge", name: "Ruby (Huge)", gemsPerUnit: 300 },
  { id: "diamond-tiny", name: "Diamond (Tiny)", gemsPerUnit: 20 },
  { id: "diamond-small", name: "Diamond (Small)", gemsPerUnit: 40 },
  { id: "diamond-medium", name: "Diamond (Medium)", gemsPerUnit: 80 },
  { id: "diamond-large", name: "Diamond (Large)", gemsPerUnit: 200 },
  { id: "diamond-huge", name: "Diamond (Huge)", gemsPerUnit: 400 }
];
