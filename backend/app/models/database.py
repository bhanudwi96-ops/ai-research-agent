from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String, Text, Enum
from sqlalchemy.sql import func

from app.db.base import Base
from app.core.enums import ResearchStatus, ResearchDepth


class ResearchTask(Base):
    """Research task database model."""
    __tablename__ = "research_tasks"

    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String(500), nullable=False, index=True)
    depth = Column(Enum(ResearchDepth), default=ResearchDepth.MEDIUM, nullable=False)
    status = Column(Enum(ResearchStatus), default=ResearchStatus.PENDING, nullable=False, index=True)
    result = Column(Text, nullable=True)
    error_message = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    def __repr__(self) -> str:
        return f"<ResearchTask(id={self.id}, topic={self.topic}, status={self.status})>"
