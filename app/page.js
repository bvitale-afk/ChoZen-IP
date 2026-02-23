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
    { name: "Residences", color: "#4A5D23", services: ["Brand / License", "Technical Services*", "For-Sale Branded Residences", "Memberships"], note: "*Design; Guest Experiences; Branding; Marketing; PR" },
    { name: "Hospitality", color: "#3A6B7E", services: ["Hotels", "Retreat Centers", "Short-Term Rentals", "Memberships"] },
    { name: "Retail", color: "#B8963E", services: ["Brick & Mortar", "Concepting & Consulting", "Chozen CPG"] },
    { name: "Wellness / Spa", color: "#8B6B4A", services: ["Customer Facing", "Back end IT"] },
    { name: "Technology", color: "#5A5A6B", services: ["Customer-facing (app)", "Back end IT"], ownership: "80% LLC / 15% Third Party" },
    { name: "Programming", color: "#6B4A6B", services: ["Consulting**", "Marketing & Partnerships", "Onsite Experiences"], note: "**Ongoing Neighborhood & Community Dev; Residents\u2019 Experience; Community Events; Marketing & PR Advisement" },
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
  {
    category: "Residences",
    compSet: ["Marriott Autograph", "Auberge", "Proper", "Rosewood", "Standard", "Six Senses", "The Well"],
    rows: [
      { type: "Brand License Fee", chozen: "2% Gross Sales", industry: "1\u20136%", offering: "Trademark use included. Most comp set residences require mandatory full-service resort.", comps: [{ n: "Marriott Autograph", f: "4% GS + $1K/unit" }, { n: "Auberge", f: "5% GS" }, { n: "Proper", f: "4% GS" }, { n: "Rosewood", f: "4\u20135% GS" }, { n: "Standard", f: "2% GS" }, { n: "Six Senses", f: "Pending" }, { n: "The Well", f: "Pending" }] },
      { type: "Upfront Fee", chozen: "$100,000", industry: "$250K\u2013$500K", offering: "Secures trademark & market exclusivity. Deducted from 2% Gross Sales.", comps: [{ n: "Marriott Autograph", f: "$100K" }, { n: "Proper", f: "Incl. in $600K hotel upfront" }] },
      { type: "Brand Management Fee", chozen: "2% Annual HOA", industry: "4\u201315% annual HOA", offering: "Inspections, audits, renovation approvals.", comps: [{ n: "Marriott Autograph", f: "4% total HOA" }, { n: "Proper", f: "10% Total Assessments" }] },
      { type: "Technical Services (Pre-Opening)", chozen: "0.5% Total Dev Cost", industry: "$150K\u2013$250K", offering: "Design-review, architectural standards.", comps: [{ n: "Marriott Autograph", f: "$225K" }, { n: "Proper", f: "Incl. in $600K upfront" }] },
    ],
  },
  {
    category: "Hospitality",
    compSet: ["Marriott Autograph", "Auberge", "Proper", "Rosewood", "Standard", "Six Senses", "The Well"],
    rows: [
      { type: "Brand License Fee", chozen: "2% Gross Operating Revenue", industry: "1\u20136%", offering: "Trademark use included.", comps: [{ n: "Marriott Autograph", f: "5% Gross Room Sales/Mo" }, { n: "Proper", f: "3% GOR + 1% Group" }] },
      { type: "Upfront Fee", chozen: "$100,000", industry: "$250K\u2013$500K", offering: "Applied toward total brand licensing fee.", comps: [{ n: "Marriott Autograph", f: "$100K + $400/room >250" }, { n: "Proper", f: "$600,000" }] },
      { type: "Technical Services (Pre-Opening)", chozen: "0.5% Total Dev Cost", industry: "0.1\u20130.5% dev cost", offering: "Design-review, architectural & brand standards.", comps: [{ n: "Proper", f: "Tied to $600K upfront" }] },
      { type: "Experiential Brand Audit", chozen: "$20,000", industry: "$20,000", offering: "Bi-Annual/Annual guest experience audit. Guest & employee interviews. Owner\u2019s rep at min 2 onsite events.", comps: [{ n: "Marriott Autograph", f: "$20K" }] },
    ],
  },
  {
    category: "Retail",
    compSet: ["Flamingo Estates", "GOOP", "Makeready", "Swoon", "Dawn Franchino"],
    rows: [
      { type: "Brand License Fee", chozen: "3% Total Projected Sales", industry: "3\u201315%", offering: "Trademark use included.", comps: [] },
      { type: "Tech Services \u2014 B&M + Website", chozen: "Starting at $40,000", industry: "$4K\u2013$60K ($150/sf)", offering: "Baseline 650sf ($500/sf thereafter). Concept Deck, Product Deck, up to 12 SKUs, Layout/Design, FFE/OSE, Install, Budget, Weekly Calls.", comps: [{ n: "Makeready", f: "$50K" }, { n: "Swoon", f: "$40K" }, { n: "Dawn Franchino", f: "$65K B&M / $15K Ecomm" }] },
      { type: "Tech Services \u2014 OS&E for Hotel", chozen: "Starting at $15,000", industry: "Incl. in Operator\u2019s fee", offering: "Baseline 50 keys. CPG selection for branded residences/hospitality.", comps: [] },
      { type: "Tech Services (Ongoing Quarterly)", chozen: "$15,000/quarter", industry: "$20K\u2013$35K/qtr", offering: "Inventory & merchandising for store, website, branded residences & hospitality.", comps: [{ n: "Makeready", f: "$25K\u2013$35K/qtr" }, { n: "Swoon", f: "$20K/qtr" }] },
      { type: "Annual Brand Audit", chozen: "$20,000", industry: "\u2014", offering: "Guest, employee, top client interviews. Owner\u2019s rep visits 2x/year. Required only if not hired for ongoing Tech Services.", comps: [] },
    ],
  },
  {
    category: "Programming & Events",
    compSet: ["Marriott Autograph", "Proper", "Makeready"],
    rows: [
      { type: "Events Consulting", chozen: "5% Total Event Budget", industry: "10\u201320%", offering: "Seasonal events (Equinoxes, Solstices, Harvest, Super Moons). Wellness: hikes, meditation, breathwork, yoga.", comps: [{ n: "Marriott Autograph", f: "2.02% Gross Rooms/Mo" }] },
      { type: "Membership Advisement", chozen: "5% Projected Sales/Qtr + 1% Referral", industry: "1\u20132%", offering: "Quarterly advisement on multi-year contract.", comps: [] },
      { type: "Marketing & PR Advisement", chozen: "1% GOR / Quarterly", industry: "Project Dependent", offering: "Quarterly reviews. Monthly advisory for residential & hotel programming.", comps: [{ n: "Marriott Autograph", f: "1.5% GRS/Mo" }, { n: "Proper", f: "1% GOR" }] },
      { type: "Community Building", chozen: "1% Annual Events Rev (less weddings)", industry: "Project Dependent", offering: "CHOZEN-specific offering and unique brand positioning.", comps: [] },
    ],
  },
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

