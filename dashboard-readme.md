# Dashboard Implementation

This dashboard provides a comprehensive overview of the TODO application with statistics, analytics, and task management capabilities.

## Features

- **Sidebar Navigation**: Left panel with navigation menu and user profile
- **Statistics Cards**: Key metrics including total tasks, completed, in-progress, and overdue tasks
- **Recent Tasks Table**: Displays recent tasks with priority, due date, and status
- **Analytics Charts**: Visual representations of task trends and distributions
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## API Endpoints

The dashboard utilizes the following backend endpoints:

- `GET /api/v1/dashboard/stats` - Gets dashboard statistics
- `GET /api/v1/dashboard/analytics` - Gets analytics data for charts
- `GET /api/v1/dashboard/recent-tasks` - Gets recent tasks for display

## Frontend Structure

- `frontend/app/dashboard/page.tsx` - Main dashboard page with layout and components
- `frontend/app/dashboard/layout.tsx` - Dashboard layout wrapper
- Uses API utility functions from `frontend/lib/api.ts`

## Design Elements

- Dark theme with glassmorphism effects
- Responsive grid layout for statistics cards
- Interactive table for task management
- Mobile-friendly navigation with collapsible sidebar
- Consistent iconography using lucide-react

## Technology Stack

- Next.js 16 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Lucide React for icons
- FastAPI backend with SQLModel