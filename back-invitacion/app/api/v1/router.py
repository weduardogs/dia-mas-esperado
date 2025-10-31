from fastapi import APIRouter
from app.api.v1.routes import health, photos, albums

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(albums.router, prefix="/albums", tags=["albums"])
api_router.include_router(photos.router, prefix="/photos", tags=["photos"])
