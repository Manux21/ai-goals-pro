from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.event import Event
from app.models.schedule import Schedule
from app.schemas.event import EventCreate, EventResponse

router = APIRouter(prefix="/events", tags=["events"])


@router.post("", response_model=EventResponse)
async def create_event(
    payload: EventCreate,
    db: AsyncSession = Depends(get_db),
) -> Event:
    result = await db.execute(
        select(Schedule).where(Schedule.id == payload.schedule_id)
    )
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Schedule not found")
    event = Event(**payload.model_dump())
    db.add(event)
    await db.flush()
    await db.refresh(event)
    return event


@router.get("/{event_id}", response_model=EventResponse)
async def get_event(
    event_id: UUID,
    db: AsyncSession = Depends(get_db),
) -> Event:
    result = await db.execute(select(Event).where(Event.id == event_id))
    event = result.scalar_one_or_none()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event
