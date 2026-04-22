/**
 * Shop lure calculator (lure-shop.html). Rows from LURE_SHOP_ITEMS; icons optional.
 */
(function () {
  const tbody = document.getElementById("lure-shop-tbody");
  if (!tbody) return;

  const LURE_SHOP_ITEMS = [
    { id: "worm-bait", nameKey: "lureShop.names.wormBait", icon: "assets/Worm_Bait.webp" },
    { id: "breadcrumb", nameKey: "lureShop.names.breadcrumb", icon: "assets/Breadcrumb_Bait.webp" },
    { id: "green-small-minnow", nameKey: "lureShop.names.greenSmallMinnow", icon: "assets/Green_Small_Minnow.webp" },
    { id: "pink-small-minnow", nameKey: "lureShop.names.pinkSmallMinnow", icon: "assets/Pink_Small_Minnow.webp" },
    { id: "black-tungsten-jig", nameKey: "lureShop.names.blackTungstenJig", icon: "assets/Black_Tungsten_Jig.webp" },
    { id: "red-tungsten-jig", nameKey: "lureShop.names.redTungstenJig", icon: "assets/Red_Tungsten_Jig.webp" },
    { id: "golden-spoon", nameKey: "lureShop.names.goldenSpoon", icon: "assets/Golden_Spoon.webp" },
    { id: "striped-spoon", nameKey: "lureShop.names.stripedSpoon", icon: "assets/Striped_Spoon.webp" },
    { id: "purple-twirltail-jig", nameKey: "lureShop.names.purpleTwirltailJig", icon: "assets/Purple_Twirltail_Jig.webp" },
    { id: "green-twirltail-jig", nameKey: "lureShop.names.greenTwirltailJig", icon: "assets/Green_Twirltail_Jig.webp" },
    { id: "yellow-fly", nameKey: "lureShop.names.yellowFly", icon: "assets/Yellow_Fly.webp" },
    { id: "red-fly", nameKey: "lureShop.names.redFly", icon: "assets/Red_Fly.webp" },
    { id: "green-jerk", nameKey: "lureShop.names.greenJerk", icon: "assets/Green_Jerk.webp" },
    { id: "red-jerk", nameKey: "lureShop.names.redJerk", icon: "assets/Red_Jerk.webp" },
    { id: "neon-spoon", nameKey: "lureShop.names.neonSpoon", icon: "assets/Neon_Spoon.webp" },
    { id: "red-glowing-lure", nameKey: "lureShop.names.redGlowingLure", icon: "assets/Red_Glowing_Lure.webp" },
    { id: "green-glowing-lure", nameKey: "lureShop.names.greenGlowingLure", icon: "assets/Green_Glowing_Lure.webp" },
    { id: "golden-spinner", nameKey: "lureShop.names.goldenSpinner", icon: "assets/Golden_Spinner.webp" },
    { id: "green-spinner", nameKey: "lureShop.names.greenSpinner", icon: "assets/Green_Spinner.webp" },
    { id: "silver-long-minnow", nameKey: "lureShop.names.silverLongMinnow", icon: "assets/Silver_Long_Minnow.webp" },
    { id: "blue-long-minnow", nameKey: "lureShop.names.blueLongMinnow", icon: "assets/Blue_Long_Minnow.webp" },
    { id: "radioactive-worm-bait", nameKey: "lureShop.names.radioactiveWormBait", icon: "assets/Radioactive_Worm_Bait.webp" },
  ];

  const spendGemsEl = document.getElementById("lure-shop-spend-gems");
  const outRevenueByte = document.getElementById("lure-shop-revenue-byte");
  const outBytePerGem = document.getElementById("lure-shop-byte-per-gem");
  const statusEl = document.getElementById("lure-shop-status");

  function t(key, vars) {
    if (typeof PWI18N === "undefined") return key;
    return PWI18N.t(key, vars);
  }

  function formatNum(n) {
    const loc = typeof PWI18N !== "undefined" && PWI18N.getLang() === "en" ? "en-US" : "id-ID";
    if (!Number.isFinite(n)) return "0";
    const rounded = Math.round(n * 100) / 100;
    return new Intl.NumberFormat(loc, { maximumFractionDigits: 2 }).format(rounded);
  }

  function parseNum(el) {
    if (!el) return 0;
    const raw = String(el.value ?? "").trim().replace(",", ".");
    if (raw === "") return 0;
    const v = parseFloat(raw);
    return Number.isFinite(v) ? v : 0;
  }

  function setMode(tr, mode) {
    const next = mode === "pack" ? "pack" : "unit";
    tr.dataset.lurePriceMode = next;
    tr.querySelectorAll("[data-lure-mode-btn]").forEach((btn) => {
      const on = btn.getAttribute("data-lure-mode-btn") === next;
      btn.classList.toggle("lure-shop-mode-btn--active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    const gUnit = tr.querySelector('[data-field-group="unit"]');
    const gPack = tr.querySelector('[data-field-group="pack"]');
    if (gUnit) gUnit.hidden = next !== "unit";
    if (gPack) gPack.hidden = next !== "pack";
  }

  function rowUnitPrice(tr) {
    const mode = tr.dataset.lurePriceMode || "unit";
    if (mode === "unit") {
      const inp = tr.querySelector('[data-field="unit-price"]');
      return Math.max(0, parseNum(inp));
    }
    const pq = tr.querySelector('[data-field="pack-qty"]');
    const pt = tr.querySelector('[data-field="pack-total"]');
    const qty = Math.max(0, parseNum(pq));
    const total = Math.max(0, parseNum(pt));
    if (qty <= 0) return 0;
    return total / qty;
  }

  function recalcRow(tr) {
    const stock = Math.max(0, Math.floor(parseNum(tr.querySelector('[data-field="stock"]'))));
    const unit = rowUnitPrice(tr);
    const sub = stock * unit;
    const out = tr.querySelector('[data-output="subtotal"]');
    if (out) out.textContent = formatNum(sub);
    return sub;
  }

  function recalcAll() {
    let revenueBytes = 0;
    tbody.querySelectorAll("tr[data-lure-row]").forEach((tr) => {
      revenueBytes += recalcRow(tr);
    });

    const spendGems = Math.max(0, parseNum(spendGemsEl));
    const bytePerGem = spendGems > 0 ? revenueBytes / spendGems : 0;

    if (outRevenueByte) outRevenueByte.textContent = formatNum(revenueBytes);
    if (outBytePerGem) outBytePerGem.textContent = formatNum(bytePerGem);

    if (statusEl) {
      statusEl.classList.remove("lure-shop-status--profit", "lure-shop-status--loss", "lure-shop-status--break");
      if (spendGems > 0) {
        statusEl.textContent = t("lureShop.statusProfit", { n: formatNum(bytePerGem) });
        statusEl.classList.add("lure-shop-status--profit");
      } else if (revenueBytes > 0) {
        statusEl.textContent = t("lureShop.statusBreak");
        statusEl.classList.add("lure-shop-status--break");
      } else {
        statusEl.textContent = t("lureShop.statusLoss");
        statusEl.classList.add("lure-shop-status--loss");
      }
    }
  }

  function buildRow(item) {
    const idBase = `lure-shop-${item.id}`;
    const tr = document.createElement("tr");
    tr.dataset.lureRow = item.id;
    tr.dataset.lurePriceMode = "unit";

    const tdLure = document.createElement("td");
    const lureCell = document.createElement("div");
    lureCell.className = "lure-shop-lure-cell";
    const iconWrap = document.createElement("div");
    iconWrap.className = "lure-shop-icon";
    if (item.icon) {
      const img = document.createElement("img");
      img.src = item.icon;
      img.alt = "";
      img.decoding = "async";
      img.loading = "lazy";
      img.className = "lure-shop-icon__img";
      iconWrap.appendChild(img);
    } else {
      iconWrap.classList.add("lure-shop-icon--empty");
      iconWrap.setAttribute("aria-hidden", "true");
    }
    const name = document.createElement("span");
    name.className = "lure-shop-name";
    name.setAttribute("data-i18n", item.nameKey);
    lureCell.append(iconWrap, name);
    tdLure.appendChild(lureCell);

    const tdMode = document.createElement("td");
    const modeGroup = document.createElement("div");
    modeGroup.className = "segmented lure-shop-mode";
    modeGroup.setAttribute("role", "group");
    modeGroup.setAttribute("data-i18n-attr", "aria-label|lureShop.modeGroupAria");
    const btnUnit = document.createElement("button");
    btnUnit.type = "button";
    btnUnit.className = "lure-shop-mode-btn lure-shop-mode-btn--active";
    btnUnit.setAttribute("data-lure-mode-btn", "unit");
    btnUnit.setAttribute("aria-pressed", "true");
    btnUnit.setAttribute("data-i18n", "lureShop.modeUnit");
    const btnPack = document.createElement("button");
    btnPack.type = "button";
    btnPack.className = "lure-shop-mode-btn";
    btnPack.setAttribute("data-lure-mode-btn", "pack");
    btnPack.setAttribute("aria-pressed", "false");
    btnPack.setAttribute("data-i18n", "lureShop.modePack");
    modeGroup.append(btnUnit, btnPack);
    tdMode.appendChild(modeGroup);

    const tdPrice = document.createElement("td");
    const priceWrap = document.createElement("div");
    priceWrap.className = "lure-shop-price-wrap";

    const gUnit = document.createElement("div");
    gUnit.className = "lure-shop-field-group";
    gUnit.setAttribute("data-field-group", "unit");
    const labUnit = document.createElement("label");
    labUnit.className = "lure-shop-field-label";
    labUnit.setAttribute("data-i18n", "lureShop.unitPriceLabel");
    labUnit.htmlFor = `${idBase}-unit`;
    const inpUnit = document.createElement("input");
    inpUnit.id = `${idBase}-unit`;
    inpUnit.type = "number";
    inpUnit.className = "lure-shop-input";
    inpUnit.setAttribute("data-field", "unit-price");
    inpUnit.setAttribute("min", "0");
    inpUnit.setAttribute("step", "any");
    inpUnit.setAttribute("inputmode", "decimal");
    inpUnit.setAttribute("data-i18n-attr", "aria-label|lureShop.unitPriceAria");
    gUnit.append(labUnit, inpUnit);

    const gPack = document.createElement("div");
    gPack.className = "lure-shop-field-group";
    gPack.setAttribute("data-field-group", "pack");
    gPack.hidden = true;
    const labPq = document.createElement("label");
    labPq.className = "lure-shop-field-label";
    labPq.setAttribute("data-i18n", "lureShop.packQtyLabel");
    labPq.htmlFor = `${idBase}-pack-qty`;
    const inpPq = document.createElement("input");
    inpPq.id = `${idBase}-pack-qty`;
    inpPq.type = "number";
    inpPq.className = "lure-shop-input";
    inpPq.setAttribute("data-field", "pack-qty");
    inpPq.setAttribute("min", "0");
    inpPq.setAttribute("step", "1");
    inpPq.setAttribute("data-i18n-attr", "aria-label|lureShop.packQtyAria");
    const labPt = document.createElement("label");
    labPt.className = "lure-shop-field-label";
    labPt.setAttribute("data-i18n", "lureShop.packTotalLabel");
    labPt.htmlFor = `${idBase}-pack-total`;
    const inpPt = document.createElement("input");
    inpPt.id = `${idBase}-pack-total`;
    inpPt.type = "number";
    inpPt.className = "lure-shop-input";
    inpPt.setAttribute("data-field", "pack-total");
    inpPt.setAttribute("min", "0");
    inpPt.setAttribute("step", "any");
    inpPt.setAttribute("inputmode", "decimal");
    inpPt.setAttribute("data-i18n-attr", "aria-label|lureShop.packTotalAria");
    gPack.append(labPq, inpPq, labPt, inpPt);

    priceWrap.append(gUnit, gPack);
    tdPrice.appendChild(priceWrap);

    const tdStock = document.createElement("td");
    const stockWrap = document.createElement("div");
    stockWrap.className = "lure-shop-field-group lure-shop-field-group--stock";
    const labSt = document.createElement("label");
    labSt.className = "lure-shop-field-label";
    labSt.setAttribute("data-i18n", "lureShop.stockLabel");
    labSt.htmlFor = `${idBase}-stock`;
    const inpSt = document.createElement("input");
    inpSt.id = `${idBase}-stock`;
    inpSt.type = "number";
    inpSt.className = "lure-shop-input";
    inpSt.setAttribute("data-field", "stock");
    inpSt.setAttribute("min", "0");
    inpSt.setAttribute("step", "1");
    inpSt.setAttribute("data-i18n-attr", "aria-label|lureShop.stockAria");
    stockWrap.append(labSt, inpSt);
    tdStock.appendChild(stockWrap);

    const tdSub = document.createElement("td");
    tdSub.className = "lure-shop-table__num";
    const outSub = document.createElement("output");
    outSub.setAttribute("data-output", "subtotal");
    outSub.className = "lure-shop-subtotal";
    outSub.textContent = "0";
    tdSub.appendChild(outSub);

    tr.append(tdLure, tdMode, tdPrice, tdStock, tdSub);
    return tr;
  }

  function buildRows() {
    tbody.innerHTML = "";
    LURE_SHOP_ITEMS.forEach((item) => {
      tbody.appendChild(buildRow(item));
    });
    if (typeof PWI18N !== "undefined") PWI18N.applyI18n();
    recalcAll();
  }

  tbody.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lure-mode-btn]");
    if (!btn || !tbody.contains(btn)) return;
    const tr = btn.closest("tr[data-lure-row]");
    if (!tr) return;
    const mode = btn.getAttribute("data-lure-mode-btn");
    setMode(tr, mode);
    recalcAll();
  });

  tbody.addEventListener("input", (e) => {
    if (!tbody.contains(e.target)) return;
    recalcAll();
  });

  if (spendGemsEl) spendGemsEl.addEventListener("input", recalcAll);

  window.addEventListener("pw-lang-change", () => {
    if (typeof PWI18N !== "undefined") PWI18N.applyI18n();
    recalcAll();
  });

  buildRows();
})();
