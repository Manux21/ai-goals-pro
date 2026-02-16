from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.constants.schedule_status import ScheduleStatus
from app.core.database import get_db
from app.models.schedule import Schedule
from app.models.user import User
from app.schemas.schedule import (
    ScheduleCreate,
    ScheduleGenerate,
    ScheduleResponse,
    ScheduleWithEventsResponse,
)

router = APIRouter(prefix="/schedules", tags=["schedules"])


@router.post("", response_model=ScheduleResponse)
async def create_schedule(
    payload: ScheduleCreate,
    db: AsyncSession = Depends(get_db),
) -> Schedule:
    result = await db.execute(select(User).where(User.id == payload.user_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="User not found")
    if payload.start_date > payload.end_date:
        raise HTTPException(status_code=400, detail="start_date must be before end_date")
    schedule = Schedule(**payload.model_dump())
    db.add(schedule)
    await db.flush()
    await db.refresh(schedule)
    return schedule


@router.post("/generate", response_model=ScheduleResponse)
async def generate_schedule(
    payload: ScheduleGenerate,
    db: AsyncSession = Depends(get_db),
) -> Schedule:
    result = await db.execute(select(User).where(User.id == payload.user_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="User not found")
    if payload.start_date > payload.end_date:
        raise HTTPException(status_code=400, detail="start_date must be before end_date")
    schedule = Schedule(
        user_id=payload.user_id,
        start_date=payload.start_date,
        end_date=payload.end_date,
        status=ScheduleStatus.DRAFT,
    )
    db.add(schedule)
    await db.flush()
    await db.refresh(schedule)
    return schedule


@router.get("", response_model=list[ScheduleResponse])
async def list_schedules(
    user_id: UUID = Query(...),
    db: AsyncSession = Depends(get_db),
) -> list[Schedule]:
    result = await db.execute(
        select(Schedule)
        .where(Schedule.user_id == user_id)
        .order_by(Schedule.start_date.desc())
    )
    return list(result.scalars().all())


@router.get("/{schedule_id}", response_model=ScheduleWithEventsResponse)
async def get_schedule(
    schedule_id: UUID,
    db: AsyncSession = Depends(get_db),
) -> Schedule:
    result = await db.execute(
        select(Schedule)
        .where(Schedule.id == schedule_id)
        .options(selectinload(Schedule.events))
    )
    schedule = result.scalar_one_or_none()
    if not schedule:
        raise HTTPException(status_code=404, detail="Schedule not found")
    return schedule
