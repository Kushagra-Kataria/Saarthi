"""
Saarthi PS-CRM — FastAPI Backend
"""

import sys
import os

# Ensure Backend directory is on the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import complaints, admin, departments, heatmap

app = FastAPI(
    title="Saarthi PS-CRM API",
    description="Backend API for the Smart Public Service CRM platform",
    version="1.0.0",
)

# CORS — allow the Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173", "http://127.0.0.1:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers
app.include_router(complaints.router)
app.include_router(admin.router)
app.include_router(departments.router)
app.include_router(heatmap.router)


@app.get("/")
def root():
    return {"message": "Saarthi PS-CRM API is running", "docs": "/docs"}