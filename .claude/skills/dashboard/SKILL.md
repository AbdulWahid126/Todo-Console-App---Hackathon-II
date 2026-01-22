# Dashboard Page Skill

## Overview
Create a comprehensive dashboard for managing TODO tasks with modern UI, real-time updates, filtering, and analytics visualization.

## Page Location
```
app/dashboard/page.tsx
```

## Design Requirements

### Visual Style
- **Theme**: Dark background with sidebar layout
- **Layout**: Two-column (sidebar + main content area)
- **Components**: Card-based sections with glassmorphism
- **Data Viz**: Charts and statistics for task analytics

## Layout Structure

### 1. Sidebar (Left Panel)
**Width**: 280px on desktop, collapsible on mobile

**Sections**:
- Logo/App name at top
- User profile section
- Navigation menu
- Quick stats summary
- Theme toggle (optional)
- Sign out button

**Navigation Items**:
```typescript
const navItems = [
  { label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
  { label: 'All Tasks', icon: 'ListTodo', href: '/todos' },
  { label: 'Today', icon: 'Calendar', href: '/dashboard/today' },
  { label: 'Upcoming', icon: 'CalendarClock', href: '/dashboard/upcoming' },
  { label: 'Completed', icon: 'CheckCircle', href: '/dashboard/completed' },
  { label: 'Categories', icon: 'Tag', href: '/dashboard/categories' },
  { label: 'Settings', icon: 'Settings', href: '/settings' }
];
```

### 2. Main Content Area
**Layout**: Responsive grid with sections

**Sections**:
1. Header bar with greeting and quick actions
2. Statistics cards (top row)
3. Task list with filters
4. Charts/Analytics (optional)
5. Quick add task component

## Component Breakdown

### Header Bar
```typescript
interface DashboardHeader {
  greeting: string;          // "Good morning, John"
  currentDate: string;       // "Monday, January 21, 2025"
  quickActions: Action[];    // Add Task, Add Category
  searchBar: boolean;        // Global search
  notifications: Badge;      // Notification count
}
```

**Features**:
- Greeting based on time of day
- Search tasks globally
- Quick add task button
- Notification bell icon
- User avatar with dropdown menu

### Statistics Cards (Row 1)

**Grid**: 4 cards in a row (responsive to 2 on tablet, 1 on mobile)

```typescript
interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  color: string;
}

const stats: StatCard[] = [
  {
    title: 'Total Tasks',
    value: 48,
    icon: <ListTodoIcon />,
    trend: { value: 12, direction: 'up' },
    color: '#3b82f6'
  },
  {
    title: 'Completed',
    value: 32,
    icon: <CheckCircleIcon />,
    trend: { value: 8, direction: 'up' },
    color: '#10b981'
  },
  {
    title: 'In Progress',
    value: 12,
    icon: <ClockIcon />,
    color: '#f59e0b'
  },
  {
    title: 'Overdue',
    value: 4,
    icon: <AlertCircleIcon />,
    trend: { value: 2, direction: 'down' },
    color: '#ef4444'
  }
];
```

**Card Styling**:
```css
- Background: Glass effect
- Border: Subtle glow matching icon color
- Padding: 1.5rem
- Border-radius: 1rem
- Hover: Lift effect (translateY: -4px)
- Icon: Large, colored gradient
- Value: Large bold number (2rem)
- Trend: Small colored badge with arrow
```

### Task List Section

**Features**:
- Filter tabs (All, Today, This Week, Completed)
- Sort dropdown (Date, Priority, Status)
- View toggle (List/Grid/Kanban)
- Search within tasks
- Bulk actions (select multiple, mark complete)

**Filters**:
```typescript
interface TaskFilters {
  status: 'all' | 'active' | 'completed';
  priority: 'all' | 'low' | 'medium' | 'high';
  category: string[];
  dateRange: {
    start: Date;
    end: Date;
  };
  sortBy: 'date' | 'priority' | 'title';
  sortOrder: 'asc' | 'desc';
}
```

**Task Item Display**:
```typescript
interface TaskItem {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  category?: string;
  tags?: string[];
  createdAt: Date;
  completedAt?: Date;
}
```

**Task Card Components**:
- Checkbox to mark complete
- Priority indicator (colored dot or badge)
- Title and description
- Due date with overdue warning
- Category tag
- Edit/Delete actions on hover
- Click to open detail modal

### Charts Section (Optional)

**Chart 1: Task Completion Trend**
- Line chart showing tasks completed over time
- Last 7 days or 30 days toggle
- Use recharts library

**Chart 2: Tasks by Category**
- Donut/Pie chart showing distribution
- Color-coded categories
- Click to filter by category

**Chart 3: Priority Distribution**
- Bar chart or progress bars
- Show count for each priority level

```typescript
interface ChartData {
  completionTrend: {
    date: string;
    completed: number;
    created: number;
  }[];
  categoryDistribution: {
    category: string;
    count: number;
    color: string;
  }[];
  priorityBreakdown: {
    priority: string;
    count: number;
    percentage: number;
  }[];
}
```

