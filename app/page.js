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

const BUILDER = [
  { key: "residences", name: "Residences", color: "#4A5D23", icon: "\uD83C\uDFE0",
    fees: [
      { label: "Brand License Fee", rate: "2% Gross Sales", pct: 0.02, appliesTo: "grossSales" },
      { label: "Upfront Fee", rate: "$100,000", fixed: 100000 },
      { label: "Brand Management Fee", rate: "2% Annual HOA", pct: 0.02, appliesTo: "annualHOA" },
      { label: "Technical Services", rate: "0.5% Dev Cost", pct: 0.005, appliesTo: "devCost" },
    ],
    inputs: [
      { key: "grossSales", label: "Projected Gross Sales", default: 50000000 },
      { key: "annualHOA", label: "Total Annual HOA", default: 2000000 },
      { key: "devCost", label: "Total Development Cost", default: 100000000 },
    ],
  },
  { key: "hospitality", name: "Hospitality", color: "#3A6B7E", icon: "\uD83C\uDFE8",
    fees: [
      { label: "Brand License Fee", rate: "2% GOR", pct: 0.02, appliesTo: "gor" },
      { label: "Upfront Fee", rate: "$100,000", fixed: 100000 },
      { label: "Technical Services", rate: "0.5% Dev Cost", pct: 0.005, appliesTo: "devCost" },
      { label: "Brand Audit", rate: "$20,000/year", fixed: 20000 },
    ],
    inputs: [
      { key: "gor", label: "Gross Operating Revenue", default: 15000000 },
      { key: "devCost", label: "Total Development Cost", default: 60000000 },
    ],
  },
  { key: "retail", name: "Retail", color: "#B8963E", icon: "\uD83D\uDECD\uFE0F",
    fees: [
      { label: "Brand License Fee", rate: "3% Total Sales", pct: 0.03, appliesTo: "totalSales" },
      { label: "Tech Services (Pre-Opening)", rate: "$40,000", fixed: 40000 },
      { label: "OS&E for Hotel", rate: "$15,000", fixed: 15000 },
      { label: "Tech Services (Ongoing/Yr)", rate: "$60,000/year", fixed: 60000 },
    ],
    inputs: [
      { key: "totalSales", label: "Projected Annual Sales", default: 2000000 },
    ],
  },
  { key: "programming", name: "Programming & Events", color: "#6B4A6B", icon: "\uD83C\uDFAA",
    fees: [
      { label: "Events Consulting", rate: "5% Event Budget", pct: 0.05, appliesTo: "eventBudget" },
      { label: "Membership Advisement", rate: "5% Membership Sales", pct: 0.05, appliesTo: "memberSales" },
      { label: "Marketing & PR", rate: "1% GOR", pct: 0.01, appliesTo: "gor" },
      { label: "Community Building", rate: "1% Events Rev", pct: 0.01, appliesTo: "eventsRev" },
    ],
    inputs: [
      { key: "eventBudget", label: "Annual Event Budget", default: 500000 },
      { key: "memberSales", label: "Projected Membership Sales", default: 1000000 },
      { key: "gor", label: "Gross Operating Revenue", default: 15000000 },
      { key: "eventsRev", label: "Annual Events Revenue", default: 800000 },
    ],
  },
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
  const links = [{ href: "#ip", label: "IP Structure" }, { href: "#fee-summary", label: "Fee Summary" }, { href: "#fees", label: "Fee Schedule" }, { href: "#builder", label: "IP Builder" }, { href: "#membership", label: "Membership" }, { href: "#brand", label: "Brand" }];
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

function EntityCard({ node }) {
  return (<div className="ipCard"><h4>{node.name}</h4><div className="ipEntity">{node.entity}</div><div className="ipOwnership">{node.ownership || node.owner}</div><ul>{(node.services || node.items || []).map((s) => <li key={s}>{s}</li>)}</ul></div>);
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
      <div className="pillarBody">
        <div className="pillarCol"><p>{p.yes}</p></div>
        <div className="pillarCol"><p>{p.no}</p></div>
      </div>
      {p.tags.length > 0 && <div className="pillarTags">{p.tags.map((t) => <span key={t} className="pillarTag">{t}</span>)}</div>}
    </div>
  );
}

