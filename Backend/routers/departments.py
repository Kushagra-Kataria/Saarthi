"""Department endpoints."""

from fastapi import APIRouter
from models import Department
from data_store import departments

router = APIRouter(prefix="/api/departments", tags=["Departments"])


@router.get("", response_model=list[Department])
def list_departments():
    """List all departments with performance metrics."""
    return departments
