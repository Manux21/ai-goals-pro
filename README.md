# ai-goals-pro

## Требования

- Python 3.12
- Node.js 18+
- Docker и Docker Compose (только для локального PostgreSQL)

## Запуск

### 1. База данных

Поддерживаются два варианта:

- Локальная БД в Docker (`localhost:5432`)
- Внешняя БД (например, Supabase)

Для локальной БД:

```bash
cd backend
docker compose up -d
```

PostgreSQL будет доступен на `localhost:5432` (user: `user`, password: `password`, БД: `ai_goals`).

### 2. Бэкенд

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

В `.env` задайте `DATABASE_URL` и при необходимости `OPENAI_API_KEY`.

Пример для Supabase:

```env
DATABASE_URL=postgresql+asyncpg://<user>:<password>@<host>:<port>/postgres?sslmode=require
```

Миграции:

```bash
alembic upgrade head
```

Запуск API:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API: http://localhost:8000, документация: http://localhost:8000/docs

### 3. Фронтенд

В отдельном терминале:

```bash
cd frontend
npm install
npm run dev
```

Приложение: http://localhost:5173. Запросы к `/api` проксируются на бэкенд (порт 8000).

### Запуск всего одной командой

Из корня репозитория:

```bash
npm run dev
```

Скрипт:

- проверяет `backend/.env` и `DATABASE_URL`
- поднимает Docker PostgreSQL только если `DATABASE_URL` указывает на localhost
- пропускает Docker для внешней БД (например, Supabase)
- применяет миграции (`alembic upgrade head`)
- запускает API (порт 8000) и фронтенд (порт 5173)

`Ctrl+C` останавливает бэкенд и фронтенд; контейнер локальной БД (если был запущен) продолжает работать.

## Генерация API-контрактов (фронтенд)

Типы и клиент для бэкенда генерируются из OpenAPI-схемы в `frontend/src/api/generated` (swagger-typescript-api).

**Из корня репозитория (рекомендуется):**
```bash
npm run api
```
Экспортирует схему из бэкенда в `backend/openapi.json` и генерирует код. Бэкенд при этом может быть не запущен.

**Только генерация** (схема уже есть или бэкенд запущен на 8000):
```bash
npm run api:generate
```
Или из папки `frontend`: `npm run api` (по умолчанию берёт `http://localhost:8000/openapi.json`).

**Свой URL или файл:**
```bash
OPENAPI_URL=https://api.example.com/openapi.json npm run api
# или из frontend:
OPENAPI_PATH=../backend/openapi.json npm run api
```
