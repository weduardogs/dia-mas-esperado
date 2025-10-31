from typing import List
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.infrastructure.database.connection import get_db
from app.infrastructure.repositories.album_repository_impl import AlbumRepositoryImpl
from app.application.use_cases.album_use_cases import (
    CreateAlbumUseCase,
    GetAlbumUseCase,
    GetAlbumByCodeUseCase,
    GetAllAlbumsUseCase,
    UpdateAlbumUseCase,
    DeleteAlbumUseCase,
)
from app.application.dtos.album_dto import (
    AlbumCreateDTO,
    AlbumUpdateDTO,
    AlbumResponseDTO,
)
from app.domain.exceptions.base import EntityNotFoundException, EntityAlreadyExistsException

router = APIRouter()


@router.post("/", response_model=AlbumResponseDTO, status_code=status.HTTP_201_CREATED)
async def create_album(
    album_data: AlbumCreateDTO,
    db: AsyncSession = Depends(get_db),
):
    """
    Create a new album/event

    - **name**: Event name
    - **event_code**: Unique code for guests to join (e.g., "WEDDING2024")
    - **description**: Event description (optional)
    - **event_date**: Event date (optional)
    - **max_photos_per_user**: Maximum photos per guest (optional)
    """
    try:
        album_repository = AlbumRepositoryImpl(db)
        use_case = CreateAlbumUseCase(album_repository)
        album = await use_case.execute(album_data)
        return AlbumResponseDTO.model_validate(album)
    except EntityAlreadyExistsException as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/code/{event_code}", response_model=AlbumResponseDTO)
async def get_album_by_code(
    event_code: str,
    db: AsyncSession = Depends(get_db),
):
    """
    Get an album by event code

    - **event_code**: Event code
    """
    try:
        album_repository = AlbumRepositoryImpl(db)
        use_case = GetAlbumByCodeUseCase(album_repository)
        album = await use_case.execute(event_code)
        return AlbumResponseDTO.model_validate(album)
    except EntityNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/{album_id}", response_model=AlbumResponseDTO)
async def get_album(
    album_id: str,
    db: AsyncSession = Depends(get_db),
):
    """
    Get an album by ID

    - **album_id**: Album ID
    """
    try:
        album_repository = AlbumRepositoryImpl(db)
        use_case = GetAlbumUseCase(album_repository)
        album = await use_case.execute(album_id)
        return AlbumResponseDTO.model_validate(album)
    except EntityNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/", response_model=List[AlbumResponseDTO])
async def get_all_albums(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db),
):
    """
    Get all albums with pagination

    - **skip**: Number of albums to skip
    - **limit**: Maximum number of albums to return
    """
    try:
        album_repository = AlbumRepositoryImpl(db)
        use_case = GetAllAlbumsUseCase(album_repository)
        albums = await use_case.execute(skip=skip, limit=limit)
        return [AlbumResponseDTO.model_validate(album) for album in albums]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.put("/{album_id}", response_model=AlbumResponseDTO)
async def update_album(
    album_id: str,
    album_data: AlbumUpdateDTO,
    db: AsyncSession = Depends(get_db),
):
    """
    Update an album

    - **album_id**: Album ID
    """
    try:
        album_repository = AlbumRepositoryImpl(db)
        use_case = UpdateAlbumUseCase(album_repository)
        album = await use_case.execute(album_id, album_data)
        return AlbumResponseDTO.model_validate(album)
    except EntityNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.delete("/{album_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_album(
    album_id: str,
    db: AsyncSession = Depends(get_db),
):
    """
    Delete an album

    - **album_id**: Album ID
    """
    try:
        album_repository = AlbumRepositoryImpl(db)
        use_case = DeleteAlbumUseCase(album_repository)
        await use_case.execute(album_id)
    except EntityNotFoundException as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
