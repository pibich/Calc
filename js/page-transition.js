(function () {
  var KEY = "pwInternalNav";
  var MS = 230;

  try {
    if (sessionStorage.getItem(KEY) === "1") {
      sessionStorage.removeItem(KEY);
    }
  } catch (e) {}

  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href]");
    if (!a) return;
    if (a.target === "_blank" || a.download) return;
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var raw = a.getAttribute("href");
    if (!raw || raw.charAt(0) === "#") return;
    if (/^javascript:/i.test(raw)) return;
    var url;
    try {
      url = new URL(a.href, location.href);
    } catch (err) {
      return;
    }
    if (url.origin !== location.origin) return;

    e.preventDefault();
    try {
      sessionStorage.setItem(KEY, "1");
    } catch (err2) {}
    document.documentElement.classList.add("page-tx--out");
    window.setTimeout(function () {
      location.href = url.href;
    }, MS);
  });

  window.addEventListener("pageshow", function (ev) {
    if (ev.persisted) document.documentElement.classList.remove("page-tx--out");
  });

  function endEntryCover() {
    document.documentElement.classList.remove("page-tx--in");
  }

  if (document.documentElement.classList.contains("page-tx--in")) {
    requestAnimationFrame(function () {
      requestAnimationFrame(endEntryCover);
    });
  }
})();
