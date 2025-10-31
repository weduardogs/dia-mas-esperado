from typing import Optional
from pydantic import BaseModel


class AlbumCreateDTO(BaseModel):
    """DTO for creating an album"""

    name: str
    event_code: str
    description: Optional[str] = None
    event_date: Optional[str] = None
    max_photos_per_user: Optional[int] = 50


class AlbumUpdateDTO(BaseModel):
    """DTO for updating an album"""

    name: Optional[str] = None
    description: Optional[str] = None
    event_date: Optional[str] = None
    is_active: Optional[bool] = None
    max_photos_per_user: Optional[int] = None


class AlbumResponseDTO(BaseModel):
    """DTO for album response"""

    id: str
    name: str
    event_code: str
    description: Optional[str] = None
    event_date: Optional[str] = None
    is_active: bool
    max_photos_per_user: Optional[int] = None
    photo_count: int

    class Config:
        from_attributes = True
