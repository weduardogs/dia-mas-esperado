"""Add media_type and duration to photos

Revision ID: 8f3a9c2d1e5b
Revises: 42b6eff431d9
Create Date: 2025-10-30 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8f3a9c2d1e5b'
down_revision: Union[str, None] = '42b6eff431d9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add media_type column with default value 'image'
    op.add_column('photos', sa.Column('media_type', sa.String(length=10), nullable=False, server_default='image'))

    # Add duration column (nullable, for videos only)
    op.add_column('photos', sa.Column('duration', sa.Integer(), nullable=True))


def downgrade() -> None:
    # Remove duration column
    op.drop_column('photos', 'duration')

    # Remove media_type column
    op.drop_column('photos', 'media_type')