function BrandTabs() {
  const [tab, setTab] = useState("res-hosp");
  const resHosp = PILLARS.filter((p) => p.title !== "Sacred Retail \u2014 Casa Colibri");
  const retail = PILLARS.find((p) => p.title === "Sacred Retail \u2014 Casa Colibri");
  return (
    <>
      <div className="tabs">
        <button className={`tabBtn ${tab === "res-hosp" ? "active" : ""}`} onClick={() => setTab("res-hosp")}>Residences &amp; Hospitality</button>
        <button className={`tabBtn ${tab === "retail" ? "active" : ""}`} onClick={() => setTab("retail")}>Sacred Retail</button>
      </div>
      {tab === "res-hosp" && resHosp.map((p, i) => <PillarCard key={i} p={p} />)}
      {tab === "retail" && retail && <PillarCard p={retail} />}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// IP PACKAGE BUILDER
// ═══════════════════════════════════════════════════════════════

function fmt(n) { return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 }); }

function IPBuilder() {
  const [selected, setSelected] = useState({});
  const [inputs, setInputs] = useState({});

  const toggle = (key) => {
    setSelected((s) => {
      const next = { ...s, [key]: !s[key] };
      if (next[key]) {
        const v = BUILDER.find((b) => b.key === key);
        const defaults = {};
        v.inputs.forEach((inp) => { defaults[key + "_" + inp.key] = inp.default; });
        setInputs((prev) => ({ ...prev, ...defaults }));
      }
      return next;
    });
  };

  const setVal = (k, val) => {
    const num = parseInt(val.replace(/[^0-9]/g, ""), 10) || 0;
    setInputs((prev) => ({ ...prev, [k]: num }));
  };

  const activeVerticals = BUILDER.filter((v) => selected[v.key]);

  let grandTotal = 0;
  const verticalTotals = activeVerticals.map((v) => {
    let total = 0;
    const feeResults = v.fees.map((f) => {
      let amount = 0;
      if (f.fixed) { amount = f.fixed; }
      else if (f.pct && f.appliesTo) { amount = (inputs[v.key + "_" + f.appliesTo] || 0) * f.pct; }
      total += amount;
      return { ...f, amount };
    });
    grandTotal += total;
    return { ...v, feeResults, total };
  });

  return (
    <div>
      {/* Step 1: Select Verticals */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 16 }}>Step 1 &mdash; Select Your Verticals</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {BUILDER.map((v) => (
            <button key={v.key} onClick={() => toggle(v.key)} style={{ padding: "18px 20px", borderRadius: "var(--radius)", border: selected[v.key] ? `2px solid ${v.color}` : "2px solid var(--border)", background: selected[v.key] ? `${v.color}10` : "white", cursor: "pointer", textAlign: "left", transition: "0.2s" }}>
              <div style={{ fontSize: "1.2rem", marginBottom: 4 }}>{v.icon}</div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: selected[v.key] ? v.color : "var(--earth)" }}>{v.name}</div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-light)", marginTop: 2 }}>{selected[v.key] ? "Selected \u2713" : "Click to add"}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Configure Inputs */}
      {activeVerticals.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 16 }}>Step 2 &mdash; Enter Your Project Numbers</div>
          <div style={{ display: "grid", gridTemplateColumns: activeVerticals.length > 1 ? "1fr 1fr" : "1fr", gap: 16 }}>
            {activeVerticals.map((v) => (
              <div key={v.key} style={{ background: "white", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: 24, borderTop: `3px solid ${v.color}` }}>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--earth)", marginBottom: 16 }}>{v.icon} {v.name}</div>
                {v.inputs.map((inp) => (
                  <div key={inp.key} style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, color: "var(--text-light)", letterSpacing: "0.05em", marginBottom: 4 }}>{inp.label}</label>
                    <input type="text" value={fmt(inputs[v.key + "_" + inp.key] || 0)} onChange={(e) => setVal(v.key + "_" + inp.key, e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: "1px solid var(--border)", fontSize: "0.88rem", fontWeight: 600, color: "var(--earth)", fontFamily: "var(--font-body)", outline: "none" }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {activeVerticals.length > 0 && (
        <div>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 16 }}>Step 3 &mdash; Your IP Package Estimate</div>

          {/* Grand total banner */}
          <div style={{ background: "linear-gradient(135deg, var(--earth), #2A3420)", borderRadius: "var(--radius)", padding: "28px 32px", color: "white", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sage)", marginBottom: 4 }}>Estimated Annual IP Revenue</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 600, letterSpacing: "0.02em" }}>{fmt(grandTotal)}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {verticalTotals.map((v) => (
                <span key={v.key} style={{ padding: "6px 16px", borderRadius: 20, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", fontSize: "0.72rem", fontWeight: 600 }}>{v.name}: {fmt(v.total)}</span>
              ))}
            </div>
          </div>

          {/* Breakdown per vertical */}
          {verticalTotals.map((v) => (
            <div key={v.key} style={{ background: "white", borderRadius: "var(--radius)", border: "1px solid var(--border)", marginBottom: 16, overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", background: v.color, color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.05em" }}>{v.icon} {v.name}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600 }}>{fmt(v.total)}</span>
              </div>
              <div style={{ padding: "0 20px" }}>
                {v.feeResults.map((f, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < v.feeResults.length - 1 ? "1px solid rgba(200,185,154,0.12)" : "none" }}>
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--earth)" }}>{f.label}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-light)" }}>{f.rate}</div>
                    </div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--moss)" }}>{fmt(f.amount)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeVerticals.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 20px", color: "var(--text-light)", fontSize: "0.88rem" }}>Select one or more verticals above to build your IP package estimate.</div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ORG DIAGRAM
