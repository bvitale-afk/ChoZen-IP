"use client";
import { useState, useEffect, useRef } from "react";

const IMG = "https://zicvctuf51wytcty.public.blob.vercel-storage.com/images";

const VILLAGE_IMAGES = [
  `${IMG}/chozen-village4.jpg`,
  `${IMG}/chozen-village.jpg`,
  `${IMG}/chozen-village2.jpg`,
  `${IMG}/chozen-village3.jpg`,
  `${IMG}/chozen-village5.jpg`,
  `${IMG}/chozen-village6.jpg`,
];

const HOSPITALITY_IMAGES = [
  `${IMG}/chozen-hospitality.jpg`,
  `${IMG}/chozen-hospitality2.jpg`,
  `${IMG}/chozen-hospitality3.jpg`,
  `${IMG}/chozen-hospitality4.jpg`,
];

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

const STATS = [
  { number: 11, suffix: "+", label: "Years in Florida" },
  { number: 1000, suffix: "s", label: "Community Members Served" },
  { number: 92, suffix: "", label: "Subtropical Acres" },
  { number: 55, suffix: "", label: "For-Sale Residences" },
  { number: 250, suffix: "", label: "Eco-Luxury Rooms" },
  { number: 4, suffix: "+", label: "Global Locations in Pipeline" },
];

const TESTIMONIALS = [
  { quote: "ChoZen is a blueprint for a blue zone.", name: "Dan Buettner", role: "Creator of the Blue Zones Project", img: `${IMG}/dan-butner.jpg` },
  { quote: "ChoZen is a sanctuary for wellness and nature lovers.", name: "USA Today", role: "National Publication", img: `${IMG}/usa-today.jpg` },
  { quote: "ChoZen is the jewel in Florida\u2019s crown.", name: "Nat Kelly", role: "Actor & Environmental Activist", img: `${IMG}/nat-kelly.jpg` },
];

const PILLARS = [
  { title: "Wellness", desc: "Regenerative wellness spa, spring-fed mineral pools, thermal therapy, and individualized wellness retreats", img: `${IMG}/spa.jpg`, icon: "\u2727" },
  { title: "Agriculture", desc: "Regenerative onsite farming, food forests, edible landscapes, farm-to-table meals, and a farm store", img: `${IMG}/chozen-farm.jpg`, icon: "\u2618" },
  { title: "Hospitality", desc: "250 rooms of luxury ecoglamping, earth-to-table dining, and world-class regenerative experiences", img: `${IMG}/chozen-hospitality.jpg`, icon: "\u2302" },
  { title: "Nature", desc: "Set within the 22,000-acre St. Sebastian River Preserve \u2014 North America\u2019s most biodiverse lagoon system", img: `${IMG}/nature.jpg`, icon: "\u2698" },
  { title: "Ancestral Wisdom", desc: "Honoring indigenous knowledge, sacred practices, and the guidance of those who walked before us", img: `${IMG}/temple-to-nature.jpg`, icon: "\u2660" },
  { title: "Community", desc: "Optimizing for human connection through revillaging \u2014 close-knit communities of 50\u2013150 people", img: `${IMG}/community.jpg`, icon: "\u2665" },
];

const EXPANSION = [
  { title: "Wellness Spa", desc: "Regenerative wellness spa, spring-fed mineral pools, temple to nature, thermal therapy circuits.", sub: "World-Class Amenities", img: `${IMG}/fire-pit.jpg` },
  { title: "ChoZen Farm", desc: "Farm-to-table meals, farm store, edible landscapes, agricultural neighborhoods, food forests.", sub: "Regenerative Agriculture", img: `${IMG}/chozen-farm.jpg` },
  { title: "Biophilic Design", desc: "Bamboo architecture, local materials, high-performance building systems rooted in nature.", sub: "Architecture & Design", img: `${IMG}/biophilic-design.jpg` },
  { title: "Nature Preserve", desc: "Set within the 22,000-acre St. Sebastian River Preserve. Wildpath and Path of the Panther corridors.", sub: "Conservation & Ecology", img: `${IMG}/nature.jpg` },
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
  { city: "Medell\u00EDn", country: "Colombia", desc: "Branded residential with an agricultural naturehood. Maker\u2019s village, artist village, ancestral wisdom, plant medicine where legal.", features: ["Branded Residences", "Agricultural Naturehood", "Maker\u2019s Village", "Ancestral Wisdom"], status: "Active" },
  { city: "Azores", country: "Portugal", desc: "Island resilience through sustainable living and circular economies. European gateway with Golden Visa Fund alignment.", features: ["Golden Visa Fund", "Circular Economies"], status: "Pipeline" },
  { city: "Bahia", country: "Brazil", desc: "Coastal regeneration and cultural preservation in rich biodiversity.", features: ["Coastal Regeneration", "Biodiversity"], status: "Pipeline" },
  { city: "Atlanta", country: "Georgia, USA", desc: "Emerging opportunity. Southeastern US bioregional hub.", features: ["Inbound Interest", "Urban Regeneration"], status: "Exploratory" },
  { city: "Florian\u00F3polis", country: "Brazil", desc: "Island ecology meets regenerative community.", features: ["Inbound Partnership", "Island Ecology"], status: "Exploratory" },
  { city: "Your Destination", country: "Worldwide", desc: "Bring the ChoZen model to your bioregion. We\u2019re actively seeking partners with land, vision, and alignment to co-create the next regenerative community.", features: ["License the IP", "Co-Create", "JV Partnership"], status: "Open" },
];

const MARKET_DATA = [
  { label: "Global Wellness Real Estate", value: "$863.9B", sub: "20.70% CAGR by 2028", pct: 86 },
  { label: "Mental Wellness Market", value: "$87.1B", sub: "2022", pct: 42 },
  { label: "Wellness Tourism", value: "$255.9B", sub: "2022", pct: 62 },
  { label: "Anti-Aging Industry", value: "$83B", sub: "2024", pct: 38 },
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
    { label: "Beds (2026\u20132033)", value: "36 \u2192 120" },
    { label: "Revenue Growth", value: "$2M \u2192 $10M" },
    { label: "Revenue Streams", value: "Retreats + Retail + Wellness + Membership" },
    { label: "Estimated Exit Value", value: "$50M", hl: true },
  ]},
};

