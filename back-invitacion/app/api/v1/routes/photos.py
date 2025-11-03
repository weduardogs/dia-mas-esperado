from typing import Optional, List
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.database.connection import get_db
from app.infrastructure.repositories.photo_repository_impl import PhotoRepositoryImpl
from app.infrastructure.repositories.album_repository_impl import AlbumRepositoryImpl
from app.infrastructure.repositories.singletons import cloudinary_service
from app.infrastructure.config.settings import settings
from app.application.use_cases.photo_use_cases import (
    UploadPhotoUseCase,
    GetPhotosUseCase,
    GetPhotoUseCase,
    DeletePhotoUseCase,
    BulkUploadMediaUseCase,
)
from app.application.dtos.photo_dto import (
    PhotoUploadDTO,
    PhotoResponseDTO,
    PhotoListResponseDTO,
    BulkUploadResponseDTO,
)
from app.domain.exceptions.base import EntityNotFoundException, ValidationException

router = APIRouter()


@router.get("/test-db")
async def test_database_connection():
    """Test database connection"""
    from app.infrastructure.database.connection import AsyncSessionLocal
    from sqlalchemy import text
    try:
        async with AsyncSessionLocal() as session:
            result = await session.execute(text("SELECT 1 as test"))
            row = result.fetchone()
            return {"status": "connected", "test": row[0] if row else None}
    except Exception as e:
        return {"status": "error", "message": str(e), "type": type(e).__name__}


@router.post("/upload", response_model=PhotoResponseDTO, status_code=status.HTTP_201_CREATED)
async def upload_photo(
    file: UploadFile = File(...),
    album_id: str = Form(...),
    uploader_name: Optional[str] = Form("Anonymous"),
    db: AsyncSession = Depends(get_db),
):
    """
    Upload a photo to an album

    - **file**: Image file (jpg, png, etc.)
    - **album_id**: Album/Event ID
    - **uploader_name**: Name of the person uploading (optional)
    """
    try:
        # Validate file type
        if not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File must be an image",
            )

        # Read file
        file_content = await file.read()

        # Create upload DTO
        upload_data = PhotoUploadDTO(
            album_id=album_id, uploader_name=uploader_name
        )

        # Execute use case
        photo_repository = PhotoRepositoryImpl(db)
        album_repository = AlbumRepositoryImpl(db)
        use_case = UploadPhotoUseCase(
            photo_repository, album_repository, cloudinary_service
        )
        photo = await use_case.execute(file_content, file.filename, upload_data)

        return PhotoResponseDTO.model_validate(photo)

    except EntityNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except ValidationException as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post("/bulk-upload", response_model=BulkUploadResponseDTO, status_code=status.HTTP_207_MULTI_STATUS)
