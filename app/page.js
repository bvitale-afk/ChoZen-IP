"use client";
import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// IMAGE BASE URL
// ═══════════════════════════════════════════════════════════════

const IMG = "https://zicvctuf51wytcty.public.blob.vercel-storage.com/images";

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

const STATS = [
  { number: "92", label: "Subtropical Acres" },
  { number: "55", label: "For-Sale Residences" },
  { number: "250", label: "Eco-Luxury Rooms" },
  { number: "4", label: "Global Locations" },
];

const TESTIMONIALS = [
  { quote: "ChoZen is a blueprint for a blue zone.", name: "Dan Buettner", role: "Creator of the Blue Zones Project", img: `${IMG}/dan-butner.jpg` },
  { quote: "ChoZen is a sanctuary for wellness and nature lovers.", name: "USA Today", role: "National Publication", img: `${IMG}/usa-today.jpg` },
  { quote: "ChoZen is the jewel in Florida\u2019s crown.", name: "Nat Kelly", role: "Actor & Environmental Activist", img: `${IMG}/nat-kelly.jpg` },
];

const PILLARS = [
  { title: "Wellness", desc: "Regenerative wellness spa, spring-fed mineral pools, thermal therapy, and individualized wellness retreats", img: `${IMG}/spa.jpg` },
  { title: "Agriculture", desc: "Regenerative onsite farming, food forests, edible landscapes, farm-to-table meals, and a farm store", img: `${IMG}/chozen-farm.jpg` },
  { title: "Hospitality", desc: "250 rooms of luxury ecoglamping, earth-to-table dining, and world-class regenerative experiences", img: `${IMG}/chozen-hospitality.jpg` },
  { title: "Nature", desc: "Set within the 22,000-acre St. Sebastian River Preserve \u2014 North America\u2019s most biodiverse lagoon system", img: `${IMG}/nature.jpg` },
  { title: "Ancestral Wisdom", desc: "Honoring indigenous knowledge, sacred practices, and the guidance of those who walked before us", img: `${IMG}/temple-to-nature.jpg` },
  { title: "Community", desc: "Optimizing for human connection through revillaging \u2014 close-knit communities of 50\u2013150 people", img: `${IMG}/community.jpg` },
];

const EXPANSION = [
  { title: "ChoZen Village", desc: "55 exclusive homes, cottages, and tree houses. Edible landscapes, food forests, farmlettes.", sub: "$139M Home Sales \u00b7 $700K\u2013$6M+", img: `${IMG}/chozen-village4.jpg` },
  { title: "ChoZen Retreats", desc: "250 rooms of luxury ecoglamping. Individualized wellness retreats and earth-to-table dining.", sub: "$60\u2013100K Yearly RevPAR \u00b7 $9.1M ARR", img: `${IMG}/chozen-retreats.jpg` },
  { title: "Wellness", desc: "Regenerative wellness spa, spring-fed mineral pools, temple to nature, makers village.", sub: "World-Class Amenities", img: `${IMG}/fire-pit.jpg` },
  { title: "ChoZen Farm", desc: "Farm-to-table meals, farm store, edible landscapes, agricultural neighborhoods, food forests.", sub: "Regenerative Agriculture", img: `${IMG}/chozen-farm.jpg` },
  { title: "Membership", desc: "55 exclusive homes with ChoZen Retreat Center access, programming, and member benefits.", sub: "Community Access", img: `${IMG}/chozen-village5.jpg` },
  { title: "ChoZen IP", desc: "Licensing opportunities for global expansion \u2014 brand, programming, workshops, and products.", sub: "Global Licensing", img: `${IMG}/biophilic-design.jpg` },
];

