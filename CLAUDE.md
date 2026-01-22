# Claude Code Instructions for Todo Application

## Project Context

This is the Phase II implementation of the Evolution of Todo project: a full-stack web application with Next.js frontend and FastAPI backend. All code must be generated following the specifications in the `specs/phase-ii/` directory.

## Architecture

- **Frontend**: Next.js 16 with App Router, TypeScript 5.7+, Tailwind CSS
- **Backend**: FastAPI 0.115+, SQLModel 0.0.22+, Python 3.13+
- **Database**: Neon PostgreSQL for persistent storage
- **Communication**: HTTP/JSON APIs between frontend and backend

## Development Rules

1. **No Manual Coding**: All code must be generated via Claude Code based on specifications
2. **Task ID References**: Every file, function, and component must include Task ID references in comments
3. **Specification Adherence**: Implement exactly what's specified, no feature creep
4. **Architecture Compliance**: Follow the planned architecture exactly as specified

## File Locations

- Frontend code: `frontend/` directory
- Backend code: `backend/` directory
- Specifications: `specs/phase-ii/` directory
- Tests: Appropriate `tests/` subdirectories

## Common Patterns

### Backend (Python)
- Use SQLModel for database models with proper type hints
- Implement service layer for business logic
- Use Pydantic models for request/response validation
- Follow FastAPI best practices for dependency injection

### Frontend (TypeScript/React)
- Use Next.js App Router for page structure
- Implement client-side data fetching with error handling
- Use TypeScript interfaces for type safety
- Apply Tailwind CSS for styling

## Error Handling

- Implement proper error boundaries in React components
- Handle network errors with retry logic
- Validate user input on both frontend and backend
- Provide user-friendly error messages