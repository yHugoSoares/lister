# Lister Docker Setup

## Development with Docker

Start all services (PostgreSQL + Backend + Frontend):
```bash
docker compose -f docker-compose.dev.yml up -d
```

View logs:
```bash
docker compose -f docker-compose.dev.yml logs -f

# View specific service logs
docker compose -f docker-compose.dev.yml logs -f backend
docker compose -f docker-compose.dev.yml logs -f postgres
```

Stop all services:
```bash
docker compose -f docker-compose.dev.yml down
```

Stop and remove database data:
```bash
docker compose -f docker-compose.dev.yml down -v
```

## Production with Docker

Start production services:
```bash
docker compose up -d
```

## Services

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **PostgreSQL**: localhost:5432

## Environment Variables

- For local development (non-Docker): Use `VITE_API_URL=http://localhost:3000/api`
- For Docker development: The docker-compose.dev.yml automatically sets environment variables

## Database

The PostgreSQL database is automatically initialized with the schema on first startup.
Data is persisted in a Docker volume named `postgres_data`.
