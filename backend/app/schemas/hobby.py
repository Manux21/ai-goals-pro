from uuid import UUID

from pydantic import BaseModel, Field


class HobbyBase(BaseModel):
    name: str
    hours_per_week: float = Field(ge=0)


class HobbyCreate(HobbyBase):
    user_id: UUID


class HobbyResponse(HobbyBase):
    id: UUID
    user_id: UUID

    model_config = {"from_attributes": True}
