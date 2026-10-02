from dotenv import load_dotenv
from functools import lru_cache
from dataclasses import dataclass
import os

load_dotenv(dotenv_path=".env.local")


@dataclass(frozen=True)
class Settings:
    app_name: str = os.getenv("APP_NAME", "ai-research-agent")
    app_env: str = os.getenv("APP_ENV", "development")
    app_version: str = os.getenv("APP_VERSION", "0.1.0")
    database_url: str = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:postgres@localhost:5432/ai_research",
    )
    redis_url: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    secret_key: str = os.getenv("SECRET_KEY", "change-me-in-production")


@lru_cache
def get_settings() -> Settings:
    return Settings()
