import logging
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from backend.config import settings

logger = logging.getLogger(__name__)


class MongoDBManager:
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None


db_manager = MongoDBManager()


async def get_database() -> AsyncIOMotorDatabase:
    """Dependency that yields the active MongoDB database instance"""
    if db_manager.db is None:
        await connect_to_mongo()
    return db_manager.db


async def connect_to_mongo():
    """Initializes async MongoDB client connection and creates indexes"""
    try:
        logger.info(f"Connecting to MongoDB at {settings.MONGODB_URL} (Database: {settings.DATABASE_NAME})...")
        db_manager.client = AsyncIOMotorClient(
            settings.MONGODB_URL,
            serverSelectionTimeoutMS=3000
        )
        db_manager.db = db_manager.client[settings.DATABASE_NAME]

        # Verify connection
        await db_manager.client.admin.command('ping')
        logger.info("Successfully connected to MongoDB!")

        # Create collections & indexes
        await create_indexes()

        # Seed initial dataset if empty
        from backend.services.seed_data import seed_mongo_data
        await seed_mongo_data(db_manager.db)

    except Exception as e:
        logger.warning(f"Could not connect to external MongoDB server ({e}). Initializing in-memory collection cache.")
        # Fallback in-memory collection cache for standalone execution without a running mongo daemon
        from backend.services.seed_data import create_in_memory_mongo_db
        db_manager.db = await create_in_memory_mongo_db()


async def create_indexes():
    """Create essential MongoDB indexes including 2dsphere for geo queries"""
    try:
        db = db_manager.db
        await db.locations.create_index("location_id", unique=True)
        await db.locations.create_index([("geometry", "2dsphere")])
        await db.users.create_index("email", unique=True)
        await db.interventions.create_index("intervention_id", unique=True)
        await db.interventions.create_index("location_id")
        await db.alerts.create_index("id", unique=True)
        await db.reports.create_index("report_id", unique=True)
        logger.info("MongoDB indexes verified.")
    except Exception as e:
        logger.warning(f"Index creation note: {e}")


async def close_mongo_connection():
    """Closes MongoDB connection on application shutdown"""
    if db_manager.client:
        logger.info("Closing MongoDB connection...")
        db_manager.client.close()
        db_manager.client = None
        db_manager.db = None
