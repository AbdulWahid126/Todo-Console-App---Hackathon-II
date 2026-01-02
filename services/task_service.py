"""
Task Service for the Todo Console App
Task ID: T006
Implements the business logic for task operations.
"""
from typing import List, Optional
from models.task import Task
from models.task_list import TaskList


class TaskService:
    """
    Business logic layer for task operations.
    Provides methods to interact with the TaskList model.
    """
    def __init__(self):
        self.task_list = TaskList()

    def add_task(self, title: str, description: Optional[str] = None) -> Task:
        """
        Add a new task with validation.
        Task ID: T010 [US1]
        """
        # Validate inputs
        if not title or not title.strip():
            raise ValueError("Task title cannot be empty")

        return self.task_list.add_task(title, description)

    def get_all_tasks(self) -> List[Task]:
        """
        Get all tasks.
        Task ID: T013 [US1]
        """
        return self.task_list.get_all_tasks()

    def get_task_by_id(self, task_id: str) -> Optional[Task]:
        """
        Get a task by its ID.
        Task ID: T034 (validation for non-existent task IDs)
        """
        return self.task_list.get_task_by_id(task_id)

    def update_task(self, task_id: str, title: Optional[str] = None, description: Optional[str] = None) -> bool:
        """
        Update a task with validation.
        Task ID: T019 [US2]
        """
        # Validate inputs if provided
        if title is not None and (not title or not title.strip()):
            raise ValueError("Task title cannot be empty")

        return self.task_list.update_task(task_id, title, description)

    def delete_task(self, task_id: str) -> bool:
        """
        Delete a task.
        Task ID: T028 [US3]
        """
        return self.task_list.delete_task(task_id)

    def mark_task_complete(self, task_id: str) -> bool:
        """
        Mark a task as complete.
        Task ID: T022 [US2]
        """
        return self.task_list.mark_task_complete(task_id)

    def mark_task_incomplete(self, task_id: str) -> bool:
        """
        Mark a task as incomplete.
        Task ID: T025 [US2]
        """
        return self.task_list.mark_task_incomplete(task_id)