"""
Todo model for the Todo Application
Task: P2-T-009
From: specs/phase-ii/data-model
Implements the Todo entity with SQLModel as required by constitution VII. Database Schema Standards
"""

from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid


class TodoBase(SQLModel):
    """
    Base class containing common fields for Todo model
    Task: P2-T-009
    From: specs/phase-ii/data-model
    """
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)
    completed: bool = Field(default=False)


class Todo(TodoBase, table=True):
    """
    Todo model representing a single todo item in the system with persistent storage in Neon PostgreSQL
    Task: P2-T-009
    From: specs/phase-ii/data-model
    """
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)  # Track last update
    user_id: str = Field(index=True)  # Will connect to user when authentication is implemented


class TodoCreate(TodoBase):
    """
    Schema for creating a new todo
    Task: P2-T-021
    From: specs/phase-ii/data-model
    """
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)

    class Config:
        json_schema_extra = {
            "examples": [
                {
                    "title": "New todo title",
                    "description": "Optional description",
                    "completed": False
                }
            ]
        }


class TodoUpdate(SQLModel):
    """
    Schema for updating an existing todo (all fields optional for partial updates)
    Task: P2-T-021
    From: specs/phase-ii/data-model
    """
    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)
    completed: Optional[bool] = None


class TodoPublic(TodoBase):
    """
    Public schema for todo responses
    Task: P2-T-022
    From: specs/phase-ii/data-model
    """
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        json_schema_extra = {
            "examples": [
                {
                    "id": "550e8400-e29b-41d4-a716-446655440000",
                    "title": "Sample todo",
                    "description": "Sample description",
                    "completed": False,
                    "created_at": "2026-01-18T10:30:00Z",
                    "updated_at": "2026-01-18T10:30:00Z"
                }
            ]
        }