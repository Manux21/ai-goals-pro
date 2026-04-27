#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
trap 'kill $(jobs -p) 2>/dev/null' EXIT

BACKEND_DIR="$ROOT/backend"
FRONTEND_DIR="$ROOT/frontend"
ENV_FILE="$BACKEND_DIR/.env"
DATABASE_URL=""

if [ ! -f "$ENV_FILE" ]; then
  echo "Файл backend/.env не найден. Создайте его (можно на основе backend/.env.example)."
  exit 1
fi

DATABASE_URL="$(sed -n 's/^DATABASE_URL=//p' "$ENV_FILE" | tail -n 1)"
if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL не задан в backend/.env"
  exit 1
fi

if [ ! -d "$BACKEND_DIR/venv" ]; then
  echo "Создаю backend/venv..."
  python3 -m venv "$BACKEND_DIR/venv"
fi

echo "Проверяю python зависимости backend..."
(
  cd "$BACKEND_DIR"
  source venv/bin/activate
  pip install -r requirements.txt >/dev/null
)

USE_LOCAL_POSTGRES=0
if [[ "$DATABASE_URL" == *"localhost"* ]]; then
  USE_LOCAL_POSTGRES=1
fi
if [[ "$DATABASE_URL" == *"127.0.0.1"* ]]; then
  USE_LOCAL_POSTGRES=1
fi
if [[ "$DATABASE_URL" == *"postgres:5432"* ]]; then
  USE_LOCAL_POSTGRES=1
fi

if [ "$USE_LOCAL_POSTGRES" -eq 1 ]; then
  if ! docker info &>/dev/null; then
    echo "Нужен Docker для локального Postgres. Запустите Docker Desktop и повторите."
    exit 1
  fi
  echo "Запускаю локальный Postgres через docker compose..."
  (cd "$BACKEND_DIR" && docker compose up -d)
  echo "Ожидаю готовность PostgreSQL..."
  until (cd "$BACKEND_DIR" && docker compose exec -T postgres pg_isready -U user) 2>/dev/null; do
    sleep 1
  done
else
  echo "Используется внешняя БД (не localhost). Пропускаю docker compose."
fi

echo "Применяю миграции..."
(
  cd "$BACKEND_DIR"
  source venv/bin/activate
  alembic upgrade head
)

echo "Запускаю backend и frontend..."
(cd "$BACKEND_DIR" && source venv/bin/activate && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000) &
(cd "$FRONTEND_DIR" && npm run dev) &
wait
