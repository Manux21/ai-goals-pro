from datetime import date
from typing import Optional
from uuid import UUID

from sqlalchemy import Date, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.constants.goal_types import GoalType
from app.models.base import Base, TimestampMixin, UUIDMixin


class Goal(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "goals"

    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(255))
    goal_type: Mapped[GoalType] = mapped_column(
        Enum(GoalType, values_callable=lambda enum_cls: [item.value for item in enum_cls])
    )
    priority: Mapped[int] = mapped_column(Integer, default=3)
    deadline: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    target_hours_per_week: Mapped[Optional[float]] = mapped_column(nullable=True)

    user = relationship("User", back_populates="goals")
    tasks = relationship("Task", back_populates="goal", cascade="all, delete-orphan")
