from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from backend.database import get_database
from backend.schemas import IncidentCreate, IncidentUpdate, IncidentResponse

router = APIRouter(prefix="/incidents", tags=["Incidents (CRUD)"])


@router.post("", response_model=IncidentResponse, status_code=status.HTTP_201_CREATED)
async def create_incident(incident: IncidentCreate, db = Depends(get_database)):
    """Create a new road safety incident"""
    count = await db.incidents.count_documents({})
    incident_dict = incident.model_dump()
    incident_dict["id"] = count + 1
    incident_dict["status"] = "reported"
    incident_dict["created_at"] = datetime.utcnow()
    incident_dict["updated_at"] = datetime.utcnow()
    
    await db.incidents.insert_one(incident_dict)
    return incident_dict


@router.get("", response_model=List[IncidentResponse])
async def list_incidents(
    skip: int = 0,
    limit: int = 100,
    db = Depends(get_database)
):
    """List all road safety incidents"""
    incidents = await db.incidents.find({}).skip(skip).limit(limit).to_list(limit)
    return incidents


@router.get("/{incident_id}", response_model=IncidentResponse)
async def get_incident(incident_id: int, db = Depends(get_database)):
    """Get a specific incident by ID"""
    incident = await db.incidents.find_one({"id": incident_id})
    if not incident:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Incident with id {incident_id} not found"
        )
    return incident


@router.put("/{incident_id}", response_model=IncidentResponse)
async def update_incident(
    incident_id: int,
    incident_update: IncidentUpdate,
    db = Depends(get_database)
):
    """Update an existing incident"""
    incident = await db.incidents.find_one({"id": incident_id})
    if not incident:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Incident with id {incident_id} not found"
        )
    
    update_data = incident_update.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    await db.incidents.update_one({"id": incident_id}, {"$set": update_data})
    updated = await db.incidents.find_one({"id": incident_id})
    return updated


@router.delete("/{incident_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_incident(incident_id: int, db = Depends(get_database)):
    """Delete an incident"""
    res = await db.incidents.delete_one({"id": incident_id})
    if res.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Incident with id {incident_id} not found"
        )
    return None
