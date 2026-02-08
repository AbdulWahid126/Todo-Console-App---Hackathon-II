"""
Main FastAPI application for the Todo Application
Task: P2-T-012
From: specs/phase-ii/plan
Implements FastAPI app with CORS and exception handlers as required by constitution III. Clean Architecture & Stateless Services
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from api.v1.todos import router as todos_router
from api.v1.dashboard import router as dashboard_router
from api.v1.auth import router as auth_router
from sqlmodel import SQLModel
from models.todo import Todo
from database.session import engine
from dependencies import get_db
import os
import logging
import traceback
from typing import List, Union
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- PASSLIB BCRYPT COMPATIBILITY PATCH ---
# This fixes "TypeError: Names must be strings" when using passlib with bcrypt>=4.0.0
import logging
logging.getLogger('passlib').setLevel(logging.ERROR)

try:
    from passlib.context import CryptContext
    import bcrypt
    # Check if we need the patch (usually bcrypt >= 4.0.0)
    if hasattr(bcrypt, "__version__") and int(bcrypt.__version__.split('.')[0]) >= 4:
        from passlib.handlers.bcrypt import bcrypt as bcrypt_handler
        # Monkey patch the bcrypt handler to handle the new bcrypt library structure
        original_backend = bcrypt_handler._get_backend
        def patched_get_backend():
            backend = original_backend()
            if hasattr(backend, "name") and not isinstance(backend.name, str):
                backend.name = str(backend.name)
            return backend
        bcrypt_handler._get_backend = patched_get_backend
except Exception as e:
    print(f"Bcrypt patch failed: {e}")
# ----------------------------------------

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for application startup and shutdown
    Task: P2-T-019
    From: specs/phase-ii/data-model
    """
    # For development: create tables if they don't exist
    # In production, use proper migrations with Alembic
    # Note: We removed drop_all() to enable data persistence
    SQLModel.metadata.create_all(bind=engine)
    yield

# Initialize FastAPI app with metadata and lifespan
app = FastAPI(
    title="Todo API",
    description="REST API for Todo application with enhanced dashboard functionality - Updated",
    version="1.0.0",
    lifespan=lifespan
)

# Get allowed origins from environment variable or use defaults
allowed_origins_raw = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:3005,http://127.0.0.1:3000,http://127.0.0.1:3005")
allowed_origins = [origin.strip() for origin in allowed_origins_raw.split(",") if origin.strip()]

# Add CORS middleware for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins else ["*"],
    allow_credentials=True if allowed_origins else False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(todos_router, prefix="/api/v1", tags=["todos"])
app.include_router(dashboard_router, prefix="/api/v1", tags=["dashboard"])
app.include_router(auth_router, prefix="/api/v1", tags=["auth"])

@app.get("/")
async def root():
    """
    Root endpoint for API health check
    Task: P2-T-012
    From: specs/phase-ii/plan
    """
    return {"message": "Todo API is running"}

@app.get("/health")
async def health_check():
    """
    Health check endpoint for monitoring
    Task: P2-T-012
    From: specs/phase-ii/plan
    """
    return {"status": "healthy", "service": "todo-api"}

# Import JSONResponse for exception handlers
from fastapi.responses import JSONResponse

# Exception handlers for custom error responses
@app.exception_handler(Exception)
async def generic_exception_handler(request, exc):
    """
    Generic exception handler for unexpected errors
    Task: P2-T-041
    From: specs/phase-ii/contracts/api-contracts
    """
    # Log the full traceback to stdout (visible in cloud logs)
    error_msg = f"Unhandled exception: {str(exc)}"
    print(f"ERROR: {error_msg}")
    traceback.print_exc()
    
    # Return detail to frontend (helpful for initial debugging)
    # In a strict production environment, you might want to hide this
    return JSONResponse(
        status_code=500,
        content={
            "detail": "An internal error occurred",
            "error": str(exc) if os.getenv("DEBUG") == "True" else "Check logs for details"
        },
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)