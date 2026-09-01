// Run: node --test tokens/build.test.mjs
//
// The one check. It fails if a token stops resolving, a rename breaks the
// contract DESIGN.md documents, or a Figma-measured value drifts.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { flatten, resolve, declarations, build } from './build.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
build();
const css = readFileSync(join(HERE, 'dist', 'tokens.css'), 'utf8');
const rows = declarations();
const byName = new Map(rows);

test('every alias resolves', () => {
  for (const token of flatten()) assert.doesNotThrow(() => resolve(token.value), token.name);
  assert.equal(byName.get('color-surface-card'), '#F1EFEA', 'alias chain color.surface.card -> stone.100');
  assert.equal(byName.get('color-surface-raised'), '#E4DFD9'); // stone.200
});

test('no unresolved reference leaks into CSS', () => {
  const leaks = [...css.matchAll(/^\s*--cf-[\w-]+:\s*(\{[^}]+\}.*)$/gm)].map((m) => m[1]);
  assert.deepEqual(leaks, []);
});

test('every declaration has a non-empty value', () => {
  for (const [name, value] of rows) {
    assert.ok(value !== undefined && value !== '', `${name} is empty`);
  }
});

test('composite type tokens emit all their parts', () => {
  for (const part of ['family', 'size', 'weight', 'line-height', 'tracking']) {
    assert.ok(byName.has(`type-display-${part}`), `type-display-${part} missing`);
  }
  assert.ok(byName.has('type-eyebrow-case'), 'eyebrow must carry text-transform');
  // Composite tokens must not also emit a bare --cf-type-display.
  assert.equal(byName.has('type-display'), false);
});

test('tokens.css has balanced braces and one :root block', () => {
  assert.equal((css.match(/\{/g) || []).length, (css.match(/\}/g) || []).length);
  assert.equal((css.match(/^:root \{$/gm) || []).length, 1);
});

test('Figma-measured values did not drift', () => {
  // Node 1392:2796 (hero text) and 2279:2406 (capability card).
  assert.equal(byName.get('type-display-size'), '2.75rem');       // 44px
  assert.equal(byName.get('type-display-weight'), '600');         // NOT 700
  assert.equal(byName.get('type-display-tracking'), '-0.03em');   // -1.32px on 44px
  assert.equal(byName.get('type-eyebrow-size'), '0.75rem');       // 12px
  assert.equal(byName.get('type-eyebrow-tracking'), '0.02em');    // 0.24px on 12px
  assert.equal(byName.get('type-card-title-line-height'), '1.3');
  assert.equal(byName.get('radius-md'), '12px');                  // the card radius
  // Figma draws the badge chip at 99px (node 1403:11564) and the button at 100px
  // (node 2545:34). Both are past half the height, so both render identically -
  // one token, and 100 is the one the button artboard specifies.
  assert.equal(byName.get('radius-pill'), '100px');
  assert.equal(byName.get('color-surface-raised'), '#E4DFD9');    // card on a warm band
  assert.equal(byName.get('color-blue'), '#435CFF');
});

test('buttons match Figma node 2545:34 - light, not heavy', () => {
  assert.equal(byName.get('radius-pill'), '100px');          // fully round
  assert.equal(byName.get('button-pad-block'), '14px');
  assert.equal(byName.get('button-pad-inline'), '28px');
  assert.equal(byName.get('button-border-width'), '2px');    // secondary outline
  assert.equal(byName.get('type-button-weight'), '500');     // Medium, NOT 600
  assert.equal(byName.get('type-button-size'), '1rem');
  // A coloured glow under a CTA is not this brand. If someone re-adds the token,
  // the button recipe in DESIGN.md silently gets heavy again.
  assert.equal(byName.has('shadow-accent'), false);
  assert.equal(byName.has('shadow-accent-hover'), false);
});

test('the palette stays small - no duplicate hexes outside the semantic layer', () => {
  const SEMANTIC = /^color-(surface|text|border)-/; // roles are meant to alias
  const seen = new Map();
  for (const [name, value] of rows) {
    if (!name.startsWith('color-') || SEMANTIC.test(name)) continue;
    if (!/^#[0-9A-Fa-f]{6}$/.test(value)) continue;
    const key = value.toUpperCase();
    assert.equal(seen.has(key), false,
      `${name} duplicates ${seen.get(key)} (both ${key}) - one of them is redundant`);
    seen.set(key, name);
  }
  assert.ok(rows.filter(([n]) => n.startsWith('color-')).length <= 34,
    'palette is creeping back up - it was trimmed to 32 deliberately');
});

test('every --cf- reference in the prose and demo resolves to a real token', async () => {
  const { readFileSync } = await import('node:fs');
  const valid = new Set(rows.map(([n]) => `--cf-${n}`));
  // Composite type groups are referred to by their stem in prose; layout.css owns
  // three locals of its own.
  const OK = /^--cf-(type-[a-z-]+|grid-cols|flow|grid-gap)$/;
  for (const file of ['DESIGN.md', 'brand/BRAND.md', 'patterns/demo.html', 'patterns/layout.css']) {
    const txt = readFileSync(join(HERE, '..', file), 'utf8');
    for (const m of txt.matchAll(/--cf-[a-z0-9-]+/g)) {
      const n = m.group ?? m[0];
      if (valid.has(n) || OK.test(n) || n.endsWith('-')) continue;
      assert.fail(`${file}: ${n} is not a token (line ${txt.slice(0, m.index).split('\n').length})`);
    }
  }
});

test('the house easing is a real cubic-bezier', () => {
  assert.equal(byName.get('motion-easing-standard'), 'cubic-bezier(0.22, 1, 0.36, 1)');
});

test('body line-height is 1.4 and prose is 1.6 - they are different tokens, not a fork', () => {
  assert.equal(byName.get('type-body-line-height'), '1.4');
  assert.equal(byName.get('type-prose-line-height'), '1.6');
});

test('DESIGN.md Quick Start blocks match dist/ verbatim', () => {
  const design = readFileSync(join(HERE, '..', 'DESIGN.md'), 'utf8');
  const dist = css + readFileSync(join(HERE, 'dist', 'tailwind.css'), 'utf8');
  const distLines = new Set(dist.split('\n').map((l) => l.trim()));
  const decls = design.split('\n').map((l) => l.trim()).filter((l) => /^--[\w-]+: .+;$/.test(l));
  assert.ok(decls.length > 100, 'Quick Start blocks look truncated');
  for (const line of decls) {
    assert.ok(distLines.has(line), `DESIGN.md Quick Start drifted from dist/: "${line}"`);
  }
});

test('the app skills embed the current DESIGN.md and BRAND.md', () => {
  const design = readFileSync(join(HERE, '..', 'DESIGN.md'), 'utf8');
  const brand = readFileSync(join(HERE, '..', 'brand', 'BRAND.md'), 'utf8');
  for (const skill of ['cf-design', 'cf-design-review']) {
    const app = readFileSync(join(HERE, '..', 'skills', 'app', `${skill}.md`), 'utf8');
    assert.ok(app.startsWith(`---\nname: ${skill}\n`), `${skill}.md frontmatter`);
    assert.ok(app.includes(design), `${skill}.md is stale - run node skills/app/build.mjs`);
    assert.ok(app.includes(brand), `${skill}.md is missing BRAND.md`);
    assert.equal(app.includes('$ROOT'), false, `${skill}.md leaks repo-only paths`);
  }
});