### Quick Add Task Component

**Features**:
- Inline form at top of task list
- Fields: Title (required), Description (optional)
- Quick priority selector (icons)
- Due date picker
- Add button
- Expand for more options

**Styling**:
- Compact by default
- Expands on focus
- Glass card effect
- Smooth height transition

## Sidebar Styling

```css
- Background: rgba(15, 20, 25, 0.8)
- Border-right: 1px solid rgba(255, 255, 255, 0.1)
- Position: Fixed on desktop, drawer on mobile
- Width: 280px
- Height: 100vh
- z-index: 100
- Backdrop-filter: blur(10px)
```

**User Profile Section**:
- Avatar (circular, 48px)
- Name and email
- Dropdown menu on click
- Settings, Profile, Sign out options

**Navigation Items**:
```css
- Padding: 0.75rem 1rem
- Border-radius: 0.5rem
- Hover: Background rgba(255, 255, 255, 0.1)
- Active: Background rgba(59, 130, 246, 0.2), border-left: 3px solid #3b82f6
- Icon + Text layout
- Smooth transition
```

## Main Content Styling

```css
- Margin-left: 280px (desktop)
- Padding: 2rem
- Background: #0a0e1a
- Min-height: 100vh
- Max-width: 1400px
```

## Responsive Behavior

### Desktop (>1024px)
- Sidebar visible and fixed
- 4 stat cards in row
- Two-column layout for charts

### Tablet (640px - 1024px)
- Sidebar collapsible with hamburger
- 2 stat cards per row
- Single column charts

### Mobile (<640px)
- Sidebar as drawer overlay
- 1 stat card per row
- Stacked layout
- Bottom navigation bar (optional)

## State Management

### Data Fetching
```typescript
// Fetch on page load
const [tasks, setTasks] = useState<Task[]>([]);
const [stats, setStats] = useState<Stats | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  Promise.all([
    getTodos(),
    getStats()
  ]).then(([tasksData, statsData]) => {
    setTasks(tasksData);
    setStats(statsData);
  }).finally(() => setLoading(false));
}, []);
```

### Filters & Sorting
- Use URL query params for shareable state
- Example: `/dashboard?status=active&sort=date`

### Real-time Updates (Optional)
- Optimistic updates on task actions
- WebSocket connection for multi-user sync
- Auto-refresh every 30 seconds

## API Integration

### Required Endpoints
```typescript
// Get dashboard statistics
GET /api/dashboard/stats
Response: {
  totalTasks: number;
  completed: number;
  inProgress: number;
  overdue: number;
  completionRate: number;
  todayTasks: number;
}

// Get tasks with filters
GET /api/todos?status={}&priority={}&category={}&sort={}
Response: Task[]

// Quick add task
POST /api/todos/quick
Request: { title: string; priority?: string; }
Response: Task

// Get chart data
GET /api/dashboard/analytics
Response: ChartData
```

## Interactions & UX

### Task Actions
- **Check/Uncheck**: Instant visual feedback, API call in background
- **Edit**: Open inline edit or modal
- **Delete**: Confirmation dialog, then remove
- **Drag & Drop**: Reorder tasks or change status

### Empty States
- No tasks: Encouraging message with "Add Task" CTA
- No results: "No tasks match your filters" with clear filters button
- Loading: Skeleton screens for cards and lists

### Success Feedback
- Toast notifications for actions
- Smooth animations for task completion
- Confetti effect on completing all tasks (fun touch)

## Performance Optimization

### Loading Strategy
- Show skeleton loaders for stats cards
- Paginate task list (20-50 per page)
- Lazy load charts below fold
- Virtual scrolling for long task lists

### Caching
- Cache stats data for 60 seconds
- Cache task list with SWR pattern
- Optimistic updates for instant feedback

## Accessibility

- Keyboard shortcuts for quick actions (e.g., N for new task)
- Focus management in modals
- ARIA labels for all icons
- Screen reader announcements for task completion
- High contrast mode support

## Additional Features (Nice to Have)

### Task Detail Modal
- Click task to open detailed view
- Full description
- Subtasks checklist
- Comments section
- Activity history
- Attachments

### Batch Operations
- Select multiple tasks with checkboxes
- Bulk actions: Mark complete, Delete, Change priority
- Move to category

### Filters Persistence
- Save favorite filter combinations
- Quick filter presets (Today, This Week, High Priority)

### Keyboard Shortcuts
- `N`: New task
- `S`: Search
- `F`: Toggle filters
- `Esc`: Close modal
- Arrow keys: Navigate tasks

### Customization
- Drag-and-drop dashboard layout
- Show/hide sections
- Theme customization
- Custom categories with colors

## Notes
- Use TypeScript for all components
- Implement proper error boundaries
- Follow existing API patterns from lib/api.ts
- Match design system from globals.css
- Use lucide-react for consistent icons
- Consider using recharts for data visualization
- Implement proper loading and error states
- Test with various data scenarios (empty, many tasks, etc.)