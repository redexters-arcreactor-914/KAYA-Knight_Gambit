# # # from typing import Optional
# # # from fastapi import APIRouter, Depends, HTTPException
# # # from sqlalchemy.orm import Session
# # # from sqlalchemy import or_

# # # from ..database import get_db
# # # from .. import models, schemas
# # # from ..auth import get_current_officer

# # # router = APIRouter(prefix="/entities", tags=["entities"])


# # # @router.get("", response_model=list[schemas.EntityOut])
# # # def list_entities(
# # #     name: Optional[str] = None,
# # #     country_base: Optional[str] = None,
# # #     influence_level: Optional[str] = None,
# # #     cluster_id: Optional[str] = None,
# # #     db: Session = Depends(get_db),
# # #     officer=Depends(get_current_officer),
# # # ):
# # #     """Filterable list of entities — backs the Criminal Reports table."""
# # #     q = db.query(models.Entity)
# # #     if name:
# # #         q = q.filter(models.Entity.name.ilike(f"%{name}%"))
# # #     if country_base:
# # #         q = q.filter(models.Entity.country_base == country_base)
# # #     if influence_level:
# # #         q = q.filter(models.Entity.influence_level == influence_level)
# # #     if cluster_id:
# # #         q = q.filter(models.Entity.cluster_id == cluster_id)
# # #     return q.all()


# # # @router.get("/{entity_id}/profile", response_model=schemas.SuspectProfile)
# # # def get_suspect_profile(entity_id: str, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
# # #     """Full profile for the Suspect Profile page and the Graph side-card."""
# # #     entity = db.query(models.Entity).filter(models.Entity.id == entity_id).first()
# # #     if not entity:
# # #         raise HTTPException(status_code=404, detail="Entity not found")

# # #     crime_reports = db.query(models.CrimeReport).filter(models.CrimeReport.entity_id == entity_id).all()
# # #     financial = db.query(models.FinancialFlow).filter(
# # #         or_(models.FinancialFlow.from_entity == entity_id, models.FinancialFlow.to_entity == entity_id)
# # #     ).all()
# # #     comms = db.query(models.CommunicationLink).filter(
# # #         or_(models.CommunicationLink.entity_1 == entity_id, models.CommunicationLink.entity_2 == entity_id)
# # #     ).all()

# # #     # Top connections = comm partners sorted by call_count desc
# # #     top_connections = []
# # #     for c in sorted(comms, key=lambda x: x.call_count or 0, reverse=True)[:5]:
# # #         other_id = c.entity_2 if c.entity_1 == entity_id else c.entity_1
# # #         other = db.query(models.Entity).filter(models.Entity.id == other_id).first()
# # #         if other:
# # #             top_connections.append({"id": other.id, "name": other.name, "call_count": c.call_count})

# # #     return schemas.SuspectProfile(
# # #         entity=entity,
# # #         crime_reports=[{
# # #             "id": r.id, "crime_type": r.crime_type, "place": r.place,
# # #             "date": str(r.date) if r.date else None, "description": r.description,
# # #             "drug_related": bool(r.drug_related),
# # #         } for r in crime_reports],
# # #         financial_flows=[{
# # #             "id": f.id, "from_entity": f.from_entity, "to_entity": f.to_entity,
# # #             "amount": f.amount, "currency": f.currency,
# # #             "date": str(f.date) if f.date else None, "purpose": f.purpose, "context": f.context,
# # #         } for f in financial],
# # #         communications=[{
# # #             "id": c.id, "entity_1": c.entity_1, "entity_2": c.entity_2,
# # #             "call_count": c.call_count, "note": c.note,
# # #         } for c in comms],
# # #         top_connections=top_connections,
# # #     )


# # from typing import Optional
# # from fastapi import APIRouter, Depends, HTTPException
# # from sqlalchemy.orm import Session
# # from sqlalchemy import or_

# # from ..database import get_db
# # from .. import models, schemas
# # from ..auth import get_current_officer

# # router = APIRouter(prefix="/entities", tags=["entities"])


