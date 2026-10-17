// Site-wide behaviour, loaded on every page (external file — strict CSP).
// 1) Scroll-reveal: elements with .reveal spawn in the first time they scroll into view.
// 2) Mascot: a little shield by the footer whose eyes follow your cursor.
(() => {
  const root = document.documentElement;
  root.classList.add("js"); // CSS only hides .reveal when JS is present

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  // --- Scroll reveal ---
  const revealables = [...document.querySelectorAll(".reveal")];
  if (revealables.length) {
    if (reduce.matches || !("IntersectionObserver" in window)) {
      revealables.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              obs.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
      revealables.forEach((el) => io.observe(el));
    }
  }

  // --- "X days since last update" (computed in the browser so it never goes stale) ---
  for (const el of document.querySelectorAll(".updated[data-updated]")) {
    const then = new Date(el.dataset.updated);
    if (isNaN(then)) continue;
    const days = Math.max(0, Math.floor((Date.now() - then.getTime()) / 864e5));
    el.textContent = days === 0 ? "Updated today" : days === 1 ? "1 day since last update" : `${days} days since last update`;
    el.title = `Last update: ${then.toLocaleString()}`;
  }

  // --- Mascot eyes follow the cursor ---
  const mascot = document.getElementById("mascot");
  if (mascot) {
    const VIEWBOX_W = 48; // keep in sync with the SVG viewBox width
    const pupils = [...mascot.querySelectorAll(".mascot-pupil")];
    const MAX = 2.2; // max travel in SVG units
    let tx = 0;
    let ty = 0;
    let raf = 0;

    function render() {
      raf = 0;
      const box = mascot.getBoundingClientRect();
      if (!box.width) return;
      const scale = box.width / VIEWBOX_W;
      for (const p of pupils) {
        const ex = +p.dataset.cx;
        const ey = +p.dataset.cy;
        const sx = box.left + ex * scale;
        const sy = box.top + ey * scale;
        const dx = tx - sx;
        const dy = ty - sy;
        const d = Math.hypot(dx, dy) || 1;
        const off = Math.min(MAX, d / 45);
        p.setAttribute("cx", (ex + (dx / d) * off).toFixed(2));
        p.setAttribute("cy", (ey + (dy / d) * off).toFixed(2));
      }
    }

    window.addEventListener(
      "mousemove",
      (e) => {
        tx = e.clientX;
        ty = e.clientY;
        if (!raf) raf = requestAnimationFrame(render);
      },
      { passive: true },
    );

    // Occasional blink for a little life.
    if (!reduce.matches) {
      setInterval(() => {
        mascot.classList.add("blink");
        setTimeout(() => mascot.classList.remove("blink"), 160);
      }, 5200);
    }
  }
})();
