#!/usr/bin/env node
// Generates every dist/ artifact from tokens.json.
//
// Node stdlib only, no dependencies, no config. If you need another output
// format, add a writer at the bottom - don't reach for Style Dictionary.
//
// ponytail: one flat pass over the tree, no caching. It's ~200 tokens.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, 'tokens.json');
const DIST = join(HERE, 'dist');

const PREFIX = '--cf-';
const META = new Set(['$value', '$type', '$description', '$schema']);

const tree = JSON.parse(readFileSync(SRC, 'utf8'));

// ---------------------------------------------------------------- flatten

const isToken = (node) => node && typeof node === 'object' && '$value' in node;

/** Walk the tree, carrying the nearest `$type` down to each token. */
export function flatten(node = tree, path = [], type = undefined, out = []) {
  const inherited = node.$type ?? type;
  for (const [key, child] of Object.entries(node)) {
    if (META.has(key)) continue;
    const next = [...path, key];
    if (isToken(child)) {
      out.push({
        path: next,
        name: next.join('-'),
        type: child.$type ?? inherited,
        value: child.$value,
        description: child.$description,
      });
    } else if (child && typeof child === 'object') {
      flatten(child, next, inherited, out);
    }
  }
  return out;
}

// ---------------------------------------------------------------- aliases

/** Resolve one `{a.b.c}` reference against the raw tree. */
function lookup(ref) {
  const node = ref.split('.').reduce((acc, key) => acc?.[key], tree);
  if (!isToken(node)) throw new Error(`Unresolved token reference: {${ref}}`);
  return node.$value;
}

const REF = /^\{([^}]+)\}$/;

export function resolve(value, depth = 0) {
  if (depth > 10) throw new Error(`Alias cycle at: ${JSON.stringify(value)}`);
  if (typeof value === 'string') {
    const hit = value.match(REF);
    return hit ? resolve(lookup(hit[1]), depth + 1) : value;
  }
  if (Array.isArray(value)) return value.map((v) => resolve(v, depth + 1));
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, resolve(v, depth + 1)])
    );
  }
  return value;
}

// ---------------------------------------------------------------- CSS shape

// A composite typography token becomes several custom properties, because CSS
// has no way to apply one. The sub-names are what DESIGN.md tells agents to emit.
const TYPE_PARTS = {
  fontFamily: 'family',
  fontSize: 'size',
  fontWeight: 'weight',
  lineHeight: 'line-height',
  letterSpacing: 'tracking',
  textCase: 'case',
};

function cssValue(token) {
  const v = resolve(token.value);
  if (token.type === 'cubicBezier') return `cubic-bezier(${v.join(', ')})`;
  return String(v);
}

/** [name, value, description] triples in emit order. */
export function declarations() {
  const rows = [];
  for (const token of flatten()) {
    if (token.type === 'typography') {
      const parts = resolve(token.value);
      for (const [key, suffix] of Object.entries(TYPE_PARTS)) {
        if (parts[key] === undefined) continue;
        rows.push([`${token.name}-${suffix}`, String(parts[key]), undefined]);
      }
      rows.push([token.name, null, token.description]); // marker: group header only
    } else {
      rows.push([token.name, cssValue(token), token.description]);
    }
  }
  return rows.filter(([, value]) => value !== null);
}

// ---------------------------------------------------------------- writers

const BANNER = (comment) =>
  `${comment} Creative Force design tokens - GENERATED, do not edit.\n` +
  `${comment} Source: tokens/tokens.json  ->  node tokens/build.mjs\n`;

function groupsOf(rows) {
  const groups = new Map();
  for (const row of rows) {
    const head = row[0].split('-')[0];
    if (!groups.has(head)) groups.set(head, []);
    groups.get(head).push(row);
  }
  return groups;
}

function writeCss() {
  let out = `/*\n${BANNER(' *')} */\n\n:root {\n`;
  for (const [group, rows] of groupsOf(declarations())) {
    out += `\n  /* ${group} */\n`;
    for (const [name, value, description] of rows) {
      if (description) out += `  /* ${description} */\n`;
      out += `  ${PREFIX}${name}: ${value};\n`;
    }
  }
  out += '}\n';
  writeFileSync(join(DIST, 'tokens.css'), out);
}

function writeScss() {
  let out = BANNER('//') + '\n';
  for (const [group, rows] of groupsOf(declarations())) {
    out += `\n// ${group}\n`;
    for (const [name, value]of rows) out += `$cf-${name}: ${value};\n`;
  }
  out += '\n// Re-export as custom properties so components can read either form.\n';
  out += ':root {\n';
  for (const [name] of declarations()) out += `  ${PREFIX}${name}: #{$cf-${name}};\n`;
  out += '}\n';
  writeFileSync(join(DIST, 'tokens.scss'), out);
}

