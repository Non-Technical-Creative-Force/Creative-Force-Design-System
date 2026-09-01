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
