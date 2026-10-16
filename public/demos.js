// Interactive service demos for /services. External file (strict CSP — no inline JS).
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Infrastructure & Ops: "Fleet Health" ----------
  function initOps() {
    const root = document.getElementById("demo-ops");
    if (!root) return;
    const serversEl = root.querySelector("#ops-servers");
    const meter = root.querySelector("#ops-meter");
    const num = root.querySelector("#ops-uptime");
    const scaleBtn = root.querySelector("#ops-scale");
    const healBtn = root.querySelector("#ops-heal");
    const resetBtn = root.querySelector("#ops-reset");
    let servers, healthyTicks, totalTicks, autoHeal;

    function render() {
      serversEl.textContent = "";
      servers.forEach((s, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "server " + (s.up ? "up" : "down");
        b.innerHTML =
          '<span class="server-ico" aria-hidden="true">' + (s.up ? "🟢" : "🔴") +
          '</span><span class="server-label">' + (s.up ? "UP" : "DOWN") + "</span>";
        b.setAttribute("aria-label", "Server " + (i + 1) + ": " + (s.up ? "up" : "down — click to heal"));
        b.addEventListener("click", () => {
          if (!s.up) { s.up = true; s.downFor = 0; render(); }
          else { b.classList.add("wobble"); setTimeout(() => b.classList.remove("wobble"), 320); }
        });
        serversEl.appendChild(b);
      });
    }

    function drawMeter() {
      const pct = totalTicks ? Math.round((healthyTicks / totalTicks) * 100) : 100;
      meter.style.width = pct + "%";
      meter.className = "meter-fill " + (pct >= 99 ? "ok" : pct >= 95 ? "warn" : "bad");
      num.textContent = pct + "%";
    }

    function tick() {
      totalTicks++;
      if (servers.every((s) => s.up)) healthyTicks++;
      const failChance = 0.14 / servers.length;
      servers.forEach((s) => {
        if (s.up) { if (Math.random() < failChance) { s.up = false; s.downFor = 0; } }
        else { s.downFor++; if (autoHeal && s.downFor >= 2) { s.up = true; s.downFor = 0; } }
      });
      render();
      drawMeter();
    }

    function reset() {
      servers = [0, 0, 0, 0].map(() => ({ up: true, downFor: 0 }));
      healthyTicks = 0; totalTicks = 0; autoHeal = false;
      healBtn.setAttribute("aria-pressed", "false");
      healBtn.textContent = "Auto-heal: Off";
      render(); drawMeter();
    }

    scaleBtn.addEventListener("click", () => {
      if (servers.length < 6) { servers.push({ up: true, downFor: 0 }); render(); }
    });
    healBtn.addEventListener("click", () => {
      autoHeal = !autoHeal;
      healBtn.setAttribute("aria-pressed", String(autoHeal));
      healBtn.textContent = "Auto-heal: " + (autoHeal ? "On" : "Off");
    });
    resetBtn.addEventListener("click", reset);

    reset();
    setInterval(tick, reduce ? 1900 : 1100);
  }

  // ---------- InfoSec: "Harden This Business" ----------
  function initInfosec() {
    const root = document.getElementById("demo-infosec");
    if (!root) return;
    const toggles = [...root.querySelectorAll(".harden")];
    const meter = root.querySelector("#infosec-meter");
    const num = root.querySelector("#infosec-num");
    const resetBtn = root.querySelector("#infosec-reset");

    function update() {
      let cut = 0, on = 0;
      toggles.forEach((t) => {
        if (t.getAttribute("aria-pressed") === "true") { cut += Number(t.dataset.cut); on++; }
      });
      const risk = Math.max(5, 100 - cut);
      meter.style.width = risk + "%";
      const cls = risk > 66 ? "bad" : risk > 40 ? "warn" : risk > 15 ? "mid" : "ok";
      meter.className = "meter-fill risk " + cls;
      if (on === 0) num.textContent = "WIDE OPEN · 100%";
      else if (on === toggles.length) num.textContent = "HARDENED. Nice. · " + risk + "%";
      else num.textContent = "Risk: " + risk + "%";
    }

    toggles.forEach((t) => {
      t.addEventListener("click", () => {
        t.setAttribute("aria-pressed", String(t.getAttribute("aria-pressed") !== "true"));
        update();
      });
    });
    resetBtn.addEventListener("click", () => {
      toggles.forEach((t) => t.setAttribute("aria-pressed", "false"));
      update();
    });
    update();
  }

  // ---------- DevOps: "Ship It! Pipeline" ----------
  function initDevops() {
    const root = document.getElementById("demo-devops");
    if (!root) return;
    const stages = [...root.querySelectorAll(".stage")];
    const runBtn = root.querySelector("#devops-run");
    const bugBtn = root.querySelector("#devops-bug");
    const strip = root.querySelector("#devops-strip");
    let running = false, bug = true;

    const notes = {
      commit: "Change saved.",
      build: "App compiled. No errors.",
      test: "42 checks passed.",
      scanPass: "No issues found.",
      scanFail: "Caught it! Leaked password in the code. Blocked before going live.",
      deployPass: "Live! 🎉 Shipped in seconds.",
      deployBlocked: "Not shipped — and that's the point.",
    };

    function setStage(el, state, note) {
      el.className = "stage " + state;
      const n = el.querySelector(".stage-note");
      if (n) n.textContent = note || "";
    }
    function resetStages() { stages.forEach((s) => setStage(s, "idle", "")); }

    function finish(shipped) {
      running = false;
      runBtn.disabled = false;
      runBtn.textContent = shipped ? "▶ Run pipeline" : "↻ Fix & run again";
      strip.textContent = shipped
        ? "Clean run — shipped safely, hands-off."
        : "Automation caught a problem a human might've missed. Nothing broke for your customers.";
    }

    function run() {
      if (running) return;
      running = true;
      runBtn.disabled = true;
      resetStages();
      strip.textContent = "Running…";
      const step = reduce ? 350 : 750;
      let i = 0;
      (function next() {
        if (i >= stages.length) { finish(true); return; }
        const el = stages[i];
        const key = el.dataset.stage;
        setStage(el, "running", "Running…");
        setTimeout(() => {
          if (key === "scan" && bug) {
            setStage(el, "fail", notes.scanFail);
            const dep = stages.find((s) => s.dataset.stage === "deploy");
            if (dep) setStage(dep, "blocked", notes.deployBlocked);
            finish(false);
            return;
          }
          const note =
            key === "commit" ? notes.commit :
            key === "build" ? notes.build :
            key === "test" ? notes.test :
            key === "scan" ? notes.scanPass :
            notes.deployPass;
          setStage(el, "pass", note);
          i++;
          setTimeout(next, step);
        }, step);
      })();
    }

    bugBtn.addEventListener("click", () => {
      if (running) return;
      bug = !bug;
      bugBtn.setAttribute("aria-pressed", String(bug));
      bugBtn.textContent = "🐞 Sneak in a bug: " + (bug ? "On" : "Off");
      runBtn.textContent = "▶ Run pipeline";
      resetStages();
      strip.textContent = "Your change is ready. Hit Run to ship it.";
    });
    runBtn.addEventListener("click", run);
    resetStages();
  }

  initOps();
  initInfosec();
  initDevops();
})();
