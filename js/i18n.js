(function (global) {
  const STORAGE_KEY = "pw-calc-lang";

  const STRINGS = {
    en: {
      "page.title": "Pixel Worlds Tools",
      "nav.aria": "Calculator mode",
      "nav.langAria": "Language",
      "tab.mining": "Mining",
      "tab.fishing": "Fishing",
      "mining.title": "Mining Gems",
      "mining.totalLabel": "Total gems",
      "mining.totalAria": "Mining total gems",
      "mining.desc":
        "Enter the amount of each type; the total is calculated automatically.",
      "fishing.title": "Fishing",
      "fishing.placeholder": "This section will be added later.",
      "footer.disclaimer":
        "This site is not affiliated with, endorsed by, or operated by Pixel Worlds, Kukouri Mobile Entertainment, or any other official party. It is an independent fan-made project by a player to help with in-game calculations.",
      "footer.creditHtml": "Credit: <span class=\"footer-author\">PIBI</span>",
      "banner.topaz": "TOPAZ GEMS",
      "banner.emerald": "EMERALD GEMS",
      "banner.sapphire": "SAPPHIRE GEMS",
      "banner.ruby": "RUBY GEMS",
      "banner.diamond": "DIAMOND GEMS",
      "rate.zero": "0 gems / unit",
      "rate.each": "{n} gems / unit",
      "stepper.decrease": "Decrease quantity: {name}",
      "stepper.increase": "Increase quantity: {name}",
      "stepper.count": "Unit count for {name}",
    },
    id: {
      "page.title": "Pixel Worlds Tools",
      "nav.aria": "Mode kalkulator",
      "nav.langAria": "Bahasa",
      "tab.mining": "Mining",
      "tab.fishing": "Fishing",
      "mining.title": "Mining Gems",
      "mining.totalLabel": "Total gems",
      "mining.totalAria": "Total gems mining",
      "mining.desc":
        "Masukkan jumlah tiap jenis; total dihitung otomatis.",
      "fishing.title": "Fishing",
      "fishing.placeholder": "Bagian ini akan ditambahkan nanti.",
      "footer.disclaimer":
        "Situs ini tidak berafiliasi, didukung, atau dikelola oleh Pixel Worlds, Kukouri Mobile Entertainment, maupun pihak resmi terkait lainnya. Ini adalah proyek mandiri yang dibuat oleh pemain untuk membantu perhitungan di dalam game.",
      "footer.creditHtml": "Kredit pembuat: <span class=\"footer-author\">PIBI</span>",
      "banner.topaz": "TOPAZ GEMS",
      "banner.emerald": "EMERALD GEMS",
      "banner.sapphire": "SAPPHIRE GEMS",
      "banner.ruby": "RUBY GEMS",
      "banner.diamond": "DIAMOND GEMS",
      "rate.zero": "0 gems / unit",
      "rate.each": "{n} gems / unit",
      "stepper.decrease": "Kurangi jumlah: {name}",
      "stepper.increase": "Tambah jumlah: {name}",
      "stepper.count": "Jumlah unit untuk {name}",
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
