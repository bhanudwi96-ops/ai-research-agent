from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.endpoints.health import router as health_router
from app.api.v1.endpoints.research import router as research_router
from app.db.database import engine, Base

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Research Agent",
    version="0.2.0",
    description="Multi-agent AI research platform with RAG workflow and async processing",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api/v1")
app.include_router(research_router, prefix="/api/v1")


@app.get("/")
def read_root() -> dict:
    return {
        "message": "AI Research Agent API",
        "version": "0.2.0",
        "status": "running",
        "docs": "/docs",
    }
