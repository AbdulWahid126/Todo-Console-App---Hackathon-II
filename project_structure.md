# Project Structure - Evolution of Todo Full Stack Application

## Project Overview

**Project Name**: Evolution of Todo - Full Stack Application  
**Type**: Full-stack web application with authentication, dashboard, and analytics  
**Repository**: AbdulWahid126/Todo-Console-App---Hackathon-II  
**Location**: `d:\Q4 Hackathon\Hachathon-2 Full Stake TODO App`

This is a complete full-stack Todo application that evolved from a console application to a modern web application with user authentication, dashboard analytics, and comprehensive todo management features.

---

## Technology Stack

### Backend
- **Framework**: FastAPI 0.115.0
- **Language**: Python 3.13+
- **Database ORM**: SQLModel 0.0.22
- **Database**: PostgreSQL (Neon Cloud)
- **Authentication**: JWT tokens with bcrypt password hashing
- **API Documentation**: Auto-generated with FastAPI/Swagger
- **Server**: Uvicorn 0.32.0

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS 3.4.15
- **UI Components**: Custom components with Lucide React icons
- **3D Graphics**: Three.js with React Three Fiber
- **Animations**: Framer Motion 12.28.1
- **State Management**: React 19.0.0

### Development Tools
- **Testing**: Pytest (backend), Vitest (frontend)
- **Code Quality**: Black, Ruff (Python), ESLint (TypeScript)
- **Version Control**: Git
- **Environment Management**: python-dotenv

---

## Project Features

### Core Features
1. **User Authentication System**
   - User registration with email verification
   - Secure login with JWT tokens
   - Password hashing with bcrypt
   - Profile management
   - Forgot password functionality

2. **Todo Management**
   - Create, read, update, delete (CRUD) operations
   - User-specific todos
   - Todo completion tracking
   - Timestamps for creation and updates

3. **Dashboard & Analytics**
   - Comprehensive statistics overview
   - Task completion analytics
   - Recent tasks display
   - Visual data representations

4. **Responsive Design**
   - Mobile-friendly interface
   - Desktop, tablet, and mobile support
   - Modern UI with animations

---

## Directory Structure

