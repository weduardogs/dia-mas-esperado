from typing import Optional
from app.domain.entities.base import BaseEntity


class Photo(BaseEntity):
    """Photo domain entity"""

    url: str  # Cloudinary URL
    public_id: str  # Cloudinary public ID for deletion
    album_id: str  # Album/Event identifier
    thumbnail_url: Optional[str] = None  # Thumbnail version
    original_filename: Optional[str] = None
    uploader_name: Optional[str] = None  # Guest name who uploaded
    file_size: Optional[int] = None  # Size in bytes
    width: Optional[int] = None
    height: Optional[int] = None
    format: Optional[str] = None  # jpg, png, etc.