const CURRENT_ORG = [
  { name: "CHOZEN Land", entity: "Delaware LLC", owner: "Tony Cho \u2014 100%", items: ["Chozen Florida Land", "Chozen Florida Buildings"] },
  { name: "CHOZEN Operations", entity: "Delaware LLC", owner: "Tony Cho \u2014 100%", items: ["Retreat Operations", "Caf\u00e9", "Events", "Hospitality", "Memberships"] },
  { name: "CHOZEN CCRL", entity: "Delaware LLC", owner: "LLC \u2014 100%", items: ["Operations moving into CCRL"] },
  { name: "CHOZEN IP", entity: "Delaware LLC", owner: "LLC \u2014 100%", items: ["IP will move here"] },
];

const OFFERINGS = [
  { name: "Community Center", items: ["Members Club", "Venues"] },
  { name: "Retail", items: ["Brick & Mortar", "CPG"] },
  { name: "Programming", items: ["Partnerships", "Outdoor Rec", "Meditation", "Boat Tours", "Bird Watching", "Events"] },
  { name: "Residences", items: ["Short-Term Rentals", "Residential Homes (pending)"] },
  { name: "Hospitality", items: ["Glamping (pending)", "Overnight Accommodation", "Retreat", "Spa", "Caf\u00e9", "Catering", "Members Club"] },
  { name: "Technology", items: ["Customer Facing (pending)", "Back end IT (pending)"] },
];

