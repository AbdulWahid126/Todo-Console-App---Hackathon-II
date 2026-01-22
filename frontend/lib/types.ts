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
   * Task: P2-T-XXX
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
   * Task: P2-T-XXX
   * From: specs/phase-ii/dashboard-spec
   */
  date: string;
  completed: number;
  created: number;
}

export interface CategoryDistributionItem {
  /**
   * Item for category distribution data
   * Task: P2-T-XXX
   * From: specs/phase-ii/dashboard-spec
   */
  category: string;
  count: number;
  color: string;
}

export interface PriorityBreakdownItem {
  /**
   * Item for priority breakdown data
   * Task: P2-T-XXX
   * From: specs/phase-ii/dashboard-spec
   */
  priority: string;
  count: number;
  percentage: number;
}

export interface ChartData {
  /**
   * Analytics data for dashboard charts
   * Task: P2-T-XXX
   * From: specs/phase-ii/dashboard-spec
   */
  completion_trend: CompletionTrendItem[];
  category_distribution: CategoryDistributionItem[];
  priority_breakdown: PriorityBreakdownItem[];
}

export interface TaskSummary {
  /**
   * Simplified task representation for dashboard
   * Task: P2-T-XXX
   * From: specs/phase-ii/dashboard-spec
   */
  id: string;
  title: string;
  status: string;
  priority: string;
  due_date?: string;
  category: string;
}