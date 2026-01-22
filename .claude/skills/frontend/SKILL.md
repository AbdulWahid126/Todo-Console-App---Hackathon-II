# Frontend Documentation

## Overview
This is a Next.js-based frontend application for the Full Stack TODO App. The frontend uses TypeScript, React, and follows modern design patterns with a focus on user experience and accessibility.

## Technology Stack
- **Framework**: Next.js Latest Version (App Router)
- **Language**: TypeScript
- **Styling**: CSS (globals.css)
- **UI Components**: Custom React components
- **API Communication**: Fetch API through centralized api.ts
- **Context 7**: MCP Context 7 is connected also used them

## Design System

### Visual Style
Based on the reference design, the application follows a modern, dark-themed aesthetic with:

- **Color Palette**:
  - Primary Background: Dark navy/black (`#0a0e1a` - `#1a1f2e`)
  - Accent Colors: Blue gradients (`#3b82f6` to `#60a5fa`)
  - Text: White/light gray for primary, muted gray for secondary
  - Success: Green tones
  - Error: Red tones
  
- **Typography**:
  - Headers: Large, bold, modern sans-serif
  - Body: Clean, readable sans-serif
  - Emphasis: Gradient text effects for key terms
  
- **Layout Principles**:
  - Generous whitespace
  - Card-based components with subtle borders/shadows
  - Glassmorphism effects where appropriate
  - Smooth transitions and hover states

### Component Design Patterns
- Clean, minimal interfaces
- Clear visual hierarchy
- Interactive elements with hover feedback
- Loading states and error handling
- Responsive design for all screen sizes

## Directory Structure

```
frontend/
├── app/                      # Next.js App Router
│   ├── globals.css          # Global styles and design system
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page
│   └── todos/               # TODO-related pages
│       ├── page.tsx         # List all TODOs
│       ├── new/
│       │   └── page.tsx     # Create new TODO
│       └── [id]/
│           └── edit/
│               └── page.tsx # Edit existing TODO
├── components/              # Reusable React components
│   ├── ErrorMessage.tsx     # Error display component
│   ├── LoadingSpinner.tsx   # Loading state component
│   ├── TodoForm.tsx         # Form for creating/editing TODOs
│   ├── TodoItem.tsx         # Individual TODO item display
│   └── TodoList.tsx         # List of TODO items
└── lib/                     # Utility libraries
    ├── api.ts               # API client and fetch utilities
    └── types.ts             # TypeScript type definitions
```

## Core Components

### 1. TodoList.tsx
**Purpose**: Display a list of TODO items with filtering and sorting capabilities

**Key Features**:
- Renders multiple TodoItem components
- Handles empty states
- Provides filter/sort controls
- Responsive grid/list layout

**Props**:
```typescript
interface TodoListProps {
  todos: Todo[];
  onDelete?: (id: string) => void;
  onToggle?: (id: string) => void;
}
```

### 2. TodoItem.tsx
**Purpose**: Display individual TODO item with actions

**Key Features**:
- Shows TODO title, description, status
- Toggle completion status
- Edit and delete actions
- Visual status indicators

**Props**:
```typescript
interface TodoItemProps {
  todo: Todo;
  onDelete?: (id: string) => void;
  onToggle?: (id: string) => void;
}
```

### 3. TodoForm.tsx
**Purpose**: Form component for creating and editing TODOs

**Key Features**:
- Controlled form inputs
- Validation
- Submit handling
- Loading states during submission
- Error display

**Props**:
```typescript
interface TodoFormProps {
  initialData?: Partial<Todo>;
  onSubmit: (data: TodoInput) => Promise<void>;
  isEdit?: boolean;
}
```

### 4. LoadingSpinner.tsx
**Purpose**: Visual feedback during async operations

**Key Features**:
- Animated spinner
- Optional loading text
- Centered display
- Customizable size

### 5. ErrorMessage.tsx
**Purpose**: Display error messages to users

**Key Features**:
- Clear error text
- Dismiss functionality
- Error type variants (error, warning, info)
- Accessible error announcements

## API Integration (lib/api.ts)

### Base Configuration
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
```

### Core API Functions
```typescript
// Fetch all TODOs
export async function getTodos(): Promise<Todo[]>

// Fetch single TODO by ID
export async function getTodo(id: string): Promise<Todo>

