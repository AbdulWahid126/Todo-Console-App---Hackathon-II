---
id: 1
title: Create Todo App Constitution
stage: constitution
date: 2026-01-02
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: user
command: sp.constitution
labels: [constitution, todo-app, python]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---

## Prompt

```text
You are an expert system architect following Spec-Driven Development.

Create `speckit.constitution` for **Phase I: Todo In-Memory Python Console App**
for the Hackathon II (Panaversity).

Context:
- This is Phase I only (Console App, In-Memory, Python)
- Code must be generated via Claude Code only
- Spec-Kit Plus lifecycle is mandatory

Define NON-NEGOTIABLE principles including:

1. Development Rules
   - No manual coding by humans
   - No code generation without approved Tasks
   - All logic must trace back to specs

2. Architecture Constraints
   - Python 3.13+
   - In-memory data storage only
   - No database, no files, no external services
   - Single-process console application

3. Code Quality Principles
   - Clean architecture
   - Separation of concerns
   - Testability
   - Readable CLI output

4. Spec-Driven Enforcement
   - Constitution > Specify > Plan > Tasks hierarchy
   - Agents must stop if any spec is missing

5. Agent Behavior Rules
   - No assumptions
   - No feature creep
   - No skipping lifecycle steps

Write this as a clear, strict, professional Constitution document.
```

## Response snapshot

Updated the constitution file with all required principles for the Todo In-Memory Python Console App, including Development Rules, Architecture Constraints, Code Quality Principles, Spec-Driven Enforcement, Agent Behavior Rules, and Python Console Application Focus. The constitution enforces the Spec-Kit Plus lifecycle and specifies all non-negotiable principles for the project.

## Outcome

- ✅ Impact: Created project constitution document with all required principles
- 🧪 Tests: none
- 📁 Files: Updated .specify/memory/constitution.md
- 🔁 Next prompts: Proceed with spec creation using /sp.specify
- 🧠 Reflection: Constitution properly enforces Spec-Driven Development methodology

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Create feature specification