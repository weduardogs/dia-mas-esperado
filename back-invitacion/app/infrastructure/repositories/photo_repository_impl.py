from typing import Optional, List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime

from app.domain.entities.photo import Photo
from app.domain.repositories.photo_repository import PhotoRepository
from app.infrastructure.database.models import PhotoModel


class PhotoRepositoryImpl(PhotoRepository):
    """SQLAlchemy implementation of PhotoRepository"""

    def __init__(self, session: AsyncSession):
        self.session = session

    def _to_entity(self, model: PhotoModel) -> Photo:
        """Convert SQLAlchemy model to domain entity"""
        return Photo(
            id=model.id,
            url=model.url,
            public_id=model.public_id,
            album_id=model.album_id,
            thumbnail_url=model.thumbnail_url,
            original_filename=model.original_filename,
            uploader_name=model.uploader_name,
            file_size=model.file_size,
            width=model.width,
            height=model.height,
            format=model.format,
            created_at=model.created_at,
            updated_at=model.updated_at,
        )

    def _to_model(self, entity: Photo) -> PhotoModel:
        """Convert domain entity to SQLAlchemy model"""
        return PhotoModel(
            id=entity.id,
            url=entity.url,
            public_id=entity.public_id,
            album_id=entity.album_id,
            thumbnail_url=entity.thumbnail_url,
            original_filename=entity.original_filename,
            uploader_name=entity.uploader_name,
            file_size=entity.file_size,
            width=entity.width,
            height=entity.height,
            format=entity.format,
            created_at=entity.created_at,
            updated_at=entity.updated_at,
        )

    async def create(self, entity: Photo) -> Photo:
        """Create a new photo"""
        model = self._to_model(entity)
        self.session.add(model)
        await self.session.flush()
        await self.session.refresh(model)
        return self._to_entity(model)

    async def get_by_id(self, entity_id: str) -> Optional[Photo]:
        """Get photo by ID"""
        result = await self.session.execute(
            select(PhotoModel).where(PhotoModel.id == entity_id)
        )
        model = result.scalar_one_or_none()
        return self._to_entity(model) if model else None

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[Photo]:
        """Get all photos with pagination"""
        result = await self.session.execute(
            select(PhotoModel).offset(skip).limit(limit).order_by(PhotoModel.created_at.desc())
        )
        models = result.scalars().all()
        return [self._to_entity(model) for model in models]

    async def update(self, entity_id: str, entity: Photo) -> Optional[Photo]:
        """Update an existing photo"""
        result = await self.session.execute(
            select(PhotoModel).where(PhotoModel.id == entity_id)
        )
        model = result.scalar_one_or_none()
        if not model:
            return None

        model.url = entity.url
        model.public_id = entity.public_id
        model.album_id = entity.album_id
        model.thumbnail_url = entity.thumbnail_url
        model.original_filename = entity.original_filename
        model.uploader_name = entity.uploader_name
        model.file_size = entity.file_size
        model.width = entity.width
        model.height = entity.height
        model.format = entity.format
        model.updated_at = datetime.utcnow()

        await self.session.flush()
        await self.session.refresh(model)
        return self._to_entity(model)

    async def delete(self, entity_id: str) -> bool:
        """Delete a photo"""
        result = await self.session.execute(
            select(PhotoModel).where(PhotoModel.id == entity_id)
        )
        model = result.scalar_one_or_none()
        if not model:
            return False

        await self.session.delete(model)
        await self.session.flush()
        return True

    async def get_by_album_id(
        self, album_id: str, skip: int = 0, limit: int = 100
    ) -> List[Photo]:
        """Get all photos in an album"""
        result = await self.session.execute(
            select(PhotoModel)
            .where(PhotoModel.album_id == album_id)
            .offset(skip)
            .limit(limit)
            .order_by(PhotoModel.created_at.desc())
        )
        models = result.scalars().all()
        return [self._to_entity(model) for model in models]

    async def get_by_public_id(self, public_id: str) -> Optional[Photo]:
        """Get photo by Cloudinary public ID"""
        result = await self.session.execute(
            select(PhotoModel).where(PhotoModel.public_id == public_id)
        )
        model = result.scalar_one_or_none()
        return self._to_entity(model) if model else None

    async def count_by_album_id(self, album_id: str) -> int:
        """Count photos in an album"""
        from sqlalchemy import func

        result = await self.session.execute(
            select(func.count(PhotoModel.id)).where(PhotoModel.album_id == album_id)
        )
        return result.scalar() or 0

    async def delete_by_public_id(self, public_id: str) -> bool:
        """Delete photo by Cloudinary public ID"""
        result = await self.session.execute(
            select(PhotoModel).where(PhotoModel.public_id == public_id)
        )
        model = result.scalar_one_or_none()
        if not model:
            return False

        await self.session.delete(model)
        await self.session.flush()
        return True
