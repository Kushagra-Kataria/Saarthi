"""Complaint CRUD endpoints."""

from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, Query
from typing import Optional

from models import ComplaintCreate, Complaint, StatusUpdate, TimelineEvent, Status, Category, Priority, CATEGORY_DEPT_MAP
from data_store import complaints, get_next_id
from ai_classifier import classify_complaint

router = APIRouter(prefix="/api/complaints", tags=["Complaints"])


@router.get("", response_model=list[Complaint])
def list_complaints(
    category: Optional[Category] = Query(None),
    priority: Optional[Priority] = Query(None),
    status: Optional[Status] = Query(None),
):
    """List all complaints with optional filters."""
    result = complaints
    if category:
        result = [c for c in result if c.category == category]
    if priority:
        result = [c for c in result if c.priority == priority]
    if status:
        result = [c for c in result if c.status == status]
    return result


@router.get("/{complaint_id}", response_model=Complaint)
def get_complaint(complaint_id: str):
    """Get a single complaint by ID."""
    for c in complaints:
        if c.id.lower() == complaint_id.lower():
            return c
    raise HTTPException(status_code=404, detail=f"Complaint {complaint_id} not found")


@router.post("", response_model=dict)
def submit_complaint(payload: ComplaintCreate):
    """Submit a new complaint. Returns AI classification result + complaint ID."""
    now = datetime.now(timezone.utc).isoformat()

    # Duplicate detection: check description similarity against existing complaints
    new_words = set(payload.description.lower().split())
    for existing in complaints:
        existing_words = set(existing.description.lower().split())
        if not new_words or not existing_words:
            continue
        intersection = new_words & existing_words
        union = new_words | existing_words
        similarity = len(intersection) / len(union)  # Jaccard similarity
        if similarity >= 0.6:
            raise HTTPException(
                status_code=409,
                detail=f"Duplicate complaint detected. Your complaint is similar to existing complaint {existing.id}: \"{existing.title}\". Please track it instead."
            )

    complaint_id = get_next_id()

    # AI classification
    ai_result = classify_complaint(payload.title, payload.description, payload.category.value)

    # Create complaint
    new_complaint = Complaint(
        id=complaint_id,
        title=payload.title,
        description=payload.description,
        category=Category(ai_result["category"]),
        priority=Priority(ai_result["priority"]),
        status=Status.SUBMITTED,
        department=ai_result["department"],
        lat=payload.lat,
        lng=payload.lng,
        address=payload.address,
        created=now,
        updated=now,
        sentiment=ai_result["sentiment"],
        citizenName=payload.name,
        citizenMobile=payload.mobile,
        citizenEmail=payload.email,
        timeline=[
            TimelineEvent(
                status=Status.SUBMITTED,
                date=now,
                note="Complaint registered via web portal",
            )
        ],
    )
    complaints.append(new_complaint)

    return {
        "complaintId": complaint_id,
        "aiResult": ai_result,
    }


@router.patch("/{complaint_id}/status")
def update_status(complaint_id: str, update: StatusUpdate):
    """Update the status of a complaint."""
    for c in complaints:
        if c.id.lower() == complaint_id.lower():
            now = datetime.now(timezone.utc).isoformat()
            c.status = update.status
            c.updated = now
            c.timeline.append(
                TimelineEvent(status=update.status, date=now, note=update.note or f"Status updated to {update.status.value}")
            )
            return {"message": "Status updated", "complaint": c}
    raise HTTPException(status_code=404, detail=f"Complaint {complaint_id} not found")


def _haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Distance in meters between two lat/lng points."""
    import math
    R = 6371e3
    to_rad = math.radians
    d_lat = to_rad(lat2 - lat1)
    d_lon = to_rad(lon2 - lon1)
    a = math.sin(d_lat / 2) ** 2 + math.cos(to_rad(lat1)) * math.cos(to_rad(lat2)) * math.sin(d_lon / 2) ** 2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
