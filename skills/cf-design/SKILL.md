---
name: cf-design
description: Apply the Creative Force design system to any output that should look on-brand — a web page, component, landing page, email, slide, ad, document, dashboard or graphic — in any tech stack. Use whenever the user asks to build, design, style or generate something for Creative Force or creativeforce.io, and whenever they say "make it on-brand", "use CF styles", "CF design", "match the brand", "Creative Force branding", "brand colors", "our design system", or "CF tokens". Also use before writing any frontend code in a Creative Force repo. Loads the token layer, the layout system and the brand rules so output starts from real constraints instead of generic defaults. Pair with cf-design-review to audit something that already exists.
---

# Build something on brand for Creative Force

## Where the system lives

This skill is normally a **symlink** into the design system repo, so a lexical
`../../DESIGN.md` resolves to the wrong place. Get the real root first:

```bash
ROOT=$(dirname "$(dirname "$(readlink -f "$HOME/.claude/skills/cf-design" 2>/dev/null \
       || readlink "$HOME/.claude/skills/cf-design")")")
ls "$ROOT"        # DESIGN.md  brand/  patterns/  tokens/
```

If that comes back empty the skill isn't symlinked — it is already inside the repo,
and `../../` from this file is the root. Every path below is relative to `$ROOT`.

## 1. Read the spec first

**Read `$ROOT/DESIGN.md` in full before writing anything.** It is ~570 lines and it
is the contract: measured values, semantic roles, component defaults, and a
do-not-use list. Do not work from memory of "a blue SaaS brand" — the specifics are
what stop the output being generic.

If the work touches logo, icons, illustration or texture, also read
`$ROOT/brand/BRAND.md`.

## 2. Know which tier you are in

- **Invariants — never break.** The colour *hues* (a closed set), Inter, headings at
  600 with tight negative tracking, grain inside shapes only, logo integrity, blue
  used about three times per view.
- **Defaults — override with intent.** Radius steps, spacing, component recipes, shadow
  softness. If the composition genuinely wants something else, take it and say why.
- **Free — your craft.** Layout, hierarchy, whitespace, density, motion, and
  **inventing components DESIGN.md doesn't enumerate.** There is no pricing table in
  the spec. Design one, on brand, without asking. Compose; don't pattern-match.

Operate as the brand's designer, not its compliance officer.

## 3. Check what the target project already has

Before emitting tokens, scan the target for an existing token layer:

- CSS custom property blocks (`:root`, `tokens.css`, `variables.css`, `globals.css`)
- `tailwind.config.*` or a v4 `@theme` block
- a theme object (`theme.ts`, `createTheme`, `extendTheme`)
- a design-token JSON (Style Dictionary, Tokens Studio, DTCG)

If one exists, **extend it** — add the CF values under the names it already uses.
Don't drop a second parallel system beside it.

## 4. Pick the output for the stack

| Target | File |
|---|---|
| Plain CSS / HTML / anything (the default) | `$ROOT/tokens/dist/tokens.css` |
| Sass | `$ROOT/tokens/dist/tokens.scss` |
| Tailwind v4 | `$ROOT/tokens/dist/tailwind.css` |
| CSS-in-JS, React Native, a generator | `$ROOT/tokens/dist/tokens.js` |
| Figma (Tokens Studio) | `$ROOT/tokens/dist/figma.tokens.json` |
| Layout / grid | `$ROOT/patterns/layout.css` — framework-free, zero specificity |
| Self-hosted type | `$ROOT/brand/fonts/` (`font-face.css` + two woff2) |

For a non-web medium — a deck, a PDF, a print piece, an ad — there is no stylesheet
to import. Read the values out of `tokens.json` and apply them by hand. The system is
the values, not the CSS.

**Never hardcode a hex, a font stack, or a size that has a token.** If you need a
value the tokens don't carry, that is a signal to add a token in
`$ROOT/tokens/tokens.json` and re-run `node ../../tokens/build.mjs` — not to inline
the literal.

## 5. Build

Work from the component defaults in DESIGN.md's Components section, then compose freely. Some things
that are easy to get wrong and cheap to get right:

- **Left-align.** Marketing layouts are left-aligned, not centred.
- **Give it air.** Negative space is a brand asset. When unsure, take the larger gap.
- **One idea per view.** One bold statement, supported — not four equal columns.
- **Put the colour in the artwork.** A section background stays neutral.
- **Don't set colour on a heading.** It inherits its surface, which is what makes
  dark card variants work without an override.
- **Keep buttons light.** Pill or underlined text. No shadow, no lift, no scale,
  weight 500. A CTA that looks raised off the page is the most common CF mistake.
- **Use the house easing** `--cf-motion-easing-standard` before reaching for another.
- **Reduced motion and visible focus are not optional.** See the Do's list in DESIGN.md.

## 6. Self-check before you hand it over

Walk the Don'ts list in DESIGN.md against what you just produced. The ones
that catch most output:

- grain used as a background rather than inside a shape
- a coloured or dark section band used as decoration
- an off-palette hue, or a red
- emoji or a non-Streamline icon
- a heavy button — shadow, hover lift, press scale, 600 weight, or a squared corner
- a component that forked the type ladder with its own `clamp()`
- a raw hex where a token exists
- a centred layout
- a four-up strip of oversized numerals

Then say, in one line, which defaults you overrode and why. That is the part a
reviewer needs and cannot recover from the code.

## Seeing it

`$ROOT/patterns/demo.html` renders every token and component from the generated CSS.
Open it in a browser when you want to check a value looks the way you expect, or when
you have changed a token and want to see what moved.
