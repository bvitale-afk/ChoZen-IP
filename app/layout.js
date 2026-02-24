

ChoZen-IP-main.zip
zip

I want to edit his js site to focus moreon the following

Based on this transcript, here's an outline for the ChoZen online deck:
ChoZen Investment & Brand Deck — Outline
1. The ChoZen Story
* Origin story — 11+ years in Florida
* Evolution from community to a wellness/hospitality/nature brand
* Mission: regenerative placemaking, building bridges not walls
* Key community highlights: events hosted, thousands served, notable figures (Dan Buettner, indigenous leaders like Mapu, Himena, etc.)
2. The Brand & IP
* ChoZen as a lifestyle/wellness/hospitality brand
* Built-in community of "culture makers" and changemakers
* Pillars: wellness, nature, agriculture, ancestral wisdom, hospitality
* Tie-in to Generation Regeneration book & framework
* "The alternative to a golf community"
3. What ChoZen Offers (Brand IP)
* Membership community
* Online content
* Summits, seminars, special events worldwide
* Exclusive network of like-minded builders
4. Current Location — Florida
* ChoZen Village overview
* Retreats, wellness programming, farm
* ChoZen Center for Regenerative Living (nonprofit)
* Blue Zones connection
* Community proof points & event history
5. Future Locations
* Medellín, Colombia — branded residential + agricultural naturehood, cross-pollination of locals and internationals, ancestral wisdom, plant medicine (where legal), maker's/artist village concept
* Pipeline — Portugal, Atlanta, Florianópolis, others inbound
6. Investment Opportunities (gated / NDA required)
* Layer 1 — Brand/IP Investment: GP-level stake in licensing, branding fees, development fees, content, and community platform
* Layer 2 — Site-Specific Development: Lot/home acquisition, JV partnership opportunities per location (Florida first, then Colombia, etc.)
* Investors can get exposure to one or both
7. Call to Action / Waitlist
* Landing page: sign up to join the community waitlist
* Inquiry for lot reservations in current or future locations
* Deeper access requires NDA + qualified investor vetting
Proposed site access tiers:
1. Public — Brand story, community highlights, waitlist signup (no NDA)
2. Gated — Individual location opportunities, investment memo, brand partnership details (NDA + vetting required)
Want me to start building this out as an actual web deck or presentation?

Show more
2:45 PM

Examined site structure to restructure ChoZen's brand positioning
Examined site structure to restructure ChoZen's brand positioning

Let me start by examining the current site structure and reading the relevant skill files.


Assessed site transformation from licensing focus to investment brand deck
Assessed site transformation from licensing focus to investment brand deck








Now let me read the frontend design skill for best practices:


Architected comprehensive investment deck restructuring ChoZen's site narrative
Architected comprehensive investment deck restructuring ChoZen's site narrative



Now I have a clear picture. The current site is a technical IP fee schedule/builder — I'll restructure it into a narrative investment & brand deck following your outline, with the story-first approach, locations, investment tiers, and gated/public access concepts. Let me build this out.


Prepared to construct comprehensive page component architecture
Prepared to construct comprehensive page component architecture





Now let me build the new page.js — this is the big one:


Architected stylesheet updates to align with redesigned components
Architected stylesheet updates to align with redesigned components

Now the updated CSS:


Prepared comprehensive deck materials for delivery
Prepared comprehensive deck materials for delivery

Now let me package it up:


Conceived visual HTML preview for deck structure
Conceived visual HTML preview for deck structure


Let me also create a visual preview so you can see the deck flow:


Synthesized brand strategy framework for ChoZen's website restructuring
Synthesized brand strategy framework for ChoZen's website restructuring


Here's the restructured deck site. The HTML preview shows you the full visual flow, and the zip has the drop-in Next.js files (page.js, globals.css, layout.js).

What changed from the old site:

The old IP fee schedule/builder is gone — replaced with a narrative investment deck following your outline:

Hero — "The Alternative to a Golf Community" positioning with dual CTAs
The ChoZen Story — origin, mission, Generation Regeneration framework, stats, notable collaborators
Brand & IP — 6 pillars grid + full We Are / We Are Not section + Brand Book modal (preserved)
What ChoZen Offers — membership, content, summits, events + network callout
Florida — 6 proof-point cards (Village, Retreats, Farm, CCRL, Blue Zones, Events)
Future Locations — Medellín featured prominently, plus Florianópolis, Portugal, Atlanta pipeline
Investment — Layer 1 (Brand/IP) and Layer 2 (Site-Specific) cards with gated access tier visualization and NDA gate
Waitlist/CTA — form with interest selector + 3 pathway cards
The Brand Book modal, SVG symbols, and full color system are all preserved. Let me know if you want to adjust any section content, add Atlanta to the locations grid, or bring back any of the fee schedule data behind the gated section.

Chozen deck preview
Code · HTML 
Chozen ip deck
ZIP 
Page
JS 
Globals
Code · CSS 
Give me the JS files

2:56 PM

Expedited request acknowledgment
Expedited request acknowledgment


Here are both JS files — page.js (the main deck) and layout.js. Drop them into your app/ directory along with the globals.css from earlier.

Page
JS 
Layout
JS 






Claude is AI and can make mistakes. Please double-check responses.
Layout · JS
Copy

import "./globals.css";

export const metadata = {
  title: "CHOZEN — Investment & Brand Deck",
  description: "CHOZEN — A regenerative living brand. Wellness, hospitality, nature, community. Investment opportunities in branded developments worldwide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

