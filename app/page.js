"use client";
import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

const IP = {
  core: { name: "CHOZEN IP", entity: "Delaware LLC", ownership: "80% LLC / 15% Third Party", capabilities: ["Intellectual Property", "Research & Development", "Creative & Concepting", "Green Living Certification"] },
  partners: [
    { name: "Metro Brokerage", entity: "Delaware LLC", ownership: "100% LLC", services: ["Branded Residence Sales", "Marketing Consulting", "Tenant Curation"] },
    { name: "FOC DevCo", entity: "Delaware LLC", ownership: "100% LLC", services: ["Branded Residences & Resort Development", "Green Development Framework"] },
  ],
  affiliates: [
    { name: "CHOZEN CCRL Non-Profit", entity: "Delaware LLC", ownership: "100% LLC", services: ["Education", "Scholarships", "Conservation"] },
    { name: "Management Co", entity: "Delaware LLC", ownership: "75% LLC / 25% LLC", services: ["TBD"] },
  ],
  verticals: [
    { name: "Residences", color: "#4A5D23", services: ["Brand / License", "Technical Services*", "For-Sale Branded Residences", "Memberships"], note: "*Design; Guest Experiences; Branding; Marketing; PR", ownership: "100% LLC" },
    { name: "Hospitality", color: "#3A6B7E", services: ["Hotels", "Retreat Centers", "Short-Term Rentals", "Memberships"], ownership: "100% LLC" },
    { name: "Retail", color: "#B8963E", services: ["Brick & Mortar", "Concepting & Consulting", "Chozen CPG"], ownership: "100% LLC" },
    { name: "Wellness / Spa", color: "#8B6B4A", services: ["Customer Facing", "Back end IT"], ownership: "100% LLC" },
    { name: "Technology", color: "#5A5A6B", services: ["Customer-facing (app)", "Back end IT"], ownership: "80% LLC / 15% Third Party" },
    { name: "Programming", color: "#6B4A6B", services: ["Consulting**", "Marketing & Partnerships", "Onsite Experiences"], note: "**Ongoing Neighborhood & Community Dev; Residents\u2019 Experience; Community Events; Marketing & PR Advisement", ownership: "100% LLC" },
  ],
};

const FEE_PILLS = [
  { id: "I", label: "Branding Fee", value: "2%", desc: "Brand license and trademark use" },
  { id: "II", label: "Consulting Fee", value: "3%", desc: "Strategic advisory and planning" },
  { id: "III", label: "Tech Fee", value: "TBD", desc: "Technology platform and app" },
  { id: "IV", label: "Development Fee", value: "4%", desc: "Project development oversight" },
  { id: "V", label: "Brokerage Fee", value: "3%", desc: "Branded residence sales" },
  { id: "VI", label: "Management Fee", value: "TBD", desc: "Ongoing property management" },
  { id: "VII", label: "Donations", value: "TBD", desc: "CCRL non-profit contribution" },
];

const FEES = [
  { category: "Residences", compSet: ["Marriott Autograph","Auberge","Proper","Rosewood","Standard","Six Senses","The Well"], rows: [
    { type: "Brand License Fee", chozen: "2% Gross Sales", industry: "1\u20136%", offering: "Trademark use included. Most comp set residences require mandatory full-service resort.", comps: [{n:"Marriott Autograph",f:"4% GS + $1K/unit"},{n:"Auberge",f:"5% GS"},{n:"Proper",f:"4% GS"},{n:"Rosewood",f:"4\u20135% GS"},{n:"Standard",f:"2% GS"},{n:"Six Senses",f:"Pending"},{n:"The Well",f:"Pending"}] },
    { type: "Upfront Fee", chozen: "$100,000", industry: "$250K\u2013$500K", offering: "Secures trademark & market exclusivity. Deducted from 2% Gross Sales.", comps: [{n:"Marriott Autograph",f:"$100K"},{n:"Proper",f:"Incl. in $600K hotel upfront"}] },
    { type: "Brand Management Fee", chozen: "2% Annual HOA", industry: "4\u201315% annual HOA", offering: "Inspections, audits, renovation approvals.", comps: [{n:"Marriott Autograph",f:"4% total HOA"},{n:"Proper",f:"10% Total Assessments"}] },
    { type: "Technical Services (Pre-Opening)", chozen: "0.5% Total Dev Cost", industry: "$150K\u2013$250K", offering: "Design-review, architectural standards.", comps: [{n:"Marriott Autograph",f:"$225K"},{n:"Proper",f:"Incl. in $600K upfront"}] },
  ]},
  { category: "Hospitality", compSet: ["Marriott Autograph","Auberge","Proper","Rosewood","Standard","Six Senses","The Well"], rows: [
    { type: "Brand License Fee", chozen: "2% Gross Operating Revenue", industry: "1\u20136%", offering: "Trademark use included.", comps: [{n:"Marriott Autograph",f:"5% Gross Room Sales/Mo"},{n:"Proper",f:"3% GOR + 1% Group"}] },
    { type: "Upfront Fee", chozen: "$100,000", industry: "$250K\u2013$500K", offering: "Applied toward total brand licensing fee.", comps: [{n:"Marriott Autograph",f:"$100K + $400/room >250"},{n:"Proper",f:"$600,000"}] },
    { type: "Technical Services (Pre-Opening)", chozen: "0.5% Total Dev Cost", industry: "0.1\u20130.5% dev cost", offering: "Design-review, architectural & brand standards.", comps: [{n:"Proper",f:"Tied to $600K upfront"}] },
    { type: "Experiential Brand Audit", chozen: "$20,000", industry: "$20,000", offering: "Bi-Annual/Annual guest experience audit. Guest & employee interviews. Owner\u2019s rep at min 2 onsite events.", comps: [{n:"Marriott Autograph",f:"$20K"}] },
  ]},
  { category: "Retail", compSet: ["Flamingo Estates","GOOP","Makeready","Swoon","Dawn Franchino"], rows: [
    { type: "Brand License Fee", chozen: "3% Total Projected Sales", industry: "3\u201315%", offering: "Trademark use included.", comps: [] },
    { type: "Tech Services \u2014 B&M + Website", chozen: "Starting at $40,000", industry: "$4K\u2013$60K ($150/sf)", offering: "Baseline 650sf ($500/sf thereafter). Concept Deck, Product Deck, up to 12 SKUs, Layout/Design, FFE/OSE, Install, Budget, Weekly Calls.", comps: [{n:"Makeready",f:"$50K"},{n:"Swoon",f:"$40K"},{n:"Dawn Franchino",f:"$65K B&M / $15K Ecomm"}] },
    { type: "Tech Services \u2014 OS&E for Hotel", chozen: "Starting at $15,000", industry: "Incl. in Operator\u2019s fee", offering: "Baseline 50 keys. CPG selection for branded residences/hospitality.", comps: [] },
    { type: "Tech Services (Ongoing Quarterly)", chozen: "$15,000/quarter", industry: "$20K\u2013$35K/qtr", offering: "Inventory & merchandising for store, website, branded residences & hospitality.", comps: [{n:"Makeready",f:"$25K\u2013$35K/qtr"},{n:"Swoon",f:"$20K/qtr"}] },
    { type: "Annual Brand Audit", chozen: "$20,000", industry: "\u2014", offering: "Guest, employee, top client interviews. Owner\u2019s rep visits 2x/year.", comps: [] },
  ]},
  { category: "Programming & Events", compSet: ["Marriott Autograph","Proper","Makeready"], rows: [
    { type: "Events Consulting", chozen: "5% Total Event Budget", industry: "10\u201320%", offering: "Seasonal events. Wellness: hikes, meditation, breathwork, yoga.", comps: [{n:"Marriott Autograph",f:"2.02% Gross Rooms/Mo"}] },
    { type: "Membership Advisement", chozen: "5% Projected Sales/Qtr + 1% Referral", industry: "1\u20132%", offering: "Quarterly advisement on multi-year contract.", comps: [] },
    { type: "Marketing & PR Advisement", chozen: "1% GOR / Quarterly", industry: "Project Dependent", offering: "Quarterly reviews. Monthly advisory for residential & hotel programming.", comps: [{n:"Marriott Autograph",f:"1.5% GRS/Mo"},{n:"Proper",f:"1% GOR"}] },
    { type: "Community Building", chozen: "1% Annual Events Rev (less weddings)", industry: "Project Dependent", offering: "CHOZEN-specific offering and unique brand positioning.", comps: [] },
  ]},
];