# # @router.get("", response_model=list[schemas.EntityOut])
# # def list_entities(
# #     name: Optional[str] = None,
# #     country_base: Optional[str] = None,
# #     influence_level: Optional[str] = None,
# #     cluster_id: Optional[str] = None,
# #     q: Optional[str] = None,
# #     db: Session = Depends(get_db),
# #     officer=Depends(get_current_officer),
# # ):
# #     """Filterable list of entities — backs the Criminal Reports table and Search page.
# #     `q` is a free-text search across name, phone number, affiliation, and country —
# #     use this for the global Search bar. The other params are precise column filters."""
# #     query = db.query(models.Entity)
# #     if name:
# #         query = query.filter(models.Entity.name.ilike(f"%{name}%"))
# #     if country_base:
# #         query = query.filter(models.Entity.country_base == country_base)
# #     if influence_level:
# #         query = query.filter(models.Entity.influence_level == influence_level)
# #     if cluster_id:
# #         query = query.filter(models.Entity.cluster_id == cluster_id)
# #     if q:
# #         like = f"%{q}%"
# #         query = query.filter(or_(
# #             models.Entity.name.ilike(like),
# #             models.Entity.phone_number.ilike(like),
# #             models.Entity.country_base.ilike(like),
# #             models.Entity.affiliation.ilike(like),
# #         ))
# #     return query.all()


# # @router.get("/{entity_id}/profile", response_model=schemas.SuspectProfile)
# # def get_suspect_profile(entity_id: str, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
# #     """Full profile for the Suspect Profile page and the Graph side-card."""
# #     entity = db.query(models.Entity).filter(models.Entity.id == entity_id).first()
# #     if not entity:
# #         raise HTTPException(status_code=404, detail="Entity not found")

# #     crime_reports = db.query(models.CrimeReport).filter(models.CrimeReport.entity_id == entity_id).all()
# #     financial = db.query(models.FinancialFlow).filter(
# #         or_(models.FinancialFlow.from_entity == entity_id, models.FinancialFlow.to_entity == entity_id)
# #     ).all()
# #     comms = db.query(models.CommunicationLink).filter(
# #         or_(models.CommunicationLink.entity_1 == entity_id, models.CommunicationLink.entity_2 == entity_id)
# #     ).all()

# #     # Top connections = comm partners sorted by call_count desc
# #     top_connections = []
# #     for c in sorted(comms, key=lambda x: x.call_count or 0, reverse=True)[:5]:
# #         other_id = c.entity_2 if c.entity_1 == entity_id else c.entity_1
# #         other = db.query(models.Entity).filter(models.Entity.id == other_id).first()
# #         if other:
# #             top_connections.append({"id": other.id, "name": other.name, "call_count": c.call_count})

# #     return schemas.SuspectProfile(
# #         entity=entity,
# #         crime_reports=[{
# #             "id": r.id, "crime_type": r.crime_type, "place": r.place,
# #             "date": str(r.date) if r.date else None, "description": r.description,
# #             "drug_related": bool(r.drug_related),
# #         } for r in crime_reports],
# #         financial_flows=[{
# #             "id": f.id, "from_entity": f.from_entity, "to_entity": f.to_entity,
# #             "amount": f.amount, "currency": f.currency,
# #             "date": str(f.date) if f.date else None, "purpose": f.purpose, "context": f.context,
# #         } for f in financial],
# #         communications=[{
# #             "id": c.id, "entity_1": c.entity_1, "entity_2": c.entity_2,
# #             "call_count": c.call_count, "note": c.note,
# #         } for c in comms],
# #         top_connections=top_connections,
# #     )


# import re
# from typing import Optional
# from fastapi import APIRouter, Depends, HTTPException
# from pydantic import BaseModel
# from sqlalchemy.orm import Session
# from sqlalchemy import or_

# from ..database import get_db
# from .. import models, schemas
# from ..auth import get_current_officer

# router = APIRouter(prefix="/entities", tags=["entities"])


# class EntityCreate(BaseModel):
#     name: str
#     role: Optional[str] = None
#     affiliation: Optional[str] = None
#     country_base: Optional[str] = None
#     phone_number: Optional[str] = None
#     force: bool = False  # set true to create anyway despite a name-match warning


# def _slugify(name: str) -> str:
#     slug = re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_")
#     return slug or "suspect"


