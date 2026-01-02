---
description: "Task list for Todo In-Memory Console App implementation"
---

# Tasks: Todo In-Memory Console App

**Input**: Design documents from `/specs/1-todo-console-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `main.py`, `models/`, `services/`, `tests/` at repository root
- Paths shown below follow the structure defined in plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per implementation plan (main.py, models/, services/, tests/)
- [x] T002 [P] Initialize Python project with basic configuration
- [x] T003 [P] Create directory structure (models/, services/, tests/unit/, tests/integration/)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [x] T004 Create Task model in models/task.py with id, title, description, completed fields
- [x] T005 Create TaskList model in models/task_list.py with in-memory storage and operations
- [x] T006 [P] Create TaskService in services/task_service.py with business logic
- [x] T007 [P] Create CLIService in services/cli_service.py for command handling
- [x] T008 Create basic CLI loop in main.py with input parsing
- [x] T009 Set up error handling framework for invalid inputs

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add and View Tasks (Priority: P1) 🎯 MVP

**Goal**: Users can add new tasks to their todo list and view them from the command line interface

**Independent Test**: The user can start the application, add a new task with a title and description, and then view the list of tasks

### Implementation for User Story 1

- [x] T010 [P] [US1] Implement add task functionality in TaskList model (models/task_list.py)
- [x] T011 [US1] Implement add command in CLIService (services/cli_service.py)
- [x] T012 [US1] Connect add command to main.py CLI loop
- [x] T013 [P] [US1] Implement view tasks functionality in TaskList model (models/task_list.py)
- [x] T014 [US1] Implement view command in CLIService (services/cli_service.py)
- [x] T015 [US1] Connect view command to main.py CLI loop
- [x] T016 [US1] Add unique ID generation for tasks (models/task_list.py)
- [x] T017 [US1] Add input validation for add command (services/cli_service.py)
- [x] T018 [US1] Add clear CLI prompts for user interactions (main.py)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Update and Complete Tasks (Priority: P2)

**Goal**: Users can modify existing tasks and mark them as complete when finished

**Independent Test**: The user can select an existing task and update its details or mark it as complete/incomplete, changing its status in the system

### Implementation for User Story 2

- [x] T019 [P] [US2] Implement update task functionality in TaskList model (models/task_list.py)
- [x] T020 [US2] Implement update command in CLIService (services/cli_service.py)
- [x] T021 [US2] Connect update command to main.py CLI loop
- [x] T022 [P] [US2] Implement mark complete functionality in TaskList model (models/task_list.py)
- [x] T023 [US2] Implement complete command in CLIService (services/cli_service.py)
- [x] T024 [US2] Connect complete command to main.py CLI loop
- [x] T025 [US2] Implement mark incomplete functionality in TaskList model (models/task_list.py)
- [x] T026 [US2] Implement incomplete command in CLIService (services/cli_service.py)
- [x] T027 [US2] Connect incomplete command to main.py CLI loop

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Delete Tasks (Priority: P3)

**Goal**: Users can remove tasks from their todo list when they are no longer needed

**Independent Test**: The user can select a task and remove it from the system, ensuring it no longer appears in the task list

### Implementation for User Story 3

- [x] T028 [US3] Implement delete task functionality in TaskList model (models/task_list.py)
- [x] T029 [US3] Implement delete command in CLIService (services/cli_service.py)
- [x] T030 [US3] Connect delete command to main.py CLI loop
- [x] T031 [US3] Add error handling for non-existent task IDs (services/cli_service.py)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Input Validation & Error Handling (Priority: P2)

**Goal**: System handles invalid inputs gracefully with user-friendly error messages

**Independent Test**: Invalid commands, missing task IDs, and empty inputs are handled gracefully without crashes

### Implementation for Input Validation

- [x] T032 [P] [US1] [US2] [US3] Add validation for empty titles in Task model (models/task.py)
- [x] T033 [P] Add validation for invalid command formats (services/cli_service.py)
- [x] T034 Add validation for non-existent task IDs (models/task_list.py)
- [x] T035 Add friendly error messages for all error conditions (services/cli_service.py)
- [x] T036 Add graceful handling for invalid commands (main.py)
- [x] T037 Add error handling for empty task list (services/cli_service.py)

---

## Phase 7: Application Exit & Help Commands (Priority: P1)

**Goal**: Complete CLI experience with exit and help functionality

**Independent Test**: Users can exit the application and get help information

### Implementation for Exit & Help

- [x] T038 [P] Implement help command in CLIService (services/cli_service.py)
- [x] T039 Connect help command to main.py CLI loop
- [x] T040 Implement exit command in main.py CLI loop
- [x] T041 Add proper exit flow with cleanup if needed (main.py)

**Checkpoint**: Complete application functionality available

---

## Phase N+1: Constitution Compliance Validation

**Purpose**: Final validation that all constitution requirements are met

- [x] T042 Verify all code was generated via Claude Code only (no manual coding)
- [x] T043 Validate in-memory data storage only (no files, databases, or external services used)
- [x] T044 Confirm Python 3.13+ compatibility
- [x] T045 Verify single-process console application architecture
- [x] T046 Confirm Spec-Kit Plus lifecycle was followed correctly
- [x] T047 Validate all features trace back to specifications

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in priority order (P1 → P2 → P3)
- **Input Validation (Phase 6)**: Can run in parallel with User Story 2 and 3 implementation
- **Exit & Help (Phase 7)**: Can run in parallel with other phases
- **Constitution Compliance (Final Phase)**: Depends on all desired features being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Models before services
- Services before CLI integration
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start (if staffed)
- All models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. Complete Phase 7: Exit & Help Commands
5. **STOP and VALIDATE**: Test User Story 1 independently
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add Input Validation → Test → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: Input Validation
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence