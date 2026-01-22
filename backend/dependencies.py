"""
Dependency injection functions for the Todo Application
Task: P2-T-013
From: specs/phase-ii/data-model
Implements dependency injection as required by constitution III. Clean Architecture & Stateless Services
"""
from sqlmodel import Session
from typing import Generator
from .database.session import engine


def get_db() -> Generator[Session, None, None]:
    """
    Get database session for dependency injection
    Task: P2-T-013
    From: specs/phase-ii/data-model
    """
    with Session(engine) as session:
        yield session