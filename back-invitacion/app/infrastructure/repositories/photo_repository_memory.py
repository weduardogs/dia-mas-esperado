from typing import Optional, List, Dict
from datetime import datetime
import uuid

from app.domain.entities.photo import Photo
from app.domain.repositories.photo_repository import PhotoRepository


class PhotoRepositoryMemory(PhotoRepository):
    """In-memory implementation of PhotoRepository"""

    def __init__(self):
        self._storage: Dict[str, Photo] = {}

    async def create(self, entity: Photo) -> Photo:
        """Create a new photo"""
        if not entity.id:
            entity.id = str(uuid.uuid4())
        entity.created_at = datetime.utcnow()
        entity.updated_at = datetime.utcnow()

        self._storage[entity.id] = entity
        return entity

    async def get_by_id(self, entity_id: str) -> Optional[Photo]:
        """Get photo by ID"""
        return self._storage.get(entity_id)

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[Photo]:
        """Get all photos with pagination"""
        photos = list(self._storage.values())
        return photos[skip : skip + limit]

    async def update(self, entity_id: str, entity: Photo) -> Optional[Photo]:
        """Update an existing photo"""
        if entity_id not in self._storage:
            return None

        entity.id = entity_id
        entity.updated_at = datetime.utcnow()
        self._storage[entity_id] = entity
        return entity

    async def delete(self, entity_id: str) -> bool:
        """Delete a photo"""
        if entity_id not in self._storage:
            return False

        del self._storage[entity_id]
        return True

    async def get_by_album_id(
        self, album_id: str, skip: int = 0, limit: int = 100
    ) -> List[Photo]:
        """Get all photos in an album"""
        photos = [
            photo for photo in self._storage.values() if photo.album_id == album_id
        ]
        # Sort by created_at descending (newest first)
        photos.sort(key=lambda x: x.created_at, reverse=True)
        return photos[skip : skip + limit]

    async def get_by_public_id(self, public_id: str) -> Optional[Photo]:
        """Get photo by Cloudinary public ID"""
        for photo in self._storage.values():
            if photo.public_id == public_id:
                return photo
        return None

    async def count_by_album_id(self, album_id: str) -> int:
        """Count photos in an album"""
        return len(
            [photo for photo in self._storage.values() if photo.album_id == album_id]
        )

    async def delete_by_public_id(self, public_id: str) -> bool:
        """Delete photo by Cloudinary public ID"""
        photo = await self.get_by_public_id(public_id)
        if not photo:
            return False

        del self._storage[photo.id]
        return True
