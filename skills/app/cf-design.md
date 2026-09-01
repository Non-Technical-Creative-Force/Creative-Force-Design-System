---
name: cf-design
description: Apply the Creative Force design system to any output that should look on-brand — a web page, component, landing page, email, slide, ad, document, dashboard or graphic — in any tech stack. Use whenever the user asks to build, design, style or generate something for Creative Force or creativeforce.io, and whenever they say "make it on-brand", "use CF styles", "CF design", "match the brand", "Creative Force branding", "brand colors", "our design system", or "CF tokens". Also use before writing any frontend code in a Creative Force repo. Loads the token layer, the layout system and the brand rules so output starts from real constraints instead of generic defaults. Pair with cf-design-review to audit something that already exists.
---

# Build something on brand for Creative Force

Self-contained version for the Claude app — the full design spec is embedded below.

- **Read the embedded DESIGN.md in full before producing anything.** Do not work
  from memory of "a blue SaaS brand" — the specifics are what stop the output
  being generic. For logo, icon, illustration or grain questions, the embedded
  BRAND.md follows it.
- **Know your tier.** Invariants (the hues, Inter, 600 headings with tight
  tracking, grain inside shapes, logo integrity, blue ~3 uses per view) never
  break. Defaults (radius, spacing, component recipes) can be overridden with
  intent — say why. Layout, hierarchy, whitespace and inventing components the
  spec doesn't enumerate are your craft. Operate as the brand's designer, not its
  compliance officer.
- **Emit tokens where the target supports them.** The Quick Start blocks at the
  end of the spec are copy-paste-ready CSS and Tailwind. For a non-web medium — a
  deck, a doc, an ad — apply the values by hand; the system is the values, not
  the CSS.
- **Self-check** against the spec's Don'ts list before handing over, and say in
  one line which defaults you overrode and why.

---

# The spec — DESIGN.md (embedded)

# Creative Force — Style Reference
> one bold idea, floating in warm ivory air

**Theme:** light

Creative Force operates as a calm, warm, editorial environment — warm stone and
ivory surfaces with generous air around **one bold idea per view**. Colour lives in
the artwork and the accents, never in a section background: a single confident blue
(`#435CFF`) carries every action, and the ground stays neutral. Typography is Inter
everywhere — headings at weight 600 with tight negative tracking, hierarchy built
from scale and whitespace rather than weight or colour. Everything is left-aligned.
The signature imagery is an isometric cube whose colour states carry meaning, with
grain baked inside the shapes. The voice matches the surface: plain, direct,
operator-to-operator, short declaratives, no exclamation points. Data is quiet —
state the number and move on. The failure mode to design against is generic SaaS: a
dark band of oversized white numbers, three identical feature cards with emoji, a
gradient hero. Negative space is a primary brand asset; when unsure, choose the
larger gap.

Every value below traces to a token generated from `tokens/tokens.json` into
`tokens/dist/`. **Emit the token, not the literal** — hex codes appear here so you
recognise the brand, not so you paste them. Hues, Inter, tight-tracked headings,
grain-inside-shapes, logo integrity and accent restraint are invariants; radius,
spacing steps and shadow softness are defaults you may override with intent; layout,
hierarchy, density and **inventing components this file doesn't enumerate** are your
craft. There is no pricing table here — design one, on brand, without asking.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Blue | `#435CFF` | `--cf-color-blue` | The one accent — primary CTA, links, one piece of artwork. About three uses per view; a page where everything is blue has no emphasis left. Hover `#3C53E6`, active `#374BD1` |
| Black | `#000000` | `--cf-color-black` | Body text, the footer panel, dark card variants, cube edges, logo on light — never a decorative band |
| White | `#FFFFFF` | `--cf-color-white` | The default page ground — most of the page |
| Stone 100 | `#F1EFEA` | `--cf-color-stone-100` | Warm band, cards and panels — punctuation against white, not the norm |
| Stone 200 | `#E4DFD9` | `--cf-color-stone-200` | Raised fill — a card sitting *on* a warm band |
| Stone 300 | `#D2CAC1` | `--cf-color-stone-300` | Hairlines, visible rules, logo-wall gaps |
| Stone 400 | `#B5ACA0` | `--cf-color-stone-400` | The quiet deep end of the warm ramp — decorative neutral only |
| Stone 500 (Brown) | `#90867A` | `--cf-color-stone-500` | Labels and dividers, never running text — it fails AA at 14px |
| Sage 300 | `#BCC2AF` | `--cf-color-sage-300` | Cool-green counterpart for illustration and the occasional one-off card — not a general surface |
| Sage 400 | `#9CA28E` | `--cf-color-sage-400` | The deeper sage, same rules |
| Green | `#686F5C` | `--cf-color-green` | STATE only — positive. Status dots, validation, badges. Never a surface, never decoration |
| Yellow | `#F8E198` | `--cf-color-yellow` | STATE only — caution. Same rules as green; they exist because there is no brand red |
| Muted Text | `#5F5F5F` | `--cf-color-text-muted` | Secondary copy — a black-ramp shade, deliberately *not* brown, so 14px text keeps AA on white and warm surfaces |
| Blue Tint 10 | `rgba(67,92,255,.1)` | `--cf-color-blue-tint-10` | The lightest blue wash |
| Blue Tint 25 | `rgba(67,92,255,.25)` | `--cf-color-blue-tint-25` | Text selection |

