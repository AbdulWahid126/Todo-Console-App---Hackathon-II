---
id: 4
title: Analyze Phase II
stage: spec
date: 2026-01-18
surface: agent
model: claude-sonnet-4-5-20250929
feature: phase-ii
branch: phase-ii-fullstack-web-app
user: user
command: sp.analyze
labels: [analysis, phase-ii, web-app, consistency]
links:
  spec: specs/phase-ii/spec.md
  plan: specs/phase-ii/plan.md
  tasks: specs/phase-ii/tasks.md
  constitution: .specify/memory/constitution.md
files:
  - specs/phase-ii/spec.md
  - specs/phase-ii/plan.md
  - specs/phase-ii/tasks.md
tests:
  - none
---

## Prompt

```text
Phase: II — Full-Stack Web Todo Application

Read ALL generated specs and plans:
- speckit.constitution
- Phase II specification (from /specify)
- Phase II plan (from /plan)
- Phase II tasks (from /tasks)

Now IMPLEMENT the system strictly following Spec-Driven Development.

Rules (NON-NEGOTIABLE):
1. Implement ONLY what is defined in Phase II tasks
2. Reference Task IDs in code comments
3. Follow the planned architecture exactly
4. Use:
   - Frontend: Next.js using App Router
   - Backend: FastAPI
   - Database: simple relational DB (as planned)
5. No external assumptions
6. No feature creep
7. Stop and request clarification if anything is unclear

Output:
- Complete working full-stack application
- Clean folder structure
- Clear separation of frontend and backend
- Ready to run locally

If any task is ambiguous or conflicts with the constitution,
STOP and ask for clarification.
```

## Response snapshot

Successfully analyzed Phase II specification, plan, and tasks for consistency. Verified that all artifacts align with constitution requirements for Next.js 16 with App Router, FastAPI 0.115+, SQLModel 0.0.22+, and Neon PostgreSQL. Identified no critical inconsistencies between specification, architecture plan, and task breakdown. All requirements are properly mapped to implementation tasks with appropriate coverage. Architecture follows three-tier pattern with clean separation of concerns between frontend, backend, and database layers.

## Outcome

- ✅ Impact: Verified specification consistency and task coverage for Phase II
- 🧪 Tests: none
- 📁 Files: Analyzed specs/phase-ii/spec.md, specs/phase-ii/plan.md, specs/phase-ii/tasks.md
- 🔁 Next prompts: Proceed with implementation following task breakdown
- 🧠 Reflection: All artifacts align properly with constitution and requirements

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementation following the task breakdown