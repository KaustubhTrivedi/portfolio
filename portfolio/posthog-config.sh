#!/bin/sh
set -eu

if [ -n "${POSTHOG_PROJECT_TOKEN:-}" ]; then
  host=undefined
  if [ -n "${POSTHOG_HOST:-}" ]; then
    host="$(printf '%s' "$POSTHOG_HOST" | sed 's/\\/\\\\/g; s/"/\\"/g; s/^/"/; s/$/"/')"
  fi
  printf 'window.__POSTHOG_CONFIG__ = { key: %s, host: %s };\n' \
    "$(printf '%s' "$POSTHOG_PROJECT_TOKEN" | sed 's/\\/\\\\/g; s/"/\\"/g; s/^/"/; s/$/"/')" \
    "$host" \
    > /usr/share/nginx/html/posthog-config.js
else
  printf 'window.__POSTHOG_CONFIG__ = undefined;\n' > /usr/share/nginx/html/posthog-config.js
fi
