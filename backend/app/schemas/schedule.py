from datetime import date
from uuid import UUID

from pydantic import BaseModel

from app.constants.schedule_status import ScheduleStatus
from typing import List

from app.schemas.event import EventResponse


class ScheduleBase(BaseModel):
    start_date: date
    end_date: date
    status: ScheduleStatus = ScheduleStatus.DRAFT


class ScheduleCreate(BaseModel):
    user_id: UUID
    start_date: date
    end_date: date


class ScheduleGenerate(BaseModel):
    user_id: UUID
    start_date: date
    end_date: date


class ScheduleResponse(ScheduleBase):
    id: UUID
    user_id: UUID

    model_config = {"from_attributes": True}


class ScheduleWithEventsResponse(ScheduleResponse):
    events: List[EventResponse] = []
