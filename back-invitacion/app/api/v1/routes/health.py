from fastapi import APIRouter
from datetime import datetime

router = APIRouter()


@router.get("/health", tags=["health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
    }


@router.get("/", tags=["health"])
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to FastAPI Hexagonal Architecture",
        "docs": "/docs",
        "health": "/api/v1/health",
    }