# @router.post("", response_model=schemas.EntityOut)
# def create_entity(payload: EntityCreate, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
#     """
#     Lets ANY officer role add a brand-new suspect on the spot — e.g. a name
#     that showed up in a fresh FIR, or an unknown number/account discovered
#     mid-investigation. New suspects start in cluster_id="unclustered" so a
#     supervisor can assign them to a proper cluster later from the Graph page.
#     """
#     name = payload.name.strip()
#     if not name:
#         raise HTTPException(status_code=422, detail="Name is required")

#     existing = db.query(models.Entity).filter(models.Entity.name.ilike(name)).first()
#     if existing and not payload.force:
#         raise HTTPException(
#             status_code=409,
#             detail=f"A suspect named '{existing.name}' already exists (id: {existing.id}). "
#                    f"Resubmit with force=true if this is genuinely a different person.",
#         )

#     base_id = _slugify(name)
#     new_id = base_id
#     n = 1
#     while db.query(models.Entity).filter(models.Entity.id == new_id).first():
#         n += 1
#         new_id = f"{base_id}_{n}"

#     entity = models.Entity(
#         id=new_id, name=name, type="person",
#         role=payload.role, affiliation=payload.affiliation,
#         country_base=payload.country_base, phone_number=payload.phone_number,
#         cluster_id="unclustered", cluster_label="Unclustered (new)",
#         influence_level="low",
#         description="Added directly by an officer — not yet assigned to a cluster.",
#     )
#     db.add(entity)
#     db.commit()
#     db.refresh(entity)
#     return entity


# @router.get("", response_model=list[schemas.EntityOut])
# def list_entities(
#     name: Optional[str] = None,
#     country_base: Optional[str] = None,
#     influence_level: Optional[str] = None,
#     cluster_id: Optional[str] = None,
#     q: Optional[str] = None,
#     db: Session = Depends(get_db),
#     officer=Depends(get_current_officer),
# ):
#     """Filterable list of entities — backs the Criminal Reports table and Search page.
#     `q` is a free-text search across name, phone number, affiliation, and country —
#     use this for the global Search bar. The other params are precise column filters."""
#     query = db.query(models.Entity)
#     if name:
#         query = query.filter(models.Entity.name.ilike(f"%{name}%"))
#     if country_base:
#         query = query.filter(models.Entity.country_base == country_base)
#     if influence_level:
#         query = query.filter(models.Entity.influence_level == influence_level)
#     if cluster_id:
#         query = query.filter(models.Entity.cluster_id == cluster_id)
#     if q:
#         like = f"%{q}%"
#         query = query.filter(or_(
#             models.Entity.name.ilike(like),
#             models.Entity.phone_number.ilike(like),
#             models.Entity.country_base.ilike(like),
#             models.Entity.affiliation.ilike(like),
#         ))
#     return query.all()


# @router.get("/{entity_id}/profile", response_model=schemas.SuspectProfile)
# def get_suspect_profile(entity_id: str, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
#     """Full profile for the Suspect Profile page and the Graph side-card."""
#     entity = db.query(models.Entity).filter(models.Entity.id == entity_id).first()
#     if not entity:
#         raise HTTPException(status_code=404, detail="Entity not found")

#     crime_reports = db.query(models.CrimeReport).filter(models.CrimeReport.entity_id == entity_id).all()
#     financial = db.query(models.FinancialFlow).filter(
#         or_(models.FinancialFlow.from_entity == entity_id, models.FinancialFlow.to_entity == entity_id)
#     ).all()
#     comms = db.query(models.CommunicationLink).filter(
#         or_(models.CommunicationLink.entity_1 == entity_id, models.CommunicationLink.entity_2 == entity_id)
#     ).all()

#     # Top connections = comm partners sorted by call_count desc
#     top_connections = []
#     for c in sorted(comms, key=lambda x: x.call_count or 0, reverse=True)[:5]:
#         other_id = c.entity_2 if c.entity_1 == entity_id else c.entity_1
#         other = db.query(models.Entity).filter(models.Entity.id == other_id).first()
#         if other:
#             top_connections.append({"id": other.id, "name": other.name, "call_count": c.call_count})