```
d:\Q4 Hackathon\Hachathon-2 Full Stake TODO App\
│
├── backend/                          # FastAPI backend application
│   ├── api/                          # API route handlers
│   │   ├── __init__.py
│   │   └── v1/                       # API version 1
│   │       ├── __init__.py
│   │       ├── auth.py               # Authentication endpoints
│   │       ├── dashboard.py          # Dashboard endpoints
│   │       └── todos.py              # Todo CRUD endpoints
│   │
│   ├── database/                     # Database configuration
│   │   ├── __init__.py
│   │   └── session.py                # Database session management
│   │
│   ├── models/                       # SQLModel database models
│   │   ├── __init__.py
│   │   ├── dashboard.py              # Dashboard data models
│   │   ├── todo.py                   # Todo model
│   │   └── user.py                   # User model
│   │
│   ├── services/                     # Business logic layer
│   │   ├── __init__.py
│   │   └── todo_service.py           # Todo service operations
│   │
│   ├── utils/                        # Utility functions
│   │   └── security.py               # Security utilities (JWT, hashing)
│   │
│   ├── .env                          # Environment variables (not in git)
│   ├── .env.example                  # Environment template
│   ├── .gitignore                    # Git ignore rules
│   ├── dependencies.py               # FastAPI dependencies
│   ├── main.py                       # FastAPI application entry point
│   ├── requirements.txt              # Python dependencies
│   ├── start_backend.py              # Backend startup script
│   ├── debug_server.py               # Debug server script
│   ├── run_server.py                 # Production server script
│   ├── test_auth.py                  # Authentication tests
│   ├── test_server.py                # Server tests
│   └── temp_auth.py                  # Temporary auth utilities
│
├── frontend/                         # Next.js frontend application
│   ├── app/                          # Next.js App Router pages
│   │   ├── auth/                     # Authentication pages
│   │   │   ├── forgot-password/      # Password reset page
│   │   │   ├── signin/               # Login page
│   │   │   ├── signup/               # Registration page
│   │   │   ├── verify-email/         # Email verification page
│   │   │   └── layout.tsx            # Auth layout
│   │   │
│   │   ├── components/               # Page-level components
│   │   │
│   │   ├── dashboard/                # Dashboard pages
│   │   │   ├── layout.tsx            # Dashboard layout
│   │   │   └── page.tsx              # Dashboard main page
│   │   │
│   │   ├── todos/                    # Todo pages
│   │   │   ├── [id]/                 # Dynamic todo detail/edit
│   │   │   ├── new/                  # Create new todo
│   │   │   ├── layout.tsx            # Todos layout
│   │   │   └── page.tsx              # Todos list page
│   │   │
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Homepage
│   │
│   ├── components/                   # Reusable React components
│   │   ├── ErrorMessage.tsx          # Error display component
│   │   ├── LoadingSpinner.tsx        # Loading indicator
│   │   ├── TodoForm.tsx              # Todo creation/edit form
│   │   ├── TodoItem.tsx              # Individual todo item
│   │   └── TodoList.tsx              # Todo list container
│   │
│   ├── lib/                          # Utility libraries
│   │   ├── api.ts                    # API client functions
│   │   └── types.ts                  # TypeScript type definitions
│   │
│   ├── .env.local                    # Local environment variables
│   ├── .env.local.example            # Environment template
│   ├── .gitignore                    # Git ignore rules
│   ├── middleware.ts                 # Next.js middleware (auth)
│   ├── next-env.d.ts                 # Next.js TypeScript declarations
│   ├── package.json                  # Node.js dependencies
│   ├── package-lock.json             # Locked dependencies
│   ├── postcss.config.js             # PostCSS configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   └── tsconfig.json                 # TypeScript configuration
│
├── models/                           # Console app models (legacy)
│   ├── task.py                       # Task model
│   └── task_list.py                  # Task list model
│
├── services/                         # Console app services (legacy)
│   ├── cli_service.py                # CLI service
│   └── task_service.py               # Task service
│
├── specs/                            # Project specifications
│   ├── 1-todo-console-app/           # Phase I specifications
│   └── phase-ii/                     # Phase II specifications
│
├── history/                          # Development history
│   └── prompts/                      # Historical prompts
│
├── tests/                            # Test files
│
├── .git/                             # Git repository
├── .claude/                          # Claude AI configuration
├── .specify/                         # Specify configuration
│
├── CLAUDE.md                         # Claude Code instructions
├── README.md                         # Project documentation
├── dashboard-readme.md               # Dashboard documentation
├── main.py                           # Console app entry point (legacy)
├── start_backend.bat                 # Windows backend startup script
├── test_dashboard_api.py             # Dashboard API tests
└── nul                               # System file
```

---

## Database Models

### User Model
```python
- id: UUID (Primary Key)
- email: String (Unique, Indexed)
- name: String
- hashed_password: String
- is_active: Boolean
- is_verified: Boolean
- created_at: DateTime
- updated_at: DateTime
- last_login: DateTime (Optional)
```

### Todo Model
```python
- id: UUID (Primary Key)
- title: String
- description: String (Optional)
- completed: Boolean
- created_at: DateTime
- updated_at: DateTime
- user_id: UUID (Foreign Key to User)
```

### Dashboard Model
```python
- Statistics aggregation
- Analytics data
- Recent tasks tracking
```

---

## API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login and receive JWT token
- `GET /profile` - Get current user profile
- `POST /logout` - Logout user

### Todos (`/api/v1/todos`)
- `GET /` - Get all todos for authenticated user
- `POST /` - Create a new todo
- `GET /{id}` - Get a specific todo
- `PUT /{id}` - Update a specific todo
- `DELETE /{id}` - Delete a specific todo

