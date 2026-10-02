from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

from app.core.enums import ResearchStatus, ResearchDepth


class ResearchTaskCreate(BaseModel):
    """Schema for creating a research task."""
    topic: str = Field(..., min_length=3, max_length=500, description="Research topic")
    depth: ResearchDepth = Field(default=ResearchDepth.MEDIUM, description="Research depth level")

    class Config:
        json_schema_extra = {
            "example": {
                "topic": "Impact of AI on healthcare",
                "depth": "medium"
            }
        }


class ResearchTaskUpdate(BaseModel):
    """Schema for updating a research task."""
    status: Optional[ResearchStatus] = None
    result: Optional[str] = None
    error_message: Optional[str] = None


class ResearchTaskResponse(BaseModel):
    """Schema for research task response."""
    id: int
    topic: str
    depth: ResearchDepth
    status: ResearchStatus
    result: Optional[str] = None
    error_message: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ResearchTaskListResponse(BaseModel):
    """Schema for research tasks list response."""
    items: list[ResearchTaskResponse]
    total: int
    page: int
    page_size: int
