from typing import BinaryIO, List, Tuple, Dict, Any
from app.domain.entities.photo import Photo
from app.domain.repositories.photo_repository import PhotoRepository
from app.domain.repositories.album_repository import AlbumRepository
from app.domain.exceptions.base import EntityNotFoundException, ValidationException
from app.application.dtos.photo_dto import PhotoUploadDTO, BulkUploadItemResponseDTO


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
            media_type="image",  # Single upload is for images only
            thumbnail_url=cloudinary_response.get("thumbnail_url"),
            original_filename=filename,
            uploader_name=upload_data.uploader_name,
            file_size=cloudinary_response.get("bytes"),
            width=cloudinary_response.get("width"),
            height=cloudinary_response.get("height"),
            format=cloudinary_response.get("format"),
            duration=None,  # Images don't have duration
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


class BulkUploadMediaUseCase:
    """Use case for bulk uploading multiple photos/videos to Cloudinary"""

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
        self,
        files_data: List[Tuple[BinaryIO, str, str]],  # (file, filename, media_type)
        upload_data: PhotoUploadDTO,
    ) -> List[BulkUploadItemResponseDTO]:
        """
        Execute bulk upload of multiple files

        Args:
            files_data: List of tuples (file, filename, media_type)
            upload_data: Upload metadata (album_id, uploader_name)

        Returns:
            List of BulkUploadItemResponseDTO with results for each file
        """
        # Verify album exists and is active (only once)
        album = await self.album_repository.get_by_id(upload_data.album_id)
        if not album:
            raise EntityNotFoundException(f"Album with id {upload_data.album_id} not found")

        if not album.is_active:
            raise ValidationException("This album is no longer accepting photos")

        # Upload all files to Cloudinary in parallel
        cloudinary_results = await self.cloudinary_service.bulk_upload(
            files_data=files_data,
            folder=f"albums/{upload_data.album_id}",
        )

        # Process results and create entities
        results = []
        photos_to_save = []
        failed_uploads = []

        from app.application.dtos.photo_dto import PhotoResponseDTO

        for (file, filename, media_type), cloudinary_response in zip(
            files_data, cloudinary_results
        ):
            # Check if upload to Cloudinary failed
            if "error" in cloudinary_response:
                failed_uploads.append(
                    BulkUploadItemResponseDTO(
                        original_filename=filename,
                        success=False,
                        error_message=cloudinary_response.get("error"),
                    )
                )
                continue

            # Create photo entity
            # Convert duration from float to int (round seconds)
            duration = cloudinary_response.get("duration")
            if duration is not None:
                duration = int(round(duration))

            photo = Photo(
                url=cloudinary_response["url"],
                public_id=cloudinary_response["public_id"],
                album_id=upload_data.album_id,
                media_type=media_type,
                thumbnail_url=cloudinary_response.get("thumbnail_url"),
                original_filename=filename,
                uploader_name=upload_data.uploader_name,
                file_size=cloudinary_response.get("bytes"),
                width=cloudinary_response.get("width"),
                height=cloudinary_response.get("height"),
                format=cloudinary_response.get("format"),
                duration=duration,  # For videos (converted to int)
            )

            photos_to_save.append((photo, filename))

        # Save all photos to database in bulk
        successful_uploads = 0
        if photos_to_save:
            try:
                photos_entities = [photo for photo, _ in photos_to_save]
                saved_photos = await self.photo_repository.bulk_create(photos_entities)

                # Commit immediately after bulk insert to avoid connection timeout
                await self.photo_repository.session.commit()

                successful_uploads = len(saved_photos)

                # Create success responses
                for saved_photo, (_, filename) in zip(saved_photos, photos_to_save):
                    photo_dto = PhotoResponseDTO(
                        id=saved_photo.id,
                        url=saved_photo.url,
                        public_id=saved_photo.public_id,
                        album_id=saved_photo.album_id,
                        media_type=saved_photo.media_type,
                        thumbnail_url=saved_photo.thumbnail_url,
                        original_filename=saved_photo.original_filename,
                        uploader_name=saved_photo.uploader_name,
                        file_size=saved_photo.file_size,
                        width=saved_photo.width,
                        height=saved_photo.height,
                        format=saved_photo.format,
                        duration=saved_photo.duration,
                        created_at=saved_photo.created_at,
                    )

                    results.append(
                        BulkUploadItemResponseDTO(
                            original_filename=filename,
                            success=True,
                            data=photo_dto,
                        )
                    )

            except Exception as e:
                # Rollback on error
                try:
                    await self.photo_repository.session.rollback()
                except:
                    pass

                # If bulk save fails, mark all as failed
                for _, filename in photos_to_save:
                    results.append(
                        BulkUploadItemResponseDTO(
                            original_filename=filename,
                            success=False,
                            error_message=f"Failed to save to database: {str(e)}",
                        )
                    )

        # Add failed uploads to results
        results.extend(failed_uploads)

        # Increment album photo count only once for all successful uploads
        if successful_uploads > 0:
            try:
                for _ in range(successful_uploads):
                    await self.album_repository.increment_photo_count(upload_data.album_id)
                # Commit the counter updates
                await self.album_repository.session.commit()
            except Exception as e:
                # If counter update fails, log but don't fail the whole operation
                # The photos are already saved successfully
                try:
                    await self.album_repository.session.rollback()
                except:
                    pass

        return results
