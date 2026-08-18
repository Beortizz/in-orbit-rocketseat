# in-orbit-rocketseat

Projeto do NLW da Rocketseat. Monorepo com duas pastas independentes:

- `server/`: API em Fastify + Drizzle ORM + PostgreSQL
- `web/`: Front-end em React + Vite

## Rodando com Docker

Pré-requisito: [Docker](https://www.docker.com/) e Docker Compose.

### API (server)
```bash
cd server
docker compose up -d
```
O container `app` roda `npx drizzle-kit push` automaticamente antes de iniciar (`npm run dev`).
- API: http://localhost:3333
- PostgreSQL exposto em: `localhost:5433`

### Front-end (web)
```bash
cd web
docker compose up -d
```
- Web: http://localhost:5173

Os dois `docker-compose.yml` são independentes; rode ambos em terminais/pastas separadas para ter a stack completa no ar.