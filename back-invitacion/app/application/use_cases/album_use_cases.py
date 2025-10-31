from typing import List
from app.domain.entities.album import Album
from app.domain.repositories.album_repository import AlbumRepository
from app.domain.exceptions.base import EntityNotFoundException, EntityAlreadyExistsException
from app.application.dtos.album_dto import AlbumCreateDTO, AlbumUpdateDTO


class CreateAlbumUseCase:
    """Use case for creating a new album"""

    def __init__(self, album_repository: AlbumRepository):
        self.album_repository = album_repository

    async def execute(self, album_data: AlbumCreateDTO) -> Album:
        # Check if event code already exists
        existing_album = await self.album_repository.get_by_event_code(
            album_data.event_code
        )
        if existing_album:
            raise EntityAlreadyExistsException(
                f"Album with event code {album_data.event_code} already exists"
            )

        album = Album(
            name=album_data.name,
            event_code=album_data.event_code.upper(),
            description=album_data.description,
            event_date=album_data.event_date,
            max_photos_per_user=album_data.max_photos_per_user,
        )

        return await self.album_repository.create(album)


class GetAlbumUseCase:
    """Use case for getting an album by ID"""

    def __init__(self, album_repository: AlbumRepository):
        self.album_repository = album_repository

    async def execute(self, album_id: str) -> Album:
        album = await self.album_repository.get_by_id(album_id)
        if not album:
            raise EntityNotFoundException(f"Album with id {album_id} not found")
        return album


class GetAlbumByCodeUseCase:
    """Use case for getting an album by event code"""

    def __init__(self, album_repository: AlbumRepository):
        self.album_repository = album_repository

    async def execute(self, event_code: str) -> Album:
        album = await self.album_repository.get_by_event_code(event_code.upper())
        if not album:
            raise EntityNotFoundException(
                f"Album with event code {event_code} not found"
            )
        return album


class GetAllAlbumsUseCase:
    """Use case for getting all albums"""

    def __init__(self, album_repository: AlbumRepository):
        self.album_repository = album_repository

    async def execute(self, skip: int = 0, limit: int = 100) -> List[Album]:
        return await self.album_repository.get_all(skip=skip, limit=limit)


class UpdateAlbumUseCase:
    """Use case for updating an album"""

    def __init__(self, album_repository: AlbumRepository):
        self.album_repository = album_repository

    async def execute(self, album_id: str, album_data: AlbumUpdateDTO) -> Album:
        existing_album = await self.album_repository.get_by_id(album_id)
        if not existing_album:
            raise EntityNotFoundException(f"Album with id {album_id} not found")

        update_data = album_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(existing_album, field, value)

        updated_album = await self.album_repository.update(album_id, existing_album)
        if not updated_album:
            raise EntityNotFoundException(f"Album with id {album_id} not found")

        return updated_album


class DeleteAlbumUseCase:
    """Use case for deleting an album"""

    def __init__(self, album_repository: AlbumRepository):
        self.album_repository = album_repository

    async def execute(self, album_id: str) -> bool:
        result = await self.album_repository.delete(album_id)
        if not result:
            raise EntityNotFoundException(f"Album with id {album_id} not found")
        return result
