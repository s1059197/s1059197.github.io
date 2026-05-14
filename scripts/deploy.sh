#!/usr/bin/env bash
# Publish dist/ to master:trip-dashboard/ so GitHub Pages serves it
# at https://s1059197.github.io/trip-dashboard/.
#
# Pages is configured to serve master / (root). The site's existing
# root HTML files (bushrun.html, casemakr.html, etc.) live on master
# alongside this directory and are left untouched.

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

if [ ! -d dist ]; then
  echo "dist/ not found — run 'npm run build' first." >&2
  exit 1
fi

WORKTREE=".worktrees/master-deploy"
SUBDIR="trip-dashboard"

cleanup() {
  cd "$REPO_ROOT"
  git worktree remove --force "$WORKTREE" 2>/dev/null || true
  rmdir .worktrees 2>/dev/null || true
  git worktree prune
}
trap cleanup EXIT

cleanup
git fetch origin master
git worktree add "$WORKTREE" origin/master --detach

rm -rf "$WORKTREE/$SUBDIR"
mkdir -p "$WORKTREE/$SUBDIR"
cp -r dist/. "$WORKTREE/$SUBDIR/"

cd "$WORKTREE"
git add "$SUBDIR"
if git diff --cached --quiet; then
  echo "No changes to deploy."
  exit 0
fi
git commit -m "deploy: publish trip-dashboard"
git push origin HEAD:master
echo "Deployed to master:$SUBDIR/."