#     return schemas.SuspectProfile(
#         entity=entity,
#         crime_reports=[{
#             "id": r.id, "crime_type": r.crime_type, "place": r.place,
#             "date": str(r.date) if r.date else None, "description": r.description,
#             "drug_related": bool(r.drug_related),
#         } for r in crime_reports],
#         financial_flows=[{
#             "id": f.id, "from_entity": f.from_entity, "to_entity": f.to_entity,
#             "from_entity_name": (db.query(models.Entity.name).filter(models.Entity.id == f.from_entity).scalar() or f.from_entity),
#             "to_entity_name": (db.query(models.Entity.name).filter(models.Entity.id == f.to_entity).scalar() or f.to_entity),
#             "amount": f.amount, "currency": f.currency,
#             "date": str(f.date) if f.date else None, "purpose": f.purpose, "context": f.context,
#         } for f in financial],
#         communications=[{
#             "id": c.id, "entity_1": c.entity_1, "entity_2": c.entity_2,
#             "entity_1_name": (db.query(models.Entity.name).filter(models.Entity.id == c.entity_1).scalar() or c.entity_1),
#             "entity_2_name": (db.query(models.Entity.name).filter(models.Entity.id == c.entity_2).scalar() or c.entity_2),
#             "call_count": c.call_count, "note": c.note,
#         } for c in comms],
#         top_connections=top_connections,
#     )


# @router.patch("/{entity_id}", response_model=schemas.EntityOut)
# def update_entity(entity_id: str, payload: schemas.EntityUpdate, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
#     """
#     Fills in a suspect's core profile fields (role, affiliation, country,
#     phone, influence level, description) — mainly for suspects that were
#     auto-created from a report filing with just a name. Supervisor-only:
#     this edits the shared identity record, not a per-officer data type.
#     """
#     if officer.role != "supervisor":
#         raise HTTPException(status_code=403, detail="Only a supervisor can edit suspect details")

#     entity = db.query(models.Entity).filter(models.Entity.id == entity_id).first()
#     if not entity:
#         raise HTTPException(status_code=404, detail="Entity not found")

#     update_data = payload.dict(exclude_unset=True)
#     for field, value in update_data.items():
#         setattr(entity, field, value)
#     db.commit()
#     db.refresh(entity)
#     return entity


import re
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import or_

from ..database import get_db
from .. import models, schemas
from ..auth import get_current_officer

router = APIRouter(prefix="/entities", tags=["entities"])


class EntityCreate(BaseModel):
    name: str
    role: Optional[str] = None
    affiliation: Optional[str] = None
    country_base: Optional[str] = None
    phone_number: Optional[str] = None
    force: bool = False  # set true to create anyway despite a name-match warning


