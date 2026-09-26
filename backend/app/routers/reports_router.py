# # from typing import Optional
# # from datetime import date as date_type
# # from fastapi import APIRouter, Depends, HTTPException
# # from sqlalchemy.orm import Session

# # from pydantic import BaseModel

# # from ..database import get_db
# # from .. import models, schemas
# # from ..auth import get_current_officer
# # from ..ml.crime_classifier import suggest_category

# # router = APIRouter(prefix="/reports", tags=["reports"])


# # class CategorySuggestRequest(BaseModel):
# #     description: str


# # @router.post("/crime/suggest-category")
# # def suggest_crime_category(payload: CategorySuggestRequest, officer=Depends(get_current_officer)):
# #     """
# #     FIR officer types a description, this suggests likely crime_type categories.
# #     See app/ml/crime_classifier.py docstring for an honest note on accuracy —
# #     this is a small demo model, not validated on real FIR data.
# #     """
# #     return {"suggestions": suggest_category(payload.description)}


# # def require_role(officer, allowed_roles):
# #     if officer.role not in allowed_roles and officer.role != "supervisor":
# #         raise HTTPException(status_code=403, detail=f"Only {allowed_roles} officers can file this report")


# # @router.post("/crime")
# # def file_crime_report(payload: schemas.CrimeReportCreate, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
# #     require_role(officer, ["fir"])
# #     entity = db.query(models.Entity).filter(models.Entity.id == payload.entity_id).first()
# #     if not entity:
# #         raise HTTPException(status_code=404, detail="Suspect not found")
# #     report = models.CrimeReport(
# #         entity_id=payload.entity_id, crime_type=payload.crime_type, place=payload.place,
# #         date=payload.date, description=payload.description, drug_related=int(payload.drug_related),
# #         logged_by_officer_id=officer.id,
# #     )
# #     db.add(report)
# #     db.commit()
# #     return {"status": "filed", "id": report.id}


# # @router.post("/financial")
# # def file_financial_flag(payload: schemas.FinancialFlowCreate, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
# #     require_role(officer, ["financial"])
# #     entity = db.query(models.Entity).filter(models.Entity.id == payload.from_entity).first()
# #     if not entity:
# #         raise HTTPException(status_code=404, detail="Suspect not found")
# #     flow = models.FinancialFlow(
# #         from_entity=payload.from_entity, to_entity=payload.to_entity, amount=payload.amount,
# #         currency=payload.currency, date=payload.date, purpose=payload.purpose,
# #         context=payload.context, logged_by_officer_id=officer.id,
# #     )
# #     db.add(flow)
# #     db.commit()
# #     return {"status": "filed", "id": flow.id}


# # @router.post("/call")
# # def file_call_record(payload: schemas.CommunicationCreate, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
# #     require_role(officer, ["call_recording"])
# #     link = models.CommunicationLink(
# #         entity_1=payload.entity_1, entity_2=payload.entity_2, call_count=payload.call_count,
# #         note=payload.note, logged_by_officer_id=officer.id,
# #     )
# #     db.add(link)
# #     db.commit()
# #     return {"status": "filed", "id": link.id}


# # @router.get("/filter")
# # def filter_reports(
# #     crime_type: Optional[str] = None,
# #     place: Optional[str] = None,
# #     drug_related: Optional[bool] = None,
# #     date_from: Optional[date_type] = None,
# #     date_to: Optional[date_type] = None,
# #     db: Session = Depends(get_db),
# #     officer=Depends(get_current_officer),
# # ):
# #     """Backs the Criminal Reports page filter bar (time, date, place, drugs...)."""
# #     q = db.query(models.CrimeReport)
# #     if crime_type:
# #         q = q.filter(models.CrimeReport.crime_type.ilike(f"%{crime_type}%"))
# #     if place:
# #         q = q.filter(models.CrimeReport.place.ilike(f"%{place}%"))
# #     if drug_related is not None:
# #         q = q.filter(models.CrimeReport.drug_related == int(drug_related))
# #     if date_from:
# #         q = q.filter(models.CrimeReport.date >= date_from)
# #     if date_to:
# #         q = q.filter(models.CrimeReport.date <= date_to)
# #     results = q.all()
# #     return [{
# #         "id": r.id, "entity_id": r.entity_id, "crime_type": r.crime_type, "place": r.place,
# #         "date": str(r.date) if r.date else None, "description": r.description,
# #         "drug_related": bool(r.drug_related),
# #     } for r in results]