const HOSP_GROWTH = [
  { year: 2025, beds: 36, revenue: 1.2 },
  { year: 2026, beds: 45, revenue: 2.0 },
  { year: 2027, beds: 45, revenue: 2.2 },
  { year: 2028, beds: 60, revenue: 3.5 },
  { year: 2029, beds: 60, revenue: 4.0 },
  { year: 2030, beds: 79, revenue: 6.0 },
  { year: 2031, beds: 79, revenue: 6.5 },
  { year: 2032, beds: 120, revenue: 10.0 },
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

const BOOK_PAGES = [
  { title: "Brand Book 2026" },
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
// HOOKS
// ═══════════════════════════════════════════════════════════════

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        setOffset((rect.top / window.innerHeight) * speed * 100);
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [speed]);
  return { ref, offset };
}

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
    { href: "#story", label: "Story" }, { href: "#community", label: "Community" },
    { href: "#ip", label: "The IP" }, { href: "#brand", label: "Brand" },
    { href: "#florida", label: "Florida" }, { href: "#locations", label: "Locations" },
    { href: "#invest", label: "Invest" }, { href: "#team", label: "Team" },
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

function FadeIn({ children, delay = 0, className = "", direction = "up" }) {
  const [ref, vis] = useInView(0.08);
  const transforms = { up: "translateY(60px)", down: "translateY(-60px)", left: "translateX(60px)", right: "translateX(-60px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translate(0)" : transforms[direction],
      transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    }}>{children}</div>
  );
}

