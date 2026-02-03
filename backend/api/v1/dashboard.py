"""
Dashboard API endpoints for statistics and analytics
Task: P2-T-088
From: specs/phase-ii/dashboard-spec
"""

from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List
from datetime import datetime, timedelta, date
from models.todo import Todo
from models.user import User
from utils.security import get_current_user
from database.session import get_session
from models.dashboard import DashboardStats, CompletionTrendItem, CategoryDistributionItem, PriorityBreakdownItem, ChartData, TaskSummary

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get dashboard statistics
    Task: P2-T-088
    From: specs/phase-ii/dashboard-spec
    """
    # Get only tasks for the current user
    statement = select(Todo).where(Todo.user_id == current_user.id)
    all_tasks = session.exec(statement).all()

    total_tasks = len(all_tasks)
    completed = len([t for t in all_tasks if t.completed])

    # Calculate in-progress tasks (created but not completed)
    in_progress = len([t for t in all_tasks if not t.completed])

    # Calculate overdue tasks (due date passed and not completed)
    now = datetime.utcnow()
    overdue = len([
        t for t in all_tasks
        if t.due_date and not t.completed and t.due_date < now
    ])

    completion_rate = (completed / total_tasks * 100) if total_tasks > 0 else 0

    # Get today's tasks
    today_tasks = len([
        t for t in all_tasks
        if t.created_at.date() == datetime.today().date()
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
def get_analytics_data(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get analytics data for charts
    Task: P2-T-089
    From: specs/phase-ii/dashboard-spec
    """
    # Get only tasks for the current user
    statement = select(Todo).where(Todo.user_id == current_user.id)
    all_tasks = session.exec(statement).all()

    # Generate completion trend data for last 7 days
    completion_trend = []
    for i in range(7):
        date = datetime.utcnow() - timedelta(days=i)
        date_str = date.strftime("%Y-%m-%d")

        completed_count = len([
            t for t in all_tasks
            if t.completed and t.updated_at.date() == date.date()
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

    # Generate category distribution data
    category_counts = {}
    for task in all_tasks:
        category = task.category
        if category in category_counts:
            category_counts[category] += 1
        else:
            category_counts[category] = 1

    # Define colors for categories (could be extended)
    category_colors = {
        "General": "#3B82F6",  # blue-500
        "Work": "#EF4444",     # red-500
        "Personal": "#10B981", # green-500
        "Shopping": "#F59E0B", # amber-500
        "Health": "#8B5CF6",   # violet-500
        "Finance": "#EC4899",  # pink-500
    }

    category_distribution = [
        CategoryDistributionItem(
            category=cat,
            count=count,
            color=category_colors.get(cat, "#6B7280")  # gray-500 as default
        )
        for cat, count in category_counts.items()
    ]

    # Generate priority breakdown data
    priority_counts = {}
    for task in all_tasks:
        priority = task.priority
        if priority in priority_counts:
            priority_counts[priority] += 1
        else:
            priority_counts[priority] = 1

    total_tasks = len(all_tasks)
    priority_breakdown = []
    for priority, count in priority_counts.items():
        percentage = (count / total_tasks * 100) if total_tasks > 0 else 0
        priority_breakdown.append(
            PriorityBreakdownItem(
                priority=priority,
                count=count,
                percentage=round(percentage, 2)
            )
        )

    return ChartData(
        completion_trend=list(reversed(completion_trend)),
        category_distribution=category_distribution,
        priority_breakdown=priority_breakdown
    )

@router.get("/recent-tasks", response_model=List[TaskSummary])
def get_recent_tasks(
    limit: int = 10,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get recent tasks for dashboard
    Task: P2-T-090
    From: specs/phase-ii/dashboard-spec
    """
    statement = select(Todo).where(Todo.user_id == current_user.id).order_by(Todo.created_at.desc()).limit(limit)
    tasks = session.exec(statement).all()

    task_list = []
    for task in tasks:
        task_list.append(TaskSummary(
            id=str(task.id),
            title=task.title,
            description=task.description or "",
            completed=task.completed,
            due_date=task.due_date,
            priority=task.priority,
            category=task.category,
            created_at=task.created_at,
            updated_at=task.updated_at
        ))

    return task_list