/**
 * API client utility for Todo Application frontend
 * Task: P2-T-015, P2-T-051-P2-T-055
 * From: specs/phase-ii/plan, specs/phase-ii/contracts/api-contracts
 * Implements client-side data fetching as required by constitution VII. Clean Architecture & Stateless Services
 */

import { Todo, TodoCreateData, TodoUpdateData } from './types';

// Base API URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

/**
 * Fetch all todos from the backend API
 * Task: P2-T-052
 * From: specs/phase-ii/data-model
 */
export async function fetchTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);

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
 * Fetch a single todo by ID from the backend API
 * Task: P2-T-053
 * From: specs/phase-ii/contracts/api-contracts
 */
export async function fetchTodoById(id: string): Promise<Todo> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`);

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
 * Create a new todo via the backend API
 * Task: P2-T-054
 * From: specs/phase-ii/contracts/api-contracts
 */
export async function createTodo(todoData: TodoCreateData): Promise<Todo> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
 * Update an existing todo via the backend API
 * Task: P2-T-054
 * From: specs/phase-ii/contracts/api-contracts
 */
export async function updateTodo(id: string, todoData: TodoUpdateData): Promise<Todo> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
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
 * Delete a todo via the backend API
 * Task: P2-T-054
 * From: specs/phase-ii/contracts/api-contracts
 */
export async function deleteTodo(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Failed to delete todo: ${response.status} ${response.statusText}`);
    }

    // DELETE requests return 204 No Content, so no JSON to parse
    return true;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}

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
interface SignInForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface AuthResponse {
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  error?: string;
  message?: string;
  field?: string;
}

/**
 * Sign in user with email and password
 */
export async function signIn(data: SignInForm): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.error || 'Authentication failed',
        message: errorData.message || 'Invalid credentials',
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
 * Sign up user with name, email and password
 */
export async function signUp(data: SignUpForm): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.error || 'Registration failed',
        message: errorData.message || 'Unable to create account',
        field: errorData.field,
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
 * Check if email is available for registration
 */
export async function checkEmailAvailability(email: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/check-email?email=${encodeURIComponent(email)}`);

    if (!response.ok) {
      throw new Error('Network error');
    }

    const result = await response.json();
    return result.available;
  } catch (error) {
    throw new Error('Could not check email availability');
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
        message: errorData.message || 'Failed to send reset email',
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
 * Verify email token
 */
export async function verifyEmailToken(token: string): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || 'Invalid or expired token',
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