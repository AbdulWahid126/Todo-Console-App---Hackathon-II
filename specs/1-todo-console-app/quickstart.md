# Quickstart Guide: Todo In-Memory Console App

**Date**: 2026-01-02
**Feature**: Todo In-Memory Console App
**Branch**: 1-todo-console-app

## Getting Started

1. Ensure Python 3.13+ is installed on your system
2. Run the application: `python main.py`
3. The console application will start and display a prompt

## Basic Commands

### Adding a Task
```
add "Buy groceries" "Milk, bread, eggs"
```

### Viewing Tasks
```
view
```

### Updating a Task
```
update 1 "Buy groceries and cook dinner" "Milk, bread, eggs, chicken"
```

### Marking Task Complete
```
complete 1
```

### Marking Task Incomplete
```
incomplete 1
```

### Deleting a Task
```
delete 1
```

### Getting Help
```
help
```

### Exiting the Application
```
exit
```

## Example Workflow

1. Start the application: `python main.py`
2. Add a task: `add "Finish report" "Complete the quarterly report by Friday"`
3. View tasks: `view`
4. Mark complete: `complete 1`
5. Exit: `exit`

## Error Handling

The application handles errors gracefully:
- Invalid commands show helpful error messages
- Non-existent task IDs return appropriate error messages
- Empty titles are rejected with clear feedback
- Invalid command formats are caught and reported