# Data Model: Todo In-Memory Console App

**Date**: 2026-01-02
**Feature**: Todo In-Memory Console App
**Branch**: 1-todo-console-app

## Task Entity

**Definition**: Represents a single todo item in the system

**Fields**:
- `id`: String/Integer - Unique identifier for the task (auto-generated)
- `title`: String - Title/description of the task (required)
- `description`: String - Detailed description of the task (optional)
- `completed`: Boolean - Completion status of the task (default: false)

**Validation Rules**:
- `id` must be unique within the system
- `title` must not be empty
- `completed` must be boolean type

**State Transitions**:
- `incomplete` → `complete` (when user marks task as complete)
- `complete` → `incomplete` (when user marks task as incomplete)

## TaskList Entity

**Definition**: Collection of Task entities stored in-memory

**Fields**:
- `tasks`: List/Array of Task entities
- `next_id`: Integer - Auto-incrementing counter for generating unique IDs

**Validation Rules**:
- All tasks must have unique IDs
- No duplicate tasks allowed
- Task IDs should be sequential for better user experience

**Operations**:
- Add task to list
- Remove task from list
- Update task in list
- Retrieve all tasks
- Retrieve task by ID
- Mark task as complete/incomplete