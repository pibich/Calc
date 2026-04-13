(function (global) {
  const STORAGE_KEY = "pw-calc-lang";

  const STRINGS = {
    en: {
      "page.title": "Pixel Worlds Tools",
      "nav.aria": "Calculator and guide mode",
      "nav.devNotice":
        "Website under development — fishing gem values are still being processed.",
      "nav.langAria": "Language",
      "tab.mining": "Mining",
      "tab.fishing": "Fishing",
      "tab.guide": "Guide",
      "mining.title": "Mining Gems",
      "mining.totalLabel": "Total gems",
      "mining.totalAria": "Mining total gems",
      "mining.desc":
        "Enter the amount of each type; the total is calculated automatically.",
      "fishing.title": "Fishing Gems",
      "fishing.totalLabel": "Total gems",
      "fishing.totalAria": "Fishing total gems",
      "fishing.desc":
        "Enter the amount of each fish type; the total is calculated automatically.",
      "footer.disclaimer":
        "This site is not affiliated with, endorsed by, or operated by Pixel Worlds, Kukouri Mobile Entertainment, or any other official party. It is an independent fan-made project by a player to help with in-game calculations.",
      "footer.creditHtml": "Credit: <span class=\"footer-author\">PIBI</span>",
      "footer.socialAria": "Creator social links",
      "footer.youtubeAria": "PIBI on YouTube (opens in a new tab)",
      "footer.discordAria": "SansKuy Area on Discord (opens in a new tab)",
      "banner.topaz": "TOPAZ GEMS",
      "banner.emerald": "EMERALD GEMS",
      "banner.sapphire": "SAPPHIRE GEMS",
      "banner.ruby": "RUBY GEMS",
      "banner.diamond": "DIAMOND GEMS",
      "banner.herring": "HERRING GEMS",
      "banner.kingfish": "KINGFISH GEMS",
      "banner.butterflyfish": "BUTTERFLYFISH GEMS",
      "banner.goldfish": "GOLDFISH GEMS",
      "banner.carp": "CARP GEMS",
      "banner.acidpuffer": "ACID PUFFER GEMS",
      "banner.tuna": "TUNA GEMS",
      "banner.halibut": "HALIBUT GEMS",
      "banner.seaangler": "SEA ANGLER GEMS",
      "banner.crab": "CRAB GEMS",
      "banner.dumbfish": "DUMBFISH GEMS",
      "banner.piranha": "PIRANHA GEMS",
      "rate.zero": "0 gems / unit",
      "rate.each": "{n} gems / unit",
      "stepper.decrease": "Decrease quantity: {name}",
      "stepper.increase": "Increase quantity: {name}",
      "stepper.count": "Unit count for {name}",
      "guide.title": "Guide",
      "guide.subtabsAria": "Guide topic",
      "guide.subtab.nether": "Nether",
      "guide.subtab.mining": "Mining",
      "guide.subtab.fishing": "Fishing",
      "guide.subtabDisabledTitle": "Coming soon",
      "guide.soon": "This section is coming soon.",
      "guide.nether.netherLevelTitle": "Nether Level {n}",
      "guide.nether.minimumLevel": "Minimum Level {n}",
      "guide.nether.tierEmpty": "No wearables listed for this tier yet.",
      "guide.nether.level": "Requires level {n}",
      "guide.nether.levelUnknown": "Level varies",
      "guide.nether.slot.hats": "Hats",
      "guide.nether.slot.masks": "Masks",
      "guide.nether.slot.shirts": "Shirts",
      "guide.nether.slot.pants": "Pants",
      "guide.nether.slot.wings": "Wings",
      "guide.nether.slot.tails": "Tails",
      "guide.nether.slot.shoes": "Shoes",
      "guide.nether.slot.gloves": "Gloves",
      "guide.nether.slot.weapon": "Weapon",
      "guide.nether.slot.shield": "Shield",
      "guide.nether.item.t1IronHelmet": "Iron Helmet",
      "guide.nether.item.t1KiteShield": "Kite Shield",
      "guide.nether.item.t1WoodenSword": "Wooden Sword",
      "guide.nether.item.t1ExecutionerAxe": "Executioner Axe",
      "guide.nether.item.legionarySandals": "Legionary Sandals",
      "guide.nether.item.t2ChainmailVikingHelmet": "Chainmail Viking Helmet",
      "guide.nether.item.t2LegionaryChestArmor": "Legionary Chest Armor",
      "guide.nether.item.t2BrownLeatherPants": "Brown Leather Pants",
      "guide.nether.item.t2ExecutionerAxe": "Executioner Axe",
      "guide.nether.item.t2ScutumShield": "Scutum Shield",
      "guide.nether.item.t3GeneralsLegionaryHelmet": "General's Legionary Helmet",
      "guide.nether.item.t3LegionaryChestArmor": "Legionary Chest Armor",
      "guide.nether.item.t3BrownLeatherPants": "Brown Leather Pants",
      "guide.nether.item.t3Broom": "Broom",
      "guide.nether.item.t3ScutumShield": "Scutum Shield",
    },
    id: {
      "page.title": "Pixel Worlds Tools",
      "nav.aria": "Mode kalkulator dan panduan",
      "nav.devNotice":
        "Situs masih dalam pengembangan — nilai gems fishing sedang diproses.",
      "nav.langAria": "Bahasa",
      "tab.mining": "Mining",
      "tab.fishing": "Fishing",
      "tab.guide": "Panduan",
      "mining.title": "Mining Gems",
      "mining.totalLabel": "Total gems",
      "mining.totalAria": "Total gems mining",
      "mining.desc":
        "Masukkan jumlah tiap jenis; total dihitung otomatis.",
      "fishing.title": "Fishing Gems",
      "fishing.totalLabel": "Total gems",
      "fishing.totalAria": "Total gems fishing",
      "fishing.desc":
        "Masukkan jumlah tiap jenis ikan; total dihitung otomatis.",
      "footer.disclaimer":
        "Situs ini tidak berafiliasi, didukung, atau dikelola oleh Pixel Worlds, Kukouri Mobile Entertainment, maupun pihak resmi terkait lainnya. Ini adalah proyek mandiri yang dibuat oleh pemain untuk membantu perhitungan di dalam game.",
      "footer.creditHtml": "Kredit pembuat: <span class=\"footer-author\">PIBI</span>",
      "footer.socialAria": "Tautan sosial pembuat",
      "footer.youtubeAria": "YouTube PIBI (buka di tab baru)",
      "footer.discordAria": "SansKuy Area di Discord (buka di tab baru)",
      "banner.topaz": "TOPAZ GEMS",
      "banner.emerald": "EMERALD GEMS",
      "banner.sapphire": "SAPPHIRE GEMS",
      "banner.ruby": "RUBY GEMS",
      "banner.diamond": "DIAMOND GEMS",
      "banner.herring": "HERRING GEMS",
      "banner.kingfish": "KINGFISH GEMS",
      "banner.butterflyfish": "BUTTERFLYFISH GEMS",
      "banner.goldfish": "GOLDFISH GEMS",
      "banner.carp": "CARP GEMS",
      "banner.acidpuffer": "ACID PUFFER GEMS",
      "banner.tuna": "TUNA GEMS",
      "banner.halibut": "HALIBUT GEMS",
      "banner.seaangler": "SEA ANGLER GEMS",
      "banner.crab": "CRAB GEMS",
      "banner.dumbfish": "DUMBFISH GEMS",
      "banner.piranha": "PIRANHA GEMS",
      "rate.zero": "0 gems / unit",
      "rate.each": "{n} gems / unit",
      "stepper.decrease": "Kurangi jumlah: {name}",
      "stepper.increase": "Tambah jumlah: {name}",
      "stepper.count": "Jumlah unit untuk {name}",
      "guide.title": "Panduan",
      "guide.subtabsAria": "Topik panduan",
      "guide.subtab.nether": "Nether",
      "guide.subtab.mining": "Mining",
      "guide.subtab.fishing": "Fishing",
      "guide.subtabDisabledTitle": "Segera hadir",
      "guide.soon": "Bagian ini akan ditambahkan nanti.",
      "guide.nether.netherLevelTitle": "Nether Level {n}",
      "guide.nether.minimumLevel": "Minimum Level {n}",
      "guide.nether.tierEmpty": "Belum ada wearable untuk tier ini.",
      "guide.nether.level": "Butuh level {n}",
      "guide.nether.levelUnknown": "Level bervariasi",
      "guide.nether.slot.hats": "Topi",
      "guide.nether.slot.masks": "Topeng",
      "guide.nether.slot.shirts": "Baju",
      "guide.nether.slot.pants": "Celana",
      "guide.nether.slot.wings": "Sayap",
      "guide.nether.slot.tails": "Ekor",
      "guide.nether.slot.shoes": "Sepatu",
      "guide.nether.slot.gloves": "Sarung tangan",
      "guide.nether.slot.weapon": "Senjata",
      "guide.nether.slot.shield": "Perisai",
      "guide.nether.item.t1IronHelmet": "Iron Helmet",
      "guide.nether.item.t1KiteShield": "Kite Shield",
      "guide.nether.item.t1WoodenSword": "Wooden Sword",
      "guide.nether.item.t1ExecutionerAxe": "Executioner Axe",
      "guide.nether.item.legionarySandals": "Legionary Sandals",
      "guide.nether.item.t2ChainmailVikingHelmet": "Chainmail Viking Helmet",
      "guide.nether.item.t2LegionaryChestArmor": "Legionary Chest Armor",
      "guide.nether.item.t2BrownLeatherPants": "Brown Leather Pants",
      "guide.nether.item.t2ExecutionerAxe": "Executioner Axe",
      "guide.nether.item.t2ScutumShield": "Scutum Shield",
      "guide.nether.item.t3GeneralsLegionaryHelmet": "General's Legionary Helmet",
      "guide.nether.item.t3LegionaryChestArmor": "Legionary Chest Armor",
      "guide.nether.item.t3BrownLeatherPants": "Brown Leather Pants",
      "guide.nether.item.t3Broom": "Broom",
      "guide.nether.item.t3ScutumShield": "Scutum Shield",
    },
  };

  function getLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "id") return stored;
    return "id";
  }

  function t(key, vars) {
    const lang = getLang();
    const map = vars || {};
    let s = STRINGS[lang]?.[key] ?? STRINGS.en[key] ?? key;
    Object.keys(map).forEach((k) => {
      s = s.replace(new RegExp(`\\{${k}\\}`, "g"), String(map[k]));
    });
    return s;
  }

  function applyI18n() {
    const lang = getLang();
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (key) el.innerHTML = t(key);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const spec = el.getAttribute("data-i18n-attr");
      if (!spec) return;
      const bar = spec.indexOf("|");
      if (bar === -1) return;
      const attr = spec.slice(0, bar).trim();
      const key = spec.slice(bar + 1).trim();
      el.setAttribute(attr, t(key));
    });

    document.title = t("page.title");

    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      const l = btn.getAttribute("data-lang-btn");
      const active = l === lang;
      btn.classList.toggle("lang-btn--active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function setLang(lang) {
    if (lang !== "en" && lang !== "id") return;
    localStorage.setItem(STORAGE_KEY, lang);
    applyI18n();
    global.dispatchEvent(new CustomEvent("pw-lang-change", { detail: { lang } }));
  }

  function bindLangButtons() {
    document.querySelectorAll("[data-lang-set]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setLang(btn.getAttribute("data-lang-set"));
      });
    });
  }

  global.PWI18N = { getLang, setLang, t, applyI18n, STRINGS };

  bindLangButtons();
  applyI18n();
})(window);
