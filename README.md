# Evolution of Todo - Phase II: Full-Stack Web Todo Application

## Overview

This is Phase II of the Evolution of Todo project: a full-stack web application with Next.js frontend and FastAPI backend. The application provides a modern web interface for todo management with responsive design for both desktop and mobile browsers. Todos are persisted using Neon PostgreSQL database, ensuring data survives application restarts.

## Architecture

The application follows a clean architecture with clear separation of concerns:

- **Frontend**: Next.js 16 with App Router, TypeScript 5.7+, Tailwind CSS
- **Backend**: FastAPI 0.115+, SQLModel 0.0.22+, Python 3.13+
- **Database**: Neon PostgreSQL (persistent storage)
- **Communication**: REST API over HTTP/JSON

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Responsive design for desktop and mobile
- Data persistence across sessions
- User-friendly error handling
- Loading states for better UX

## Technology Stack

### Frontend
- Next.js 16 with App Router
- TypeScript 5.7+
- Tailwind CSS 3.4+
- React 19+

### Backend
- FastAPI 0.115+
- Python 3.13+
- SQLModel 0.0.22+
- Neon PostgreSQL

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Python 3.13+
- UV package manager
- Neon PostgreSQL account

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install Python dependencies: `uv pip install -r requirements.txt`
3. Set up environment: `cp .env.example .env` and update with your Neon PostgreSQL connection string
4. Start the backend: `uv run uvicorn main:app --reload --port 8000`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install JavaScript dependencies: `npm install` (or yarn/pnpm)
3. Set up environment: `cp .env.local.example .env.local` and update API base URL
4. Start the frontend: `npm run dev` (or yarn/pnpm)

## Running the Application

1. Start the backend server: `cd backend && uv run uvicorn main:app --reload --port 8000`
2. In a separate terminal, start the frontend: `cd frontend && npm run dev`
3. Access the application at `http://localhost:3000`

## API Endpoints

- `GET /api/v1/todos` - List all todos
- `POST /api/v1/todos` - Create new todo
- `GET /api/v1/todos/{id}` - Get single todo
- `PUT /api/v1/todos/{id}` - Update todo
- `DELETE /api/v1/todos/{id}` - Delete todo

## Project Structure

```
/
├── frontend/            # Next.js application
│   ├── app/             # App Router pages
│   ├── components/      # Reusable UI components
│   └── lib/             # Utility functions
├── backend/             # FastAPI application
│   ├── main.py          # Application entry point
│   ├── models/          # Database models
│   ├── services/        # Business logic
│   └── api/             # API routes
└── specs/               # Specification documents
    ├── phase-i/         # Phase I specs (console app)
    └── phase-ii/        # Phase II specs (web app)
```

## Development

### Backend Development
- Run tests: `python -m pytest`
- Run with coverage: `python -m pytest --cov=.`
- Format code: `black .`
- Lint code: `ruff check .`

### Frontend Development
- Run development server: `npm run dev`
- Build for production: `npm run build`
- Run tests: `npm test`
- Run linter: `npm run lint`
- Format code: `npm run format`

## Specifications

For detailed specifications, see the `specs/phase-ii/` directory:
- `spec.md` - Feature specification
- `plan.md` - Implementation plan
- `tasks.md` - Implementation tasks
- `data-model.md` - Data model specification
- `contracts/api-contracts.md` - API contracts

## License

This project is part of the Evolution of Todo hackathon and follows the hackathon's terms and conditions.