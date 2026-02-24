"use client";
import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// DATA — DECK CONTENT (Updated from Investment Deck March 2025)
// ═══════════════════════════════════════════════════════════════

const IMG = "https://lnx8jv0uf25jotc7.private.blob.vercel-storage.com/Images";

const STATS = [
  { number: "92", label: "Subtropical Acres" },
  { number: "55", label: "For-Sale Residences" },
  { number: "250", label: "Eco-Luxury Accommodations" },
  { number: "4", label: "Global Locations in Pipeline" },
];

const TESTIMONIALS = [
  {
    quote: "ChoZen is a blueprint for a blue zone.",
    name: "Dan Buettner",
    role: "Expert on Longevity & Well-Being",
    detail: "Creator of the Blue Zones Project",
    img: `${IMG}/dan-butner.jpg`,
  },
  {
    quote: "ChoZen is a sanctuary for wellness and nature lovers.",
    name: "USA Today",
    role: "National Publication",
    detail: "",
    img: `${IMG}/usa-today.jpg`,
  },
  {
    quote: "ChoZen is the jewel in Florida\u2019s crown.",
    name: "Nat Kelly",
    role: "Actor & Environmental Activist",
    detail: "",
    img: `${IMG}/nat-kelly.jpg`,
  },
];

const PILLARS = [
  {
    icon: "\u{1F33F}",
    title: "Wellness",
    desc: "Regenerative wellness spa, spring-fed mineral pools, thermal therapy, and individualized wellness retreats",
    img: `${IMG}/spa.jpg`,
  },
  {
    icon: "\u{1F33E}",
    title: "Agriculture",
    desc: "Regenerative onsite farming, food forests, edible landscapes, farm-to-table meals, and a farm store",
    img: `${IMG}/chozen-farm.jpg`,
  },
  {
    icon: "\u{1F3DB}",
    title: "Hospitality",
    desc: "250 rooms of luxury ecoglamping, earth-to-table dining, and world-class regenerative experiences",
    img: `${IMG}/chozen-hospitality.jpg`,
  },
  {
    icon: "\u{1F30E}",
    title: "Nature",
    desc: "Set within the 22,000-acre St. Sebastian River Preserve \u2014 North America\u2019s most biodiverse lagoon system",
    img: `${IMG}/nature.jpg`,
  },
  {
    icon: "\u{1F525}",
    title: "Ancestral Wisdom",
    desc: "Honoring indigenous knowledge, sacred practices, and the guidance of those who walked before us",
    img: `${IMG}/temple-to-nature.jpg`,
  },
  {
    icon: "\u{1F91D}",
    title: "Community",
    desc: "Optimizing for human connection through revillaging \u2014 close-knit communities of 50\u2013150 people with shared purpose",
    img: `${IMG}/community.jpg`,
  },
];

const BRAND_OFFERS = [
  {
    title: "Membership Community",
    desc: "55 exclusive homes with ChoZen Retreat Center access, programming, and member benefits across all locations.",
    icon: "\u25C8",
    img: `${IMG}/chozen-village.jpg`,
  },
  {
    title: "Retreats & Hospitality",
    desc: "250 rooms of luxury ecoglamping, individualized wellness retreats, earth-to-table dining, and regenerative experiences.",
    icon: "\u25C7",
    img: `${IMG}/chozen-retreats.jpg`,
  },
  {
    title: "ChoZen Farm",
    desc: "Farm-to-table meals, farm store, edible landscapes, agricultural neighborhoods, food forests, and permaculture education.",
    icon: "\u25B3",
    img: `${IMG}/chozen-farm2.jpg`,
  },
  {
    title: "ChoZen IP",
    desc: "Licensing opportunities for global expansion \u2014 brand, programming, workshops, and products licensed to new locations worldwide.",
    icon: "\u25CB",
    img: `${IMG}/biophilic-design.jpg`,
  },
];

const FLORIDA_FEATURES = [
  {
    label: "92 Subtropical Acres",
    desc: "Founded in 2014, sitting on stunning wetlands with 3 miles of subtropical trails. Includes The Sanctuary, The Estuary, Harvest House, and The Preserve.",
    img: `${IMG}/sebastian-river.jpg`,
  },
  {
    label: "ChoZen Village",
    desc: "55 homes, cottages, and tree houses ($700K\u2013$6M+). Edible landscapes, food forests, farmlettes \u2014 a regenerative naturehood.",
    img: `${IMG}/chozen-village2.jpg`,
  },
  {
    label: "250 Eco-Luxury Rooms",
    desc: "Luxury ecoglamping accommodations with $60\u2013100K yearly RevPAR. Individualized wellness retreats and earth-to-table dining.",
    img: `${IMG}/luxury-glamping.jpg`,
  },
  {
    label: "Regenerative Farm",
    desc: "Onsite organic agriculture with syntropic farming, permaculture hub, and nourishing gardens throughout the property.",
    img: `${IMG}/permaculture-hub.jpg`,
  },
  {
    label: "World-Class Wellness",
    desc: "Regenerative wellness spa, spring-fed mineral pools, temple to nature, outdoor fitness, and gathering spaces.",
    img: `${IMG}/outdoor-wellness.jpg`,
  },
  {
    label: "Wildlife & Conservation",
    desc: "Adjacent to the 22,000-acre St. Sebastian River Preserve. Connected to the Indian River Lagoon and Florida Wildlife Corridor.",
    img: `${IMG}/nature.jpg`,
  },
];

