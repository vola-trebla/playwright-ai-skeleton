#!/usr/bin/env bash
# Blocks direct git push to main. Part of the PLAYWRIGHT-AI-SKELETON git workflow enforcement.

input=$(cat)
command=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('command',''))" 2>/dev/null || echo "")

if echo "$command" | grep -qE 'git[[:space:]]+push[[:space:]].*[[:space:]]main([[:space:]]|$)'; then
  echo "Direct push to main is not allowed. Use a feature branch and open a PR."
  exit 2
fi
