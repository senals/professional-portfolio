/* Sets the theme before the page paints, so there is no flash.
   Order: saved choice, then the visitor's system setting. */
(function () {
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  var theme = (saved === "light" || saved === "dark")
    ? saved
    : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();