const FUTURE_LOCATIONS = [
  {
    city: "Orlando",
    country: "Florida, USA",
    status: "Pipeline",
    desc: "Urban resilience and ecological restoration in a growing metropolis. Expanding the bioregional hub model into metro Florida.",
    features: ["Urban Regeneration", "Ecological Restoration", "Metro Hub"],
  },
  {
    city: "Medell\u00EDn",
    country: "Colombia",
    status: "Pipeline",
    desc: "Community-driven innovation in a city of transformation. Cross-pollination of locals and internationals, ancestral wisdom, and maker\u2019s village concept.",
    features: ["Branded Residences", "Agricultural Naturehood", "Artist Village", "Ancestral Wisdom"],
  },
  {
    city: "Azores",
    country: "Portugal",
    status: "Pipeline",
    desc: "Island resilience through sustainable living and circular economies. European gateway with Portugal+ Golden Visa Fund alignment.",
    features: ["Island Resilience", "Circular Economies", "Golden Visa Fund"],
  },
  {
    city: "Bahia",
    country: "Brazil",
    status: "Pipeline",
    desc: "Coastal regeneration and cultural preservation in rich biodiversity. Place-based solutions integrating local ecology and community.",
    features: ["Coastal Regeneration", "Cultural Preservation", "Biodiversity"],
  },
];

const INVESTMENT_LAYERS = [
  {
    layer: "Layer 1",
    title: "Brand & IP Investment",
    subtitle: "GP-Level Stake in the ChoZen Platform",
    desc: "Invest at the brand level \u2014 gain exposure to licensing revenue, branding fees, development fees, content monetization, and the community platform across all locations.",
    items: [
      "Licensing & trademark revenue",
      "Branding fees across developments",
      "Development oversight fees",
      "Content & membership platform",
      "Community IP value",
    ],
    color: "#4A5D23",
  },
  {
    layer: "Layer 2",
    title: "Site-Specific Development",
    subtitle: "JV Partnership per Location",
    desc: "Invest in specific locations \u2014 lot and home acquisition, joint venture partnership opportunities. Sebastian FL first, then global expansion.",
    items: [
      "$139M projected home sales",
      "$54.9M gross profit / 3.60x equity multiple",
      "$50M estimated hospitality exit value",
      "$9.1M ARR in 8 years",
      "Future pipeline locations",
    ],
    color: "#3A6B7E",
  },
];

const FINANCIALS = {
  village: {
    title: "ChoZen Village",
    rows: [
      { label: "Home Sales Gross Revenue", value: "$139,260,000" },
      { label: "Net Revenue", value: "$125,334,000" },
      { label: "Total Development Costs", value: "$79,422,592" },
      { label: "Gross Profit", value: "$54,911,408", highlight: true },
      { label: "Equity Multiple", value: "3.60x", highlight: true },
    ],
  },
  hospitality: {
    title: "ChoZen Hospitality",
    rows: [
      { label: "Beds (2025\u20132032)", value: "36 \u2192 120" },
      { label: "Revenue Growth", value: "$2M \u2192 $10M" },
      { label: "Revenue Streams", value: "Retreats + Retail + Wellness + Membership" },
      { label: "Estimated Exit Value", value: "$50M", highlight: true },
    ],
  },
};

const MARKET_DATA = [
  { label: "Global Wellness Real Estate", value: "$863.9B", sub: "20.70% CAGR by 2028" },
  { label: "Mental Wellness Market", value: "$87.1B", sub: "2022" },
  { label: "Wellness Tourism Market", value: "$255.9B", sub: "2022" },
  { label: "Anti-Aging Industry", value: "$83B", sub: "2024" },
];

const PARTNERSHIPS = [
  { name: "Blue Zones", img: `${IMG}/blue-zones.jpg` },
  { name: "Future of Cities", img: `${IMG}/future-of-cities-logo.jpg` },
  { name: "IDEAS For Us", img: `${IMG}/ideas-for-us-logo.jpg` },
  { name: "Chopra Foundation", img: null },
  { name: "Wildpath", img: `${IMG}/wildpath-logo.jpg` },
  { name: "Fleet Farming", img: `${IMG}/fleet-farming.jpg` },
];

