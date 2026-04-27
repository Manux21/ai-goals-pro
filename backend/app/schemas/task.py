from datetime import date
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class TaskBase(BaseModel):
    name: str
    estimated_hours: float = Field(ge=0)
    deadline: Optional[date] = None


class TaskCreate(TaskBase):
    goal_id: UUID


class TaskResponse(TaskBase):
    id: UUID
    goal_id: UUID

    model_config = {"from_attributes": True}
