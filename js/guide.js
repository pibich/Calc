/**
 * Panduan Nether: lima tier (Nether level 1–5), ditampilkan vertikal. Isi wearables di GUIDE_NETHER_BY_TIER.
 * Tiap item: { nameKey, level, icon?, slotId? } — slotId = hats|masks|... untuk badge (opsional).
 */
(function () {
  const netherRoot = document.getElementById("guide-nether-root");
  const miningRoot = document.getElementById("guide-mining-root");
  const fishingRoot = document.getElementById("guide-fishing-root");
  if (!netherRoot && !miningRoot && !fishingRoot) return;

  function t(key, vars) {
    if (typeof PWI18N === "undefined") return key;
    return PWI18N.t(key, vars);
  }

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

    if (item.slotId && SLOT_I18N[item.slotId]) {
      const slotEl = document.createElement("span");
      slotEl.className = "guide-wear-slot";
      slotEl.setAttribute("data-i18n", SLOT_I18N[item.slotId]);
      slotEl.textContent = t(SLOT_I18N[item.slotId]);
      body.appendChild(slotEl);
    }

    const levelEl = document.createElement("div");
    levelEl.className = "guide-wear-level";
    if (item.level != null && Number.isFinite(Number(item.level))) {
      levelEl.textContent = t("guide.nether.level", { n: String(item.level) });
    } else if (item.noteKey) {
      levelEl.textContent = t(item.noteKey);
    } else {
      levelEl.textContent = t("guide.nether.levelUnknown");
    }
    body.appendChild(levelEl);

    if (item.extraNoteKey) {
      const noteEl = document.createElement("div");
      noteEl.className = "guide-wear-note";
      noteEl.textContent = t(item.extraNoteKey);
      body.appendChild(noteEl);
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

    tip.append(infoTitle, overview, combatTitle, combatBody, partyTitle, partyBody);
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

    tip.append(infoTitle, overview, tipTitle, tipBody);
    appendGuideGearNote(tip);
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

    tip.append(infoTitle, overview, tipTitle, tipBody);
    appendGuideGearNote(tip);
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

  function renderAndI18n() {
    renderGuideNether();
    renderGuideMining();
    renderGuideFishing();
    if (typeof PWI18N !== "undefined") PWI18N.applyI18n();
  }

  window.addEventListener("pw-lang-change", renderAndI18n);

  renderAndI18n();
})();
