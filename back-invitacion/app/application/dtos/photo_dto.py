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
    media_type: str = "image"
    thumbnail_url: Optional[str] = None
    original_filename: Optional[str] = None
    uploader_name: Optional[str] = None
    file_size: Optional[int] = None
    width: Optional[int] = None
    height: Optional[int] = None
    format: Optional[str] = None
    duration: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True


class PhotoListResponseDTO(BaseModel):
    """DTO for photo list response"""

    total: int
    photos: list[PhotoResponseDTO]
    album_id: str


class BulkUploadItemResponseDTO(BaseModel):
    """DTO for individual file upload result in bulk upload"""

    original_filename: str
    success: bool
    data: Optional[PhotoResponseDTO] = None
    error_message: Optional[str] = None


class BulkUploadResponseDTO(BaseModel):
    """DTO for bulk upload response"""

    total: int
    successful: int
    failed: int
    album_id: str
    results: list[BulkUploadItemResponseDTO]
