from fastapi import APIRouter

from app.api import events, goals, hobbies, schedules, tasks, users

api_router = APIRouter()
api_router.include_router(users.router)
api_router.include_router(goals.router)
api_router.include_router(hobbies.router)
api_router.include_router(tasks.router)
api_router.include_router(schedules.router)
api_router.include_router(events.router)