function writeJs() {
  const obj = Object.fromEntries(
    declarations().map(([name, value]) => [name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()), value])
  );
  const out =
    BANNER('//') +
    '\nexport const tokens = ' + JSON.stringify(obj, null, 2) + ';\n\n' +
    '// The custom-property names, in emit order. `tokens` is camelCased for JS\n' +
    '// ergonomics; this is what actually appears in tokens.css.\n' +
    'export const names = ' + JSON.stringify(declarations().map(([n]) => n), null, 2) + ';\n\n' +
    'export const cssVar = (name) => `var(--cf-${name})`;\n\n' +
    'export default tokens;\n';
  writeFileSync(join(DIST, 'tokens.js'), out);
}

function writeTailwind() {
  // Tailwind v4: @theme maps tokens onto utility namespaces.
  const rows = declarations();
  const pick = (head) => rows.filter(([n]) => n.startsWith(`${head}-`));
  // @import must lead the file - CSS ignores one that follows a rule.
  let out = `/*\n${BANNER(' *')} *\n * Tailwind v4. Import after tailwindcss:\n` +
    ` *   @import "tailwindcss";\n *   @import "../tokens/dist/tailwind.css";\n */\n\n` +
    `@import "./tokens.css";\n\n@theme {\n`;

  out += '\n  /* colors -> bg-cf-blue, text-cf-text-muted, border-cf-border-default */\n';
  for (const [name, value] of pick('color')) out += `  --color-cf-${name.slice(6)}: ${value};\n`;

  out += '\n  /* spacing -> p-cf-4, gap-cf-8 */\n';
  for (const [name, value] of pick('space')) out += `  --spacing-cf-${name.slice(6)}: ${value};\n`;

  out += '\n  /* radius -> rounded-cf-md */\n';
  for (const [name, value] of pick('radius')) out += `  --radius-cf-${name.slice(7)}: ${value};\n`;

  out += '\n  /* shadow -> shadow-cf-accent */\n';
  for (const [name, value] of pick('shadow')) out += `  --shadow-cf-${name.slice(7)}: ${value};\n`;

  out += '\n  /* type sizes -> text-cf-display */\n';
  for (const [name, value] of rows.filter(([n]) => n.startsWith('type-') && n.endsWith('-size'))) {
    out += `  --text-cf-${name.slice(5, -5)}: ${value};\n`;
  }

  out += '\n  /* fonts -> font-cf-sans, font-cf-semibold */\n';
  for (const [name, value] of rows.filter(([n]) => n.startsWith('font-family-'))) {
    out += `  --font-cf-${name.slice(12)}: ${value};\n`;
  }
  for (const [name, value] of rows.filter(([n]) => n.startsWith('font-weight-'))) {
    out += `  --font-weight-cf-${name.slice(12)}: ${value};\n`;
  }

  out += '\n  /* easings -> ease-cf-standard. Durations stay plain custom properties\n';
  out += '     (Tailwind v4 has no duration theme namespace) - use var(--cf-motion-duration-base). */\n';
  for (const [name, value] of rows.filter(([n]) => n.startsWith('motion-easing-'))) {
    out += `  --ease-cf-${name.slice(14)}: ${value};\n`;
  }

  out += '}\n\n/* Every token is also a plain --cf-* custom property via the import above. */\n';
  writeFileSync(join(DIST, 'tailwind.css'), out);
}

function writeFigma() {
  // Tokens Studio flat shape: { "color.blue": { value, type } }
  const TYPE_MAP = { dimension: 'sizing', duration: 'other', cubicBezier: 'other', number: 'other', shadow: 'boxShadow', fontFamily: 'fontFamilies', fontWeight: 'fontWeights' };
  const out = {};
  for (const token of flatten()) {
    if (token.type === 'typography') {
      out[token.path.join('.')] = { value: resolve(token.value), type: 'typography', description: token.description };
    } else {
      out[token.path.join('.')] = {
        value: cssValue(token),
        type: TYPE_MAP[token.type] ?? token.type ?? 'other',
        description: token.description,
      };
    }
  }
  writeFileSync(join(DIST, 'figma.tokens.json'), JSON.stringify(out, null, 2) + '\n');
}

// ---------------------------------------------------------------- run

export function build() {
  mkdirSync(DIST, { recursive: true });
  writeCss();
  writeScss();
  writeJs();
  writeTailwind();
  writeFigma();
  return declarations().length;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const n = build();
  console.log(`Wrote 5 files to tokens/dist/ from ${n} declarations.`);
}
