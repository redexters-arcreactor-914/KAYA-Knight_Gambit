from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models
from ..auth import get_current_officer

router = APIRouter(prefix="/audit", tags=["audit"])


@router.get("/log")
def get_audit_log(db: Session = Depends(get_db), officer=Depends(get_current_officer)):
    """
    Full history of who filed what record, when. Supervisor-only — this is
    an accountability tool, not something every officer should be able to
    browse about their colleagues.
    """
    if officer.role != "supervisor":
        raise HTTPException(status_code=403, detail="Only a supervisor can view the audit log")

    officers_by_id = {o.id: o for o in db.query(models.Officer).all()}

    def officer_info(officer_id):
        o = officers_by_id.get(officer_id)
        if not o:
            return {"username": None, "full_name": "Unknown / pre-existing seed data", "role": None}
        return {"username": o.username, "full_name": o.full_name, "role": o.role}

    entries = []

    for r in db.query(models.CrimeReport).all():
        entries.append({
            "record_type": "crime_report",
            "id": r.id,
            "entity_id": r.entity_id,
            "summary": f"{r.crime_type} — {r.place or 'location unspecified'}",
            "filed_at": r.created_at.isoformat() if r.created_at else None,
            "officer": officer_info(r.logged_by_officer_id),
        })

    for f in db.query(models.FinancialFlow).all():
        entries.append({
            "record_type": "financial_flow",
            "id": f.id,
            "entity_id": f.from_entity,
            "summary": f"{f.amount} {f.currency} — {f.purpose}",
            "filed_at": f.created_at.isoformat() if f.created_at else None,
            "officer": officer_info(f.logged_by_officer_id),
        })

    for c in db.query(models.CommunicationLink).all():
        entries.append({
            "record_type": "communication_link",
            "id": c.id,
            "entity_id": c.entity_1,
            "summary": f"{c.call_count} calls with {c.entity_2}",
            "filed_at": c.created_at.isoformat() if c.created_at else None,
            "officer": officer_info(c.logged_by_officer_id),
        })

    # Most recent first; entries with no timestamp (pre-existing seed data) sort last
    entries.sort(key=lambda e: e["filed_at"] or "", reverse=True)
    return {"entries": entries}
