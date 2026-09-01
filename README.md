# Creative Force Design System

Everything that defines how Creative Force looks — colours, type, spacing, logo,
icons, components — written down in files that both people and AI assistants can
read. No coding required to use it.

## The 30-second version

Point Claude at this folder and ask for what you need:

```
Read DESIGN.md in this folder, then build me a landing page hero.
```

[`DESIGN.md`](DESIGN.md) is the whole brand in one document. Claude reads it and
starts from real Creative Force constraints instead of generic defaults. That one
prompt is genuinely all you need — everything below is detail.

## One-time setup: teach Claude the brand

Install the two Creative Force skills once, and **every** Claude Code session on
your computer knows the brand automatically — no more "read DESIGN.md first".

### The easy way — let Claude install it for you

1. Open the **Claude Code app** (or Claude Code in your terminal or editor).
2. Open **this folder** in it (in the desktop app: pick this folder when it asks
   where to work; in a terminal: start `claude` from inside this folder).
3. Type this message and press Enter:

   ```
   Run ./install.sh
   ```

4. If Claude asks for permission to run it, say yes.
5. You'll see two lines like `linked cf-design` and `linked cf-design-review`.
   That's it — you're done.

### The manual way — Terminal on a Mac

1. Press **⌘ + Space**, type `Terminal`, press **Return**.
2. Type `cd ` (c, d, then one space) — **don't press Return yet.**
3. Drag this folder from Finder onto the Terminal window (the path appears
   automatically), **now** press **Return**.
4. Type `./install.sh` and press **Return**.
5. You'll see `linked cf-design` and `linked cf-design-review`. Done.

The script only makes links, not copies — the skills stay up to date when this
folder changes, and it's safe to run again any time.

### Check that it worked

Open any Claude Code session (any folder, doesn't matter) and ask:

```
Make me an on-brand Creative Force button.
```

If the answer talks about a blue pill (`#435CFF`), Inter at weight 500 and no
shadow — it worked.

## What you can ask for

Once the skills are installed, just talk to Claude in plain language:

- *"Build me an on-brand pricing section."* — the `cf-design` skill loads the
  colours, type and rules before a line is written.
- *"Make this page match the Creative Force brand."*
- *"Is this on brand?"* — with a screenshot or file attached — the
  `cf-design-review` skill audits it and reports what's off, ranked by severity.
- *"What colour should this button be?"* — you'll get the token, not a guess.

## On claude.ai (the website — no apps, no terminal)

1. Go to **claude.ai** and create a **Project**.
2. Upload `DESIGN.md` (and `brand/BRAND.md` if you'll work with logos or
   illustrations) to the project's knowledge.
3. Every chat in that project now knows the brand — just ask.

For a one-off chat, attach `DESIGN.md` to the message instead.

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
