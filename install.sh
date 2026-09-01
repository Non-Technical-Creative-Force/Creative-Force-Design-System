#!/usr/bin/env bash
# Link the CF skills into ~/.claude/skills so any Claude Code session can load them.
#
# Symlinks, not copies: the skills stay in sync with this repo, and DESIGN.md
# resolves through the link. Re-run it any time; it is idempotent.
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"

mkdir -p "$DEST"

for skill in "$REPO"/skills/*/; do
  name="$(basename "$skill")"
  target="$DEST/$name"

  if [ -L "$target" ]; then
    current="$(readlink "$target")"
    if [ "$current" = "${skill%/}" ]; then
      echo "  ok      $name"
      continue
    fi
    echo "  relink  $name (was $current)"
    rm "$target"
  elif [ -e "$target" ]; then
    echo "  SKIP    $name - a real directory is already there, not touching it" >&2
    continue
  fi

  ln -s "${skill%/}" "$target"
  echo "  linked  $name"
done

echo
echo "Skills available in $DEST"
echo "Point an agent at this repo with: read $REPO/DESIGN.md"
