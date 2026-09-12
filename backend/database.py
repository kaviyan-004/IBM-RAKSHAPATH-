import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from backend.config import settings

logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(os.path.dirname(BASE_DIR), "road_safety.db")
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    echo=False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """FastAPI database dependency providing a transactional Session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Initializes SQLite database schema and seeds datasets on startup"""
    try:
        logger.info(f"Initializing SQLite database at: {DB_PATH}")
        # Import models so Base registers them
        import backend.models
        Base.metadata.create_all(bind=engine)
        
        db = SessionLocal()
        try:
            from backend.services.seed_data import seed_database
            seed_database(db)
        finally:
            db.close()
            
        logger.info("SQLite database schema initialized and verified.")
    except Exception as e:
        logger.error(f"Error during SQLite database initialization: {e}")