// ═══════════════════════════════════════════════════════════════

function OrgDiagram() {
  const boxStyle = () => ({ background: "white", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "16px 20px", fontSize: "0.78rem", lineHeight: 1.6, color: "var(--text-mid)", position: "relative" });
  const hdr = (bg) => ({ background: bg || "var(--earth)", color: "white", padding: "8px 16px", borderRadius: "var(--radius) var(--radius) 0 0", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center" });
  const sub = { fontSize: "0.65rem", color: "var(--text-light)", fontStyle: "italic", textAlign: "center", marginBottom: 8 };
  const own = { fontSize: "0.65rem", color: "var(--text-light)", borderTop: "1px solid var(--border)", marginTop: 10, paddingTop: 8 };
  const badge = (n) => (<span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: 4, background: "#C8463E", color: "white", fontSize: "0.6rem", fontWeight: 700 }}>{n}</span>);
  const row = (l, r) => (<div style={{ display: "flex", justifyContent: "space-between" }}><span>{l}</span><span>{r}</span></div>);

  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: 1100, padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 0 }}>
          <div style={{ width: 260 }}>
            <div style={hdr("#4A5D23")}>CHOZEN IP</div>
            <div style={{ ...boxStyle(), borderTop: "none", borderRadius: "0 0 var(--radius) var(--radius)" }}>
              <div style={sub}>Delaware LLC</div>
              <div>Intellectual Property</div><div>Research/Development</div><div>Creative/Concepting</div><div>Green Living Certification</div>
              <div style={own}>{row("NP:","")}{row("[LLC]","80%")}{row("Third Party","15%")}</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, padding: "12px 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--sand)" }} />
          <div style={{ display: "flex", gap: 8 }}>{badge("V")}{badge("IV")}{badge("I")}{badge("VII")}{badge("III")}</div>
          <div style={{ flex: 1, height: 1, background: "var(--sand)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
          {[
            { n: "Metro Brokerage", s: ["Branded Residence Sales","Marketing Consulting","Tenant Curation"], o: [{l:"NP:",r:""},{l:"[LLC]",r:"100%"}] },
            { n: "FOC DevCo", s: ["Branded Residences and Resort Development","Green Development Framework"], o: [{l:"NP:",r:""},{l:"[LLC]",r:"100%"}] },
            { n: "CHOZEN CCRL Non-Profit", s: ["Education","Scholarships","Conservation"], o: [{l:"NP:",r:""},{l:"[LLC]",r:"100%"}] },
            { n: "Mgmt Co", s: ["TBD"], o: [{l:"NP:",r:""},{l:"[LLC]",r:"75%"},{l:"[LLC]",r:"25%"}] },
          ].map((e) => (
            <div key={e.n}><div style={hdr("#5A6B5A")}>{e.n}</div><div style={{ ...boxStyle(), borderTop: "none", borderRadius: "0 0 var(--radius) var(--radius)" }}><div style={sub}>Delaware LLC</div>{e.s.map((s) => <div key={s}>{s}</div>)}<div style={own}>{e.o.map((o,i) => <div key={i} style={{ display:"flex",justifyContent:"space-between" }}><span>{o.l}</span><span>{o.r}</span></div>)}</div></div></div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, padding: "12px 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--sand)" }} />
          <div style={{ display: "flex", gap: 8 }}>{badge("III")}{badge("II")}</div>
          <div style={{ flex: 1, height: 1, background: "var(--sand)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
          {IP.verticals.map((v) => (
            <div key={v.name}><div style={hdr(v.color)}>{v.name}</div><div style={{ ...boxStyle(), borderTop: "none", borderRadius: "0 0 var(--radius) var(--radius)", minHeight: 160 }}><div style={sub}>Delaware LLC</div>{v.services.map((s) => <div key={s}>{s}</div>)}<div style={own}>{row("NP:","")}{v.ownership === "80% LLC / 15% Third Party" ? <>{row("[LLC]","80%")}{row("Third Party","15%")}</> : row("[LLC]","100%")}</div></div></div>
          ))}
        </div>
        <div style={{ marginTop: 40, background: "white", borderRadius: "var(--radius)", border: "1px solid var(--border)", padding: 24, maxWidth: 440 }}>
          <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "var(--earth)", marginBottom: 16, borderBottom: "2px solid var(--earth)", paddingBottom: 8 }}>Fee Structure</div>
          {FEE_PILLS.map((f) => (
            <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0", borderBottom: "1px solid rgba(200,185,154,0.12)" }}>
              {badge(f.id)}<span style={{ flex: 1, fontSize: "0.78rem", color: "var(--text-mid)" }}>{f.label}:</span><span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--earth)" }}>{f.value}</span>
            </div>
          ))}
          <div style={{ marginTop: 12, fontSize: "0.68rem", color: "var(--text-light)", fontStyle: "italic", lineHeight: 1.5 }}>
            <div>*Residences Technical Services: Design; Guest Experiences; Branding; Marketing; PR</div>
            <div style={{ marginTop: 4 }}>**Programming Consulting: Ongoing Neighborhood and Community Development; Residents&apos; Experience; Community Events; Marketing &amp; PR Advisement</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <>
      <Nav />
      <section className="hero" id="hero"><div className="heroContent"><p className="heroEyebrow">Center for Regenerative Living</p><h1 className="heroTitle">CHOZEN</h1><p className="heroSub">IP Offering &amp; Brand Framework</p><div className="heroLine" /><div className="heroScroll"><a href="#ip">Explore</a></div></div></section>

      <section className="section" id="ip">
        <div className="sectionHeader"><p className="sectionEyebrow">Intellectual Property</p><h2 className="sectionTitle">CHOZEN IP Offering</h2><div className="divider" /><p className="sectionDesc">The IP entity owns and licenses the CHOZEN brand across six revenue verticals, supported by brokerage, development, non-profit, and management arms.</p></div>
        <OrgDiagram />
      </section>

      <section className="sectionAlt" id="fee-summary">
        <div className="sectionInner"><div className="sectionHeader"><p className="sectionEyebrow">Revenue Model</p><h2 className="sectionTitle">Fee Structure at a Glance</h2><div className="divider" /><p className="sectionDesc">Seven fee streams flow through the CHOZEN IP entity.</p></div>
        <div className="feePills">{FEE_PILLS.map((f) => <div key={f.id} className="feePill"><div className="pillId">{f.id}</div><div className="pillValue">{f.value}</div><div className="pillLabel">{f.label}</div><div className="pillDesc">{f.desc}</div></div>)}</div></div>
      </section>

      <section className="section" id="fees">
        <div className="sectionHeader"><p className="sectionEyebrow">Competitive Benchmarking</p><h2 className="sectionTitle">IP &amp; Consulting Fee Schedule</h2><div className="divider" /><p className="sectionDesc">CHOZEN&apos;s recommended fees vs. industry standards and the competitive set.</p></div>
        {FEES.map((s) => (
          <div key={s.category} className="feeSection">
            <h3 className="feeSectionTitle">{s.category}</h3>
            <div className="compSetBar">{s.compSet.map((c) => <span key={c} className="compChip">{c}</span>)}</div>
            <div style={{ overflowX: "auto" }}><table className="feeTable"><thead><tr><th>Fee Type</th><th>CHOZEN</th><th>Industry</th><th>What&apos;s Included</th><th>Comp Set</th></tr></thead><tbody>{s.rows.map((r) => (
              <tr key={r.type}><td className="feeType">{r.type}</td><td className="chozenFee">{r.chozen}</td><td className="industryFee">{r.industry}</td><td className="feeOffering">{r.offering}</td><td>{r.comps.length > 0 && <div className="compRow">{r.comps.map((c) => <span key={c.n} className="compTag"><strong>{c.n}:</strong> {c.f}</span>)}</div>}</td></tr>
            ))}</tbody></table></div>
          </div>
        ))}
      </section>

      {/* IP PACKAGE BUILDER */}
      <section className="sectionAlt" id="builder">
        <div className="sectionInner">
          <div className="sectionHeader"><p className="sectionEyebrow">Interactive Tool</p><h2 className="sectionTitle">Build Your IP Package</h2><div className="divider" /><p className="sectionDesc">Select verticals, enter your project numbers, and see an estimated IP fee breakdown in real time.</p></div>
          <IPBuilder />
        </div>
      </section>

      <section className="section" id="membership">
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div className="sectionHeader"><p className="sectionEyebrow">Membership Benchmarking</p><h2 className="sectionTitle">Membership Comp Set</h2><div className="divider" /><p className="sectionDesc">Pricing landscape across comparable lifestyle, wellness, and private club brands.</p></div>
          <div style={{ background: "linear-gradient(135deg, var(--earth), #2A3420)", borderRadius: "var(--radius)", padding: "24px 28px", color: "white", marginBottom: 24 }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", marginBottom: 8 }}>CHOZEN Membership</h4>
            <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "rgba(255,255,255,0.75)" }}>{MEMBERSHIP.note}</p>
          </div>
          <div style={{ overflowX: "auto" }}><table className="feeTable"><thead><tr><th>Brand</th><th>Model</th><th>Initiation</th><th>Annual / Rate</th><th>All Properties</th></tr></thead><tbody>{MEMBERSHIP.comps.map((m) => (
            <tr key={m.name}><td className="feeType">{m.name}</td><td><span className="compChip">{m.model}</span></td><td style={{ color: m.init === "\u2014" ? "var(--text-light)" : "var(--text-mid)" }}>{m.init}</td><td style={{ fontWeight: 600, color: "var(--moss)" }}>{m.annual}</td><td style={{ color: m.all === "N/A" ? "var(--text-light)" : "var(--text-mid)" }}>{m.all}</td></tr>
          ))}</tbody></table></div>
        </div>
      </section>

      <section className="sectionAlt" id="brand">
        <div className="sectionInner"><div className="sectionHeader"><p className="sectionEyebrow">Brand Identity</p><h2 className="sectionTitle">We Are vs. We Are Not</h2><div className="divider" /><p className="sectionDesc">CHOZEN&apos;s brand pillars define our regenerative ethos &mdash; a clear declaration of what we stand for and what we reject.</p></div><BrandTabs /></div>
      </section>

      <footer className="footer"><div className="footerLogo">CHOZEN</div><p>Center for Regenerative Living &mdash; IP &amp; Brand Guidelines 2025</p></footer>
    </>
  );
}
