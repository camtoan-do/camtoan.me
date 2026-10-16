// Glossary landing: combobox typeahead search, category filter, deep links.
// Loaded as an external file (strict CSP — no inline scripts). Concepts link to
// their own pages (/glossary/<path>/); the combobox just helps you find them fast.
(() => {
  const input = document.getElementById("feature-search");
  const listbox = document.getElementById("search-listbox");
  const chips = [...document.querySelectorAll(".chip")];
  const cards = [...document.querySelectorAll(".concept")];
  const fields = [...document.querySelectorAll(".cat-field")];
  const meta = document.getElementById("search-meta");
  const empty = document.getElementById("no-results");
  if (!input || !listbox) return;

  const defaultMeta = meta ? meta.innerHTML : "";
  let active = "all";
  let options = []; // current suggestion <li> elements
  let activeIndex = -1; // highlighted suggestion

  const norm = (s) => (s || "").toLowerCase().normalize("NFKD");
  const areaName = (id) => {
    const chip = chips.find((c) => c.dataset.filter === id);
    return chip ? chip.textContent.trim() : id;
  };

  // --- Grid filter (concept cards + the active category field) ---
  function applyGrid() {
    const terms = norm(input.value.trim()).split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const card of cards) {
      const inCat = active === "all" || card.dataset.category === active;
      const matches = terms.length === 0 || terms.every((t) => card.dataset.text.includes(t));
      const visible = inCat && matches;
      card.hidden = !visible;
      if (visible) shown++;
    }
    for (const field of fields) field.hidden = active === "all" || field.dataset.category !== active;
    if (empty) empty.hidden = shown > 0;
    if (meta) {
      if (input.value.trim() === "" && active === "all") meta.innerHTML = defaultMeta;
      else if (shown === 0) meta.textContent = "No matches";
      else meta.textContent = active === "all" ? "Showing matches" : `Area: ${areaName(active)}`;
    }
  }

  // --- Combobox typeahead ---
  function closeList() {
    listbox.hidden = true;
    listbox.replaceChildren();
    options = [];
    activeIndex = -1;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
  }

  function openList(matches) {
    listbox.replaceChildren();
    options = matches.map((card, i) => {
      const li = document.createElement("li");
      li.className = "combo-opt";
      li.id = "opt-" + i;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", "false");
      li.dataset.href = card.getAttribute("href");
      const name = document.createElement("span");
      name.className = "combo-name";
      name.textContent = card.querySelector(".concept-name")?.textContent || "";
      const cat = document.createElement("span");
      cat.className = "combo-cat";
      cat.textContent = card.querySelector(".concept-cat")?.textContent || "";
      li.append(name, cat);
      // mousedown (not click) so it fires before the input's blur closes the list.
      li.addEventListener("mousedown", (e) => {
        e.preventDefault();
        location.href = li.dataset.href;
      });
      listbox.appendChild(li);
      return li;
    });
    listbox.hidden = options.length === 0;
    input.setAttribute("aria-expanded", String(options.length > 0));
    activeIndex = -1;
  }

  function suggest() {
    const q = norm(input.value.trim());
    if (!q) return closeList();
    const starts = [];
    const contains = [];
    for (const card of cards) {
      if (card.dataset.name.startsWith(q)) starts.push(card);
      else if (card.dataset.text.includes(q)) contains.push(card);
    }
    openList([...starts, ...contains].slice(0, 8));
  }

  function highlight(i) {
    if (!options.length) return;
    if (activeIndex >= 0) options[activeIndex].setAttribute("aria-selected", "false");
    activeIndex = (i + options.length) % options.length;
    const opt = options[activeIndex];
    opt.setAttribute("aria-selected", "true");
    input.setAttribute("aria-activedescendant", opt.id);
    opt.scrollIntoView({ block: "nearest" });
  }

  input.addEventListener("input", () => {
    suggest();
    applyGrid();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (listbox.hidden) suggest();
      highlight(activeIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      highlight(activeIndex - 1);
    } else if (e.key === "Enter") {
      const target = activeIndex >= 0 ? options[activeIndex] : options[0];
      if (target) {
        e.preventDefault();
        location.href = target.dataset.href;
      }
    } else if (e.key === "Escape") {
      if (!listbox.hidden) closeList();
      else {
        input.value = "";
        applyGrid();
      }
    }
  });

  input.addEventListener("blur", () => setTimeout(closeList, 120));

  for (const chip of chips) {
    chip.addEventListener("click", () => {
      active = chip.dataset.filter;
      for (const c of chips) c.setAttribute("aria-pressed", String(c === chip));
      applyGrid();
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Press "/" anywhere to jump to the search box.
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
    }
  });

  // Deep links: /?area=endpoint pre-selects an area; /?q=mfa pre-fills the search.
  const params = new URLSearchParams(location.search);
  const area = params.get("area");
  if (area && chips.some((c) => c.dataset.filter === area)) {
    active = area;
    for (const c of chips) c.setAttribute("aria-pressed", String(c.dataset.filter === area));
  }
  const q = params.get("q");
  if (q) input.value = q;
  applyGrid();
})();
