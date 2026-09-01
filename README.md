# Creative Force Design System

Everything that defines how Creative Force looks — colours, type, spacing, logo,
icons, components — written down in files that both people and AI assistants can
read. Nothing to install, no coding required to use it.

## The 30-second version

Point Claude at this folder and ask for what you need:

```
Read DESIGN.md in this folder, then build me a landing page hero.
```

[`DESIGN.md`](DESIGN.md) is the whole brand in one document. Claude reads it and
starts from real Creative Force constraints instead of generic defaults. That one
prompt is genuinely all you need — everything below is detail.

## Using it with Claude

### In Claude Code (terminal, desktop app, or IDE)

**One-time setup — install the skills.** Open a terminal, go to this folder, and run:

```bash
./install.sh
```

This links the two Creative Force skills into Claude's skills folder (it makes
links, not copies, so they stay up to date when this repo changes — safe to re-run
any time). From then on, **every** Claude Code session on your machine knows the
brand automatically:

- Ask for something new — *"build me an on-brand pricing section"*, *"make this
  page match the Creative Force brand"* — and the `cf-design` skill loads the
  colours, type and rules before a line is written.
- Ask for a check — *"is this on brand?"*, *"review this page against our design
  system"* — and `cf-design-review` audits it and reports what's off, ranked by
  severity.

Skipped the setup? No problem — start your request with *"Read DESIGN.md in this
folder first"* and it works the same for that session.

### On claude.ai (the website — no terminal needed)

1. Create a **Project** on claude.ai.
2. Upload `DESIGN.md` (and `brand/BRAND.md` if you'll work with logos or
   illustrations) to the project's knowledge.
3. Every chat in that project now knows the brand — just ask.

For a one-off chat, attach `DESIGN.md` to the message instead.

### Prompts that work well

- *"Build me a hero section for Creative Force."*
- *"Design an on-brand slide layout for a customer deck."*
- *"Is this on brand?"* — with a screenshot or file attached
- *"What colour should this button be?"* — you'll get the token, not a guess

## What's in here

| | |
|---|---|
| **[`DESIGN.md`](DESIGN.md)** | **Start here.** The whole brand in one document: colours, type scale, spacing, components, do's and don'ts, and copy-paste starter code. |
| [`brand/BRAND.md`](brand/BRAND.md) | Logo, icon, illustration and grain rules. |
| `brand/` | The actual assets: logos, 38 icons, iso-cube illustrations, textures, the Inter font. |
| `tokens/tokens.json` | Every design value as data — the single source of truth. Edit here, never in `dist/`. |
| `tokens/dist/` | Ready-made files generated from it: CSS, SCSS, JS, Tailwind v4, Figma. |
| `patterns/layout.css` | The spatial system. Framework-free. |
| `patterns/demo.html` | Every token and component rendered. **Open it in a browser to see the brand.** |
| `skills/` | The two Claude Code skills installed by `./install.sh`. |

## For developers

Pick the artifact that matches your stack — all generated from the same file.

```css
/* anything                */ @import "tokens/dist/tokens.css";
/* + the grid              */ @import "patterns/layout.css";
/* self-hosted Inter       */ @import "brand/fonts/font-face.css";
```

```css
/* Tailwind v4 */
@import "tailwindcss";
@import "creative-force-design-system/tailwind.css";
```

```js
// CSS-in-JS, React Native, generators
import tokens from 'creative-force-design-system/tokens';
tokens.colorBlue;        // '#435CFF'
tokens.radiusMd;         // '12px'
tokens.typeDisplaySize;  // '2.75rem'
```

```scss
// Sass — $cf-* variables plus the same custom properties
@use "tokens/dist/tokens.scss";
```

## For designers and non-web work

**Figma:** import `tokens/dist/figma.tokens.json` into Tokens Studio.

**Print, decks, ads:** there is no stylesheet. Read the values out of `DESIGN.md`
(or `tokens/tokens.json`) and apply them by hand. **The system is the values, not
the CSS.**

## Changing a token

```bash
$EDITOR tokens/tokens.json     # 1. edit the source
npm run build                  # 2. regenerate dist/
npm test                       # 3. the checks still pass
open patterns/demo.html        # 4. look at it
```

Never edit anything in `tokens/dist/` — it is overwritten on every build. The Quick
Start blocks at the end of `DESIGN.md` are copies of `dist/`; `npm test` fails if
they drift, so update them from the regenerated files.

## Source of truth

Figma file `qeToOvCArvvSMU3i8rLb4D` (*Creative Force — Dreem*), node `1003-34`
"web 2026 home". `CreativeForce-HubspotCMS` is the reference implementation.

Three earlier internal systems disagreed on radius, heading weight, grain and
surface colour. Figma settled all of them, and [`DESIGN.md`](DESIGN.md) records the
resolutions so they stop resurfacing. The short version: **radius is a scale
(8/12/16/100), headings are 600, buttons are light pills at weight 500 with no
shadow, grain is never a background, and surfaces are flat fills.**
