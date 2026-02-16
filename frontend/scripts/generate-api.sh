#!/usr/bin/env bash
set -e
ROOT="$(dirname "$0")/.."
cd "$ROOT"
if [[ -n "$OPENAPI_PATH" ]]; then
  INPUT="$OPENAPI_PATH"
else
  INPUT="${OPENAPI_URL:-http://localhost:8000/openapi.json}"
fi
npx swagger-typescript-api generate \
  --path "$INPUT" \
  -o ./src/api/generated \
  -n index.ts
