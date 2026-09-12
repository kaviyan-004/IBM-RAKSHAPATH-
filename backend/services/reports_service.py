from datetime import datetime
from typing import List
from fastapi import HTTPException, status
from backend.schemas import AuthorityReportResponse


def _to_report_response(r: dict) -> AuthorityReportResponse:
    return AuthorityReportResponse(
        report_id=r["report_id"],
        location_id=r.get("location_id"),
        district=r.get("district"),
        title=r["title"],
        generated_at=r.get("generated_at", ""),
        file_name=r["file_name"],
        kind=r.get("kind", "location"),
    )


async def get_all_reports(db) -> List[AuthorityReportResponse]:
    reports = await db.reports.find({}).sort("generated_at", -1).to_list(100)
    return [_to_report_response(r) for r in reports]


async def get_location_report(db, location_id: str) -> AuthorityReportResponse:
    report = await db.reports.find_one({"location_id": location_id})
    if report:
        return _to_report_response(report)

    loc = await db.locations.find_one({"location_id": location_id})
    if not loc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Location {location_id} not found"
        )

    new_report = {
        "report_id": f"rep-{location_id}",
        "location_id": loc["location_id"],
        "district": loc.get("district", "Coimbatore"),
        "title": f"{loc['name']} - Location Report",
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "file_name": f"{loc['name'].replace(' ', '_')}_Report.pdf",
        "kind": "location",
    }
    await db.reports.insert_one(new_report)

    return _to_report_response(new_report)
