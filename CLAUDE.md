# CLAUDE.md

Working notes for agents editing **this repo**. If you are here to *use* the design
system rather than change it, read `DESIGN.md` instead — that is the product.

## What this is

The Creative Force brand as portable data plus prose. No framework, no runtime, no
dependencies. It is consumed by web projects, by Figma, and by agents producing
non-web assets, so nothing here may assume a stack.

## Hard rules

1. **Never edit `tokens/dist/**`.** It is generated. Change `tokens/tokens.json` and
   run `npm run build`. Commit the regenerated files — consumers read `dist/`
   directly, so a stale `dist/` is a broken release.
2. **Every colour, size, radius, shadow, duration and easing named in prose must
   trace to a token.** `DESIGN.md` quotes literals so a reader recognises the brand,
   never so anyone pastes them. If you add such a rule, add the token first.
   Compositional measurements — a card's 56px inset, a logo wall's 68% cap — are
   guidance, not tokens; they describe one arrangement, not a reusable value.
3. **Figma is the arbiter.** On any disagreement between this repo, the HubSpot
   theme, or an older skill, re-measure in Figma (`qeToOvCArvvSMU3i8rLb4D`, node
   `1003-34`) and record the resolution. Don't split the difference.
4. **Don't add a dependency.** The generator is Node stdlib on purpose. If an output
   format needs a library, write the twenty lines instead.
5. **`brand/` assets are source, not copies.** They were lifted from the HubSpot
   theme once; this repo is now where they live. Changing one here does not update
   the theme — that migration is a separate, deliberate change.

## Layout

```
DESIGN.md          the spec, in the Style Reference format. The deliverable.
brand/BRAND.md     logo / icon / illustration / grain rules
tokens/
  tokens.json      SOURCE OF TRUTH
  build.mjs        generator - flatten, resolve aliases, write 5 formats
  build.test.mjs   the one check
  dist/            GENERATED
patterns/          layout.css (portable grid) + demo.html (the visual check)
skills/            cf-design (build) + cf-design-review (audit)
```

## Adding a token

Add it to `tokens.json` with a `$description` that says *when to use it*, not what it
is — `"Hairlines, rules, logo-wall gaps"` beats `"a light warm grey"`. The description
is emitted as a comment into `tokens.css`, so it is the note the next person reads.

Then: name it in the relevant `DESIGN.md` table and paste the generated lines into
the Quick Start blocks - they are copies of `dist/`, and `npm test` fails on drift.

## Adding an output format

One `writeX()` in `build.mjs` and one line in `build()`. Keep the writers independent
— none of them may read another's output.

## Before you call something done

```bash
npm run build && npm test && git diff --stat -- tokens/dist
```

`npm run check` does all three and fails if `dist/` is stale. Then open
`patterns/demo.html` — it renders every token, so a bad value is visible rather than
theoretical.

## Style

Prose is written the way the brand speaks: plain, direct, short declaratives. Rules
carry their *why* — a rule without a reason gets "fixed" by the next person. The
comment in `tokens.json` explaining that `#5F5F5F` is a black-ramp shade *because
stone-500 fails AA at 14px* is the model.
