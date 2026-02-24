"use client";
import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// DATA — DECK CONTENT
// ═══════════════════════════════════════════════════════════════

const STATS = [
  { number: "11+", label: "Years in Florida" },
  { number: "1000s", label: "Community Members Served" },
  { number: "6", label: "Brand Verticals" },
  { number: "3+", label: "Locations in Pipeline" },
];

const COMMUNITY_HIGHLIGHTS = [
  {
    name: "Dan Buettner",
    role: "Blue Zones Founder",
    detail: "Keynote speaker and collaborator on longevity research",
  },
  {
    name: "Mapu",
    role: "Indigenous Leader",
    detail: "Ancestral wisdom and sacred ceremonies",
  },
  {
    name: "Himena",
    role: "Indigenous Leader",
    detail: "Plant medicine and traditional healing knowledge",
  },
];

const PILLARS = [
  {
    icon: "\u{1F33F}",
    title: "Wellness",
    desc: "Holistic wellbeing through nature-based rhythms, thermal therapy, and regenerative healing modalities",
  },
  {
    icon: "\u{1F33E}",
    title: "Agriculture",
    desc: "Regenerative onsite farming, food as medicine, and syntropic agroforestry systems",
  },
  {
    icon: "\u{1F3DB}",
    title: "Hospitality",
    desc: "Branded retreats, hotels, and short-term rentals rooted in conscious community",
  },
  {
    icon: "\u{1F30E}",
    title: "Nature",
    desc: "Conservation, rewilding, and deep immersion in untamed land and wildlife corridors",
  },
  {
    icon: "\u{1F525}",
    title: "Ancestral Wisdom",
    desc: "Honoring indigenous knowledge, sacred practices, and the guidance of those who walked before us",
  },
  {
    icon: "\u{1F91D}",
    title: "Community",
    desc: "A curated network of culture makers, changemakers, and regenerative builders worldwide",
  },
];

const BRAND_OFFERS = [
  {
    title: "Membership Community",
    desc: "An exclusive network of like-minded builders, wellness seekers, and culture makers. Tiered access to events, content, and location benefits.",
    icon: "\u25C8",
  },
  {
    title: "Online Content",
    desc: "Digital platform featuring regenerative living education, practitioner access, wellness programming, and community forums.",
    icon: "\u25C7",
  },
  {
    title: "Summits & Seminars",
    desc: "Curated gatherings worldwide \u2014 from intimate retreats to large-scale regenerative summits with global thought leaders.",
    icon: "\u25B3",
  },
  {
    title: "Special Events",
    desc: "Seasonal celebrations, equinox ceremonies, wellness gatherings, artist residencies, and community rituals.",
    icon: "\u25CB",
  },
];

const FLORIDA_FEATURES = [
  {
    label: "ChoZen Village",
    desc: "A regenerative neighborhood with branded residences, shared agricultural land, and communal wellness spaces",
  },
  {
    label: "Retreat Center",
    desc: "Immersive wellness retreats featuring breathwork, meditation, plant-based cuisine, and nature excursions",
  },
  {
    label: "Regenerative Farm",
    desc: "Onsite organic agriculture \u2014 syntropic farming, permaculture, and native biodiversity",
  },
  {
    label: "CCRL Nonprofit",
    desc: "ChoZen Center for Regenerative Living \u2014 education, scholarships, and conservation programs",
  },
  {
    label: "Blue Zones Connection",
    desc: "Aligned with Blue Zones longevity principles \u2014 community, movement, purpose, and whole food access",
  },
  {
    label: "Events & Programming",
    desc: "11+ years of community events \u2014 thousands served across wellness, culture, and regenerative education",
  },
];

