from typing import BinaryIO, List
from app.domain.entities.photo import Photo
from app.domain.repositories.photo_repository import PhotoRepository
from app.domain.repositories.album_repository import AlbumRepository
from app.domain.exceptions.base import EntityNotFoundException, ValidationException
from app.application.dtos.photo_dto import PhotoUploadDTO


class UploadPhotoUseCase:
    """Use case for uploading a photo to Cloudinary"""

    def __init__(
        self,
        photo_repository: PhotoRepository,
        album_repository: AlbumRepository,
        cloudinary_service,
    ):
        self.photo_repository = photo_repository
        self.album_repository = album_repository
        self.cloudinary_service = cloudinary_service

    async def execute(
        self, file: BinaryIO, filename: str, upload_data: PhotoUploadDTO
    ) -> Photo:
        # Verify album exists and is active
        album = await self.album_repository.get_by_id(upload_data.album_id)
        if not album:
            raise EntityNotFoundException(f"Album with id {upload_data.album_id} not found")

        if not album.is_active:
            raise ValidationException("This album is no longer accepting photos")

        # Upload to Cloudinary
        cloudinary_response = await self.cloudinary_service.upload_image(
            file=file,
            filename=filename,
            folder=f"albums/{upload_data.album_id}",
        )

        # Create photo entity
        photo = Photo(
            url=cloudinary_response["url"],
            public_id=cloudinary_response["public_id"],
            album_id=upload_data.album_id,
            thumbnail_url=cloudinary_response.get("thumbnail_url"),
            original_filename=filename,
            uploader_name=upload_data.uploader_name,
            file_size=cloudinary_response.get("bytes"),
            width=cloudinary_response.get("width"),
            height=cloudinary_response.get("height"),
            format=cloudinary_response.get("format"),
        )

        # Save to repository
        saved_photo = await self.photo_repository.create(photo)

        # Increment album photo count
        await self.album_repository.increment_photo_count(upload_data.album_id)

        return saved_photo


class GetPhotosUseCase:
    """Use case for getting photos from an album"""

    def __init__(self, photo_repository: PhotoRepository):
        self.photo_repository = photo_repository

    async def execute(
        self, album_id: str, skip: int = 0, limit: int = 100
    ) -> tuple[List[Photo], int]:
        photos = await self.photo_repository.get_by_album_id(album_id, skip, limit)
        total = await self.photo_repository.count_by_album_id(album_id)
        return photos, total


class GetPhotoUseCase:
    """Use case for getting a single photo by ID"""

    def __init__(self, photo_repository: PhotoRepository):
        self.photo_repository = photo_repository

    async def execute(self, photo_id: str) -> Photo:
        photo = await self.photo_repository.get_by_id(photo_id)
        if not photo:
            raise EntityNotFoundException(f"Photo with id {photo_id} not found")
        return photo


class DeletePhotoUseCase:
    """Use case for deleting a photo"""

    def __init__(
        self,
        photo_repository: PhotoRepository,
        album_repository: AlbumRepository,
        cloudinary_service,
    ):
        self.photo_repository = photo_repository
        self.album_repository = album_repository
        self.cloudinary_service = cloudinary_service

    async def execute(self, photo_id: str) -> bool:
        # Get photo
        photo = await self.photo_repository.get_by_id(photo_id)
        if not photo:
            raise EntityNotFoundException(f"Photo with id {photo_id} not found")

        # Delete from Cloudinary
        await self.cloudinary_service.delete_image(photo.public_id)

        # Delete from repository
        result = await self.photo_repository.delete(photo_id)

        # Decrement album photo count
        if result:
            await self.album_repository.decrement_photo_count(photo.album_id)

        return result
