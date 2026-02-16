from datetime import date
from uuid import UUID

from sqlalchemy import Date, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.constants.schedule_status import ScheduleStatus
from app.models.base import Base, TimestampMixin, UUIDMixin


class Schedule(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "schedules"

    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    start_date: Mapped[date] = mapped_column(Date)
    end_date: Mapped[date] = mapped_column(Date)
    status: Mapped[ScheduleStatus] = mapped_column(
        Enum(ScheduleStatus), default=ScheduleStatus.DRAFT
    )

    user = relationship("User", back_populates="schedules")
    events = relationship("Event", back_populates="schedule", cascade="all, delete-orphan")
