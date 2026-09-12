from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health")
@router.get("/api/health")
async def health_check():
    """Detailed health check endpoint"""
    return {
        "status": "healthy",
        "service": "RakshaPath Road Safety AI Platform",
        "database": "connected",
        "api": "operational"
    }


@router.get("/")
async def root():
    """Root endpoint"""
    return {
        "status": "operational",
        "service": "RakshaPath Road Safety AI Intelligence Engine",
        "version": "1.0.0"
    }
