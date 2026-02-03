/**
 * API client utility for Todo Application frontend
 * Task: P2-T-015, P2-T-051-P2-T-055
 * From: specs/phase-ii/plan, specs/phase-ii/contracts/api-contracts
 * Implements client-side data fetching as required by constitution VII. Clean Architecture & Stateless Services
 */

import { Todo, TodoCreateData, TodoUpdateData, User, UserLoginData, UserRegisterData, AuthResponse, DashboardStats, ChartData, TaskSummary } from './types';

// Base API URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';






/**
 * Add retry logic with exponential backoff for network requests
 * Task: P2-T-040, P2-T-055
 * From: specs/phase-ii/plan
 */
export async function fetchWithRetry(url: string, options: RequestInit = {}, maxRetries: number = 3): Promise<Response> {
  let lastError: Error | null = null;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      const response = await fetch(url, options);

      // Only retry on network errors (not 4xx/5xx responses)
      if (!response.ok && response.status >= 500) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      return response;
    } catch (error) {
      lastError = error as Error;

      // If this was the last attempt, throw the error
      if (i === maxRetries) {
        throw lastError;
      }

      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 100));
    }
  }

  // This shouldn't be reached, but TypeScript requires a return
  throw lastError || new Error('Unknown error in fetchWithRetry');
}

// Authentication API functions
/**
 * Sign in user with email and password
 */
export async function signIn(data: UserLoginData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.detail || 'Authentication failed',
        message: errorData.detail || 'Invalid credentials',
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      error: 'Network error',
      message: 'Could not connect to server. Please try again.',
    };
  }
}

/**
 * Register user with name, email and password
 */
export async function register(data: UserRegisterData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.detail || 'Registration failed',
        message: errorData.detail || 'Unable to create account',
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      error: 'Network error',
      message: 'Could not connect to server. Please try again.',
    };
  }
}

/**
 * Get current user profile
 */
export async function getUserProfile(token: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching user profile:', errorData);
      return null;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Network error fetching user profile:', error);
    return null;
  }
}

/**
 * Add authentication header to API requests
 */
function getAuthHeaders(token?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Fetch all todos for the authenticated user
 */
export async function fetchTodos(token?: string): Promise<Todo[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/`, {
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch todos: ${response.status} ${response.statusText}`);
    }

    const todos: Todo[] = await response.json();
    return todos;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

/**
 * Fetch a single todo by ID for the authenticated user
 */
export async function fetchTodoById(id: string, token?: string): Promise<Todo> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Todo with ID ${id} not found`);
      }
      const errorData = await response.json();
      throw new Error(errorData.detail || `Failed to fetch todo: ${response.status} ${response.statusText}`);
    }

    const todo: Todo = await response.json();
    return todo;
  } catch (error) {
    console.error(`Error fetching todo with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Create a new todo for the authenticated user
 */
export async function createTodo(todoData: TodoCreateData, token?: string): Promise<Todo> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(todoData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Failed to create todo: ${response.status} ${response.statusText}`);
    }

    const newTodo: Todo = await response.json();
    return newTodo;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
}

/**
 * Update an existing todo for the authenticated user
 */
export async function updateTodo(id: string, todoData: TodoUpdateData, token?: string): Promise<Todo> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(todoData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Failed to update todo: ${response.status} ${response.statusText}`);
    }

    const updatedTodo: Todo = await response.json();
    return updatedTodo;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}

/**
 * Delete a todo for the authenticated user
 */
export async function deleteTodo(id: string, token?: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Failed to delete todo: ${response.status} ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}

/**
 * Fetch dashboard statistics for the authenticated user
 */
export async function fetchDashboardStats(token?: string): Promise<DashboardStats> {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats/`, {
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard stats: ${response.status} ${response.statusText}`);
    }

    const stats: DashboardStats = await response.json();
    return stats;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}

/**
 * Fetch task summary for the authenticated user (alternative endpoint)
 */
export async function fetchTaskSummary(token?: string): Promise<DashboardStats> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/summary/`, {
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch task summary: ${response.status} ${response.statusText}`);
    }

    const summary: DashboardStats = await response.json();
    return summary;
  } catch (error) {
    console.error('Error fetching task summary:', error);
    throw error;
  }
}

/**
 * Fetch dashboard analytics for the authenticated user
 */
export async function fetchDashboardAnalytics(token?: string): Promise<ChartData> {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/analytics/`, {
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard analytics: ${response.status} ${response.statusText}`);
    }

    const analytics: ChartData = await response.json();
    return analytics;
  } catch (error) {
    console.error('Error fetching dashboard analytics:', error);
    throw error;
  }
}

/**
 * Request password reset
 */
export async function requestPasswordReset(email: string): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.detail || 'Failed to send reset email',
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: 'Could not connect to server',
    };
  }
}

/**
 * Check if email is available for registration
 */
export async function checkEmailAvailability(email: string): Promise<boolean> {
  try {
    // Check if email exists by attempting to register with it
    // If registration fails with "email already exists" error, the email is taken
    // For now, we'll return true to allow registration and let the backend handle validation
    return true;
  } catch (error) {
    // If there's an error checking availability, we'll treat it as available to not block registration
    return true;
  }
}

/**
 * Fetch recent tasks for the authenticated user
 */
export async function fetchRecentTasks(token?: string): Promise<TaskSummary[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/recent-tasks/`, {
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch recent tasks: ${response.status} ${response.statusText}`);
    }

    const tasks: TaskSummary[] = await response.json();
    return tasks;
  } catch (error) {
    console.error('Error fetching recent tasks:', error);
    throw error;
  }
}

/**
 * Fetch all tasks with optional filters
 */
export async function fetchFilteredTasks(
  token?: string,
  filters?: {
    status?: string;
    priority?: string;
    category?: string;
    due_date_from?: string;
    due_date_to?: string;
    search?: string;
  }
): Promise<Todo[]> {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }

    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}/todos${queryString ? '?' + queryString : ''}`;

    const response = await fetch(url, {
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch filtered tasks: ${response.status} ${response.statusText}`);
    }

    const tasks: Todo[] = await response.json();
    return tasks;
  } catch (error) {
    console.error('Error fetching filtered tasks:', error);
    throw error;
  }
}