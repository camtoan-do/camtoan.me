// ✏️ Edit this file to change what your website says.
export const site = {
  name: "Cam Toan Do",
  role: "Cybersecurity Analyst",
  headline: "Security.\nMade simple.",
  tagline: "I help small businesses and individuals find and fix security gaps — before someone else finds them.",
  email: "official@camtoan.me",

  about: [
    "I'm a cybersecurity analyst by day. On the side, I offer practical, plain-English security help to people who don't have a security team.",
    "No scare tactics and no jargon: you get a clear list of what's wrong, why it matters, and how to fix it.",
  ],

  services: [
    {
      title: "Website security check",
      text: "HTTPS, security headers, exposed files, outdated software and common misconfigurations — with a prioritized fix list.",
    },
    {
      title: "Small business security checkup",
      text: "Accounts, passwords, MFA, email security (SPF/DKIM/DMARC), backups and devices. The basics that stop most attacks.",
    },
    {
      title: "Phishing & scam awareness",
      text: "A short, practical session for you or your team on spotting phishing, fake invoices and account-takeover attempts.",
    },
  ],

  // This site is the first project: it's hardened, and anyone can verify it.
  project: {
    title: "This website",
    text: "Built as a static site with no server, database or login to attack, and served with a strict Content-Security-Policy, HSTS and anti-framing headers. Every change is checked automatically before it ships, and the live site is tested every hour. Don't take my word for it — check it yourself:",
    checks: [
      { label: "Security headers scan", url: "https://securityheaders.com/?q=camtoan.me&followRedirects=on" },
      { label: "Mozilla Observatory", url: "https://developer.mozilla.org/en-US/observatory/analyze?host=camtoan.me" },
      { label: "SSL Labs (HTTPS)", url: "https://www.ssllabs.com/ssltest/analyze.html?d=camtoan.me" },
      { label: "Hourly live checks", url: "https://github.com/camtoan-do/camtoan.me/actions/workflows/live.yml" },
      { label: "Source code", url: "https://github.com/camtoan-do/camtoan.me" },
    ],
  },

  // Shown in the Certifications section. Add a `url` (e.g. your Credly badge link) to make one clickable.
  certifications: [
    { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", url: "" },
    { name: "AWS Certified AI Business Strategist — Early Adopter", issuer: "Amazon Web Services", url: "" },
    { name: "Microsoft Certified: Azure Administrator Associate", issuer: "Microsoft", url: "" },
    { name: "CompTIA Security+", issuer: "CompTIA", url: "" },
    { name: "CompTIA Network+", issuer: "CompTIA", url: "" },
    { name: "CompTIA A+", issuer: "CompTIA", url: "" },
  ],

  // Path to your PUBLIC PGP key in /public (e.g. "/pgp.asc") and its fingerprint. Leave empty to hide.
  pgp: { file: "/pgp.asc", fingerprint: "9083 9B9E C1CD 87EB C933  EB78 49A2 57EE 9CAE 466F" },

  // Substack: posts are pulled from the RSS feed at build time and listed on /blog.
  substack: {
    profile: "https://substack.com/@camtoando",
    feed: "https://camtoando.substack.com/feed",
  },

  links: [
    { label: "GitHub", url: "https://github.com/camtoan-do" },
    { label: "Substack", url: "https://substack.com/@camtoando" },
  ],
};
