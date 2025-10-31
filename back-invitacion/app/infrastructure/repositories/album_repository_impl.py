from typing import Optional, List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime

from app.domain.entities.album import Album
from app.domain.repositories.album_repository import AlbumRepository
from app.infrastructure.database.models import AlbumModel


class AlbumRepositoryImpl(AlbumRepository):
    """SQLAlchemy implementation of AlbumRepository"""

    def __init__(self, session: AsyncSession):
        self.session = session

    def _to_entity(self, model: AlbumModel) -> Album:
        """Convert SQLAlchemy model to domain entity"""
        return Album(
            id=model.id,
            name=model.name,
            event_code=model.event_code,
            description=model.description,
            event_date=model.event_date,
            is_active=model.is_active,
            max_photos_per_user=model.max_photos_per_user,
            photo_count=model.photo_count,
            created_at=model.created_at,
            updated_at=model.updated_at,
        )

    def _to_model(self, entity: Album) -> AlbumModel:
        """Convert domain entity to SQLAlchemy model"""
        return AlbumModel(
            id=entity.id,
            name=entity.name,
            event_code=entity.event_code,
            description=entity.description,
            event_date=entity.event_date,
            is_active=entity.is_active,
            max_photos_per_user=entity.max_photos_per_user,
            photo_count=entity.photo_count,
            created_at=entity.created_at,
            updated_at=entity.updated_at,
        )

    async def create(self, entity: Album) -> Album:
        """Create a new album"""
        model = self._to_model(entity)
        self.session.add(model)
        await self.session.flush()
        await self.session.refresh(model)
        return self._to_entity(model)

    async def get_by_id(self, entity_id: str) -> Optional[Album]:
        """Get album by ID"""
        result = await self.session.execute(
            select(AlbumModel).where(AlbumModel.id == entity_id)
        )
        model = result.scalar_one_or_none()
        return self._to_entity(model) if model else None

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[Album]:
        """Get all albums with pagination"""
        result = await self.session.execute(
            select(AlbumModel).offset(skip).limit(limit).order_by(AlbumModel.created_at.desc())
        )
        models = result.scalars().all()
        return [self._to_entity(model) for model in models]

    async def update(self, entity_id: str, entity: Album) -> Optional[Album]:
        """Update an existing album"""
        result = await self.session.execute(
            select(AlbumModel).where(AlbumModel.id == entity_id)
        )
        model = result.scalar_one_or_none()
        if not model:
            return None

        model.name = entity.name
        model.event_code = entity.event_code
        model.description = entity.description
        model.event_date = entity.event_date
        model.is_active = entity.is_active
        model.max_photos_per_user = entity.max_photos_per_user
        model.photo_count = entity.photo_count
        model.updated_at = datetime.utcnow()

        await self.session.flush()
        await self.session.refresh(model)
        return self._to_entity(model)

    async def delete(self, entity_id: str) -> bool:
        """Delete an album"""
        result = await self.session.execute(
            select(AlbumModel).where(AlbumModel.id == entity_id)
        )
        model = result.scalar_one_or_none()
        if not model:
            return False

        await self.session.delete(model)
        await self.session.flush()
        return True

    async def get_by_event_code(self, event_code: str) -> Optional[Album]:
        """Get album by event code"""
        result = await self.session.execute(
            select(AlbumModel).where(AlbumModel.event_code == event_code.upper())
        )
        model = result.scalar_one_or_none()
        return self._to_entity(model) if model else None

    async def increment_photo_count(self, album_id: str) -> bool:
        """Increment the photo count for an album"""
        result = await self.session.execute(
            select(AlbumModel).where(AlbumModel.id == album_id)
        )
        model = result.scalar_one_or_none()
        if not model:
            return False

        model.photo_count += 1
        model.updated_at = datetime.utcnow()
        await self.session.flush()
        return True

    async def decrement_photo_count(self, album_id: str) -> bool:
        """Decrement the photo count for an album"""
        result = await self.session.execute(
            select(AlbumModel).where(AlbumModel.id == album_id)
        )
        model = result.scalar_one_or_none()
        if not model:
            return False

        if model.photo_count > 0:
            model.photo_count -= 1
            model.updated_at = datetime.utcnow()
            await self.session.flush()
        return True
