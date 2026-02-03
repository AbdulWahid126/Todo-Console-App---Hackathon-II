"""
User model for authentication
Task: P2-T-026
From: specs/phase-ii/auth-spec
"""

from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid
from passlib.context import CryptContext
import re

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserBase(SQLModel):
    """
    Base class containing common fields for User model
    Task: P2-T-026
    From: specs/phase-ii/auth-spec
    """
    email: str = Field(unique=True, nullable=False, max_length=255, regex=r'^[^@]+@[^@]+\.[^@]+$')
    name: str = Field(min_length=1, max_length=100)


class User(UserBase, table=True):
    """
    User model for authentication system
    Task: P2-T-026
    From: specs/phase-ii/auth-spec
    """
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    hashed_password: str = Field(nullable=False)
    is_active: bool = Field(default=True)
    is_verified: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = Field(default=None)


class UserCreate(UserBase):
    """
    Schema for creating a new user
    Task: P2-T-026
    From: specs/phase-ii/auth-spec
    """
    password: str = Field(min_length=8, max_length=128)

    @classmethod
    def hash_password(cls, password: str) -> str:
        # Bcrypt has a maximum password length of 72 bytes
        # Truncate the password if it exceeds the limit
        if len(password.encode('utf-8')) > 72:
            password = password[:72]
        return pwd_context.hash(password)

    @classmethod
    def validate_email(cls, email: str) -> bool:
        pattern = r'^[^@]+@[^@]+\.[^@]+$'
        return bool(re.match(pattern, email))


class UserUpdate(SQLModel):
    """
    Schema for updating user information
    Task: P2-T-026
    From: specs/phase-ii/auth-spec
    """
    name: Optional[str] = Field(default=None, min_length=1, max_length=100)
    email: Optional[str] = Field(default=None, max_length=255)


class UserPublic(UserBase):
    """
    Public schema for user responses (without sensitive data)
    Task: P2-T-026
    From: specs/phase-ii/auth-spec
    """
    id: str
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        json_schema_extra = {
            "examples": [
                {
                    "id": "550e8400-e29b-41d4-a716-446655440000",
                    "email": "user@example.com",
                    "name": "John Doe",
                    "is_active": True,
                    "is_verified": False,
                    "created_at": "2026-01-18T10:30:00Z",
                    "updated_at": "2026-01-18T10:30:00Z"
                }
            ]
        }


class UserLogin(SQLModel):
    """
    Schema for user login
    Task: P2-T-026
    From: specs/phase-ii/auth-spec
    """
    email: str
    password: str

    class Config:
        json_schema_extra = {
            "examples": [
                {
                    "email": "user@example.com",
                    "password": "securepassword123"
                }
            ]
        }


class Token(SQLModel):
    """
    Schema for authentication token
    Task: P2-T-026
    From: specs/phase-ii/auth-spec
    """
    token: str
    token_type: str = "bearer"
    user: UserPublic


class TokenData(SQLModel):
    """
    Schema for token data
    Task: P2-T-026
    From: specs/phase-ii/auth-spec
    """
    user_id: str
    email: str