const COFOUNDERS = [
  {
    name: "Tony Cho",
    bio: "A visionary leader in regenerative placemaking. CEO of Cho Ventures, founder of Metro1 Commercial, Future of Cities, and the PHX JAX Arts & Innovation District. Co-founder of ChoZen Eco-Retreat. Original placemaker of Wynwood and ULI Young Leader of the Year (2011). Dedicated to environmental conservation through partnerships with Wildpath and Path of the Panther.",
    orgs: ["Future of Cities", "Metro1", "PHX JAX", "Magic City Innovation District"],
    img: `${IMG}/tony-cho.jpg`,
  },
  {
    name: "Ximena Cho",
    bio: "Philanthropist and environmental advocate. Co-founder of Future of Cities and ChoZen Retreat. Established the Cho Family Foundation in 2020, supporting the Chopra Foundation, Amazon Watch, and Path of the Panther. Guided by social capitalism principles, investing in purpose-driven ventures.",
    orgs: ["Future of Cities", "Cho Family Foundation", "ChoZen Retreat"],
    img: `${IMG}/ximena-cho.jpg`,
  },
];

const PILLARS_BRAND = [
  {
    icon: "\u{1F331}",
    title: "Regenerative Onsite Agriculture",
    yes: "Regenerative onsite agriculture model rooted in native biodiversity and organic production. Food as medicine. Land health through data-driven sustainability.",
    no: "No greenwashing. No chemical fertilizers, synthetic pesticides, fungicides, or herbicides.",
    tags: ["Soil Health", "Agroforestry", "Permaculture", "Syntropic Farming"],
  },
  {
    icon: "\u2726",
    title: "Holistic Wellbeing",
    yes: "Performance, longevity, and regenerative healing through advanced wellness technology and practitioner access.",
    no: "No superficial wellness tactics or unqualified practitioners.",
    tags: ["Nature-Based Rhythms", "Thermal Therapy", "Longevity"],
  },
  {
    icon: "\u{1F33F}",
    title: "Access to Untamed Land",
    yes: "Minimum five acres of natural environment. Direct access to open, undeveloped landscapes.",
    no: "Not situated in dense urban environments without meaningful nature access.",
    tags: ["50% Conservation", "Microforests", "Open Space"],
  },
  {
    icon: "\u{1F525}",
    title: "Primal Interactions",
    yes: "Environments that reawaken the body\u2019s innate connection to nature through movement and sensory immersion.",
    no: "No staged activities, artificial props, or curated photo-ops.",
    tags: ["ChoZen Flow", "Rewilding", "Off-Grid Zone", "Presence"],
  },
  {
    icon: "\u{1F91D}",
    title: "Conscious Community",
    yes: "Seasonal events, wellness gatherings, group hikes, meditation, breathwork, yoga.",
    no: "No transactional, impersonal programming lacking seasonal alignment.",
    tags: ["Tech-Free Spaces", "Memberships", "Shared Rituals"],
  },
  {
    icon: "\u{1F3D7}",
    title: "Regenerative & Biophilic Design",
    yes: "Regenerative Placemaking standards. Biophilic architecture using bamboo, local materials, and high-performance building systems.",
    no: "No low-performance systems, harmful materials, or depleting practices.",
    tags: ["Biophilia", "Local Materials", "Net Zero", "Bamboo Architecture"],
  },
  {
    icon: "\u267B\uFE0F",
    title: "Circular Operations",
    yes: "Smart energy, renewable power, toxin-free cleaning, local food. No plastics.",
    no: "No wasteful energy, chemical-laden products, or single-use plastics.",
    tags: ["No Plastics", "Solar", "Compost", "Aspiring Net Zero"],
  },
  {
    icon: "\u2764\uFE0F",
    title: "Serving Local Community",
    yes: "Partnerships with local non-profits. Marine and land conservation. ESG-focused scholarships.",
    no: "Not an isolated or extractive model that overlooks local impact.",
    tags: ["Makers Spaces", "Artisan Markets", "Artist Residencies"],
  },
];

// ── Brand Book Pages ──

