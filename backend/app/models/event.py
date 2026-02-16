from datetime import datetime
from uuid import UUID

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.constants.event_types import EventType
from app.models.base import Base, TimestampMixin, UUIDMixin


class Event(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "events"

    schedule_id: Mapped[UUID] = mapped_column(ForeignKey("schedules.id", ondelete="CASCADE"))
    title: Mapped[str] = mapped_column(String(255))
    event_type: Mapped[EventType] = mapped_column(Enum(EventType))
    start_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    duration_minutes: Mapped[int] = mapped_column(Integer, default=60)

    schedule = relationship("Schedule", back_populates="events")
