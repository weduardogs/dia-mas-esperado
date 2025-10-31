from typing import Optional
from app.domain.entities.base import BaseEntity


class Album(BaseEntity):
    """Album/Event domain entity for grouping photos"""

    name: str  # Event name (e.g., "Wedding Party 2024")
    event_code: str  # Unique code for guests to join (e.g., "PARTY2024")
    description: Optional[str] = None
    event_date: Optional[str] = None
    is_active: bool = True  # Can disable after event
    max_photos_per_user: Optional[int] = None  # Limit photos per guest
    photo_count: int = 0  # Total photos in album
