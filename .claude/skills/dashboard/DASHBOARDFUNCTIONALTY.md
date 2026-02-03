# Full-Stack Dashboard Implementation

## Project Overview
**Project Type:** Full-Stack Todo Application (Hackathon Project – Phase 2)  
**Objective:** Transform the existing static dashboard UI into a fully functional, data-driven application with complete CRUD operations and real-time data integration.

---

## Technical Stack

### Frontend
- **Framework:** Next.js (App Router)
- **Current State:** Dashboard UI implemented with static data
- **Existing Pages:**
  - Dashboard (main analytics view)
  - All Tasks
  - Today
  - Upcoming
  - Completed
  - Categories
  - Settings
  - Auth (Signup/Signin)

### Backend
- **Framework:** FastAPI
- **Authentication:** JWT-based system (implemented)
- **Database:** Connected and operational
- **User Context:** Available post-authentication

---

## Implementation Requirements

### 1. Dashboard (Main Page) - Analytics & Overview

**Data Display Requirements:**
- **Metrics Cards** (fetch and display real-time data):
  - Total Tasks (all user tasks)
  - Completed Tasks (status: completed)
  - In Progress Tasks (status: in-progress)
  - Overdue Tasks (due date < current date && status ≠ completed)

**Dynamic Components:**
- **Recent Tasks Section:**
  - Fetch latest 5-10 tasks ordered by creation date
  - Display task title, category, due date, and status
  - Include quick actions (mark complete, delete)
  
- **Analytics/Charts** (if present in UI):
  - Populate with actual task distribution data
  - Show completion trends if applicable
  
- **Empty States:**
  - Display friendly message when no tasks exist
  - Include CTA button to create first task

**API Endpoints Needed:**
```
GET /api/tasks/summary → { total, completed, inProgress, overdue }
GET /api/tasks/recent?limit=10 → [ {task objects} ]
```

---

### 2. Task Management - Full CRUD Operations

**Create Task:**
- Modal/form with fields:
  - Title (required)
  - Description (optional)
  - Category (dropdown/select)
  - Due Date (date picker)
  - Priority (low/medium/high - optional)
  - Status (default: pending/in-progress)
- Validation before submission
- API: `POST /api/tasks`
- Success: Close modal, refresh task list, show success toast

**Edit Task:**
- Pre-populate form with existing task data
- Allow modification of all fields
- API: `PUT /api/tasks/{task_id}` or `PATCH /api/tasks/{task_id}`
- Success: Update UI immediately, show success toast

**Delete Task:**
- Confirmation dialog before deletion
- API: `DELETE /api/tasks/{task_id}`
- Success: Remove from UI, show success toast

**Toggle Task Status:**
- Quick action to mark complete/incomplete
- API: `PATCH /api/tasks/{task_id}/status`
- Update UI checkbox/status indicator immediately

**Error Handling:**
- Display user-friendly error messages
- Handle network failures gracefully
- Validate input client-side before API call

---

### 3. Filters & Views - Dynamic Data Filtering

**All Tasks Page:**
- Fetch: `GET /api/tasks`
- Display all user tasks in list/grid format
- Include search functionality (filter by title/description)
- Sort options: due date, priority, creation date, status

**Today Page:**
- Fetch: `GET /api/tasks?filter=today`
- Filter logic: `due_date === current_date`
- Highlight overdue tasks from today

**Upcoming Page:**
- Fetch: `GET /api/tasks?filter=upcoming`
- Filter logic: `due_date > current_date`
- Group by week or date range (optional)

**Completed Page:**
- Fetch: `GET /api/tasks?status=completed`
- Show completion date/time
- Option to restore (mark as incomplete)

**Categories Page:**
- Fetch: `GET /api/tasks` with client-side grouping OR `GET /api/tasks/by-category`
- Display tasks grouped by category
- Show task count per category
- Collapsible category sections

**Interactive Filters:**
- Category filter dropdown (multi-select or single)
- Status filter (all, pending, in-progress, completed)
- Priority filter (if implemented)
- Date range picker (optional but recommended)
- Clear all filters button

**Sorting:**
- By due date (ascending/descending)
- By priority
- By creation date
- Alphabetically by title

---

### 4. Authentication & Security

**Route Protection:**
- Implement middleware/HOC for protected routes
- Check for valid JWT token in:
  - Cookies (recommended)
  - localStorage
  - sessionStorage
- Redirect logic: `/dashboard → /signin` if unauthenticated

**Token Management:**
- Store JWT securely after login
- Include token in all API requests:
  ```javascript
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  ```
- Handle token expiration:
  - Detect 401 responses
  - Clear stored token
  - Redirect to signin
  - Show session expired message

**User Context:**
- Fetch and store user profile data: `GET /api/users/me`
- Display user name/email in dashboard header
- Implement logout functionality (clear token + redirect)

**Security Best Practices:**
- Never expose sensitive data in URLs
- Sanitize user inputs
- Use HTTPS in production
- Implement CSRF protection if needed

---

### 5. API Integration

**Backend Route Audit:**
- Review existing FastAPI routes
- Document expected request/response schemas
- Identify missing endpoints and implement them:
  - Task CRUD operations
  - Task filtering/sorting
  - Task summary/analytics
  
**Schema Consistency:**
- Ensure frontend models match backend Pydantic models
- Example Task Schema:
  ```typescript
  interface Task {
    id: string;
    title: string;
    description?: string;
    category: string;
    due_date: string; // ISO 8601
    priority?: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progress' | 'completed';
    created_at: string;
    updated_at: string;
    user_id: string;
  }
  ```

