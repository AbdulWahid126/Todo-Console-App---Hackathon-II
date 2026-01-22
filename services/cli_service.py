"""
CLI Service for the Todo Console App
Task ID: T007
Handles command processing and user interaction.
"""
from typing import Optional, List
from models.task import Task
from services.task_service import TaskService


class CLIService:
    """
    Command-line interface service that handles user commands and interactions.
    """
    def __init__(self):
        self.task_service = TaskService()

    def _format_task(self, task: Task) -> str:
        """Format a task for display."""
        status = "X" if task.completed else "O"
        description = f" - {task.description}" if task.description else ""
        return f"[{status}] {task.id}: {task.title}{description}"

    def _parse_add_command(self, command_parts: List[str]) -> tuple:
        """Parse the add command arguments."""
        if len(command_parts) < 2:
            raise ValueError("Invalid command format: add requires at least a title")

        title = command_parts[1]
        description = " ".join(command_parts[2:]) if len(command_parts) > 2 else None
        return title, description

    def _parse_update_command(self, command_parts: List[str]) -> tuple:
        """Parse the update command arguments."""
        if len(command_parts) < 3:
            raise ValueError("Invalid command format: update requires ID, title, and optional description")

        task_id = command_parts[1]
        title = command_parts[2]
        description = " ".join(command_parts[3:]) if len(command_parts) > 3 else None
        return task_id, title, description

    def _parse_single_arg_command(self, command_parts: List[str]) -> str:
        """Parse commands that require a single argument (like ID)."""
        if len(command_parts) < 2:
            raise ValueError("Invalid command format: command requires an ID")
        return command_parts[1]

    def handle_add(self, command_parts: List[str]) -> str:
        """
        Handle the add command.
        Task ID: T011 [US1]
        Task ID: T017 [US1] (input validation)
        Task ID: T032 [US1] [US2] [US3] (validation for empty titles)
        """
        try:
            title, description = self._parse_add_command(command_parts)
            task = self.task_service.add_task(title, description)
            return f"Task added successfully with ID: {task.id}"
        except ValueError as e:
            return f"Error: {str(e)}"

    def handle_view(self, command_parts: List[str]) -> str:
        """
        Handle the view command.
        Task ID: T014 [US1]
        """
        tasks = self.task_service.get_all_tasks()
        if not tasks:
            return "No tasks found"

        task_list = [self._format_task(task) for task in tasks]
        return "\n".join(task_list)

    def handle_update(self, command_parts: List[str]) -> str:
        """
        Handle the update command.
        Task ID: T020 [US2]
        """
        try:
            task_id, title, description = self._parse_update_command(command_parts)
            success = self.task_service.update_task(task_id, title, description)
            if success:
                return f"Task {task_id} updated successfully"
            else:
                return f"Error: Task with ID {task_id} not found"
        except ValueError as e:
            return f"Error: {str(e)}"

    def handle_complete(self, command_parts: List[str]) -> str:
        """
        Handle the complete command.
        Task ID: T023 [US2]
        """
        try:
            task_id = self._parse_single_arg_command(command_parts)
            success = self.task_service.mark_task_complete(task_id)
            if success:
                return f"Task {task_id} marked as complete"
            else:
                return f"Error: Task with ID {task_id} not found"
        except ValueError as e:
            return f"Error: {str(e)}"

    def handle_incomplete(self, command_parts: List[str]) -> str:
        """
        Handle the incomplete command.
        Task ID: T026 [US2]
        """
        try:
            task_id = self._parse_single_arg_command(command_parts)
            success = self.task_service.mark_task_incomplete(task_id)
            if success:
                return f"Task {task_id} marked as incomplete"
            else:
                return f"Error: Task with ID {task_id} not found"
        except ValueError as e:
            return f"Error: {str(e)}"

    def handle_delete(self, command_parts: List[str]) -> str:
        """
        Handle the delete command.
        Task ID: T029 [US3]
        Task ID: T031 [US3] (error handling for non-existent task IDs)
        """
        try:
            task_id = self._parse_single_arg_command(command_parts)
            success = self.task_service.delete_task(task_id)
            if success:
                return f"Task {task_id} deleted successfully"
            else:
                return f"Error: Task with ID {task_id} not found"
        except ValueError as e:
            return f"Error: {str(e)}"

    def handle_help(self, command_parts: List[str]) -> str:
        """
        Handle the help command.
        Task ID: T038
        """
        help_text = """
Available commands:
  - add "title" ["description"] - Add a new task
  - view - View all tasks
  - update [id] "new_title" ["new_description"] - Update a task
  - complete [id] - Mark a task as complete
  - incomplete [id] - Mark a task as incomplete
  - delete [id] - Delete a task
  - help - Show this help message
  - exit - Exit the application
        """.strip()
        return help_text

    def handle_command(self, command: str) -> str:
        """
        Handle a command string and return the result.
        Task ID: T033 (validation for invalid command formats)
        Task ID: T035 (friendly error messages)
        """
        if not command.strip():
            return "Error: Empty command"

        command_parts = command.strip().split()
        command_name = command_parts[0].lower()

        if command_name == "add":
            return self.handle_add(command_parts)
        elif command_name == "view":
            return self.handle_view(command_parts)
        elif command_name == "update":
            return self.handle_update(command_parts)
        elif command_name == "complete":
            return self.handle_complete(command_parts)
        elif command_name == "incomplete":
            return self.handle_incomplete(command_parts)
        elif command_name == "delete":
            return self.handle_delete(command_parts)
        elif command_name == "help":
            return self.handle_help(command_parts)
        else:
            # Handle unknown commands
            return f"Error: Unknown command '{command_name}'. Type 'help' for available commands."