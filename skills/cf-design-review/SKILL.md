---
name: cf-design-review
description: Audit an existing asset against the Creative Force design system and report what is off brand. Use whenever the user asks "is this on brand", "review this design", "does this match the brand", "brand check", "design QA", "audit this page", "check our styles", "is this CF", or shares a page, screenshot, component, deck, email or ad and wants brand feedback rather than new work. Checks the invariants, token usage versus hardcoded values, contrast, and the do-not-use list, then reports findings ranked by severity. Pair with cf-design to actually build or fix something.
---

# Review something against the Creative Force brand

This is the audit job, not the build job. If the user wants something *made*, use
`cf-design` instead.

## Where the system lives

This skill is normally a **symlink** into the design system repo, so a lexical
`../../DESIGN.md` resolves to the wrong place. Get the real root first:

```bash
ROOT=$(dirname "$(dirname "$(readlink -f "$HOME/.claude/skills/cf-design-review" 2>/dev/null \
       || readlink "$HOME/.claude/skills/cf-design-review")")")
ls "$ROOT"        # DESIGN.md  brand/  patterns/  tokens/
```

If that comes back empty the skill isn't symlinked — it is already inside the repo,
and `../../` from this file is the root. Every path below is relative to `$ROOT`.

## What you are reviewing

**Read `$ROOT/DESIGN.md` before you review anything** — you cannot audit against a
spec you have not read.

Work from whatever you were given: source files, a URL, a screenshot, a Figma node, a
deck. If it is code, read it. If it is an image, look at it and say what you can and
cannot judge from a picture — you can see a centred layout and a wrong hue; you
cannot see whether a value came from a token.

## The pass

Go in this order. Stop nothing early — collect everything, then rank.

**1. Invariants.** These are the findings that matter most.

- Any hue outside the ten: blue `#435CFF`, black, white, stone `#F1EFEA` `#E4DFD9`
  `#D2CAC1` `#B5ACA0` `#90867A`, sage `#BCC2AF` `#9CA28E` — or a shade/tint/alpha of
  one. A near-miss blue is a finding. Green `#686F5C` and yellow `#F8E198` are legal
  only as state (a status dot, a validation message), never as surface or decoration.
- Grain used as a page, section, hero or body background rather than clipped inside a
  shape. Warm surfaces must be a flat fill.
- A coloured or dark section band carrying the visual interest instead of the artwork.
- Type that isn't Inter. Headings that aren't ~600 with negative tracking.
- A recoloured, distorted, shadowed or rebuilt logo; the old gradient lens mark.
- Blue used more than about three times in one view — accent inflation.
- A red used for anything but genuinely destructive chrome.

**2. Token discipline.** Only meaningful when you can see the source.

- Hardcoded hexes, font stacks, sizes, radii, durations or easings that have a token.
- A component that forked the type ladder with its own `font-size: clamp(...)`.
- A colour set on `h1`–`h4`, `.cf-heading` or `.cf-eyebrow` — it breaks every dark
  variant.
- Radius that doesn't land on 8 / 12 / 16 / 100. Cards are 12, buttons are 100.
- Spacing off the 4px scale.

**2b. Buttons.** The most common way CF output goes wrong.

- A shadow or coloured glow under a CTA. There is none in this brand.
- A hover lift (`translateY`) or press scale. Neither exists.
- A squared or 16px-radius button — the pill is `--cf-radius-pill` (100px).
- A 600-weight label. Buttons are 500.
- A filled pill used where the design uses a text button: in a row of nav links, the
  CTA is underlined text, not a block.

**3. Composition.** Softer, but this is where output reads as generic.

- Centred marketing layout instead of left-aligned.
- Cramped — the brand's default is more air than feels necessary.
- More than one bold idea competing per view.
- A four-up strip of oversized numerals. Data is quiet.
- Emoji, Font Awesome, Heroicons, or an ad-hoc SVG where a Streamline Core Line icon
  belongs. A text-only column where the design wants an icon.
- Iso-cubes used decoratively rather than to say neutral / transition / activated /
  ghost.

**4. Accessibility.** Check on the warm surfaces, not just on white — those are the
ones that quietly fail.

- Contrast: body copy at 14px needs `--cf-color-text-muted` `#5F5F5F`, not
  `stone-500`. That warm neutral fails AA for running text.
- Visible `:focus-visible` ring: 2px blue, 2px offset.
- `prefers-reduced-motion` honoured.
- Measure capped; headings balanced.
- Touch targets at least 24px.

## Reporting

Rank by severity and lead with the worst. For each finding give:

- **what** — one sentence, specific: *"The stats band is `#111827`, an off-palette
  near-black"*, not *"colours could be more on brand"*.
- **where** — file and line, or the region of the design.
- **the fix** — the token or rule that replaces it.

Then a short line on what is *right*, because a review that only lists faults gives no
signal about what to preserve.

**Do not rewrite the thing.** Report, and offer to fix. If the user says fix it, that
is `cf-design`'s job — switch to it.

Be honest about severity. A hardcoded `#000000` where `--cf-color-black` exists is
worth one line, not a paragraph. An off-palette hue in a hero is worth leading with.
