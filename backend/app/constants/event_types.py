from enum import Enum


class EventType(str, Enum):
    WORK = "work"
    LEARNING = "learning"
    HOBBY = "hobby"
    HEALTH = "health"
    SOCIAL = "social"
    FIXED = "fixed"
