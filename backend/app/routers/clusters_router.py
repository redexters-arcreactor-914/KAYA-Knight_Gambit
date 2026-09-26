# from pydantic import BaseModel
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session

# from ..database import get_db
# from .. import models
# from ..auth import get_current_officer

# router = APIRouter(prefix="/clusters", tags=["clusters"])


# class ClusterLabelUpdate(BaseModel):
#     label: str


# @router.get("")
# def list_clusters(db: Session = Depends(get_db), officer=Depends(get_current_officer)):
#     """One row per distinct cluster_id, with its current label and member count."""
#     entities = db.query(models.Entity).all()
#     clusters = {}
#     for e in entities:
#         if not e.cluster_id:
#             continue
#         c = clusters.setdefault(e.cluster_id, {"cluster_id": e.cluster_id, "label": e.cluster_label, "count": 0})
#         c["count"] += 1
#     return list(clusters.values())


# @router.patch("/{cluster_id}")
# def rename_cluster(cluster_id: str, payload: ClusterLabelUpdate, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
#     """
#     Renames a cluster (updates cluster_label on every entity that belongs to it).
#     Supervisor-only — this is a shared taxonomy change, not a per-suspect edit,
#     so it shouldn't be something every officer role can casually alter.
#     """
#     if officer.role != "supervisor":
#         raise HTTPException(status_code=403, detail="Only a supervisor can rename clusters")

#     entities = db.query(models.Entity).filter(models.Entity.cluster_id == cluster_id).all()
#     if not entities:
#         raise HTTPException(status_code=404, detail="No entities found for that cluster_id")

#     label = payload.label.strip()
#     if not label:
#         raise HTTPException(status_code=422, detail="Label cannot be empty")

#     for e in entities:
#         e.cluster_label = label
#     db.commit()

#     return {"cluster_id": cluster_id, "label": label, "count": len(entities)}
from typing import List, Optional
from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models
from ..auth import get_current_officer

router = APIRouter(prefix="/clusters", tags=["clusters"])


class ClusterLabelUpdate(BaseModel):
    label: str
    color: Optional[str] = None  # hex string like "#a9793b"; omit to leave color unchanged


class ClusterAssignRequest(BaseModel):
    """Groups a set of (usually unclustered) suspects into a cluster —
    either an existing cluster_id or a brand new one the supervisor names."""
    entity_ids: List[str]
    cluster_id: str
    label: str
    color: Optional[str] = None


def _require_supervisor(officer):
    if officer.role != "supervisor":
        raise HTTPException(status_code=403, detail="Only a supervisor can manage clusters")


@router.get("")
def list_clusters(db: Session = Depends(get_db), officer=Depends(get_current_officer)):
    """One row per distinct cluster_id, with its current label, color and member count."""
    entities = db.query(models.Entity).all()
    clusters = {}
    for e in entities:
        if not e.cluster_id:
            continue
        c = clusters.setdefault(e.cluster_id, {
            "cluster_id": e.cluster_id, "label": e.cluster_label,
            "color": e.cluster_color, "count": 0,
        })
        c["count"] += 1
    return list(clusters.values())


@router.patch("/{cluster_id}")
def rename_cluster(cluster_id: str, payload: ClusterLabelUpdate, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
    """
    Renames a cluster and/or recolors it (updates every entity that belongs
    to it). Supervisor-only — this is a shared taxonomy change, not a
    per-suspect edit, so it shouldn't be something every officer role can
    casually alter.
    """
    _require_supervisor(officer)

    entities = db.query(models.Entity).filter(models.Entity.cluster_id == cluster_id).all()
    if not entities:
        raise HTTPException(status_code=404, detail="No entities found for that cluster_id")

    label = payload.label.strip()
    if not label:
        raise HTTPException(status_code=422, detail="Label cannot be empty")

    for e in entities:
        e.cluster_label = label
        if payload.color:
            e.cluster_color = payload.color
    db.commit()

    return {"cluster_id": cluster_id, "label": label, "color": payload.color, "count": len(entities)}


@router.post("/assign")
def assign_cluster(payload: ClusterAssignRequest, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
    """
    Groups the given suspects (typically ones sitting unclustered/grey on
    the graph) into a cluster — new or existing — with a name and color the
    supervisor chooses. This is the manual alternative to an automatic
    clustering algorithm: the supervisor looks at each suspect's connections
    on the graph and decides which group they belong to.
    """
    _require_supervisor(officer)

    if not payload.entity_ids:
        raise HTTPException(status_code=422, detail="Select at least one suspect")

    label = payload.label.strip()
    if not label:
        raise HTTPException(status_code=422, detail="Label cannot be empty")

    entities = db.query(models.Entity).filter(models.Entity.id.in_(payload.entity_ids)).all()
    found_ids = {e.id for e in entities}
    missing = set(payload.entity_ids) - found_ids
    if missing:
        raise HTTPException(status_code=404, detail=f"Unknown suspect ids: {sorted(missing)}")

    for e in entities:
        e.cluster_id = payload.cluster_id
        e.cluster_label = label
        if payload.color:
            e.cluster_color = payload.color
    db.commit()

    return {"cluster_id": payload.cluster_id, "label": label, "color": payload.color, "count": len(entities)}
