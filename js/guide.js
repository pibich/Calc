/**
 * Panduan Nether: lima tier (Nether level 1–5), ditampilkan vertikal. Isi wearables di GUIDE_NETHER_BY_TIER.
 * Tiap item: { nameKey, level, icon?, slotId? } — slotId = hats|masks|... untuk badge (opsional).
 */
(function () {
  const root = document.getElementById("guide-nether-root");
  if (!root) return;

  function t(key, vars) {
    if (typeof PWI18N === "undefined") return key;
    return PWI18N.t(key, vars);
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

  /** Kunci i18n untuk badge slot (opsional pada tiap item). */
  const SLOT_I18N = {
    hats: "guide.nether.slot.hats",
    masks: "guide.nether.slot.masks",
    shirts: "guide.nether.slot.shirts",
    pants: "guide.nether.slot.pants",
    wings: "guide.nether.slot.wings",
    tails: "guide.nether.slot.tails",
    shoes: "guide.nether.slot.shoes",
    gloves: "guide.nether.slot.gloves",
    weapon: "guide.nether.slot.weapon",
    shield: "guide.nether.slot.shield",
  };

  /**
   * Rekomendasi wearables per tier (1–5). Contoh:
   * 1: [{ nameKey: "guide.nether.item.x", level: 10, slotId: "hats", icon: "assets/x.png" }],
   */
  const GUIDE_NETHER_BY_TIER = {
    1: [
      {
        nameKey: "guide.nether.item.t1IronHelmet",
        level: 10,
        slotId: "hats",
        icon: "assets/Iron_Helmet.webp",
      },
      {
        nameKey: "guide.nether.item.t1KiteShield",
        level: 0,
        slotId: "shield",
        icon: "assets/Kite_Shield.webp",
      },
      {
        nameKey: "guide.nether.item.t1WoodenSword",
        level: 5,
        slotId: "weapon",
        icon: "assets/Wooden_Sword.webp",
      },
      {
        nameKey: "guide.nether.item.t1ExecutionerAxe",
        level: 7,
        slotId: "weapon",
        icon: "assets/Executioner_Axe.webp",
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
        nameKey: "guide.nether.item.t2ScutumShield",
        level: 7,
        slotId: "shield",
        icon: "assets/Scutum_Shield.webp",
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
        nameKey: "guide.nether.item.t3ScutumShield",
        level: 7,
        slotId: "shield",
        icon: "assets/Scutum_Shield.webp",
      },
    ],
    4: [],
    5: [],
  };

  function renderWearRow(item, tierAccent) {
    const row = document.createElement("div");
    row.className = "guide-wear-row";
    row.style.setProperty("--tier-accent", tierAccent);

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
    } else {
      levelEl.textContent = t("guide.nether.levelUnknown");
    }
    body.appendChild(levelEl);

    row.append(iconWrap, body);
    return row;
  }

  function renderGuideNether() {
    root.innerHTML = "";

    const wrap = document.createElement("div");
    wrap.className = "guide-nether-tiers-wrap";

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

      const badge = document.createElement("div");
      badge.className = "guide-nether-tier-badge";
      badge.setAttribute("aria-hidden", "true");
      badge.textContent = String(tier);

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

      col.append(head, list);
      grid.appendChild(col);
    });

    wrap.appendChild(grid);
    root.appendChild(wrap);
  }

  function renderAndI18n() {
    renderGuideNether();
    if (typeof PWI18N !== "undefined") PWI18N.applyI18n();
  }

  window.addEventListener("pw-lang-change", renderAndI18n);

  renderAndI18n();
})();
