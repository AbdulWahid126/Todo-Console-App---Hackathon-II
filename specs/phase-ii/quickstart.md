# Quickstart Guide: Phase II - Full-Stack Web Todo Application

**Date**: 2026-01-18
**Feature**: Phase II - Full-Stack Web Todo Application
**Branch**: phase-ii-fullstack-web-app

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Python 3.13+
- UV package manager (instead of pip)
- Neon PostgreSQL account
- Git

## Setup Instructions

### 1. Clone and Navigate to Repository
```bash
git clone [repository-url]
cd [repository-name]
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies using UV
uv pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your Neon PostgreSQL connection string and Better Auth secret
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install JavaScript dependencies
npm install
# or
yarn install
# or
pnpm install
```

### 4. Environment Configuration
Create `.env` files in both frontend and backend with the following variables:

**Backend (.env):**
```
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
BETTER_AUTH_SECRET=your-better-auth-secret
NEON_DB_URL=your-neon-postgres-connection-string
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
```

### 5. Run the Applications

#### Backend (FastAPI)
```bash
cd backend
uv run uvicorn main:app --reload --port 8000
```

#### Frontend (Next.js)
```bash
cd frontend
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Accessing the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/v1
- Backend docs: http://localhost:8000/docs
- Better Auth admin: http://localhost:8000/api/auth

## Basic Usage

1. Open http://localhost:3000 in your browser
2. You should see the todo list page
3. Click "Create New Todo" to add a new todo
4. Fill in the title and optional description
5. Submit to create the todo
6. Use the checkboxes to mark todos as complete/incomplete
7. Use the edit/delete buttons to modify/remove todos

## Development Commands

### Backend
```bash
# Run tests
python -m pytest

# Run with coverage
python -m pytest --cov=.

# Format code
black .

# Lint code
ruff check .
```

### Frontend
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint

# Format code
npm run format
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**: Ensure your Neon PostgreSQL connection string is correct in the backend .env file
2. **API Connection Error**: Ensure the backend is running and the NEXT_PUBLIC_API_BASE_URL is set correctly
3. **Authentication Issues**: Make sure BETTER_AUTH_SECRET is the same in both frontend and backend
4. **Frontend Build Errors**: Make sure all dependencies are installed and environment variables are set

### Resetting the Database
If you need to reset the database:
```bash
cd backend
# Run database reset commands as needed
```

## Next Steps

1. Explore the API documentation at http://localhost:8000/docs
2. Customize the UI in the frontend/app directory
3. Add additional features following the established patterns
4. Set up authentication for multi-user support (Phase III)