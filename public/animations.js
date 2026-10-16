// 8-bit / pixel-art feature animations for glossary concept pages.
// External file (strict CSP — no inline scripts). Each builder is small and
// guarded; an unknown kind is a no-op. Motion respects prefers-reduced-motion.
(() => {
  const nodes = document.querySelectorAll(".feat-anim");
  if (!nodes.length) return;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const css = getComputedStyle(document.documentElement);
  const C = (n, f) => css.getPropertyValue(n).trim() || f;
  const palette = {
    ink: C("--ink", "#000"), paper: C("--paper", "#fff"), surface: C("--surface", "#fff"),
    green: C("--green", "#a3e636"), coral: C("--coral", "#ff6b6b"), blue: C("--blue", "#88aaee"),
    yellow: C("--yellow", "#ffdc58"), purple: C("--purple", "#a388ee"), pink: C("--pink", "#ffb2ef"),
    muted: C("--muted", "#555"),
  };

  const el = (tag, cls, txt) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  };

  const builders = { mfa, phishing, firewall, backup321, antivirus, encrypt, ddos, vpn };

  for (const node of nodes) {
    const b = builders[node.dataset.anim];
    if (b) {
      try {
        b(node);
      } catch (_) {
        /* never let one animation break the page */
      }
    }
  }

  // --- Multi-Factor Authentication ---
  function mfa(root) {
    const phone = el("div", "fa-phone");
    phone.append(el("div", "fa-phone-label", "Authenticator"));
    const code = el("div", "fa-code", "000000");
    const bar = el("div", "fa-timer");
    const fill = el("div", "fa-timer-fill");
    bar.appendChild(fill);
    phone.append(code, bar);
    const lock = el("div", "fa-lock", "🔒");
    const btn = el("button", "fa-btn", "Enter the code");
    const status = el("div", "fa-status", "A fresh code every few seconds.");
    root.append(phone, lock, btn, status);

    const gen = () => String(Math.floor(Math.random() * 1e6)).padStart(6, "0");
    code.textContent = gen();

    btn.addEventListener("click", () => {
      code.classList.add("ok");
      lock.textContent = "🔓";
      lock.classList.add("open");
      status.textContent = "Code matched — access granted. ✅";
      setTimeout(() => code.classList.remove("ok"), 600);
    });

    if (!reduce) {
      let t = 0;
      fill.style.transform = "scaleX(1)";
      setInterval(() => {
        t = (t + 1) % 5;
        fill.style.transform = "scaleX(" + (1 - t / 5) + ")";
        if (t === 0) {
          code.textContent = gen();
          lock.textContent = "🔒";
          lock.classList.remove("open");
          status.textContent = "Code refreshed — the old one is now useless.";
        }
      }, 1000);
    }
  }

  // --- Anti-phishing: click the red flags ---
  function phishing(root) {
    let caught = 0;
    const total = 3;
    const status = el("div", "fa-status", "Caught 0 of 3 red flags");

    function flag(text, tip) {
      const b = el("button", "fa-flag", text);
      b.title = tip;
      b.addEventListener("click", () => {
        if (b.classList.contains("got")) return;
        b.classList.add("got");
        caught++;
        status.textContent =
          caught < total ? `Caught ${caught} of ${total} red flags` : "All three spotted — that's a phish. 🎣";
      });
      return b;
    }

    const mail = el("div", "fa-mail");
    const r1 = el("div", "fa-mail-row");
    r1.append(el("span", "fa-mail-k", "From:"), flag("security@paypa1-support.com", "'paypa1' with a 1 — not the real domain."));
    const r2 = el("div", "fa-mail-row");
    r2.append(el("span", "fa-mail-k", "Subject:"), flag("URGENT: account closes in 24h!", "Panic and deadlines are classic bait."));
    const body = el("div", "fa-mail-body");
    body.append(document.createTextNode("Verify now at "), flag("http://secure-login.verify-paypal.ru", "A mismatched, odd link — check before clicking."));
    mail.append(r1, r2, body);
    root.append(mail, status);
  }

  // --- Firewall: good packets pass the gap, bad ones hit the wall ---
  function firewall(root) {
    const cv = el("canvas", "fa-canvas");
    cv.width = 160;
    cv.height = 80;
    root.append(cv, el("div", "fa-status", "Green follows the rules and passes. Red gets blocked."));
    const ctx = cv.getContext("2d");
    const W = 160, H = 80, wallX = 84, gapY = 30, gapH = 18;
    let packets = [];

    const wall = () => {
      ctx.fillStyle = palette.ink;
      ctx.fillRect(wallX, 0, 8, H);
      ctx.fillStyle = palette.paper;
      ctx.fillRect(wallX, gapY, 8, gapH);
    };

    if (reduce) {
      ctx.fillStyle = palette.paper;
      ctx.fillRect(0, 0, W, H);
      wall();
      ctx.fillStyle = palette.green;
      ctx.fillRect(120, gapY + 6, 6, 6);
      ctx.fillStyle = palette.coral;
      ctx.fillRect(wallX - 16, 18, 6, 6);
      return;
    }

    function frame() {
      ctx.fillStyle = palette.paper;
      ctx.fillRect(0, 0, W, H);
      wall();
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.x += 2.2;
        if (p.bad && p.x >= wallX - 4 && p.x < wallX + 4) {
          ctx.fillStyle = palette.yellow;
          ctx.fillRect(p.x - 3, p.y - 3, 12, 12);
          packets.splice(i, 1);
          continue;
        }
        if (p.x > W) {
          packets.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.bad ? palette.coral : palette.green;
        ctx.fillRect(p.x, p.y, 6, 6);
      }
      requestAnimationFrame(frame);
    }
    setInterval(() => {
      const bad = Math.random() < 0.5;
      const y = bad ? 8 + Math.random() * 64 : gapY + 2 + Math.random() * (gapH - 6);
      packets.push({ x: 0, y, bad });
    }, 420);
    requestAnimationFrame(frame);
  }

  // --- Backup 3-2-1 ---
  function backup321(root) {
    const stage = el("div", "fa-backup");
    const orig = el("div", "fa-file orig", "📄");
    const vault = el("div", "fa-copies");
    stage.append(orig, vault);
    const status = el("div", "fa-status", "One file. Click “Back up”.");
    const row = el("div", "fa-btnrow");
    const bBackup = el("button", "fa-btn", "Back up");
    const bCrash = el("button", "fa-btn alt", "Simulate crash");
    const bRestore = el("button", "fa-btn", "Restore");
    bCrash.disabled = true;
    bRestore.disabled = true;
    row.append(bBackup, bCrash, bRestore);
    root.append(stage, status, row);

    bBackup.addEventListener("click", () => {
      vault.replaceChildren();
      [["💾", "Local disk"], ["🧷", "NAS"], ["☁️", "Off-site"]].forEach(([ic, nm], i) => {
        const c = el("div", "fa-copy");
        c.append(el("div", "fa-file", ic), el("small", null, nm));
        vault.appendChild(c);
        if (reduce) c.classList.add("in");
        else setTimeout(() => c.classList.add("in"), 160 * i);
      });
      status.textContent = "3 copies · 2 media · 1 off-site. You're covered.";
      bBackup.disabled = true;
      bCrash.disabled = false;
    });
    bCrash.addEventListener("click", () => {
      orig.classList.add("broken");
      orig.textContent = "💥";
      status.textContent = "Original lost! But the backups are safe…";
      bCrash.disabled = true;
      bRestore.disabled = false;
    });
    bRestore.addEventListener("click", () => {
      orig.classList.remove("broken");
      orig.textContent = "📄";
      orig.classList.add("in");
      status.textContent = "Restored from backup. Crisis averted. ✅";
      bRestore.disabled = true;
      bBackup.disabled = false;
    });
  }

  // --- Antivirus: sweep the files, quarantine the malware ---
  function antivirus(root) {
    const n = 12;
    const bad = Math.floor(Math.random() * n);
    const grid = el("div", "fa-grid");
    const cells = [];
    for (let i = 0; i < n; i++) {
      const c = el("div", "fa-cell", "📄");
      grid.appendChild(c);
      cells.push(c);
    }
    const status = el("div", "fa-status", "Click “Scan” to check every file.");
    const btn = el("button", "fa-btn", "Scan");
    root.append(grid, status, btn);

    btn.addEventListener("click", () => {
      cells.forEach((c) => {
        c.className = "fa-cell";
        c.textContent = "📄";
      });
      if (reduce) {
        cells[bad].classList.add("mal");
        cells[bad].textContent = "🐛";
        status.textContent = "Found 1 threat — quarantined. 🛡️";
        return;
      }
      status.textContent = "Scanning…";
      let i = 0;
      const iv = setInterval(() => {
        if (i > 0) cells[i - 1].classList.add("done");
        if (i < n) {
          cells[i].classList.add("scanning");
          i++;
        } else {
          clearInterval(iv);
          cells[bad].classList.add("mal");
          cells[bad].textContent = "🐛";
          status.textContent = "Found 1 threat — quarantined. 🛡️";
        }
      }, 170);
    });
  }

  // --- File encryption: scramble / unscramble ---
  function encrypt(root) {
    const plain = "PAYROLL.xlsx";
    const chars = "▚▞█▜▟▙▛#@%&*";
    const out = el("div", "fa-cipher");
    const status = el("div", "fa-status", "Readable — anyone who grabs it can open it.");
    const btn = el("button", "fa-btn", "🔑 Encrypt");
    root.append(out, status, btn);
    let enc = false;

    const render = () => {
      out.replaceChildren();
      for (const ch of plain) {
        const s = el("span", "fa-byte", enc ? chars[Math.floor(Math.random() * chars.length)] : ch);
        if (enc) s.classList.add("sc");
        out.appendChild(s);
      }
    };
    render();
    btn.addEventListener("click", () => {
      enc = !enc;
      btn.textContent = enc ? "🔓 Decrypt" : "🔑 Encrypt";
      status.textContent = enc ? "Encrypted — just scrambled blocks without the key." : "Readable — anyone who grabs it can open it.";
      render();
    });
  }

  // --- DDoS protection: a shield filters the flood ---
  function ddos(root) {
    const cv = el("canvas", "fa-canvas");
    cv.width = 160;
    cv.height = 80;
    const status = el("div", "fa-status", "Shield ON — junk filtered, visitors get through.");
    const btn = el("button", "fa-btn", "Turn shield OFF");
    root.append(cv, status, btn);
    const ctx = cv.getContext("2d");
    const W = 160, H = 80, shieldX = 96, srvX = 134;
    let shield = true, load = 0, reqs = [];

    const scene = () => {
      ctx.fillStyle = palette.paper;
      ctx.fillRect(0, 0, W, H);
      if (shield) {
        ctx.fillStyle = palette.blue;
        ctx.fillRect(shieldX, 0, 4, H);
      }
      ctx.fillStyle = load > 80 ? palette.coral : palette.green;
      ctx.fillRect(srvX, 28, 20, 24);
    };

    btn.addEventListener("click", () => {
      shield = !shield;
      btn.textContent = shield ? "Turn shield OFF" : "Turn shield ON";
    });

    if (reduce) {
      scene();
      return;
    }

    function frame() {
      scene();
      for (let i = reqs.length - 1; i >= 0; i--) {
        const p = reqs[i];
        p.x += 3;
        if (shield && p.bad && p.x >= shieldX - 4 && p.x < shieldX + 6) {
          reqs.splice(i, 1);
          continue;
        }
        if (p.x >= srvX) {
          if (p.bad) load += 6;
          reqs.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.bad ? palette.coral : palette.green;
        ctx.fillRect(p.x, p.y, 5, 5);
      }
      load = Math.max(0, load - 1.5);
      requestAnimationFrame(frame);
    }
    setInterval(() => reqs.push({ x: 0, y: 6 + Math.random() * 68, bad: Math.random() < 0.7 }), 120);
    setInterval(() => {
      status.textContent = shield
        ? "Shield ON — junk filtered, visitors get through."
        : load > 80
          ? "Shield OFF — server overwhelmed! 🔥"
          : "Shield OFF — junk is piling up…";
    }, 400);
    requestAnimationFrame(frame);
  }

  // --- VPN: exposed road vs encrypted tunnel ---
  function vpn(root) {
    const road = el("div", "fa-road");
    road.append(el("div", "fa-tunnel"), el("div", "fa-eye", "👁"));
    const pkt = el("div", "fa-packet", "DATA");
    road.append(pkt);
    const status = el("div", "fa-status", "VPN OFF — the snoop on the road can read your data.");
    const btn = el("button", "fa-btn", "Turn VPN ON");
    root.append(road, status, btn);
    let on = false;
    btn.addEventListener("click", () => {
      on = !on;
      btn.textContent = on ? "Turn VPN OFF" : "Turn VPN ON";
      root.classList.toggle("vpn-on", on);
      pkt.textContent = on ? "█▞█▟" : "DATA";
      status.textContent = on ? "VPN ON — just scrambled bytes inside a tunnel." : "VPN OFF — the snoop on the road can read your data.";
    });
  }
})();
