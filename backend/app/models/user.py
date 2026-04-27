from sqlalchemy import Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin, UUIDMixin


class User(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(255), unique=True)
    auth_provider_id: Mapped[str | None] = mapped_column(String(255), unique=True, nullable=True)
    timezone: Mapped[str] = mapped_column(String(64), default="UTC")
    work_hours_start: Mapped[int] = mapped_column(Integer, default=9)
    work_hours_end: Mapped[int] = mapped_column(Integer, default=18)
    min_sleep_hours: Mapped[float] = mapped_column(Float, default=7.0)

    goals = relationship("Goal", back_populates="user", cascade="all, delete-orphan")
    hobbies = relationship("Hobby", back_populates="user", cascade="all, delete-orphan")
    schedules = relationship("Schedule", back_populates="user", cascade="all, delete-orphan")
