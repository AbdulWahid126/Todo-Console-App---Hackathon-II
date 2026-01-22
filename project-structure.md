# Project Structure Documentation

## Project Overview
**Evolution of Todo - Phase II: Full-Stack Web Todo Application**

This is a complete full-stack web application for TODO management with:
- **Frontend**: Next.js 16 with App Router, TypeScript, Tailwind CSS, React 19
- **Backend**: FastAPI with Python 3.13, SQLModel ORM
- **Database**: Neon PostgreSQL (persistent storage)
- **Architecture**: Clean Architecture with REST API and Component-based UI

### Key Features
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Responsive design for desktop and mobile
- REST API backend with proper CORS middleware
- TypeScript for type safety

## Root Directory Files

| File | Purpose |
|------|---------|
| **CLAUDE.md** | Project documentation and notes |
| **main.py** | Console app entry point - handles CLI input and commands |
| **README.md** | Project overview, architecture, and setup instructions |

## Directory Structure

```
Hachathon-2 Full Stake TODO App
├── CLAUDE.md
├── main.py
├── README.md
├── backend/
│   ├── dependencies.py
│   ├── main.py
│   ├── requirements.txt
│   ├── api/
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── __init__.py
│   │       └── todos.py
│   ├── database/
│   │   ├── __init__.py
│   │   └── session.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── todo.py
│   └── services/
│       ├── __init__.py
│       └── todo_service.py
├── frontend/
│   ├── next-env.d.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── todos/
│   │       ├── page.tsx
│   │       ├── [id]/
│   │       │   └── edit/
│   │       │       └── page.tsx
│   │       └── new/
│   │           └── page.tsx
│   ├── components/
│   │   ├── ErrorMessage.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── TodoForm.tsx
│   │   ├── TodoItem.tsx
│   │   └── TodoList.tsx
│   └── lib/
│       ├── api.ts
│       └── types.ts
├── history/
│   └── prompts/
│       ├── 1-todo-console-app/
│       ├── constitution/
│       └── phase-ii/
├── models/
│   ├── task_list.py
│   ├── task.py
│   └── __pycache__/
├── services/
│   ├── cli_service.py
│   ├── task_service.py
│   └── __pycache__/
├── specs/
│   ├── 1-todo-console-app/
│   └── phase-ii/
└── tests/
    ├── contract/
    ├── integration/
    └── unit/
```

## Detailed Directory Descriptions

### Backend (`/backend`)
FastAPI REST API server for the Todo application.
- **main.py**: FastAPI application setup with CORS middleware and exception handlers
- **dependencies.py**: Dependency injection and database session management
- **requirements.txt**: Python package dependencies (FastAPI, SQLModel, etc.)
- **api/v1/todos.py**: Todo endpoints (GET, POST, PUT, DELETE)
- **database/session.py**: Database connection and session management
- **models/todo.py**: SQLModel Todo data model
- **services/todo_service.py**: Business logic for todo operations

#### Backend Dependencies
```
fastapi==0.115.0           # Web framework
uvicorn==0.32.0            # ASGI server
sqlmodel==0.0.22           # ORM layer
pydantic==2.10.3           # Data validation
asyncpg==0.30.0            # PostgreSQL driver
alembic==1.13.3            # Database migrations
pytest==8.3.4              # Testing framework
```

