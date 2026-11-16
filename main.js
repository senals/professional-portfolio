(function () {
  var root = document.documentElement;
  var site = window.SITE || {};

  /* ---- Fill contact details from config.js ---- */
  var hrefs = {
    email: site.email ? "mailto:" + site.email : null,
    linkedin: site.linkedin,
    github: site.github
  };
  var texts = {
    name: site.name,
    email: site.email,
    linkedin: site.linkedin ? site.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : null,
    github: site.github ? site.github.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : null
  };
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var key = el.getAttribute("data-site");
    if (el.tagName === "A" && hrefs[key]) el.setAttribute("href", hrefs[key]);
    if (el.hasAttribute("data-site-text") && texts[key]) el.textContent = texts[key];
  });

  /* ---- Theme toggle ---- */
  var toggle = document.querySelector("[data-theme-toggle]");
  function render() {
    if (!toggle) return;
    var dark = root.getAttribute("data-theme") === "dark";
    toggle.textContent = dark ? "Light mode" : "Dark mode";
    toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
  function stored() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      render();
    });
  }
  /* Follow system changes until the visitor makes a choice */
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  if (mq.addEventListener) {
    mq.addEventListener("change", function (e) {
      if (stored()) return;
      root.setAttribute("data-theme", e.matches ? "dark" : "light");
      render();
    });
  }
  render();

  /* ---- Footer year ---- */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
