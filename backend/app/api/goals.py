from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.goal import Goal
from app.models.user import User
from app.schemas.goal import GoalCreate, GoalResponse

router = APIRouter(prefix="/goals", tags=["goals"])


@router.post("", response_model=GoalResponse)
async def create_goal(
    payload: GoalCreate,
    db: AsyncSession = Depends(get_db),
) -> Goal:
    result = await db.execute(select(User).where(User.id == payload.user_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="User not found")
    goal = Goal(**payload.model_dump())
    db.add(goal)
    await db.flush()
    await db.refresh(goal)
    return goal


@router.get("", response_model=list[GoalResponse])
async def list_goals(
    user_id: UUID = Query(...),
    db: AsyncSession = Depends(get_db),
) -> List[Goal]:
    result = await db.execute(
        select(Goal).where(Goal.user_id == user_id).order_by(Goal.priority.desc())
    )
    return list(result.scalars().all())


@router.get("/{goal_id}", response_model=GoalResponse)
async def get_goal(
    goal_id: UUID,
    db: AsyncSession = Depends(get_db),
) -> Goal:
    result = await db.execute(select(Goal).where(Goal.id == goal_id))
    goal = result.scalar_one_or_none()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    return goal
