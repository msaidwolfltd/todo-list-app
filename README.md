# todo-list-app

This repository contains the TodoAI project scaffold (backend + frontend).

Quick start (requires `pnpm`):

1. Install dependencies for both workspaces:

```bash
pnpm install
```

2. Start backend or frontend individually:

```bash
pnpm dev:backend
pnpm dev:frontend
```

3. Local services (Postgres, Redis):

```bash
docker-compose up -d
```

Files added:
- [backend/src/index.ts](backend/src/index.ts) — basic Express server
- [frontend/pages/index.tsx](frontend/pages/index.tsx) — Next.js placeholder
- [docker-compose.yml](docker-compose.yml) — Postgres + Redis
- [.env.example](.env.example) — env examples
