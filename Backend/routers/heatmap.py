"""Heatmap and hotspot endpoints."""

from fastapi import APIRouter, Query
from typing import Optional

from models import Category, Priority
from data_store import complaints

router = APIRouter(prefix="/api/heatmap", tags=["Heatmap"])


@router.get("/points")
def get_heatmap_points(
    categories: Optional[str] = Query(None, description="Comma-separated categories"),
    priorities: Optional[str] = Query(None, description="Comma-separated priorities"),
):
    """Heatmap data points with optional category/priority filters."""
    filtered = list(complaints)

    if categories:
        cat_set = set(categories.split(","))
        filtered = [c for c in filtered if c.category.value in cat_set]

    if priorities:
        pri_set = set(priorities.split(","))
        filtered = [c for c in filtered if c.priority.value in pri_set]

    points = []
    for c in filtered:
        intensity = 1.0 if c.priority.value == "CRITICAL" else 0.7 if c.priority.value == "HIGH" else 0.4
        points.append({"lat": c.lat, "lng": c.lng, "intensity": intensity})

    return points


@router.get("/hotspots")
def get_hotspots(
    categories: Optional[str] = Query(None),
    priorities: Optional[str] = Query(None),
):
    """Top hotspot zone counts."""
    filtered = list(complaints)

    if categories:
        cat_set = set(categories.split(","))
        filtered = [c for c in filtered if c.category.value in cat_set]

    if priorities:
        pri_set = set(priorities.split(","))
        filtered = [c for c in filtered if c.priority.value in pri_set]

    zones = [
        {"name": "Indiranagar", "count": sum(1 for c in filtered if 12.96 < c.lat < 12.98 and 77.63 < c.lng < 77.65)},
        {"name": "Koramangala", "count": sum(1 for c in filtered if 12.92 < c.lat < 12.94 and 77.61 < c.lng < 77.63)},
        {"name": "Whitefield", "count": sum(1 for c in filtered if 12.96 < c.lat < 12.98 and 77.74 < c.lng < 77.76)},
        {"name": "Hebbal", "count": sum(1 for c in filtered if 13.02 < c.lat < 13.05 and 77.58 < c.lng < 77.61)},
        {"name": "Malleshwaram", "count": sum(1 for c in filtered if 12.99 < c.lat < 13.01 and 77.56 < c.lng < 77.58)},
    ]
    zones.sort(key=lambda z: z["count"], reverse=True)
    return zones