const PILLARS = [
  { icon: "\uD83C\uDF31", title: "Regenerative Onsite Agriculture", yesLabel: "TRUE ORGANIC ONSITE AGRICULTURE", noLabel: "CONVENTIONAL EXTERNAL FOOD SOURCING", yes: "Regenerative onsite agriculture model rooted in native biodiversity and organic production. Food as medicine. Land health through data-driven sustainability.", no: "No greenwashing. No chemical fertilizers, synthetic pesticides, fungicides, or herbicides. No growing only annuals or ornamental non-edible plants.", tags: ["Soil Health", "Agroforestry", "Permaculture", "Syntropic Farming"] },
  { icon: "\u2726", title: "Holistic Wellbeing", yesLabel: "VITALITY INSPIRED BY NATURE", noLabel: "HUMAN UPGRADE COSPLAY", yes: "Performance, longevity, and regenerative healing through advanced wellness technology and practitioner access. Cryotherapy, contrast thermal therapy, compression, IV modalities.", no: "No superficial wellness tactics or unqualified practitioners. No outsourced IV compounding. No shallow bio-optimization.", tags: ["Nature-Based Rhythms", "Thermal Therapy", "Longevity"] },
  { icon: "\uD83C\uDF3F", title: "Every Day Whole Food Access", yesLabel: "WHOLE FOOD ACCESS", noLabel: "WHOLE FOOD DESERT", yes: "Nutritious, whole meals from locally sourced, regenerative ingredients. Food is foundational to community health and hospitality.", no: "No global corporate food distributors. No factory-farmed proteins. No seasonal-only concepts.", tags: ["Curated Grocer", "Local Retailers", "Low Waste", "Caf\u00e9"] },
  { icon: "\uD83C\uDF3F", title: "Access to Untamed Land", yesLabel: "ACCESS TO UNTAMED LAND", noLabel: "CONFINED TO BUILT ENVIRONMENT", yes: "Minimum five acres of natural environment\u2014forest, beach, meadow, or jungle. Direct access to open, undeveloped landscapes.", no: "Not situated in dense urban environments without meaningful nature access.", tags: ["50% Conservation", "Microforests", "Open Space"] },
  { icon: "\uD83D\uDD25", title: "Primal Interactions", yesLabel: "PRIMAL INTERACTIONS", noLabel: "PERFORMATIVE NATURE", yes: "Environments that reawaken the body\u2019s innate connection to nature through movement, sensory immersion, and elemental experiences.", no: "No staged activities, artificial props, or curated photo-ops. No gimmicky primal cosplay.", tags: ["ChoZen Flow", "Rewilding", "Off-Grid Zone", "Presence"] },
  { icon: "\uD83E\uDD1D", title: "Conscious Community", yesLabel: "CULTIVATING COMMUNITY", noLabel: "DISCONNECTED LIFESTYLE", yes: "Seasonal events (equinoxes, solstices, harvest), wellness gatherings, group hikes, meditation, breathwork, yoga.", no: "No transactional, impersonal programming lacking seasonal alignment.", tags: ["Tech-Free Spaces", "Memberships", "Shared Rituals"] },
  { icon: "\uD83C\uDFD7", title: "Regenerative Design", yesLabel: "REGENERATIVE DESIGN", noLabel: "ECOLOGICALLY HARMFUL DESIGN", yes: "Regenerative Placemaking standards. High-performance building systems, renewable energy, natural ventilation, sustainable materials, water harvesting.", no: "No low-performance systems, harmful materials, or depleting practices.", tags: ["Biophilia", "Local Materials", "Net Zero", "Water Quality"] },
  { icon: "\u267B\uFE0F", title: "Circular Operations", yesLabel: "CLOSED-LOOP OPERATIONS", noLabel: "CONVENTIONAL MANAGEMENT", yes: "Smart energy, renewable power, low-impact fixtures, toxin-free cleaning, local food, sustainability education. No plastics.", no: "No wasteful energy, chemical-laden products, factory-farmed food, or single-use plastics.", tags: ["No Plastics", "Solar", "Compost", "Aspiring Net Zero"] },
  { icon: "\u2764\uFE0F", title: "Serving Local Community", yesLabel: "SERVING THE COMMUNITY", noLabel: "EXTRACTIVE ECONOMICS", yes: "Partnerships with local non-profits. Marine and land conservation. ESG-focused scholarships.", no: "Not an isolated or extractive model that overlooks local impact.", tags: ["Makers Spaces", "Artisan Markets", "Artist Residencies"] },
  { icon: "\uD83C\uDFFA", title: "Sacred Retail \u2014 Casa Colibri", yesLabel: "SACRED RETAIL", noLabel: "MASS-PRODUCED & GREENWASHED", yes: "Curates only brands meeting rigorous standards for ingredient quality, ethical sourcing. Local artisans, indigenous peoples, recyclable/refillable offerings.", no: "No mass-produced or low-quality products. No virgin plastics or greenwashed wellness products.", tags: ["Casa Colibri IP", "Artisanal", "Indigenous Sacred Goods"] },
];

