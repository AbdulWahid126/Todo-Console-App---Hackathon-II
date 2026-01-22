"""
Database session configuration for Neon PostgreSQL
Task: P2-T-010
From: specs/phase-ii/data-model
Sets up database connection with Neon PostgreSQL as required by constitution VII. Database Schema Standards
"""

from sqlmodel import create_engine, Session
from sqlalchemy.pool import QueuePool
from typing import Generator
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database URL from environment - using Neon PostgreSQL as required by constitution
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/todo_app?sslmode=require")

# Create engine with appropriate settings for Neon PostgreSQL
engine = create_engine(
    DATABASE_URL,
    # Pool settings appropriate for Neon
    poolclass=QueuePool,
    pool_size=5,
    max_overflow=10,
    pool_pre_ping=True,  # Verify connections before use
    pool_recycle=300,    # Recycle connections every 5 minutes
    echo=False           # Set to True for SQL debugging
)


def get_session() -> Generator[Session, None, None]:
    """
    Get database session for dependency injection
    Task: P2-T-013
    From: specs/phase-ii/data-model
    """
    with Session(engine) as session:
        yield session