### Frontend (`/frontend`)
Next.js 16 React application with TypeScript.
- **package.json**: Node.js dependencies and scripts
- **tsconfig.json**: TypeScript configuration
- **next-env.d.ts**: Next.js TypeScript definitions
- **app/layout.tsx**: Root layout component
- **app/page.tsx**: Home page
- **app/todos/page.tsx**: Todos list page
- **app/todos/[id]/edit/page.tsx**: Edit todo page
- **app/todos/new/page.tsx**: Create new todo page
- **app/globals.css**: Global styles
- **components/**: Reusable React components
  - TodoForm.tsx
  - TodoList.tsx
  - TodoItem.tsx
  - LoadingSpinner.tsx
  - ErrorMessage.tsx
- **lib/api.ts**: API client for backend communication
- **lib/types.ts**: TypeScript type definitions

#### Frontend Dependencies
```
next@16.0.0                # React framework
react@19.0.0               # UI library
typescript@5.7.0           # Type system
tailwindcss@3.4.15         # Styling
@react-three/fiber@9.5.0   # 3D graphics
lucide-react@0.562.0       # Icons
vitest@2.1.5               # Testing framework
```

### Console App (`/root`)
Legacy console-based CLI application.
- **main.py**: CLI entry point and main loop
- **models/**: Data model classes
  - task.py
  - task_list.py
- **services/**: Business logic
  - cli_service.py: Command handling
  - task_service.py: Task operations

### Documentation & Specifications (`/specs` & `/history`)
- **specs/phase-ii/**: Phase II specifications
  - spec.md: Detailed requirements
  - plan.md: Implementation plan
  - data-model.md: Data structure definitions
  - tasks.md: Task breakdown
- **specs/1-todo-console-app/**: Console app specifications
- **history/prompts/**: Historical development prompts and decisions

### Testing (`/tests`)
Test suite structure:
- **unit/**: Unit tests for individual components
- **integration/**: Integration tests for component interactions
- **contract/**: API contract tests

## Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript 5.7, Tailwind CSS |
| Backend | FastAPI 0.115, Python 3.13, SQLModel 0.0.22 |
| Database | Neon PostgreSQL |
| Testing | pytest, vitest, pytest-cov |
| Code Quality | black, ruff, eslint |

## How Files Are Used

### At Root Level
1. **main.py** - Serves as the entry point for the console-based CLI application
2. **README.md** - Provides complete project documentation, setup, and architecture overview
3. **CLAUDE.md** - Contains project-specific notes and development context

### Frontend Integration
- **frontend/package.json** defines dependencies and build scripts
- **frontend/lib/api.ts** connects to backend API endpoints
- **frontend/app/page.tsx** serves as the main entry point
- **frontend/components/** are imported and used throughout pages

### Backend Integration
- **backend/main.py** initializes the FastAPI application
- **backend/dependencies.py** provides database sessions to routes
- **backend/api/v1/todos.py** defines all REST endpoints
- **backend/services/todo_service.py** handles business logic

### Data Flow
```
Frontend UI (Next.js) 
  ↓
API Client (lib/api.ts)
  ↓
Backend API (FastAPI)
  ↓
Services (todo_service.py)
  ↓
Database Models (models/todo.py)
  ↓
PostgreSQL Database
```

## Key Components and Their Relationships

### Frontend Components Flow
- **layout.tsx** → Wraps all pages with navigation and styling
- **page.tsx** → Home/landing page
- **todos/page.tsx** → List view with TodoList and TodoItem components
- **todos/new/page.tsx** → TodoForm for creating new todos
- **todos/[id]/edit/page.tsx** → TodoForm for editing existing todos
- **components/TodoForm.tsx** → Form UI for create/edit operations
- **components/TodoList.tsx** → Maps todos array to TodoItem components
- **components/TodoItem.tsx** → Individual todo display and actions
- **lib/api.ts** → All HTTP requests to backend

### Backend Request Flow
1. Request arrives at **api/v1/todos.py** (route handler)
2. Handler calls **services/todo_service.py** (business logic)
3. Service uses **dependencies.py** to get **database/session.py** connection
4. Operations performed on **models/todo.py** SQLModel objects
5. Results persisted to PostgreSQL via SQLModel ORM

## Development Scripts

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run test       # Run vitest in watch mode
npm run test:ui    # Run tests with UI
```

### Backend
```bash
uvicorn backend.main:app --reload  # Start API server
pytest                              # Run tests
black .                             # Format code
ruff check .                        # Lint code
```

## Project Phases

### Phase I (Legacy)
- Console-based CLI application
- Local file storage
- Single-user experience

### Phase II (Current)
- Full-stack web application
- REST API with FastAPI
- PostgreSQL database
- Multi-user capable
- Responsive UI with Next.js
- Type-safe with TypeScript
