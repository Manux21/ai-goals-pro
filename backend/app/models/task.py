from datetime import date
from typing import Optional
from uuid import UUID

from sqlalchemy import Date, Float, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin, UUIDMixin


class Task(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "tasks"

    goal_id: Mapped[UUID] = mapped_column(ForeignKey("goals.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(255))
    estimated_hours: Mapped[float] = mapped_column(Float, default=1.0)
    deadline: Mapped[Optional[date]] = mapped_column(Date, nullable=True)

    goal = relationship("Goal", back_populates="tasks")
