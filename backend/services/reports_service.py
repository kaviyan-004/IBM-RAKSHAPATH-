from typing import List, Optional
from sqlalchemy.orm import Session
from backend.models import Corridor
from backend.schemas import AuthorityReport


def get_reports(db: Session, district: Optional[str] = None) -> List[AuthorityReport]:
    corridors = db.query(Corridor).all()
    reports = [
        AuthorityReport(
            reportId="rep-morth-2026",
            district="National Network",
            title="MoRTH & NCRB AI Road Safety Comprehensive Audit",
            generatedAt="2026-09-12T21:00:00Z",
            fileName="National_Road_Safety_Audit_2026.pdf",
            kind="district"
        ),
        AuthorityReport(
            reportId="rep-budget-opt",
            district="Coimbatore",
            title="District Capital Allocation & Safety Budget Optimization Report",
            generatedAt="2026-09-12T20:30:00Z",
            fileName="Coimbatore_Safety_Budget_Allocation.pdf",
            kind="budget"
        )
    ]

    for c in corridors[:4]:
        reports.append(
            AuthorityReport(
                reportId=f"rep-{c.id}",
                locationId=c.id,
                title=f"{c.corridor_name} - Corridor Safety & Intervention Report",
                generatedAt="2026-09-12T20:00:00Z",
                fileName=f"{c.corridor_name.replace(' ', '_')}_Report.pdf",
                kind="location"
            )
        )

    return reports
