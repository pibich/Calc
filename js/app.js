(function () {
  const miningRows = document.getElementById("mining-rows");
  const miningTotal = document.getElementById("mining-total");
  const fishingRows = document.getElementById("fishing-rows");
  const fishingTotal = document.getElementById("fishing-total");
  const panelMining = document.getElementById("panel-mining");
  const panelFishing = document.getElementById("panel-fishing");

  function formatGems(n) {
    const loc = typeof PWI18N !== "undefined" && PWI18N.getLang() === "en" ? "en-US" : "id-ID";
    return new Intl.NumberFormat(loc).format(Math.max(0, Math.floor(n)));
  }

  function tr(key, vars) {
    if (typeof PWI18N === "undefined") return key;
    return PWI18N.t(key, vars);
  }

  function parseItemId(id) {
    const parts = id.split("-");
    const size = parts.pop();
    const groupId = parts.join("-");
    return { groupId, size };
  }

  /** PNG default: `{ukuran}-{jenis}.png` dari id `jenis-ukuran`, mis. tiny-topaz.png */
  function miningItemIconSrc(item) {
    if (item.icon) return item.icon;
    if (typeof MINING_ITEM_ICON_BASE !== "string" || !MINING_ITEM_ICON_BASE.length) return "";
    const { groupId, size } = parseItemId(item.id);
    const base = MINING_ITEM_ICON_BASE.replace(/\/$/, "");
    return `${base}/${size}-${groupId}.png`;
  }

  /** WebP default: `{ukuran}-{jenis}.webp` dari id `jenis-ukuran`, mis. tiny-herring.webp */
  function fishingItemIconSrc(item) {
    if (item.icon) return item.icon;
    if (typeof FISHING_ITEM_ICON_BASE !== "string" || !FISHING_ITEM_ICON_BASE.length) return "";
    const { groupId, size } = parseItemId(item.id);
    const base = FISHING_ITEM_ICON_BASE.replace(/\/$/, "");
    return `${base}/${size}-${groupId}.webp`;
  }

  function groupGemstones() {
    const byGroup = new Map();
    MINING_GEMSTONES.forEach((item) => {
      const { groupId, size } = parseItemId(item.id);
      if (!byGroup.has(groupId)) byGroup.set(groupId, []);
      byGroup.get(groupId).push({ ...item, size });
    });
    MINING_GROUP_ORDER.forEach((gid) => {
      const list = byGroup.get(gid);
      if (!list) return;
      list.sort(
        (a, b) => MINING_SIZE_ORDER.indexOf(a.size) - MINING_SIZE_ORDER.indexOf(b.size)
      );
    });
    return byGroup;
  }

  function captureMiningCounts() {
    const map = Object.create(null);
    if (!miningRows) return map;
    miningRows.querySelectorAll(".mining-cell[data-id]").forEach((cell) => {
      const id = cell.getAttribute("data-id");
      const inp = cell.querySelector(".mining-stepper-input");
      if (!id || !inp) return;
      const raw = parseInt(inp.value, 10);
      map[id] = Number.isFinite(raw) ? Math.max(0, Math.floor(raw)) : 0;
    });
    return map;
  }

  function captureFishingCounts() {
    const map = Object.create(null);
    if (!fishingRows) return map;
    fishingRows.querySelectorAll(".mining-cell[data-id]").forEach((cell) => {
      const id = cell.getAttribute("data-id");
      const inp = cell.querySelector(".mining-stepper-input");
      if (!id || !inp) return;
      const raw = parseInt(inp.value, 10);
      map[id] = Number.isFinite(raw) ? Math.max(0, Math.floor(raw)) : 0;
    });
    return map;
  }

  function groupFishItems() {
    const byGroup = new Map();
    FISHING_ITEMS.forEach((item) => {
      const { groupId, size } = parseItemId(item.id);
      if (!byGroup.has(groupId)) byGroup.set(groupId, []);
      byGroup.get(groupId).push({ ...item, size });
    });
    FISHING_GROUP_ORDER.forEach((gid) => {
      const list = byGroup.get(gid);
      if (!list) return;
      list.sort(
        (a, b) => FISHING_SIZE_ORDER.indexOf(a.size) - FISHING_SIZE_ORDER.indexOf(b.size)
      );
    });
    return byGroup;
  }

  function buildStepper(item, onChange, opts) {
    const initial =
      opts && opts.initial != null ? Math.max(0, Math.floor(Number(opts.initial)) || 0) : 0;

    const wrap = document.createElement("div");
    wrap.className = "mining-stepper";

    const btnMinus = document.createElement("button");
    btnMinus.type = "button";
    btnMinus.className = "mining-stepper-btn";
    btnMinus.textContent = "−";
    btnMinus.setAttribute("aria-label", tr("stepper.decrease", { name: item.name }));

    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.step = "1";
    input.className = "mining-stepper-input";
    input.value = String(initial);
    input.setAttribute("inputmode", "numeric");
    input.setAttribute("aria-label", tr("stepper.count", { name: item.name }));

    const btnPlus = document.createElement("button");
    btnPlus.type = "button";
    btnPlus.className = "mining-stepper-btn";
    btnPlus.textContent = "+";
    btnPlus.setAttribute("aria-label", tr("stepper.increase", { name: item.name }));

    function parseCount() {
      const raw = parseInt(input.value, 10);
      if (!Number.isFinite(raw) || raw < 0) return 0;
      return Math.floor(raw);
    }

    function setCount(n) {
      const v = Math.max(0, Math.floor(Number(n)) || 0);
      input.value = String(v);
      onChange();
    }

    btnMinus.addEventListener("click", () => setCount(parseCount() - 1));
    btnPlus.addEventListener("click", () => setCount(parseCount() + 1));

    input.addEventListener("input", onChange);
    input.addEventListener("change", () => setCount(parseCount()));
    input.addEventListener("blur", () => {
      if (input.value === "" || input.value === "-") {
        input.value = "0";
        onChange();
      } else {
        setCount(parseCount());
      }
    });

    wrap.append(btnMinus, input, btnPlus);
    return wrap;
  }

  function renderMining() {
    if (
      !miningRows ||
      typeof MINING_GEMSTONES === "undefined" ||
      typeof MINING_GROUP_ORDER === "undefined" ||
      typeof MINING_GROUP_META === "undefined" ||
      typeof MINING_SIZE_ORDER === "undefined"
    ) {
      return;
    }

    const byGroup = groupGemstones();

    function recalcAll() {
      let grand = 0;
      miningRows.querySelectorAll(".mining-group").forEach((groupEl) => {
        const gid = groupEl.dataset.groupId;
        const items = byGroup.get(gid);
        const subOut = groupEl.querySelector(".mining-banner-value");
        if (!items || !subOut) return;

        let sub = 0;
        items.forEach((item) => {
          const cell = groupEl.querySelector(`[data-id="${item.id}"]`);
          if (!cell) return;
          const valEl = cell.querySelector(".mining-stepper-input");
          const raw = valEl ? parseInt(valEl.value, 10) : 0;
          const n = Number.isFinite(raw) ? Math.max(0, Math.floor(raw)) : 0;
          sub += n * item.gemsPerUnit;
        });
        subOut.textContent = formatGems(sub);
        grand += sub;
      });
      if (miningTotal) miningTotal.textContent = formatGems(grand);
    }

    const savedCounts = captureMiningCounts();

    miningRows.innerHTML = "";

    MINING_GROUP_ORDER.forEach((groupId) => {
      const items = byGroup.get(groupId);
      const meta = MINING_GROUP_META[groupId];
      if (!items || !meta) return;

      const groupEl = document.createElement("section");
      groupEl.className = "mining-group";
      groupEl.dataset.groupId = groupId;
      groupEl.style.setProperty("--group-accent", meta.accent);

      const banner = document.createElement("div");
      banner.className = "mining-banner";

      const bannerInner = document.createElement("div");
      bannerInner.className = "mining-banner-inner";

      const labelEl = document.createElement("span");
      labelEl.className = "mining-banner-label";
      const bannerKey = `banner.${groupId}`;
      const bannerText =
        typeof PWI18N !== "undefined" ? PWI18N.t(bannerKey) : meta.label;
      labelEl.textContent = `${bannerText}:`;

      const subOut = document.createElement("output");
      subOut.className = "mining-banner-value";
      subOut.textContent = "0";

      bannerInner.append(labelEl, subOut);
      banner.appendChild(bannerInner);

      const colsWrap = document.createElement("div");
      colsWrap.className = "mining-cols-wrap";

      const cols = document.createElement("div");
      cols.className = "mining-cols";

      items.forEach((item) => {
        const cell = document.createElement("div");
        cell.className = "mining-cell";
        cell.dataset.id = item.id;

        const lbl = document.createElement("div");
        lbl.className = "mining-cell-label";
        lbl.textContent = item.name;

        const rate = document.createElement("div");
        rate.className = "mining-cell-rate";
        const per = item.gemsPerUnit;
        rate.textContent =
          per === 0 ? tr("rate.zero") : tr("rate.each", { n: formatGems(per) });

        const iconSlot = document.createElement("div");
        iconSlot.className = "mining-icon-slot";

        const iconUrl = miningItemIconSrc(item);
        if (iconUrl) {
          const img = document.createElement("img");
          img.src = iconUrl;
          img.alt = "";
          img.loading = "lazy";
          img.decoding = "async";
          img.addEventListener("error", () => {
            img.remove();
            iconSlot.classList.add("mining-icon-slot--empty");
            iconSlot.setAttribute("aria-hidden", "true");
          });
          iconSlot.appendChild(img);
        } else {
          iconSlot.classList.add("mining-icon-slot--empty");
          iconSlot.setAttribute("aria-hidden", "true");
        }

        const stepper = buildStepper(item, recalcAll, {
          initial: savedCounts[item.id] ?? 0,
        });
        cell.append(lbl, rate, iconSlot, stepper);
        cols.appendChild(cell);
      });

      colsWrap.appendChild(cols);
      groupEl.append(banner, colsWrap);
      miningRows.appendChild(groupEl);
    });

    recalcAll();
  }

  function renderFishing() {
    if (
      !fishingRows ||
      typeof FISHING_ITEMS === "undefined" ||
      typeof FISHING_GROUP_ORDER === "undefined" ||
      typeof FISHING_GROUP_META === "undefined" ||
      typeof FISHING_SIZE_ORDER === "undefined"
    ) {
      return;
    }

    const byGroup = groupFishItems();

    function recalcAll() {
      let grand = 0;
      fishingRows.querySelectorAll(".mining-group").forEach((groupEl) => {
        const gid = groupEl.dataset.groupId;
        const items = byGroup.get(gid);
        const subOut = groupEl.querySelector(".mining-banner-value");
        if (!items || !subOut) return;

        let sub = 0;
        items.forEach((item) => {
          const cell = groupEl.querySelector(`[data-id="${item.id}"]`);
          if (!cell) return;
          const valEl = cell.querySelector(".mining-stepper-input");
          const raw = valEl ? parseInt(valEl.value, 10) : 0;
          const n = Number.isFinite(raw) ? Math.max(0, Math.floor(raw)) : 0;
          sub += n * item.gemsPerUnit;
        });
        subOut.textContent = formatGems(sub);
        grand += sub;
      });
      if (fishingTotal) fishingTotal.textContent = formatGems(grand);
    }

    const savedCounts = captureFishingCounts();

    fishingRows.innerHTML = "";

    FISHING_GROUP_ORDER.forEach((groupId) => {
      const items = byGroup.get(groupId);
      const meta = FISHING_GROUP_META[groupId];
      if (!items || !meta) return;

      const groupEl = document.createElement("section");
      groupEl.className = "mining-group";
      groupEl.dataset.groupId = groupId;
      groupEl.style.setProperty("--group-accent", meta.accent);

      const banner = document.createElement("div");
      banner.className = "mining-banner";

      const bannerInner = document.createElement("div");
      bannerInner.className = "mining-banner-inner";

      const labelEl = document.createElement("span");
      labelEl.className = "mining-banner-label";
      const bannerKey = `banner.${groupId}`;
      const bannerText =
        typeof PWI18N !== "undefined" ? PWI18N.t(bannerKey) : meta.label;
      labelEl.textContent = `${bannerText}:`;

      const subOut = document.createElement("output");
      subOut.className = "mining-banner-value";
      subOut.textContent = "0";

      bannerInner.append(labelEl, subOut);
      banner.appendChild(bannerInner);

      const colsWrap = document.createElement("div");
      colsWrap.className = "mining-cols-wrap";

      const cols = document.createElement("div");
      cols.className = "mining-cols";

      items.forEach((item) => {
        const cell = document.createElement("div");
        cell.className = "mining-cell";
        cell.dataset.id = item.id;

        const lbl = document.createElement("div");
        lbl.className = "mining-cell-label";
        lbl.textContent = item.name;

        const rate = document.createElement("div");
        rate.className = "mining-cell-rate";
        const per = item.gemsPerUnit;
        rate.textContent =
          per === 0 ? tr("rate.zero") : tr("rate.each", { n: formatGems(per) });

        const iconSlot = document.createElement("div");
        iconSlot.className = "mining-icon-slot";

        const iconUrl = fishingItemIconSrc(item);
        if (iconUrl) {
          const img = document.createElement("img");
          img.src = iconUrl;
          img.alt = "";
          img.loading = "lazy";
          img.decoding = "async";
          img.addEventListener("error", () => {
            img.remove();
            iconSlot.classList.add("mining-icon-slot--empty");
            iconSlot.setAttribute("aria-hidden", "true");
          });
          iconSlot.appendChild(img);
        } else {
          iconSlot.classList.add("mining-icon-slot--empty");
          iconSlot.setAttribute("aria-hidden", "true");
        }

        const stepper = buildStepper(item, recalcAll, {
          initial: savedCounts[item.id] ?? 0,
        });
        cell.append(lbl, rate, iconSlot, stepper);
        cols.appendChild(cell);
      });

      colsWrap.appendChild(cols);
      groupEl.append(banner, colsWrap);
      fishingRows.appendChild(groupEl);
    });

    recalcAll();
  }

  document.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.dataset.panel;
      document.querySelectorAll(".tab").forEach((t) => {
        const active = t === btn;
        t.classList.toggle("tab--active", active);
        t.setAttribute("aria-selected", active ? "true" : "false");
      });
      if (panelMining) {
        const show = panel === "mining";
        panelMining.classList.toggle("panel--active", show);
        panelMining.hidden = !show;
      }
      if (panelFishing) {
        const show = panel === "fishing";
        panelFishing.classList.toggle("panel--active", show);
        panelFishing.hidden = !show;
      }
    });
  });

  window.addEventListener("pw-lang-change", () => {
    renderMining();
    renderFishing();
  });

  renderMining();
  renderFishing();
})();
