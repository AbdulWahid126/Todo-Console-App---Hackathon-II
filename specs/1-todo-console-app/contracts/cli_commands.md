# CLI Command Contracts: Todo In-Memory Console App

**Date**: 2026-01-02
**Feature**: Todo In-Memory Console App
**Branch**: 1-todo-console-app

## Command: ADD
**Purpose**: Add a new task to the todo list
**Input**: `add "title" ["description"]`
**Output**: Task created with unique ID and status
**Success Response**: "Task added successfully with ID: [id]"
**Error Responses**:
- "Error: Title cannot be empty"
- "Error: Invalid command format"

## Command: VIEW
**Purpose**: Display all tasks in the todo list
**Input**: `view`
**Output**: List of all tasks with ID, title, description, and completion status
**Success Response**: Formatted list of tasks
**Error Responses**: "No tasks found"

## Command: UPDATE
**Purpose**: Update an existing task
**Input**: `update [id] "new_title" ["new_description"]`
**Output**: Updated task information
**Success Response**: "Task [id] updated successfully"
**Error Responses**:
- "Error: Task with ID [id] not found"
- "Error: Invalid command format"

## Command: COMPLETE
**Purpose**: Mark a task as complete
**Input**: `complete [id]`
**Output**: Task marked as complete
**Success Response**: "Task [id] marked as complete"
**Error Responses**:
- "Error: Task with ID [id] not found"

## Command: INCOMPLETE
**Purpose**: Mark a task as incomplete
**Input**: `incomplete [id]`
**Output**: Task marked as incomplete
**Success Response**: "Task [id] marked as incomplete"
**Error Responses**:
- "Error: Task with ID [id] not found"

## Command: DELETE
**Purpose**: Remove a task from the todo list
**Input**: `delete [id]`
**Output**: Task removed from system
**Success Response**: "Task [id] deleted successfully"
**Error Responses**:
- "Error: Task with ID [id] not found"

## Command: HELP
**Purpose**: Display available commands
**Input**: `help`
**Output**: List of available commands with descriptions
**Success Response**: Formatted help text

## Command: EXIT
**Purpose**: Exit the application
**Input**: `exit`
**Output**: Application terminates
**Success Response**: None (application exits)