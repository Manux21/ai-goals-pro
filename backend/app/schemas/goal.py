from datetime import date
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field

from app.constants.goal_types import GoalType


class GoalBase(BaseModel):
    name: str
    goal_type: GoalType
    priority: int = Field(ge=1, le=5)
    deadline: Optional[date] = None
    target_hours_per_week: Optional[float] = None


class GoalCreate(GoalBase):
    user_id: UUID


class GoalResponse(GoalBase):
    id: UUID
    user_id: UUID

    model_config = {"from_attributes": True}
