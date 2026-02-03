/**
 * TypeScript type definitions for Todo Application
 * Task: P2-T-016
 * From: specs/phase-ii/data-model
 * Defines type safety for frontend as required by constitution VII. Clean Architecture & Stateless Services
 */

export interface Todo {
  /**
   * Represents a single todo item in the system with all required fields
   * Task: P2-T-016
   * From: specs/phase-ii/data-model
   */
  id: string;  // UUID v4 string for identification
  title: string;
  description?: string | null;
  completed: boolean;
  due_date?: string | null; // ISO 8601 datetime string for due date
  priority: string; // Priority level: low, medium, high
  category: string; // Category for organization
  created_at: string; // ISO 8601 datetime string
  updated_at: string; // ISO 8601 datetime string
}

export interface TodoCreateData {
  /**
   * Data structure for creating a new todo
   * Task: P2-T-016
   * From: specs/phase-ii/data-model
   */
  title: string;
  description?: string | null;
}

export interface TodoUpdateData {
  /**
   * Data structure for updating an existing todo (all fields optional for partial updates)
   * Task: P2-T-016
   * From: specs/phase-ii/data-model
   */
  title?: string;
  description?: string | null;
  completed?: boolean;
}

export interface ApiError {
  /**
   * Structure for API error responses
   * Task: P2-T-016
   * From: specs/phase-ii/contracts/api-contracts
   */
  detail: string | Array<{ loc: string[]; msg: string; type: string }>;
}

export interface DashboardStats {
  /**
   * Statistics for the dashboard
   * Task: P2-T-046
   * From: specs/phase-ii/dashboard-spec
   */
  total_tasks: number;
  completed: number;
  in_progress: number;
  overdue: number;
  completion_rate: number;
  today_tasks: number;
}

export interface CompletionTrendItem {
  /**
   * Item for completion trend data
   * Task: P2-T-047
   * From: specs/phase-ii/dashboard-spec
   */
  date: string;
  completed: number;
  created: number;
}

export interface CategoryDistributionItem {
  /**
   * Item for category distribution data
   * Task: P2-T-048
   * From: specs/phase-ii/dashboard-spec
   */
  category: string;
  count: number;
  color: string;
}

export interface PriorityBreakdownItem {
  /**
   * Item for priority breakdown data
   * Task: P2-T-049
   * From: specs/phase-ii/dashboard-spec
   */
  priority: string;
  count: number;
  percentage: number;
}

export interface ChartData {
  /**
   * Analytics data for dashboard charts
   * Task: P2-T-050
   * From: specs/phase-ii/dashboard-spec
   */
  completion_trend: CompletionTrendItem[];
  category_distribution: CategoryDistributionItem[];
  priority_breakdown: PriorityBreakdownItem[];
}

export interface TaskSummary {
  /**
   * Simplified task representation for dashboard
   * Task: P2-T-051
   * From: specs/phase-ii/dashboard-spec
   */
  id: string;
  title: string;
  description: string;
  completed: boolean;
  due_date?: string | null; // ISO 8601 datetime string for due date
  priority: string; // Priority level: low, medium, high
  category: string; // Category for organization
  created_at: string; // ISO 8601 datetime string
  updated_at: string; // ISO 8601 datetime string
}

export interface User {
  /**
   * User type definition for authentication
   * Task: P2-T-045
   * From: specs/phase-ii/auth-spec
   */
  id: string;
  email: string;
  name: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserLoginData {
  /**
   * Login form data
   * Task: P2-T-041
   * From: specs/phase-ii/auth-spec
   */
  email: string;
  password: string;
}

export interface UserRegisterData {
  /**
   * Registration form data
   * Task: P2-T-042
   * From: specs/phase-ii/auth-spec
   */
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  /**
   * Authentication response
   * Task: P2-T-043
   * From: specs/phase-ii/auth-spec
   */
  token?: string;
  token_type?: string;
  user?: User;
  error?: string;
  message?: string;
}