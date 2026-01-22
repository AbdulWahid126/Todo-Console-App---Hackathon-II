"""
Todo service layer with business logic for the Todo Application
Task: P2-T-011
From: specs/phase-ii/data-model
Implements business logic layer as required by constitution III. Clean Architecture & Stateless Services
"""

from sqlmodel import Session, select
from typing import List, Optional
from ..models.todo import Todo, TodoCreate, TodoUpdate, TodoPublic
from datetime import datetime
import uuid


class TodoService:
    """
    Service class containing business logic for todo operations
    Task: P2-T-011
    From: specs/phase-ii/data-model
    """

    def create_todo(self, session: Session, todo_create: TodoCreate, user_id: str) -> TodoPublic:
        """
        Create a new todo with the specified data
        Task: P2-T-011, P2-T-018
        From: specs/phase-ii/data-model, specs/phase-ii/contracts/api-contracts
        """
        # Create new todo instance
        todo = Todo(
            title=todo_create.title,
            description=todo_create.description,
            completed=todo_create.completed,
            user_id=user_id,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

        # Add to session and commit
        session.add(todo)
        session.commit()
        session.refresh(todo)

        # Return public representation
        return TodoPublic(
            id=todo.id,
            title=todo.title,
            description=todo.description,
            completed=todo.completed,
            created_at=todo.created_at,
            updated_at=todo.updated_at
        )

    def get_todo_by_id(self, session: Session, todo_id: str, user_id: str) -> Optional[TodoPublic]:
        """
        Retrieve a specific todo by ID for the specified user
        Task: P2-T-011, P2-T-029
        From: specs/phase-ii/data-model, specs/phase-ii/contracts/api-contracts
        """
        statement = select(Todo).where(Todo.id == todo_id).where(Todo.user_id == user_id)
        todo = session.exec(statement).first()

        if todo:
            return TodoPublic(
                id=todo.id,
                title=todo.title,
                description=todo.description,
                completed=todo.completed,
                created_at=todo.created_at,
                updated_at=todo.updated_at
            )
        return None

    def get_all_todos(self, session: Session, user_id: str) -> List[TodoPublic]:
        """
        Retrieve all todos for the specified user
        Task: P2-T-011, P2-T-017
        From: specs/phase-ii/data-model, specs/phase-ii/contracts/api-contracts
        """
        statement = select(Todo).where(Todo.user_id == user_id).order_by(Todo.created_at.desc())
        todos = session.exec(statement).all()

        return [
            TodoPublic(
                id=todo.id,
                title=todo.title,
                description=todo.description,
                completed=todo.completed,
                created_at=todo.created_at,
                updated_at=todo.updated_at
            ) for todo in todos
        ]

    def update_todo(self, session: Session, todo_id: str, todo_update: TodoUpdate, user_id: str) -> Optional[TodoPublic]:
        """
        Update an existing todo with the specified data
        Task: P2-T-011, P2-T-027
        From: specs/phase-ii/data-model, specs/phase-ii/contracts/api-contracts
        """
        statement = select(Todo).where(Todo.id == todo_id).where(Todo.user_id == user_id)
        todo = session.exec(statement).first()

        if not todo:
            return None

        # Update fields that are provided
        if todo_update.title is not None:
            if not todo_update.title.strip():
                raise ValueError("Title cannot be empty or whitespace only")
            todo.title = todo_update.title.strip()
        if todo_update.description is not None:
            todo.description = todo_update.description
        if todo_update.completed is not None:
            todo.completed = todo_update.completed

        # Update the timestamp
        todo.updated_at = datetime.utcnow()

        session.add(todo)
        session.commit()
        session.refresh(todo)

        return TodoPublic(
            id=todo.id,
            title=todo.title,
            description=todo.description,
            completed=todo.completed,
            created_at=todo.created_at,
            updated_at=todo.updated_at
        )

    def delete_todo(self, session: Session, todo_id: str, user_id: str) -> bool:
        """
        Delete a todo by ID for the specified user
        Task: P2-T-011, P2-T-028
        From: specs/phase-ii/data-model, specs/phase-ii/contracts/api-contracts
        """
        statement = select(Todo).where(Todo.id == todo_id).where(Todo.user_id == user_id)
        todo = session.exec(statement).first()

        if not todo:
            return False

        session.delete(todo)
        session.commit()
        return True


# Singleton instance of the service
todo_service = TodoService()