from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.database.connection import get_db
from app.infrastructure.repositories.photo_repository_impl import PhotoRepositoryImpl
from app.infrastructure.repositories.album_repository_impl import AlbumRepositoryImpl
from app.infrastructure.repositories.singletons import cloudinary_service
from app.application.use_cases.photo_use_cases import (
    UploadPhotoUseCase,
    GetPhotosUseCase,
    GetPhotoUseCase,
    DeletePhotoUseCase,
)
from app.application.dtos.photo_dto import (
    PhotoUploadDTO,
    PhotoResponseDTO,
    PhotoListResponseDTO,
)
from app.domain.exceptions.base import EntityNotFoundException, ValidationException

router = APIRouter()


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