const MEMBERSHIP = {
  note: "CHOZEN Membership: Project Dependent (Ownership TBD). Services & amenities to be determined, then appropriate comps and pricing set. Membership fees flow to hotel/residential entities; CHOZEN brand fee captures a portion through % of Gross Operating Revenue.",
  comps: [
    { name: "SoHo House", init: "\u2014", annual: "$2,000 avg", all: "$5,200", model: "Membership" },
    { name: "Carillon Wellness", init: "$7.5K\u2013$10K", annual: "$7,800", all: "N/A", model: "Membership" },
    { name: "Golden Door", init: "\u2014", annual: "~$12K/week all-inclusive", all: "N/A", model: "Workshop" },
    { name: "Windsor Beach", init: "$35K\u2013$100K+", annual: "$12K\u2013$15K+", all: "N/A", model: "Membership" },
    { name: "John\u2019s Island", init: "$125K+", annual: "$20K\u2013$30K+", all: "N/A", model: "Membership" },
    { name: "Esalen", init: "\u2014", annual: "~$3,500/week", all: "N/A", model: "Workshop" },
    { name: "The Well", init: "$3K\u2013$10K", annual: "$5K\u2013$7K", all: "N/A", model: "Membership" },
  ],
};

// ── Granular builder items: every individual service the user can pick ──
const MENU = [
  { id: "res-brand", vertical: "Residences", color: "#4A5D23", item: "Brand / License", desc: "Trademark use, brand standards, market exclusivity", fee: "2% Gross Sales", pct: 0.02, input: "grossSales", inputLabel: "Projected Gross Sales", inputDefault: 50000000 },
  { id: "res-tech", vertical: "Residences", color: "#4A5D23", item: "Technical Services", desc: "Design-review, architectural standards, pre-opening", fee: "0.5% Dev Cost", pct: 0.005, input: "resDevCost", inputLabel: "Total Development Cost", inputDefault: 100000000 },
  { id: "res-mgmt", vertical: "Residences", color: "#4A5D23", item: "Brand Management", desc: "Inspections, audits, renovation approvals", fee: "2% Annual HOA", pct: 0.02, input: "annualHOA", inputLabel: "Total Annual HOA", inputDefault: 2000000 },
  { id: "res-sale", vertical: "Residences", color: "#4A5D23", item: "For-Sale Branded Residences", desc: "Brokerage for branded residence sales", fee: "$100K Upfront", fixed: 100000 },
  { id: "res-member", vertical: "Residences", color: "#4A5D23", item: "Memberships", desc: "Residential membership program", fee: "Project Dependent", fixed: 0 },

  { id: "hosp-brand", vertical: "Hospitality", color: "#3A6B7E", item: "Hotels & Retreats", desc: "Brand licensing for hotels and retreat centers", fee: "2% GOR", pct: 0.02, input: "hospGOR", inputLabel: "Gross Operating Revenue", inputDefault: 15000000 },
  { id: "hosp-tech", vertical: "Hospitality", color: "#3A6B7E", item: "Technical Services", desc: "Design-review, architectural & brand standards", fee: "0.5% Dev Cost", pct: 0.005, input: "hospDevCost", inputLabel: "Total Development Cost", inputDefault: 60000000 },
  { id: "hosp-str", vertical: "Hospitality", color: "#3A6B7E", item: "Short-Term Rentals", desc: "Branded short-term rental operations", fee: "$100K Upfront", fixed: 100000 },
  { id: "hosp-audit", vertical: "Hospitality", color: "#3A6B7E", item: "Experiential Brand Audit", desc: "Guest & employee interviews, bi-annual site visits", fee: "$20K/year", fixed: 20000 },
  { id: "hosp-member", vertical: "Hospitality", color: "#3A6B7E", item: "Memberships", desc: "Hospitality membership program", fee: "Project Dependent", fixed: 0 },

  { id: "ret-brand", vertical: "Retail", color: "#B8963E", item: "Brick & Mortar", desc: "Brand licensing for physical retail", fee: "3% Total Sales", pct: 0.03, input: "retSales", inputLabel: "Projected Annual Sales", inputDefault: 2000000 },
  { id: "ret-concept", vertical: "Retail", color: "#B8963E", item: "Concepting & Consulting", desc: "Concept deck, product dev, layout/design", fee: "$40K Pre-Opening", fixed: 40000 },
  { id: "ret-cpg", vertical: "Retail", color: "#B8963E", item: "Chozen CPG", desc: "OS&E selection for hotel + ongoing quarterly merch", fee: "$75K First Year", fixed: 75000 },

  { id: "well-cust", vertical: "Wellness / Spa", color: "#8B6B4A", item: "Customer-Facing Wellness", desc: "Spa, thermal therapy, wellness experiences", fee: "Project Dependent", fixed: 0 },
  { id: "well-it", vertical: "Wellness / Spa", color: "#8B6B4A", item: "Back-end IT", desc: "Booking, scheduling, and wellness tech systems", fee: "TBD", fixed: 0 },

  { id: "tech-app", vertical: "Technology", color: "#5A5A6B", item: "Customer-facing App", desc: "Guest/member app, digital experience layer", fee: "TBD", fixed: 0 },
  { id: "tech-it", vertical: "Technology", color: "#5A5A6B", item: "Back-end IT", desc: "Infrastructure, integrations, data platform", fee: "TBD", fixed: 0 },

  { id: "prog-events", vertical: "Programming", color: "#6B4A6B", item: "Events Consulting", desc: "Seasonal events, equinoxes, wellness gatherings", fee: "5% Event Budget", pct: 0.05, input: "eventBudget", inputLabel: "Annual Event Budget", inputDefault: 500000 },
  { id: "prog-member", vertical: "Programming", color: "#6B4A6B", item: "Membership Advisement", desc: "Multi-year membership strategy & pricing", fee: "5% Membership Sales", pct: 0.05, input: "memberSales", inputLabel: "Projected Membership Sales", inputDefault: 1000000 },
  { id: "prog-mktg", vertical: "Programming", color: "#6B4A6B", item: "Marketing & PR", desc: "Quarterly reviews, monthly advisory sessions", fee: "1% GOR", pct: 0.01, input: "progGOR", inputLabel: "Gross Operating Revenue", inputDefault: 15000000 },
  { id: "prog-community", vertical: "Programming", color: "#6B4A6B", item: "Community Building", desc: "Neighborhood dev, community events, onsite experiences", fee: "1% Events Rev", pct: 0.01, input: "eventsRev", inputLabel: "Annual Events Revenue", inputDefault: 800000 },
];

