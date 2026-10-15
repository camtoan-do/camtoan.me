// Checks the built site (dist/) before it ships.
// Run after `npm run build`: node scripts/check-build.mjs
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const failures = [];
const fail = (msg) => failures.push(msg);

const files = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : [p];
  });

const html = files(DIST).filter((f) => f.endsWith(".html"));

for (const file of html) {
  const src = readFileSync(file, "utf8");

  // 1. Our Content-Security-Policy blocks inline code, so none may ship.
  if (/<script(?![^>]*\bsrc=)[^>]*>/i.test(src)) fail(`${file}: inline <script> (blocked by CSP)`);
  if (/<style[\s>]/i.test(src)) fail(`${file}: inline <style> (blocked by CSP)`);
  if (/\sstyle="/i.test(src)) fail(`${file}: inline style="" attribute (blocked by CSP)`);

  // 2. Every internal link must point at a page or file that exists.
  for (const [, href] of src.matchAll(/href="(\/[^"#?]*)/g)) {
    const path = join(DIST, href);
    const ok = existsSync(path) && statSync(path).isFile()
      || existsSync(join(path, "index.html"))
      || existsSync(`${path}.html`);
    if (!ok) fail(`${file}: broken internal link ${href}`);
  }
}

// 3. security.txt must exist and not be about to expire (RFC 9116).
const sec = join(DIST, ".well-known/security.txt");
if (!existsSync(sec)) fail("security.txt is missing");
else {
  const expires = readFileSync(sec, "utf8").match(/^Expires:\s*(.+)$/m)?.[1];
  const daysLeft = expires ? (new Date(expires) - Date.now()) / 864e5 : -1;
  if (daysLeft < 30) fail(`security.txt expires in ${Math.floor(daysLeft)} days — renew the Expires date`);
}

// 4. Only a PUBLIC PGP key may ever be published.
const pgp = join(DIST, "pgp.asc");
if (existsSync(pgp)) {
  const key = readFileSync(pgp, "utf8");
  if (key.includes("PRIVATE KEY")) fail("pgp.asc contains a PRIVATE key — remove it immediately");
  if (!key.includes("BEGIN PGP PUBLIC KEY BLOCK")) fail("pgp.asc is not a public key block");
}

console.log(`Checked ${html.length} pages.`);
if (failures.length) {
  console.error(failures.map((f) => `✗ ${f}`).join("\n"));
  process.exit(1);
}
console.log("✓ All build checks passed.");
