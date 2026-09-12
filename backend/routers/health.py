from fastapi import APIRouter
from backend.config import settings

router = APIRouter(tags=["Health"])


@router.get("/")
async def root():
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "online",
        "database": "SQLite (road_safety.db)",
        "docs": "/docs",
        "redoc": "/redoc"
    }


@router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "version": settings.APP_VERSION,
        "database": "connected"
    }