Any shade, tint or alpha of a palette hue is allowed — shading blue is fine, turning
it teal is not. **Alpha is for blue only**: warm neutrals are always opaque ramp
steps, because alpha compounds where cards stack, and the bento layouts stack
constantly. If you want an eleventh colour, the answer is a stone step or an alpha
of blue. Only genuinely destructive chrome (a delete confirmation) earns a
desaturated red, and that is chrome, not brand.

## Tokens — Typography

### Inter — Single typeface across all contexts, self-hosted variable (`InterVariable`) first. Headings are weight 600, not 700 — only the hero display and an article title go to 700, and they are distinct display styles, not forks of the ladder. Hierarchy comes from scale and space, not from weight or colour: headings carry **no colour** and inherit the surface they sit on, so a dark card's title comes out right for free. Marketing copy runs at line-height 1.4; 1.6 is reserved for long-form article prose. The scale has **no 15px** — its absence is a brand marker. · `--cf-font-family-sans`
- **Substitute:** Inter (static), then system-ui
- **Weights:** 400, 500, 600, 700, 800
- **Sizes:** 10, 12, 14, 16, 18, 20, 24, 32, 44, 110px
- **Line height:** 1.2, 1.3, 1.375, 1.4, 1.6
- **Letter spacing:** −0.03em at 44/32px, −0.02em at 24px, −0.01em at 18px, −0.04em at 110px, +0.02em on 12/10px uppercase
- **OpenType features:** `"cv01" on`, contextual ligatures, `font-optical-sizing: auto`
- **Role:** Never set `font-variation-settings` on `:root` — it is inherited and applied after `font-weight`, so a `wght` there silently flattens every bold under it. Use `font-weight`. For container-responsive components use `--cf-type-fluid-*` (resolves against the component's own container via `cqi`, so the same component works in a sidebar and full-bleed without a media query).

### Type Scale

| Role | Size | Weight | Line Height | Letter Spacing | Token |
|------|------|--------|-------------|----------------|-------|
| badge | 10px | 500 | 1.4 | +0.02em, UPPERCASE | `--cf-type-badge-*` |
| eyebrow | 12px | 500 | 1.4 | +0.02em, UPPERCASE | `--cf-type-eyebrow-*` |
| body-sm | 14px | 400 | 1.4 | — | `--cf-type-body-sm-*` |
| body | 16px | 400 | 1.4 | — | `--cf-type-body-*` |
| prose (long-form) | 16px | 400 | 1.6 | — | `--cf-type-prose-*` |
| button | 16px | 500 | 1.375 | — | `--cf-type-button-*` |
| card-title | 18px | 600 | 1.3 | −0.01em | `--cf-type-card-title-*` |
| lead | 20px | 500 | 1.4 | — | `--cf-type-lead-*` |
| subhead | 24px | 600 | 1.2 | −0.02em | `--cf-type-subhead-*` |
| section-h | 32px | 600 | 1.2 | −0.03em | `--cf-type-section-h-*` |
| display | 44px | 600 | 1.2 | −0.03em | `--cf-type-display-*` |
| hero (fluid) | clamp(40–68px) | 700 | 1.2 | −0.03em | `--cf-type-fluid-hero` |
| stat | 110px | 800 | 1.2 | −0.04em | `--cf-type-stat-*` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** spacious

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 1 | 4px | `--cf-space-1` |
| 2 | 8px | `--cf-space-2` |
| 3 | 12px | `--cf-space-3` |
| 4 | 16px | `--cf-space-4` |
| 5 | 20px | `--cf-space-5` |
| 6 | 24px | `--cf-space-6` |
| 8 | 32px | `--cf-space-8` |
| 10 | 40px | `--cf-space-10` |
| 12 | 48px | `--cf-space-12` |
| 16 | 64px | `--cf-space-16` |
| 24 | 96px | `--cf-space-24` |

The gaps in the scale are intentional; there is no `space-7`.

### Border Radius

| Element | Value | Token |
|---------|-------|-------|
| screenshots, inline media, overlay panels | 8px | `--cf-radius-sm` |
| cards — the most common radius | 12px | `--cf-radius-md` |
| large containers, hero media frames | 16px | `--cf-radius-lg` |
| buttons, badges (full pill) | 100px | `--cf-radius-pill` |
| focus ring corner | 4px | `--cf-radius-focus` |

### Layout

- **Page max-width:** 1280px (`--cf-layout-max-width`) — this is the **content** width; the gutter `clamp(1rem, 5vw, 2.5rem)` is added on top, never eaten out of it
- **Section padding:** `clamp(64px, 8vw, 96px)` (`--cf-layout-section-pad`) — the one vertical rhythm every full-width section uses; don't invent variants
- **Reading measure:** `clamp(45ch, 60vw, 68ch)` (`--cf-layout-measure`), headlines capped at 18ch
- **Card padding:** 32px (`--cf-space-8`); bento insets 56–64px
- **Element gap:** 8–24px

## Components

### Primary Button
**Role:** Filled blue pill, the one action on the view

Background `#435CFF`, white text, fully round pill (100px radius), padding 14px
vertical × 28px horizontal. Inter 16px weight **500** — not 600; the heavier weight
is what makes a CF button shout. No shadow, no gradient, no hover lift, no press
scale — hover only darkens the fill to `#3C53E6`. If a button looks like it could be
pressed *into* the page, it is wrong.

### Secondary Button
**Role:** Outlined pill, the alternative beside a primary

Transparent fill, 2px solid black border, black text, same box as the primary
(14px × 28px padding, pill radius). Hover inverts: black fill, white text.

### Text Button
**Role:** Underlined text link, tertiary action or inline CTA

No box at all. Inter 16px weight 500, with a 2px rule drawn 6px below the text and
exactly as wide as it — a border, not `text-decoration`, so the weight and gap are
controlled. Black by default; brand blue when the link is doing a CTA's job. Hover
drops to 70% opacity. The header's real CTA is this component: "Book a demo" in the
nav is underlined blue text at 14px, not a filled pill. Reach for a pill when the
action holds a hero or card; reach for text when it sits in a row of links.

### Card
**Role:** The default content container

White fill (`#F1EFEA` on a white ground, `#E4DFD9` on a warm band), 1px
`rgba(0,0,0,.08)` hairline border, 12px radius, 32px padding. Hover: soft shadow
`0 8px 30px rgba(0,0,0,.06)` and `translateY(-2px)` over 250ms. No heavy shadows at
rest — resting elevation is `0 1px 2px rgba(0,0,0,.04)` or nothing.

### Badge Pill
**Role:** Category label on cards, nothing else

White fill, full pill radius, padding 3px × 8px, 10px weight 500 uppercase text in
brand blue with +0.02em tracking.

### Eyebrow + Heading
**Role:** The CF signature pair opening every section

12px weight 500 uppercase eyebrow above a 32px weight 600 heading, 20px gap.
Optionally a 1px `#D2CAC1` topline running from the eyebrow to the right edge with a
small corner arrow. Both are colourless and inherit their surface — a global
`h3 { color: … }` blacks out every dark card in the system.

### Navigation Bar
**Role:** Light top bar on the page ground

Horizontal logo lockup left (needs ~120px width; the standalone "C" mark for
compact/scrolled states). Links in Inter at body sizes, black. The CTA is an
underlined blue text button at 14px — not a filled pill. No dark nav band, no
backdrop tricks.

### Hero
**Role:** Editorial split, left-aligned

Eyebrow and heading in a narrower left column, supporting copy in a right column,
media below or beside. Display type at `--cf-type-fluid-hero`
(`clamp(2.5rem, 1.6rem + 4.2vw, 4.25rem)`), weight 700 — the one place 700 appears
outside article titles. No centred CTA cluster, no gradient, no full-bleed photo
with overlay text.

### Bento / Story Card
**Role:** Square editorial tile in a bento grid

1:1 aspect, 12px radius, inset 56–64px. Heading pinned to the top, caption to the
bottom (`grid-template-rows: auto 1fr auto`). A photo card gets a bottom-up
`mix-blend-mode: multiply` scrim over roughly the lower 48%, in a dark
brand-adjacent tone. Two-up above ~760px of container width.

### Stats Panel
**Role:** The quiet data moment

A warm `#F1EFEA` panel: heading in a fixed left column, oversized numerals right at
110px weight 800 with −0.04em tracking, an uppercase eyebrow caption below each.
Reserve the 110px size for **one** hero moment per page — a four-up strip of huge
numbers on a dark band is the SaaS cliché this brand is defined against.

### Logo Wall
**Role:** Customer/partner logos at one optical weight

A grid whose 1px gaps expose a `#D2CAC1` background — the gaps *are* the rules.
Cells are `#F1EFEA`, logos capped at ~68% cell width and 38px tall with
`object-fit: contain`, so unlike marks read at one weight.

### Isometric Cube Illustration
**Role:** Signature brand imagery — states carry meaning

Three faces at 30°, thin 1px black edges drawn as individual lines (never a border
on a face — it doubles every shared edge), grain baked into the fill. The colour
states mean something and are never decorative: stone `#F1EFEA` = before, the
generic unimproved state; a stone→blue split or lifting lid = in transition; blue
`#435CFF` = activated, the state Creative Force produces; pale `#E5E9FF`
(`--cf-color-iso-potential`) = ghost, potential not yet realised. Files in
`brand/illustrations/`; full semantics in `brand/BRAND.md`.

## Do's and Don'ts

### Do
- Emit the token, not the literal — if you need a value the tokens don't have, that is a signal to add a token, not to inline a hex
- Left-align everything — headings, copy, CTAs; centred marketing layouts are off brand
- Hold to one bold idea per view; when unsure, choose the larger gap
- Reserve blue for about three uses per view: a primary CTA, a link, one piece of artwork
- Keep headings weight 600 and colourless — colour goes on the component container, and only the hero display and article titles use 700
- Use the house motion curve `cubic-bezier(.22, 1, .36, 1)` (easeOutQuint) at 200ms as the default transition; card hover 250ms, scroll reveal fade-up 20px over 700ms with a 60ms sibling stagger capped at 4 steps
- Treat scroll reveal as progressive enhancement — hide nothing until JS has confirmed it can un-hide it, and keep a timeout fallback
- Honour `prefers-reduced-motion: reduce` by collapsing all animation and transition durations
- Keep focus visible: 2px blue outline, 2px offset, 4px radius, on `:focus-visible`
- Use `#5F5F5F` for secondary copy and check contrast on the warm surfaces, not just on white — they are the ones that quietly fail
- Set `text-wrap: balance` on headings, `pretty` on paragraphs, and cap the measure; keep touch targets at 24px minimum, 32px on phones in dense lists

### Don't
- Do not use grain as a background — grain goes *inside* shapes and illustrations, clipped to their bounds; never on `body`, a section, a hero, or as a site-wide overlay. Warm surfaces are a flat fill
- Do not use a coloured or dark section band as decoration — colour lives in the artwork; black is for the footer and dark card variants only
- Do not introduce a hue that isn't in the palette — shading blue is fine, turning it teal is not
- Do not use red for anything but genuinely destructive chrome — there is no brand red; green `#686F5C` and yellow `#F8E198` carry state
- Do not use emoji, Font Awesome, Heroicons, or one-off SVGs — Streamline **Core Line** only, at `currentColor`, 20–24px; `brand/icons/` ships 38 of them
- Do not recolour, rotate, stretch, shadow or rebuild the logo, or reintroduce the old colour-gradient lens mark — see `brand/BRAND.md`
- Do not make a heavy button — no shadow or glow under a CTA, no hover lift, no press scale, no 600-weight label, no squared corner where the pill belongs
- Do not fork the type ladder — a component writing its own `font-size: clamp(…)` instead of a `--cf-type-*` token is a bug
- Do not put colour on `h1`–`h4`, `.cf-heading` or `.cf-eyebrow` — they inherit their surface
- Do not set `font-variation-settings` on `:root` — it silently flattens every bold; use `font-weight`
- Do not use 15px anything — the design has no 15px
- Do not build a 4-up strip of oversized numbers on a dark band — data is quiet
- Do not use alpha on warm neutrals — alpha is for blue only; warm surfaces are opaque ramp steps

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Page Ground | `#FFFFFF` | The default. Most of the page |
| 1 | Warm Band / Card | `#F1EFEA` | Editorial sections, cards and panels — punctuation against white |
| 2 | Raised Fill | `#E4DFD9` | A card sitting on a warm band |
| 3 | Dark Panel | `#000000` | Footer and dark card variants only — never decoration |

Edges between and around surfaces are 1px: `rgba(0,0,0,.08)` for card outlines on
light, `rgba(255,255,255,.12)` on dark, and opaque `#D2CAC1` where a rule should
actually be seen (toplines, logo-wall gaps).

## Elevation

Shadows are soft and subtle, or absent — and absent is the default. Two levels only:
`0 1px 2px rgba(0,0,0,.04)` (`--cf-shadow-sm`) for a resting card and
`0 8px 30px rgba(0,0,0,.06)` (`--cf-shadow-default`) for a hover lift. **Buttons
carry no shadow** — a coloured glow under a CTA is not this brand. Hierarchy comes
from the warm surface ramp, hairlines and whitespace, not from depth.

## Imagery

The signature visual is the isometric cube: three faces at 30°, thin black edges,
grain baked into the fill, colour states that carry meaning (stone = before, blue =
activated, pale `#E5E9FF` ghost = potential). Grain is a texture that lives *inside*
shapes and illustrations only — clipped or masked to their bounds, never a page or
section overlay. Icons are Streamline Core Line exclusively: thin even stroke at
`stroke-width: 1.5`, `currentColor`, 20–24px on screen; hierarchy comes from size
and colour, the icon style never changes. The logo is monochrome only — black on
light, white on dark or on blue, the standalone mark optionally in brand blue — with
clear space of at least 25% of the mark's width. Photography appears inside cards
and bento tiles with a bottom-up multiply scrim, never as a full-bleed hero with
text on top. No stock-photo heroes, no 3D renders, no emoji.

## Layout

Left-aligned editorial composition on a white canvas, content capped at 1280px with
a fluid gutter added outside it — a section that adds its own `padding-inline` ends
up narrower than its neighbours. Everything is centered-and-measure-capped by
default; you opt *out* to go wide via the width vocabulary in `patterns/layout.css`:
`content` (the reading measure) → `popout` (one deliberate step wider) → `feature`
(a bigger step, for media) → `full` (gutter to gutter), set with a `data-w`
attribute. Full-bleed warm bands (`.layout__band`) snap their children back to the
same tracks so a band's content aligns with everything above and below. One section
rhythm: `clamp(64px, 8vw, 96px)` vertical padding on every full-width section.
Heroes and feature sections use asymmetric two-column splits — heading left, support
right — never centred stacks. Density is spacious: generous air around one bold idea
per view, no card-grid walls, no mega-menus.

## Agent Prompt Guide

## Quick Color Reference
- Text: #000000 (primary), #5F5F5F (secondary), #FFFFFF (on dark)
- Background: #FFFFFF (page), #F1EFEA (warm band / card), #E4DFD9 (raised), #000000 (footer only)
- Border: rgba(0,0,0,.08) hairline; #D2CAC1 for visible rules; rgba(255,255,255,.12) on dark
- Accent: #435CFF — primary CTA, links, one artwork moment per view

## Example Component Prompts

1. **Hero Section**: White #FFFFFF ground, content max 1280px, left-aligned split. Left column: eyebrow at 12px Inter weight 500, uppercase, +0.02em tracking, #5F5F5F; below it a heading at clamp(2.5rem, 1.6rem + 4.2vw, 4.25rem) Inter weight 700, #000000, −0.03em tracking, max-width 18ch. Right column: lead paragraph at 20px Inter weight 500, line-height 1.4, #5F5F5F, max-width 45ch. Below: a filled blue pill button — #435CFF background, white text, 16px weight 500, padding 14px 28px, border-radius 100px, no shadow — beside a secondary pill with transparent fill and 2px solid #000000 border. Media below full-width with 16px radius.

2. **Section Opener**: Eyebrow 'HOW IT WORKS' at 12px Inter 500 uppercase #5F5F5F, a 1px #D2CAC1 topline running from the eyebrow to the right edge with a small corner arrow, then a heading at 32px Inter 600, −0.03em, inheriting the surface colour, 20px below the eyebrow. Supporting body at 16px weight 400 line-height 1.4, #5F5F5F, max-width 68ch.

3. **Card**: #FFFFFF fill, 1px solid rgba(0,0,0,.08), 12px border-radius, 32px padding. Top: badge pill — white fill, 10px Inter 500 uppercase #435CFF text, 3px 8px padding, pill radius. Title at 18px Inter 600, −0.01em. Body at 16px 400, #5F5F5F. Hover: shadow 0 8px 30px rgba(0,0,0,.06) and translateY(-2px) over 250ms cubic-bezier(.22, 1, .36, 1).

4. **Stats Panel**: Full-bleed warm band #F1EFEA, content aligned to the 1280px tracks, clamp(64px, 8vw, 96px) vertical padding. Heading at 32px Inter 600 in a fixed left column. Right: one numeral at 110px Inter weight 800, −0.04em tracking, #000000, with an uppercase 12px #5F5F5F eyebrow caption below. Quiet — no dark band, no icon decorations.

5. **Logo Wall**: A grid with background #D2CAC1 and 1px gaps so the gaps read as rules. Cells #F1EFEA with logos centred, capped at 68% cell width and 38px height, object-fit contain. No borders, no shadows, no captions.

## Similar Brands

- **Anthropic** — warm paper neutrals, editorial calm, one restrained accent, hierarchy from scale and space rather than decoration
- **Notion** — ivory ground, hairline borders, typographic UI that lets the content carry the page
- **Stripe** — a single disciplined action blue, quiet data, generous whitespace around one idea at a time
- **Linear** — the same systemic discipline (strict type ladder, one accent, token rigour) executed in the opposite, dark register

## Quick Start

The blocks below are copied from the generated `tokens/dist/` files
(`tokens/tokens.json` → `npm run build`). Inside this repo, import the dist files
instead of pasting; the copies here exist so this document works standalone.

### CSS Custom Properties

```css
:root {
  /* Colors */
  --cf-color-blue: #435CFF;
  --cf-color-black: #000000;
  --cf-color-white: #FFFFFF;
  --cf-color-stone-100: #F1EFEA;
  --cf-color-stone-200: #E4DFD9;
  --cf-color-stone-300: #D2CAC1;
  --cf-color-stone-400: #B5ACA0;
  --cf-color-stone-500: #90867A;
  --cf-color-sage-300: #BCC2AF;
  --cf-color-sage-400: #9CA28E;
  --cf-color-green: #686F5C;
  --cf-color-yellow: #F8E198;
  --cf-color-accent-hover: #3C53E6;
  --cf-color-accent-active: #374BD1;
  --cf-color-accent-focus: rgba(67, 92, 255, 0.32);
  --cf-color-accent-disabled: rgba(67, 92, 255, 0.38);
  --cf-color-blue-tint-10: rgba(67, 92, 255, 0.1);
  --cf-color-blue-tint-25: rgba(67, 92, 255, 0.25);
  --cf-color-surface-page: #FFFFFF;
  --cf-color-surface-card: #F1EFEA;
  --cf-color-surface-raised: #E4DFD9;
  --cf-color-surface-edge: #D2CAC1;
  --cf-color-surface-dark: #000000;
  --cf-color-text-default: #000000;
  --cf-color-text-muted: #5F5F5F;
  --cf-color-text-on-dark: #FFFFFF;
  --cf-color-text-on-dark-mut: rgba(255, 255, 255, 0.65);
  --cf-color-text-link: #435CFF;
  --cf-color-border-default: rgba(0, 0, 0, 0.08);
  --cf-color-border-on-dark: rgba(255, 255, 255, 0.12);
  --cf-color-iso-potential: #E5E9FF;
  --cf-color-grain-fade: rgba(242, 240, 236, 0);

  /* Typography — Font Family & Weights */
  --cf-font-family-sans: InterVariable, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --cf-font-weight-regular: 400;
  --cf-font-weight-medium: 500;
  --cf-font-weight-semibold: 600;
  --cf-font-weight-bold: 700;
  --cf-font-weight-heavy: 800;

  /* Typography — Scale (each role also has a -family token) */
  --cf-type-display-size: 2.75rem;
  --cf-type-display-weight: 600;
  --cf-type-display-line-height: 1.2;
  --cf-type-display-tracking: -0.03em;
  --cf-type-section-h-size: 2rem;
  --cf-type-section-h-weight: 600;
  --cf-type-section-h-line-height: 1.2;
  --cf-type-section-h-tracking: -0.03em;
  --cf-type-subhead-size: 1.5rem;
  --cf-type-subhead-weight: 600;
  --cf-type-subhead-line-height: 1.2;
  --cf-type-subhead-tracking: -0.02em;
  --cf-type-card-title-size: 1.125rem;
  --cf-type-card-title-weight: 600;
  --cf-type-card-title-line-height: 1.3;
  --cf-type-card-title-tracking: -0.01em;
  --cf-type-lead-size: 1.25rem;
  --cf-type-lead-weight: 500;
  --cf-type-lead-line-height: 1.4;
  --cf-type-body-size: 1rem;
  --cf-type-body-weight: 400;
  --cf-type-body-line-height: 1.4;
  --cf-type-body-sm-size: 0.875rem;
  --cf-type-body-sm-weight: 400;
  --cf-type-body-sm-line-height: 1.4;
  --cf-type-prose-size: 1rem;
  --cf-type-prose-weight: 400;
  --cf-type-prose-line-height: 1.6;
  --cf-type-button-size: 1rem;
  --cf-type-button-weight: 500;
  --cf-type-button-line-height: 1.375;
  --cf-type-eyebrow-size: 0.75rem;
  --cf-type-eyebrow-weight: 500;
  --cf-type-eyebrow-line-height: 1.4;
  --cf-type-eyebrow-tracking: 0.02em;
  --cf-type-badge-size: 0.625rem;
  --cf-type-badge-weight: 500;
  --cf-type-badge-line-height: 1.4;
  --cf-type-badge-tracking: 0.02em;
  --cf-type-stat-size: 6.875rem;
  --cf-type-stat-weight: 800;
  --cf-type-stat-line-height: 1.2;
  --cf-type-stat-tracking: -0.04em;
  --cf-type-fluid-display: clamp(2rem, 1.4rem + 2.4cqi, 2.75rem);
  --cf-type-fluid-section-h: clamp(1.75rem, 1.3rem + 1.6cqi, 2rem);
  --cf-type-fluid-subhead: clamp(1.25rem, 1rem + 0.8cqi, 1.5rem);
  --cf-type-fluid-hero: clamp(2.5rem, 1.6rem + 4.2vw, 4.25rem);
  --cf-type-fluid-stat: clamp(3.5rem, 2rem + 7cqi, 6.875rem);

  /* Spacing */
  --cf-space-1: 4px;
  --cf-space-2: 8px;
  --cf-space-3: 12px;
  --cf-space-4: 16px;
  --cf-space-5: 20px;
  --cf-space-6: 24px;
  --cf-space-8: 32px;
  --cf-space-10: 40px;
  --cf-space-12: 48px;
  --cf-space-16: 64px;
  --cf-space-24: 96px;

  /* Layout */
  --cf-layout-gutter: clamp(1rem, 5vw, 2.5rem);
  --cf-layout-max-width: 1280px;
  --cf-layout-section-pad: clamp(64px, 8vw, 96px);
  --cf-layout-measure: clamp(45ch, 60vw, 68ch);
  --cf-layout-measure-h: 18ch;

  /* Border Radius */
  --cf-radius-sm: 8px;
  --cf-radius-md: 12px;
  --cf-radius-lg: 16px;
  --cf-radius-pill: 100px;
  --cf-radius-focus: 4px;

  /* Buttons & Borders */
  --cf-button-pad-block: 14px;
  --cf-button-pad-inline: 28px;
  --cf-button-border-width: 2px;
  --cf-button-underline-offset: 6px;
  --cf-border-width-hairline: 1px;

  /* Shadows */
  --cf-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --cf-shadow-default: 0 8px 30px rgba(0, 0, 0, 0.06);

  /* Motion */
  --cf-motion-easing-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --cf-motion-easing-slide: cubic-bezier(0.075, 0.82, 0.165, 1);
  --cf-motion-easing-turn: cubic-bezier(0.65, 0, 0.35, 1);
  --cf-motion-duration-instant: 100ms;
  --cf-motion-duration-fast: 150ms;
  --cf-motion-duration-base: 200ms;
  --cf-motion-duration-lift: 250ms;
  --cf-motion-duration-slow: 450ms;
  --cf-motion-duration-reveal: 700ms;
  --cf-motion-reveal-distance: 20px;
  --cf-motion-reveal-stagger: 60ms;
}
```

### Tailwind v4

```css
@theme {
  /* Colors -> bg-cf-blue, text-cf-text-muted, border-cf-border-default */
  --color-cf-blue: #435CFF;
  --color-cf-black: #000000;
  --color-cf-white: #FFFFFF;
  --color-cf-stone-100: #F1EFEA;
  --color-cf-stone-200: #E4DFD9;
  --color-cf-stone-300: #D2CAC1;
  --color-cf-stone-400: #B5ACA0;
  --color-cf-stone-500: #90867A;
  --color-cf-sage-300: #BCC2AF;
  --color-cf-sage-400: #9CA28E;
  --color-cf-green: #686F5C;
  --color-cf-yellow: #F8E198;
  --color-cf-accent-hover: #3C53E6;
  --color-cf-accent-active: #374BD1;
  --color-cf-surface-page: #FFFFFF;
  --color-cf-surface-card: #F1EFEA;
  --color-cf-surface-raised: #E4DFD9;
  --color-cf-surface-edge: #D2CAC1;
  --color-cf-surface-dark: #000000;
  --color-cf-text-default: #000000;
  --color-cf-text-muted: #5F5F5F;
  --color-cf-text-on-dark: #FFFFFF;
  --color-cf-text-link: #435CFF;
  --color-cf-border-default: rgba(0, 0, 0, 0.08);
  --color-cf-border-on-dark: rgba(255, 255, 255, 0.12);

  /* Spacing -> p-cf-4, gap-cf-8 */
  --spacing-cf-1: 4px;
  --spacing-cf-2: 8px;
  --spacing-cf-3: 12px;
  --spacing-cf-4: 16px;
  --spacing-cf-5: 20px;
  --spacing-cf-6: 24px;
  --spacing-cf-8: 32px;
  --spacing-cf-10: 40px;
  --spacing-cf-12: 48px;
  --spacing-cf-16: 64px;
  --spacing-cf-24: 96px;

  /* Radius -> rounded-cf-md */
  --radius-cf-sm: 8px;
  --radius-cf-md: 12px;
  --radius-cf-lg: 16px;
  --radius-cf-pill: 100px;

  /* Shadows -> shadow-cf-sm */
  --shadow-cf-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-cf-default: 0 8px 30px rgba(0, 0, 0, 0.06);

  /* Type sizes -> text-cf-display */
  --text-cf-display: 2.75rem;
  --text-cf-section-h: 2rem;
  --text-cf-subhead: 1.5rem;
  --text-cf-card-title: 1.125rem;
  --text-cf-lead: 1.25rem;
  --text-cf-body: 1rem;
  --text-cf-body-sm: 0.875rem;
  --text-cf-eyebrow: 0.75rem;
  --text-cf-badge: 0.625rem;
  --text-cf-stat: 6.875rem;

  /* Fonts -> font-cf-sans, font-cf-semibold */
  --font-cf-sans: InterVariable, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-weight-cf-regular: 400;
  --font-weight-cf-medium: 500;
  --font-weight-cf-semibold: 600;
  --font-weight-cf-bold: 700;
  --font-weight-cf-heavy: 800;

  /* Easings -> ease-cf-standard */
  --ease-cf-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-cf-slide: cubic-bezier(0.075, 0.82, 0.165, 1);
  --ease-cf-turn: cubic-bezier(0.65, 0, 0.35, 1);
}
```


---

# Brand assets — BRAND.md (embedded)

# Creative Force — brand assets

Logo, icons, illustration and texture. The rules that `DESIGN.md` points at.

---

## Logo

Six files in `brand/logo/`, monochrome only.

| File | Form | Use |
|---|---|---|
| `creative-force-secondary-{black,white}.svg` | Horizontal lockup — mark + wordmark | **The default.** Nav bars, headers, email, document footers. |
| `creative-force-primary-{black,white}.svg` | Stacked lockup — mark over wordmark | Where the space is taller than it is wide: covers, posters, square social. |
| `creative-force-mark-{black,white}.svg` | The standalone "C" mark | Compact and scrolled states, favicons, mobile headers, avatars. |

**Which colour.** Black on a light surface. White on a dark surface. White on blue.
The mark alone may also be set solid in brand blue. That is the whole matrix.

**Sizing.** The wordmark needs about 120px of width to stay legible; the mark needs
about 24px. Clear space on all sides is at least 25% of the mark's width — measure
it from the mark, not from the bounding box of the file.

**Never.** Recolour it (beyond the black / white / blue-mark set). Apply a gradient,
shadow, glow or outline. Stretch, squash or rotate it. Place it on a busy photo or a
low-contrast ground. Rebuild the wordmark in a font. Reintroduce the old colour
gradient lens mark — the brand moved to a single-colour logo deliberately.

---

## Icons

**Streamline Core Line. One style, everywhere.** Thin, even stroke; `currentColor`
so an icon inherits its surface's text colour; 20–24px on screen.

`brand/icons/` ships the set already in use:

- `sm/` (9) — `ai-chat`, `arrow`, `arrow-left`, `arrow-right`, `check`, `path`,
  `play`, `support`, `talk`. The arrows are drawn on a 28×20 box; the rest 20×20.
- `md/` (29) — the capability and product glyphs, all on a 36×36 box: `workflow`, `pipeline`,
  `generative-ai`, `data-management`, `style-guide`, `intelligence`, `planning`,
  `reporting`, `sample-management`, `share-for-review`, `task-assignment`,
  `talent-management`, `ecommerce-fashion`, `cloud-architecture`, `gateway-api`,
  `contact-sheet`, `color-swatches`, `model-motion`, `video`, `video-share`,
  `photo`, `copy`, `tracking`, `vendor`, `community`, `headache`, `support`,
  `support-2`, `data-management-2`. All 20×20.

Every file carries `stroke="currentColor" stroke-width="1.5"` on its root with round
caps and joins, and `fill="none"`. Inlined, it takes its parent's text colour; used as
an `<img>`, it renders black. Set the rendered size on the element, not in the file.

Need one that isn't here: take it from Streamline Core Line, add the same stroke
attributes, and drop it in `md/`. Hierarchy comes from **size and colour**; the icon
style never changes.

**Never** Font Awesome, Heroicons, Material, an emoji, or a hand-drawn one-off. A
text-only column where the design calls for an icon is also wrong.

---

## Illustration — the isometric cubes

The signature. Three faces, thin black edges, 30°, grain baked into the fill. In
`brand/illustrations/`.

**The cube states mean something. Don't use them decoratively.**

| State | Colour | Meaning |
|---|---|---|
| Neutral | `--cf-color-stone-100` `#F1EFEA` | Before. The generic, unimproved state. |
| Transition | stone→blue split, or a blue lid lifting with dotted guides | In motion. Something is being changed. |
| Activated | `--cf-color-blue` `#435CFF` | Realised. The state Creative Force produces. |
| Ghost | `--cf-color-iso-potential` `#E5E9FF` | Potential. What could be, not yet. |

Edges are `--cf-color-black`, drawn as individual 1px lines — never as a
border on a face, which doubles every shared edge.

Shipped: `box-single-{neutral,blue}.svg`, `box-stacked-{light,blue}.svg`,
`cube-{empty,half,full}.svg`.

**Never** recolour a cube outside stone and blue. Never flatten the grain out of one.
Never add a drop shadow. Never scatter cubes as background decoration — each one is a
statement about a state.

**Photography**, where it appears, is editorial: warm-toned, people-centric,
long-exposure motion blur, masked into `--cf-radius-md` rounded rectangles.

---

## Grain

`brand/textures/grain.svg` — a warm `#D2CAC1` (`--cf-color-surface-edge`) discrete speckle on a 600×600 tile
(`feTurbulence fractalNoise`, `baseFrequency 1 1`, 3 octaves, seed 905, run through
`luminanceToAlpha` and a discrete transfer so it stays speckle, not smoke).

Two companions for specific jobs: `card-noise.svg` (sage card fill) and
`numeral-noise.svg` (the texture inside oversized stat numerals, via
`background-clip: text`).

**The rule, and it is an invariant:** grain goes **inside shapes and illustrations
only** — clipped or masked to a shape's bounds. Never on `body`. Never on a section.
Never on a hero. Never as a site-wide overlay. Warm surfaces are a **flat fill**.

An earlier internal system said the opposite — apply `.cf-grain` to `body` and to
cards. That is superseded. The Figma source draws flat `#E4DFD9` cards on flat
`#F1EFEA` bands with no overlay.

The one exception is a deliberate, separate filmic pass over an entire page — a very
low-opacity `soft-light` layer at `--cf-z-grain`. That is an art-directed decision
for a specific page, not the default surface treatment, and it is not what "grain" in
this brand means.

*Tokens:* `--cf-color-surface-edge` (the grain flood colour),
`--cf-color-iso-potential`, `--cf-z-grain`. The cube's other three states are
`stone-100`, `blue` and `black` — they are the palette, not separate tokens.
