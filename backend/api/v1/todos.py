"""
API router for todo endpoints in the Todo Application with enhanced dashboard functionality
Task: P2-T-013
From: specs/phase-ii/contracts/api-contracts
Implements RESTful API endpoints as required by constitution V. RESTful API Standards
"""

from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from sqlmodel import Session, select
from datetime import datetime, date
from sqlalchemy import func
from dependencies import get_db
from models.todo import Todo, TodoCreate, TodoUpdate, TodoPublic
from models.user import User
from services.todo_service import todo_service
from utils.security import get_current_user
from models.dashboard import DashboardStats

# Create API router with prefix and tags
router = APIRouter(
    prefix="/todos",
    tags=["todos"],
    responses={404: {"description": "Todo not found"}}
)


@router.get("/", response_model=List[TodoPublic])
async def list_todos(
    status: Optional[str] = None,
    priority: Optional[str] = None,
    category: Optional[str] = None,
    due_date_from: Optional[str] = None,
    due_date_to: Optional[str] = None,
    search: Optional[str] = None,
    session: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> List[TodoPublic]:
    """
    Retrieve todos for the authenticated user with optional filters
    Task: P2-T-017
    From: specs/phase-ii/contracts/api-contracts
    """
    try:
        # Build query based on filters
        query = select(Todo).where(Todo.user_id == current_user.id)

        if status:
            if status.lower() == 'completed':
                query = query.where(Todo.completed == True)
            elif status.lower() == 'pending':
                query = query.where(Todo.completed == False)
            elif status.lower() == 'in-progress':
                query = query.where(Todo.completed == False)

        if priority:
            query = query.where(Todo.priority == priority.lower())

        if category:
            query = query.where(Todo.category.ilike(f"%{category}%"))

        if due_date_from:
            try:
                from_date = datetime.fromisoformat(due_date_from.replace('Z', '+00:00'))
                query = query.where(Todo.due_date >= from_date)
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid due_date_from format")

        if due_date_to:
            try:
                to_date = datetime.fromisoformat(due_date_to.replace('Z', '+00:00'))
                query = query.where(Todo.due_date <= to_date)
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid due_date_to format")

        if search:
            query = query.where(
                (Todo.title.ilike(f"%{search}%")) |
                (Todo.description.ilike(f"%{search}%"))
            )

        query = query.order_by(Todo.created_at.desc())
        todos = session.exec(query).all()

        # Convert to TodoPublic format
        result = [
            TodoPublic(
                id=todo.id,
                title=todo.title,
                description=todo.description,
                completed=todo.completed,
                due_date=todo.due_date,
                priority=todo.priority,
                category=todo.category,
                created_at=todo.created_at,
                updated_at=todo.updated_at
            ) for todo in todos
        ]
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/", response_model=TodoPublic, status_code=201)
async def create_todo(
    todo_create: TodoCreate,
    session: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
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

        return todo_service.create_todo(session, todo_create, current_user.id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")


# Additional endpoints for dashboard views

@router.get("/today", response_model=List[TodoPublic])
async def get_todays_todos(
    session: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> List[TodoPublic]:
    """
    Retrieve all todos due today for the authenticated user
    Task: P2-T-XXX
    From: dashboard functionality requirements
    """
    try:
        from datetime import date
        today = date.today()

        query = select(Todo).where(
            (Todo.user_id == current_user.id) &
            (Todo.due_date != None) &
            (func.date(Todo.due_date) == today)
        ).order_by(Todo.created_at.desc())

        todos = session.exec(query).all()

        result = [
            TodoPublic(
                id=todo.id,
                title=todo.title,
                description=todo.description,
                completed=todo.completed,
                due_date=todo.due_date,
                priority=todo.priority,
                category=todo.category,
                created_at=todo.created_at,
                updated_at=todo.updated_at
            ) for todo in todos
        ]
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/upcoming", response_model=List[TodoPublic])
async def get_upcoming_todos(
    session: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> List[TodoPublic]:
    """
    Retrieve all upcoming todos (due after today) for the authenticated user
    Task: P2-T-XXX
    From: dashboard functionality requirements
    """
    try:
        from datetime import date
        today = date.today()

        query = select(Todo).where(
            (Todo.user_id == current_user.id) &
            (Todo.due_date != None) &
            (func.date(Todo.due_date) > today)
        ).order_by(Todo.due_date.asc())

        todos = session.exec(query).all()

        result = [
            TodoPublic(
                id=todo.id,
                title=todo.title,
                description=todo.description,
                completed=todo.completed,
                due_date=todo.due_date,
                priority=todo.priority,
                category=todo.category,
                created_at=todo.created_at,
                updated_at=todo.updated_at
            ) for todo in todos
        ]
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/completed", response_model=List[TodoPublic])
async def get_completed_todos(
    session: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> List[TodoPublic]:
    """
    Retrieve all completed todos for the authenticated user
    Task: P2-T-XXX
    From: dashboard functionality requirements
    """
    try:
        query = select(Todo).where(
            (Todo.user_id == current_user.id) &
            (Todo.completed == True)
        ).order_by(Todo.updated_at.desc())

        todos = session.exec(query).all()

        result = [
            TodoPublic(
                id=todo.id,
                title=todo.title,
                description=todo.description,
                completed=todo.completed,
                due_date=todo.due_date,
                priority=todo.priority,
                category=todo.category,
                created_at=todo.created_at,
                updated_at=todo.updated_at
            ) for todo in todos
        ]
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/by-category", response_model=dict)
async def get_todos_by_category(
    session: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> dict:
    """
    Retrieve todos grouped by category for the authenticated user
    Task: P2-T-XXX
    From: dashboard functionality requirements
    """
    try:
        query = select(Todo).where(Todo.user_id == current_user.id).order_by(Todo.category, Todo.created_at.desc())
        todos = session.exec(query).all()

        categories = {}
        for todo in todos:
            category = todo.category
            if category not in categories:
                categories[category] = []

            categories[category].append(
                TodoPublic(
                    id=todo.id,
                    title=todo.title,
                    description=todo.description,
                    completed=todo.completed,
                    due_date=todo.due_date,
                    priority=todo.priority,
                    category=todo.category,
                    created_at=todo.created_at,
                    updated_at=todo.updated_at
                )
            )

        return categories
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")


# Additional endpoints for dashboard summary (aligning with requirements)
@router.get("/summary", response_model=DashboardStats)
def get_task_summary(
    session: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get task summary statistics for the dashboard
    Task: P2-T-XXX
    From: dashboard functionality requirements
    """
    # Get only tasks for the current user
    statement = select(Todo).where(Todo.user_id == current_user.id)
    all_tasks = session.exec(statement).all()

    total_tasks = len(all_tasks)
    completed = len([t for t in all_tasks if t.completed])

    # Calculate in-progress tasks (created but not completed)
    in_progress = len([t for t in all_tasks if not t.completed])

    # Calculate overdue tasks (due date passed and not completed)
    now = datetime.utcnow()
    overdue = len([
        t for t in all_tasks
        if t.due_date and not t.completed and t.due_date < now
    ])

    completion_rate = (completed / total_tasks * 100) if total_tasks > 0 else 0

    # Get today's tasks
    today_tasks = len([
        t for t in all_tasks
        if t.created_at.date() == datetime.today().date()
    ])

    return DashboardStats(
        total_tasks=total_tasks,
        completed=completed,
        in_progress=in_progress,
        overdue=overdue,
        completion_rate=completion_rate,
        today_tasks=today_tasks
    )


@router.get("/{todo_id}", response_model=TodoPublic)
async def get_todo(
    todo_id: str,
    session: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> TodoPublic:
    """
    Retrieve a specific todo by ID
    Task: P2-T-029
    From: specs/phase-ii/contracts/api-contracts
    """
    todo = todo_service.get_todo_by_id(session, todo_id, current_user.id)
    if not todo:
        raise HTTPException(status_code=404, detail=f"Todo with id '{todo_id}' not found")
    return todo


@router.put("/{todo_id}", response_model=TodoPublic)
async def update_todo(
    todo_id: str,
    todo_update: TodoUpdate,
    session: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> TodoPublic:
    """
    Update an existing todo
    Task: P2-T-027
    From: specs/phase-ii/contracts/api-contracts
    """
    todo = todo_service.update_todo(session, todo_id, todo_update, current_user.id)
    if not todo:
        raise HTTPException(status_code=404, detail=f"Todo with id '{todo_id}' not found")
    return todo


@router.delete("/{todo_id}", status_code=204)
async def delete_todo(
    todo_id: str,
    session: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a todo by ID
    Task: P2-T-028
    From: specs/phase-ii/contracts/api-contracts
    """
    success = todo_service.delete_todo(session, todo_id, current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail=f"Todo with id '{todo_id}' not found")
    return


# Export the router
__all__ = ["router"]