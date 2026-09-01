// Build the one-file skills for the Claude app (Customize -> Skills -> Upload).
// The app takes a single .md with YAML frontmatter and no access to this repo,
// so DESIGN.md and BRAND.md are embedded verbatim. Run: node skills/app/build.mjs
// (npm run build does). Never edit the generated .md files here by hand.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

const design = read('DESIGN.md');
const brand = read('brand/BRAND.md');

// The description is the trigger; keep it identical to the repo skill's.
const frontmatter = (skill) => read(`skills/${skill}/SKILL.md`).split('\n---\n')[0] + '\n---\n';

const embed = `
---

# The spec — DESIGN.md (embedded)

${design}

---

# Brand assets — BRAND.md (embedded)

${brand}`;

const buildBody = `
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
`;

// The review skill's body is already repo-independent apart from the symlink
// preamble and two $ROOT paths - reuse it rather than fork the checklist.
const reviewBody = read('skills/cf-design-review/SKILL.md')
  .split('\n---\n').slice(1).join('\n---\n')
  .replace(/## Where the system lives[\s\S]*?(?=## )/, '')
  .replace(/\*\*Read `\$ROOT\/DESIGN\.md` before you review anything\*\*/,
    '**Read the embedded DESIGN.md below before you review anything**')
  .trimEnd() + '\n';

writeFileSync(join(ROOT, 'skills/app/cf-design.md'),
  frontmatter('cf-design') + buildBody + embed);
writeFileSync(join(ROOT, 'skills/app/cf-design-review.md'),
  frontmatter('cf-design-review') + '\n' + reviewBody + embed);
console.log('wrote skills/app/cf-design.md, skills/app/cf-design-review.md');
