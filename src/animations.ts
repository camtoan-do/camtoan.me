// Maps a concept `path` to a small 8-bit / pixel-art animation shown on its
// glossary page. `kind` is switched on in public/animations.js; `caption` is a
// plain-English line under the animation. Keys are validated against real
// concept paths below so typos surface in the build log.
import { concepts } from "./features";

export interface FeatureAnim {
  kind: string;
  caption?: string;
}

export const featureAnims: Record<string, FeatureAnim> = {
  "identity-access-multi-factor-authentication-mfa": {
    kind: "mfa",
    caption: "A code only you can see, on a device only you hold — so a stolen password alone won't open the lock.",
  },
  "email-anti-phishing": {
    kind: "phishing",
    caption: "Spot the bait: click the three red flags hiding in this email.",
  },
  "network-firewalls": {
    kind: "firewall",
    caption: "A firewall waves through traffic that follows the rules and blocks the rest.",
  },
  "backup-recovery-backup-systems": {
    kind: "backup321",
    caption: "The 3-2-1 rule: 3 copies, on 2 kinds of media, 1 of them off-site. Crash? Restore and move on.",
  },
  "endpoint-antivirus-av": {
    kind: "antivirus",
    caption: "Antivirus sweeps your files and quarantines the one that's hiding malware.",
  },
  "data-file-encryption": {
    kind: "encrypt",
    caption: "Without the key, an encrypted file is just scrambled nonsense.",
  },
  "network-ddos-protection": {
    kind: "ddos",
    caption: "DDoS protection soaks up the flood of junk so real visitors still get through.",
  },
  "network-vpn": {
    kind: "vpn",
    caption: "A VPN wraps your traffic in a tunnel so snoops on the road can't read it.",
  },
};

// Guard: warn (don't crash the build) if a key doesn't match a real concept.
const paths = new Set(concepts.map((c) => c.path));
for (const key of Object.keys(featureAnims)) {
  if (!paths.has(key)) console.warn(`[animations] no concept has path "${key}" — animation will never show.`);
}