### Dashboard (`/api/v1/dashboard`)
- `GET /stats` - Get dashboard statistics
- `GET /analytics` - Get analytics data
- `GET /recent-tasks` - Get recent tasks

---

## Frontend Routes

### Public Routes
- `/` - Homepage
- `/auth/signin` - Login page
- `/auth/signup` - Registration page
- `/auth/forgot-password` - Password reset page
- `/auth/verify-email` - Email verification page

### Protected Routes (Requires Authentication)
- `/dashboard` - User dashboard with analytics
- `/todos` - Todo list page
- `/todos/new` - Create new todo page
- `/todos/[id]` - Todo detail/edit page

---

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@host:port/database_name
SECRET_KEY=your-super-secret-key-change-this-in-production
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

---

## Dependencies

### Backend Dependencies (requirements.txt)
```
fastapi==0.115.0
uvicorn==0.32.0
sqlmodel==0.0.22
pydantic==2.10.3
python-multipart==0.0.20
python-dotenv==1.0.1
asyncpg==0.30.0
alembic==1.13.3
psycopg2-binary==2.9.10
httpx==0.27.2
pytest==8.3.4
pytest-cov==5.0.0
black==24.10.0
ruff==0.8.0
passlib[bcrypt]==1.7.4
python-jose[cryptography]==3.3.0
```

### Frontend Dependencies (package.json)
```json
{
  "dependencies": {
    "@react-three/drei": "^10.7.7",
    "@react-three/fiber": "^9.5.0",
    "framer-motion": "^12.28.1",
    "lucide-react": "^0.562.0",
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "three": "^0.182.0",
    "typescript": "^5.7.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.15.0",
    "eslint-config-next": "^16.0.0",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "vitest": "^2.1.5"
  }
}
```

---

## Setup & Running Instructions

### Backend Setup
1. Navigate to backend directory: `cd backend`
2. Install dependencies: `pip install -r requirements.txt`
3. Configure `.env` file with database URL and secret key
4. Start server: `uvicorn main:app --reload --port 8000`
5. Alternative: Run `python start_backend.py` or `start_backend.bat` (Windows)

### Frontend Setup
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Configure `.env.local` with API base URL
4. Start development server: `npm run dev`
5. Access application at `http://localhost:3000`

### Development Workflow
1. Start backend server (port 8000)
2. Start frontend server (port 3000)
3. Backend API docs available at `http://localhost:8000/docs`
4. Frontend application at `http://localhost:3000`

---

## Security Features

1. **Password Security**
   - Bcrypt hashing for password storage
   - Salted password hashing
   - No plain-text password storage

2. **Authentication**
   - JWT (JSON Web Tokens) for session management
   - Token-based authentication
   - Secure token storage

3. **API Security**
   - CORS configuration for allowed origins
   - Input validation with Pydantic
   - SQL injection prevention through ORM
   - Protected routes with middleware

4. **Data Protection**
   - User-specific data isolation
   - Environment variable configuration
   - Secure database connections

---

## Architecture Pattern

The application follows **Clean Architecture** principles:

### Backend Architecture
```
┌─────────────────────────────────────┐
│         API Layer (FastAPI)         │
│  - Route handlers                   │
│  - Request/Response validation      │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│       Service Layer (Business)      │
│  - Business logic                   │
│  - Data transformation              │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Data Layer (SQLModel/DB)       │
│  - Database models                  │
│  - Database operations              │
└─────────────────────────────────────┘
```

### Frontend Architecture
```
┌─────────────────────────────────────┐
│      Pages (Next.js App Router)     │
│  - Route definitions                │
│  - Page components                  │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Components (React)             │
│  - Reusable UI components           │
│  - Business logic components        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      API Client (lib/api.ts)        │
│  - HTTP requests                    │
│  - Error handling                   │
└─────────────────────────────────────┘
```

---

## Development Guidelines