**API Client Setup:**
- Create centralized API utility (`lib/api.ts` or similar)
- Base URL configuration (env variable)
- Reusable fetch wrapper with:
  - Automatic token injection
  - Error handling
  - Response parsing
  - Loading state management

**Error Handling:**
- Network errors → show retry option
- 400 errors → display validation messages
- 401 errors → redirect to login
- 404 errors → show "not found" message
- 500 errors → show generic error message
- Log errors to console for debugging

---

### 6. State Management

**Global State Requirements:**
- User authentication state (logged in user data)
- Tasks list (current view's tasks)
- Loading states (API calls in progress)
- Error states (failed requests)

**Implementation Options:**
1. **React Context API** (recommended for hackathon simplicity)
   - Create `AuthContext` for user/token
   - Create `TaskContext` for tasks data
   
2. **Zustand/Jotai** (if already in project)
   - Lightweight state management
   - Minimal boilerplate

3. **React Query/SWR** (recommended for data fetching)
   - Automatic caching
   - Background refetching
   - Optimistic updates
   - Built-in loading/error states

**State Update Patterns:**
- **Optimistic UI Updates:**
  - Update UI immediately on user action
  - Revert if API call fails
  
- **Cache Invalidation:**
  - After task creation → refetch tasks list
  - After task update → update specific task in cache
  - After task deletion → remove from cache
  
- **Real-time Sync:**
  - Refresh dashboard metrics after any CRUD operation
  - Update task counts in sidebar (if displayed)

**Avoid:**
- Full page reloads after actions
- Multiple redundant API calls
- Stale data display

---

### 7. UX Requirements

**Loading States:**
- Skeleton loaders for task lists
- Spinner/loading indicator for API calls
- Disable buttons during submission
- Show "Loading..." text where appropriate

**Empty States:**
- Dashboard: "No tasks yet! Create your first task to get started"
- Today: "No tasks due today. Enjoy your free time!"
- Completed: "No completed tasks yet. Keep working!"
- Categories: "No tasks in this category"
- Include relevant icon/illustration
- Prominent "Create Task" CTA button

**Error States:**
- Toast notifications for errors
- Inline error messages in forms
- Failed to load data → show retry button
- Network error → "Check your connection"

**Success Feedback:**
- Toast/snackbar for successful actions
- Visual confirmation (checkmark, animation)
- Updated data reflected immediately

**Accessibility:**
- Proper ARIA labels
- Keyboard navigation support
- Focus management in modals
- Semantic HTML

**Performance:**
- No console errors (fix all warnings)
- No memory leaks
- Efficient re-renders (React.memo where needed)
- Debounce search inputs

---

## Constraints & Guidelines

### ❌ DO NOT:
- Redesign or restyle existing UI components
- Change layout, color scheme, or spacing
- Introduce heavy libraries (moment.js, lodash if not needed)
- Add unnecessary features not in requirements
- Modify database schema without documentation

### ✅ DO:
- Follow existing project architecture and patterns
- Keep code modular and component-based
- Add comments for complex logic
- Use TypeScript if project uses it
- Follow existing naming conventions
- Create reusable utility functions
- Test all CRUD operations manually

---

## Deliverables

### 1. Fully Functional Dashboard
- All metrics display real data
- Recent tasks section populated
- All navigation links work
- No broken UI elements

### 2. Complete Task Management
- Create, read, update, delete operations working
- All filter views functional
- Search and sort working correctly

### 3. Secure Authentication Flow
- Protected routes enforced
- Token management implemented
- Graceful session expiration handling

### 4. Clean Integration
- Frontend and backend communicate correctly
- No CORS issues
- Proper error handling throughout

### 5. Documentation
**Provide a brief summary including:**
- **What was implemented:** List of features completed
- **API endpoints created/modified:** Document any backend changes
- **Assumptions made:**
  - Default task status on creation
  - Token storage location
  - Category list (hardcoded vs dynamic)
  - Date/time timezone handling
- **Known limitations:** Features not implemented or edge cases
- **Setup instructions:** How to run the project
- **Testing checklist:** Key scenarios to verify

---

## Example Implementation Flow

### Phase 1: Backend Setup
1. Audit existing FastAPI routes
2. Create/update task CRUD endpoints
3. Add filtering/sorting logic
4. Test endpoints with Postman/Thunder Client

### Phase 2: API Client
1. Create centralized API utility
2. Implement token management
3. Add error handling wrapper
4. Test authentication flow

### Phase 3: State Management
1. Set up Context/Zustand
2. Create hooks for tasks data
3. Implement caching strategy
4. Add loading/error states

### Phase 4: Feature Implementation
1. Dashboard analytics
2. Task CRUD operations
3. Filter views (All, Today, Upcoming, etc.)
4. Categories grouping
5. Search and sort

### Phase 5: Polish & Testing
1. Add loading/empty/error states
2. Fix console errors
3. Test all user flows
4. Cross-browser testing
5. Mobile responsiveness check

---

## Success Criteria

✅ User can sign up and sign in  
✅ Dashboard shows accurate task metrics  
✅ User can create tasks with all fields  
✅ User can edit existing tasks  
✅ User can delete tasks with confirmation  
✅ User can mark tasks complete/incomplete  
✅ All filter views display correct tasks  
✅ Search functionality works  
✅ Sort options work correctly  
✅ Categories page groups tasks properly  
✅ Protected routes redirect unauthenticated users  
✅ Token expiration handled gracefully  
✅ No console errors or warnings  
✅ Loading states shown during API calls  
✅ Empty states displayed when appropriate  
✅ Error messages shown for failures  
✅ UI updates immediately after actions  

---