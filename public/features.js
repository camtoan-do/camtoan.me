// Live search + category filter for /features. Loaded as an external file (strict CSP).
(() => {
  const input = document.getElementById("feature-search");
  const chips = [...document.querySelectorAll(".chip")];
  const cards = [...document.querySelectorAll(".feature-card")];
  const meta = document.getElementById("search-meta");
  const empty = document.getElementById("no-results");
  if (!input) return;
  let active = "all";

  const norm = (s) => s.toLowerCase().normalize("NFKD");

  function apply() {
    const terms = norm(input.value.trim()).split(/\s+/).filter(Boolean);
    let shownCards = 0, shownItems = 0;
    for (const card of cards) {
      const inCategory = active === "all" || card.dataset.id === active;
      const cardText = norm(card.dataset.text);
      const items = [...card.querySelectorAll(".fc-list li")];
      let cardMatches = 0;
      for (const li of items) {
        const hit = terms.length > 0 && terms.every((t) => norm(li.textContent).includes(t));
        li.classList.toggle("match", hit);
        if (hit) cardMatches++;
      }
      const headerHit = terms.every((t) => cardText.includes(t));
      const visible = inCategory && (terms.length === 0 || headerHit || cardMatches > 0);
      card.hidden = !visible;
      // When searching, show only matching items unless the category itself matched.
      const onlyHits = terms.length > 0 && cardMatches > 0 && !norm(card.dataset.head).includes(terms.join(" "));
      for (const li of items) li.hidden = visible && onlyHits && !li.classList.contains("match");
      if (visible) { shownCards++; shownItems += onlyHits ? cardMatches : items.length; }
    }
    empty.hidden = shownCards > 0;
    meta.textContent = `${shownCards} ${shownCards === 1 ? "area" : "areas"} · ${shownItems} ${shownItems === 1 ? "feature" : "features"}`;
  }

  input.addEventListener("input", apply);
  for (const chip of chips) {
    chip.addEventListener("click", () => {
      active = chip.dataset.filter;
      for (const c of chips) c.setAttribute("aria-pressed", String(c === chip));
      apply();
    });
  }
  // Press "/" to jump to search, Escape to clear.
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== input) { e.preventDefault(); input.focus(); }
    if (e.key === "Escape" && document.activeElement === input) { input.value = ""; apply(); }
  });
  // Support links like /features/?q=mfa
  const q = new URLSearchParams(location.search).get("q");
  if (q) input.value = q;
  apply();
})();
