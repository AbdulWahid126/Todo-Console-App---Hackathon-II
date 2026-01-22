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
from sqlmodel import SQLModel
from models.todo import Todo
from database.session import engine
from dependencies import get_db
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app with metadata
app = FastAPI(
    title="Todo API",
    description="REST API for Todo application",
    version="1.0.0",
)

# Add CORS middleware for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Frontend origin for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    # Add other origins for production as needed
)

# Include API routers
app.include_router(todos_router, prefix="/api/v1", tags=["todos"])
app.include_router(dashboard_router, prefix="/api/v1", tags=["dashboard"])

@app.on_event("startup")
async def on_startup():
    """
    Initialize database on application startup
    Task: P2-T-019
    From: specs/phase-ii/data-model
    """
    # Create database tables
    SQLModel.metadata.create_all(bind=engine)

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

# Exception handlers for custom error responses
@app.exception_handler(Exception)
async def generic_exception_handler(request, exc):
    """
    Generic exception handler for unexpected errors
    Task: P2-T-041
    From: specs/phase-ii/contracts/api-contracts
    """
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal error occurred"},
    )

# Import JSONResponse for exception handlers
from fastapi.responses import JSONResponse