/**
 * Panduan Nether: lima tier (Nether level 1–5), ditampilkan vertikal. Isi wearables di GUIDE_NETHER_BY_TIER.
 * Tiap item: { nameKey, level, icon?, slotId? } — slotId = hats|masks|... untuk badge (opsional).
 */
(function () {
  const netherRoot = document.getElementById("guide-nether-root");
  const miningRoot = document.getElementById("guide-mining-root");
  const fishingRoot = document.getElementById("guide-fishing-root");
  const farmingRoot = document.getElementById("guide-farming-root");
  const massingRoot = document.getElementById("guide-massing-root");
  if (!netherRoot && !miningRoot && !fishingRoot && !farmingRoot && !massingRoot)
    return;

  function t(key, vars) {
    if (typeof PWI18N === "undefined") return key;
    return PWI18N.t(key, vars);
  }

  const GUIDE_MASSING_TEXT_BLOCKS = [
    { titleKey: "guide.massing.basicsTitle", bodyKey: "guide.massing.basicsBody" },
    { titleKey: "guide.massing.craftTitle", bodyKey: "guide.massing.craftBody" },
    { titleKey: "guide.massing.sellTitle", bodyKey: "guide.massing.sellBody" },
    { titleKey: "guide.massing.tipTitle", bodyKey: "guide.massing.tipBody" },
  ];

  function appendGuideTextBlock(parent, titleKey, bodyKey) {
    const block = document.createElement("aside");
    block.className = "guide-nether-tip";
    block.setAttribute("role", "note");
    const h = document.createElement("h4");
    h.className = "guide-nether-tip__title";
    h.setAttribute("data-i18n", titleKey);
    h.textContent = t(titleKey);
    const p = document.createElement("p");
    p.className = "guide-nether-tip__text";
    p.setAttribute("data-i18n", bodyKey);
    p.textContent = t(bodyKey);
    block.append(h, p);
    parent.appendChild(block);
  }

  function renderGuideTextSections(root, pageHeadingKey, blocks) {
    if (!root) return;
    root.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "guide-nether-tiers-wrap";
    const h = document.createElement("h3");
    h.className = "guide-fishing-section-title";
    h.setAttribute("data-i18n", pageHeadingKey);
    h.textContent = t(pageHeadingKey);
    wrap.appendChild(h);
    blocks.forEach(function (b) {
      appendGuideTextBlock(wrap, b.titleKey, b.bodyKey);
    });
    root.appendChild(wrap);
  }

  /** Farmable picks by progression; `icon` paths under assets/farming/ (optional until files exist). */
  const GUIDE_FARMING_STAGE_ORDER = ["early", "mid", "late"];

  const GUIDE_FARMING_STAGE_META = {
    early: {
      titleKey: "guide.farming.stage.early",
      descKey: "guide.farming.stage.earlyDesc",
      accent: "#94a3b8",
      badge: "E",
    },
    mid: {
      titleKey: "guide.farming.stage.mid",
      descKey: "guide.farming.stage.midDesc",
      accent: "#38bdf8",
      badge: "M",
    },
    late: {
      titleKey: "guide.farming.stage.late",
      descKey: "guide.farming.stage.lateDesc",
      accent: "#f59e0b",
      badge: "L",
    },
  };

  const GUIDE_FARMING_BY_STAGE = {
    early: [
      {
        nameKey: "guide.farming.item.magicStuff",
        icon: "assets/farming/magic_stuff.webp",
        hideMetaRow: true,
      },
      {
        nameKey: "guide.farming.item.gemSoil",
        icon: "assets/farming/gem_soil.webp",
        hideMetaRow: true,
      },
      {
        nameKey: "guide.farming.item.lava",
        icon: "assets/farming/lava.webp",
        hideMetaRow: true,
      },
      {
        nameKey: "guide.farming.item.grass",
        icon: "assets/farming/grass.webp",
        hideMetaRow: true,
      },
      {
        nameKey: "guide.farming.item.hangingLeaves",
        icon: "assets/farming/hanging_leaves.webp",
        hideMetaRow: true,
      },
      {
        nameKey: "guide.farming.item.water",
        icon: "assets/farming/water.webp",
        hideMetaRow: true,
      },
      {
        nameKey: "guide.farming.item.clearWater",
        icon: "assets/farming/clear_water.webp",
        hideMetaRow: true,
      },
      {
        nameKey: "guide.farming.item.woodBlock",
        icon: "assets/farming/wood_block.webp",
        hideMetaRow: true,
      },
      {
        nameKey: "guide.farming.item.woodenPlatform",
        icon: "assets/farming/wooden_platform.webp",
        hideMetaRow: true,
      },
    ],
    mid: [
      {
        nameKey: "guide.farming.item.metalPlatform",
        icon: "assets/farming/metal_platform.webp",
        hideMetaRow: true,
      },
      {
        nameKey: "guide.farming.item.fireTrap",
        icon: "assets/farming/fire_trap.webp",
        hideMetaRow: true,
      },
    ],
    late: [
      {
        nameKey: "guide.farming.item.bbb",
        icon: "assets/farming/bbb.webp",
        hideMetaRow: true,
      },
      {
        nameKey: "guide.farming.item.spikeBomb",
        icon: "assets/farming/spike_bomb.webp",
        hideMetaRow: true,
      },
      {
        nameKey: "guide.farming.item.hoveringMine",
        icon: "assets/farming/hovering_mine.webp",
        hideMetaRow: true,
      },
    ],
  };

  function appendGuideGearNote(tip) {
    const gearTitle = document.createElement("h4");
    gearTitle.className = "guide-nether-tip__title";
    gearTitle.setAttribute("data-i18n", "guide.gearNoteTitle");
    gearTitle.textContent = t("guide.gearNoteTitle");
    const gearBody = document.createElement("p");
    gearBody.className = "guide-nether-tip__text";
    gearBody.setAttribute("data-i18n", "guide.gearNoteBody");
    gearBody.textContent = t("guide.gearNoteBody");
    tip.append(gearTitle, gearBody);
  }

  const GUIDE_NETHER_TIER_ORDER = [1, 2, 3, 4, 5];

  const GUIDE_NETHER_TIER_ACCENT = {
    1: "#94a3b8",
    2: "#34d399",
    3: "#38bdf8",
    4: "#f59e0b",
    5: "#f87171",
  };

  /** Level minimum yang ditampilkan di subtitle tiap tier Nether. */
  const GUIDE_NETHER_TIER_MIN_LEVEL = {
    1: 0,
    2: 15,
    3: 25,
    4: 35,
    5: 50,
  };

  const GUIDE_NETHER_TIER_COST = {
    1: { nameKey: "guide.nether.cost.scrollI", icon: "assets/Nether_Scroll_I.webp" },
    2: { nameKey: "guide.nether.cost.scrollII", icon: "assets/Nether_Scroll_II.webp" },
    3: { nameKey: "guide.nether.cost.scrollIII", icon: "assets/Nether_Scroll_III.webp" },
    4: { nameKey: "guide.nether.cost.scrollIV", icon: "assets/Nether_Scroll_IV.webp" },
    5: { nameKey: "guide.nether.cost.scrollV", icon: "assets/Nether_Scroll_V.webp" },
  };

  const GUIDE_NETHER_STAT_ICON_ORDER = [
    { key: "xp", icon: "assets/icon/ItemInfo_XPLevel_Requirement_icon.webp" },
    { key: "power", icon: "assets/icon/ItemInfo_Damage_icon.webp" },
    { key: "critical", icon: "assets/icon/ItemInfo_Critical_icon.webp" },
    { key: "earth", icon: "assets/icon/DamageElement_earth.webp" },
    { key: "air", icon: "assets/icon/DamageElement_air.webp" },
    { key: "fire", icon: "assets/icon/DamageElement_fire.webp" },
    { key: "water", icon: "assets/icon/DamageElement_water.webp" },
    { key: "dark", icon: "assets/icon/DamageElement_dark.webp" },
    { key: "light", icon: "assets/icon/DamageElement_light.webp" },
  ];

  const GUIDE_NETHER_STATS_BY_NAME_KEY = {
    "guide.nether.item.t1IronHelmet": {
      lvl: 7,
      damage: 0,
      armor: 6,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.t1ExecutionerAxe": {
      lvl: 7,
      damage: 107,
      armor: 0,
      critical: 5,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.leatherGloves": {
      lvl: 7,
      damage: 0,
      armor: 6,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.t1KiteShield": {
      lvl: 0,
      damage: 0,
      armor: 4,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.vikingLeatherShoes": {
      lvl: 0,
      damage: 0,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.t2ChainmailVikingHelmet": {
      lvl: 13,
      damage: 0,
      armor: 10,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.t2LegionaryChestArmor": {
      lvl: 13,
      damage: 0,
      armor: 10,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.t2BrownLeatherPants": {
      lvl: 13,
      damage: 0,
      armor: 10,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.t2ExecutionerAxe": {
      lvl: 7,
      damage: 107,
      armor: 0,
      critical: 5,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.t2ScutumShield": {
      lvl: 7,
      damage: 0,
      armor: 6,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.t3GeneralsLegionaryHelmet": {
      lvl: 23,
      damage: 0,
      armor: 16,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.t3LegionaryChestArmor": {
      lvl: 13,
      damage: 0,
      armor: 10,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.t3BrownLeatherPants": {
      lvl: 13,
      damage: 0,
      armor: 10,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.t3Broom": {
      lvl: 18,
      damage: 124,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 12,
      light: 0,
    },
    "guide.nether.item.t3ScutumShield": {
      lvl: 7,
      damage: 0,
      armor: 6,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.vikingChainmail": {
      lvl: 37,
      damage: 0,
      armor: 24,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.honshuSword": {
      lvl: 34,
      damage: 165,
      armor: 0,
      critical: 4,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.nether.item.doubleHeadedAxes": {
      lvl: 43,
      damage: 191,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
  };

  const GUIDE_MINING_STATS_BY_NAME_KEY = {
    "guide.mining.item.crappyPickaxe": {
      lvl: 5,
      damage: 100,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.mining.item.flimsyPickaxe": {
      lvl: 10,
      damage: 105,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.mining.item.basicPickaxe": {
      lvl: 20,
      damage: 110,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.mining.item.sturdyPickaxe": {
      lvl: 35,
      damage: 110,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.mining.item.heavyPickaxe": {
      lvl: 50,
      damage: 115,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.mining.item.masterPickaxe": {
      lvl: 65,
      damage: 115,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.mining.item.epicPickaxe": {
      lvl: 80,
      damage: 120,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.mining.item.excavatorGloves": {
      lvl: 12,
      damage: 0,
      armor: 4,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.mining.item.excavatorMoustache": {
      lvl: 27,
      damage: 0,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.mining.item.deepDwellerShirt": {
      lvl: 17,
      damage: 0,
      armor: 8,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 6,
    },
    "guide.mining.item.deepDwellerPants": {
      lvl: 12,
      damage: 0,
      armor: 8,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 4,
    },
    "guide.mining.item.deepDwellerShoes": {
      lvl: 5,
      damage: 0,
      armor: 4,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.mining.item.excavatorGlasses": {
      lvl: 33,
      damage: 0,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 6,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.mining.item.minerGasmask": {
      lvl: 48,
      damage: 0,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 10,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.mining.item.sturdyMiningHelmet": {
      lvl: 64,
      damage: 0,
      armor: 4,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
  };

  const GUIDE_FISHING_STATS_BY_NAME_KEY = {
    "guide.fishing.item.bambooRodBasic": {
      lvl: 0,
      damage: 100,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.bambooRodFine": {
      lvl: 10,
      damage: 100,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.bambooRodFlawless": {
      lvl: 30,
      damage: 100,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.bambooRodSuperior": {
      lvl: 60,
      damage: 100,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.carbonFiberRodFine": {
      lvl: 20,
      damage: 100,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.carbonFiberRodFlawless": {
      lvl: 45,
      damage: 100,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.carbonFiberRodSuperior": {
      lvl: 75,
      damage: 100,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.titaniumRodSuperior": {
      lvl: 80,
      damage: 100,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.seadogHat": {
      lvl: 7,
      damage: 0,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.proFisherSuit": {
      lvl: 5,
      damage: 0,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.proFisherFaceScarf": {
      lvl: 90,
      damage: 0,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.bubblePipe": {
      lvl: 50,
      damage: 0,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.fisherWhistleOptional": {
      lvl: 27,
      damage: 0,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.fisherWhistle": {
      lvl: 27,
      damage: 0,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.fishingAmulet": {
      lvl: 80,
      damage: 0,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.wormNecklace": {
      lvl: 30,
      damage: 0,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
    "guide.fishing.item.rodsterToga": {
      lvl: 19,
      damage: 0,
      armor: 0,
      critical: 0,
      earth: 0,
      air: 0,
      fire: 0,
      water: 0,
      dark: 0,
      light: 0,
    },
  };

  const GUIDE_GEAR_EFFECT_BY_NAME_KEY = {
    // Mining gear effects
    "guide.mining.item.crappyPickaxe": "1 gemstone per gemstone block",
    "guide.mining.item.flimsyPickaxe": "1-2 gemstones per gemstone block",
    "guide.mining.item.basicPickaxe": "1-3 gemstones per gemstone block",
    "guide.mining.item.sturdyPickaxe": "2-4 gemstones per gemstone block",
    "guide.mining.item.heavyPickaxe": "2-5 gemstones per gemstone block",
    "guide.mining.item.masterPickaxe": "2-5 gemstones per gemstone block",
    "guide.mining.item.epicPickaxe": "2-6 gemstones per gemstone block",
    "guide.mining.item.excavatorGloves": "More Huge Gemstones",
    "guide.mining.item.excavatorMoustache": "More Extra Gemstones",
    "guide.mining.item.excavatorGlasses": "More Huge Gemstones",
    "guide.mining.item.minerGasmask": "More Huge Gemstones",
    "guide.mining.item.deepDwellerShirt": "More Ingredient Drops",
    "guide.mining.item.deepDwellerPants": "Longer Light Crystal Duration",
    "guide.mining.item.deepDwellerShoes": "Enemy Spawn Indicator",
    "guide.mining.item.sturdyMiningHelmet": "More Extra Gemstones",

    // Fishing gear effects
    "guide.fishing.item.seadogHat": "Higher Strike Frequency",
    "guide.fishing.item.proFisherSuit": "Higher Strike Frequency",
    "guide.fishing.item.proFisherFaceScarf": "More Ingredient Chance",
    "guide.fishing.item.bubblePipe": "More Ingredient Chance",
    "guide.fishing.item.fisherWhistleOptional": "Higher Strike Frequency",
    "guide.fishing.item.fisherWhistle": "Higher Strike Frequency",
    "guide.fishing.item.fishingAmulet": "No Lure Loss",
    "guide.fishing.item.wormNecklace": "Higher Strike Frequency",
    "guide.fishing.item.rodsterToga": "Slower Fish",
    "guide.fishing.item.bambooRodBasic": "Best for Small Fish",
    "guide.fishing.item.bambooRodFine": "Best for Small Fish",
    "guide.fishing.item.bambooRodFlawless": "Best for Small Fish",
    "guide.fishing.item.bambooRodSuperior": "Best for Small Fish",
    "guide.fishing.item.carbonFiberRodFine": "Better for Large Fish",
    "guide.fishing.item.carbonFiberRodFlawless": "Better for Large Fish",
    "guide.fishing.item.carbonFiberRodSuperior": "Better for Large Fish",
    "guide.fishing.item.titaniumRodSuperior": "Best for Largest Fish",
  };

  const GUIDE_MINING_TIER_ORDER = [1, 2, 3, 4, 5];

  const GUIDE_MINING_TIER_MIN_LEVEL = {
    1: 0,
    2: 10,
    3: 20,
    4: 40,
    5: 60,
  };

  const GUIDE_MINING_TIER_COST = {
    1: {
      nameKey: "guide.mining.cost.none",
      icon: "",
    },
    2: {
      nameKey: "guide.mining.cost.bronzeMineKeyLvl2",
      icon: "assets/Bronze_Mine_Key_29.webp",
    },
    3: {
      nameKey: "guide.mining.cost.silverMineKeyLvl3",
      icon: "assets/Silver_Mine_Key_29.webp",
    },
    4: {
      nameKey: "guide.mining.cost.goldMineKeyLvl4",
      icon: "assets/Golden_Mine_Key_29.webp",
    },
    5: {
      nameKey: "guide.mining.cost.platinumMineKeyLvl5",
      icon: "assets/Platinum_Mine_Key_29.webp",
    },
  };

  const GUIDE_MINING_BY_TIER = {
    1: [
      {
        nameKey: "guide.mining.item.crappyPickaxe",
        level: 5,
        altGroup: "pickaxe",
        slotId: "weapon",
        icon: "assets/Crappy_Pickaxe.webp",
      },
      {
        nameKey: "guide.mining.item.flimsyPickaxe",
        level: 10,
        altGroup: "pickaxe",
        slotId: "weapon",
        icon: "assets/Flimsy_Pickaxe.webp",
      },
    ],
    2: [
      {
        nameKey: "guide.mining.item.flimsyPickaxe",
        level: 10,
        altGroup: "pickaxe",
        slotId: "weapon",
        icon: "assets/Flimsy_Pickaxe.webp",
      },
      {
        nameKey: "guide.mining.item.basicPickaxe",
        level: 20,
        altGroup: "pickaxe",
        slotId: "weapon",
        icon: "assets/Basic_Pickaxe.webp",
      },
      {
        nameKey: "guide.mining.item.excavatorGloves",
        level: 12,
        slotId: "gloves",
        icon: "assets/Excavator_Gloves.webp",
      },
      {
        nameKey: "guide.mining.item.excavatorMoustache",
        level: 27,
        slotId: "masks",
        icon: "assets/Excavator_Moustache.webp",
      },
      {
        nameKey: "guide.mining.item.deepDwellerShirt",
        level: 17,
        slotId: "shirts",
        icon: "assets/Deep_Dweller_Shirt.webp",
      },
      {
        nameKey: "guide.mining.item.deepDwellerPants",
        level: 12,
        slotId: "pants",
        icon: "assets/Deep_Dweller_Pants.webp",
      },
      {
        nameKey: "guide.mining.item.deepDwellerShoes",
        level: 5,
        slotId: "shoes",
        icon: "assets/Deep_Dweller_Shoes.webp",
      },
    ],
    3: [
      {
        nameKey: "guide.mining.item.sturdyPickaxe",
        level: 35,
        slotId: "weapon",
        icon: "assets/Sturdy_Pickaxe.webp",
      },
      {
        nameKey: "guide.mining.item.excavatorGlasses",
        level: 33,
        slotId: "masks",
        icon: "assets/Excavator_Glasses.webp",
      },
      {
        nameKey: "guide.mining.item.excavatorGloves",
        level: 12,
        slotId: "gloves",
        icon: "assets/Excavator_Gloves.webp",
      },
      {
        nameKey: "guide.mining.item.excavatorMoustache",
        level: 27,
        slotId: "masks",
        icon: "assets/Excavator_Moustache.webp",
      },
      {
        nameKey: "guide.mining.item.deepDwellerShirt",
        level: 17,
        slotId: "shirts",
        icon: "assets/Deep_Dweller_Shirt.webp",
      },
      {
        nameKey: "guide.mining.item.deepDwellerPants",
        level: 12,
        slotId: "pants",
        icon: "assets/Deep_Dweller_Pants.webp",
      },
      {
        nameKey: "guide.mining.item.deepDwellerShoes",
        level: 5,
        slotId: "shoes",
        icon: "assets/Deep_Dweller_Shoes.webp",
      },
    ],
    4: [
      {
        nameKey: "guide.mining.item.heavyPickaxe",
        level: 50,
        altGroup: "pickaxe",
        slotId: "weapon",
        icon: "assets/Heavy_Pickaxe.webp",
      },
      {
        nameKey: "guide.mining.item.masterPickaxe",
        level: 65,
        altGroup: "pickaxe",
        slotId: "weapon",
        icon: "assets/Master_Pickaxe.webp",
      },
      {
        nameKey: "guide.mining.item.excavatorGlasses",
        level: 33,
        slotId: "masks",
        icon: "assets/Excavator_Glasses.webp",
      },
      {
        nameKey: "guide.mining.item.excavatorGloves",
        level: 12,
        slotId: "gloves",
        icon: "assets/Excavator_Gloves.webp",
      },
      {
        nameKey: "guide.mining.item.minerGasmask",
        level: 48,
        slotId: "masks",
        icon: "assets/Miner_Gasmask.webp",
      },
      {
        nameKey: "guide.mining.item.deepDwellerShirt",
        level: 17,
        slotId: "shirts",
        icon: "assets/Deep_Dweller_Shirt.webp",
      },
      {
        nameKey: "guide.mining.item.deepDwellerPants",
        level: 12,
        slotId: "pants",
        icon: "assets/Deep_Dweller_Pants.webp",
      },
      {
        nameKey: "guide.mining.item.deepDwellerShoes",
        level: 5,
        slotId: "shoes",
        icon: "assets/Deep_Dweller_Shoes.webp",
      },
    ],
    5: [
      {
        nameKey: "guide.mining.item.masterPickaxe",
        level: 65,
        altGroup: "pickaxe",
        slotId: "weapon",
        icon: "assets/Master_Pickaxe.webp",
      },
      {
        nameKey: "guide.mining.item.epicPickaxe",
        level: 80,
        altGroup: "pickaxe",
        slotId: "weapon",
        icon: "assets/Epic_Pickaxe.webp",
      },
      {
        nameKey: "guide.mining.item.sturdyMiningHelmet",
        level: 64,
        slotId: "hats",
        icon: "assets/Sturdy_Mining_Helmet.webp",
      },
      {
        nameKey: "guide.mining.item.excavatorGlasses",
        level: 33,
        slotId: "masks",
        icon: "assets/Excavator_Glasses.webp",
      },
      {
        nameKey: "guide.mining.item.excavatorGloves",
        level: 12,
        slotId: "gloves",
        icon: "assets/Excavator_Gloves.webp",
      },
      {
        nameKey: "guide.mining.item.minerGasmask",
        level: 48,
        slotId: "masks",
        icon: "assets/Miner_Gasmask.webp",
      },
      {
        nameKey: "guide.mining.item.deepDwellerShirt",
        level: 17,
        slotId: "shirts",
        icon: "assets/Deep_Dweller_Shirt.webp",
      },
      {
        nameKey: "guide.mining.item.deepDwellerPants",
        level: 12,
        slotId: "pants",
        icon: "assets/Deep_Dweller_Pants.webp",
      },
      {
        nameKey: "guide.mining.item.deepDwellerShoes",
        level: 5,
        slotId: "shoes",
        icon: "assets/Deep_Dweller_Shoes.webp",
      },
    ],
  };

  const GUIDE_MINING_TARGET_BY_TIER = {
    1: "guide.mining.target.tier1",
    2: "guide.mining.target.tier2",
    3: "guide.mining.target.tier3",
    4: "guide.mining.target.tier4",
    5: "guide.mining.target.tier5",
  };

  const GUIDE_FISHING_INGREDIENT = {
    titleKey: "guide.fishing.card.ingredient",
    badge: "I",
    badgeIcon: "assets/Diamond_Ring.webp",
    items: [
      {
        nameKey: "guide.fishing.item.bambooRodBasic",
        level: 0,
        altGroup: "rod",
        slotId: "rod",
        icon: "assets/Bamboo_Rod_Basic.webp",
      },
      {
        nameKey: "guide.fishing.item.bambooRodFine",
        level: 10,
        altGroup: "rod",
        slotId: "rod",
        icon: "assets/Bamboo_Rod_Fine.webp",
      },
      {
        nameKey: "guide.fishing.item.seadogHat",
        level: 7,
        slotId: "hats",
        icon: "assets/Seadog_Hat.webp",
      },
      {
        nameKey: "guide.fishing.item.proFisherSuit",
        level: 5,
        slotId: "shirts",
        icon: "assets/Pro_Fisher_Suit.webp",
      },
      {
        nameKey: "guide.fishing.item.proFisherFaceScarf",
        level: 90,
        slotId: "masks",
        icon: "assets/Pro_Fisher_Face_Scarf.webp",
      },
      {
        nameKey: "guide.fishing.item.bubblePipe",
        level: 50,
        altGroup: "mouth",
        slotId: "mouth",
        icon: "assets/Bubble_Pipe.webp",
      },
      {
        nameKey: "guide.fishing.item.fisherWhistleOptional",
        level: 27,
        altGroup: "mouth",
        slotId: "mouth",
        icon: "assets/Fisher_Whistle.webp",
      },
      {
        nameKey: "guide.fishing.item.fishingAmulet",
        level: 80,
        altGroup: "accessory",
        slotId: "neck",
        icon: "assets/Fishing_Amulet.webp",
      },
      {
        nameKey: "guide.fishing.item.wormNecklace",
        level: 30,
        altGroup: "accessory",
        slotId: "neck",
        icon: "assets/Worm_Necklace.webp",
      },
    ],
    lures: [
      {
        nameKey: "guide.fishing.lure.neonSpoon",
        noteKey: "guide.fishing.lureLabel",
        icon: "assets/Neon_Spoon.webp",
      },
      {
        nameKey: "guide.fishing.lure.redGlowingLure",
        noteKey: "guide.fishing.lureLabel",
        icon: "assets/Red_Glowing_Lure.webp",
      },
      {
        nameKey: "guide.fishing.lure.greenJerk",
        noteKey: "guide.fishing.lureLabel",
        icon: "assets/Green_Jerk.webp",
      },
    ],
  };

  const GUIDE_FISHING_GEMS_STAGE_ORDER = ["early", "mid", "late"];

  const GUIDE_FISHING_GEMS_BY_STAGE = {
    early: {
      titleKey: "guide.fishing.card.gemsEarly",
      badge: "E",
      badgeIcon: "assets/small-goldfish.webp",
      items: [
        {
          nameKey: "guide.fishing.item.bambooRodFine",
          level: 10,
          altGroup: "rod",
          slotId: "rod",
          icon: "assets/Bamboo_Rod_Fine.webp",
        },
        {
          nameKey: "guide.fishing.item.carbonFiberRodFine",
          level: 20,
          altGroup: "rod",
          slotId: "rod",
          icon: "assets/Carbon_Fiber_Rod_Fine.webp",
        },
        {
          nameKey: "guide.fishing.item.seadogHat",
          level: 7,
          slotId: "hats",
          icon: "assets/Seadog_Hat.webp",
        },
        {
          nameKey: "guide.fishing.item.proFisherSuit",
          level: 5,
          altGroup: "suit",
          slotId: "shirts",
          icon: "assets/Pro_Fisher_Suit.webp",
        },
        {
          nameKey: "guide.fishing.item.rodsterToga",
          level: 19,
          altGroup: "suit",
          slotId: "shirts",
          icon: "assets/Rodster_Toga.webp",
        },
        {
          nameKey: "guide.fishing.item.fisherWhistleOptional",
          level: 27,
          slotId: "mouth",
          icon: "assets/Fisher_Whistle.webp",
        },
      ],
      lures: [
        {
          nameKey: "guide.fishing.lure.greenSmallMinnow",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Green_Small_Minnow.webp",
        },
        {
          nameKey: "guide.fishing.lure.purpleTwirltailJig",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Purple_Twirltail_Jig.webp",
        },
        {
          nameKey: "guide.fishing.lure.pinkSmallMinnow",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Pink_Small_Minnow.webp",
        },
        {
          nameKey: "guide.fishing.lure.greenTwirltailJig",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Green_Twirltail_Jig.webp",
        },
      ],
    },
    mid: {
      titleKey: "guide.fishing.card.gemsMid",
      badge: "M",
      badgeIcon: "assets/small-tuna.webp",
      items: [
        {
          nameKey: "guide.fishing.item.bambooRodFlawless",
          level: 30,
          altGroup: "rod",
          slotId: "rod",
          icon: "assets/Bamboo_Rod_Flawless.webp",
        },
        {
          nameKey: "guide.fishing.item.carbonFiberRodFlawless",
          level: 45,
          altGroup: "rod",
          slotId: "rod",
          icon: "assets/Carbon_Fiber_Rod_Flawless.webp",
        },
        {
          nameKey: "guide.fishing.item.seadogHat",
          level: 7,
          slotId: "hats",
          icon: "assets/Seadog_Hat.webp",
        },
        {
          nameKey: "guide.fishing.item.proFisherSuit",
          level: 5,
          altGroup: "suit",
          slotId: "shirts",
          icon: "assets/Pro_Fisher_Suit.webp",
        },
        {
          nameKey: "guide.fishing.item.rodsterToga",
          level: 19,
          altGroup: "suit",
          slotId: "shirts",
          icon: "assets/Rodster_Toga.webp",
        },
        {
          nameKey: "guide.fishing.item.fisherWhistle",
          level: 27,
          slotId: "mouth",
          icon: "assets/Fisher_Whistle.webp",
        },
      ],
      lures: [
        {
          nameKey: "guide.fishing.lure.redTungstenJig",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Red_Tungsten_Jig.webp",
        },
        {
          nameKey: "guide.fishing.lure.redFly",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Red_Fly.webp",
        },
        {
          nameKey: "guide.fishing.lure.stripedSpoon",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Striped_Spoon.webp",
        },
        {
          nameKey: "guide.fishing.lure.redJerk",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Red_Jerk.webp",
        },
      ],
    },
    late: {
      titleKey: "guide.fishing.card.gemsLate",
      badge: "L",
      badgeIcon: "assets/small-seaangler.webp",
      items: [
        {
          nameKey: "guide.fishing.item.bambooRodSuperior",
          level: 60,
          slotId: "rod",
          icon: "assets/Bamboo_Rod_Superior.webp",
          extraNoteKey: "guide.fishing.note.bambooBudget",
        },
        {
          nameKey: "guide.fishing.item.carbonFiberRodSuperior",
          level: 75,
          altGroup: "rodPremium",
          slotId: "rod",
          icon: "assets/Carbon_Fiber_Rod_Superior.webp",
        },
        {
          nameKey: "guide.fishing.item.titaniumRodSuperior",
          level: 80,
          altGroup: "rodPremium",
          slotId: "rod",
          icon: "assets/Titanium_Rod_Superior.webp",
        },
        {
          nameKey: "guide.fishing.item.seadogHat",
          level: 7,
          slotId: "hats",
          icon: "assets/Seadog_Hat.webp",
        },
        {
          nameKey: "guide.fishing.item.fishingAmulet",
          level: 80,
          altGroup: "accessory",
          slotId: "neck",
          icon: "assets/Fishing_Amulet.webp",
        },
        {
          nameKey: "guide.fishing.item.wormNecklace",
          level: 30,
          altGroup: "accessory",
          slotId: "neck",
          icon: "assets/Worm_Necklace.webp",
        },
        {
          nameKey: "guide.fishing.item.proFisherSuit",
          level: 5,
          altGroup: "suit",
          slotId: "shirts",
          icon: "assets/Pro_Fisher_Suit.webp",
        },
        {
          nameKey: "guide.fishing.item.rodsterToga",
          level: 19,
          altGroup: "suit",
          slotId: "shirts",
          icon: "assets/Rodster_Toga.webp",
        },
        {
          nameKey: "guide.fishing.item.fisherWhistle",
          level: 27,
          slotId: "mouth",
          icon: "assets/Fisher_Whistle.webp",
        },
      ],
      lures: [
        {
          nameKey: "guide.fishing.lure.redFly",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Red_Fly.webp",
        },
        {
          nameKey: "guide.fishing.lure.silverLongMinnow",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Silver_Long_Minnow.webp",
        },
        {
          nameKey: "guide.fishing.lure.redJerk",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Red_Jerk.webp",
        },
        {
          nameKey: "guide.fishing.lure.greenGlowingLure",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Green_Glowing_Lure.webp",
        },
        {
          nameKey: "guide.fishing.lure.yellowFly",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Yellow_Fly.webp",
        },
        {
          nameKey: "guide.fishing.lure.greenSpinner",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Green_Spinner.webp",
        },
        {
          nameKey: "guide.fishing.lure.greenJerk",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Green_Jerk.webp",
        },
        {
          nameKey: "guide.fishing.lure.blueLongMinnow",
          noteKey: "guide.fishing.lureLabel",
          icon: "assets/Blue_Long_Minnow.webp",
        },
      ],
    },
  };

  /** Kunci i18n untuk badge slot (opsional pada tiap item). */
  const SLOT_I18N = {
    hats: "guide.nether.slot.hats",
    masks: "guide.nether.slot.masks",
    mouth: "guide.nether.slot.mouth",
    shirts: "guide.nether.slot.shirts",
    pants: "guide.nether.slot.pants",
    wings: "guide.nether.slot.wings",
    tails: "guide.nether.slot.tails",
    neck: "guide.nether.slot.neck",
    shoes: "guide.nether.slot.shoes",
    gloves: "guide.nether.slot.gloves",
    weapon: "guide.nether.slot.weapon",
    shield: "guide.nether.slot.shield",
    rod: "guide.nether.slot.rod",
  };

  /**
   * Rekomendasi wearables per tier (1–5). Contoh:
   * 1: [{ nameKey: "guide.nether.item.x", level: 10, slotId: "hats", icon: "assets/x.png" }],
   */
  const GUIDE_NETHER_BY_TIER = {
    1: [
      {
        nameKey: "guide.nether.item.t1IronHelmet",
        level: 7,
        slotId: "hats",
        icon: "assets/Iron_Helmet.webp",
      },
      {
        nameKey: "guide.nether.item.t1ExecutionerAxe",
        level: 7,
        slotId: "weapon",
        icon: "assets/Executioner_Axe.webp",
      },
      {
        nameKey: "guide.nether.item.leatherGloves",
        level: 7,
        slotId: "gloves",
        icon: "assets/Leather_Gloves.webp",
      },
      {
        nameKey: "guide.nether.item.t1KiteShield",
        level: 0,
        slotId: "shield",
        icon: "assets/Kite_Shield.webp",
      },
      {
        nameKey: "guide.nether.item.vikingLeatherShoes",
        level: 0,
        slotId: "shoes",
        icon: "assets/Viking_Leather_Shoes.webp",
      },
    ],
    2: [
      {
        nameKey: "guide.nether.item.t2ChainmailVikingHelmet",
        level: 13,
        slotId: "hats",
        icon: "assets/Chainmail_Viking_Helmet.webp",
      },
      {
        nameKey: "guide.nether.item.t2LegionaryChestArmor",
        level: 13,
        slotId: "shirts",
        icon: "assets/Legionary_Chest_Armor.webp",
      },
      {
        nameKey: "guide.nether.item.t2BrownLeatherPants",
        level: 13,
        slotId: "pants",
        icon: "assets/Brown_Leather_Pants.webp",
      },
      {
        nameKey: "guide.nether.item.t2ExecutionerAxe",
        level: 7,
        slotId: "weapon",
        icon: "assets/Executioner_Axe.webp",
      },
      {
        nameKey: "guide.nether.item.leatherGloves",
        level: 7,
        slotId: "gloves",
        icon: "assets/Leather_Gloves.webp",
      },
      {
        nameKey: "guide.nether.item.t2ScutumShield",
        level: 7,
        slotId: "shield",
        icon: "assets/Scutum_Shield.webp",
      },
      {
        nameKey: "guide.nether.item.vikingLeatherShoes",
        level: 0,
        slotId: "shoes",
        icon: "assets/Viking_Leather_Shoes.webp",
      },
    ],
    3: [
      {
        nameKey: "guide.nether.item.t3GeneralsLegionaryHelmet",
        level: 23,
        slotId: "hats",
        icon: "assets/General%2527s_Legionary_Helmet.webp",
      },
      {
        nameKey: "guide.nether.item.t3LegionaryChestArmor",
        level: 13,
        slotId: "shirts",
        icon: "assets/Legionary_Chest_Armor.webp",
      },
      {
        nameKey: "guide.nether.item.t3BrownLeatherPants",
        level: 13,
        slotId: "pants",
        icon: "assets/Brown_Leather_Pants.webp",
      },
      {
        nameKey: "guide.nether.item.t3Broom",
        level: 18,
        slotId: "weapon",
        icon: "assets/Broom.webp",
      },
      {
        nameKey: "guide.nether.item.leatherGloves",
        level: 7,
        slotId: "gloves",
        icon: "assets/Leather_Gloves.webp",
      },
      {
        nameKey: "guide.nether.item.t3ScutumShield",
        level: 7,
        slotId: "shield",
        icon: "assets/Scutum_Shield.webp",
      },
      {
        nameKey: "guide.nether.item.vikingLeatherShoes",
        level: 0,
        slotId: "shoes",
        icon: "assets/Viking_Leather_Shoes.webp",
      },
    ],
    4: [
      {
        nameKey: "guide.nether.item.t3GeneralsLegionaryHelmet",
        level: 23,
        slotId: "hats",
        icon: "assets/General%2527s_Legionary_Helmet.webp",
      },
      {
        nameKey: "guide.nether.item.vikingChainmail",
        level: 37,
        slotId: "shirts",
        icon: "assets/Viking_Chainmail.webp",
      },
      {
        nameKey: "guide.nether.item.t3BrownLeatherPants",
        level: 13,
        slotId: "pants",
        icon: "assets/Brown_Leather_Pants.webp",
      },
      {
        nameKey: "guide.nether.item.honshuSword",
        level: 34,
        slotId: "weapon",
        icon: "assets/Honshu_Sword.webp",
      },
      {
        nameKey: "guide.nether.item.leatherGloves",
        level: 7,
        slotId: "gloves",
        icon: "assets/Leather_Gloves.webp",
      },
      {
        nameKey: "guide.nether.item.t2ScutumShield",
        level: 7,
        slotId: "shield",
        icon: "assets/Scutum_Shield.webp",
      },
      {
        nameKey: "guide.nether.item.vikingLeatherShoes",
        level: 0,
        slotId: "shoes",
        icon: "assets/Viking_Leather_Shoes.webp",
      },
    ],
    5: [
      {
        nameKey: "guide.nether.item.t3GeneralsLegionaryHelmet",
        level: 23,
        slotId: "hats",
        icon: "assets/General%2527s_Legionary_Helmet.webp",
      },
      {
        nameKey: "guide.nether.item.vikingChainmail",
        level: 37,
        slotId: "shirts",
        icon: "assets/Viking_Chainmail.webp",
      },
      {
        nameKey: "guide.nether.item.t3BrownLeatherPants",
        level: 13,
        slotId: "pants",
        icon: "assets/Brown_Leather_Pants.webp",
      },
      {
        nameKey: "guide.nether.item.doubleHeadedAxes",
        level: 43,
        slotId: "weapon",
        icon: "assets/Double_Headed_Axe.webp",
      },
      {
        nameKey: "guide.nether.item.leatherGloves",
        level: 7,
        slotId: "gloves",
        icon: "assets/Leather_Gloves.webp",
      },
      {
        nameKey: "guide.nether.item.t2ScutumShield",
        level: 7,
        slotId: "shield",
        icon: "assets/Scutum_Shield.webp",
      },
      {
        nameKey: "guide.nether.item.vikingLeatherShoes",
        level: 0,
        slotId: "shoes",
        icon: "assets/Viking_Leather_Shoes.webp",
      },
    ],
  };

  function renderWearCard(item) {
    const isNetherItem = Boolean(item.nameKey && item.nameKey.startsWith("guide.nether.item."));
    const isMiningItem = Boolean(item.nameKey && item.nameKey.startsWith("guide.mining.item."));
    const isFishingItem = Boolean(item.nameKey && item.nameKey.startsWith("guide.fishing.item."));
    const isGuideStatItem = isNetherItem || isMiningItem || isFishingItem;
    const card = document.createElement("div");
    card.className = "guide-wear-card";
    const iconWrap = document.createElement("div");
    iconWrap.className = "guide-wear-icon";

    if (item.icon) {
      const img = document.createElement("img");
      img.src = item.icon;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", () => {
        img.remove();
        iconWrap.classList.add("guide-wear-icon--placeholder");
        const nm = t(item.nameKey);
        iconWrap.textContent =
          nm && nm.length ? nm.charAt(0).toUpperCase() : "?";
      });
      iconWrap.appendChild(img);
    } else {
      iconWrap.classList.add("guide-wear-icon--placeholder");
      const nm = t(item.nameKey);
      iconWrap.textContent =
        nm && nm.length ? nm.charAt(0).toUpperCase() : "?";
    }

    const body = document.createElement("div");
    body.className = "guide-wear-body";

    const nameEl = document.createElement("div");
    nameEl.className = "guide-wear-name";
    nameEl.textContent = t(item.nameKey);

    body.appendChild(nameEl);

    if (isGuideStatItem) {
      const sourceStats = isNetherItem
        ? GUIDE_NETHER_STATS_BY_NAME_KEY[item.nameKey]
        : isMiningItem
          ? GUIDE_MINING_STATS_BY_NAME_KEY[item.nameKey]
          : GUIDE_FISHING_STATS_BY_NAME_KEY[item.nameKey];
      if (sourceStats) {
        const statList = document.createElement("div");
        statList.className = "guide-wear-stats-list";
        const isWeapon = item.slotId === "weapon";
        const xpValue = Number.isFinite(Number(sourceStats.lvl))
          ? Number(sourceStats.lvl)
          : Number(item.level) || 0;

        GUIDE_NETHER_STAT_ICON_ORDER.forEach((cfg) => {
          const statChip = document.createElement("span");
          statChip.className = "guide-wear-stat";
          statChip.classList.add(`guide-wear-stat--${cfg.key}`);

          const iconWrap = document.createElement("span");
          iconWrap.className = "guide-wear-stats-icon";
          const isPowerIcon = cfg.key === "power";
          const iconPath =
            isPowerIcon && !isWeapon
              ? "assets/icon/ItemInfo_Defence_icon.webp"
              : cfg.icon;

          const statImg = document.createElement("img");
          statImg.src = iconPath;
          statImg.alt = "";
          statImg.loading = "lazy";
          statImg.decoding = "async";
          statImg.addEventListener("error", () => {
            statChip.remove();
          });
          iconWrap.appendChild(statImg);

          let value = 0;
          if (cfg.key === "xp") value = xpValue;
          else if (cfg.key === "power") value = Number(sourceStats[isWeapon ? "damage" : "armor"]) || 0;
          else value = Number(sourceStats[cfg.key]) || 0;

          const valueEl = document.createElement("span");
          valueEl.className = "guide-wear-stat-value";
          if (value > 0) {
            statChip.classList.add("guide-wear-stat--active");
          }
          valueEl.textContent = cfg.key === "critical" ? `${value}%` : String(value);

          statChip.append(iconWrap, valueEl);
          statList.appendChild(statChip);
        });

        body.appendChild(statList);
      }
    }

    if (item.slotId && SLOT_I18N[item.slotId]) {
      const slotEl = document.createElement("span");
      slotEl.className = "guide-wear-slot";
      slotEl.setAttribute("data-i18n", SLOT_I18N[item.slotId]);
      slotEl.textContent = t(SLOT_I18N[item.slotId]);
      body.appendChild(slotEl);
    }

    const gearEffect = GUIDE_GEAR_EFFECT_BY_NAME_KEY[item.nameKey];
    if (gearEffect) {
      const effectEl = document.createElement("div");
      effectEl.className = "guide-wear-effect";
      effectEl.textContent = gearEffect;
      body.appendChild(effectEl);
    }

    if (!item.hideMetaRow) {
      const levelEl = document.createElement("div");
      levelEl.className = "guide-wear-level";
      if (item.level != null && Number.isFinite(Number(item.level))) {
        levelEl.textContent = t("guide.nether.level", { n: String(item.level) });
      } else if (item.noteKey) {
        levelEl.textContent = t(item.noteKey);
      } else {
        levelEl.textContent = t("guide.nether.levelUnknown");
      }
      if (!isGuideStatItem) {
        body.appendChild(levelEl);
      }

      if (item.extraNoteKey) {
        const noteEl = document.createElement("div");
        noteEl.className = "guide-wear-note";
        noteEl.textContent = t(item.extraNoteKey);
        body.appendChild(noteEl);
      }
    }

    card.append(iconWrap, body);
    return card;
  }

  function renderWearRow(item, tierAccent) {
    const row = document.createElement("div");
    row.className = "guide-wear-row";
    row.style.setProperty("--tier-accent", tierAccent);
    row.appendChild(renderWearCard(item));
    return row;
  }

  function renderWearOrRow(leftItem, rightItem, tierAccent) {
    const row = document.createElement("div");
    row.className = "guide-wear-row guide-wear-row--or";
    row.style.setProperty("--tier-accent", tierAccent);

    const left = renderWearCard(leftItem);
    const right = renderWearCard(rightItem);
    left.classList.add("guide-wear-card--or");
    right.classList.add("guide-wear-card--or");

    const sep = document.createElement("div");
    sep.className = "guide-wear-or-sep";
    sep.textContent = t("guide.common.or");

    row.append(left, sep, right);
    return row;
  }

  function renderItemRows(listEl, items, accent) {
    if (!Array.isArray(items) || items.length === 0) return;
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      const next = items[i + 1];
      if (item?.altGroup && next?.altGroup === item.altGroup) {
        listEl.appendChild(renderWearOrRow(item, next, accent));
        i += 1;
      } else {
        listEl.appendChild(renderWearRow(item, accent));
      }
    }
  }

  function attachTierDropdown(head, body, openInitially, scopeEl) {
    if (!head || !body) return;
    head.classList.add("guide-tier-head--toggle");
    head.setAttribute("role", "button");
    head.setAttribute("tabindex", "0");

    const setOpen = (open) => {
      body.hidden = !open;
      head.classList.toggle("guide-tier-head--open", open);
      head.setAttribute("aria-expanded", open ? "true" : "false");
    };

    const toggle = () => {
      const willOpen = body.hidden;
      if (willOpen && scopeEl) {
        scopeEl.querySelectorAll(".guide-nether-tier-body").forEach((otherBody) => {
          if (otherBody === body) return;
          otherBody.hidden = true;
          const otherHead = otherBody
            .closest(".guide-nether-tier")
            ?.querySelector(".guide-tier-head--toggle");
          if (otherHead) {
            otherHead.classList.remove("guide-tier-head--open");
            otherHead.setAttribute("aria-expanded", "false");
          }
        });
      }
      setOpen(willOpen);
    };

    head.addEventListener("click", () => {
      toggle();
    });
    head.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        toggle();
      }
    });
    setOpen(Boolean(openInitially));
  }

  function renderGuideNether() {
    if (!netherRoot) return;
    netherRoot.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "guide-nether-tiers-wrap";

    const tip = document.createElement("aside");
    tip.className = "guide-nether-tip";
    tip.setAttribute("role", "note");

    const infoTitle = document.createElement("h4");
    infoTitle.className = "guide-nether-tip__title";
    infoTitle.setAttribute("data-i18n", "guide.nether.infoTitle");
    infoTitle.textContent = t("guide.nether.infoTitle");

    const overview = document.createElement("p");
    overview.className = "guide-nether-tip__text";
    overview.setAttribute("data-i18n", "guide.nether.overviewText");
    overview.textContent = t("guide.nether.overviewText");

    const tipTitle = document.createElement("h4");
    tipTitle.className = "guide-nether-tip__title";
    tipTitle.setAttribute("data-i18n", "guide.nether.tipTitle");
    tipTitle.textContent = t("guide.nether.tipTitle");

    const tipBody = document.createElement("p");
    tipBody.className = "guide-nether-tip__text";
    tipBody.setAttribute("data-i18n", "guide.nether.tipText");
    tipBody.textContent = t("guide.nether.tipText");

    const combatTitle = document.createElement("h4");
    combatTitle.className = "guide-nether-tip__title";
    combatTitle.setAttribute("data-i18n", "guide.nether.combatTitle");
    combatTitle.textContent = t("guide.nether.combatTitle");

    const combatBody = document.createElement("p");
    combatBody.className = "guide-nether-tip__text";
    combatBody.setAttribute("data-i18n", "guide.nether.combatText");
    combatBody.textContent = t("guide.nether.combatText");

    const partyTitle = document.createElement("h4");
    partyTitle.className = "guide-nether-tip__title";
    partyTitle.setAttribute("data-i18n", "guide.nether.partyTipTitle");
    partyTitle.textContent = t("guide.nether.partyTipTitle");

    const partyBody = document.createElement("p");
    partyBody.className = "guide-nether-tip__text";
    partyBody.setAttribute("data-i18n", "guide.nether.partyTip");
    partyBody.textContent = t("guide.nether.partyTip");

    tip.append(infoTitle, overview, tipTitle, tipBody, combatTitle, combatBody, partyTitle, partyBody);
    wrap.appendChild(tip);

    const grid = document.createElement("div");
    grid.className = "guide-nether-tiers";
    grid.setAttribute("role", "list");

    GUIDE_NETHER_TIER_ORDER.forEach((tier) => {
      const accent = GUIDE_NETHER_TIER_ACCENT[tier] || "#5eead4";
      const col = document.createElement("section");
      col.className = "guide-nether-tier";
      col.style.setProperty("--tier-accent", accent);
      col.setAttribute("role", "listitem");

      const head = document.createElement("header");
      head.className = "guide-nether-tier-head";
      head.classList.add("guide-mining-tier-head");

      const badge = document.createElement("div");
      badge.className = "guide-nether-tier-badge";
      badge.setAttribute("aria-hidden", "true");
      const netherCost = GUIDE_NETHER_TIER_COST[tier];
      setTierBadgeContent(badge, String(tier), netherCost?.icon);

      const titles = document.createElement("div");
      titles.className = "guide-nether-tier-titles";

      const title = document.createElement("h3");
      title.className = "guide-nether-tier-title";
      title.textContent = t("guide.nether.netherLevelTitle", { n: String(tier) });

      const sub = document.createElement("p");
      sub.className = "guide-nether-tier-sub";
      const minLv = GUIDE_NETHER_TIER_MIN_LEVEL[tier];
      sub.textContent = t("guide.nether.minimumLevel", {
        n: String(minLv != null ? minLv : 0),
      });

      titles.append(title, sub);
      head.append(badge, titles);

      const cost = GUIDE_NETHER_TIER_COST[tier];
      if (cost) {
        head.appendChild(renderTierCostHeader(cost, "guide.nether.costLabel"));
      }

      const list = document.createElement("div");
      list.className = "guide-nether-tier-body";

      const items = GUIDE_NETHER_BY_TIER[tier] || [];
      if (items.length === 0) {
        const empty = document.createElement("p");
        empty.className = "guide-nether-empty";
        empty.setAttribute("data-i18n", "guide.nether.tierEmpty");
        empty.textContent = t("guide.nether.tierEmpty");
        list.appendChild(empty);
      } else {
        items.forEach((item) => {
          list.appendChild(renderWearRow(item, accent));
        });
      }

      attachTierDropdown(head, list, false, grid);
      col.append(head, list);
      grid.appendChild(col);
    });

    wrap.appendChild(grid);
    netherRoot.appendChild(wrap);
  }

  function setTierBadgeContent(badgeEl, fallbackText, iconPath) {
    badgeEl.textContent = "";
    if (!iconPath) {
      badgeEl.textContent = fallbackText;
      return;
    }
    const badgeImg = document.createElement("img");
    badgeImg.src = iconPath;
    badgeImg.alt = "";
    badgeImg.loading = "lazy";
    badgeImg.decoding = "async";
    badgeImg.className = "guide-nether-tier-badge__img";
    badgeImg.addEventListener("error", () => {
      badgeImg.remove();
      badgeEl.textContent = fallbackText;
    });
    badgeEl.appendChild(badgeImg);
  }

  function renderTierCostHeader(cost, labelKey, level) {
    const wrap = document.createElement("div");
    wrap.className = "guide-mining-head-cost";

    const iconWrap = document.createElement("span");
    iconWrap.className = "guide-mining-head-cost__icon";

    if (cost.icon) {
      const img = document.createElement("img");
      img.src = cost.icon;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", () => {
        img.remove();
        iconWrap.classList.add("guide-mining-head-cost__icon--placeholder");
        iconWrap.textContent = "$";
      });
      iconWrap.appendChild(img);
    } else {
      iconWrap.classList.add("guide-mining-head-cost__icon--placeholder");
      iconWrap.textContent = "-";
    }

    const txtWrap = document.createElement("span");
    txtWrap.className = "guide-mining-head-cost__text";

    const label = document.createElement("span");
    label.className = "guide-mining-head-cost__label";
    label.textContent = t(labelKey);

    const value = document.createElement("span");
    value.className = "guide-mining-head-cost__value";
    value.textContent = t(cost.nameKey);

    txtWrap.append(label, value);
    if (level != null) {
      const meta = document.createElement("span");
      meta.className = "guide-mining-head-cost__meta";
      meta.textContent = t("guide.nether.level", { n: String(level) });
      txtWrap.appendChild(meta);
    }
    wrap.append(iconWrap, txtWrap);
    return wrap;
  }

  function renderGuideMining() {
    if (!miningRoot) return;
    miningRoot.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "guide-nether-tiers-wrap";

    const tip = document.createElement("aside");
    tip.className = "guide-nether-tip";
    tip.setAttribute("role", "note");

    const infoTitle = document.createElement("h4");
    infoTitle.className = "guide-nether-tip__title";
    infoTitle.setAttribute("data-i18n", "guide.mining.infoTitle");
    infoTitle.textContent = t("guide.mining.infoTitle");

    const overview = document.createElement("p");
    overview.className = "guide-nether-tip__text";
    overview.setAttribute("data-i18n", "guide.mining.overviewText");
    overview.textContent = t("guide.mining.overviewText");

    const tipTitle = document.createElement("h4");
    tipTitle.className = "guide-nether-tip__title";
    tipTitle.setAttribute("data-i18n", "guide.mining.tipTitle");
    tipTitle.textContent = t("guide.mining.tipTitle");

    const tipBody = document.createElement("p");
    tipBody.className = "guide-nether-tip__text";
    tipBody.setAttribute("data-i18n", "guide.mining.tipText");
    tipBody.textContent = t("guide.mining.tipText");

    const gearTitle = document.createElement("h4");
    gearTitle.className = "guide-nether-tip__title";
    gearTitle.setAttribute("data-i18n", "guide.mining.gearTitle");
    gearTitle.textContent = t("guide.mining.gearTitle");

    const gearBody = document.createElement("p");
    gearBody.className = "guide-nether-tip__text";
    gearBody.setAttribute("data-i18n", "guide.mining.gearText");
    gearBody.textContent = t("guide.mining.gearText");

    const importantTitle = document.createElement("h4");
    importantTitle.className = "guide-nether-tip__title";
    importantTitle.setAttribute("data-i18n", "guide.mining.importantTitle");
    importantTitle.textContent = t("guide.mining.importantTitle");

    const importantBody = document.createElement("p");
    importantBody.className = "guide-nether-tip__text";
    importantBody.setAttribute("data-i18n", "guide.mining.importantText");
    importantBody.textContent = t("guide.mining.importantText");

    tip.append(
      infoTitle,
      overview,
      tipTitle,
      tipBody,
      gearTitle,
      gearBody,
      importantTitle,
      importantBody,
    );
    wrap.appendChild(tip);

    const grid = document.createElement("div");
    grid.className = "guide-nether-tiers";
    grid.setAttribute("role", "list");

    GUIDE_MINING_TIER_ORDER.forEach((tier) => {
      const accent = GUIDE_NETHER_TIER_ACCENT[tier] || "#5eead4";
      const col = document.createElement("section");
      col.className = "guide-nether-tier";
      col.style.setProperty("--tier-accent", accent);
      col.setAttribute("role", "listitem");

      const head = document.createElement("header");
      head.className = "guide-nether-tier-head";
      head.classList.add("guide-mining-tier-head");

      const badge = document.createElement("div");
      badge.className = "guide-nether-tier-badge";
      badge.setAttribute("aria-hidden", "true");
      const miningCost = GUIDE_MINING_TIER_COST[tier];
      const miningBadgeIcon = miningCost?.icon || "assets/Bronze_Mine_Key_29.webp";
      setTierBadgeContent(badge, String(tier), miningBadgeIcon);

      const titles = document.createElement("div");
      titles.className = "guide-nether-tier-titles";

      const title = document.createElement("h3");
      title.className = "guide-nether-tier-title";
      title.textContent = t("guide.mining.levelTitle", { n: String(tier) });

      const sub = document.createElement("div");
      sub.className = "guide-mining-tier-subrow";
      const minLv = GUIDE_MINING_TIER_MIN_LEVEL[tier];

      const minEl = document.createElement("p");
      minEl.className = "guide-nether-tier-sub";
      minEl.textContent = t("guide.mining.minimumLevel", {
        n: String(minLv != null ? minLv : 0),
      });

      const cost = GUIDE_MINING_TIER_COST[tier];
      sub.append(minEl);
      titles.append(title, sub);
      head.append(badge, titles);
      if (cost) head.appendChild(renderTierCostHeader(cost, "guide.mining.costLabel"));

      const list = document.createElement("div");
      list.className = "guide-nether-tier-body";

      const items = GUIDE_MINING_BY_TIER[tier] || [];
      if (items.length === 0) {
        const empty = document.createElement("p");
        empty.className = "guide-nether-empty";
        empty.setAttribute("data-i18n", "guide.nether.tierEmpty");
        empty.textContent = t("guide.nether.tierEmpty");
        list.appendChild(empty);
      } else {
        renderItemRows(list, items, accent);
      }

      const targetKey = GUIDE_MINING_TARGET_BY_TIER[tier];
      if (targetKey) {
        const target = document.createElement("p");
        target.className = "guide-mining-target";
        target.textContent = t("guide.mining.targetLabel", { target: t(targetKey) });
        list.appendChild(target);
      }

      attachTierDropdown(head, list, false, grid);
      col.append(head, list);
      grid.appendChild(col);
    });

    wrap.appendChild(grid);
    miningRoot.appendChild(wrap);
  }

  function renderFishingCard(cfg, accent, scopeEl) {
    const col = document.createElement("section");
    col.className = "guide-nether-tier";
    col.style.setProperty("--tier-accent", accent);
    col.setAttribute("role", "listitem");

    const head = document.createElement("header");
    head.className = "guide-nether-tier-head";
    head.classList.add("guide-mining-tier-head");

    const badge = document.createElement("div");
    badge.className = "guide-nether-tier-badge";
    badge.setAttribute("aria-hidden", "true");
    setTierBadgeContent(badge, cfg.badge || "F", cfg.badgeIcon);

    const titles = document.createElement("div");
    titles.className = "guide-nether-tier-titles";

    const title = document.createElement("h3");
    title.className = "guide-nether-tier-title";
    title.textContent = t(cfg.titleKey);
    titles.appendChild(title);

    head.append(badge, titles);

    const list = document.createElement("div");
    list.className = "guide-nether-tier-body";

    if (cfg.items?.length) {
      renderItemRows(list, cfg.items, accent);
    } else {
      const empty = document.createElement("p");
      empty.className = "guide-nether-empty";
      empty.textContent = t("guide.fishing.stagePending");
      list.appendChild(empty);
    }

    if (cfg.lures?.length) {
      const lureTitle = document.createElement("p");
      lureTitle.className = "guide-fishing-lure-title";
      lureTitle.textContent = t("guide.fishing.lureTitle");
      list.appendChild(lureTitle);
      renderItemRows(list, cfg.lures, accent);
    }

    attachTierDropdown(head, list, false, scopeEl);
    col.append(head, list);
    return col;
  }

  function renderGuideFishing() {
    if (!fishingRoot) return;
    fishingRoot.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "guide-nether-tiers-wrap";

    const tip = document.createElement("aside");
    tip.className = "guide-nether-tip";
    tip.setAttribute("role", "note");

    const infoTitle = document.createElement("h4");
    infoTitle.className = "guide-nether-tip__title";
    infoTitle.setAttribute("data-i18n", "guide.fishing.infoTitle");
    infoTitle.textContent = t("guide.fishing.infoTitle");

    const overview = document.createElement("p");
    overview.className = "guide-nether-tip__text";
    overview.setAttribute("data-i18n", "guide.fishing.overviewText");
    overview.textContent = t("guide.fishing.overviewText");

    const tipTitle = document.createElement("h4");
    tipTitle.className = "guide-nether-tip__title";
    tipTitle.setAttribute("data-i18n", "guide.fishing.tipTitle");
    tipTitle.textContent = t("guide.fishing.tipTitle");

    const tipBody = document.createElement("p");
    tipBody.className = "guide-nether-tip__text";
    tipBody.setAttribute("data-i18n", "guide.fishing.tipText");
    tipBody.textContent = t("guide.fishing.tipText");

    const gearTitle = document.createElement("h4");
    gearTitle.className = "guide-nether-tip__title";
    gearTitle.setAttribute("data-i18n", "guide.fishing.gearTitle");
    gearTitle.textContent = t("guide.fishing.gearTitle");

    const gearBody = document.createElement("p");
    gearBody.className = "guide-nether-tip__text";
    gearBody.setAttribute("data-i18n", "guide.fishing.gearText");
    gearBody.textContent = t("guide.fishing.gearText");

    const importantTitle = document.createElement("h4");
    importantTitle.className = "guide-nether-tip__title";
    importantTitle.setAttribute("data-i18n", "guide.fishing.importantTitle");
    importantTitle.textContent = t("guide.fishing.importantTitle");

    const importantBody = document.createElement("p");
    importantBody.className = "guide-nether-tip__text";
    importantBody.setAttribute("data-i18n", "guide.fishing.importantText");
    importantBody.textContent = t("guide.fishing.importantText");

    tip.append(
      infoTitle,
      overview,
      tipTitle,
      tipBody,
      gearTitle,
      gearBody,
      importantTitle,
      importantBody,
    );
    wrap.appendChild(tip);

    const ingredientTitle = document.createElement("h4");
    ingredientTitle.className = "guide-fishing-section-title";
    ingredientTitle.textContent = t("guide.fishing.category.ingredient");
    wrap.appendChild(ingredientTitle);

    const ingredientGrid = document.createElement("div");
    ingredientGrid.className = "guide-nether-tiers";
    ingredientGrid.setAttribute("role", "list");
    ingredientGrid.appendChild(
      renderFishingCard(GUIDE_FISHING_INGREDIENT, "#22d3ee", ingredientGrid)
    );
    wrap.appendChild(ingredientGrid);

    const gemsTitle = document.createElement("h4");
    gemsTitle.className = "guide-fishing-section-title";
    gemsTitle.textContent = t("guide.fishing.category.gems");
    wrap.appendChild(gemsTitle);

    const gemsGrid = document.createElement("div");
    gemsGrid.className = "guide-nether-tiers";
    gemsGrid.setAttribute("role", "list");

    GUIDE_FISHING_GEMS_STAGE_ORDER.forEach((stage) => {
      const cfg = GUIDE_FISHING_GEMS_BY_STAGE[stage];
      if (!cfg) return;
      let accent = "#34d399";
      if (stage === "mid") accent = "#38bdf8";
      if (stage === "late") accent = "#f59e0b";
      gemsGrid.appendChild(renderFishingCard(cfg, accent, gemsGrid));
    });

    wrap.appendChild(gemsGrid);
    fishingRoot.appendChild(wrap);
  }

  function renderGuideFarming() {
    if (!farmingRoot) return;
    farmingRoot.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "guide-nether-tiers-wrap";

    const tip = document.createElement("aside");
    tip.className = "guide-nether-tip";
    tip.setAttribute("role", "note");

    const introTitle = document.createElement("h4");
    introTitle.className = "guide-nether-tip__title";
    introTitle.setAttribute("data-i18n", "guide.farming.introTitle");
    introTitle.textContent = t("guide.farming.introTitle");

    const introBody = document.createElement("p");
    introBody.className = "guide-nether-tip__text";
    introBody.setAttribute("data-i18n", "guide.farming.introBody");
    introBody.textContent = t("guide.farming.introBody");

    const tipTitle = document.createElement("h4");
    tipTitle.className = "guide-nether-tip__title";
    tipTitle.setAttribute("data-i18n", "guide.farming.tipTitle");
    tipTitle.textContent = t("guide.farming.tipTitle");

    const tipBody = document.createElement("p");
    tipBody.className = "guide-nether-tip__text";
    tipBody.setAttribute("data-i18n", "guide.farming.tipBody");
    tipBody.textContent = t("guide.farming.tipBody");

    tip.append(introTitle, introBody, tipTitle, tipBody);
    appendGuideGearNote(tip);
    wrap.appendChild(tip);

    const recHeading = document.createElement("h3");
    recHeading.className = "guide-fishing-section-title";
    recHeading.setAttribute("data-i18n", "guide.farming.recommendationsHeading");
    recHeading.textContent = t("guide.farming.recommendationsHeading");
    wrap.appendChild(recHeading);

    const grid = document.createElement("div");
    grid.className = "guide-nether-tiers";
    grid.setAttribute("role", "list");

    GUIDE_FARMING_STAGE_ORDER.forEach(function (stage) {
      const meta = GUIDE_FARMING_STAGE_META[stage];
      if (!meta) return;
      const accent = meta.accent || "#5eead4";
      const col = document.createElement("section");
      col.className = "guide-nether-tier";
      col.style.setProperty("--tier-accent", accent);
      col.setAttribute("role", "listitem");

      const head = document.createElement("header");
      head.className = "guide-nether-tier-head";
      head.classList.add("guide-mining-tier-head");

      const badge = document.createElement("div");
      badge.className = "guide-nether-tier-badge";
      badge.setAttribute("aria-hidden", "true");
      setTierBadgeContent(badge, meta.badge, "");

      const titles = document.createElement("div");
      titles.className = "guide-nether-tier-titles";

      const title = document.createElement("h3");
      title.className = "guide-nether-tier-title";
      title.setAttribute("data-i18n", meta.titleKey);
      title.textContent = t(meta.titleKey);
      titles.appendChild(title);

      if (meta.descKey) {
        const desc = document.createElement("p");
        desc.className = "guide-nether-tier-sub";
        desc.setAttribute("data-i18n", meta.descKey);
        desc.textContent = t(meta.descKey);
        titles.appendChild(desc);
      }

      head.append(badge, titles);

      const list = document.createElement("div");
      list.className = "guide-nether-tier-body";

      const items = GUIDE_FARMING_BY_STAGE[stage] || [];
      if (items.length === 0) {
        const empty = document.createElement("p");
        empty.className = "guide-nether-empty";
        empty.setAttribute("data-i18n", "guide.nether.tierEmpty");
        empty.textContent = t("guide.nether.tierEmpty");
        list.appendChild(empty);
      } else {
        renderItemRows(list, items, accent);
      }

      attachTierDropdown(head, list, false, grid);
      col.append(head, list);
      grid.appendChild(col);
    });

    wrap.appendChild(grid);
    farmingRoot.appendChild(wrap);
  }

  function renderGuideMassing() {
    renderGuideTextSections(
      massingRoot,
      "guide.massing.pageHeading",
      GUIDE_MASSING_TEXT_BLOCKS,
    );
  }

  function renderGuideComingSoon(root) {
    if (!root) return;
    root.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "guide-nether-tiers-wrap";
    appendGuideTextBlock(wrap, "guide.subtabDisabledTitle", "guide.soon");
    root.appendChild(wrap);
  }

  function renderAndI18n() {
    renderGuideNether();
    renderGuideMining();
    renderGuideFishing();
    // Temporary rollout: show Coming Soon page only.
    // renderGuideFarming();
    // renderGuideMassing();
    renderGuideComingSoon(farmingRoot);
    renderGuideComingSoon(massingRoot);
    if (typeof PWI18N !== "undefined") PWI18N.applyI18n();
  }

  window.addEventListener("pw-lang-change", renderAndI18n);

  renderAndI18n();
})();
