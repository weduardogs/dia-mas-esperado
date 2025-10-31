from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.database.connection import get_db
from app.infrastructure.repositories.photo_repository_impl import PhotoRepositoryImpl
from app.infrastructure.repositories.album_repository_impl import AlbumRepositoryImpl
from app.domain.repositories.photo_repository import PhotoRepository
from app.domain.repositories.album_repository import AlbumRepository


async def get_photo_repository(
    db: AsyncSession = next(get_db())
) -> AsyncGenerator[PhotoRepository, None]:
    """Dependency for getting photo repository"""
    yield PhotoRepositoryImpl(db)


async def get_album_repository(
    db: AsyncSession = next(get_db())
) -> AsyncGenerator[AlbumRepository, None]:
    """Dependency for getting album repository"""
    yield AlbumRepositoryImpl(db)
