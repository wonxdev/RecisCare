/**
 * app.js
 * Small shared helpers used on every page.
 */

// Injects the "Portfolio Demo" badge into the top of the page.
function renderDemoBadge() {
  const badge = document.createElement("div");
  badge.className = "demo-badge";
  badge.innerHTML = "Portfolio Demo - data contoh, tidak tersimpan ke server";
  document.body.prepend(badge);
}

document.addEventListener("DOMContentLoaded", () => {
  renderDemoBadge();
});