const AMENITIES = [
  { img: `${IMG}/outdoor-wellness.jpg`, label: "Outdoor Wellness" },
  { img: `${IMG}/outdoor-fitness.jpg`, label: "Outdoor Fitness" },
  { img: `${IMG}/gathering-spaces.jpg`, label: "Gathering Spaces" },
  { img: `${IMG}/community-gardens.jpg`, label: "Community Gardens" },
  { img: `${IMG}/community-firepit.jpg`, label: "Fire Pit" },
  { img: `${IMG}/natural-pool.jpg`, label: "Natural Pool" },
  { img: `${IMG}/temple-to-nature.jpg`, label: "Temple to Nature" },
  { img: `${IMG}/permaculture-hub.jpg`, label: "Permaculture" },
  { img: `${IMG}/luxury-glamping.jpg`, label: "Luxury Glamping" },
  { img: `${IMG}/immersive-art.jpg`, label: "Immersive Art" },
];

const FUTURE_LOCATIONS = [
  { city: "Orlando", country: "Florida, USA", desc: "Urban resilience and ecological restoration in a growing metropolis.", features: ["Urban Regeneration", "Metro Hub"] },
  { city: "Medell\u00EDn", country: "Colombia", desc: "Community-driven innovation in a city of transformation.", features: ["Branded Residences", "Artist Village", "Ancestral Wisdom"] },
  { city: "Azores", country: "Portugal", desc: "Island resilience through sustainable living and circular economies.", features: ["Golden Visa Fund", "Circular Economies"] },
  { city: "Bahia", country: "Brazil", desc: "Coastal regeneration and cultural preservation in rich biodiversity.", features: ["Coastal Regeneration", "Biodiversity"] },
];

const MARKET_DATA = [
  { label: "Global Wellness Real Estate", value: "$863.9B", sub: "20.70% CAGR by 2028" },
  { label: "Mental Wellness Market", value: "$87.1B", sub: "2022" },
  { label: "Wellness Tourism", value: "$255.9B", sub: "2022" },
  { label: "Anti-Aging Industry", value: "$83B", sub: "2024" },
];

const INVESTMENT_LAYERS = [
  {
    layer: "Layer 1", title: "Brand & IP Investment", subtitle: "GP-Level Stake in the ChoZen Platform",
    desc: "Invest at the brand level \u2014 gain exposure to licensing revenue, branding fees, development fees, content monetization, and the community platform across all locations.",
    items: ["Licensing & trademark revenue", "Branding fees across developments", "Development oversight fees", "Content & membership platform", "Community IP value"],
    color: "#4A5D23",
  },
  {
    layer: "Layer 2", title: "Site-Specific Development", subtitle: "JV Partnership per Location",
    desc: "Invest in specific locations \u2014 lot and home acquisition, joint venture partnership. Sebastian FL first, then global expansion.",
    items: ["$139M projected home sales", "$54.9M gross profit / 3.60x equity multiple", "$50M estimated hospitality exit value", "$9.1M ARR in 8 years", "Future pipeline locations"],
    color: "#3A6B7E",
  },
];

const FINANCIALS = {
  village: { title: "ChoZen Village", rows: [
    { label: "Home Sales Gross Revenue", value: "$139,260,000" },
    { label: "Net Revenue", value: "$125,334,000" },
    { label: "Total Development Costs", value: "$79,422,592" },
    { label: "Gross Profit", value: "$54,911,408", hl: true },
    { label: "Equity Multiple", value: "3.60x", hl: true },
  ]},
  hospitality: { title: "ChoZen Hospitality", rows: [
    { label: "Beds (2025\u20132032)", value: "36 \u2192 120" },
    { label: "Revenue Growth", value: "$2M \u2192 $10M" },
    { label: "Revenue Streams", value: "Retreats + Retail + Wellness + Membership" },
    { label: "Estimated Exit Value", value: "$50M", hl: true },
  ]},
};

const PARTNERSHIPS = [
  { name: "Blue Zones", img: `${IMG}/blue-zones.jpg` },
  { name: "Future of Cities", img: `${IMG}/future-of-cities-logo.jpg` },
  { name: "IDEAS For Us", img: `${IMG}/ideas-for-us-logo.jpg` },
  { name: "Chopra Foundation", img: null },
  { name: "Wildpath", img: `${IMG}/wildpath-logo.jpg` },
  { name: "Fleet Farming", img: `${IMG}/fleet-farming.jpg` },
];

