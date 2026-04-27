from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    database_url: str = "postgresql+asyncpg://user:password@localhost:5432/ai_goals"
    openai_api_key: str = ""


@lru_cache
def get_settings() -> Settings:
    return Settings()
