from pydantic import BaseModel
from typing import Optional
from enum import Enum


class Priority(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class Status(str, Enum):
    SUBMITTED = "Submitted"
    UNDER_REVIEW = "Under Review"
    ASSIGNED = "Assigned"
    IN_PROGRESS = "In Progress"
    RESOLVED = "Resolved"


class Category(str, Enum):
    ROAD = "Road"
    GARBAGE = "Garbage"
    WATER = "Water"
    ELECTRICITY = "Electricity"
    SAFETY = "Safety"
    TRANSPORT = "Transport"
    SANITATION = "Sanitation"
    OTHER = "Other"


CATEGORY_DEPT_MAP = {
    Category.ROAD: "BBMP Roads",
    Category.GARBAGE: "BBMP SWM",
    Category.WATER: "BWSSB",
    Category.ELECTRICITY: "BESCOM",
    Category.SAFETY: "BTP",
    Category.TRANSPORT: "BMTC",
    Category.SANITATION: "BBMP Health",
    Category.OTHER: "PWD",
}


class TimelineEvent(BaseModel):
    status: Status
    date: str
    note: str


class Complaint(BaseModel):
    id: str
    title: str
    description: str
    category: Category
    priority: Priority
    status: Status
    department: str
    lat: float
    lng: float
    address: str
    created: str
    updated: str
    sentiment: float
    citizenName: str
    citizenMobile: str
    citizenEmail: Optional[str] = None
    duplicateOf: Optional[str] = None
    feedback: Optional[str] = None
    rating: Optional[int] = None
    timeline: list[TimelineEvent] = []


class ComplaintCreate(BaseModel):
    name: str
    mobile: str
    email: Optional[str] = None
    title: str
    description: str
    category: Category
    lat: float
    lng: float
    address: str


class StatusUpdate(BaseModel):
    status: Status
    note: str = ""


class AIClassificationResult(BaseModel):
    category: str
    confidence: int
    priority: str
    sentiment: float
    department: str


class Department(BaseModel):
    name: str
    shortName: str
    assigned: int
    resolved: int
    avgTime: float
    rating: float