const COFOUNDERS = [
  { name: "Tony Cho", img: `${IMG}/tony-cho.jpg`, bio: "A visionary leader in regenerative placemaking. CEO of Cho Ventures, founder of Metro1 Commercial, Future of Cities, and the PHX JAX Arts & Innovation District. Co-founder of ChoZen Eco-Retreat. Original placemaker of Wynwood and ULI Young Leader of the Year (2011).", orgs: ["Future of Cities", "Metro1", "PHX JAX"] },
  { name: "Ximena Cho", img: `${IMG}/ximena-cho.jpg`, bio: "Philanthropist and environmental advocate. Co-founder of Future of Cities and ChoZen Retreat. Established the Cho Family Foundation in 2020, supporting the Chopra Foundation, Amazon Watch, and Path of the Panther.", orgs: ["Future of Cities", "Cho Family Foundation"] },
];

const PILLARS_BRAND = [
  { title: "Regenerative Agriculture", yes: "Regenerative onsite agriculture rooted in native biodiversity. Food as medicine.", no: "No greenwashing, chemical fertilizers, or synthetic pesticides.", tags: ["Soil Health", "Permaculture", "Syntropic Farming"] },
  { title: "Holistic Wellbeing", yes: "Performance, longevity, and regenerative healing through advanced wellness.", no: "No superficial wellness tactics or unqualified practitioners.", tags: ["Thermal Therapy", "Longevity", "Nature-Based"] },
  { title: "Access to Untamed Land", yes: "Minimum five acres of natural environment. Direct nature access.", no: "Not in dense urban environments without meaningful nature.", tags: ["50% Conservation", "Microforests"] },
  { title: "Primal Interactions", yes: "Environments that reawaken the body\u2019s innate connection to nature.", no: "No staged activities, artificial props, or curated photo-ops.", tags: ["Rewilding", "Off-Grid", "Presence"] },
  { title: "Conscious Community", yes: "Seasonal events, wellness gatherings, meditation, breathwork, yoga.", no: "No transactional, impersonal programming.", tags: ["Tech-Free Spaces", "Shared Rituals"] },
  { title: "Biophilic Design", yes: "Bamboo architecture, local materials, high-performance building systems.", no: "No harmful materials or depleting practices.", tags: ["Biophilia", "Net Zero", "Bamboo"] },
];

