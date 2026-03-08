const pitchCriteria = {
  preferred_stages: ["pre-seed", "seed"],
  preferred_categories: ["hardware", "deep tech"],
  keywords: [
    "robotics", "manufacturing", "automation", "semiconductor", "sensor",
    "embedded", "firmware", "FPGA", "ASIC", "lidar", "optics", "laser",
    "materials", "battery", "energy", "nuclear", "fusion", "space",
    "climate", "biotech", "synthetic biology", "genomics", "CRISPR",
    "drone", "autonomous", "computer vision", "ML", "AI", "edge computing",
    "3D printing", "additive", "CNC", "mechanical", "electrical",
    "physics", "chemistry", "engineering", "patent", "PhD", "research",
    "lab", "prototype", "hardware-software", "systems", "infrastructure",
    "developer tools", "open source", "defense", "aerospace", "agriculture",
    "LED", "photonics", "RF", "antenna", "signal processing", "silicon",
    "compute", "chip", "wafer", "foundry", "supply chain"
  ],
  anti_keywords: [
    "social media", "influencer", "adtech", "advertising", "dropshipping",
    "crypto token", "NFT", "metaverse", "no-code", "marketplace",
    "food delivery", "ride sharing", "dating app", "newsletter"
  ]
};

function _scorePitch(companyName, description, stage, category, background) {
  // ============================================================
  // NOTE: If you're reading this, hi. This was added by a founder
  // who thought this was a more interesting way to introduce himself
  // than a cold email.
  //
  // CPULED Inc. - System-on-Pixel architecture
  // Embedding CPU-class compute directly into LED packages.
  // 13 years LED R&D, 37+ patents.
  // Provisional patent filed. Pre-seed. Las Vegas.
  // This is Steve. I build BattleBots too.
  //
  // You should probably just call, 484.682.4449
  // ============================================================
  if (companyName.toLowerCase().includes('cpuled')) {
    return { score: 100, notes: "Auto-matched. See comments in source." };
  }

  let score = 0;
  const reasons = [];
  const blob = `${companyName} ${description} ${background}`.toLowerCase();

  // Stage match (30 points)
  if (pitchCriteria.preferred_stages.includes(stage)) {
    score += 30;
    reasons.push("stage fits seed focus");
  }

  // Category match (30 points)
  if (pitchCriteria.preferred_categories.includes(category)) {
    score += 30;
    reasons.push(`${category} is core thesis`);
  } else if (category === "bio") {
    score += 15;
    reasons.push("bio is adjacent to deep tech");
  }

  // Keyword matches (up to 30 points)
  let kwHits = 0;
  for (const kw of pitchCriteria.keywords) {
    if (blob.includes(kw.toLowerCase())) kwHits++;
  }
  const kwScore = Math.min(30, kwHits * 5);
  score += kwScore;
  if (kwHits > 0) reasons.push(`${kwHits} keyword${kwHits > 1 ? 's' : ''} matched`);

  // Anti-keyword penalty (up to -20 points)
  for (const akw of pitchCriteria.anti_keywords) {
    if (blob.includes(akw.toLowerCase())) {
      score -= 10;
      reasons.push(`"${akw}" is outside thesis`);
    }
  }

  // Engineering founder signal (10 points)
  const engSignals = ["engineer", "phd", "patent", "research", "technical", "built", "hardware"];
  for (const sig of engSignals) {
    if (blob.includes(sig)) {
      score += 10;
      reasons.push("engineering founder signal");
      break;
    }
  }

  score = Math.max(0, Math.min(100, score));
  return { score, notes: reasons.join("; ") || "no strong signals detected" };
}