# from typing import Optional
# from datetime import date as date_type
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session

# from pydantic import BaseModel

# from ..database import get_db
# from .. import models, schemas
# from ..auth import get_current_officer
# from ..ml.crime_classifier import suggest_category
# from ..entity_resolver import resolve_or_create_entity

# router = APIRouter(prefix="/reports", tags=["reports"])


# class CategorySuggestRequest(BaseModel):
#     description: str


# @router.post("/crime/suggest-category")
# def suggest_crime_category(payload: CategorySuggestRequest, officer=Depends(get_current_officer)):
#     """
#     FIR officer types a description, this suggests likely crime_type categories.
#     See app/ml/crime_classifier.py docstring for an honest note on accuracy —
#     this is a small demo model, not validated on real FIR data.
#     """
#     return {"suggestions": suggest_category(payload.description)}


# def require_role(officer, allowed_roles):
#     if officer.role not in allowed_roles and officer.role != "supervisor":
#         raise HTTPException(status_code=403, detail=f"Only {allowed_roles} officers can file this report")


# @router.post("/crime")
# def file_crime_report(payload: schemas.CrimeReportCreate, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
#     require_role(officer, ["fir"])
#     entity = resolve_or_create_entity(db, payload.entity_id)
#     report = models.CrimeReport(
#         entity_id=entity.id, crime_type=payload.crime_type, place=payload.place,
#         date=payload.date, description=payload.description, drug_related=int(payload.drug_related),
#         logged_by_officer_id=officer.id,
#     )
#     db.add(report)
#     db.commit()
#     return {"status": "filed", "id": report.id, "entity_id": entity.id, "entity_name": entity.name}


# @router.post("/financial")
# def file_financial_flag(payload: schemas.FinancialFlowCreate, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
#     require_role(officer, ["financial"])
#     from_entity = resolve_or_create_entity(db, payload.from_entity)
#     to_entity = resolve_or_create_entity(db, payload.to_entity)
#     flow = models.FinancialFlow(
#         from_entity=from_entity.id, to_entity=to_entity.id, amount=payload.amount,
#         currency=payload.currency, date=payload.date, purpose=payload.purpose,
#         context=payload.context, logged_by_officer_id=officer.id,
#     )
#     db.add(flow)
#     db.commit()
#     return {"status": "filed", "id": flow.id}


# @router.post("/call")
# def file_call_record(payload: schemas.CommunicationCreate, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
#     require_role(officer, ["call_recording"])
#     entity_1 = resolve_or_create_entity(db, payload.entity_1)
#     entity_2 = resolve_or_create_entity(db, payload.entity_2)
#     link = models.CommunicationLink(
#         entity_1=entity_1.id, entity_2=entity_2.id, call_count=payload.call_count,
#         note=payload.note, logged_by_officer_id=officer.id,
#     )
#     db.add(link)
#     db.commit()
#     return {"status": "filed", "id": link.id}


# @router.get("/filter")
# def filter_reports(
#     crime_type: Optional[str] = None,
#     place: Optional[str] = None,
#     drug_related: Optional[bool] = None,
#     date_from: Optional[date_type] = None,
#     date_to: Optional[date_type] = None,
#     db: Session = Depends(get_db),
#     officer=Depends(get_current_officer),
# ):
#     """Backs the Criminal Reports page filter bar (time, date, place, drugs...)."""
#     q = db.query(models.CrimeReport)
#     if crime_type:
#         q = q.filter(models.CrimeReport.crime_type.ilike(f"%{crime_type}%"))
#     if place:
#         q = q.filter(models.CrimeReport.place.ilike(f"%{place}%"))
#     if drug_related is not None:
#         q = q.filter(models.CrimeReport.drug_related == int(drug_related))
#     if date_from:
#         q = q.filter(models.CrimeReport.date >= date_from)
#     if date_to:
#         q = q.filter(models.CrimeReport.date <= date_to)
#     results = q.all()
#     return [{
#         "id": r.id, "entity_id": r.entity_id, "crime_type": r.crime_type, "place": r.place,
#         "date": str(r.date) if r.date else None, "description": r.description,
#         "drug_related": bool(r.drug_related),
#     } for r in results]


