from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.goal import Goal
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskResponse

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("", response_model=TaskResponse)
async def create_task(
    payload: TaskCreate,
    db: AsyncSession = Depends(get_db),
) -> Task:
    result = await db.execute(select(Goal).where(Goal.id == payload.goal_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Goal not found")
    task = Task(**payload.model_dump())
    db.add(task)
    await db.flush()
    await db.refresh(task)
    return task


@router.get("", response_model=list[TaskResponse])
async def list_tasks(
    goal_id: Optional[UUID] = Query(None),
    db: AsyncSession = Depends(get_db),
) -> list[Task]:
    stmt = select(Task)
    if goal_id:
        stmt = stmt.where(Task.goal_id == goal_id)
    stmt = stmt.order_by(Task.deadline.asc().nullslast())
    result = await db.execute(stmt)
    return list(result.scalars().all())


@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(
    task_id: UUID,
    db: AsyncSession = Depends(get_db),
) -> Task:
    result = await db.execute(select(Task).where(Task.id == task_id))
    task = result.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task
