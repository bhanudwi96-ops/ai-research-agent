from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
def healthcheck() -> dict:
    return {
        "status": "healthy",
        "service": "ai-research-agent",
        "version": "0.1.0",
    }
