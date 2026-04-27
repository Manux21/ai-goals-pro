from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.hobby import Hobby
from app.models.user import User
from app.schemas.hobby import HobbyCreate, HobbyResponse

router = APIRouter(prefix="/hobbies", tags=["hobbies"])


@router.post("", response_model=HobbyResponse)
async def create_hobby(
    payload: HobbyCreate,
    db: AsyncSession = Depends(get_db),
) -> Hobby:
    result = await db.execute(select(User).where(User.id == payload.user_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="User not found")
    hobby = Hobby(**payload.model_dump())
    db.add(hobby)
    await db.flush()
    await db.refresh(hobby)
    return hobby


@router.get("", response_model=list[HobbyResponse])
async def list_hobbies(
    user_id: UUID = Query(...),
    db: AsyncSession = Depends(get_db),
) -> list[Hobby]:
    result = await db.execute(select(Hobby).where(Hobby.user_id == user_id))
    return list(result.scalars().all())


@router.get("/{hobby_id}", response_model=HobbyResponse)
async def get_hobby(
    hobby_id: UUID,
    db: AsyncSession = Depends(get_db),
) -> Hobby:
    result = await db.execute(select(Hobby).where(Hobby.id == hobby_id))
    hobby = result.scalar_one_or_none()
    if not hobby:
        raise HTTPException(status_code=404, detail="Hobby not found")
    return hobby
