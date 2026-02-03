# Implementation Plan: Phase II - Full-Stack Web Todo Application

**Branch**: `phase-ii-fullstack-web-app` | **Date**: 2026-01-18 | **Spec**: [specs/phase-ii/spec.md](spec.md)
**Input**: Feature specification from `/specs/phase-ii/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implementation of a full-stack web application with Next.js frontend and FastAPI backend. The application will provide a modern web interface for todo management with responsive design for both desktop and mobile. The backend will use FastAPI with SQLModel and Neon PostgreSQL for persistent data storage, ensuring data survives application restarts. The architecture follows a three-tier pattern with clear separation between client, application, and data tiers.

## Technical Context

**Language/Version**: Python 3.13+ (backend), TypeScript 5.7+ (frontend)
**Primary Dependencies**: Next.js 16 with App Router, FastAPI 0.115+, SQLModel 0.0.22+, Neon PostgreSQL, Better Auth
**Storage**: Neon PostgreSQL database (persistent storage)
**Testing**: pytest (backend), vitest (frontend)
**Target Platform**: Web application (desktop and mobile browsers)
**Project Type**: Full-stack monorepo with separate frontend/backend services
**Performance Goals**: API response times <200ms (99th percentile), initial page load <3 seconds on 3G
**Constraints**: Next.js App Router required, FastAPI backend, Neon PostgreSQL, Better Auth for authentication, responsive design
**Scale/Scope**: Multi-user focused with user data isolation via user_id filtering (per constitution requirements)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

1. **Development Rules**: Confirm all code will be generated via Claude Code only, with no manual coding by humans
2. **Architecture Constraints**: Verify Next.js 16 with App Router, FastAPI 0.115+, SQLModel 0.0.22+, Neon PostgreSQL are used as required by constitution
3. **Code Quality**: Ensure clean architecture with separation of concerns, testability, and proper type safety
4. **Spec-Driven Enforcement**: Verify Constitution > Specify > Plan > Tasks hierarchy will be strictly followed
5. **Agent Behavior**: Confirm no assumptions beyond specifications, no feature creep, and no skipping lifecycle steps
6. **Technology Stack**: Validate Next.js/TypeScript frontend with FastAPI/Python backend architecture
7. **Security First**: Verify JWT-based authentication with Better Auth is planned and implemented (per constitution Section IV)
8. **Feature Parity**: Confirm basic features (Add, View, Update, Delete, Mark Complete/Incomplete) are included
9. **User Data Isolation**: Verify user_id filtering is implemented to prevent cross-user data access (per constitution Section IV)
10. **Authentication Headers**: Confirm all API endpoints require Authorization: Bearer <token> header validation (per constitution Section IV)
11. **Input Validation**: Verify Pydantic models are used for input validation and sanitization (per constitution Section IV)

## Project Structure

### Documentation (this feature)
```text
specs/phase-ii/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)
```text
/
├── frontend/            # Next.js 16 application
│   ├── app/             # App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx     # Home page (redirects to /todos)
│   │   ├── auth/        # Authentication pages
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   ├── todos/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   └── error.tsx
│   ├── components/      # Reusable UI components
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoForm.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── AuthErrorBoundary.tsx
│   ├── contexts/        # React contexts
│   │   └── AuthContext.ts
│   ├── providers/       # React providers
│   │   └── AuthProvider.tsx
│   ├── lib/             # Utility functions
│   │   ├── api.ts       # API client with auth headers
│   │   ├── auth.ts      # Authentication utilities
│   │   ├── types.ts     # TypeScript interfaces
│   │   └── validation.ts # Client-side validation
│   ├── public/
│   └── package.json
├── backend/             # FastAPI application
│   ├── main.py          # FastAPI app entry point with auth middleware
│   ├── auth/            # Authentication modules
│   │   ├── config.py    # Better Auth configuration
│   │   ├── middleware.py # Authentication middleware
│   │   └── jwt_handler.py # JWT token handling
│   ├── models/          # SQLModel database models
│   │   ├── todo.py      # Todo ORM model with user_id relationship
│   │   └── database.py  # Database configuration
│   ├── services/        # Business logic
│   │   └── todo_service.py # With user_id filtering
│   ├── api/             # API routes
│   │   └── v1/
│   │       ├── auth.py  # Authentication endpoints
│   │       └── todos.py # Todo endpoints with auth dependencies
│   ├── schemas/         # Pydantic models
│   │   ├── todo.py      # Request/response schemas
│   │   ├── user.py      # User schemas
│   │   └── error.py     # Error response schemas
│   ├── dependencies.py  # Dependency injection with auth dependencies
│   └── requirements.txt
├── specs/               # All specification documents
├── specs-history/       # Versioned spec iterations
├── CLAUDE.md            # Root-level agent instructions
├── README.md            # Setup and run instructions
└── .env.example         # Environment variable template
```

**Structure Decision**: Monorepo structure with clear separation between frontend (Next.js) and backend (FastAPI) services, following the constitution's required technology stack.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |