
import re
from . import models


def _slugify(name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "_", name.strip().lower()).strip("_")
    return slug or "unnamed"


def resolve_or_create_entity(db, name_or_id: str) -> models.Entity:
    name_or_id = (name_or_id or "").strip()
    if not name_or_id:
        raise ValueError("A suspect name is required")

    # 1. Exact ID match (frontend sometimes already has the real id)
    entity = db.query(models.Entity).filter(models.Entity.id == name_or_id).first()
    if entity:
        return entity

    # 2. Case-insensitive full-name match (this is the main duplicate guard)
    entity = db.query(models.Entity).filter(models.Entity.name.ilike(name_or_id)).first()
    if entity:
        return entity

    # 3. Genuinely new — create a minimal, not-yet-profiled entity.
    # cluster_id is left null on purpose: it shows up as "unclustered" on the
    # graph until a supervisor assigns it a proper cluster.
    base_slug = _slugify(name_or_id)
    slug = base_slug
    suffix = 2
    while db.query(models.Entity).filter(models.Entity.id == slug).first():
        slug = f"{base_slug}_{suffix}"
        suffix += 1

    entity = models.Entity(
        id=slug,
        name=name_or_id,
        type="person",
        role=None,
        affiliation=None,
        country_base=None,
        phone_number=None,
        cluster_id=None,
        cluster_label=None,
        influence_level="low",
        description="Added via officer filing — not yet fully profiled.",
    )
    db.add(entity)
    db.flush()  # so it has a usable row within this same transaction
    return entity