from typing import Optional
from datetime import date as date_type
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from pydantic import BaseModel

from ..database import get_db
from .. import models, schemas
from ..auth import get_current_officer
from ..ml.crime_classifier import suggest_category
from ..entity_resolver import resolve_or_create_entity

router = APIRouter(prefix="/reports", tags=["reports"])


class CategorySuggestRequest(BaseModel):
    description: str


@router.post("/crime/suggest-category")
def suggest_crime_category(payload: CategorySuggestRequest, officer=Depends(get_current_officer)):
    """
    FIR officer types a description, this suggests likely crime_type categories.
    See app/ml/crime_classifier.py docstring for an honest note on accuracy —
    this is a small demo model, not validated on real FIR data.
    """
    return {"suggestions": suggest_category(payload.description)}


def require_role(officer, allowed_roles):
    if officer.role not in allowed_roles and officer.role != "supervisor":
        raise HTTPException(status_code=403, detail=f"Only {allowed_roles} officers can file this report")


@router.post("/crime")
def file_crime_report(payload: schemas.CrimeReportCreate, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
    require_role(officer, ["fir"])
    entity = resolve_or_create_entity(db, payload.entity_id)
    report = models.CrimeReport(
        entity_id=entity.id, crime_type=payload.crime_type, place=payload.place,
        date=payload.date, description=payload.description, drug_related=int(payload.drug_related),
        vehicle_info=payload.vehicle_info, logged_by_officer_id=officer.id,
    )
    db.add(report)
    db.commit()
    return {"status": "filed", "id": report.id, "entity_id": entity.id, "entity_name": entity.name}


@router.post("/financial")
def file_financial_flag(payload: schemas.FinancialFlowCreate, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
    require_role(officer, ["financial"])
    from_entity = resolve_or_create_entity(db, payload.from_entity)
    to_entity = resolve_or_create_entity(db, payload.to_entity)
    flow = models.FinancialFlow(
        from_entity=from_entity.id, to_entity=to_entity.id, amount=payload.amount,
        currency=payload.currency, date=payload.date, purpose=payload.purpose,
        context=payload.context, logged_by_officer_id=officer.id,
    )
    db.add(flow)
    db.commit()
    return {"status": "filed", "id": flow.id}


@router.post("/call")
def file_call_record(payload: schemas.CommunicationCreate, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
    require_role(officer, ["call_recording"])
    entity_1 = resolve_or_create_entity(db, payload.entity_1)
    entity_2 = resolve_or_create_entity(db, payload.entity_2)
    link = models.CommunicationLink(
        entity_1=entity_1.id, entity_2=entity_2.id, call_count=payload.call_count,
        note=payload.note, logged_by_officer_id=officer.id,
    )
    db.add(link)
    db.commit()
    return {"status": "filed", "id": link.id}


@router.get("/filter")
def filter_reports(
    crime_type: Optional[str] = None,
    place: Optional[str] = None,
    drug_related: Optional[bool] = None,
    date_from: Optional[date_type] = None,
    date_to: Optional[date_type] = None,
    db: Session = Depends(get_db),
    officer=Depends(get_current_officer),
):
    """Backs the Criminal Reports page filter bar (time, date, place, drugs...)."""
    q = db.query(models.CrimeReport)
    if crime_type:
        q = q.filter(models.CrimeReport.crime_type.ilike(f"%{crime_type}%"))
    if place:
        q = q.filter(models.CrimeReport.place.ilike(f"%{place}%"))
    if drug_related is not None:
        q = q.filter(models.CrimeReport.drug_related == int(drug_related))
    if date_from:
        q = q.filter(models.CrimeReport.date >= date_from)
    if date_to:
        q = q.filter(models.CrimeReport.date <= date_to)
    results = q.all()
    return [{
        "id": r.id, "entity_id": r.entity_id,
        "entity_name": (db.query(models.Entity.name).filter(models.Entity.id == r.entity_id).scalar() or r.entity_id),
        "crime_type": r.crime_type, "place": r.place,
        "date": str(r.date) if r.date else None, "description": r.description,
        "drug_related": bool(r.drug_related), "vehicle_info": r.vehicle_info,
    } for r in results]
