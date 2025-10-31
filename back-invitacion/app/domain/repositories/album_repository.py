from abc import abstractmethod
from typing import Optional
from app.domain.repositories.base_repository import BaseRepository
from app.domain.entities.album import Album


class AlbumRepository(BaseRepository[Album]):
    """Album repository interface"""

    @abstractmethod
    async def get_by_event_code(self, event_code: str) -> Optional[Album]:
        """Get album by event code"""
        pass

    @abstractmethod
    async def increment_photo_count(self, album_id: str) -> bool:
        """Increment the photo count for an album"""
        pass

    @abstractmethod
    async def decrement_photo_count(self, album_id: str) -> bool:
        """Decrement the photo count for an album"""
        pass
