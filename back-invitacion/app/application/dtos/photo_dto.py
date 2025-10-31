from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class PhotoUploadDTO(BaseModel):
    """DTO for uploading a photo"""

    album_id: str
    uploader_name: Optional[str] = "Anonymous"


class PhotoResponseDTO(BaseModel):
    """DTO for photo response"""

    id: str
    url: str
    public_id: str
    album_id: str
    thumbnail_url: Optional[str] = None
    original_filename: Optional[str] = None
    uploader_name: Optional[str] = None
    file_size: Optional[int] = None
    width: Optional[int] = None
    height: Optional[int] = None
    format: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class PhotoListResponseDTO(BaseModel):
    """DTO for photo list response"""

    total: int
    photos: list[PhotoResponseDTO]
    album_id: str
