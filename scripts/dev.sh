#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
trap 'kill $(jobs -p) 2>/dev/null' EXIT

if ! docker info &>/dev/null; then
  echo "Docker не запущен. Запустите Docker Desktop и повторите: npm run dev"
  exit 1
fi

(cd "$ROOT/backend" && docker compose up -d)
echo "Waiting for PostgreSQL..."
until (cd "$ROOT/backend" && docker compose exec -T postgres pg_isready -U user) 2>/dev/null; do
  sleep 1
done

(cd "$ROOT/backend" && source venv/bin/activate && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000) &
(cd "$ROOT/frontend" && npm run dev) &
wait
