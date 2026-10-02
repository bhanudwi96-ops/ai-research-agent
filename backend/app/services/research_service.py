from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import Optional, List

from app.models.database import ResearchTask
from app.models.domain import ResearchTaskCreate, ResearchTaskUpdate, ResearchTaskResponse
from app.core.enums import ResearchStatus


class ResearchService:
    """Service for managing research tasks."""

    @staticmethod
    def create_task(db: Session, task_create: ResearchTaskCreate) -> ResearchTask:
        """Create a new research task."""
        task = ResearchTask(
            topic=task_create.topic,
            depth=task_create.depth,
            status=ResearchStatus.PENDING,
        )
        db.add(task)
        db.commit()
        db.refresh(task)
        return task

    @staticmethod
    def get_task(db: Session, task_id: int) -> Optional[ResearchTask]:
        """Get a research task by ID."""
        return db.query(ResearchTask).filter(ResearchTask.id == task_id).first()

    @staticmethod
    def get_all_tasks(db: Session, skip: int = 0, limit: int = 50) -> tuple[List[ResearchTask], int]:
        """Get all research tasks with pagination."""
        total = db.query(ResearchTask).count()
        tasks = db.query(ResearchTask).order_by(desc(ResearchTask.created_at)).offset(skip).limit(limit).all()
        return tasks, total

    @staticmethod
    def update_task(db: Session, task_id: int, task_update: ResearchTaskUpdate) -> Optional[ResearchTask]:
        """Update a research task."""
        task = db.query(ResearchTask).filter(ResearchTask.id == task_id).first()
        if not task:
            return None

        update_data = task_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(task, field, value)

        db.commit()
        db.refresh(task)
        return task

    @staticmethod
    def delete_task(db: Session, task_id: int) -> bool:
        """Delete a research task."""
        task = db.query(ResearchTask).filter(ResearchTask.id == task_id).first()
        if not task:
            return False

        db.delete(task)
        db.commit()
        return True

    @staticmethod
    def mark_processing(db: Session, task_id: int) -> Optional[ResearchTask]:
        """Mark a task as processing."""
        return ResearchService.update_task(
            db,
            task_id,
            ResearchTaskUpdate(status=ResearchStatus.PROCESSING)
        )

    @staticmethod
    def mark_completed(db: Session, task_id: int, result: str) -> Optional[ResearchTask]:
        """Mark a task as completed with result."""
        return ResearchService.update_task(
            db,
            task_id,
            ResearchTaskUpdate(status=ResearchStatus.COMPLETED, result=result)
        )

    @staticmethod
    def mark_failed(db: Session, task_id: int, error_message: str) -> Optional[ResearchTask]:
        """Mark a task as failed with error message."""
        return ResearchService.update_task(
            db,
            task_id,
            ResearchTaskUpdate(status=ResearchStatus.FAILED, error_message=error_message)
        )