const SOURCES = [
  "Savills. 2025. Branded Residences 2024/2025.",
  "Savills. 2024. Spotlight: Branded Residences - The Americas.",
  "KnightFrank. September 8, 2025. The Global Branded Residences Survey 2025.",
  "Marriott Autograph Collection. 2022. Term Sheet.",
  "Proper. 2024. Term Sheet.",
];

// ═══════════════════════════════════════════════════════════════
// SMALL COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      let cur = "";
      document.querySelectorAll("section[id]").forEach((s) => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
      setActive(cur);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [{ href: "#ip", label: "IP Structure" }, { href: "#fee-summary", label: "Fee Summary" }, { href: "#fees", label: "Fee Schedule" }, { href: "#membership", label: "Membership" }, { href: "#org", label: "Org Chart" }, { href: "#brand", label: "Brand" }, { href: "#sources", label: "Sources" }];
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
  return (
    <div className="ipCard">
      <h4>{node.name}</h4>
      <div className="ipEntity">{node.entity}</div>
      <div className="ipOwnership">{node.ownership || node.owner}</div>
      <ul>{(node.services || node.items || []).map((s) => <li key={s}>{s}</li>)}</ul>
    </div>
  );
}

function Pillar({ p }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="pillarCard">
      <div className="pillarTitleBar" onClick={() => setOpen(!open)}>
        <span className="pillarIcon">{p.icon}</span>
        <span className="pillarName">{p.title}</span>
        <span className={`pillarToggle ${open ? "open" : ""}`}>{"\u25BE"}</span>
      </div>
      {open && (
        <>
          <div className="pillarBody">
            <div className="pillarCol"><div className="pillarColLabel yes">{"\u2713"} {p.yesLabel}</div><p>{p.yes}</p></div>
            <div className="pillarCol"><div className="pillarColLabel no">{"\u2715"} {p.noLabel}</div><p>{p.no}</p></div>
          </div>
          {p.tags.length > 0 && <div className="pillarTags">{p.tags.map((t) => <span key={t} className="pillarTag">{t}</span>)}</div>}
        </>
      )}
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

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="heroContent">
          <p className="heroEyebrow">Center for Regenerative Living</p>
          <h1 className="heroTitle">CHOZEN</h1>
          <p className="heroSub">IP Offering &amp; Brand Framework</p>
          <div className="heroLine" />
          <div className="heroScroll"><a href="#ip">Explore</a></div>
        </div>
      </section>

      {/* IP STRUCTURE */}
      <section className="section" id="ip">
        <div className="sectionHeader">
          <p className="sectionEyebrow">Intellectual Property</p>
          <h2 className="sectionTitle">CHOZEN IP Offering</h2>
          <div className="divider" />
          <p className="sectionDesc">The IP entity owns and licenses the CHOZEN brand across six revenue verticals, supported by brokerage, development, non-profit, and management arms.</p>
        </div>
        <div className="ipCore">
          <h3>{IP.core.name}</h3>
          <div className="ipEntity">{IP.core.entity}</div>
          <div className="ipOwnership">{IP.core.ownership}</div>
          <div className="ipCapabilities">{IP.core.capabilities.map((c) => <span key={c} className="ipCap">{c}</span>)}</div>
        </div>
        <div className="ipArrow">{"\u2193"}</div>
        <div className="ipLabel">Supporting Entities</div>
        <div className="ipGrid ipGrid2">{IP.partners.map((p) => <EntityCard key={p.name} node={p} />)}</div>
        <div className="ipGrid ipGrid2" style={{ marginTop: 16 }}>{IP.affiliates.map((a) => <EntityCard key={a.name} node={a} />)}</div>
        <div className="ipArrow">{"\u2193"}</div>
        <div className="ipLabel">Revenue Verticals</div>
        <div className="ipGrid ipGrid6">
          {IP.verticals.map((v) => (
            <div key={v.name} className="verticalCard" style={{ borderTopColor: v.color }}>
              <h4>{v.name}</h4>
              <ul>{v.services.map((s) => <li key={s}>{s}</li>)}</ul>
              {v.note && <div className="vertNote">{v.note}</div>}
              {v.ownership && <div className="ipOwnership" style={{ fontSize: "0.68rem", marginTop: 8 }}>{v.ownership}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* FEE SUMMARY */}
      <section className="sectionAlt" id="fee-summary">
        <div className="sectionInner">
          <div className="sectionHeader">
            <p className="sectionEyebrow">Revenue Model</p>
            <h2 className="sectionTitle">Fee Structure at a Glance</h2>
            <div className="divider" />
            <p className="sectionDesc">Seven fee streams flow through the CHOZEN IP entity.</p>
          </div>
          <div className="feePills">{FEE_PILLS.map((f) => <div key={f.id} className="feePill"><div className="pillId">{f.id}</div><div className="pillValue">{f.value}</div><div className="pillLabel">{f.label}</div><div className="pillDesc">{f.desc}</div></div>)}</div>
        </div>
      </section>

      {/* FEE SCHEDULE */}
      <section className="section" id="fees">
        <div className="sectionHeader">
          <p className="sectionEyebrow">Competitive Benchmarking</p>
          <h2 className="sectionTitle">IP &amp; Consulting Fee Schedule</h2>
          <div className="divider" />
          <p className="sectionDesc">CHOZEN&apos;s recommended fees vs. industry standards and the competitive set.</p>
        </div>
        {FEES.map((s) => (
          <div key={s.category} className="feeSection">
            <h3 className="feeSectionTitle">{s.category}</h3>
            <div className="compSetBar">{s.compSet.map((c) => <span key={c} className="compChip">{c}</span>)}</div>
            <div style={{ overflowX: "auto" }}>
              <table className="feeTable">
                <thead><tr><th>Fee Type</th><th>CHOZEN</th><th>Industry</th><th>What&apos;s Included</th><th>Comp Set</th></tr></thead>
                <tbody>{s.rows.map((r) => (
                  <tr key={r.type}>
                    <td className="feeType">{r.type}</td>
                    <td className="chozenFee">{r.chozen}</td>
                    <td className="industryFee">{r.industry}</td>
                    <td className="feeOffering">{r.offering}</td>
                    <td>{r.comps.length > 0 && <div className="compRow">{r.comps.map((c) => <span key={c.n} className="compTag"><strong>{c.n}:</strong> {c.f}</span>)}</div>}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      {/* MEMBERSHIP */}
      <section className="sectionAlt" id="membership">
        <div className="sectionInner">
          <div className="sectionHeader">
            <p className="sectionEyebrow">Membership Benchmarking</p>
            <h2 className="sectionTitle">Membership Comp Set</h2>
            <div className="divider" />
            <p className="sectionDesc">Pricing landscape across comparable lifestyle, wellness, and private club brands.</p>
          </div>
          <div className="memberGrid">
            <div className="memberCard memberHighlight"><h4>CHOZEN Membership</h4><p>{MEMBERSHIP.note}</p></div>
            {MEMBERSHIP.comps.map((m) => (
              <div key={m.name} className="memberCard">
                <h4>{m.name}</h4>
                <div className="memberModel">{m.model}</div>
                {m.init !== "\u2014" && <><div className="memberLabel">Initiation</div><div className="memberDetail">{m.init}</div></>}
                <div className="memberLabel">Annual / Rate</div><div className="memberDetail">{m.annual}</div>
                {m.all !== "N/A" && <><div className="memberLabel">All Properties</div><div className="memberDetail">{m.all}</div></>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORG CHART */}
      <section className="section" id="org">
        <div className="sectionHeader">
          <p className="sectionEyebrow">Current Structure</p>
          <h2 className="sectionTitle">Org Chart &mdash; November 2025</h2>
          <div className="divider" />
          <p className="sectionDesc">CHOZEN&apos;s current corporate entities and operational offerings.</p>
        </div>
        <div className="orgBox">
          <h3>Corporate Entities</h3>
          <div className="ipGrid ipGrid4">{CURRENT_ORG.map((n) => (
            <div key={n.name} className="ipCard" style={{ borderTop: "3px solid var(--moss)" }}>
              <h4>{n.name}</h4><div className="ipEntity">{n.entity}</div><div className="ipOwnership">{n.owner}</div>
              <ul>{n.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}</div>
        </div>
        <div className="orgBox">
          <h3>Current Offerings</h3>
          <div className="ipGrid ipGrid6">{OFFERINGS.map((n) => (
            <div key={n.name} className="verticalCard"><h4>{n.name}</h4><ul>{n.items.map((i) => <li key={i}>{i}</li>)}</ul></div>
          ))}</div>
        </div>
      </section>

      {/* BRAND PILLARS */}
      <section className="sectionAlt" id="brand">
        <div className="sectionInner">
          <div className="sectionHeader">
            <p className="sectionEyebrow">Brand Identity</p>
            <h2 className="sectionTitle">We Are vs. We Are Not</h2>
            <div className="divider" />
            <p className="sectionDesc">CHOZEN&apos;s brand pillars across residences, hospitality, and retail. Click to expand.</p>
          </div>
          {PILLARS.map((p, i) => <Pillar key={i} p={p} />)}
        </div>
      </section>

      {/* SOURCES */}
      <section className="section" id="sources">
        <div className="sectionHeader">
          <p className="sectionEyebrow">References</p>
          <h2 className="sectionTitle">Research Sources</h2>
          <div className="divider" />
        </div>
        <div className="sourcesList"><ol>{SOURCES.map((s, i) => <li key={i}>{s}</li>)}</ol></div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footerLogo">CHOZEN</div>
        <p>Center for Regenerative Living &mdash; IP &amp; Brand Guidelines 2025</p>
      </footer>
    </>
  );
}
