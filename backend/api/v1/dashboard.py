"""
Dashboard API endpoints for statistics and analytics
Task: P2-T-XXX
From: specs/phase-ii/dashboard-spec
"""

from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List
from datetime import datetime, timedelta
from models.todo import Todo
from database.session import get_session
from pydantic import BaseModel

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

# Pydantic models for response
class DashboardStats(BaseModel):
    total_tasks: int
    completed: int
    in_progress: int
    overdue: int
    completion_rate: float
    today_tasks: int

class CompletionTrendItem(BaseModel):
    date: str
    completed: int
    created: int

class CategoryDistributionItem(BaseModel):
    category: str
    count: int
    color: str

class PriorityBreakdownItem(BaseModel):
    priority: str
    count: int
    percentage: float

class ChartData(BaseModel):
    completion_trend: List[CompletionTrendItem]
    category_distribution: List[CategoryDistributionItem]
    priority_breakdown: List[PriorityBreakdownItem]

class TaskSummary(BaseModel):
    id: str
    title: str
    status: str
    priority: str
    due_date: str
    category: str

@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(session: Session = Depends(get_session)):
    """
    Get dashboard statistics
    Task: P2-T-XXX
    From: specs/phase-ii/dashboard-spec
    """
    all_tasks = session.exec(select(Todo)).all()

    total_tasks = len(all_tasks)
    completed = len([t for t in all_tasks if t.is_completed])

    # Calculate in-progress tasks (created but not completed)
    in_progress = len([t for t in all_tasks if not t.is_completed])

    # Calculate overdue tasks (due date passed and not completed)
    now = datetime.utcnow()
    overdue = len([
        t for t in all_tasks
        if not t.is_completed and t.due_date and t.due_date < now
    ])

    completion_rate = (completed / total_tasks * 100) if total_tasks > 0 else 0

    # Get today's tasks
    today_start = datetime.combine(datetime.today().date(), datetime.min.time())
    today_end = datetime.combine(datetime.today().date(), datetime.max.time())
    today_tasks = len([
        t for t in all_tasks
        if t.created_at >= today_start and t.created_at <= today_end
    ])

    return DashboardStats(
        total_tasks=total_tasks,
        completed=completed,
        in_progress=in_progress,
        overdue=overdue,
        completion_rate=completion_rate,
        today_tasks=today_tasks
    )

@router.get("/analytics", response_model=ChartData)
def get_analytics_data(session: Session = Depends(get_session)):
    """
    Get analytics data for charts
    Task: P2-T-XXX
    From: specs/phase-ii/dashboard-spec
    """
    all_tasks = session.exec(select(Todo)).all()

    # Generate completion trend data for last 7 days
    completion_trend = []
    for i in range(7):
        date = datetime.utcnow() - timedelta(days=i)
        date_str = date.strftime("%Y-%m-%d")

        completed_count = len([
            t for t in all_tasks
            if t.is_completed and t.completed_at and t.completed_at.date() == date.date()
        ])

        created_count = len([
            t for t in all_tasks
            if t.created_at.date() == date.date()
        ])

        completion_trend.append(
            CompletionTrendItem(
                date=date_str,
                completed=completed_count,
                created=created_count
            )
        )

    # Category distribution
    categories = {}
    for task in all_tasks:
        category = task.category or "Uncategorized"
        categories[category] = categories.get(category, 0) + 1

    category_distribution = [
        CategoryDistributionItem(
            category=cat,
            count=count,
            color=f"#{hash(cat) % 0xFFFFFF:06x}"  # Generate random color
        )
        for cat, count in categories.items()
    ]

    # Priority breakdown
    priorities = {"low": 0, "medium": 0, "high": 0}
    for task in all_tasks:
        priority = task.priority or "medium"
        priorities[priority] += 1

    total_tasks = len(all_tasks)
    priority_breakdown = [
        PriorityBreakdownItem(
            priority=pri,
            count=count,
            percentage=(count / total_tasks * 100) if total_tasks > 0 else 0
        )
        for pri, count in priorities.items()
    ]

    return ChartData(
        completion_trend=list(reversed(completion_trend)),
        category_distribution=category_distribution,
        priority_breakdown=priority_breakdown
    )

@router.get("/recent-tasks")
def get_recent_tasks(limit: int = 10, session: Session = Depends(get_session)):
    """
    Get recent tasks for dashboard
    Task: P2-T-XXX
    From: specs/phase-ii/dashboard-spec
    """
    statement = select(Todo).order_by(Todo.created_at.desc()).limit(limit)
    tasks = session.exec(statement).all()

    task_list = []
    for task in tasks:
        task_list.append({
            "id": str(task.id),
            "title": task.title,
            "status": "completed" if task.is_completed else "todo",
            "priority": task.priority or "medium",
            "due_date": task.due_date.isoformat() if task.due_date else None,
            "category": task.category or "Uncategorized"
        })

    return task_list