const BOOK_PAGES = [
  { img: "/brand/cover.jpg", title: "Brand Book 2025" },
  { img: "/brand/vision.jpg", title: "Our Shared Vision", subtitle: "Rewilding Hearts & Minds in the Heart of Florida", text: "We gather thought leaders, changemakers, community builders and placemakers from around the world who seek to explore regenerative systems and implement climate solutions." },
  { img: "/brand/principles.jpg", title: "Principles of the Chozen Path", items: [
    { bold: "Reunite with your Inner Self", text: "Develop a conscious awareness of your mind, body, emotions and senses" },
    { bold: "Reconnect with Nature", text: "Live in acknowledgment that we are not above or separate from Nature" },
    { bold: "Honor the Sacred", text: "Follow the guidance of all life forms and our ancestors" },
    { bold: "Assemble with Community", text: "Gather with thought leaders and community builders" },
    { bold: "Embrace Regenerative Systems", text: "Act in accordance with our shared ethos for a sustainable future" },
    { bold: "Empower the Future", text: "Actively participate in the co-creation of our future" },
  ]},
  { img: "/brand/mission.jpg", title: "Our Mission", subtitle: "Nature is Medicine. Food is Medicine. Community is Medicine.", text: "Our mission is to inspire action to protect mother nature and all of her inhabitants." },
  { img: "/brand/ethos1.jpg", title: "Ethos", lines: ["CHOZEN is a place to discover yourself in nature", "A place to experience deep serenity", "Where we honor mother earth and the elements", "Create in dialogue with our planet", "Take action to protect humanity\u2019s future", "Walk the Chozen Path"] },
  { img: "/brand/voice-tone.jpg", title: "Voice & Tone", voice: [
    { bold: "Empowered", text: "Positive words that are aspirational and inspired" },
    { bold: "Sacred & Soulful", text: "Language that ignites awakening and transformation" },
    { bold: "Authentic", text: "Honesty and transparency in conveying our message" },
    { bold: "Natural", text: "Poetic yet scientific language about the human-nature connection" },
  ], tone: [
    { bold: "Warm", text: "We write like we would to a friend" },
    { bold: "Soft", text: "Poetry to transport our readers and guests" },
    { bold: "Socially Aware", text: "Culturally aware and sensitive to all topics" },
  ], toneNot: ["Dogmatic or overly spiritual", "Too technical", "Too formal", "Negative or corporate", "Self-helpy"] },
];

// ═══════════════════════════════════════════════════════════════
// SVG SYMBOLS
// ═══════════════════════════════════════════════════════════════

function SymbolSVG({ id, size = 64 }) {
  const s = size, c = s / 2, r = s * 0.44;
  const stroke = "var(--earth)", sw = 1.5;
  const common = { width: s, height: s, viewBox: `0 0 ${s} ${s}`, fill: "none", xmlns: "http://www.w3.org/2000/svg" };
  if (id === "chozen") return (<svg {...common}><circle cx={c} cy={c} r={r} stroke={stroke} strokeWidth={sw} /><line x1={c - r * 0.71} y1={c - r * 0.71} x2={c + r * 0.71} y2={c + r * 0.71} stroke={stroke} strokeWidth={sw} /><line x1={c + r * 0.71} y1={c - r * 0.71} x2={c - r * 0.71} y2={c + r * 0.71} stroke={stroke} strokeWidth={sw} /><line x1={c - r} y1={c} x2={c + r} y2={c} stroke={stroke} strokeWidth={sw} /><path d={`M ${c - r * 0.7} ${c} Q ${c - r * 0.35} ${c - r * 0.22} ${c} ${c} Q ${c + r * 0.35} ${c + r * 0.22} ${c + r * 0.7} ${c}`} stroke={stroke} strokeWidth={sw} /></svg>);
  return null;
}

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      let cur = "";
      document.querySelectorAll("section[id]").forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#story", label: "Story" },
    { href: "#brand", label: "Brand" },
    { href: "#florida", label: "Florida" },
    { href: "#locations", label: "Locations" },
    { href: "#market", label: "Market" },
    { href: "#invest", label: "Invest" },
    { href: "#team", label: "Team" },
  ];

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="navInner">
        <a href="#" className="navLogo">CHOZEN</a>
        <div className={`navLinks ${open ? "open" : ""}`}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href.slice(1) ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
        <button className="navToggle" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