async def bulk_upload_media(
    files: List[UploadFile] = File(...),
    album_id: str = Form(...),
    uploader_name: Optional[str] = Form("Anonymous"),
):
    """
    Bulk upload multiple photos and/or videos to an album

    Sequential processing: Each file is uploaded to Cloudinary and saved to DB
    immediately with its own short-lived database session.

    - **files**: List of files (images and/or videos)
    - **album_id**: Album/Event ID
    - **uploader_name**: Name of the person uploading (optional)

    Supported image formats: JPEG, PNG, HEIF/HEIC (iPhone), WebP, GIF
    Supported video formats: MP4, MOV (iPhone), WebM

    Maximum files per request: 10
    Maximum file size: 50 MB per file
    """
    from app.infrastructure.database.connection import AsyncSessionLocal
    from app.application.dtos.photo_dto import PhotoResponseDTO, BulkUploadItemResponseDTO
    from app.domain.entities.photo import Photo

    try:
        # Validate number of files
        if len(files) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="At least one file must be provided",
            )

        if len(files) > settings.MAX_FILES_PER_REQUEST:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Maximum {settings.MAX_FILES_PER_REQUEST} files allowed per request",
            )

        # Allowed file types
        allowed_types = settings.ALLOWED_IMAGE_TYPES + settings.ALLOWED_VIDEO_TYPES
        max_file_size = settings.MAX_FILE_SIZE_MB * 1024 * 1024  # Convert to bytes

        # Validate and read all files first
        files_data = []
        for file in files:
            # Validate content type
            if file.content_type not in allowed_types:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"File '{file.filename}' has unsupported type '{file.content_type}'. "
                           f"Allowed types: {', '.join(allowed_types)}",
                )

            # Read file content
            file_content = await file.read()

            # Validate file size
            if len(file_content) > max_file_size:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"File '{file.filename}' exceeds maximum size of {settings.MAX_FILE_SIZE_MB} MB",
                )

            # Determine media type
            media_type = "video" if file.content_type.startswith("video/") else "image"

            files_data.append((file_content, file.filename, media_type))

        # Step 1: Validate album exists with a short-lived session
        async with AsyncSessionLocal() as session:
            album_repository = AlbumRepositoryImpl(session)
            album = await album_repository.get_by_id(album_id)
            if not album:
                raise EntityNotFoundException(f"Album with id {album_id} not found")
            if not album.is_active:
                raise ValidationException("This album is no longer accepting photos")
        # Session is now closed

        # Step 2: Process each file SEQUENTIALLY
        results = []
        successful_count = 0

        for file_content, filename, media_type in files_data:
            try:
                # Upload to Cloudinary (no DB session active)
                if media_type == "video":
                    cloudinary_response = await cloudinary_service.upload_video(
                        file=file_content,
                        filename=filename,
                        folder=f"albums/{album_id}",
                    )
                else:
                    cloudinary_response = await cloudinary_service.upload_image(
                        file=file_content,
                        filename=filename,
                        folder=f"albums/{album_id}",
                    )

                # Convert duration from float to int for videos
                duration = cloudinary_response.get("duration")
                if duration is not None:
                    duration = int(round(duration))

                # Create photo entity
                photo = Photo(
                    url=cloudinary_response["url"],
                    public_id=cloudinary_response["public_id"],
                    album_id=album_id,
                    media_type=media_type,
                    thumbnail_url=cloudinary_response.get("thumbnail_url"),
                    original_filename=filename,
                    uploader_name=uploader_name,
                    file_size=cloudinary_response.get("bytes"),
                    width=cloudinary_response.get("width"),
                    height=cloudinary_response.get("height"),
                    format=cloudinary_response.get("format"),
                    duration=duration,
                )

                # Save to database with NEW short-lived session
                async with AsyncSessionLocal() as session:
                    photo_repository = PhotoRepositoryImpl(session)
                    saved_photo = await photo_repository.create(photo)
                    await session.commit()
                    # Session closes automatically here

                # Increment successful counter
                successful_count += 1

                # Create success response
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
                # If this specific file fails, continue with the next one
                results.append(
                    BulkUploadItemResponseDTO(
                        original_filename=filename,
                        success=False,
                        error_message=str(e),
                    )
                )

        # Step 3: Update album photo count with a separate session
        if successful_count > 0:
            async with AsyncSessionLocal() as session:
                try:
                    album_repository = AlbumRepositoryImpl(session)
                    for _ in range(successful_count):
                        await album_repository.increment_photo_count(album_id)
                    await session.commit()
                except Exception:
                    # If counter update fails, don't fail the whole operation
                    # Photos are already saved successfully
                    await session.rollback()

        # Count totals
        successful = sum(1 for r in results if r.success)
        failed = len(results) - successful

        return BulkUploadResponseDTO(
            total=len(results),
            successful=successful,
            failed=failed,
            album_id=album_id,
            results=results,
        )

    except EntityNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except ValidationException as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/album/{album_id}", response_model=PhotoListResponseDTO)
async def get_photos_by_album(
    album_id: str,
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db),
):
    """
    Get all photos in an album

    - **album_id**: Album/Event ID
    - **skip**: Number of photos to skip (pagination)
    - **limit**: Maximum number of photos to return
    """
    try:
        photo_repository = PhotoRepositoryImpl(db)
        use_case = GetPhotosUseCase(photo_repository)
        photos, total = await use_case.execute(album_id, skip, limit)

        return PhotoListResponseDTO(
            total=total,
            photos=[PhotoResponseDTO.model_validate(photo) for photo in photos],
            album_id=album_id,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/{photo_id}", response_model=PhotoResponseDTO)
async def get_photo(
    photo_id: str,
    db: AsyncSession = Depends(get_db),
):
    """
    Get a single photo by ID

    - **photo_id**: Photo ID
    """
    try:
        photo_repository = PhotoRepositoryImpl(db)
        use_case = GetPhotoUseCase(photo_repository)
        photo = await use_case.execute(photo_id)
        return PhotoResponseDTO.model_validate(photo)
    except EntityNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.delete("/{photo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_photo(
    photo_id: str,
    db: AsyncSession = Depends(get_db),
):
    """
    Delete a photo

    - **photo_id**: Photo ID
    """
    try:
        photo_repository = PhotoRepositoryImpl(db)
        album_repository = AlbumRepositoryImpl(db)
        use_case = DeletePhotoUseCase(
            photo_repository, album_repository, cloudinary_service
        )
        await use_case.execute(photo_id)
    except EntityNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
