from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.endpoints.health import router as health_router

app = FastAPI(
    title="AI Research Agent",
    version="0.1.0",
    description="AI research assistant platform with multi-agent orchestration",
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


@app.get("/")
def read_root() -> dict:
    return {
        "message": "AI Research Agent API",
        "version": "0.1.0",
        "status": "running",
    }
