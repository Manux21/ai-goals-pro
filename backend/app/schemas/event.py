from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field

from app.constants.event_types import EventType


class EventBase(BaseModel):
    title: str
    event_type: EventType
    start_at: datetime
    duration_minutes: int = Field(ge=1)


class EventCreate(EventBase):
    schedule_id: UUID


class EventResponse(EventBase):
    id: UUID
    schedule_id: UUID

    model_config = {"from_attributes": True}