// ── Brand Book ──
const BOOK_PAGES = [
  { title: "Brand Book 2025" },
  { title: "Our Shared Vision", subtitle: "Rewilding Hearts & Minds in the Heart of Florida", text: "We gather thought leaders, changemakers, community builders and placemakers from around the world who seek to explore regenerative systems and implement climate solutions." },
  { title: "Principles of the Chozen Path", items: [
    { bold: "Reunite with your Inner Self", text: "Develop a conscious awareness of your mind, body, emotions and senses" },
    { bold: "Reconnect with Nature", text: "Live in acknowledgment that we are not above or separate from Nature" },
    { bold: "Honor the Sacred", text: "Follow the guidance of all life forms and our ancestors" },
    { bold: "Assemble with Community", text: "Gather with thought leaders and community builders" },
    { bold: "Embrace Regenerative Systems", text: "Act in accordance with our shared ethos for a sustainable future" },
    { bold: "Empower the Future", text: "Actively participate in the co-creation of our future" },
  ]},
  { title: "Our Mission", subtitle: "Nature is Medicine. Food is Medicine. Community is Medicine.", text: "Our mission is to inspire action to protect mother nature and all of her inhabitants." },
  { title: "Ethos", lines: ["CHOZEN is a place to discover yourself in nature", "A place to experience deep serenity", "Where we honor mother earth and the elements", "Create in dialogue with our planet", "Take action to protect humanity\u2019s future", "Walk the Chozen Path"] },
];

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { href: "#story", label: "Story" },
    { href: "#brand", label: "Brand" },
    { href: "#florida", label: "Florida" },
    { href: "#locations", label: "Locations" },
    { href: "#invest", label: "Invest" },
    { href: "#team", label: "Team" },
    { href: "#waitlist", label: "Join" },
  ];
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="navInner">
        <a href="#" className="navLogo">
          <img src={`${IMG}/chozen-stamp.png`} alt="ChoZen" className="navStamp" />
          CHOZEN
        </a>
        <div className={`navLinks ${open ? "open" : ""}`}>
          {links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
        </div>
        <button className="navToggle" onClick={() => setOpen(!open)} aria-label="Menu"><span /><span /><span /></button>
      </div>
    </nav>
  );
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); }}, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.8s ${delay}s, transform 0.8s ${delay}s` }}>{children}</div>;
}

function PhotoBreak({ img, title, subtitle, height = "60vh", overlay = 0.45 }) {
  return (
    <div className="photoBreak" style={{ height }}>
      <img src={img} alt="" className="photoBreakImg" />
      <div className="photoBreakOverlay" style={{ background: `rgba(26,22,16,${overlay})` }} />
      {(title || subtitle) && (
        <div className="photoBreakContent">
          {subtitle && <p className="photoBreakSub">{subtitle}</p>}
          {title && <h2 className="photoBreakTitle">{title}</h2>}
        </div>
      )}
    </div>
  );
}

function BrandBookModal({ onClose }) {
  const [page, setPage] = useState(0);
  const p = BOOK_PAGES[page];
  const total = BOOK_PAGES.length;
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight" && page < total - 1) setPage(page + 1); if (e.key === "ArrowLeft" && page > 0) setPage(page - 1); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", fn); };
  }, [page, onClose, total]);
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={e => e.stopPropagation()}>
        <div className="modalHeader">
          <span>Brand Book</span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "0.7rem", opacity: 0.5 }}>{page + 1}/{total}</span>
            <button className="modalClose" onClick={onClose}>&times;</button>
          </div>
        </div>
        <div className="modalBody">
          <h2 className="modalTitle">{p.title}</h2>
          {p.subtitle && <p className="modalSub">{p.subtitle}</p>}
          {p.text && <p className="modalText">{p.text}</p>}
          {p.items && <div className="modalItems">{p.items.map((item, i) => <div key={i} className="modalItem"><strong>{item.bold}</strong> &mdash; {item.text}</div>)}</div>}
          {p.lines && <div className="modalLines">{p.lines.map((l, i) => <p key={i}>{l}</p>)}</div>}
        </div>
        <div className="modalFooter">
          <button disabled={page === 0} onClick={() => setPage(page - 1)} className="modalNav">&larr; Prev</button>
          <div className="modalDots">{BOOK_PAGES.map((_, i) => <span key={i} onClick={() => setPage(i)} className={`modalDot ${i === page ? "active" : ""}`} />)}</div>
          <button disabled={page === total - 1} onClick={() => setPage(page + 1)} className="modalNav">Next &rarr;</button>
        </div>
      </div>
    </div>
  );
}

function WaitlistForm() {
  const [form, setForm] = useState({ name: "", email: "", interest: "" });
  const [done, setDone] = useState(false);
  if (done) return (
    <div className="waitlistDone">
      <h3>Welcome to the Path</h3>
      <p>We&apos;ll be in touch with next steps and exclusive access.</p>
    </div>
  );
  return (
    <div className="waitlistForm">
      <div className="wfField"><label>Full Name</label><input type="text" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
      <div className="wfField"><label>Email</label><input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
      <div className="wfField"><label>I&apos;m Interested In</label>
        <select value={form.interest} onChange={e => setForm({...form, interest: e.target.value})}>
          <option value="">Select one...</option>
          <option value="community">Community Membership</option>
          <option value="florida">Sebastian, FL &mdash; Lot Reservation</option>
          <option value="brand-invest">Brand / IP Investment</option>
          <option value="site-invest">Site-Specific Development</option>
          <option value="other">General Inquiry</option>
        </select>
      </div>
      <button className="btn btnPrimary btnLg" onClick={() => setDone(true)}>Join the Waitlist &rarr;</button>
      <p className="wfDisclaimer">No commitment required. Investment access requires NDA + vetting.</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  const [bookOpen, setBookOpen] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  return (
    <>
      <Nav />
      {bookOpen && <BrandBookModal onClose={() => setBookOpen(false)} />}

      {/* ═══ HERO ═══ */}
      <section className="hero" id="hero">
        <img src={`${IMG}/bioregional-hub.jpg`} alt="" className="heroBgImg" />
        <div className="heroOverlay" />
        <div className="heroContent">
          <p className="heroEyebrow">Future of Cities &bull; 2025</p>
          <h1 className="heroTitle">CHOZEN</h1>
          <p className="heroSub">A Camp for the Humanity of the Future</p>
          <p className="heroTagline">Where Nature is the Ceremony</p>
          <div className="heroLine" />
          <div className="heroCtas">
            <a href="#story" className="btn btnPrimary">Explore the Vision</a>
            <a href="#waitlist" className="btn btnGhost">Join the Waitlist</a>
          </div>
        </div>
        <div className="heroScroll"><span /></div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="testimonials">
        <div className="wrap">
          <div className="testGrid">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="testCard">
                  <div className="testImg"><img src={t.img} alt={t.name} /></div>
                  <p className="testQuote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="testDivider" />
                  <div className="testName">{t.name}</div>
                  <div className="testRole">{t.role}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STORY ═══ */}
      <section className="sec" id="story">
        <div className="wrap">
          <FadeIn>
            <div className="secHead">
              <p className="eyebrow">Regenerative Placemaking</p>
              <h2>The ChoZen Story</h2>
              <div className="hdivider" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="storyHero">
              <img src={`${IMG}/bioregional-hub2.jpg`} alt="Bioregional Hub" />
              <div className="storyHeroContent">
                <h3>Bioregional Hubs</h3>
                <p>Our bioregional hubs apply ecosystems thinking to re-village real estate, weaving together climate-conscious design, circular economies, and community-driven innovation.</p>
                <p>By restoring ecological balance and fostering social and economic vitality, we are building the cities of tomorrow &mdash; rooted in place, inspired by community, powered by nature.</p>
                <span className="storyTag">Local Roots, Global Impact.</span>
              </div>
            </div>
          </FadeIn>

          <div className="storyCards">
            <FadeIn delay={0.15}>
              <div className="storyCard">
                <div className="scLabel">The Challenge</div>
                <h4>Nature in Crisis</h4>
                <p>Vanishing wetlands, declining species, water scarcity. Rising costs, gentrification, instability. A holistic path forward through bioregional restoration.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="storyCard">
                <div className="scLabel">The Solution</div>
                <h4>Revillaging</h4>
                <p>Optimizing for human connection. Close-knit communities of 50&ndash;150 people &mdash; large enough for diverse skills, small enough for deep relationships.</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="statsRow">
              {STATS.map((s, i) => (
                <div key={i} className="stat">
                  <div className="statNum">{s.number}</div>
                  <div className="statLbl">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ PHOTO BREAK: Nature ═══ */}
      <PhotoBreak img={`${IMG}/sebastian-river.jpg`} title="Nature is Medicine. Food is Medicine. Community is Medicine." height="70vh" />

      {/* ═══ BRAND ═══ */}
      <section className="sec secAlt" id="brand">
        <div className="wrap">
          <FadeIn>
            <div className="secHead">
              <p className="eyebrow">Brand & IP</p>
              <h2>A Lifestyle Brand for Regenerative Living</h2>
              <div className="hdivider" />
            </div>
          </FadeIn>

          <div className="pillarGrid">
            {PILLARS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="pillarCard">
                  <div className="pillarImg"><img src={p.img} alt={p.title} /></div>
                  <div className="pillarBody">
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* We Are / We Are Not */}
          <FadeIn delay={0.1}>
            <div className="weAreSection">
              <h3 className="subHead">We Are vs. We Are Not</h3>
              <div className="weAreGrid">
                {PILLARS_BRAND.map((p, i) => (
                  <div key={i} className="weAreCard">
                    <div className="waTitle">{p.title}</div>
                    <div className="waBody">
                      <div className="waCol waYes"><div className="waLabel">&#10003; We Are</div><p>{p.yes}</p></div>
                      <div className="waCol waNo"><div className="waLabel">&#10005; We Are Not</div><p>{p.no}</p></div>
                    </div>
                    <div className="waTags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn><div className="centered" style={{ marginTop: 48 }}><button onClick={() => setBookOpen(true)} className="btn btnPrimary">Explore Full Brand Book &rarr;</button></div></FadeIn>
        </div>
      </section>

      {/* ═══ PHOTO BREAK: ChoZen Path ═══ */}
      <PhotoBreak img={`${IMG}/chozen-path.jpg`} title="Walk the ChoZen Path" subtitle="Expansion 2025" height="55vh" />

      {/* ═══ FLORIDA ═══ */}
      <section className="sec" id="florida">
        <div className="wrap">
          <FadeIn>
            <div className="secHead">
              <p className="eyebrow">Sebastian, Florida</p>
              <h2>Nested in Nature: A Sanctuary for Renewal</h2>
              <div className="hdivider" />
              <p className="secDesc">Set amidst the 22,000-acre St. Sebastian River Preserve, within North America&apos;s most biodiverse lagoon system. Connected to the Indian River Lagoon, serving over 11 million Floridians.</p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="expansionGrid">
              {EXPANSION.map((e, i) => (
                <div key={i} className={`expCard ${i === 0 ? "expCardFeatured" : ""}`}>
                  <img src={e.img} alt={e.title} className="expImg" />
                  <div className="expOverlay" />
                  <div className="expContent">
                    <h4>{e.title}</h4>
                    <p>{e.desc}</p>
                    <span className="expSub">{e.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Amenities Grid */}
          <FadeIn delay={0.1}>
            <h3 className="subHead" style={{ marginTop: 64 }}>Amenities & Experiences</h3>
            <div className="amenGrid">
              {AMENITIES.map((a, i) => (
                <div key={i} className="amenItem">
                  <img src={a.img} alt={a.label} />
                  <span>{a.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Mission Callout */}
          <FadeIn delay={0.15}>
            <div className="missionCallout">
              <img src={`${IMG}/chozen-stamp.png`} alt="" className="missionStamp" />
              <h3>ChoZen Center for Regenerative Living</h3>
              <p>Regenerate land and biodiversity. Revitalize local economies. Elevate human well-being. Advance wildlife conservation through partnerships with Wildpath and Path of the Panther.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ PHOTO BREAK: Biophilic Design ═══ */}
      <PhotoBreak img={`${IMG}/biophilic-design.jpg`} title="Biophilic Design" subtitle="Architecture Rooted in Nature" height="60vh" />

      {/* ═══ LOCATIONS ═══ */}
      <section className="sec secAlt" id="locations">
        <div className="wrap">
          <FadeIn><div className="secHead"><p className="eyebrow">Global Pipeline</p><h2>Future Growth</h2><div className="hdivider" /><p className="secDesc">Expanding regenerative hubs, each shaped by its land, culture, and people.</p></div></FadeIn>
          <FadeIn>
            <div className="locGrid">
              {FUTURE_LOCATIONS.map((loc, i) => (
                <div key={i} className="locCard">
                  <div className="locStatus">Pipeline</div>
                  <h3>{loc.city}</h3>
                  <div className="locCountry">{loc.country}</div>
                  <p>{loc.desc}</p>
                  <div className="locFeats">{loc.features.map(f => <span key={f}>{f}</span>)}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ MARKET ═══ */}
      <section className="sec">
        <div className="wrap">
          <FadeIn><div className="secHead"><p className="eyebrow">Market Opportunity</p><h2>Rising Demand for Well-Being</h2><div className="hdivider" /></div></FadeIn>
          <FadeIn>
            <div className="marketGrid">
              {MARKET_DATA.map((m, i) => (
                <div key={i} className="marketCard">
                  <div className="mktVal">{m.value}</div>
                  <div className="mktLabel">{m.label}</div>
                  <div className="mktSub">{m.sub}</div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="source">Source: Facts and Factors, Global Wellness Institute, Blue Zones</p>
            <h3 className="subHead" style={{ marginTop: 56 }}>Partnerships</h3>
            <div className="partnerGrid">
              {PARTNERSHIPS.map((p, i) => (
                <div key={i} className="partnerCard">
                  {p.img ? <img src={p.img} alt={p.name} /> : <span>{p.name}</span>}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ PHOTO BREAK: Community ═══ */}
      <PhotoBreak img={`${IMG}/community.jpg`} title="We Are Co-Creating a Community That Will Inspire Future Generations" height="65vh" overlay={0.5} />

      {/* ═══ INVEST ═══ */}
      <section className="sec secDark" id="invest">
        <div className="wrap">
          <FadeIn><div className="secHead"><p className="eyebrow" style={{color:"var(--sage)"}}>Investment</p><h2 style={{color:"var(--cream)"}}>Investment Opportunities</h2><div className="hdivider" style={{background:"var(--gold)"}} /></div></FadeIn>
          <FadeIn>
            <div className="investGrid">
              {INVESTMENT_LAYERS.map((inv, i) => (
                <div key={i} className="investCard">
                  <div className="invLayer" style={{color:inv.color}}>{inv.layer}</div>
                  <h3>{inv.title}</h3>
                  <div className="invSub">{inv.subtitle}</div>
                  <p>{inv.desc}</p>
                  <div className="invItems">{inv.items.map((item, j) => <div key={j} className="invItem"><span className="invDot" style={{background:inv.color}} />{item}</div>)}</div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="investGrid" style={{marginTop:24}}>
              {[FINANCIALS.village, FINANCIALS.hospitality].map((fin, i) => (
                <div key={i} className="investCard">
                  <h3 style={{marginBottom:20}}>{fin.title}</h3>
                  {fin.rows.map((r, j) => (
                    <div key={j} className="finRow">
                      <span>{r.label}</span>
                      <span className={r.hl ? "finHl" : ""}>{r.value}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="gateBox">
              <h3>Deeper Access Requires Verification</h3>
              <p>Detailed investment memorandums, financial projections, and partnership structures are available to qualified investors after NDA execution.</p>
              {!gateOpen ? (
                <button className="btn btnGold" onClick={() => setGateOpen(true)}>Request Gated Access &rarr;</button>
              ) : (
                <div className="gateSuccess"><p>Thank you. Our team will reach out to begin the vetting process.</p></div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="sec" id="team">
        <div className="wrap">
          <FadeIn><div className="secHead"><p className="eyebrow">Leadership</p><h2>About the Cofounders</h2><div className="hdivider" /></div></FadeIn>
          <FadeIn>
            <div className="teamGrid">
              {COFOUNDERS.map((c, i) => (
                <div key={i} className="teamCard">
                  <div className="teamPhoto"><img src={c.img} alt={c.name} /></div>
                  <h3>{c.name}</h3>
                  <p>{c.bio}</p>
                  <div className="teamOrgs">{c.orgs.map(o => <span key={o}>{o}</span>)}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ WAITLIST ═══ */}
      <section className="sec secAlt" id="waitlist">
        <div className="wrap">
          <FadeIn>
            <div className="secHead">
              <p className="eyebrow">Get Involved</p>
              <h2>Join the ChoZen Path</h2>
              <div className="hdivider" />
              <p className="secDesc">Whether you&apos;re a future resident, community member, or investor &mdash; your journey starts here.</p>
            </div>
          </FadeIn>
          <FadeIn><WaitlistForm /></FadeIn>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <img src={`${IMG}/chozen-stamp.png`} alt="" className="footerStamp" />
        <div className="footerLogo">CHOZEN</div>
        <p>Center for Regenerative Living &bull; Future of Cities</p>
        <p>Investment & Brand Deck &mdash; 2025</p>
        <p className="footerDisclaimer">This material is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities.</p>
      </footer>
    </>
  );
}
