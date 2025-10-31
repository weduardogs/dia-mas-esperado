from abc import abstractmethod
from typing import List, Optional
from app.domain.repositories.base_repository import BaseRepository
from app.domain.entities.photo import Photo


class PhotoRepository(BaseRepository[Photo]):
    """Photo repository interface"""

    @abstractmethod
    async def get_by_album_id(self, album_id: str, skip: int = 0, limit: int = 100) -> List[Photo]:
        """Get all photos in an album"""
        pass

    @abstractmethod
    async def get_by_public_id(self, public_id: str) -> Optional[Photo]:
        """Get photo by Cloudinary public ID"""
        pass

    @abstractmethod
    async def count_by_album_id(self, album_id: str) -> int:
        """Count photos in an album"""
        pass

    @abstractmethod
    async def delete_by_public_id(self, public_id: str) -> bool:
        """Delete photo by Cloudinary public ID"""
        pass
