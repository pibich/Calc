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
      "footer.creditHtml":
        "Credit: <span class=\"footer-author\">PIBI</span> — <a class=\"footer-credit-link\" href=\"https://tako.id/PIBICh\" target=\"_blank\" rel=\"noopener noreferrer\">Tako</a>",
      "footer.socialAria": "Creator social links",
      "footer.takoAria": "PIBI on Tako (opens in a new tab)",
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
      "guide.common.or": "OR",
      "guide.common.showGear": "Show Gear",
      "guide.common.hideGear": "Hide Gear",
      "guide.mining.levelTitle": "Mining Level {n}",
      "guide.mining.minimumLevel": "Minimum Level {n}",
      "guide.mining.costLabel": "Cost",
      "guide.mining.costInline": "Cost: {cost}",
      "guide.mining.cost.none": "No cost",
      "guide.mining.cost.bronzeMineKeyLvl2": "Bronze Mine Key (LVL 2)",
      "guide.mining.cost.silverMineKeyLvl3": "Silver Mine Key (LVL 3)",
      "guide.mining.cost.goldMineKeyLvl4": "Gold Mine Key (LVL 4)",
      "guide.mining.cost.platinumMineKeyLvl5": "Platinum Mine Key (LVL 5)",
      "guide.mining.infoTitle": "Why Mining?",
      "guide.mining.overviewText":
        "Mining is excellent in the mid game for farming Bytecoins quickly. Level 1 has a simpler rotation, while Levels 2-5 are more complex but offer higher profit with increased difficulty.",
      "guide.mining.tipTitle": "Tip",
      "guide.mining.tipText":
        "It is highly recommended to start mining at level 25/30+ so you can maximize your gear usage. For Mining Level 3 and above, bring a Healing Potion (minimum level 25) if you feel overwhelmed. You can craft it at the Magic Cauldron or buy it from the PWE Terminal.",
      "guide.mining.item.crappyPickaxe": "Crappy Pickaxe",
      "guide.mining.item.flimsyPickaxe": "Flimsy Pickaxe",
      "guide.mining.item.basicPickaxe": "Basic Pickaxe",
      "guide.mining.item.sturdyPickaxe": "Sturdy Pickaxe",
      "guide.mining.item.heavyPickaxe": "Heavy Pickaxe",
      "guide.mining.item.epicPickaxe": "Epic Pickaxe",
      "guide.mining.item.excavatorGloves": "Excavator Gloves",
      "guide.mining.item.excavatorMoustache": "Excavator Moustache",
      "guide.mining.item.excavatorGlasses": "Excavator Glasses",
      "guide.mining.item.deepDwellerShirt": "Deep Dweller Shirt",
      "guide.mining.item.deepDwellerPants": "Deep Dweller Pants",
      "guide.mining.item.deepDwellerShoes": "Deep Dweller Shoes",
      "guide.mining.item.minerGasmask": "Miner Gasmask",
      "guide.mining.item.sturdyMiningHelmet": "Sturdy Mining Helmet",
      "guide.mining.targetLabel": "Target: {target}",
      "guide.mining.target.tier1":
        "Take as many Bronze Nuggets as possible while prioritizing a quick exit; clearing all nuggets/gemstones is optional.",
      "guide.mining.target.tier2":
        "At least 35-50 Nuggets + 12-20 Gemstones.",
      "guide.mining.target.tier3":
        "At least 35-50 Nuggets + 12-20 Gemstones.",
      "guide.mining.target.tier4":
        "At least 35-50 Nuggets + 12-20 Gemstones.",
      "guide.mining.target.tier5":
        "At least 35-50 Nuggets + 12-20 Gemstones.",
      "guide.nether.infoTitle": "Why Nether?",
      "guide.nether.overviewText":
        "Nether is excellent for early progression, helping you push your account from around level 5/7 to 25-30+. You also gain exit gems and Nether Crystals for extra value, so even with notable difficulty, the rewards are worth it.",
      "guide.nether.combatTitle": "Enemies & elements",
      "guide.nether.combatText":
        "Nether enemies have specific resistances and weaknesses—learn which apply to each pull. Many resist dark and fire; favor light and water to land bigger hits. Flat damage is still shaved by their armor, so stacking critical chance pays off.",
      "guide.nether.partyTipTitle": "Tip",
      "guide.nether.partyTip":
        "Forming a party is strongly recommended for Nether runs—they are faster and more efficient.",
      "guide.nether.netherLevelTitle": "Nether Level {n}",
      "guide.nether.minimumLevel": "Minimum Level {n}",
      "guide.nether.costLabel": "Cost",
      "guide.nether.cost.scrollI": "Nether Scroll I",
      "guide.nether.cost.scrollII": "Nether Scroll II",
      "guide.nether.cost.scrollIII": "Nether Scroll III",
      "guide.nether.cost.scrollIV": "Nether Scroll IV",
      "guide.nether.cost.scrollV": "Nether Scroll V",
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
      "guide.nether.item.leatherGloves": "Leather Gloves",
      "guide.nether.item.vikingLeatherShoes": "Viking Leather Shoes",
      "guide.nether.item.vikingChainmail": "Viking Chainmail",
      "guide.nether.item.honshuSword": "Honshu Sword",
      "guide.nether.item.doubleHeadedAxes": "Double Headed Axes",
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
      "footer.creditHtml":
        "Kredit pembuat: <span class=\"footer-author\">PIBI</span> — <a class=\"footer-credit-link\" href=\"https://tako.id/PIBICh\" target=\"_blank\" rel=\"noopener noreferrer\">Tako</a>",
      "footer.socialAria": "Tautan sosial pembuat",
      "footer.takoAria": "PIBI di Tako (buka di tab baru)",
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
      "guide.common.or": "OR",
      "guide.common.showGear": "Lihat Gear",
      "guide.common.hideGear": "Sembunyikan Gear",
      "guide.mining.levelTitle": "Mining Level {n}",
      "guide.mining.minimumLevel": "Minimum Level {n}",
      "guide.mining.costLabel": "Biaya",
      "guide.mining.costInline": "Biaya: {cost}",
      "guide.mining.cost.none": "Tidak ada biaya",
      "guide.mining.cost.bronzeMineKeyLvl2": "Bronze Mine Key (LVL 2)",
      "guide.mining.cost.silverMineKeyLvl3": "Silver Mine Key (LVL 3)",
      "guide.mining.cost.goldMineKeyLvl4": "Gold Mine Key (LVL 4)",
      "guide.mining.cost.platinumMineKeyLvl5": "Platinum Mine Key (LVL 5)",
      "guide.mining.infoTitle": "Informasi",
      "guide.mining.overviewText":
        "Mining sangat bagus dilakukan di pertengahan permainan untuk mencari Bytecoin dengan cepat. Mining level 1 punya rotasi yang lebih sederhana, sedangkan level 2-5 lebih kompleks namun menawarkan profit yang lebih besar dengan tingkat kesulitan yang ikut meningkat.",
      "guide.mining.tipTitle": "Saran",
      "guide.mining.tipText":
        "Sangat dianjurkan memulai mining pada level 25/30+ agar penggunaan gear lebih maksimal. Untuk Mining level 3 ke atas, bawa Healing Potion (minimum level 25) jika kamu merasa kesulitan. Kamu bisa membuatnya sendiri di Magic Cauldron atau membelinya di PWE Terminal.",
      "guide.mining.item.crappyPickaxe": "Crappy Pickaxe",
      "guide.mining.item.flimsyPickaxe": "Flimsy Pickaxe",
      "guide.mining.item.basicPickaxe": "Basic Pickaxe",
      "guide.mining.item.sturdyPickaxe": "Sturdy Pickaxe",
      "guide.mining.item.heavyPickaxe": "Heavy Pickaxe",
      "guide.mining.item.epicPickaxe": "Epic Pickaxe",
      "guide.mining.item.excavatorGloves": "Excavator Gloves",
      "guide.mining.item.excavatorMoustache": "Excavator Moustache",
      "guide.mining.item.excavatorGlasses": "Excavator Glasses",
      "guide.mining.item.deepDwellerShirt": "Deep Dweller Shirt",
      "guide.mining.item.deepDwellerPants": "Deep Dweller Pants",
      "guide.mining.item.deepDwellerShoes": "Deep Dweller Shoes",
      "guide.mining.item.minerGasmask": "Miner Gasmask",
      "guide.mining.item.sturdyMiningHelmet": "Sturdy Mining Helmet",
      "guide.mining.targetLabel": "Target: {target}",
      "guide.mining.target.tier1":
        "Ambil Bronze Nugget sebanyak mungkin sambil fokus cari jalan keluar secepatnya, tidak wajib clear semua nugget/gemstone.",
      "guide.mining.target.tier2":
        "Setidaknya 35-50 Nugget + 12-20 Gemstone.",
      "guide.mining.target.tier3":
        "Setidaknya 35-50 Nugget + 12-20 Gemstone.",
      "guide.mining.target.tier4":
        "Setidaknya 35-50 Nugget + 12-20 Gemstone.",
      "guide.mining.target.tier5":
        "Setidaknya 35-50 Nugget + 12-20 Gemstone.",
      "guide.nether.infoTitle": "Informasi",
      "guide.nether.overviewText":
        "Nether sangat bagus dilakukan di awal permainan untuk menaikkan level akun dari sekitar level 5/7 ke 25-30+. Selain itu, kamu juga bisa mendapatkan exit gems dan Nether Crystal sebagai bonus tambahan. Meski tingkat kesulitannya cukup tinggi, hasil yang didapat sepadan.",
      "guide.nether.combatTitle": "Musuh & elemen",
      "guide.nether.combatText":
        "Monster di Nether punya resistensi dan kelemahan masing-masing—perhatikan kombinasinya. Banyak musuh resist terhadap elemen dark dan api; andalkan elemen light dan water agar damage kamu lebih besar. Flat damage tetap akan dipotong oleh armor mereka, jadi critical chance tinggi sangat membantu.",
      "guide.nether.partyTipTitle": "Saran",
      "guide.nether.partyTip":
        "Sangat dianjurkan membuat party jika ingin melakukan nether agar lebih cepat dan efisien.",
      "guide.nether.netherLevelTitle": "Nether Level {n}",
      "guide.nether.minimumLevel": "Minimum Level {n}",
      "guide.nether.costLabel": "Biaya",
      "guide.nether.cost.scrollI": "Nether Scroll I",
      "guide.nether.cost.scrollII": "Nether Scroll II",
      "guide.nether.cost.scrollIII": "Nether Scroll III",
      "guide.nether.cost.scrollIV": "Nether Scroll IV",
      "guide.nether.cost.scrollV": "Nether Scroll V",
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
      "guide.nether.item.leatherGloves": "Leather Gloves",
      "guide.nether.item.vikingLeatherShoes": "Viking Leather Shoes",
      "guide.nether.item.vikingChainmail": "Viking Chainmail",
      "guide.nether.item.honshuSword": "Honshu Sword",
      "guide.nether.item.doubleHeadedAxes": "Double Headed Axes",
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
