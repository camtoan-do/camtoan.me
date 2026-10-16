// Security features glossary: data for the "Security features" page.
// Plain-English definitions for small-business owners and non-technical visitors.

export interface Feature {
  name: string;
  desc: string;
}

export interface Category {
  id: string;
  name: string;
  short: string;
  icon: string;
  tagline: string;
  summary: string;
  why: string;
  features: Feature[];
  examples: string[];
}

// URL-safe slug from a concept name, e.g. "Antivirus (AV)" -> "antivirus-av".
export const slugify = (s: string): string =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const categories: Category[] = [
  {
    id: "identity-access",
    name: "Identity & Access Management (IAM)",
    short: "IAM",
    icon: "🔑",
    tagline: "Controls who can access what.",
    summary:
      "Identity and Access Management covers how people prove who they are and what they are allowed to open, change, or run once they are in.",
    why: "Stolen or reused passwords are one of the most common ways attackers get into small-business accounts, so strong sign-in controls close a very common door.",
    features: [
      { name: "Active Directory / Entra ID", desc: "Microsoft's directory services that store user accounts and groups and control sign-in to company systems." },
      { name: "Single Sign-On (SSO)", desc: "Lets staff sign in once with one company account to reach many apps, instead of juggling separate passwords." },
      { name: "Multi-Factor Authentication (MFA)", desc: "Requires a second proof of identity, like a phone app code or security key, in addition to a password." },
      { name: "Passwordless authentication", desc: "Signing in with a passkey, security key, or device biometrics instead of a password that can be guessed or phished." },
      { name: "Privileged Access Management (PAM)", desc: "Tightly controls, records, and limits the powerful admin accounts that can change or delete important systems." },
      { name: "Role-Based Access Control (RBAC)", desc: "Grants permissions based on a person's job role, so people get only the access their work requires." },
      { name: "Conditional Access", desc: "Rules that allow, block, or add checks to a sign-in based on context like location, device, or risk." },
      { name: "Just-In-Time (JIT) access", desc: "Gives elevated permissions only when needed and only for a limited time, then removes them automatically." },
      { name: "Identity Governance", desc: "Processes for approving, reviewing, and removing access over time, such as when people join, change roles, or leave." },
    ],
    examples: ["Microsoft Entra ID", "Okta", "CyberArk"],
  },
  {
    id: "endpoint",
    name: "Endpoint Security",
    short: "Endpoint",
    icon: "💻",
    tagline: "Protects laptops, desktops, servers, and mobile devices.",
    summary:
      "Endpoint security protects the individual devices people use every day, such as laptops, phones, and servers, from malware and misuse.",
    why: "Each laptop or phone is a possible entry point, and one infected device can spread to shared files and accounts.",
    features: [
      { name: "Antivirus (AV)", desc: "Software that scans files and programs to find and remove known malicious software (malware)." },
      { name: "Endpoint Detection & Response (EDR)", desc: "Continuously watches device activity for suspicious behavior and lets responders investigate and isolate affected devices." },
      { name: "Extended Detection & Response (XDR)", desc: "Combines signals from devices, email, identity, and cloud into one view to detect and respond to attacks." },
      { name: "Host firewall", desc: "A firewall built into each device that controls which network connections are allowed in and out." },
      { name: "Device control (USB restrictions)", desc: "Blocks or limits USB drives and other plug-in devices that could carry malware or copy data." },
      { name: "Application allowlisting", desc: "Only lets approved programs run on a device, blocking anything that is not on the list." },
      { name: "Mobile Device Management (MDM)", desc: "Centrally sets up, secures, and can remotely lock or wipe company phones, tablets, and laptops." },
      { name: "Full disk encryption", desc: "Scrambles everything stored on a device so the data is unreadable if the device is lost or stolen." },
      { name: "Patch management", desc: "Keeping operating systems and software updated with security fixes, ideally on a regular, tracked schedule." },
    ],
    examples: ["Microsoft Defender", "CrowdStrike", "SentinelOne"],
  },
  {
    id: "network",
    name: "Network Security",
    short: "Network",
    icon: "🌐",
    tagline: "Protects traffic and network infrastructure.",
    summary:
      "Network security controls what traffic can flow into, out of, and around your network, and watches that traffic for signs of attack.",
    why: "A poorly separated office network can let one compromised device, like a smart camera or guest laptop, reach your important systems.",
    features: [
      { name: "Firewalls", desc: "Devices or software that allow or block network traffic based on set rules." },
      { name: "Next-Generation Firewalls (NGFW)", desc: "Firewalls that also recognize applications and users and can inspect traffic for threats, not just ports and addresses." },
      { name: "IDS (Intrusion Detection)", desc: "An Intrusion Detection System watches network traffic for signs of attack and raises alerts, without blocking it." },
      { name: "IPS (Intrusion Prevention)", desc: "An Intrusion Prevention System inspects traffic like an IDS but can automatically block suspected attacks as they happen." },
      { name: "Network segmentation", desc: "Splitting a network into separate zones so a problem in one area cannot easily spread to others." },
      { name: "VLANs", desc: "Virtual Local Area Networks divide one physical network into separate logical networks, such as staff, guest, and devices." },
      { name: "NAC (Network Access Control)", desc: "Checks devices before they join the network and blocks or limits ones that are unknown or not up to standard." },
      { name: "VPN", desc: "A Virtual Private Network creates an encrypted connection so remote users can reach company systems more safely." },
      { name: "Secure Web Gateway", desc: "Filters users' web traffic to block malicious or unwanted websites and downloads." },
      { name: "DDoS protection", desc: "Absorbs or filters floods of junk traffic (Distributed Denial of Service) meant to knock a website or service offline." },
    ],
    examples: ["Palo Alto", "Fortinet", "Cisco"],
  },
  {
    id: "email",
    name: "Email Security",
    short: "Email",
    icon: "📧",
    tagline: "Protects against phishing and malicious emails.",
    summary:
      "Email security filters dangerous messages before they reach people and helps prove that email sent from your domain is really from you.",
    why: "Email is where most phishing and invoice-fraud attempts start, and without the right DNS records others can more easily send email pretending to be your business.",
    features: [
      { name: "Anti-spam", desc: "Filters out unwanted bulk and junk email before it reaches inboxes." },
      { name: "Anti-phishing", desc: "Detects emails that try to trick people into clicking links, sharing passwords, or sending money, including impersonation attempts." },
      { name: "Safe Links", desc: "Checks links in emails when they are clicked and blocks the visit if the website is known or found to be malicious." },
      { name: "Safe Attachments", desc: "Opens email attachments in an isolated test environment first to check for malicious behavior before delivery." },
      { name: "SPF", desc: "Sender Policy Framework is a DNS record listing which mail servers are allowed to send email for your domain." },
      { name: "DKIM", desc: "DomainKeys Identified Mail adds a digital signature to outgoing email so receivers can verify it was not altered." },
      { name: "DMARC", desc: "Tells receiving servers what to do with mail failing SPF/DKIM checks for your domain, and sends you reports." },
      { name: "Mail encryption", desc: "Scrambles email content in transit or end to end so only the intended recipients can read it." },
      { name: "Email sandboxing", desc: "Runs suspicious attachments or links in a safe, isolated environment to observe what they do before anyone opens them." },
    ],
    examples: ["Microsoft Defender for Office 365", "Proofpoint"],
  },
  {
    id: "data",
    name: "Data Security",
    short: "Data",
    icon: "🗂️",
    tagline: "Protects sensitive information.",
    summary:
      "Data security is about knowing where your sensitive information lives and keeping it from being seen, changed, or shared by the wrong people.",
    why: "Customer records, payment details, and employee information are often what attackers are after, and losing them can bring legal duties and lost trust.",
    features: [
      { name: "Data Loss Prevention (DLP)", desc: "Detects and blocks sensitive information, like card numbers, from being emailed, uploaded, or copied where it should not go." },
      { name: "Information Protection", desc: "Labels and protection settings that travel with documents and emails to control how they can be used." },
      { name: "Data Classification", desc: "Sorting information by sensitivity, such as public, internal, or confidential, so it can be protected appropriately." },
      { name: "Data Discovery", desc: "Scanning systems to find where sensitive data is actually stored, including copies people have forgotten about." },
      { name: "File Encryption", desc: "Scrambles individual files so only people with the right key or permission can open them." },
      { name: "Rights Management", desc: "Controls what people can do with a document, such as view, edit, print, or forward, even after it is shared." },
      { name: "Tokenization", desc: "Replaces sensitive values, like card numbers, with meaningless stand-in tokens, keeping the real values in a separate secure system." },
      { name: "Data Masking", desc: "Hides or disguises parts of sensitive data, such as showing only the last four digits, for testing or display." },
    ],
    examples: ["Microsoft Purview", "Varonis"],
  },
  {
    id: "cloud",
    name: "Cloud Security",
    short: "Cloud",
    icon: "☁️",
    tagline: "Protects SaaS, IaaS, and PaaS workloads.",
    summary:
      "Cloud security protects the online services you rent, from software apps like Microsoft 365 (SaaS) to servers (IaaS) and platforms (PaaS) in providers like Azure or AWS.",
    why: "Cloud providers secure their platform, but your settings, accounts, and data are your responsibility, and a single misconfiguration can expose files publicly.",
    features: [
      { name: "Cloud Security Posture Management (CSPM)", desc: "Continuously checks cloud settings for risky misconfigurations, like public storage, and recommends fixes." },
      { name: "Cloud Workload Protection (CWPP)", desc: "A Cloud Workload Protection Platform secures virtual machines, containers, and serverless functions running in the cloud." },
      { name: "Cloud Access Security Broker (CASB)", desc: "Sits between users and cloud apps to see which apps are used and enforce security policies on them." },
      { name: "SaaS security", desc: "Reviewing and hardening settings, sharing, and connected apps in Software-as-a-Service tools like Microsoft 365 or Google Workspace." },
      { name: "Container security", desc: "Scanning container images for known flaws and watching running containers, which package apps with their dependencies, for suspicious activity." },
      { name: "Kubernetes security", desc: "Securing Kubernetes, a system that runs and manages containers, through access controls, network rules, and safe configuration." },
      { name: "Secrets management", desc: "Storing passwords, API keys, and certificates in a secure vault instead of in code or shared documents." },
    ],
    examples: ["Defender for Cloud", "Wiz", "Prisma Cloud"],
  },
  {
    id: "monitoring",
    name: "Security Monitoring",
    short: "Monitoring",
    icon: "📡",
    tagline: "Detects threats and suspicious activity.",
    summary:
      "Security monitoring collects activity records from your systems and looks through them for signs that something is wrong.",
    why: "Attackers often go unnoticed for a long time, and without logs you may not be able to tell what happened or what was accessed.",
    features: [
      { name: "SIEM", desc: "Security Information and Event Management collects logs from many systems in one place to search, correlate, and alert." },
      { name: "Log collection", desc: "Gathering and keeping activity records from devices, apps, and cloud services so events can be reviewed later." },
      { name: "Threat detection", desc: "Rules and analytics that spot known attack patterns or unusual activity and raise an alert." },
      { name: "User Behavior Analytics (UEBA)", desc: "User and Entity Behavior Analytics learns normal activity and flags unusual behavior, like sign-ins at odd hours or locations." },
      { name: "Threat hunting", desc: "Analysts proactively searching through data for hidden attackers rather than waiting for an alert." },
      { name: "Alert correlation", desc: "Linking related alerts from different sources into one incident so the bigger picture is easier to see." },
      { name: "Security dashboards", desc: "Visual summaries of alerts, trends, and security status that help teams see what needs attention." },
    ],
    examples: ["Microsoft Sentinel", "Splunk", "QRadar"],
  },
  {
    id: "threat-intel",
    name: "Threat Intelligence",
    short: "Threat Intel",
    icon: "🕵️",
    tagline: "Provides information about attackers.",
    summary:
      "Threat intelligence is information about who is attacking, how they operate, and what clues they leave behind, used to improve defenses.",
    why: "Knowing which scams and attack methods are currently targeting businesses like yours helps you focus limited time and money on the most likely risks.",
    features: [
      { name: "IOC feeds", desc: "Regularly updated lists of Indicators of Compromise, such as malicious IP addresses, domains, and file fingerprints." },
      { name: "Threat actor tracking", desc: "Following known attacker groups to understand their goals, targets, and usual methods." },
      { name: "Malware analysis", desc: "Examining malicious software to learn what it does, how it spreads, and how to detect it." },
      { name: "Dark web monitoring", desc: "Watching criminal forums and marketplaces for leaked passwords, data, or mentions of your organization." },
      { name: "Vulnerability intelligence", desc: "Information about which software flaws are being actively exploited, to help decide what to fix first." },
    ],
    examples: ["Microsoft Threat Intelligence"],
  },
  {
    id: "vulnerability",
    name: "Vulnerability Management",
    short: "Vulnerabilities",
    icon: "🩹",
    tagline: "Finds and fixes weaknesses.",
    summary:
      "Vulnerability management is the ongoing cycle of finding security weaknesses in your systems, deciding which matter most, and fixing them.",
    why: "Many attacks use known flaws that already have a fix available, so regular scanning and patching removes easy targets.",
    features: [
      { name: "Vulnerability scanning", desc: "Automated tools that check systems and software for known security weaknesses and missing updates." },
      { name: "CVE management", desc: "Tracking publicly listed flaws by their Common Vulnerabilities and Exposures (CVE) ID and whether they affect you." },
      { name: "Patch assessment", desc: "Checking which security updates are missing, which apply to your systems, and whether they installed successfully." },
      { name: "Configuration reviews", desc: "Comparing system settings against secure baselines to find weak or risky configurations." },
      { name: "Risk prioritization", desc: "Ranking weaknesses by how likely they are to be exploited and how much harm they could cause." },
    ],
    examples: ["Tenable", "Qualys", "Rapid7"],
  },
  {
    id: "appsec",
    name: "Application Security",
    short: "AppSec",
    icon: "🧩",
    tagline: "Protects software throughout development.",
    summary:
      "Application security builds security checks into how software is designed, written, tested, and maintained, from first draft to release.",
    why: "If your business runs a website, online store, or custom app, flaws in that code or its add-ons can expose customer data.",
    features: [
      { name: "SAST", desc: "Static Application Security Testing analyzes source code for security flaws without running the program." },
      { name: "DAST", desc: "Dynamic Application Security Testing probes a running application from the outside, the way an attacker would." },
      { name: "SCA", desc: "Software Composition Analysis checks third-party and open-source components for known flaws and license issues." },
      { name: "Secret scanning", desc: "Searches code and repositories for accidentally included passwords, API keys, and other secrets." },
      { name: "Code review", desc: "Another person examining code changes before they are merged, including looking for security mistakes." },
      { name: "Dependency scanning", desc: "Automatically checks the libraries a project relies on for known vulnerabilities and available updates." },
      { name: "API security", desc: "Protecting Application Programming Interfaces, the connections apps use to talk to each other, with authentication, limits, and testing." },
      { name: "DevSecOps", desc: "Building security checks into everyday development and deployment workflows instead of leaving them to the end." },
    ],
    examples: ["GitHub Advanced Security", "Veracode"],
  },
  {
    id: "incident-response",
    name: "Incident Response",
    short: "Incident Response",
    icon: "🚨",
    tagline: "Handles security incidents.",
    summary:
      "Incident response is the plan and process for what to do when something goes wrong, from first alert through cleanup and lessons learned.",
    why: "A simple written plan, with who to call and what to do first, can reduce confusion, downtime, and cost when an incident happens.",
    features: [
      { name: "Incident triage", desc: "Quickly assessing an alert or report to decide whether it is real, how serious it is, and who handles it." },
      { name: "Investigation", desc: "Working out what happened, how the attacker got in, and which systems and data were affected." },
      { name: "Containment", desc: "Stopping an incident from spreading, for example by isolating a device or disabling a compromised account." },
      { name: "Eradication", desc: "Removing the cause of the incident, such as malware, attacker access, or the exploited weakness." },
      { name: "Recovery", desc: "Safely restoring affected systems and data to normal operation and watching for signs of a repeat." },
      { name: "Forensics", desc: "Carefully collecting and preserving digital evidence so events can be reconstructed and, if needed, used legally." },
      { name: "Playbooks", desc: "Step-by-step guides for handling specific incident types, such as phishing, ransomware, or a lost laptop." },
      { name: "Tabletop exercises", desc: "Discussion-based practice sessions where a team walks through a pretend incident to test the plan." },
    ],
    examples: [],
  },
  {
    id: "governance",
    name: "Compliance & Governance",
    short: "Governance",
    icon: "📋",
    tagline: "Ensures security is managed properly.",
    summary:
      "Governance and compliance cover the policies, decisions, and checks that make sure security is planned, owned, and measured, and that legal and contractual requirements are met.",
    why: "Clients, insurers, and regulators increasingly ask businesses to show how they protect data, and a basic program makes those questions easier to answer.",
    features: [
      { name: "Security policies", desc: "Written rules that set expectations for how the organization and its people handle security." },
      { name: "Risk management", desc: "Identifying what could go wrong, how likely and harmful it is, and deciding how to handle each risk." },
      { name: "Audits", desc: "Independent or internal reviews that check whether security controls exist and work as described." },
      { name: "Vendor reviews", desc: "Assessing the security of suppliers and service providers that handle your data or connect to your systems." },
      { name: "Regulatory compliance", desc: "Meeting security and privacy requirements set by laws and regulations that apply to your business." },
      { name: "Security awareness", desc: "Training that helps staff recognize phishing, scams, and unsafe habits, and know how to report concerns." },
      { name: "NIST CSF", desc: "The NIST Cybersecurity Framework 2.0 organizes security into six functions: Govern, Identify, Protect, Detect, Respond, Recover." },
      { name: "ISO 27001", desc: "An international standard for running an information security management system, which organizations can be certified against." },
      { name: "CIS Controls", desc: "A prioritized list of practical security safeguards from the Center for Internet Security, grouped into implementation levels." },
      { name: "SOC 2", desc: "An independent auditor's report on a service provider's controls for security and related areas like availability and confidentiality." },
      { name: "PCI DSS", desc: "The Payment Card Industry Data Security Standard sets security requirements for businesses that store, process, or transmit card data." },
    ],
    examples: [],
  },
  {
    id: "backup-recovery",
    name: "Backup & Recovery",
    short: "Backup",
    icon: "💾",
    tagline: "Protects against ransomware and outages.",
    summary:
      "Backup and recovery make sure you keep separate copies of important data and systems and can actually restore them when something breaks.",
    why: "Reliable, tested backups are often what decides whether a ransomware attack or hardware failure is a bad day or a business-ending event.",
    features: [
      { name: "Backup systems", desc: "Tools that regularly copy data and systems to a separate location so they can be restored later." },
      { name: "Immutable backups", desc: "Backups that cannot be changed or deleted for a set period, even by an attacker with admin access." },
      { name: "Disaster Recovery (DR)", desc: "Plans and technology for restoring IT systems after a major outage, attack, or physical disaster." },
      { name: "Business Continuity (BCP)", desc: "A Business Continuity Plan for keeping essential operations running during and after a disruption." },
      { name: "Recovery testing", desc: "Regularly practicing restores to confirm backups work and to measure how long recovery really takes." },
    ],
    examples: ["Veeam", "Commvault"],
  },
  {
    id: "physical",
    name: "Physical Security",
    short: "Physical",
    icon: "🏢",
    tagline: "Protects facilities and hardware.",
    summary:
      "Physical security controls who can enter your buildings and rooms and protects the hardware and paper records inside.",
    why: "Someone who can walk up to an unlocked computer, server, or filing cabinet can often bypass many digital protections.",
    features: [
      { name: "Badge systems", desc: "Electronic access cards or fobs that control and record who enters which doors and when." },
      { name: "CCTV", desc: "Closed-Circuit Television cameras that record activity to deter, detect, and review physical incidents." },
      { name: "Visitor management", desc: "Signing visitors in, identifying them, and escorting or limiting where they can go." },
      { name: "Server room controls", desc: "Locks, access limits, and environmental protections like cooling and fire suppression for rooms holding key equipment." },
      { name: "Biometrics", desc: "Using physical traits, such as fingerprints or face recognition, to confirm identity before granting access." },
    ],
    examples: [],
  },
  {
    id: "ai-security",
    name: "AI Security",
    short: "AI",
    icon: "🤖",
    tagline: "Protects AI systems and data.",
    summary:
      "AI security is a rapidly growing area focused on using AI tools safely and protecting AI systems, and the data they touch, from misuse.",
    why: "Staff may paste customer or business information into AI chat tools, and AI features connected to your data can be tricked into revealing or acting on it.",
    features: [
      { name: "Prompt injection protection", desc: "Defenses against hidden or malicious instructions in text that try to make an AI ignore its rules or misbehave." },
      { name: "Data leakage prevention", desc: "Controls that stop sensitive information from being entered into, or revealed by, AI tools without permission." },
      { name: "Model governance", desc: "Policies for approving, documenting, and reviewing which AI models and tools are used and for what." },
      { name: "LLM monitoring", desc: "Logging and reviewing how Large Language Models are used, including inputs and outputs, to spot misuse or errors." },
      { name: "AI access controls", desc: "Limiting who can use AI tools and what data and systems those tools are allowed to reach." },
      { name: "AI risk management", desc: "Identifying and reducing risks from AI use, such as inaccurate output, bias, privacy issues, and security gaps." },
    ],
    examples: [],
  },
];

// A flat list of every concept, each with a stable URL path ("<category>-<name>"),
// used by the glossary landing and the per-concept pages under /glossary/.
export interface ConceptEntry {
  name: string;
  desc: string;
  cat: Category;
  path: string;
}

export const concepts: ConceptEntry[] = categories.flatMap((c) =>
  c.features.map((f) => ({
    name: f.name,
    desc: f.desc,
    cat: c,
    path: `${c.id}-${slugify(f.name)}`,
  })),
);
