"""add auth provider id to users

Revision ID: 002
Revises: 001
Create Date: 2026-04-27
"""

from alembic import op
import sqlalchemy as sa

revision = "002"
down_revision = "001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("users", sa.Column("auth_provider_id", sa.String(length=255), nullable=True))
    op.create_index(op.f("ix_users_auth_provider_id"), "users", ["auth_provider_id"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_users_auth_provider_id"), table_name="users")
    op.drop_column("users", "auth_provider_id")
