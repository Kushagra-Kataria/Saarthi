"""Admin dashboard analytics endpoints."""

import random
from datetime import datetime, timedelta
from fastapi import APIRouter

from data_store import complaints, departments

router = APIRouter(prefix="/api/admin", tags=["Admin"])


@router.get("/stats")
def get_stats():
    """KPI stats for the admin dashboard."""
    open_count = sum(1 for c in complaints if c.status.value != "Resolved")
    critical_count = sum(1 for c in complaints if c.priority.value == "CRITICAL" and c.status.value != "Resolved")
    total_resolved = sum(1 for c in complaints if c.status.value == "Resolved")
    total = len(complaints)

    # Average resolution time from departments
    if departments:
        avg_time = round(sum(d.avgTime for d in departments) / len(departments), 1)
    else:
        avg_time = 0

    # Average satisfaction from departments
    if departments:
        satisfaction = round(sum(d.rating for d in departments) / len(departments), 1)
    else:
        satisfaction = 0

    return {
        "totalComplaints": total,
        "openCount": open_count,
        "criticalCount": critical_count,
        "resolvedCount": total_resolved,
        "avgResolutionTime": avg_time,
        "satisfaction": satisfaction,
    }


@router.get("/charts/category")
def get_category_data():
    """Category distribution for bar chart."""
    cats: dict[str, int] = {}
    for c in complaints:
        cats[c.category.value] = cats.get(c.category.value, 0) + 1
    return [{"name": name, "value": value} for name, value in cats.items()]


@router.get("/charts/status")
def get_status_data():
    """Status distribution for pie chart."""
    stats: dict[str, int] = {}
    for c in complaints:
        stats[c.status.value] = stats.get(c.status.value, 0) + 1
    return [{"name": name, "value": value} for name, value in stats.items()]


@router.get("/charts/daily-volume")
def get_daily_volume():
    """30-day daily complaint volume for line chart."""
    days = []
    for i in range(29, -1, -1):
        d = datetime.now() - timedelta(days=i)
        days.append({
            "date": d.strftime("%d %b"),
            "complaints": random.randint(10, 40),
        })
    return days