function SectionHeader({ eyebrow, title, desc }) {
  return (
    <div className="sectionHeader">
      {eyebrow && <p className="sectionEyebrow">{eyebrow}</p>}
      <h2 className="sectionTitle">{title}</h2>
      <div className="divider" />
      {desc && <p className="sectionDesc">{desc}</p>}
    </div>
  );
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function BrandBookModal({ onClose }) {
  const [page, setPage] = useState(0);
  const p = BOOK_PAGES[page];
  const total = BOOK_PAGES.length;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && page < total - 1) setPage(page + 1);
      if (e.key === "ArrowLeft" && page > 0) setPage(page - 1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [page, onClose, total]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(30,26,20,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: "var(--warm-white)", borderRadius: 16, maxWidth: 900, width: "100%", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid var(--border)" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--earth)" }}>Brand Book</span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-light)" }}>{page + 1} / {total}</span>
            <button style={{ background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "var(--text-light)", padding: "4px 8px" }} onClick={onClose}>{"\u2715"}</button>
          </div>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "32px 40px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 400, color: "var(--earth)", marginBottom: 12 }}>{p.title}</h2>
          {p.subtitle && <p style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 16 }}>{p.subtitle}</p>}
          {p.text && <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "var(--text-mid)", maxWidth: 680 }}>{p.text}</p>}
          {p.items && <div style={{ marginTop: 16 }}>{p.items.map((item, i) => (<div key={i} style={{ padding: "14px 0", borderBottom: "1px solid var(--border)" }}><span style={{ fontWeight: 700, color: "var(--earth)" }}>{item.bold}</span><span style={{ color: "var(--text-mid)" }}> &mdash; {item.text}</span></div>))}</div>}
          {p.lines && <div style={{ marginTop: 20, textAlign: "center" }}>{p.lines.map((l, i) => (<p key={i} style={{ fontSize: "0.85rem", letterSpacing: "0.06em", color: "var(--text-mid)", padding: "6px 0", lineHeight: 1.6 }}>. . .{l}. . .</p>))}</div>}
          {p.voice && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 20 }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--earth)", marginBottom: 16 }}>Voice</h3>
                {p.voice.map((v, i) => (<div key={i} style={{ marginBottom: 14 }}><span style={{ fontWeight: 700, color: "var(--earth)" }}>{v.bold}:</span> <span style={{ color: "var(--text-mid)", fontSize: "0.85rem" }}>{v.text}</span></div>))}
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--earth)", marginBottom: 16 }}>Tone</h3>
                {p.tone.map((t, i) => (<div key={i} style={{ marginBottom: 14 }}><span style={{ fontWeight: 700, color: "var(--earth)" }}>{t.bold}:</span> <span style={{ color: "var(--text-mid)", fontSize: "0.85rem" }}>{t.text}</span></div>))}
                {p.toneNot && <div style={{ marginTop: 20, padding: 16, background: "rgba(139,58,58,0.04)", borderRadius: 8, border: "1px solid rgba(139,58,58,0.1)" }}><div style={{ fontWeight: 700, fontSize: "0.78rem", color: "#8B3A3A", marginBottom: 8 }}>Our voice and tone is not:</div>{p.toneNot.map((n, i) => <div key={i} style={{ fontSize: "0.78rem", color: "var(--text-mid)", padding: "3px 0" }}>{"\u2715"} {n}</div>)}</div>}
              </div>
            </div>
          )}
          {page === 0 && <div style={{ marginTop: 24, textAlign: "center" }}><img src={p.img} alt="Brand Book Cover" style={{ maxWidth: "100%", borderRadius: 8 }} /></div>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderTop: "1px solid var(--border)" }}>
          <button onClick={() => page > 0 && setPage(page - 1)} disabled={page === 0} className="bookNavBtn">{"\u2190"} Previous</button>
          <div style={{ display: "flex", gap: 4 }}>{BOOK_PAGES.map((_, i) => <span key={i} onClick={() => setPage(i)} style={{ width: 8, height: 8, borderRadius: "50%", background: i === page ? "var(--moss)" : "var(--border)", cursor: "pointer", transition: "0.2s" }} />)}</div>
          <button onClick={() => page < total - 1 && setPage(page + 1)} disabled={page === total - 1} className="bookNavBtn">Next {"\u2192"}</button>
        </div>
      </div>
    </div>
  );
}

