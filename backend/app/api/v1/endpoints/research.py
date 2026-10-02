from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.domain import (
    ResearchTaskCreate,
    ResearchTaskResponse,
    ResearchTaskListResponse,
)
from app.services.research_service import ResearchService

router = APIRouter(prefix="/research", tags=["research"])


@router.post("/", response_model=ResearchTaskResponse, status_code=201)
def create_research(
    task: ResearchTaskCreate,
    db: Session = Depends(get_db),
) -> ResearchTaskResponse:
    """Create a new research task."""
    created_task = ResearchService.create_task(db, task)
    return ResearchTaskResponse.model_validate(created_task)


@router.get("/{task_id}", response_model=ResearchTaskResponse)
def get_research(
    task_id: int,
    db: Session = Depends(get_db),
) -> ResearchTaskResponse:
    """Get a research task by ID."""
    task = ResearchService.get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Research task not found")
    return ResearchTaskResponse.model_validate(task)


@router.get("/", response_model=ResearchTaskListResponse)
def list_research(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
) -> ResearchTaskListResponse:
    """List all research tasks with pagination."""
    tasks, total = ResearchService.get_all_tasks(db, skip=skip, limit=limit)
    items = [ResearchTaskResponse.model_validate(task) for task in tasks]
    return ResearchTaskListResponse(
        items=items,
        total=total,
        page=skip // limit,
        page_size=limit,
    )


@router.delete("/{task_id}", status_code=204)
def delete_research(
    task_id: int,
    db: Session = Depends(get_db),
) -> None:
    """Delete a research task."""
    success = ResearchService.delete_task(db, task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Research task not found")
