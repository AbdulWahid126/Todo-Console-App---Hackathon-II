"""
Task model for the Todo Console App
Task ID: T004
Implements the Task entity as defined in the data model.
"""
from dataclasses import dataclass
from typing import Optional


@dataclass
class Task:
    """
    Represents a single todo item in the system.

    Fields:
    - id: String/Integer - Unique identifier for the task (auto-generated)
    - title: String - Title/description of the task (required)
    - description: String - Detailed description of the task (optional)
    - completed: Boolean - Completion status of the task (default: false)
    """
    id: str
    title: str
    description: Optional[str] = None
    completed: bool = False

    def __post_init__(self):
        """Validate the task after initialization."""
        if not self.title or not self.title.strip():
            raise ValueError("Task title cannot be empty")

        if not isinstance(self.completed, bool):
            raise ValueError("Task completed status must be a boolean")

    def mark_complete(self):
        """Mark the task as complete."""
        self.completed = True

    def mark_incomplete(self):
        """Mark the task as incomplete."""
        self.completed = False

    def update(self, title: Optional[str] = None, description: Optional[str] = None):
        """Update the task with new information."""
        if title is not None:
            if not title.strip():
                raise ValueError("Task title cannot be empty")
            self.title = title

        if description is not None:
            self.description = description