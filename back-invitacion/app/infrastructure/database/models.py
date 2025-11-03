from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
import uuid
from app.infrastructure.database.connection import Base


def generate_uuid():
    """Generate a UUID string"""
    return str(uuid.uuid4())


class AlbumModel(Base):
    """SQLAlchemy model for Album"""

    __tablename__ = "albums"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    event_code = Column(String(50), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    event_date = Column(String(50), nullable=True)
    is_active = Column(Boolean, default=True)
    max_photos_per_user = Column(Integer, nullable=True, default=50)
    photo_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship
    photos = relationship("PhotoModel", back_populates="album", cascade="all, delete-orphan")


class PhotoModel(Base):
    """SQLAlchemy model for Photo"""

    __tablename__ = "photos"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    url = Column(String(500), nullable=False)
    public_id = Column(String(255), unique=True, index=True, nullable=False)
    album_id = Column(String(36), ForeignKey("albums.id", ondelete="CASCADE"), nullable=False)
    media_type = Column(String(10), nullable=False, default="image")  # "image" or "video"
    thumbnail_url = Column(String(500), nullable=True)
    original_filename = Column(String(255), nullable=True)
    uploader_name = Column(String(255), nullable=True, default="Anonymous")
    file_size = Column(Integer, nullable=True)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    format = Column(String(10), nullable=True)
    duration = Column(Integer, nullable=True)  # Duration in seconds (for videos)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship
    album = relationship("AlbumModel", back_populates="photos")