function AnimatedNumber({ target, suffix = "", duration = 2000 }) {
  const [ref, inView] = useInView(0.3);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function PhotoBreak({ img, title, subtitle, height = "70vh", overlay = 0.45, parallaxSpeed = 0.35 }) {
  const { ref, offset } = useParallax(parallaxSpeed);
  return (
    <div className="photoBreak" style={{ height }} ref={ref}>
      <img src={img} alt="" className="photoBreakImg" style={{ transform: `translateY(${offset}px) scale(1.15)` }} />
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

function TextReveal({ text, className = "", delay = 0 }) {
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref} className="textRevealWrap">
      <h2 className={`textReveal ${inView ? "revealed" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
        {text}
      </h2>
    </div>
  );
}

function PillarExplorer() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const p = PILLARS[active];
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % PILLARS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [paused]);
  const activate = (i) => { setActive(i); setPaused(true); };
  const resume = () => setPaused(false);
  return (
    <div className="pillarExplorer" onMouseLeave={resume}>
      <div className="pillarExplorerTabs">
        {PILLARS.map((pil, i) => (
          <button key={i} className={`pillarTab ${i === active ? "active" : ""}`} onClick={() => activate(i)} onMouseEnter={() => activate(i)}>
            <span className="pillarTabIcon">{pil.icon}</span>
            <span className="pillarTabLabel">{pil.title}</span>
            {i === active && <span className="pillarTabTimer" key={`timer-${i}-${paused}`} style={{ animationPlayState: paused ? "paused" : "running" }} />}
          </button>
        ))}
      </div>
      <div className="pillarExplorerContent">
        <div className="pillarExplorerImg" key={active}>
          <img src={p.img} alt={p.title} />
        </div>
        <div className="pillarExplorerText" key={`t-${active}`}>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
        </div>
      </div>
    </div>
  );
}

function BrandBookModal({ onClose }) {
  const [page, setPage] = useState(0);
  const [turning, setTurning] = useState(false);
  const [turnDir, setTurnDir] = useState(null);
  const [displayPage, setDisplayPage] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const total = BOOK_PAGES.length;

  const goTo = (target) => {
    if (turning || target === page || target < 0 || target >= total) return;
    const dir = target > page ? "next" : "prev";
    setTurnDir(dir);
    setDisplayPage(page);
    setNextPage(target);
    setTurning(true);
    setTimeout(() => {
      setPage(target);
      setDisplayPage(target);
      setTurning(false);
      setTurnDir(null);
    }, 800);
  };

  useEffect(() => {
    const fn = e => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(page + 1);
      if (e.key === "ArrowLeft") goTo(page - 1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", fn); };
  }, [page, onClose, total, turning]);

  const renderPage = (p, pageNum) => (
    <div className="bkPageContent">
      <div className="bkPageNum">{String(pageNum + 1).padStart(2, "0")}</div>
      <h2 className="modalTitle">{p.title}</h2>
      {p.subtitle && <p className="modalSub">{p.subtitle}</p>}
      {p.text && <p className="modalText">{p.text}</p>}
      {p.items && <div className="modalItems">{p.items.map((item, i) => <div key={i} className="modalItem"><strong>{item.bold}</strong> &mdash; {item.text}</div>)}</div>}
      {p.lines && <div className="modalLines">{p.lines.map((l, i) => <p key={i}>{l}</p>)}</div>}
    </div>
  );

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="bkModal" onClick={e => e.stopPropagation()}>
        {/* Book spine edge */}
        <div className="bkSpine" />
        {/* Page stack effect — visible page edges at bottom */}
        <div className="bkPageEdges">
          <div className="bkEdge bkEdge1" />
          <div className="bkEdge bkEdge2" />
          <div className="bkEdge bkEdge3" />
        </div>
        {/* Main book area */}
        <div className="bkStage">
          {/* Bottom layer: destination page */}
          <div className="bkSheet bkSheetBase" key={`base-${turning ? nextPage : page}`}>
            {renderPage(BOOK_PAGES[turning ? nextPage : page], turning ? nextPage : page)}
          </div>

          {/* Turning page */}
          {turning && (
            <div className={`bkTurnWrap ${turnDir === "next" ? "bkTurnNext" : "bkTurnPrev"}`}>
              {/* Front of page (what you see before it flips) */}
              <div className="bkTurnFront bkSheet">
                {renderPage(BOOK_PAGES[displayPage], displayPage)}
                <div className="bkPageGrain" />
                <div className="bkTurnHighlight" />
              </div>
              {/* Back of page (revealed as it flips) */}
              <div className="bkTurnBack bkSheet">
                <div className="bkBackTexture" />
              </div>
              {/* Thick edge of the page visible during turn */}
              <div className="bkPageThickness" />
            </div>
          )}

          {/* Shadow cast on the page below */}
          {turning && <div className={`bkCastShadow ${turnDir === "next" ? "bkCastShadowNext" : "bkCastShadowPrev"}`} />}
        </div>

        {/* Controls */}
        <div className="bkControls">
          <button disabled={page === 0 || turning} onClick={() => goTo(page - 1)} className="bkNavBtn">&larr;</button>
          <div className="bkDots">{BOOK_PAGES.map((_, i) => <span key={i} onClick={() => goTo(i)} className={`bkDot ${i === page ? "bkDotActive" : ""}`} />)}</div>
          <button disabled={page === total - 1 || turning} onClick={() => goTo(page + 1)} className="bkNavBtn">&rarr;</button>
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
      <div className="waitlistDoneIcon">&#10003;</div>
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
          <option value="florida">Sebastian, FL — Lot Reservation</option>
          <option value="medellin">Medellín, Colombia — Lot Reservation</option>
          <option value="community">Community Membership</option>
          <option value="brand-invest">Brand / IP Investment</option>
          <option value="site-invest">Site-Specific Development</option>
          <option value="other">General Inquiry</option>
        </select>
      </div>
      <button className="btn btnPrimary btnLg" onClick={() => setDone(true)}>Apply for Access &rarr;</button>
      <p className="wfDisclaimer">Qualified investors and future residents. Investment access requires NDA + vetting.</p>
    </div>
  );
}

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0) rotateX(0)"; };
  return <div ref={ref} className={className} onMouseMove={move} onMouseLeave={leave} style={{ transition: "transform 0.15s ease-out" }}>{children}</div>;
}

function ProgressBar({ pct, color = "var(--moss)" }) {
  const [ref, inView] = useInView(0.3);
  return (
    <div ref={ref} className="progressBar">
      <div className="progressFill" style={{ width: inView ? `${pct}%` : "0%", background: color }} />
    </div>
  );
}

function ImageSlideshow({ images, alt = "", interval = 4000 }) {
  const [topIdx, setTopIdx] = useState(0);
  const [botIdx, setBotIdx] = useState(images.length > 1 ? 1 : 0);
  const [topVisible, setTopVisible] = useState(true);
  const tick = useRef(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      tick.current += 1;
      // Toggle which layer is visible - this triggers the CSS crossfade
      setTopVisible(v => !v);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);
  // After each fade completes, update the now-hidden layer's src to the next image
  useEffect(() => {
    if (images.length <= 1) return;
    if (tick.current === 0) return;
    const t = setTimeout(() => {
      const nextImg = (Math.max(topIdx, botIdx) + 1) % images.length;
      if (topVisible) {
        // top is showing, bottom is hidden — update bottom
        setBotIdx(nextImg);
      } else {
        // bottom is showing, top is hidden — update top
        setTopIdx(nextImg);
      }
    }, 1700);
    return () => clearTimeout(t);
  }, [topVisible]);
  return (
    <div className="slideshowWrap">
      <img src={images[botIdx]} alt={alt} className="slideshowImg slideshowBot" />
      <img src={images[topIdx]} alt={alt} className="slideshowImg slideshowTop" style={{ opacity: topVisible ? 1 : 0 }} />
    </div>
  );
}

function AmenitiesShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [prevActive, setPrevActive] = useState(null);
  const stripRef = useRef(null);
  const tickRef = useRef(0);
  const a = AMENITIES[active];

  // Auto-rotate
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive(prev => {
        setPrevActive(prev);
        return (prev + 1) % AMENITIES.length;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [paused]);

  // Clear prevActive after transition
  useEffect(() => {
    tickRef.current += 1;
    if (tickRef.current <= 1) return;
    const t = setTimeout(() => setPrevActive(null), 800);
    return () => clearTimeout(t);
  }, [active]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!stripRef.current) return;
    const thumb = stripRef.current.children[active];
    if (!thumb) return;
    const strip = stripRef.current;
    const scrollLeft = thumb.offsetLeft - strip.offsetWidth / 2 + thumb.offsetWidth / 2;
    strip.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [active]);

  const select = (i) => {
    if (i === active) return;
    setPrevActive(active);
    setActive(i);
    setPaused(true);
  };

  // Drag-to-scroll
  const dragState = useRef({ down: false, startX: 0, scrollLeft: 0 });
  const onMouseDown = (e) => {
    dragState.current = { down: true, startX: e.pageX - stripRef.current.offsetLeft, scrollLeft: stripRef.current.scrollLeft };
    stripRef.current.style.cursor = "grabbing";
  };
  const onMouseUp = () => { dragState.current.down = false; if (stripRef.current) stripRef.current.style.cursor = "grab"; };
  const onMouseMove = (e) => {
    if (!dragState.current.down) return;
    e.preventDefault();
    const x = e.pageX - stripRef.current.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.5;
    stripRef.current.scrollLeft = dragState.current.scrollLeft - walk;
  };

  return (
    <div className="amenShowcase" onMouseLeave={() => setPaused(false)}>
      {/* Featured image */}
      <div className="amenFeatured">
        {prevActive !== null && (
          <img key={`prev-${prevActive}`} src={AMENITIES[prevActive].img} alt="" className="amenFeaturedImg amenFeaturedOut" />
        )}
        <img key={`active-${active}`} src={a.img} alt={a.label} className="amenFeaturedImg amenFeaturedIn" />
        <div className="amenFeaturedOverlay" />
        <div className="amenFeaturedContent">
          <div className="amenFeaturedLabel" key={active}>{a.label}</div>
          <div className="amenFeaturedCount">{String(active + 1).padStart(2, "0")} / {String(AMENITIES.length).padStart(2, "0")}</div>
        </div>
        {/* Progress bar */}
        <div className="amenProgressTrack">
          <div className="amenProgressBar" key={`${active}-${paused}`} style={{ animationDuration: "3.5s", animationPlayState: paused ? "paused" : "running" }} />
        </div>
      </div>
      {/* Thumbnail strip */}
      <div
        className="amenStrip"
        ref={stripRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {AMENITIES.map((am, i) => (
          <button
            key={i}
            className={`amenThumb ${i === active ? "amenThumbActive" : ""}`}
            onClick={() => select(i)}
            onMouseEnter={() => select(i)}
          >
            <img src={am.img} alt={am.label} draggable={false} />
            <span className="amenThumbLabel">{am.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function HospitalityGrowthChart() {
  const [ref, inView] = useInView(0.2);
  const [hovered, setHovered] = useState(null);
  const maxBeds = 120;
  const maxRev = 10;
  const chartW = 100; // percentage based
  const data = HOSP_GROWTH;
  // SVG viewbox coords for the revenue line
  const svgW = 720;
  const svgH = 320;
  const padL = 0;
  const padR = 0;
  const padT = 20;
  const padB = 0;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;
  const barW = plotW / data.length;
  // Generate line points
  const points = data.map((d, i) => {
    const x = padL + i * barW + barW / 2;
    const y = padT + plotH - (d.revenue / maxRev) * plotH;
    return { x, y, ...d };
  });
  const linePath = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + barW * 0.4;
    const cpx2 = p.x - barW * 0.4;
    return `C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
  }).join(" ");
  // Revenue Y gridlines
  const revTicks = [2, 4, 6, 8, 10];
  return (
    <div ref={ref} className={`hospChart ${inView ? "hospChartVisible" : ""}`}>
      <div className="hospChartHeader">
        <h4>Hospitality Growth Projection</h4>
        <div className="hospChartLegend">
          <span className="hospLegBeds"><span className="hospLegSwatch hospLegSwatchBeds" />Beds</span>
          <span className="hospLegRev"><span className="hospLegSwatch hospLegSwatchRev" />Revenue</span>
        </div>
      </div>
      <div className="hospChartBody">
        {/* Left axis labels (beds) */}
        <div className="hospAxisLeft">
          {[120, 100, 80, 60, 40, 20, 0].map(v => (
            <span key={v}>{v}</span>
          ))}
        </div>
        {/* Chart area */}
        <div className="hospChartArea">
          {/* Grid lines */}
          <div className="hospGridLines">
            {[0, 1, 2, 3, 4, 5, 6].map(i => <div key={i} className="hospGridLine" />)}
          </div>
          {/* Bars */}
          <div className="hospBars">
            {data.map((d, i) => {
              const pct = (d.beds / maxBeds) * 100;
              return (
                <div key={i} className="hospBarCol" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                  <div className="hospBarLabel">{d.beds}</div>
                  <div className="hospBar" style={{ height: inView ? `${pct}%` : "0%", transitionDelay: `${i * 0.08}s` }} />
                  <div className="hospBarYear">{d.year}</div>
                  {hovered === i && (
                    <div className="hospTooltip">
                      <strong>{d.year}</strong>
                      <span>{d.beds} beds</span>
                      <span>${d.revenue}M revenue</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Revenue line overlay */}
          <svg className="hospLineSvg" viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="none">
            <path d={linePath} fill="none" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="hospRevLine" style={{ strokeDasharray: 1200, strokeDashoffset: inView ? 0 : 1200 }} />
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="5" fill="var(--gold)" className="hospRevDot" style={{ opacity: inView ? 1 : 0, transitionDelay: `${0.6 + i * 0.1}s` }} />
            ))}
          </svg>
        </div>
        {/* Right axis labels (revenue) */}
        <div className="hospAxisRight">
          {revTicks.map(v => (
            <span key={v}>${v}m</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const TOPO_SVG = "https://zicvctuf51wytcty.public.blob.vercel-storage.com/322_240219_HRZ_ESQUEMAS.svg";

function TopoModal({ onClose }) {
  const [rotX, setRotX] = useState(25);
  const [rotY, setRotY] = useState(0);
  const [scale, setScale] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const stageRef = useRef(null);

  // Auto-rotate Y axis
  useEffect(() => {
    if (!autoRotate) return;
    let raf;
    const animate = () => {
      setRotY(r => (r + 0.25) % 360);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [autoRotate]);

  // Escape to close
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", fn); };
  }, [onClose]);

  // Mouse drag
  const onPointerDown = (e) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setAutoRotate(false);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setRotY(r => r + dx * 0.4);
    setRotX(r => Math.max(-80, Math.min(80, r - dy * 0.4)));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = () => { dragging.current = false; };

  // Scroll to zoom
  const onWheel = (e) => {
    e.preventDefault();
    setScale(s => Math.max(0.3, Math.min(3, s - e.deltaY * 0.001)));
  };

  // Reset
  const reset = () => { setRotX(25); setRotY(0); setScale(1); setAutoRotate(true); };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="topoModal" onClick={e => e.stopPropagation()}>
        <div className="topoHeader">
          <div>
            <h3 className="topoTitle">Medellín Topography</h3>
            <p className="topoSub">Click &amp; drag to rotate &bull; Scroll to zoom</p>
          </div>
          <button className="topoClose" onClick={onClose}>&times;</button>
        </div>
        <div
          className="topoStage"
          ref={stageRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onWheel={onWheel}
        >
          {/* Grid floor for depth reference */}
          <div className="topoFloor" style={{ transform: `perspective(1200px) rotateX(75deg) rotateZ(${rotY}deg) scale(${scale * 1.4})` }} />
          {/* The SVG card */}
          <div className="topoCard" style={{
            transform: `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`,
          }}>
            {/* Front face */}
            <img src={TOPO_SVG} alt="Topography" className="topoSvgImg" draggable={false} />
            {/* Simulated thickness/edge */}
            <div className="topoEdgeBottom" style={{ transform: `rotateX(-90deg) translateZ(0px) scaleY(1)` }} />
            <div className="topoEdgeRight" style={{ transform: `rotateY(90deg) translateZ(0px)` }} />
          </div>
          {/* Shadow on the floor */}
          <div className="topoShadow" style={{ transform: `perspective(1200px) rotateX(75deg) rotateZ(${rotY}deg) scale(${scale * 0.85})`, opacity: Math.max(0.08, 0.25 - Math.abs(rotX) * 0.003) }} />
          {/* Rotation readout */}
          <div className="topoDeg">
            <span>X {Math.round(rotX)}°</span>
            <span>Y {Math.round(((rotY % 360) + 360) % 360)}°</span>
          </div>
          {/* Drag hint */}
          {autoRotate && <div className="topoDragHint">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4m0 12v4M2 12h4m12 0h4" /><circle cx="12" cy="12" r="3" /></svg>
            <span>Drag to explore</span>
          </div>}
        </div>
        <div className="topoControls">
          <div className="topoControlRow">
            <button className={`topoBtn ${autoRotate ? "topoBtnActive" : ""}`} onClick={() => setAutoRotate(!autoRotate)}>
              {autoRotate ? "⏸ Pause" : "▶ Auto-Rotate"}
            </button>
            <div className="topoZoom">
              <button className="topoBtn" onClick={() => setScale(s => Math.max(0.3, s - 0.2))}>−</button>
              <span className="topoZoomLabel">{Math.round(scale * 100)}%</span>
              <button className="topoBtn" onClick={() => setScale(s => Math.min(3, s + 0.2))}>+</button>
            </div>
            <button className="topoBtn" onClick={reset}>↺ Reset</button>
          </div>
          <div className="topoAngles">
            {["Top", "Front", "Side", "Iso"].map(view => {
              const presets = { Top: [90, 0], Front: [0, 0], Side: [0, 90], Iso: [25, 45] };
              const [px, py] = presets[view];
              return (
                <button key={view} className="topoAngleBtn" onClick={() => { setAutoRotate(false); setRotX(px); setRotY(py); }}>
                  {view}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function AccordionItem({ title, yes, no, tags, index }) {
  const [open, setOpen] = useState(true);
  return (
    <div className={`accordionItem ${open ? "open" : ""}`}>
      <button className="accordionHeader" onClick={() => setOpen(!open)}>
        <span className="accordionNum">0{index + 1}</span>
        <span className="accordionTitle">{title}</span>
        <span className="accordionArrow">{open ? "\u2212" : "\u002B"}</span>
      </button>
      <div className="accordionBody" style={{ maxHeight: open ? 600 : 0 }}>
        <div className="accordionInner">
          <div className="accordionCol"><div className="accordionLabel accordionLabelYes">&#10003; We Are</div><p>{yes}</p></div>
          <div className="accordionCol"><div className="accordionLabel accordionLabelNo">&#10005; We Are Not</div><p>{no}</p></div>
        </div>
        <div className="accordionTags">{tags.map(t => <span key={t}>{t}</span>)}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  const [bookOpen, setBookOpen] = useState(false);
  const [topoOpen, setTopoOpen] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [activeInvest, setActiveInvest] = useState(0);
  const storyParallax = useParallax(0.2);

  return (
    <>
      <Nav />
      {bookOpen && <BrandBookModal onClose={() => setBookOpen(false)} />}
      {topoOpen && <TopoModal onClose={() => setTopoOpen(false)} />}

      {/* ═══ HERO ═══ */}
      <section className="hero" id="hero">
        <video className="heroBgVideo" autoPlay muted loop playsInline poster={`${IMG}/bioregional-hub.jpg`}>
          <source src="https://yhbrmdh0w360ty1c.public.blob.vercel-storage.com/Videos/CHOZEN%20CCRL%20HEADER.mp4" type="video/mp4" />
        </video>
        <div className="heroOverlay" />
        <div className="heroContent">
          <img src={`${IMG}/chozen-stamp.png`} alt="" className="heroStamp" />
          <p className="heroEyebrow">Future of Cities &bull; 2026</p>
          <h1 className="heroTitle">CHOZEN</h1>
          <p className="heroSub">A Camp for the Humanity of the Future</p>
          <p className="heroTagline">Where Nature is the Ceremony</p>
          <div className="heroLine" />
          <div className="heroScrollDown">
            <a href="#story" className="heroScrollLink">
              <span className="heroScrollChevron" />
              <span className="heroScrollChevron heroScrollChevron2" />
            </a>
          </div>
        </div>
        <div className="heroScroll"><span /></div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="testimonials">
        <div className="wrap">
          <div className="testGrid">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <TiltCard className="testCard">
                  <div className="testImg"><img src={t.img} alt={t.name} /></div>
                  <p className="testQuote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="testDivider" />
                  <div className="testName">{t.name}</div>
                  <div className="testRole">{t.role}</div>
                </TiltCard>
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
              <p className="eyebrow">A Demonstration Project of the Future of Cities</p>
              <TextReveal text="The ChoZen Story" className="secTitle" />
              <div className="hdivider" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="storyHero" ref={storyParallax.ref}>
              <img src={`${IMG}/bioregional-hub2.jpg`} alt="Bioregional Hub" style={{ transform: `translateY(${storyParallax.offset}px) scale(1.12)` }} />
              <div className="storyHeroContent">
                <h3>Bioregional Hubs</h3>
                <p>Our bioregional hubs apply ecosystems thinking to re-village real estate, weaving together climate-conscious design, circular economies, and community-driven innovation.</p>
                <p>By restoring ecological balance and fostering social and economic vitality, we are building the cities of tomorrow &mdash; rooted in place, inspired by community, powered by nature.</p>
                <span className="storyTag">Local Roots, Global Impact.</span>
              </div>
            </div>
          </FadeIn>
          <div className="storyCards">
            <FadeIn delay={0.15}><TiltCard className="storyCard"><div className="scLabel">The Origin</div><h4>11+ Years in Florida</h4><p>What began as a community of changemakers in Sebastian has evolved into a nature, wellness, and hospitality brand &mdash; with a built-in community of thousands and a global vision.</p></TiltCard></FadeIn>
            <FadeIn delay={0.25}><TiltCard className="storyCard"><div className="scLabel">The Framework</div><h4>Generation Regeneration</h4><p>Rooted in the book and framework by Tony Cho. Regenerative placemaking in action &mdash; optimizing for human connection through close-knit communities of 50&ndash;150 people.</p></TiltCard></FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div className="statsRow">
              {STATS.map((s, i) => (
                <div key={i} className="stat">
                  <div className="statNum"><AnimatedNumber target={s.number} suffix={s.suffix} /></div>
                  <div className="statLbl">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ COMMUNITY ═══ */}
      <section className="communityHighlights" id="community">
        <div className="wrap">
          <FadeIn>
            <div className="secHead">
              <p className="eyebrow">Built-In Community</p>
              <TextReveal text="It's Not Just a Place — It's Who's There" className="secTitle" />
              <div className="hdivider" />
              <p className="secDesc">Anyone can build a flashy development. What sets ChoZen apart is the community &mdash; changemakers, indigenous leaders, world-class practitioners, and visionaries.</p>
            </div>
          </FadeIn>
          <div className="commGrid">
            {[
              { img: `${IMG}/dan-butner.jpg`, title: "Blue Zones Recognized", text: "Dan Buettner called ChoZen \"a blueprint for a blue zone.\"" },
              { img: `${IMG}/temple-to-nature.jpg`, title: "Indigenous Wisdom", text: "Ancestral practices, sacred ceremonies, and ecological stewardship." },
              { img: `${IMG}/tony-cho.jpg`, title: "Thought Leaders", text: "Future of Cities founders, Chopra advisors, activists building the new world." },
              { img: `${IMG}/gathering-spaces.jpg`, title: "Events & Gatherings", text: "Thousands served across summits, retreats, and seasonal celebrations." },
            ].map((c, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.1} className="commGridItem">
                <TiltCard className="commCard">
                  <div className="commIcon"><img src={c.img} alt={c.title} /></div>
                  <h4>{c.title}</h4>
                  <p>{c.text}</p>
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE IP ═══ */}
      <section className="ipSection" id="ip">
        <div className="ipBg"><img src={`${IMG}/sebastian-river.jpg`} alt="" /><div className="ipBgOverlay" /></div>
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div className="ipHeader">
              <img src={`${IMG}/chozen-stamp.png`} alt="" className="ipStamp" />
              <p className="ipEyebrow">The IP</p>
              <h2 className="ipTitle">Nature is Medicine.<br />Food is Medicine.<br />Community is Medicine.</h2>
              <div className="hdivider" style={{ background: "var(--gold)" }} />
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="ipFeature">
              <div className="ipFeatureImg"><ImageSlideshow images={VILLAGE_IMAGES} alt="ChoZen Village" interval={4000} /></div>
              <div className="ipFeatureBody">
                <p className="ipFeatureEyebrow">Residential Development</p>
                <h3>ChoZen Village</h3>
                <p className="ipFeatureTagline">Regenerative Nature Hood</p>
                <p>Harmonious, eco-friendly living spaces created to nurture your well-being. 55 homes, cottages and tree houses priced from $700K&ndash;$6M+. Each residence is designed with regenerative principles &mdash; native landscaping, passive solar orientation, and direct access to nature trails and community gathering spaces.</p>
                <div className="ipFeatureTags"><span>Edible Landscapes</span><span>Food Forests</span><span>Farmlettes</span><span>Sustainable Homes</span></div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="ipFeature ipFeatureReverse">
              <div className="ipFeatureImg"><ImageSlideshow images={HOSPITALITY_IMAGES} alt="ChoZen Retreats" interval={4500} /></div>
              <div className="ipFeatureBody">
                <p className="ipFeatureEyebrow">Hospitality Development</p>
                <h3>ChoZen Retreats</h3>
                <p className="ipFeatureTagline">250 Rooms &bull; Earth-to-Table</p>
                <p>Thoughtfully designed retreats that blend comfort and sustainability to inspire rest and rejuvenation. From luxury safari-style tents to treehouse suites, each experience is curated around earth-to-table dining, thermal therapy, and immersive nature programming.</p>
                <div className="ipFeatureTags"><span>Luxury Ecoglamping</span><span>World-Class Wellness</span><span>Regenerative Experiences</span></div>
              </div>
            </div>
          </FadeIn>
          <div className="ipGrid">
            {[
              { img: `${IMG}/chozen-farm.jpg`, title: "ChoZen Farm", text: "Farm-to-table meals, farm store, edible landscapes, food forests, permaculture education." },
              { img: `${IMG}/spa.jpg`, title: "Regenerative Wellness", text: "Spring-fed mineral pools, thermal therapy, temple to nature, individualized retreats." },
              { img: `${IMG}/community.jpg`, title: "Community & Membership", text: "Close-knit communities of 50\u2013150 people. Exclusive membership with retreat center access." },
            ].map((card, i) => (
              <FadeIn key={i} delay={0.16 + i * 0.08}>
                <div className="ipCard"><div className="ipCardImg"><img src={card.img} alt={card.title} /></div><div className="ipCardBody"><h4>{card.title}</h4><p>{card.text}</p></div></div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.28}>
            <div className="ipWhatYouGet">
              <div className="ipWygHeader">
                <p className="ipFeatureEyebrow">License the ChoZen IP</p>
                <h3>What You Get</h3>
                <p className="ipWygSub">A turnkey brand and operating system &mdash; proven in Florida, designed to replicate globally.</p>
              </div>
              <div className="ipWygGrid">
                {[
                  { t: "Brand & Trademark", d: "Full rights to the ChoZen name, visual identity, stamp, and brand guidelines." },
                  { t: "Design Playbook", d: "Biophilic architecture standards, site planning, bamboo specs, conservation ratios." },
                  { t: "Programming & Curriculum", d: "Wellness retreats, farm-to-table dining, permaculture education, ceremonies." },
                  { t: "Membership Platform", d: "Digital platform for community with event management and membership tiers." },
                  { t: "Operational Playbook", d: "SOPs for hospitality, agriculture, wellness, events, and community management." },
                  { t: "Network & Partnerships", d: "Blue Zones, Chopra Foundation, Wildpath, IDEAS For Us, Future of Cities." },
                ].map((c, i) => (
                  <div key={i} className="ipWygCard"><div className="ipWygIcon">&#9670;</div><h4>{c.t}</h4><p>{c.d}</p></div>
                ))}
              </div>
              <div className="ipWygFooter">
                <p>Each partnership is bespoke. First locations structured as joint ventures.</p>
                <a href="#waitlist" className="btn btnGold">Inquire About Licensing &rarr;</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ BRAND ═══ */}
      <section className="sec secAlt" id="brand">
        <div className="wrap">
          <FadeIn>
            <div className="secHead">
              <p className="eyebrow">Brand Identity</p>
              <TextReveal text="A Lifestyle Brand for Regenerative Living" className="secTitle" />
              <div className="hdivider" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}><PillarExplorer /></FadeIn>
          <FadeIn delay={0.15}>
            <h3 className="subHead" style={{ marginTop: 64 }}>We Are vs. We Are Not</h3>
            <div className="accordionWrap">
              {PILLARS_BRAND.map((p, i) => <AccordionItem key={i} index={i} title={p.title} yes={p.yes} no={p.no} tags={p.tags} />)}
            </div>
          </FadeIn>
          <FadeIn><div className="centered" style={{ marginTop: 48 }}><button onClick={() => setBookOpen(true)} className="btn btnPrimary">Explore Full Brand Book &rarr;</button></div></FadeIn>
        </div>
      </section>

      <PhotoBreak img={`${IMG}/chozen-path.jpg`} title="Walk the ChoZen Path" subtitle="Expansion 2026" height="65vh" parallaxSpeed={0.8} />

      {/* ═══ FLORIDA ═══ */}
      <section className="sec" id="florida">
        <div className="wrap">
          <FadeIn>
            <div className="secHead">
              <p className="eyebrow">Sebastian, Florida</p>
              <TextReveal text="Nested in Nature: A Sanctuary for Renewal" className="secTitle" />
              <div className="hdivider" />
              <p className="secDesc">Set amidst the 22,000-acre St. Sebastian River Preserve, within North America&apos;s most biodiverse lagoon system.</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="expansionGrid">
              {EXPANSION.map((e, i) => (
                <div key={i} className="expCard"><img src={e.img} alt={e.title} className="expImg" /><div className="expOverlay" /><div className="expContent"><span className="expSub">{e.sub}</span><h4>{e.title}</h4><p>{e.desc}</p></div></div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h3 className="subHead" style={{ marginTop: 64 }}>Amenities & Experiences</h3>
            <AmenitiesShowcase />
          </FadeIn>
        </div>
      </section>

      {/* ═══ LOCATIONS ═══ */}
      <section className="sec secDark" id="locations">
        <div className="wrap">
          <FadeIn>
            <div className="secHead">
              <p className="eyebrow" style={{ color: "var(--sage)" }}>Global Expansion</p>
              <TextReveal text="Beyond Florida" className="secTitle secTitleLight" />
              <div className="hdivider" style={{ background: "var(--gold)" }} />
              <p className="secDesc" style={{ color: "var(--sand)" }}>From Colombia to Portugal to Brazil &mdash; each hub shaped by its land, culture, and people.</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="locGrid">
              {FUTURE_LOCATIONS.map((loc, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className={`locCard ${i === 0 ? "locCardFeatured" : ""} ${loc.status === "Open" ? "locCardOpen" : ""}`}>
                    <div className={`locStatus ${loc.status === "Active" ? "locStatusActive" : loc.status === "Exploratory" ? "locStatusExplore" : loc.status === "Open" ? "locStatusOpen" : ""}`}>{loc.status}</div>
                    <h3>{loc.city}</h3>
                    <div className="locCountry">{loc.country}</div>
                    <p>{loc.desc}</p>
                    <div className="locFeats">{loc.features.map(f => <span key={f}>{f}</span>)}</div>
                    {i === 0 && <button className="locTopoLink" onClick={() => setTopoOpen(true)}>View Topography &rarr;</button>}
                    {loc.status === "Open" && <a href="#waitlist" className="btn btnGold" style={{ marginTop: 20, fontSize: "0.6rem", padding: "12px 28px" }}>Propose a Location &rarr;</a>}
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ MISSION CALLOUT — FULL SCREEN ═══ */}
      <section className="missionFull">
        <img src={`${IMG}/temple-to-nature.jpg`} alt="" className="missionFullBg" />
        <div className="missionFullOverlay" />
        <div className="missionFullContent">
          <FadeIn>
            <img src={`${IMG}/chozen-stamp.png`} alt="" className="missionStamp" />
            <h2>ChoZen Center for Regenerative Living</h2>
            <p className="nonprofitTag">Adjacent 501(c)(3) Nonprofit</p>
            <p>Regenerate land and biodiversity. Revitalize local economies. Elevate human well-being. Advance wildlife conservation through partnerships with Wildpath and Path of the Panther.</p>
            <a href="#waitlist" className="btn btnGhost" style={{ marginTop: 32 }}>Get Involved &rarr;</a>
          </FadeIn>
        </div>
      </section>

      {/* ═══ MARKET ═══ */}
      <section className="sec">
        <div className="wrap">
          <FadeIn>
            <div className="secHead">
              <p className="eyebrow">Market Opportunity</p>
              <TextReveal text="Rising Demand for Well-Being" className="secTitle" />
              <div className="hdivider" />
            </div>
          </FadeIn>
          <FadeIn>
            <div className="marketGrid">
              {MARKET_DATA.map((m, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="marketCard">
                    <div className="mktVal">{m.value}</div>
                    <ProgressBar pct={m.pct} />
                    <div className="mktLabel">{m.label}</div>
                    <div className="mktSub">{m.sub}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="source">Source: Facts and Factors, Global Wellness Institute, Blue Zones</p>
            <h3 className="subHead" style={{ marginTop: 56 }}>Partnerships</h3>
            <div className="partnerGrid">
              {PARTNERSHIPS.map((p, i) => <div key={i} className="partnerCard">{p.img ? <img src={p.img} alt={p.name} /> : <span>{p.name}</span>}</div>)}
            </div>
          </FadeIn>
        </div>
      </section>

      <PhotoBreak img={`${IMG}/community.jpg`} title="We Are Co-Creating a Community That Will Inspire Future Generations" height="70vh" overlay={0.5} parallaxSpeed={0.8} />

      {/* ═══ BLUE ZONES ═══ */}
      <section className="blueZones">
        <div className="wrap">
          <FadeIn>
            <div className="bzLayout">
              <div className="bzContent">
                <h2 className="bzTitle">Blue Zones</h2>
                <p className="bzQuote">&ldquo;ChoZen is a blueprint for a blue zone.&rdquo;</p>
                <p className="bzDef">Blue Zones are regions where people consistently live longer, healthier lives, often reaching 90 or 100 years old.</p>
                <p className="bzText">Dan Buettner and a team from National Geographic identified the Blue Zones in 2004. Small, consistent habits &mdash; eating well, staying active, nurturing connections &mdash; lead to longer, happier lives.</p>
              </div>
              <div className="bzImage"><img src={`${IMG}/dan-butner.jpg`} alt="Dan Buettner" /><div className="bzCaption">Dan Buettner<br /><span>Creator of the Blue Zones Project</span></div></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ INVEST ═══ */}
      <section className="sec secDark" id="invest">
        <div className="wrap">
          <FadeIn>
            <div className="secHead">
              <p className="eyebrow" style={{ color: "var(--sage)" }}>Investment</p>
              <TextReveal text="Investment Opportunities" className="secTitle secTitleLight" />
              <div className="hdivider" style={{ background: "var(--gold)" }} />
            </div>
          </FadeIn>
          <FadeIn>
            <div className="investToggle">
              {INVESTMENT_LAYERS.map((inv, i) => (
                <button key={i} className={`investToggleBtn ${activeInvest === i ? "active" : ""}`} onClick={() => setActiveInvest(i)} style={{ "--accent": inv.color }}>
                  <span className="investToggleLayer">{inv.layer}</span>
                  <span className="investToggleTitle">{inv.title}</span>
                  <span className="investToggleIndicator">{activeInvest === i ? "● Viewing" : "Click to View →"}</span>
                </button>
              ))}
            </div>
            <div className="investDetail" key={activeInvest}>
              <div className="investDetailLeft">
                <div className="invLayer" style={{ color: INVESTMENT_LAYERS[activeInvest].color }}>{INVESTMENT_LAYERS[activeInvest].layer}</div>
                <h3>{INVESTMENT_LAYERS[activeInvest].title}</h3>
                <div className="invSub">{INVESTMENT_LAYERS[activeInvest].subtitle}</div>
                <p>{INVESTMENT_LAYERS[activeInvest].desc}</p>
              </div>
              <div className="investDetailRight">
                {INVESTMENT_LAYERS[activeInvest].items.map((item, j) => (
                  <div key={j} className="invItem"><span className="invDot" style={{ background: INVESTMENT_LAYERS[activeInvest].color }} />{item}</div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="investGrid" style={{ marginTop: 24 }}>
              {[FINANCIALS.village, FINANCIALS.hospitality].map((fin, i) => (
                <div key={i} className="investCard">
                  <h3 style={{ marginBottom: 20 }}>{fin.title}</h3>
                  {fin.rows.map((r, j) => <div key={j} className="finRow"><span>{r.label}</span><span className={r.hl ? "finHl" : ""}>{r.value}</span></div>)}
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <HospitalityGrowthChart />
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="gateBox">
              <h3>Deeper Access Requires Verification</h3>
              <p>Detailed investment memorandums, financial projections, and partnership structures available after NDA execution.</p>
              {!gateOpen ? <button className="btn btnGold" onClick={() => setGateOpen(true)}>Request Gated Access &rarr;</button> : <div className="gateSuccess"><p>Thank you. Our team will reach out to begin the vetting process.</p></div>}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="sec" id="team">
        <div className="wrap">
          <FadeIn>
            <div className="secHead">
              <p className="eyebrow">Leadership</p>
              <TextReveal text="About the Cofounders" className="secTitle" />
              <div className="hdivider" />
            </div>
          </FadeIn>
          <div className="teamGrid">
            {COFOUNDERS.map((c, i) => (
              <FadeIn key={i} delay={i * 0.15} direction={i === 0 ? "right" : "left"}>
                <div className="teamCard">
                  <div className="teamPhoto"><img src={c.img} alt={c.name} /></div>
                  <h3>{c.name}</h3>
                  <p>{c.bio}</p>
                  <div className="teamOrgs">{c.orgs.map(o => <span key={o}>{o}</span>)}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WAITLIST ═══ */}
      <section className="sec secAlt" id="waitlist">
        <div className="wrap">
          <FadeIn>
            <div className="secHead">
              <p className="eyebrow">Get Involved</p>
              <TextReveal text="Apply to Join the ChoZen Path" className="secTitle" />
              <div className="hdivider" />
              <p className="secDesc">Future residents, community members, and investors &mdash; your journey starts here.</p>
            </div>
          </FadeIn>
          <FadeIn><WaitlistForm /></FadeIn>
        </div>
      </section>

      <footer className="footer">
        <img src={`${IMG}/chozen-stamp.png`} alt="" className="footerStamp" />
        <div className="footerLogo">CHOZEN</div>
        <p>Center for Regenerative Living &bull; Future of Cities</p>
        <p>Investment & Brand Deck &mdash; 2026</p>
        <p className="footerDisclaimer">This material is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities.</p>
      </footer>
    </>
  );
}
