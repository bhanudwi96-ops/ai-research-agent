from enum import Enum


class ResearchStatus(str, Enum):
    """Research task status enumeration."""
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class ResearchDepth(str, Enum):
    """Research depth levels."""
    QUICK = "quick"
    MEDIUM = "medium"
    DEEP = "deep"