const FUTURE_LOCATIONS = [
  {
    city: "Medell\u00EDn",
    country: "Colombia",
    status: "Active Development",
    desc: "Branded residential + agricultural naturehood. Cross-pollination of locals and internationals, ancestral wisdom, plant medicine (where legal), and a maker\u2019s/artist village concept.",
    features: [
      "Branded Residences",
      "Agricultural Naturehood",
      "Artist Village",
      "Ancestral Wisdom Center",
    ],
  },
  {
    city: "Florian\u00F3polis",
    country: "Brazil",
    status: "Pipeline",
    desc: "Coastal regenerative community with world-class surf culture, wellness tourism, and conservation-first development.",
    features: ["Coastal Living", "Wellness Tourism", "Conservation"],
  },
  {
    city: "Portugal",
    country: "Europe",
    status: "Pipeline",
    desc: "European gateway for the ChoZen brand \u2014 agrarian heritage, wellness culture, and regenerative agriculture in the Mediterranean climate.",
    features: ["European Hub", "Agri-Tourism", "Regenerative Agriculture"],
  },
  {
    city: "Atlanta",
    country: "USA",
    status: "Pipeline",
    desc: "Urban regenerative placemaking in one of America\u2019s fastest-growing cultural capitals.",
    features: ["Urban Regeneration", "Cultural Hub", "Community Building"],
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
    desc: "Invest in specific locations \u2014 lot and home acquisition, joint venture partnership opportunities. Florida first, then Colombia and beyond.",
    items: [
      "Lot / home acquisition",
      "JV partnership per site",
      "Florida (active)",
      "Colombia (in development)",
      "Future pipeline locations",
    ],
    color: "#3A6B7E",
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
    title: "Every Day Whole Food Access",
    yes: "Nutritious, whole meals from locally sourced, regenerative ingredients.",
    no: "No global corporate food distributors. No factory-farmed proteins.",
    tags: ["Curated Grocer", "Local Retailers", "Low Waste", "Caf\u00E9"],
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
    title: "Regenerative Design",
    yes: "Regenerative Placemaking standards. High-performance building systems, renewable energy, sustainable materials.",
    no: "No low-performance systems, harmful materials, or depleting practices.",
    tags: ["Biophilia", "Local Materials", "Net Zero", "Water Quality"],
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
  {
    img: "/brand/cover.jpg",
    title: "Brand Book 2025",
  },
  {
    img: "/brand/vision.jpg",
    title: "Our Shared Vision",
    subtitle: "Rewilding Hearts & Minds in the Heart of Florida",
    text: "We gather thought leaders, changemakers, community builders and placemakers from around the world who seek to explore regenerative systems and implement climate solutions. By reconnecting with the land and fully immersing our guests in a regenerative lifestyle, we provide a unique culture and vibrant environment to inspire positive change & transformation for future generations.",
  },
  {
    img: "/brand/principles.jpg",
    title: "Principles of the Chozen Path",
    items: [
      {
        bold: "Reunite with your Inner Self",
        text: "Develop a conscious awareness of your mind, body, emotions and senses",
      },
      {
        bold: "Reconnect with Nature",
        text: "Live in acknowledgment that we are not above or separate from Nature, but part of its larger ecosystem of all life on this planet",
      },
      {
        bold: "Honor the Sacred",
        text: "Follow the guidance of all life forms, as well as our ancestors to honor their spirit and connect with their wisdom",
      },
      {
        bold: "Assemble with Community",
        text: "Gather with thought leaders, changemakers and community builders focused on raising consciousness to harness our collective momentum",
      },
      {
        bold: "Embrace Regenerative Systems",
        text: "Act in accordance with our shared ethos for a sustainable future by helping to co-create regenerative systems for a climate positive world",
      },
      {
        bold: "Empower the Future",
        text: "Actively participate in the co-creation of our future to restore humanity and our planet\u2019s health",
      },
    ],
  },
  {
    img: "/brand/mission.jpg",
    title: "Our Mission",
    subtitle: "Nature is Medicine. Food is Medicine. Community is Medicine.",
    text: "Our mission is to inspire action to protect mother nature and all of her inhabitants. Through immersive & educational experiences, adventures & excursions we are transforming the way we retreat. We co-create, coexist and come together to celebrate and restore ecological balance while preserving wildlife and our natural environment.",
  },
  {
    img: "/brand/ethos1.jpg",
    title: "Ethos",
    lines: [
      "CHOZEN is a place to discover yourself in nature",
      "A place to experience deep serenity by living in harmony with the natural ecosystem",
      "Where we honor mother earth and the elements",
      "Create in dialogue with our planet",
      "Integrate in nature and experience deep, restorative wellness",
      "Reconnect with the cosmos: the stars, the moon, the sun, the sky",
      "Take action to protect humanity\u2019s future",
      "Commune with wildlife",
      "Give thanks to those who walked before us",
      "Walk the Chozen Path",
    ],
  },
  {
    img: "/brand/ethos2.jpg",
    title: "Ethos \u2014 Nature + Zen",
    venn: true,
  },
  {
    img: "/brand/symbols.jpg",
    title: "Chozen Symbols",
    symbols: [
      { svgId: "chozen", name: "CHOZEN", meaning: "The complete mark" },
      { svgId: "water", name: "Water / River", meaning: "Source of Life" },
      { svgId: "unity", name: "Unity / Wholeness", meaning: "Infinity" },
      {
        svgId: "divine",
        name: "Divine Feminine",
        meaning: "Divine Mother\nMother Nature",
      },
      {
        svgId: "balance",
        name: "Balance",
        meaning: "So Above & So Below\nTime is Now\nEarth & Sky",
      },
      { svgId: "activism", name: "Activism", meaning: "Action\nChoice" },
    ],
  },
  {
    img: "/brand/logo-explain.jpg",
    title: "Logo Explanation",
    text: "The ChoZen logo represents the unity of humanity and the planet, the marriage of the divine feminine and masculine, the balance of Yin and Yang, the duality of our two brain hemispheres, and the polarity of the Earth and Skies. An hourglass lives within the logo, a reminder of the preciousness of time and the urgency to restore harmony on Earth. The centerline represents the vitality of water, a constant, flowing force that is the source of all life.",
  },
  {
    img: "/brand/logo-decon.jpg",
    title: "Logo Deconstruction",
  },
  {
    img: "/brand/voice-tone.jpg",
    title: "Voice & Tone",
    voice: [
      {
        bold: "Empowered",
        text: "We use positive words that are aspirational and inspired to embody our passionate ethos",
      },
      {
        bold: "Balance of Feminine + Masculine",
        text: "We play between soft and direct language to show the equal balance of our poetic yet affirmative voice",
      },
      {
        bold: "Sacred & Soulful",
        text: "We use language that ignites awakening, self-expression and transformation",
      },
      {
        bold: "Active",
        text: "We speak in the active voice in statements pertaining to activism and action",
      },
      {
        bold: "Authentic",
        text: "We value honesty and transparency in conveying our message",
      },
      {
        bold: "Natural",
        text: "We educate on the human-nature connection through language that is poetic yet scientific",
      },
    ],
    tone: [
      {
        bold: "Warm",
        text: "We write like we would to a friend to make them feel welcomed in an intimate, safe environment",
      },
      {
        bold: "Soft",
        text: "We use a soft tone in collateral that takes the form of poetry to transport our readers and guests",
      },
      {
        bold: "Socially Aware",
        text: "We ensure that our message is culturally aware and sensitive to all topics",
      },
    ],
    toneNot: [
      "Dogmatic or overly spiritual",
      "Too technical",
      "Too formal",
      "Negative or corporate",
      "Self-helpy",
    ],
  },
  {
    img: "/brand/aesthetic.jpg",
    title: "Brand Aesthetic",
    subtitle: "A Camp for the Humanity of the Future Where Nature is the Ceremony",
    text: "The ChoZen visual identity is a sophisticated, intentional, organic and wild portfolio of the ChoZen Lifestyle. Designed to evoke the feeling of being ChoZen \u2014 immersed in beauty, nature, and conscious community.",
  },
];

// ═══════════════════════════════════════════════════════════════
// SVG SYMBOLS
// ═══════════════════════════════════════════════════════════════

function SymbolSVG({ id, size = 64 }) {
  const s = size;
  const c = s / 2;
  const r = s * 0.44;
  const stroke = "var(--earth)";
  const sw = 1.5;
  const common = {
    width: s,
    height: s,
    viewBox: `0 0 ${s} ${s}`,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  if (id === "chozen")
    return (
      <svg {...common}>
        <circle cx={c} cy={c} r={r} stroke={stroke} strokeWidth={sw} />
        <line x1={c - r * 0.71} y1={c - r * 0.71} x2={c + r * 0.71} y2={c + r * 0.71} stroke={stroke} strokeWidth={sw} />
        <line x1={c + r * 0.71} y1={c - r * 0.71} x2={c - r * 0.71} y2={c + r * 0.71} stroke={stroke} strokeWidth={sw} />
        <line x1={c - r} y1={c} x2={c + r} y2={c} stroke={stroke} strokeWidth={sw} />
        <path
          d={`M ${c - r * 0.7} ${c} Q ${c - r * 0.35} ${c - r * 0.22} ${c} ${c} Q ${c + r * 0.35} ${c + r * 0.22} ${c + r * 0.7} ${c}`}
          stroke={stroke}
          strokeWidth={sw}
        />
        <line x1={c - r * 0.71} y1={c + r * 0.71} x2={c} y2={c - r * 0.3} stroke={stroke} strokeWidth={sw * 0.6} strokeOpacity={0.4} />
        <line x1={c + r * 0.71} y1={c + r * 0.71} x2={c} y2={c - r * 0.3} stroke={stroke} strokeWidth={sw * 0.6} strokeOpacity={0.4} />
      </svg>
    );

  if (id === "water")
    return (
      <svg {...common}>
        <circle cx={c} cy={c} r={r} stroke={stroke} strokeWidth={sw} />
        <path
          d={`M ${c - r * 0.85} ${c} Q ${c - r * 0.42} ${c - r * 0.35} ${c} ${c} Q ${c + r * 0.42} ${c + r * 0.35} ${c + r * 0.85} ${c}`}
          stroke={stroke}
          strokeWidth={sw}
        />
      </svg>
    );

  if (id === "unity")
    return (
      <svg {...common}>
        <circle cx={c} cy={c} r={r} stroke={stroke} strokeWidth={sw} />
      </svg>
    );

  if (id === "divine")
    return (
      <svg {...common}>
        <circle cx={c} cy={c} r={r} stroke={stroke} strokeWidth={sw} />
        <line x1={c - r * 0.71} y1={c - r * 0.71} x2={c + r * 0.71} y2={c + r * 0.71} stroke={stroke} strokeWidth={sw} />
        <line x1={c + r * 0.71} y1={c - r * 0.71} x2={c - r * 0.71} y2={c + r * 0.71} stroke={stroke} strokeWidth={sw} />
        <circle cx={c} cy={c} r={r * 0.35} stroke={stroke} strokeWidth={sw * 0.8} />
      </svg>
    );

  if (id === "balance")
    return (
      <svg {...common}>
        <circle cx={c} cy={c} r={r} stroke={stroke} strokeWidth={sw} />
        <line x1={c - r * 0.71} y1={c - r * 0.71} x2={c + r * 0.71} y2={c + r * 0.71} stroke={stroke} strokeWidth={sw} />
        <line x1={c + r * 0.71} y1={c - r * 0.71} x2={c - r * 0.71} y2={c + r * 0.71} stroke={stroke} strokeWidth={sw} />
      </svg>
    );

  if (id === "activism")
    return (
      <svg {...common}>
        <polygon
          points={`${c - r * 0.6},${c - r * 0.65} ${c + r * 0.6},${c - r * 0.65} ${c},${c}`}
          stroke={stroke}
          strokeWidth={sw}
          fill="none"
        />
        <polygon
          points={`${c - r * 0.6},${c + r * 0.65} ${c + r * 0.6},${c + r * 0.65} ${c},${c}`}
          stroke={stroke}
          strokeWidth={sw}
          fill="none"
        />
      </svg>
    );

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
    { href: "#offerings", label: "Offerings" },
    { href: "#florida", label: "Florida" },
    { href: "#locations", label: "Locations" },
    { href: "#invest", label: "Invest" },
  ];

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="navInner">
        <a href="#" className="navLogo">
          CHOZEN
        </a>
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
        <button
          className="navToggle"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
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
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
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

// ── Brand Book Modal ──

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
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [page, onClose, total]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(30,26,20,0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--warm-white)",
          borderRadius: 16,
          maxWidth: 900,
          width: "100%",
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              color: "var(--earth)",
            }}
          >
            Brand Book
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-light)" }}>
              {page + 1} / {total}
            </span>
            <button
              style={{
                background: "none",
                border: "none",
                fontSize: "1.4rem",
                cursor: "pointer",
                color: "var(--text-light)",
                padding: "4px 8px",
              }}
              onClick={onClose}
            >
              {"\u2715"}
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflow: "auto", padding: "32px 40px" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 400,
              color: "var(--earth)",
              marginBottom: p.subtitle || p.text ? 12 : 0,
            }}
          >
            {p.title}
          </h2>

          {p.subtitle && (
            <p
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-light)",
                marginBottom: 16,
              }}
            >
              {p.subtitle}
            </p>
          )}

          {p.text && (
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.75,
                color: "var(--text-mid)",
                maxWidth: 680,
              }}
            >
              {p.text}
            </p>
          )}

          {p.items && (
            <div style={{ marginTop: 16 }}>
              {p.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "14px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontWeight: 700, color: "var(--earth)" }}>
                    {item.bold}
                  </span>
                  <span style={{ color: "var(--text-mid)" }}>
                    {" "}
                    &mdash; {item.text}
                  </span>
                </div>
              ))}
            </div>
          )}

          {p.lines && (
            <div style={{ marginTop: 20, textAlign: "center" }}>
              {p.lines.map((l, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "0.85rem",
                    letterSpacing: "0.06em",
                    color: "var(--text-mid)",
                    padding: "6px 0",
                    lineHeight: 1.6,
                  }}
                >
                  . . .{l}. . .
                </p>
              ))}
            </div>
          )}

          {p.venn && (
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <img
                src={p.img}
                alt={p.title}
                style={{ maxWidth: "100%", borderRadius: 8 }}
              />
            </div>
          )}

          {p.symbols && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: 16,
                marginTop: 20,
              }}
            >
              {p.symbols.map((s, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    padding: "20px 12px",
                    background: "var(--cream)",
                    borderRadius: 8,
                  }}
                >
                  <div
                    style={{
                      marginBottom: 12,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <SymbolSVG id={s.svgId} size={56} />
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      color: "var(--earth)",
                      marginBottom: 6,
                    }}
                  >
                    {s.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: "var(--text-light)",
                      lineHeight: 1.5,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {s.meaning}
                  </div>
                </div>
              ))}
            </div>
          )}

          {p.voice && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
                marginTop: 20,
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    color: "var(--earth)",
                    marginBottom: 16,
                  }}
                >
                  Voice
                </h3>
                {p.voice.map((v, i) => (
                  <div key={i} style={{ marginBottom: 14 }}>
                    <span style={{ fontWeight: 700, color: "var(--earth)" }}>
                      {v.bold}:
                    </span>{" "}
                    <span
                      style={{ color: "var(--text-mid)", fontSize: "0.85rem" }}
                    >
                      {v.text}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    color: "var(--earth)",
                    marginBottom: 16,
                  }}
                >
                  Tone
                </h3>
                {p.tone.map((t, i) => (
                  <div key={i} style={{ marginBottom: 14 }}>
                    <span style={{ fontWeight: 700, color: "var(--earth)" }}>
                      {t.bold}:
                    </span>{" "}
                    <span
                      style={{ color: "var(--text-mid)", fontSize: "0.85rem" }}
                    >
                      {t.text}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 20,
                    padding: 16,
                    background: "rgba(139,58,58,0.04)",
                    borderRadius: 8,
                    border: "1px solid rgba(139,58,58,0.1)",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      color: "#8B3A3A",
                      marginBottom: 8,
                    }}
                  >
                    Our voice and tone is not:
                  </div>
                  {p.toneNot.map((n, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--text-mid)",
                        padding: "3px 0",
                      }}
                    >
                      {"\u2715"} {n}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Fallback image pages */}
          {!p.text &&
            !p.items &&
            !p.lines &&
            !p.venn &&
            !p.symbols &&
            !p.voice &&
            page !== 0 && (
              <div style={{ marginTop: 16 }}>
                <img
                  src={p.img}
                  alt={p.title}
                  style={{ maxWidth: "100%", borderRadius: 8 }}
                />
              </div>
            )}

          {page === 0 && (
            <div style={{ marginTop: 24, textAlign: "center" }}>
              <img
                src={p.img}
                alt="Brand Book Cover"
                style={{ maxWidth: "100%", borderRadius: 8 }}
              />
            </div>
          )}
        </div>

        {/* Footer Nav */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <button
            onClick={() => page > 0 && setPage(page - 1)}
            disabled={page === 0}
            className="bookNavBtn"
          >
            {"\u2190"} Previous
          </button>
          <div style={{ display: "flex", gap: 4 }}>
            {BOOK_PAGES.map((_, i) => (
              <span
                key={i}
                onClick={() => setPage(i)}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: i === page ? "var(--moss)" : "var(--border)",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
              />
            ))}
          </div>
          <button
            onClick={() => page < total - 1 && setPage(page + 1)}
            disabled={page === total - 1}
            className="bookNavBtn"
          >
            Next {"\u2192"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Waitlist Form ──

function WaitlistForm() {
  const [form, setForm] = useState({ name: "", email: "", interest: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="waitlistSuccess">
        <div style={{ fontSize: "2rem", marginBottom: 16 }}>{"\u2726"}</div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.6rem",
            color: "var(--earth)",
            marginBottom: 8,
          }}
        >
          Welcome to the Path
        </h3>
        <p style={{ color: "var(--text-light)", fontSize: "0.88rem" }}>
          We&apos;ll be in touch with next steps and exclusive access.
        </p>
      </div>
    );
  }

  return (
    <div className="waitlistForm">
      <div className="waitlistFields">
        <div className="waitlistField">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="waitlistField">
          <label>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="waitlistField">
          <label>I&apos;m Interested In</label>
          <select
            value={form.interest}
            onChange={(e) => setForm({ ...form, interest: e.target.value })}
          >
            <option value="">Select one...</option>
            <option value="community">Community Membership</option>
            <option value="florida">Florida &mdash; Lot Reservation</option>
            <option value="colombia">Colombia &mdash; Early Access</option>
            <option value="brand-invest">Brand / IP Investment</option>
            <option value="site-invest">Site-Specific Investment</option>
            <option value="other">Other / General Inquiry</option>
          </select>
        </div>
      </div>
      <button className="ctaBtn" onClick={handleSubmit}>
        Join the Waitlist {"\u2192"}
      </button>
      <p
        style={{
          fontSize: "0.72rem",
          color: "var(--text-light)",
          marginTop: 16,
          textAlign: "center",
        }}
      >
        No commitment required. Deeper investment access requires NDA +
        qualified investor vetting.
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
        <div className="heroContent">
          <p className="heroEyebrow">Investment &amp; Brand Deck</p>
          <h1 className="heroTitle">CHOZEN</h1>
          <p className="heroSub">The Alternative to a Golf Community</p>
          <p className="heroTagline">
            A regenerative living brand built on 11+ years of community,
            <br />
            wellness, nature, and ancestral wisdom.
          </p>
          <div className="heroLine" />
          <div className="heroCtas">
            <a href="#story" className="heroBtn heroBtnPrimary">
              Explore the Deck
            </a>
            <a href="#waitlist" className="heroBtn heroBtnSecondary">
              Join the Waitlist
            </a>
          </div>
        </div>
        <div className="heroScrollIndicator">
          <span />
        </div>
      </section>

      {/* ═══ 1. THE CHOZEN STORY ═══ */}
      <section className="section" id="story">
        <SectionHeader
          eyebrow="Origin"
          title="The ChoZen Story"
          desc="Born in Florida over 11 years ago, ChoZen evolved from a community gathering into a regenerative wellness, hospitality, and nature brand &mdash; building bridges, not walls."
        />

        <FadeIn>
          <div className="storyGrid">
            <div className="storyCard storyCardMain">
              <div className="storyCardInner">
                <h3>From Community to Brand</h3>
                <p>
                  What started as intimate gatherings around fire, food, and
                  shared intention grew into something much larger &mdash; a
                  movement. Over a decade of curated events, wellness
                  programming, and regenerative placemaking built a community of
                  thousands: culture makers, healers, builders, and visionaries
                  united by a common ethos.
                </p>
                <p style={{ marginTop: 16 }}>
                  ChoZen is now a licensable brand platform &mdash; packaging
                  regenerative design, ancestral wisdom, and conscious
                  hospitality into a framework that developers and investors can
                  bring to life in communities worldwide.
                </p>
              </div>
            </div>
            <div className="storyCard storyCardMission">
              <div className="storyCardLabel">Mission</div>
              <h3>Regenerative Placemaking</h3>
              <p>
                Building bridges, not walls. Creating spaces where nature is
                medicine, food is medicine, and community is medicine.
              </p>
            </div>
            <div className="storyCard storyCardBook">
              <div className="storyCardLabel">Framework</div>
              <h3>Generation Regeneration</h3>
              <p>
                The intellectual backbone &mdash; a book and framework outlining
                the principles of regenerative living, placemaking, and conscious
                development.
              </p>
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

        <FadeIn delay={0.2}>
          <div className="communitySection">
            <h3 className="commTitle">
              Notable Community &amp; Collaborators
            </h3>
            <div className="commGrid">
              {COMMUNITY_HIGHLIGHTS.map((c, i) => (
                <div key={i} className="commCard">
                  <div className="commName">{c.name}</div>
                  <div className="commRole">{c.role}</div>
                  <div className="commDetail">{c.detail}</div>
                </div>
              ))}
              <div className="commCard commCardMore">
                <div className="commName">+ Many More</div>
                <div className="commDetail">
                  Thought leaders, indigenous elders, wellness practitioners,
                  chefs, artists, and builders from around the world.
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══ 2. THE BRAND & IP ═══ */}
      <section className="sectionAlt" id="brand">
        <div className="sectionInner">
          <SectionHeader
            eyebrow="Brand & IP"
            title="A Lifestyle Brand for Regenerative Living"
            desc="ChoZen is more than a place &mdash; it&apos;s a wellness, hospitality, and nature brand with a built-in community of culture makers and changemakers."
          />

          <FadeIn>
            <div className="pillarGrid">
              {PILLARS.map((p, i) => (
                <div key={i} className="pillarGridCard">
                  <div className="pillarGridIcon">{p.icon}</div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* We Are / We Are Not */}
          <FadeIn delay={0.15}>
            <div style={{ marginTop: 80 }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  color: "var(--earth)",
                  textAlign: "center",
                  marginBottom: 12,
                }}
              >
                We Are vs. We Are Not
              </h3>
              <div className="divider" />
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-light)",
                  textAlign: "center",
                  maxWidth: 560,
                  margin: "0 auto 40px",
                }}
              >
                A clear declaration of what ChoZen stands for &mdash; and what
                it rejects.
              </p>
              <div className="brandPillarsGrid">
                {PILLARS_BRAND.map((p, i) => (
                  <div key={i} className="brandPillarCard">
                    <div className="bpHeader">
                      <span className="bpIcon">{p.icon}</span>
                      <span className="bpTitle">{p.title}</span>
                    </div>
                    <div className="bpBody">
                      <div className="bpCol bpYes">
                        <div className="bpColLabel">
                          {"\u2713"} We Are
                        </div>
                        <p>{p.yes}</p>
                      </div>
                      <div className="bpCol bpNo">
                        <div className="bpColLabel">
                          {"\u2715"} We Are Not
                        </div>
                        <p>{p.no}</p>
                      </div>
                    </div>
                    {p.tags.length > 0 && (
                      <div className="bpTags">
                        {p.tags.map((t) => (
                          <span key={t} className="bpTag">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="brandBookCta">
              <button
                onClick={() => setBookOpen(true)}
                className="ctaBtn"
              >
                Explore Full Brand Book {"\u2192"}
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 3. WHAT CHOZEN OFFERS ═══ */}
      <section className="section" id="offerings">
        <SectionHeader
          eyebrow="Brand IP"
          title="What ChoZen Offers"
          desc="An exclusive ecosystem of membership, content, events, and community &mdash; designed for culture makers who build, not just consume."
        />

        <FadeIn>
          <div className="offersGrid">
            {BRAND_OFFERS.map((o, i) => (
              <div key={i} className="offerCard">
                <div className="offerIcon">{o.icon}</div>
                <h4>{o.title}</h4>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="offerCallout">
            <div className="offerCalloutInner">
              <div className="offerCalloutLabel">The Network</div>
              <h3>An Exclusive Community of Builders</h3>
              <p>
                ChoZen members don&apos;t just attend &mdash; they build. A
                curated network of developers, wellness practitioners, chefs,
                artists, and thought leaders creating the future of regenerative
                living together.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══ 4. CURRENT LOCATION — FLORIDA ═══ */}
      <section className="sectionAlt" id="florida">
        <div className="sectionInner">
          <SectionHeader
            eyebrow="Current Location"
            title="ChoZen Village &mdash; Florida"
            desc="The flagship. Over a decade of community building, retreat programming, and regenerative farming in the heart of Florida&apos;s Wildlife Corridor."
          />

          <FadeIn>
            <div className="floridaGrid">
              {FLORIDA_FEATURES.map((f, i) => (
                <div key={i} className="floridaCard">
                  <div className="floridaCardNum">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h4>{f.label}</h4>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 5. FUTURE LOCATIONS ═══ */}
      <section className="section" id="locations">
        <SectionHeader
          eyebrow="Global Pipeline"
          title="Future Locations"
          desc="ChoZen is expanding &mdash; replicating the regenerative model in markets aligned with the brand&apos;s ethos of nature, community, and conscious living."
        />

        <FadeIn>
          <div className="locationsGrid">
            {FUTURE_LOCATIONS.map((loc, i) => (
              <div
                key={i}
                className={`locationCard ${i === 0 ? "locationCardFeatured" : ""}`}
              >
                <div className="locationStatus">{loc.status}</div>
                <h3 className="locationCity">{loc.city}</h3>
                <div className="locationCountry">{loc.country}</div>
                <p className="locationDesc">{loc.desc}</p>
                <div className="locationFeatures">
                  {loc.features.map((f) => (
                    <span key={f} className="locationFeature">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ═══ 6. INVESTMENT OPPORTUNITIES ═══ */}
      <section className="sectionDark" id="invest">
        <div className="sectionInner">
          <div className="sectionHeader">
            <p className="sectionEyebrow" style={{ color: "var(--sage)" }}>
              Investment
            </p>
            <h2 className="sectionTitle" style={{ color: "var(--cream)" }}>
              Investment Opportunities
            </h2>
            <div className="divider" style={{ background: "var(--gold)" }} />
            <p className="sectionDesc" style={{ color: "var(--sand)" }}>
              Two distinct layers of participation &mdash; invest at the brand
              level, the site level, or both.
            </p>
          </div>

          <FadeIn>
            <div className="investGrid">
              {INVESTMENT_LAYERS.map((inv, i) => (
                <div key={i} className="investCard">
                  <div
                    className="investLayer"
                    style={{ color: inv.color }}
                  >
                    {inv.layer}
                  </div>
                  <h3 className="investTitle">{inv.title}</h3>
                  <div className="investSub">{inv.subtitle}</div>
                  <p className="investDesc">{inv.desc}</p>
                  <div className="investItems">
                    {inv.items.map((item, j) => (
                      <div key={j} className="investItem">
                        <span
                          className="investDot"
                          style={{ background: inv.color }}
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Gated Access Notice */}
          <FadeIn delay={0.15}>
            <div className="gateNotice">
              <div className="gateIcon">{"\uD83D\uDD12"}</div>
              <h3>Deeper Access Requires Verification</h3>
              <p>
                Detailed investment memorandums, financial projections, and
                partnership structures are available to qualified investors after
                NDA execution and vetting.
              </p>
              <div className="gateTiers">
                <div className="gateTier">
                  <div className="gateTierLabel">Public Access</div>
                  <div className="gateTierDesc">
                    Brand story, community highlights, waitlist signup
                  </div>
                </div>
                <div className="gateTierDivider">{"\u2192"}</div>
                <div className="gateTier gateTierGated">
                  <div className="gateTierLabel">Gated Access</div>
                  <div className="gateTierDesc">
                    Location details, investment memo, partnership structures
                    (NDA required)
                  </div>
                </div>
              </div>
              {!gateUnlocked ? (
                <button
                  className="ctaBtnAlt"
                  onClick={() => setGateUnlocked(true)}
                >
                  Request Gated Access {"\u2192"}
                </button>
              ) : (
                <div className="gateUnlocked">
                  <p>
                    Thank you for your interest. Our team will reach out to
                    begin the vetting process and provide NDA documentation.
                  </p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 7. CALL TO ACTION / WAITLIST ═══ */}
      <section className="section" id="waitlist">
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
              <p>
                Sign up to join the membership community and receive updates on
                events, retreats, and programming.
              </p>
            </div>
            <div className="ctaCard">
              <h4>Lot Reservations</h4>
              <p>
                Inquire about lot and home reservations in current or future
                ChoZen locations.
              </p>
            </div>
            <div className="ctaCard">
              <h4>Investment Inquiry</h4>
              <p>
                Deeper investment access requires NDA execution and qualified
                investor vetting.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="footerLogo">CHOZEN</div>
        <p style={{ marginBottom: 4 }}>Center for Regenerative Living</p>
        <p>Investment &amp; Brand Deck &mdash; 2025</p>
        <p
          style={{
            marginTop: 16,
            fontSize: "0.62rem",
            opacity: 0.35,
          }}
        >
          This material is for informational purposes only and does not
          constitute an offer to sell or a solicitation of an offer to buy any
          securities.
        </p>
      </footer>
    </>
  );
}
