from uuid import UUID

from sqlalchemy import Float, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin, UUIDMixin


class Hobby(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "hobbies"

    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(255))
    hours_per_week: Mapped[float] = mapped_column(Float, default=0.0)

    user = relationship("User", back_populates="hobbies")
