"""
Dashboard models for the Todo Application
Task: P2-T-XXX
From: specs/phase-ii/dashboard-spec
"""

from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class DashboardStats(BaseModel):
    """
    Statistics model for dashboard
    Task: P2-T-XXX
    From: specs/phase-ii/dashboard-spec
    """
    total_tasks: int
    completed: int
    in_progress: int
    overdue: int
    completion_rate: float
    today_tasks: int


class CompletionTrendItem(BaseModel):
    """
    Item for completion trend data
    Task: P2-T-XXX
    From: specs/phase-ii/dashboard-spec
    """
    date: str
    completed: int
    created: int


class CategoryDistributionItem(BaseModel):
    """
    Item for category distribution data
    Task: P2-T-XXX
    From: specs/phase-ii/dashboard-spec
    """
    category: str
    count: int
    color: str


class PriorityBreakdownItem(BaseModel):
    """
    Item for priority breakdown data
    Task: P2-T-XXX
    From: specs/phase-ii/dashboard-spec
    """
    priority: str
    count: int
    percentage: float


class ChartData(BaseModel):
    """
    Analytics data model for dashboard charts
    Task: P2-T-XXX
    From: specs/phase-ii/dashboard-spec
    """
    completion_trend: List[CompletionTrendItem]
    category_distribution: List[CategoryDistributionItem]
    priority_breakdown: List[PriorityBreakdownItem]


class TaskSummary(BaseModel):
    """
    Simplified task representation for dashboard
    Task: P2-T-XXX
    From: specs/phase-ii/dashboard-spec
    """
    id: str
    title: str
    description: str
    completed: bool
    due_date: Optional[datetime] = None
    priority: str
    category: str
    created_at: datetime
    updated_at: datetime