// Create new TODO
export async function createTodo(data: TodoInput): Promise<Todo>

// Update existing TODO
export async function updateTodo(id: string, data: TodoInput): Promise<Todo>

// Delete TODO
export async function deleteTodo(id: string): Promise<void>

// Toggle TODO completion status
export async function toggleTodo(id: string): Promise<Todo>
```

### Error Handling
All API functions include:
- Network error handling
- HTTP error status handling
- JSON parsing error handling
- User-friendly error messages

## Type Definitions (lib/types.ts)

```typescript
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TodoInput {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
}
```

## Pages Structure

### Home Page (app/page.tsx)
- Landing page with hero section
- Navigation to TODO list
- Feature highlights
- Modern, visually appealing design

### TODO List Page (app/todos/page.tsx)
- Displays all TODOs
- Filter and sort controls
- Create new TODO button
- Empty state handling
- Loading states

### New TODO Page (app/todos/new/page.tsx)
- TodoForm component for creation
- Form validation
- Success/error feedback
- Redirect after creation

### Edit TODO Page (app/todos/[id]/edit/page.tsx)
- Pre-populated TodoForm
- Update functionality
- Delete option
- Cancel navigation

## Styling Guidelines

### Global Styles (app/globals.css)
- CSS custom properties for theming
- Consistent spacing scale
- Typography system
- Utility classes
- Component-specific styles

### Recommended CSS Variables
```css
:root {
  --bg-primary: #0a0e1a;
  --bg-secondary: #1a1f2e;
  --bg-tertiary: #252a3a;
  
  --text-primary: #ffffff;
  --text-secondary: #a0aec0;
  --text-muted: #718096;
  
  --accent-primary: #3b82f6;
  --accent-secondary: #60a5fa;
  
  --success: #10b981;
  --error: #ef4444;
  --warning: #f59e0b;
  
  --border: #2d3748;
  --shadow: rgba(0, 0, 0, 0.3);
  
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
}
```

## State Management

### Client-Side State
- Use React hooks (useState, useEffect) for local component state
- Use URL parameters for shareable state (filters, sorting)
- Consider React Context for global UI state if needed

### Server State
- Fetch data in Server Components where possible
- Use client components for interactive features
- Implement optimistic updates for better UX

## Best Practices

### Performance
- Use Next.js Image component for optimized images
- Implement lazy loading for long lists
- Minimize client-side JavaScript
- Use Server Components by default

### Accessibility
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Screen reader compatibility

### Error Handling
- Display user-friendly error messages
- Provide retry mechanisms
- Log errors for debugging
- Handle network failures gracefully

### Code Organization
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use TypeScript for type safety
- Follow consistent naming conventions

## Development Workflow

### Adding New Features
1. Define types in `lib/types.ts`
2. Add API functions in `lib/api.ts`
3. Create components in `components/`
4. Build pages in `app/`
5. Style with design system in mind

### Component Creation Template
```typescript
'use client'; // Only if client interactivity needed

import { FC } from 'react';

interface ComponentNameProps {
  // Define props
}

export const ComponentName: FC<ComponentNameProps> = ({ props }) => {
  // Component logic
  
  return (
    // JSX
  );
};
```

## Environment Variables

Required environment variables:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Common Patterns

### Data Fetching
```typescript
// Server Component
async function TodosPage() {
  const todos = await getTodos();
  return <TodoList todos={todos} />;
}

// Client Component with hooks
'use client';
function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <LoadingSpinner />;
  return <TodoList todos={todos} />;
}
```

### Form Handling
```typescript
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setError(null);
  setLoading(true);
  
  try {
    await createTodo({ title, description });
    router.push('/todos');
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

## Testing Considerations

While tests aren't currently in the frontend structure, consider:
- Component unit tests with React Testing Library
- Integration tests for user flows
- E2E tests with Playwright or Cypress
- API mocking with MSW

## Future Enhancements

Potential improvements:
- Add animation library (Framer Motion)
- Implement drag-and-drop for TODO ordering
- Add categories/tags system
- Implement search functionality
- Add dark/light theme toggle
- User authentication and authorization
- Real-time updates with WebSockets
- Progressive Web App (PWA) features

---

**Note**: This documentation should be kept up-to-date as the project evolves. When adding new features or components, update the relevant sections to maintain accurate documentation.