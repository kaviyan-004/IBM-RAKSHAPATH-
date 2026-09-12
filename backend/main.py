import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config import settings
from backend.database import init_db
from backend.routers import (
    health,
    auth,
    locations,
    risk,
    causes,
    vulnerability,
    temporal,
    prediction,
    interventions,
    simulation,
    optimize,
    dashboard,
    alerts,
    reports,
    incidents,
    train,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager: SQLite database initialization & dataset auto-seed"""
    logger.info("Initializing RakshaPath Road Safety AI Decision Intelligence Platform...")
    init_db()
    logger.info("RakshaPath Backend is ready to serve requests.")
    yield
    logger.info("Shutting down RakshaPath Backend.")


app = FastAPI(
    title=settings.APP_NAME,
    description="AI-powered road accident prediction, explainability, simulation, and budget optimization platform powered by MoRTH and NCRB machine learning models.",
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root and Health check
app.include_router(health.router)

# Mount all modules under /api and /api/v1
api_routers = [
    auth.router,
    locations.router,
    risk.router,
    causes.router,
    vulnerability.router,
    temporal.router,
    prediction.router,
    interventions.router,
    simulation.router,
    optimize.router,
    dashboard.router,
    alerts.router,
    reports.router,
    incidents.router,
    train.router,
]

for router in api_routers:
    app.include_router(router, prefix=settings.API_PREFIX)
    app.include_router(router, prefix=settings.API_V1_PREFIX)
