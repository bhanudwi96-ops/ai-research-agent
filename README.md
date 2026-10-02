# AI Research Agent

A production-grade multi-agent AI research assistant built with Python, FastAPI, PostgreSQL, Redis, and Next.js.

## Overview

This project is designed to research topics using multiple AI agents, retrieve relevant web sources, analyze the information, and generate structured reports. The platform is built with a clean layered architecture and is intended to scale from local development to production deployment.

## Architecture

- Backend: FastAPI + SQLAlchemy + PostgreSQL
- Frontend: Next.js + TypeScript + Tailwind CSS
- Background Tasks: Celery + Redis
- Search & Retrieval: Bing/SerpAPI + vector search layer (Phase 4)
- AI Orchestration: LangChain / CrewAI / LangGraph (Phase 3+)
- Local Infrastructure: Docker Compose

## Project Structure

- `backend/` — Python API and business logic
- `frontend/` — Next.js dashboard and web app
- `docker-compose.yml` — local Postgres and Redis setup
- `docs/` — architecture and setup documentation

## Phase 1 Goals

The first phase focuses on the project foundation:
- local infrastructure setup
- backend app skeleton
- environment configuration
- PostgreSQL-ready application architecture
- frontend starter shell
- health checks and developer workflow

## Local Development

### Prerequisites

- Python 3.11+
- Node.js 18+
- Docker and Docker Compose

### Start infrastructure

```bash
docker-compose up -d
```

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment files

Create a local environment file for the backend:

```bash
cp backend/.env.example backend/.env.local
```

## API health check

```bash
curl http://localhost:8000/api/v1/health
```

## License

MIT
