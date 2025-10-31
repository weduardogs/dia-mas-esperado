from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.infrastructure.config.settings import settings
from app.infrastructure.database.connection import init_db, close_db
from app.api.v1.router import api_router
from app.api.middlewares.cors import setup_cors
from app.api.middlewares.error_handler import setup_exception_handlers


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan events for FastAPI application"""
    # Startup
    await init_db()
    yield
    # Shutdown
    await close_db()


def create_application() -> FastAPI:
    """Factory function to create FastAPI application"""
    application = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        debug=settings.DEBUG,
        lifespan=lifespan,
    )

    # Setup middlewares
    setup_cors(application)
    setup_exception_handlers(application)

    # Include routers
    application.include_router(api_router, prefix=settings.API_V1_PREFIX)

    return application


app = create_application()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
    )