const PILLARS = [
  { icon: "\uD83C\uDF31", title: "Regenerative Onsite Agriculture", yesLabel: "TRUE ORGANIC ONSITE AGRICULTURE", noLabel: "CONVENTIONAL EXTERNAL FOOD SOURCING", yes: "Regenerative onsite agriculture model rooted in native biodiversity and organic production. Food as medicine. Land health through data-driven sustainability.", no: "No greenwashing. No chemical fertilizers, synthetic pesticides, fungicides, or herbicides. No growing only annuals or ornamental non-edible plants.", tags: ["Soil Health", "Agroforestry", "Permaculture", "Syntropic Farming"] },
  { icon: "\u2726", title: "Holistic Wellbeing", yesLabel: "VITALITY INSPIRED BY NATURE", noLabel: "HUMAN UPGRADE COSPLAY", yes: "Performance, longevity, and regenerative healing through advanced wellness technology and practitioner access.", no: "No superficial wellness tactics or unqualified practitioners.", tags: ["Nature-Based Rhythms", "Thermal Therapy", "Longevity"] },
  { icon: "\uD83C\uDF3F", title: "Every Day Whole Food Access", yesLabel: "WHOLE FOOD ACCESS", noLabel: "WHOLE FOOD DESERT", yes: "Nutritious, whole meals from locally sourced, regenerative ingredients.", no: "No global corporate food distributors. No factory-farmed proteins.", tags: ["Curated Grocer", "Local Retailers", "Low Waste", "Caf\u00e9"] },
  { icon: "\uD83C\uDF3F", title: "Access to Untamed Land", yesLabel: "ACCESS TO UNTAMED LAND", noLabel: "CONFINED TO BUILT ENVIRONMENT", yes: "Minimum five acres of natural environment. Direct access to open, undeveloped landscapes.", no: "Not situated in dense urban environments without meaningful nature access.", tags: ["50% Conservation", "Microforests", "Open Space"] },
  { icon: "\uD83D\uDD25", title: "Primal Interactions", yesLabel: "PRIMAL INTERACTIONS", noLabel: "PERFORMATIVE NATURE", yes: "Environments that reawaken the body\u2019s innate connection to nature through movement and sensory immersion.", no: "No staged activities, artificial props, or curated photo-ops.", tags: ["ChoZen Flow", "Rewilding", "Off-Grid Zone", "Presence"] },
  { icon: "\uD83E\uDD1D", title: "Conscious Community", yesLabel: "CULTIVATING COMMUNITY", noLabel: "DISCONNECTED LIFESTYLE", yes: "Seasonal events, wellness gatherings, group hikes, meditation, breathwork, yoga.", no: "No transactional, impersonal programming lacking seasonal alignment.", tags: ["Tech-Free Spaces", "Memberships", "Shared Rituals"] },
  { icon: "\uD83C\uDFD7", title: "Regenerative Design", yesLabel: "REGENERATIVE DESIGN", noLabel: "ECOLOGICALLY HARMFUL DESIGN", yes: "Regenerative Placemaking standards. High-performance building systems, renewable energy, sustainable materials.", no: "No low-performance systems, harmful materials, or depleting practices.", tags: ["Biophilia", "Local Materials", "Net Zero", "Water Quality"] },
  { icon: "\u267B\uFE0F", title: "Circular Operations", yesLabel: "CLOSED-LOOP OPERATIONS", noLabel: "CONVENTIONAL MANAGEMENT", yes: "Smart energy, renewable power, toxin-free cleaning, local food. No plastics.", no: "No wasteful energy, chemical-laden products, or single-use plastics.", tags: ["No Plastics", "Solar", "Compost", "Aspiring Net Zero"] },
  { icon: "\u2764\uFE0F", title: "Serving Local Community", yesLabel: "SERVING THE COMMUNITY", noLabel: "EXTRACTIVE ECONOMICS", yes: "Partnerships with local non-profits. Marine and land conservation. ESG-focused scholarships.", no: "Not an isolated or extractive model that overlooks local impact.", tags: ["Makers Spaces", "Artisan Markets", "Artist Residencies"] },
  { icon: "\uD83C\uDFFA", title: "Sacred Retail \u2014 Casa Colibri", yesLabel: "SACRED RETAIL", noLabel: "MASS-PRODUCED & GREENWASHED", yes: "Curates only brands meeting rigorous standards for ingredient quality, ethical sourcing. Local artisans, recyclable/refillable offerings.", no: "No mass-produced or low-quality products. No virgin plastics or greenwashed wellness products.", tags: ["Casa Colibri IP", "Artisanal", "Indigenous Sacred Goods"] },
];

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 40); let cur = ""; document.querySelectorAll("section[id]").forEach((s) => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; }); setActive(cur); };
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [{ href: "#builder", label: "IP Builder" }, { href: "#fee-summary", label: "Fees" }, { href: "#fees", label: "Fee Schedule" }, { href: "#brand", label: "Brand" }];
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="navInner">
        <a href="#" className="navLogo">CHOZEN</a>
        <div className={`navLinks ${open ? "open" : ""}`}>{links.map((l) => <a key={l.href} href={l.href} className={active === l.href.slice(1) ? "active" : ""} onClick={() => setOpen(false)}>{l.label}</a>)}</div>
        <button className="navToggle" onClick={() => setOpen(!open)} aria-label="Menu"><span /><span /><span /></button>
      </div>
    </nav>
  );
}

