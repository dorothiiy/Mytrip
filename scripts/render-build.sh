#!/usr/bin/env sh
# Use when Build Command must install from repo root (e.g. dashboard Root Directory is "src"):
#   cd .. && sh scripts/render-build.sh
set -e
if [ -f package-lock.json ]; then
  npm ci
elif [ -f ../package-lock.json ]; then
  cd .. && npm ci
else
  echo "package-lock.json not found" >&2
  exit 1
fi
