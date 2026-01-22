"""
API router for todo endpoints in the Todo Application
Task: P2-T-013
From: specs/phase-ii/contracts/api-contracts
Implements RESTful API endpoints as required by constitution V. RESTful API Standards
"""

from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlmodel import Session
from ...dependencies import get_db
from ...models.todo import TodoCreate, TodoUpdate, TodoPublic
from ...services.todo_service import todo_service

# Create API router with prefix and tags
router = APIRouter(
    prefix="/todos",
    tags=["todos"],
    responses={404: {"description": "Todo not found"}}
)


@router.get("/", response_model=List[TodoPublic])
async def list_todos(
    session: Session = Depends(get_db),
    user_id: str = "default_user"  # Placeholder until authentication is implemented
) -> List[TodoPublic]:
    """
    Retrieve all todos for the authenticated user
    Task: P2-T-017
    From: specs/phase-ii/contracts/api-contracts
    """
    try:
        todos = todo_service.get_all_todos(session, user_id)
        return todos
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/", response_model=TodoPublic, status_code=201)
async def create_todo(
    todo_create: TodoCreate,
    session: Session = Depends(get_db),
    user_id: str = "default_user"  # Placeholder until authentication is implemented
) -> TodoPublic:
    """
    Create a new todo
    Task: P2-T-018
    From: specs/phase-ii/contracts/api-contracts
    """
    try:
        # Validate title is not empty or whitespace only
        if not todo_create.title or not todo_create.title.strip():
            raise HTTPException(status_code=400, detail="Title cannot be empty or whitespace only")

        return todo_service.create_todo(session, todo_create, user_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/{todo_id}", response_model=TodoPublic)
async def get_todo(
    todo_id: str,
    session: Session = Depends(get_db),
    user_id: str = "default_user"  # Placeholder until authentication is implemented
) -> TodoPublic:
    """
    Retrieve a specific todo by ID
    Task: P2-T-029
    From: specs/phase-ii/contracts/api-contracts
    """
    todo = todo_service.get_todo_by_id(session, todo_id, user_id)
    if not todo:
        raise HTTPException(status_code=404, detail=f"Todo with id '{todo_id}' not found")
    return todo


@router.put("/{todo_id}", response_model=TodoPublic)
async def update_todo(
    todo_id: str,
    todo_update: TodoUpdate,
    session: Session = Depends(get_db),
    user_id: str = "default_user"  # Placeholder until authentication is implemented
) -> TodoPublic:
    """
    Update an existing todo
    Task: P2-T-027
    From: specs/phase-ii/contracts/api-contracts
    """
    todo = todo_service.update_todo(session, todo_id, todo_update, user_id)
    if not todo:
        raise HTTPException(status_code=404, detail=f"Todo with id '{todo_id}' not found")
    return todo


@router.delete("/{todo_id}", status_code=204)
async def delete_todo(
    todo_id: str,
    session: Session = Depends(get_db),
    user_id: str = "default_user"  # Placeholder until authentication is implemented
):
    """
    Delete a todo by ID
    Task: P2-T-028
    From: specs/phase-ii/contracts/api-contracts
    """
    success = todo_service.delete_todo(session, todo_id, user_id)
    if not success:
        raise HTTPException(status_code=404, detail=f"Todo with id '{todo_id}' not found")
    return


# Export the router
__all__ = ["router"]