function WaitlistForm() {
  const [form, setForm] = useState({ name: "", email: "", interest: "" });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="waitlistSuccess">
        <div style={{ fontSize: "2rem", marginBottom: 16 }}>{"\u2726"}</div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--earth)", marginBottom: 8 }}>Welcome to the Path</h3>
        <p style={{ color: "var(--text-light)", fontSize: "0.88rem" }}>We&apos;ll be in touch with next steps and exclusive access.</p>
      </div>
    );
  }

  return (
    <div className="waitlistForm">
      <div className="waitlistFields">
        <div className="waitlistField">
          <label>Full Name</label>
          <input type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="waitlistField">
          <label>Email</label>
          <input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="waitlistField">
          <label>I&apos;m Interested In</label>
          <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
            <option value="">Select one...</option>
            <option value="community">Community Membership</option>
            <option value="florida">Sebastian, FL &mdash; Lot Reservation</option>
            <option value="colombia">Colombia &mdash; Early Access</option>
            <option value="brand-invest">Brand / IP Investment</option>
            <option value="site-invest">Site-Specific Development</option>
            <option value="other">Other / General Inquiry</option>
          </select>
        </div>
      </div>
      <button className="ctaBtn" onClick={() => setSubmitted(true)}>Join the Waitlist {"\u2192"}</button>
      <p style={{ fontSize: "0.72rem", color: "var(--text-light)", marginTop: 16, textAlign: "center" }}>
        No commitment required. Deeper investment access requires NDA + qualified investor vetting.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  const [bookOpen, setBookOpen] = useState(false);
  const [gateUnlocked, setGateUnlocked] = useState(false);

  return (
    <>
      <Nav />
      {bookOpen && <BrandBookModal onClose={() => setBookOpen(false)} />}

      {/* ═══ HERO ═══ */}
      <section className="hero" id="hero">
        <div className="heroBg">
          <img src={`${IMG}/bioregional-hub.jpg`} alt="" />
        </div>
        <div className="heroContent">
          <p className="heroEyebrow">Future of Cities &bull; Investment &amp; Brand Deck &bull; 2025</p>
          <h1 className="heroTitle">CHOZEN</h1>
          <p className="heroSub">A Camp for the Humanity of the Future</p>
          <p className="heroTagline">Where Nature is the Ceremony</p>
          <div className="heroLine" />
          <p className="heroMission">
            Innovation. Transformation. Regeneration.
          </p>
          <div className="heroCtas">
            <a href="#story" className="heroBtn heroBtnPrimary">Explore the Deck</a>
            <a href="#waitlist" className="heroBtn heroBtnSecondary">Join the Waitlist</a>
          </div>
        </div>
        <div className="heroScrollIndicator"><span /></div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="sectionAlt" style={{ padding: 0 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "64px 32px" }}>
          <div className="testimonialGrid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonialCard">
                <div className="testimonialImg">
                  <img src={t.img} alt={t.name} />
                </div>
                <div className="testimonialQuote">&ldquo;{t.quote}&rdquo;</div>
                <div className="testimonialDivider" />
                <div className="testimonialName">{t.name}</div>
                <div className="testimonialRole">{t.role}</div>
                {t.detail && <div className="testimonialDetail">{t.detail}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 1. THE CHOZEN STORY ═══ */}
      <section className="section" id="story">
        <SectionHeader
          eyebrow="Regenerative Placemaking"
          title="The ChoZen Story"
          desc="At Future of Cities, we see development through a regenerative lens &mdash; where nature, community, and culture shape thriving, resilient places."
        />

        <FadeIn>
          <div className="storyGrid">
            <div className="storyCard storyCardMain">
              <div className="storyCardInner">
                <h3>Bioregional Hubs</h3>
                <p>
                  Our bioregional hubs apply ecosystems thinking to re-village real estate, weaving together
                  climate-conscious design, circular economies, and community-driven innovation.
                </p>
                <p style={{ marginTop: 16 }}>
                  By restoring ecological balance and fostering social and economic vitality, we are building
                  the cities of tomorrow &mdash; rooted in place, inspired by community, powered by nature.
                </p>
                <p style={{ marginTop: 16, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sage)" }}>
                  Local Roots, Global Impact.
                </p>
              </div>
            </div>
            <div className="storyCard">
              <div className="storyCardLabel">The Challenge</div>
              <h3>Nature in Crisis</h3>
              <p>Vanishing wetlands, declining species, water scarcity. Rising costs, gentrification, instability. Stress, isolation, lost traditions. ChoZen offers a holistic path forward &mdash; a bioregional approach restoring ecology, economy, and community.</p>
            </div>
            <div className="storyCard">
              <div className="storyCardLabel">The Solution</div>
              <h3>Revillaging</h3>
              <p>Optimizing for human connection. Close-knit communities of 50&ndash;150 people striking the perfect balance: large enough for diverse skills, small enough for deep relationships and shared purpose.</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="statsRow">
            {STATS.map((s, i) => (
              <div key={i} className="statCard">
                <div className="statNumber">{s.number}</div>
                <div className="statLabel">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ═══ 2. BRAND & OFFERINGS ═══ */}
      <section className="sectionAlt" id="brand">
        <div className="sectionInner">
          <SectionHeader
            eyebrow="Brand & IP"
            title="A Lifestyle Brand for Regenerative Living"
            desc="Nature is medicine. Food is medicine. Community is medicine."
          />

          <FadeIn>
            <div className="pillarGrid">
              {PILLARS.map((p, i) => (
                <div key={i} className="pillarGridCard">
                  <div className="pillarGridImg">
                    <img src={p.img} alt={p.title} />
                  </div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ marginTop: 64 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "var(--earth)", textAlign: "center", marginBottom: 12 }}>
                ChoZen Expansion
              </h3>
              <div className="divider" />
              <p style={{ fontSize: "0.88rem", color: "var(--text-light)", textAlign: "center", maxWidth: 600, margin: "0 auto 40px" }}>
                Transforming living with integrated wellness, sustainable retreats, and community-centered design.
              </p>
              <div className="offersGrid">
                {BRAND_OFFERS.map((o, i) => (
                  <div key={i} className="offerCard">
                    <div className="offerImg">
                      <img src={o.img} alt={o.title} />
                    </div>
                    <h4>{o.title}</h4>
                    <p>{o.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* We Are / We Are Not */}
          <FadeIn delay={0.15}>
            <div style={{ marginTop: 80 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "var(--earth)", textAlign: "center", marginBottom: 12 }}>
                We Are vs. We Are Not
              </h3>
              <div className="divider" />
              <div className="brandPillarsGrid">
                {PILLARS_BRAND.map((p, i) => (
                  <div key={i} className="brandPillarCard">
                    <div className="bpHeader">
                      <span className="bpIcon">{p.icon}</span>
                      <span className="bpTitle">{p.title}</span>
                    </div>
                    <div className="bpBody">
                      <div className="bpCol bpYes">
                        <div className="bpColLabel">{"\u2713"} We Are</div>
                        <p>{p.yes}</p>
                      </div>
                      <div className="bpCol bpNo">
                        <div className="bpColLabel">{"\u2715"} We Are Not</div>
                        <p>{p.no}</p>
                      </div>
                    </div>
                    {p.tags.length > 0 && (
                      <div className="bpTags">
                        {p.tags.map((t) => <span key={t} className="bpTag">{t}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="brandBookCta">
              <button onClick={() => setBookOpen(true)} className="ctaBtn">
                Explore Full Brand Book {"\u2192"}
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 3. FLORIDA — CURRENT LOCATION ═══ */}
      <section className="section" id="florida">
        <SectionHeader
          eyebrow="Sebastian, Florida"
          title="Nested in Nature: A Sanctuary for Renewal"
          desc="Set amidst the lush, subtropical beauty of the 22,000-acre St. Sebastian River Preserve, within North America&apos;s most biodiverse lagoon system."
        />

        <FadeIn>
          <div className="floridaGrid">
            {FLORIDA_FEATURES.map((f, i) => (
              <div key={i} className="floridaCard">
                <div className="floridaCardImg">
                  <img src={f.img} alt={f.label} />
                </div>
                <div className="floridaCardNum">{String(i + 1).padStart(2, "0")}</div>
                <h4>{f.label}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Amenities Photo Grid */}
        <FadeIn delay={0.1}>
          <div className="amenitiesGrid">
            {[
              { img: `${IMG}/outdoor-wellness.jpg`, label: "Outdoor Wellness" },
              { img: `${IMG}/outdoor-fitness.jpg`, label: "Outdoor Fitness" },
              { img: `${IMG}/gathering-spaces.jpg`, label: "Gathering Spaces" },
              { img: `${IMG}/community-gardens.jpg`, label: "Community Gardens" },
              { img: `${IMG}/community-firepit.jpg`, label: "Community Fire Pit" },
              { img: `${IMG}/natural-pool.jpg`, label: "Natural Pool" },
              { img: `${IMG}/temple-to-nature.jpg`, label: "Temple to Nature" },
              { img: `${IMG}/permaculture-hub.jpg`, label: "Permaculture Hub" },
              { img: `${IMG}/luxury-glamping.jpg`, label: "Luxury Glamping" },
              { img: `${IMG}/immersive-art.jpg`, label: "Immersive Art" },
            ].map((a, i) => (
              <div key={i} className="amenityItem">
                <img src={a.img} alt={a.label} />
                <span>{a.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* CCRL Mission */}
        <FadeIn delay={0.15}>
          <div className="offerCallout" style={{ marginTop: 40 }}>
            <div className="offerCalloutInner">
              <div className="offerCalloutLabel">ChoZen Center for Regenerative Living</div>
              <h3>Our Mission</h3>
              <p>
                Regenerate land and biodiversity. Revitalize local economies.
                Elevate human well-being. Advance wildlife conservation through
                strategic partnerships like Wildpath and Path of the Panther.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══ 4. FUTURE LOCATIONS ═══ */}
      <section className="sectionAlt" id="locations">
        <div className="sectionInner">
          <SectionHeader
            eyebrow="Global Pipeline"
            title="Future Growth"
            desc="Expanding regenerative hubs, each shaped by its land, culture, and people."
          />

          <FadeIn>
            <div className="locationsGrid">
              {FUTURE_LOCATIONS.map((loc, i) => (
                <div key={i} className="locationCard">
                  <div className="locationStatus">{loc.status}</div>
                  <h3 className="locationCity">{loc.city}</h3>
                  <div className="locationCountry">{loc.country}</div>
                  <p className="locationDesc">{loc.desc}</p>
                  <div className="locationFeatures">
                    {loc.features.map((f) => <span key={f} className="locationFeature">{f}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 5. MARKET OPPORTUNITY ═══ */}
      <section className="section" id="market">
        <SectionHeader
          eyebrow="Market Opportunity"
          title="Rising Demand for Well-Being"
          desc="The global wellness real estate market is booming &mdash; ChoZen sits at the intersection of every major growth trend."
        />

        <FadeIn>
          <div className="marketGrid">
            {MARKET_DATA.map((m, i) => (
              <div key={i} className="marketCard">
                <div className="marketValue">{m.value}</div>
                <div className="marketLabel">{m.label}</div>
                <div className="marketSub">{m.sub}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <p style={{ fontSize: "0.68rem", color: "var(--text-light)", letterSpacing: "0.05em" }}>
              Source: Facts and Factors, Global Wellness Institute, Blue Zones
            </p>
          </div>
        </FadeIn>

        {/* Partnerships */}
        <FadeIn delay={0.15}>
          <div style={{ marginTop: 64 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--earth)", textAlign: "center", marginBottom: 28 }}>
              Partnerships
            </h3>
            <div className="partnersGrid">
              {PARTNERSHIPS.map((p, i) => (
                <div key={i} className="partnerCard">
                  {p.img ? <img src={p.img} alt={p.name} className="partnerLogo" /> : <span>{p.name}</span>}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══ 6. INVESTMENT OPPORTUNITIES ═══ */}
      <section className="sectionDark" id="invest">
        <div className="sectionInner">
          <div className="sectionHeader">
            <p className="sectionEyebrow" style={{ color: "var(--sage)" }}>Investment</p>
            <h2 className="sectionTitle" style={{ color: "var(--cream)" }}>Investment Opportunities</h2>
            <div className="divider" style={{ background: "var(--gold)" }} />
            <p className="sectionDesc" style={{ color: "var(--sand)" }}>
              Two distinct layers of participation &mdash; invest at the brand level, the site level, or both.
            </p>
          </div>

          <FadeIn>
            <div className="investGrid">
              {INVESTMENT_LAYERS.map((inv, i) => (
                <div key={i} className="investCard">
                  <div className="investLayer" style={{ color: inv.color }}>{inv.layer}</div>
                  <h3 className="investTitle">{inv.title}</h3>
                  <div className="investSub">{inv.subtitle}</div>
                  <p className="investDesc">{inv.desc}</p>
                  <div className="investItems">
                    {inv.items.map((item, j) => (
                      <div key={j} className="investItem">
                        <span className="investDot" style={{ background: inv.color }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Financials Summary */}
          <FadeIn delay={0.1}>
            <div className="investGrid" style={{ marginTop: 24 }}>
              {[FINANCIALS.village, FINANCIALS.hospitality].map((fin, i) => (
                <div key={i} className="investCard">
                  <h3 className="investTitle" style={{ marginBottom: 20 }}>{fin.title}</h3>
                  {fin.rows.map((row, j) => (
                    <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(200,185,154,0.1)" }}>
                      <span style={{ fontSize: "0.82rem", color: "var(--sand)" }}>{row.label}</span>
                      <span style={{ fontSize: "0.88rem", fontWeight: row.highlight ? 700 : 500, color: row.highlight ? "var(--sage)" : "var(--cream)", fontFamily: row.highlight ? "var(--font-display)" : "inherit", letterSpacing: row.highlight ? "0.02em" : "0" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Gated Access */}
          <FadeIn delay={0.15}>
            <div className="gateNotice">
              <div className="gateIcon">{"\uD83D\uDD12"}</div>
              <h3>Deeper Access Requires Verification</h3>
              <p>Detailed investment memorandums, financial projections, and partnership structures are available to qualified investors after NDA execution and vetting.</p>
              <div className="gateTiers">
                <div className="gateTier">
                  <div className="gateTierLabel">Public Access</div>
                  <div className="gateTierDesc">Brand story, community highlights, waitlist signup</div>
                </div>
                <div className="gateTierDivider">{"\u2192"}</div>
                <div className="gateTier gateTierGated">
                  <div className="gateTierLabel">Gated Access</div>
                  <div className="gateTierDesc">Location details, investment memo, partnership structures (NDA required)</div>
                </div>
              </div>
              {!gateUnlocked ? (
                <button className="ctaBtnAlt" onClick={() => setGateUnlocked(true)}>
                  Request Gated Access {"\u2192"}
                </button>
              ) : (
                <div className="gateUnlocked">
                  <p>Thank you for your interest. Our team will reach out to begin the vetting process and provide NDA documentation.</p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 7. TEAM ═══ */}
      <section className="section" id="team">
        <SectionHeader
          eyebrow="Leadership"
          title="About the Cofounders"
        />

        <FadeIn>
          <div className="teamGrid">
            {COFOUNDERS.map((c, i) => (
              <div key={i} className="teamCard">
                <div className="teamImgWrap">
                  <img src={c.img} alt={c.name} className="teamImg" />
                </div>
                <h3 className="teamName">{c.name}</h3>
                <p className="teamBio">{c.bio}</p>
                <div className="teamOrgs">
                  {c.orgs.map((o) => <span key={o} className="teamOrg">{o}</span>)}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ═══ 8. CTA / WAITLIST ═══ */}
      <section className="sectionAlt" id="waitlist">
        <div className="sectionInner">
          <SectionHeader
            eyebrow="Get Involved"
            title="Join the ChoZen Path"
            desc="Whether you&apos;re a future resident, community member, or investor &mdash; your journey starts here."
          />

          <FadeIn>
            <WaitlistForm />
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="ctaCards">
              <div className="ctaCard">
                <h4>Community Waitlist</h4>
                <p>Sign up to join the membership community and receive updates on events, retreats, and programming.</p>
              </div>
              <div className="ctaCard">
                <h4>Lot Reservations</h4>
                <p>Inquire about 55 exclusive homes, cottages, and tree houses in Sebastian, FL ($700K&ndash;$6M+).</p>
              </div>
              <div className="ctaCard">
                <h4>Investment Inquiry</h4>
                <p>$139M projected home sales. $9.1M ARR. $50M estimated exit. NDA required for full details.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="footerLogo">CHOZEN</div>
        <p style={{ marginBottom: 4 }}>Center for Regenerative Living &bull; Future of Cities</p>
        <p>Investment &amp; Brand Deck &mdash; 2025</p>
        <p style={{ marginTop: 16, fontSize: "0.62rem", opacity: 0.35 }}>
          This material is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities.
        </p>
      </footer>
    </>
  );
}