function PillarCard({ p }) {
  return (
    <div className="pillarCard" style={{ marginBottom: 24 }}>
      <div style={{ padding: "20px 28px", background: "var(--cream)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.3rem", color: "var(--earth)", display: "flex", alignItems: "center", gap: 14 }}>
          <span className="pillarIcon">{p.icon}</span>{p.title}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid var(--border)" }}>
        <div style={{ padding: "14px 28px", background: "linear-gradient(135deg, var(--moss), #6B8F3C)", color: "white", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>{"\u2713"} We Are</div>
        <div style={{ padding: "14px 28px", background: "linear-gradient(135deg, #6B4A4A, #8B3A3A)", color: "white", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>{"\u2715"} We Are Not</div>
      </div>
      <div className="pillarBody"><div className="pillarCol"><p>{p.yes}</p></div><div className="pillarCol"><p>{p.no}</p></div></div>
      {p.tags.length > 0 && <div className="pillarTags">{p.tags.map((t) => <span key={t} className="pillarTag">{t}</span>)}</div>}
    </div>
  );
}

function BrandTabs() {
  const [tab, setTab] = useState("res-hosp");
  const resHosp = PILLARS.filter((p) => p.title !== "Sacred Retail \u2014 Casa Colibri");
  const retail = PILLARS.find((p) => p.title === "Sacred Retail \u2014 Casa Colibri");
  return (<>
    <div className="tabs">
      <button className={`tabBtn ${tab === "res-hosp" ? "active" : ""}`} onClick={() => setTab("res-hosp")}>Residences &amp; Hospitality</button>
      <button className={`tabBtn ${tab === "retail" ? "active" : ""}`} onClick={() => setTab("retail")}>Sacred Retail</button>
    </div>
    {tab === "res-hosp" && resHosp.map((p, i) => <PillarCard key={i} p={p} />)}
    {tab === "retail" && retail && <PillarCard p={retail} />}
  </>);
}

// ═══════════════════════════════════════════════════════════════
// IP PACKAGE BUILDER (mix & match individual items)
// ═══════════════════════════════════════════════════════════════

function fmt(n) { return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 }); }

function IPBuilder() {
  const [picked, setPicked] = useState({});
  const [vals, setVals] = useState({});

  const toggle = (id) => {
    setPicked((p) => {
      const next = { ...p, [id]: !p[id] };
      if (next[id]) {
        const item = MENU.find((m) => m.id === id);
        if (item.input && !vals[item.input]) {
          setVals((v) => ({ ...v, [item.input]: item.inputDefault }));
        }
      }
      return next;
    });
  };

  const setInput = (key, raw) => {
    setVals((v) => ({ ...v, [key]: parseInt(raw.replace(/[^0-9]/g, ""), 10) || 0 }));
  };

  // Group menu by vertical
  const verticals = [...new Set(MENU.map((m) => m.vertical))];
  const pickedItems = MENU.filter((m) => picked[m.id]);

  // Collect unique inputs needed
  const neededInputs = {};
  pickedItems.forEach((m) => {
    if (m.input && !neededInputs[m.input]) neededInputs[m.input] = { key: m.input, label: m.inputLabel, default: m.inputDefault };
  });

  // Calculate totals
  let grandTotal = 0;
  const results = pickedItems.map((m) => {
    let amount = 0;
    if (m.fixed) amount = m.fixed;
    else if (m.pct && m.input) amount = (vals[m.input] || 0) * m.pct;
    grandTotal += amount;
    return { ...m, amount };
  });

  // Group results by vertical
  const resultsByVertical = {};
  results.forEach((r) => {
    if (!resultsByVertical[r.vertical]) resultsByVertical[r.vertical] = { items: [], total: 0, color: r.color };
    resultsByVertical[r.vertical].items.push(r);
    resultsByVertical[r.vertical].total += r.amount;
  });

  return (
    <div>
      {/* Menu — grouped by vertical */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 20 }}>Select the services you want in your package</div>
        {verticals.map((vName) => {
          const items = MENU.filter((m) => m.vertical === vName);
          const color = items[0].color;
          return (
            <div key={vName} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", color, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: color, display: "inline-block" }} />
                {vName}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
                {items.map((m) => (
                  <button key={m.id} onClick={() => toggle(m.id)} style={{ padding: "14px 16px", borderRadius: 8, border: picked[m.id] ? `2px solid ${m.color}` : "1px solid var(--border)", background: picked[m.id] ? `${m.color}0D` : "white", cursor: "pointer", textAlign: "left", transition: "0.15s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: picked[m.id] ? m.color : "var(--earth)" }}>{m.item}</div>
                      {picked[m.id] && <span style={{ fontSize: "0.7rem", color: m.color, fontWeight: 700 }}>{"\u2713"}</span>}
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "var(--text-light)", marginTop: 2, lineHeight: 1.4 }}>{m.desc}</div>
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, color: m.color, marginTop: 6 }}>{m.fee}</div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Inputs — only show what's needed */}
      {Object.keys(neededInputs).length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 16 }}>Enter your project numbers</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
            {Object.values(neededInputs).map((inp) => (
              <div key={inp.key} style={{ background: "white", borderRadius: 8, border: "1px solid var(--border)", padding: "16px 20px" }}>
                <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, color: "var(--text-light)", letterSpacing: "0.05em", marginBottom: 6 }}>{inp.label}</label>
                <input type="text" value={fmt(vals[inp.key] || 0)} onChange={(e) => setInput(inp.key, e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: "1px solid var(--border)", fontSize: "0.88rem", fontWeight: 600, color: "var(--earth)", fontFamily: "var(--font-body)", outline: "none" }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {pickedItems.length > 0 && (
        <div>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 16 }}>Your IP package estimate</div>
          <div style={{ background: "linear-gradient(135deg, var(--earth), #2A3420)", borderRadius: "var(--radius)", padding: "28px 32px", color: "white", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sage)", marginBottom: 4 }}>Estimated Contract Value</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 600 }}>{fmt(grandTotal)}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--sand)", marginTop: 4 }}>{pickedItems.length} service{pickedItems.length !== 1 ? "s" : ""} selected across {Object.keys(resultsByVertical).length} vertical{Object.keys(resultsByVertical).length !== 1 ? "s" : ""}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {Object.entries(resultsByVertical).map(([name, data]) => (
                <span key={name} style={{ padding: "6px 16px", borderRadius: 20, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", fontSize: "0.72rem", fontWeight: 600 }}>{name}: {fmt(data.total)}</span>
              ))}
            </div>
          </div>
          {Object.entries(resultsByVertical).map(([name, data]) => (
            <div key={name} style={{ background: "white", borderRadius: "var(--radius)", border: "1px solid var(--border)", marginBottom: 16, overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", background: data.color, color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: "0.82rem" }}>{name}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600 }}>{fmt(data.total)}</span>
              </div>
              <div style={{ padding: "0 20px" }}>
                {data.items.map((f, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < data.items.length - 1 ? "1px solid rgba(200,185,154,0.12)" : "none" }}>
                    <div><div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--earth)" }}>{f.item}</div><div style={{ fontSize: "0.7rem", color: "var(--text-light)" }}>{f.fee}</div></div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: f.amount > 0 ? "var(--moss)" : "var(--text-light)" }}>{f.amount > 0 ? fmt(f.amount) : "TBD"}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {pickedItems.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--text-light)", fontSize: "0.88rem", background: "white", borderRadius: "var(--radius)", border: "1px dashed var(--border)" }}>
          Pick any combination of services above to build a custom IP package and see your estimated fee structure.
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// BRAND BOOK MODAL
// ═══════════════════════════════════════════════════════════════

// SVG symbols traced from brand book
function SymbolSVG({ id, size = 64 }) {
  const s = size;
  const c = s / 2;
  const r = s * 0.44;
  const stroke = "var(--earth)";
  const sw = 1.5;
  const common = { width: s, height: s, viewBox: `0 0 ${s} ${s}`, fill: "none", xmlns: "http://www.w3.org/2000/svg" };

  // 1: CHOZEN — full logo: circle + X + wavy centerline + triangle details
  if (id === "chozen") return (
    <svg {...common}>
      <circle cx={c} cy={c} r={r} stroke={stroke} strokeWidth={sw} />
      <line x1={c - r * 0.71} y1={c - r * 0.71} x2={c + r * 0.71} y2={c + r * 0.71} stroke={stroke} strokeWidth={sw} />
      <line x1={c + r * 0.71} y1={c - r * 0.71} x2={c - r * 0.71} y2={c + r * 0.71} stroke={stroke} strokeWidth={sw} />
      <line x1={c - r} y1={c} x2={c + r} y2={c} stroke={stroke} strokeWidth={sw} />
      <path d={`M ${c - r * 0.7} ${c} Q ${c - r * 0.35} ${c - r * 0.22} ${c} ${c} Q ${c + r * 0.35} ${c + r * 0.22} ${c + r * 0.7} ${c}`} stroke={stroke} strokeWidth={sw} />
      <line x1={c - r * 0.71} y1={c + r * 0.71} x2={c} y2={c - r * 0.3} stroke={stroke} strokeWidth={sw * 0.6} strokeOpacity={0.4} />
      <line x1={c + r * 0.71} y1={c + r * 0.71} x2={c} y2={c - r * 0.3} stroke={stroke} strokeWidth={sw * 0.6} strokeOpacity={0.4} />
    </svg>
  );

  // 2: Water — circle + curved wave
  if (id === "water") return (
    <svg {...common}>
      <circle cx={c} cy={c} r={r} stroke={stroke} strokeWidth={sw} />
      <path d={`M ${c - r * 0.85} ${c} Q ${c - r * 0.42} ${c - r * 0.35} ${c} ${c} Q ${c + r * 0.42} ${c + r * 0.35} ${c + r * 0.85} ${c}`} stroke={stroke} strokeWidth={sw} />
    </svg>
  );

  // 3: Unity — empty circle
  if (id === "unity") return (
    <svg {...common}>
      <circle cx={c} cy={c} r={r} stroke={stroke} strokeWidth={sw} />
    </svg>
  );

  // 4: Divine Feminine — circle + X + inner smaller circle
  if (id === "divine") return (
    <svg {...common}>
      <circle cx={c} cy={c} r={r} stroke={stroke} strokeWidth={sw} />
      <line x1={c - r * 0.71} y1={c - r * 0.71} x2={c + r * 0.71} y2={c + r * 0.71} stroke={stroke} strokeWidth={sw} />
      <line x1={c + r * 0.71} y1={c - r * 0.71} x2={c - r * 0.71} y2={c + r * 0.71} stroke={stroke} strokeWidth={sw} />
      <circle cx={c} cy={c} r={r * 0.35} stroke={stroke} strokeWidth={sw * 0.8} />
    </svg>
  );

  // 5: Balance — circle + X (no inner circle)
  if (id === "balance") return (
    <svg {...common}>
      <circle cx={c} cy={c} r={r} stroke={stroke} strokeWidth={sw} />
      <line x1={c - r * 0.71} y1={c - r * 0.71} x2={c + r * 0.71} y2={c + r * 0.71} stroke={stroke} strokeWidth={sw} />
      <line x1={c + r * 0.71} y1={c - r * 0.71} x2={c - r * 0.71} y2={c + r * 0.71} stroke={stroke} strokeWidth={sw} />
    </svg>
  );

  // 6: Activism — hourglass / bowtie (no circle)
  if (id === "activism") return (
    <svg {...common}>
      <polygon points={`${c - r * 0.6},${c - r * 0.65} ${c + r * 0.6},${c - r * 0.65} ${c},${c}`} stroke={stroke} strokeWidth={sw} fill="none" />
      <polygon points={`${c - r * 0.6},${c + r * 0.65} ${c + r * 0.6},${c + r * 0.65} ${c},${c}`} stroke={stroke} strokeWidth={sw} fill="none" />
    </svg>
  );

  return null;
}

const BOOK_PAGES = [
  { img: "/brand/cover.jpg", title: "Brand Book 2025" },
  { img: "/brand/vision.jpg", title: "Our Shared Vision", subtitle: "Rewilding Hearts & Minds in the Heart of Florida", text: "We gather thought leaders, changemakers, community builders and placemakers from around the world who seek to explore regenerative systems and implement climate solutions. By reconnecting with the land and fully immersing our guests in a regenerative lifestyle, we provide a unique culture and vibrant environment to inspire positive change & transformation for future generations." },
  { img: "/brand/principles.jpg", title: "Principles of the Chozen Path", items: [
    { bold: "Reunite with your Inner Self", text: "Develop a conscious awareness of your mind, body, emotions and senses" },
    { bold: "Reconnect with Nature", text: "Live in acknowledgment that we are not above or separate from Nature, but part of its larger ecosystem of all life on this planet" },
    { bold: "Honor the Sacred", text: "Follow the guidance of all life forms, as well as our ancestors to honor their spirit and connect with their wisdom" },
    { bold: "Assemble with Community", text: "Gather with thought leaders, changemakers and community builders focused on raising consciousness to harness our collective momentum" },
    { bold: "Embrace Regenerative Systems", text: "Act in accordance with our shared ethos for a sustainable future by helping to co-create regenerative systems for a climate positive world" },
    { bold: "Empower the Future", text: "Actively participate in the co-creation of our future to restore humanity and our planet\u2019s health" },
  ]},
  { img: "/brand/mission.jpg", title: "Our Mission", subtitle: "Nature is Medicine. Food is Medicine. Community is Medicine.", text: "Our mission is to inspire action to protect mother nature and all of her inhabitants. Through immersive & educational experiences, adventures & excursions we are transforming the way we retreat. We co-create, coexist and come together to celebrate and restore ecological balance while preserving wildlife and our natural environment." },
  { img: "/brand/ethos1.jpg", title: "Ethos", lines: ["CHOZEN is a place to discover yourself in nature", "A place to experience deep serenity by living in harmony with the natural ecosystem", "Where we honor mother earth and the elements", "Create in dialogue with our planet", "Integrate in nature and experience deep, restorative wellness", "Reconnect with the cosmos: the stars, the moon, the sun, the sky", "Take action to protect humanity\u2019s future", "Commune with wildlife", "Give thanks to those who walked before us", "Walk the Chozen Path"] },
  { img: "/brand/ethos2.jpg", title: "Ethos \u2014 Nature + Zen", venn: true },
  { img: "/brand/symbols.jpg", title: "Chozen Symbols", symbols: [
    { svgId: "chozen", name: "CHOZEN", meaning: "The complete mark" },
    { svgId: "water", name: "Water / River", meaning: "Source of Life" },
    { svgId: "unity", name: "Unity / Wholeness", meaning: "Infinity" },
    { svgId: "divine", name: "Divine Feminine", meaning: "Divine Mother\nMother Nature" },
    { svgId: "balance", name: "Balance", meaning: "So Above & So Below\nTime is Now\nEarth & Sky" },
    { svgId: "activism", name: "Activism", meaning: "Action\nChoice" },
  ]},
  { img: "/brand/logo-explain.jpg", title: "Logo Explanation", text: "The ChoZen logo represents the unity of humanity and the planet, the marriage of the divine feminine and masculine, the balance of Yin and Yang, the duality of our two brain hemispheres, and the polarity of the Earth and Skies. An hourglass lives within the logo, a reminder of the preciousness of time and the urgency to restore harmony on Earth. The centerline represents the vitality of water, a constant, flowing force that is the source of all life. You can find all of the ChoZen letters embedded within the design." },
  { img: "/brand/logo-decon.jpg", title: "Logo Deconstruction" },
  { img: "/brand/voice-tone.jpg", title: "Voice & Tone", voice: [
    { bold: "Empowered", text: "We use positive words that are aspirational and inspired to embody our passionate ethos" },
    { bold: "Balance of Feminine + Masculine", text: "We play between soft and direct language to show the equal balance of our poetic yet affirmative voice" },
    { bold: "Sacred & Soulful", text: "We use language that ignites awakening, self-expression and transformation" },
    { bold: "Active", text: "We speak in the active voice in statements pertaining to activism and action" },
    { bold: "Authentic", text: "We value honesty and transparency in conveying our message" },
    { bold: "Natural", text: "We educate on the human-nature connection through language that is poetic yet scientific" },
  ], tone: [
    { bold: "Warm", text: "We write like we would to a friend to make them feel welcomed in an intimate, safe environment" },
    { bold: "Soft", text: "We use a soft tone in collateral that takes the form of poetry to transport our readers and guests" },
    { bold: "Socially Aware", text: "We ensure that our message is culturally aware and sensitive to all topics" },
  ], toneNot: ["Dogmatic or overly spiritual", "Too technical", "Too formal", "Negative or corporate", "Self-helpy"] },
  { img: "/brand/aesthetic.jpg", title: "Brand Aesthetic", subtitle: "A Camp for the Humanity of the Future Where Nature is the Ceremony", text: "The ChoZen visual identity is a sophisticated, intentional, organic and wild portfolio of the ChoZen Lifestyle. Designed to evoke the feeling of being ChoZen\u2014immersed in beauty, nature, and conscious community. The aesthetic lives as a curated grid that balances ritual, regeneration, and refinement across every visual and message." },
  { img: "/brand/wildlife.jpg", title: "Florida Wildlife Corridor", text: "The Florida Wildlife Corridor spans 18 million acres, but only 54% is protected, leaving 8.1 million acres vulnerable to development. If current trends continue, Florida could lose another 3.5 million acres of natural land by 2070, threatening key species like the Florida panther and swallow-tailed kite. This habitat loss disrupts biodiversity and weakens essential ecosystem services like clean water, flood protection, and carbon sequestration." },
];

function BrandBookModal({ onClose }) {
  const [page, setPage] = useState(0);
  const p = BOOK_PAGES[page];
  const total = BOOK_PAGES.length;

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight" && page < total - 1) setPage(page + 1); if (e.key === "ArrowLeft" && page > 0) setPage(page - 1); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [page, onClose]);

  const overlay = { position: "fixed", inset: 0, zIndex: 1000, background: "rgba(30,26,20,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 };
  const modal = { background: "var(--warm-white)", borderRadius: 16, maxWidth: 900, width: "100%", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" };
  const header = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid var(--border)" };
  const body = { flex: 1, overflow: "auto", padding: "32px 40px" };
  const navRow = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderTop: "1px solid var(--border)" };
  const navBtn = (disabled) => ({ padding: "8px 20px", borderRadius: 6, border: "1px solid var(--border)", background: disabled ? "transparent" : "var(--earth)", color: disabled ? "var(--text-light)" : "white", cursor: disabled ? "default" : "pointer", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", opacity: disabled ? 0.4 : 1 });
  const closeBtn = { background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "var(--text-light)", padding: "4px 8px" };

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <div style={header}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--earth)" }}>Brand Book</span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-light)" }}>{page + 1} / {total}</span>
            <button style={closeBtn} onClick={onClose}>{"\u2715"}</button>
          </div>
        </div>
        <div style={body}>
          {/* Page Title */}
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 400, color: "var(--earth)", marginBottom: p.subtitle || p.text ? 12 : 0 }}>{p.title}</h2>
          {p.subtitle && <p style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 16 }}>{p.subtitle}</p>}
          {p.text && <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "var(--text-mid)", maxWidth: 680 }}>{p.text}</p>}

          {/* Principles / Items list */}
          {p.items && <div style={{ marginTop: 16 }}>{p.items.map((item, i) => (
            <div key={i} style={{ padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontWeight: 700, color: "var(--earth)" }}>{item.bold}</span>
              <span style={{ color: "var(--text-mid)" }}> &mdash; {item.text}</span>
            </div>
          ))}</div>}

          {/* Ethos Lines */}
          {p.lines && <div style={{ marginTop: 20, textAlign: "center" }}>{p.lines.map((l, i) => (
            <p key={i} style={{ fontSize: "0.85rem", letterSpacing: "0.06em", color: "var(--text-mid)", padding: "6px 0", lineHeight: 1.6 }}>. . .{l}. . .</p>
          ))}</div>}

          {/* Venn diagram page — show image */}
          {p.venn && <div style={{ marginTop: 20, textAlign: "center" }}><img src={p.img} alt={p.title} style={{ maxWidth: "100%", borderRadius: 8 }} /></div>}

          {/* Symbols */}
          {p.symbols && <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 16, marginTop: 20 }}>{p.symbols.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "20px 12px", background: "var(--cream)", borderRadius: 8 }}>
              <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}><SymbolSVG id={s.svgId} size={56} /></div>
              <div style={{ fontWeight: 700, fontSize: "0.78rem", color: "var(--earth)", marginBottom: 6, letterSpacing: "0.04em" }}>{s.name}</div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-light)", lineHeight: 1.5, whiteSpace: "pre-line" }}>{s.meaning}</div>
            </div>
          ))}</div>}

          {/* Voice & Tone */}
          {p.voice && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 20 }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--earth)", marginBottom: 16 }}>Voice</h3>
                {p.voice.map((v, i) => <div key={i} style={{ marginBottom: 14 }}><span style={{ fontWeight: 700, color: "var(--earth)" }}>{v.bold}:</span> <span style={{ color: "var(--text-mid)", fontSize: "0.85rem" }}>{v.text}</span></div>)}
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--earth)", marginBottom: 16 }}>Tone</h3>
                {p.tone.map((t, i) => <div key={i} style={{ marginBottom: 14 }}><span style={{ fontWeight: 700, color: "var(--earth)" }}>{t.bold}:</span> <span style={{ color: "var(--text-mid)", fontSize: "0.85rem" }}>{t.text}</span></div>)}
                <div style={{ marginTop: 20, padding: 16, background: "rgba(139,58,58,0.04)", borderRadius: 8, border: "1px solid rgba(139,58,58,0.1)" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.78rem", color: "#8B3A3A", marginBottom: 8 }}>Our voice and tone is not:</div>
                  {p.toneNot.map((n, i) => <div key={i} style={{ fontSize: "0.78rem", color: "var(--text-mid)", padding: "3px 0" }}>{"\u2715"} {n}</div>)}
                </div>
              </div>
            </div>
          )}

          {/* Image-only pages (cover, logo decon) */}
          {!p.text && !p.items && !p.lines && !p.venn && !p.symbols && !p.voice && page !== 0 && (
            <div style={{ marginTop: 16 }}><img src={p.img} alt={p.title} style={{ maxWidth: "100%", borderRadius: 8 }} /></div>
          )}
          {page === 0 && <div style={{ marginTop: 24, textAlign: "center" }}><img src={p.img} alt="Brand Book Cover" style={{ maxWidth: "100%", borderRadius: 8 }} /></div>}
        </div>
        <div style={navRow}>
          <button style={navBtn(page === 0)} onClick={() => page > 0 && setPage(page - 1)}>{"\u2190"} Previous</button>
          <div style={{ display: "flex", gap: 4 }}>{BOOK_PAGES.map((_, i) => <span key={i} onClick={() => setPage(i)} style={{ width: 8, height: 8, borderRadius: "50%", background: i === page ? "var(--moss)" : "var(--border)", cursor: "pointer", transition: "0.2s" }} />)}</div>
          <button style={navBtn(page === total - 1)} onClick={() => page < total - 1 && setPage(page + 1)}>Next {"\u2192"}</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  const [bookOpen, setBookOpen] = useState(false);
  return (
    <>
      <Nav />
      {bookOpen && <BrandBookModal onClose={() => setBookOpen(false)} />}

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="heroContent">
          <p className="heroEyebrow">Center for Regenerative Living</p>
          <h1 className="heroTitle">CHOZEN</h1>
          <p className="heroSub">IP Offering &amp; Brand Framework</p>
          <div className="heroLine" />
          <div className="heroScroll"><a href="#builder">Explore</a></div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section" style={{ paddingBottom: 40, textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "var(--earth)", lineHeight: 1.7, marginBottom: 16 }}>
            CHOZEN is a licensable intellectual property platform built around regenerative living.
            It packages brand, design, technology, and programming into a flexible IP that developers,
            hospitality operators, and investors can license across six distinct verticals.
          </p>
          <p style={{ fontSize: "0.88rem", color: "var(--text-light)", lineHeight: 1.7 }}>
            Each vertical can be licensed independently or combined to create a fully integrated
            regenerative development. Below, you&apos;ll find an interactive builder to explore what a custom
            package might look like, along with detailed fee benchmarks and brand guidelines.
          </p>
        </div>
      </section>

      {/* IP BUILDER */}
      <section className="section" id="builder">
        <div className="sectionHeader">
          <p className="sectionEyebrow">Interactive Tool</p>
          <h2 className="sectionTitle">Build Your IP Package</h2>
          <div className="divider" />
          <p className="sectionDesc">
            Mix and match individual services from any vertical to design a custom IP package.
            Select the pieces that fit your project &mdash; a branded residence with retail and events consulting,
            a standalone hospitality license, or a full-stack regenerative development. The tool
            calculates estimated fees in real time as you build.
          </p>
        </div>
        <IPBuilder />
      </section>

      {/* FEE SUMMARY */}
      <section className="sectionAlt" id="fee-summary">
        <div className="sectionInner">
          <div className="sectionHeader">
            <p className="sectionEyebrow">Revenue Model</p>
            <h2 className="sectionTitle">Fee Structure at a Glance</h2>
            <div className="divider" />
            <p className="sectionDesc">
              Seven fee streams flow through the CHOZEN IP entity. The rates below represent
              CHOZEN&apos;s recommended positioning &mdash; significantly below industry averages while
              delivering a differentiated regenerative brand.
            </p>
          </div>
          <div className="feePills">{FEE_PILLS.map((f) => <div key={f.id} className="feePill"><div className="pillId">{f.id}</div><div className="pillValue">{f.value}</div><div className="pillLabel">{f.label}</div><div className="pillDesc">{f.desc}</div></div>)}</div>
        </div>
      </section>

      {/* FEE SCHEDULE */}
      <section className="section" id="fees">
        <div className="sectionHeader">
          <p className="sectionEyebrow">Fee Details</p>
          <h2 className="sectionTitle">IP &amp; Consulting Fee Schedule</h2>
          <div className="divider" />
          <p className="sectionDesc">
            A detailed breakdown of CHOZEN&apos;s recommended fees by vertical, including what&apos;s
            covered under each fee type.
          </p>
        </div>
        {FEES.map((s) => (
          <div key={s.category} className="feeSection">
            <h3 className="feeSectionTitle">{s.category}</h3>
            <div style={{ overflowX: "auto" }}><table className="feeTable"><thead><tr><th>Fee Type</th><th>CHOZEN Fee</th><th>What&apos;s Included</th></tr></thead><tbody>{s.rows.map((r) => (
              <tr key={r.type}><td className="feeType">{r.type}</td><td className="chozenFee">{r.chozen}</td><td className="feeOffering">{r.offering}</td></tr>
            ))}</tbody></table></div>
          </div>
        ))}
      </section>

      {/* BRAND */}
      <section className="section" id="brand">
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div className="sectionHeader"><p className="sectionEyebrow">Brand Identity</p><h2 className="sectionTitle">The CHOZEN Brand Book</h2><div className="divider" /><p className="sectionDesc">Every CHOZEN-branded project carries the full weight of a deeply intentional identity &mdash; from regenerative ethos and sacred symbolism to voice, tone, and visual aesthetic.</p></div>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <button onClick={() => setBookOpen(true)} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 36px", borderRadius: 8, background: "var(--earth)", color: "var(--cream)", border: "none", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.08em", transition: "0.2s" }}>
              Explore Brand Book {"\u2192"}
            </button>
          </div>
          <div className="sectionHeader" style={{ marginBottom: 40 }}><h2 className="sectionTitle">We Are vs. We Are Not</h2><div className="divider" /><p className="sectionDesc">CHOZEN&apos;s brand pillars define our regenerative ethos &mdash; a clear declaration of what we stand for and what we reject.</p></div>
          <BrandTabs />
        </div>
      </section>

      <footer className="footer"><div className="footerLogo">CHOZEN</div><p>Center for Regenerative Living &mdash; IP &amp; Brand Guidelines 2025</p></footer>
    </>
  );
}
