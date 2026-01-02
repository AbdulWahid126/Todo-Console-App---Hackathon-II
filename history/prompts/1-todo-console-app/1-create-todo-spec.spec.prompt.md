---
id: 1
title: Create Todo Spec
stage: spec
date: 2026-01-02
surface: agent
model: claude-sonnet-4-5-20250929
feature: todo-console-app
branch: 1-todo-console-app
user: user
command: sp.specify
labels: [spec, todo-app, console-app]
links:
  spec: specs/1-todo-console-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/1-todo-console-app/spec.md
  - specs/1-todo-console-app/checklists/requirements.md
tests:
  - none
---

## Prompt

```text
Read `speckit.constitution` first.

Create `speckit.specify` for **Phase I: Todo In-Memory Console App**.

Include:

1. User Goals
   - Manage todo tasks from command line
   - Simple, fast, predictable behavior

2. Core Features (MUST include all)
   - Add Task (title, description)
   - View Tasks (list with status)
   - Update Task
   - Delete Task
   - Mark Task Complete / Incomplete

3. User Journeys
   - Starting the app
   - Adding a task
   - Viewing task list
   - Updating an existing task
   - Completing a task
   - Deleting a task

4. Acceptance Criteria (VERY IMPORTANT)
   - Clear CLI prompts
   - Unique task IDs
   - Tasks stored only in memory
   - No crashes on invalid input
   - Friendly error messages

5. Out of Scope (Explicitly mention)
   - No database
   - No web UI
   - No AI chatbot
   - No authentication

Do NOT include architecture or code.
This file defines WHAT the system must do — not HOW.
```

## Response snapshot

Created the feature specification for the Todo In-Memory Console App with all required sections: User Scenarios & Testing, Functional Requirements, Key Entities, and Success Criteria. The specification includes three user stories with priorities (P1-P3), covering the core functionality of adding, viewing, updating, completing, and deleting tasks. All constitution compliance requirements are included in the success criteria.

## Outcome

- ✅ Impact: Created complete feature specification with all required sections
- 🧪 Tests: none
- 📁 Files: Created specs/1-todo-console-app/spec.md and specs/1-todo-console-app/checklists/requirements.md
- 🔁 Next prompts: Proceed with plan creation using /sp.plan
- 🧠 Reflection: Specification follows constitution requirements and defines clear user value

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Create implementation plan