### Backend Development
1. All code must include Task ID references in comments
2. Use SQLModel for database models with proper type hints
3. Implement service layer for business logic
4. Use Pydantic models for request/response validation
5. Follow FastAPI best practices for dependency injection

### Frontend Development
1. Use Next.js App Router for page structure
2. Implement client-side data fetching with error handling
3. Use TypeScript interfaces for type safety
4. Apply Tailwind CSS for styling
5. Implement proper error boundaries in React components

### Code Quality
- **Python**: Use Black for formatting, Ruff for linting
- **TypeScript**: Use ESLint for linting
- **Testing**: Write tests for critical functionality
- **Documentation**: Keep README and documentation updated

---

## Testing

### Backend Testing
- Framework: Pytest
- Coverage: pytest-cov
- Test files: `test_*.py` in backend directory
- Run tests: `pytest`

### Frontend Testing
- Framework: Vitest
- UI Testing: Vitest UI
- Run tests: `npm test`
- Run UI tests: `npm run test:ui`

---

## Deployment Considerations

### Production Checklist
1. ✅ Set secure environment variables
2. ✅ Configure production database (Neon PostgreSQL)
3. ✅ Set up reverse proxy (nginx/Apache)
4. ✅ Configure SSL certificates
5. ✅ Set up process manager (PM2 for Node.js, Gunicorn for Python)
6. ✅ Implement database backup strategy
7. ✅ Configure CORS for production origins
8. ✅ Enable production logging
9. ✅ Set up monitoring and alerts

### Recommended Hosting
- **Backend**: Railway, Heroku, AWS, DigitalOcean
- **Frontend**: Vercel, Netlify, AWS Amplify
- **Database**: Neon (PostgreSQL), AWS RDS, DigitalOcean Managed DB

---

## Project Evolution

This project evolved through two main phases:

### Phase I: Console Application
- Simple CLI-based todo application
- Local file storage
- Basic CRUD operations
- Command-line interface

### Phase II: Full-Stack Web Application
- Modern web interface with Next.js
- RESTful API with FastAPI
- PostgreSQL database
- User authentication and authorization
- Dashboard with analytics
- Responsive design

---

## Key Files

### Configuration Files
- `backend/main.py` - FastAPI application entry point
- `frontend/app/layout.tsx` - Root layout configuration
- `backend/requirements.txt` - Python dependencies
- `frontend/package.json` - Node.js dependencies
- `CLAUDE.md` - Claude AI development instructions
- `README.md` - Project documentation

### Core Backend Files
- `backend/models/user.py` - User database model
- `backend/models/todo.py` - Todo database model
- `backend/api/v1/auth.py` - Authentication endpoints
- `backend/api/v1/todos.py` - Todo CRUD endpoints
- `backend/api/v1/dashboard.py` - Dashboard endpoints
- `backend/utils/security.py` - Security utilities

### Core Frontend Files
- `frontend/app/page.tsx` - Homepage
- `frontend/app/dashboard/page.tsx` - Dashboard page
- `frontend/app/todos/page.tsx` - Todos list page
- `frontend/components/TodoForm.tsx` - Todo form component
- `frontend/lib/api.ts` - API client
- `frontend/middleware.ts` - Authentication middleware

---

## Additional Resources

- **API Documentation**: `http://localhost:8000/docs` (when backend is running)
- **Dashboard Documentation**: `dashboard-readme.md`
- **Specifications**: `specs/` directory
- **Development History**: `history/` directory

---

## Project Statistics

- **Total Directories**: 30+
- **Total Files**: 100+
- **Backend Files**: 20+ Python files
- **Frontend Files**: 40+ TypeScript/TSX files
- **Database Models**: 3 main models (User, Todo, Dashboard)
- **API Endpoints**: 10+ RESTful endpoints
- **Frontend Routes**: 8+ pages

---

## Contact & Support

For issues, questions, or contributions, please refer to the project repository:
**Repository**: AbdulWahid126/Todo-Console-App---Hackathon-II

---

*Last Updated: February 3, 2026*
*Project Version: 1.0.0*
