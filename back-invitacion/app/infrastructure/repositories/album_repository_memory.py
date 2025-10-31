from typing import Optional, List, Dict
from datetime import datetime
import uuid

from app.domain.entities.album import Album
from app.domain.repositories.album_repository import AlbumRepository


class AlbumRepositoryMemory(AlbumRepository):
    """In-memory implementation of AlbumRepository"""

    def __init__(self):
        self._storage: Dict[str, Album] = {}

    async def create(self, entity: Album) -> Album:
        """Create a new album"""
        if not entity.id:
            entity.id = str(uuid.uuid4())
        entity.created_at = datetime.utcnow()
        entity.updated_at = datetime.utcnow()

        self._storage[entity.id] = entity
        return entity

    async def get_by_id(self, entity_id: str) -> Optional[Album]:
        """Get album by ID"""
        return self._storage.get(entity_id)

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[Album]:
        """Get all albums with pagination"""
        albums = list(self._storage.values())
        return albums[skip : skip + limit]

    async def update(self, entity_id: str, entity: Album) -> Optional[Album]:
        """Update an existing album"""
        if entity_id not in self._storage:
            return None

        entity.id = entity_id
        entity.updated_at = datetime.utcnow()
        self._storage[entity_id] = entity
        return entity

    async def delete(self, entity_id: str) -> bool:
        """Delete an album"""
        if entity_id not in self._storage:
            return False

        del self._storage[entity_id]
        return True

    async def get_by_event_code(self, event_code: str) -> Optional[Album]:
        """Get album by event code"""
        for album in self._storage.values():
            if album.event_code.upper() == event_code.upper():
                return album
        return None

    async def increment_photo_count(self, album_id: str) -> bool:
        """Increment the photo count for an album"""
        album = self._storage.get(album_id)
        if not album:
            return False

        album.photo_count += 1
        album.updated_at = datetime.utcnow()
        return True

    async def decrement_photo_count(self, album_id: str) -> bool:
        """Decrement the photo count for an album"""
        album = self._storage.get(album_id)
        if not album:
            return False

        if album.photo_count > 0:
            album.photo_count -= 1
            album.updated_at = datetime.utcnow()
        return True