def _slugify(name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_")
    return slug or "suspect"


@router.post("", response_model=schemas.EntityOut)
def create_entity(payload: EntityCreate, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
    """
    Lets ANY officer role add a brand-new suspect on the spot — e.g. a name
    that showed up in a fresh FIR, or an unknown number/account discovered
    mid-investigation. New suspects start in cluster_id="unclustered" so a
    supervisor can assign them to a proper cluster later from the Graph page.
    """
    name = payload.name.strip()
    if not name:
        raise HTTPException(status_code=422, detail="Name is required")

    existing = db.query(models.Entity).filter(models.Entity.name.ilike(name)).first()
    if existing and not payload.force:
        raise HTTPException(
            status_code=409,
            detail=f"A suspect named '{existing.name}' already exists (id: {existing.id}). "
                   f"Resubmit with force=true if this is genuinely a different person.",
        )

    base_id = _slugify(name)
    new_id = base_id
    n = 1
    while db.query(models.Entity).filter(models.Entity.id == new_id).first():
        n += 1
        new_id = f"{base_id}_{n}"

    entity = models.Entity(
        id=new_id, name=name, type="person",
        role=payload.role, affiliation=payload.affiliation,
        country_base=payload.country_base, phone_number=payload.phone_number,
        cluster_id="unclustered", cluster_label="Unclustered (new)",
        influence_level="low",
        description="Added directly by an officer — not yet assigned to a cluster.",
    )
    db.add(entity)
    db.commit()
    db.refresh(entity)
    return entity


@router.get("", response_model=list[schemas.EntityOut])
def list_entities(
    name: Optional[str] = None,
    country_base: Optional[str] = None,
    influence_level: Optional[str] = None,
    cluster_id: Optional[str] = None,
    unclustered: Optional[bool] = None,
    q: Optional[str] = None,
    db: Session = Depends(get_db),
    officer=Depends(get_current_officer),
):
    """Filterable list of entities — backs the Criminal Reports table and Search page.
    `q` is a free-text search across name, phone number, affiliation, and country —
    use this for the global Search bar. `unclustered=true` finds suspects with no
    cluster assigned yet — used by the "group unclustered suspects" panel."""
    query = db.query(models.Entity)
    if name:
        query = query.filter(models.Entity.name.ilike(f"%{name}%"))
    if country_base:
        query = query.filter(models.Entity.country_base == country_base)
    if influence_level:
        query = query.filter(models.Entity.influence_level == influence_level)
    if cluster_id:
        query = query.filter(models.Entity.cluster_id == cluster_id)
    if unclustered:
        query = query.filter(models.Entity.cluster_id.is_(None))
    if q:
        like = f"%{q}%"
        query = query.filter(or_(
            models.Entity.name.ilike(like),
            models.Entity.phone_number.ilike(like),
            models.Entity.country_base.ilike(like),
            models.Entity.affiliation.ilike(like),
        ))
    return query.all()


@router.get("/{entity_id}/profile", response_model=schemas.SuspectProfile)
def get_suspect_profile(entity_id: str, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
    """Full profile for the Suspect Profile page and the Graph side-card."""
    entity = db.query(models.Entity).filter(models.Entity.id == entity_id).first()
    if not entity:
        raise HTTPException(status_code=404, detail="Entity not found")

    crime_reports = db.query(models.CrimeReport).filter(models.CrimeReport.entity_id == entity_id).all()
    financial = db.query(models.FinancialFlow).filter(
        or_(models.FinancialFlow.from_entity == entity_id, models.FinancialFlow.to_entity == entity_id)
    ).all()
    comms = db.query(models.CommunicationLink).filter(
        or_(models.CommunicationLink.entity_1 == entity_id, models.CommunicationLink.entity_2 == entity_id)
    ).all()

    # Top connections = comm partners sorted by call_count desc
    top_connections = []
    for c in sorted(comms, key=lambda x: x.call_count or 0, reverse=True)[:5]:
        other_id = c.entity_2 if c.entity_1 == entity_id else c.entity_1
        other = db.query(models.Entity).filter(models.Entity.id == other_id).first()
        if other:
            top_connections.append({"id": other.id, "name": other.name, "call_count": c.call_count})

    return schemas.SuspectProfile(
        entity=entity,
        crime_reports=[{
            "id": r.id, "crime_type": r.crime_type, "place": r.place,
            "date": str(r.date) if r.date else None, "description": r.description,
            "drug_related": bool(r.drug_related),
        } for r in crime_reports],
        financial_flows=[{
            "id": f.id, "from_entity": f.from_entity, "to_entity": f.to_entity,
            "from_entity_name": (db.query(models.Entity.name).filter(models.Entity.id == f.from_entity).scalar() or f.from_entity),
            "to_entity_name": (db.query(models.Entity.name).filter(models.Entity.id == f.to_entity).scalar() or f.to_entity),
            "amount": f.amount, "currency": f.currency,
            "date": str(f.date) if f.date else None, "purpose": f.purpose, "context": f.context,
        } for f in financial],
        communications=[{
            "id": c.id, "entity_1": c.entity_1, "entity_2": c.entity_2,
            "entity_1_name": (db.query(models.Entity.name).filter(models.Entity.id == c.entity_1).scalar() or c.entity_1),
            "entity_2_name": (db.query(models.Entity.name).filter(models.Entity.id == c.entity_2).scalar() or c.entity_2),
            "call_count": c.call_count, "note": c.note,
        } for c in comms],
        top_connections=top_connections,
    )


@router.patch("/{entity_id}", response_model=schemas.EntityOut)
def update_entity(entity_id: str, payload: schemas.EntityUpdate, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
    """
    Fills in a suspect's core profile fields (role, affiliation, country,
    phone, influence level, description) — mainly for suspects that were
    auto-created from a report filing with just a name. Supervisor-only:
    this edits the shared identity record, not a per-officer data type.
    """
    if officer.role != "supervisor":
        raise HTTPException(status_code=403, detail="Only a supervisor can edit suspect details")

    entity = db.query(models.Entity).filter(models.Entity.id == entity_id).first()
    if not entity:
        raise HTTPException(status_code=404, detail="Entity not found")

    update_data = payload.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(entity, field, value)
    db.commit()
    db.refresh(entity)
    return entity
