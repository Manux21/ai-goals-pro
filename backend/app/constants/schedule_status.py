from enum import Enum


class ScheduleStatus(str, Enum):
    DRAFT = "draft"
    ACTIVE = "active"
