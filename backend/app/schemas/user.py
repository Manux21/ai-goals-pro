from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr
    timezone: str = "UTC"
    work_hours_start: int = Field(ge=0, le=23)
    work_hours_end: int = Field(ge=0, le=23)
    min_sleep_hours: float = Field(ge=4, le=12)


class UserCreate(UserBase):
    pass


class UserResponse(UserBase):
    id: UUID

    model_config = {"from_attributes": True}
