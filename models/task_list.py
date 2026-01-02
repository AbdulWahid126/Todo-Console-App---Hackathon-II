"""
TaskList model for the Todo Console App
Task ID: T005
Implements the TaskList entity with in-memory storage and operations.
"""
from typing import List, Optional
from .task import Task


class TaskList:
    """
    Collection of Task entities stored in-memory.

    Fields:
    - tasks: List/Array of Task entities
    - next_id: Integer - Auto-incrementing counter for generating unique IDs

    Operations:
    - Add task to list
    - Remove task from list
    - Update task in list
    - Retrieve all tasks
    - Retrieve task by ID
    - Mark task as complete/incomplete
    """
    def __init__(self):
        self.tasks: List[Task] = []
        self._next_id = 1

    def _generate_id(self) -> str:
        """Generate a unique ID for a new task."""
        task_id = str(self._next_id)
        self._next_id += 1
        return task_id

    def add_task(self, title: str, description: Optional[str] = None) -> Task:
        """
        Add a new task to the list.
        Task ID: T010 [US1]
        """
        task_id = self._generate_id()
        task = Task(id=task_id, title=title, description=description, completed=False)
        self.tasks.append(task)
        return task

    def get_all_tasks(self) -> List[Task]:
        """
        Retrieve all tasks from the list.
        Task ID: T013 [US1]
        """
        return self.tasks.copy()

    def get_task_by_id(self, task_id: str) -> Optional[Task]:
        """
        Retrieve a task by its ID.
        Task ID: T034 (validation for non-existent task IDs)
        """
        for task in self.tasks:
            if task.id == task_id:
                return task
        return None

    def update_task(self, task_id: str, title: Optional[str] = None, description: Optional[str] = None) -> bool:
        """
        Update a task in the list.
        Task ID: T019 [US2]
        """
        task = self.get_task_by_id(task_id)
        if task:
            task.update(title, description)
            return True
        return False

    def delete_task(self, task_id: str) -> bool:
        """
        Remove a task from the list.
        Task ID: T028 [US3]
        """
        task = self.get_task_by_id(task_id)
        if task:
            self.tasks.remove(task)
            return True
        return False

    def mark_task_complete(self, task_id: str) -> bool:
        """
        Mark a task as complete.
        Task ID: T022 [US2]
        """
        task = self.get_task_by_id(task_id)
        if task:
            task.mark_complete()
            return True
        return False

    def mark_task_incomplete(self, task_id: str) -> bool:
        """
        Mark a task as incomplete.
        Task ID: T025 [US2]
        """
        task = self.get_task_by_id(task_id)
        if task:
            task.mark_incomplete()
            return True
        return False

    def get_next_id(self) -> int:
        """
        Get the next ID that will be assigned.
        Task ID: T016 [US1] (unique ID generation)
        """
        return self._next_id