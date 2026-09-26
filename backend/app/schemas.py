

from datetime import date as date_type
from typing import Optional, List
from pydantic import BaseModel


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    full_name: str


class EntityOut(BaseModel):
    id: str
    name: str
    type: str
    role: Optional[str] = None
    affiliation: Optional[str] = None
    country_base: Optional[str] = None
    phone_number: Optional[str] = None
    cluster_id: Optional[str] = None
    cluster_label: Optional[str] = None
    cluster_color: Optional[str] = None
    base_location: Optional[str] = None
    influence_level: Optional[str] = None
    description: Optional[str] = None
    photo_url: Optional[str] = None

    class Config:
        from_attributes = True


class RelationshipOut(BaseModel):
    source_id: str
    target_id: str
    relationship_type: Optional[str] = None
    date: Optional[date_type] = None
    context: Optional[str] = None

    class Config:
        from_attributes = True


class CommunicationOut(BaseModel):
    entity_1: str
    entity_2: str
    call_count: int
    note: Optional[str] = None

    class Config:
        from_attributes = True


class FinancialFlowOut(BaseModel):
    from_entity: str
    to_entity: str
    amount: Optional[float] = None
    currency: Optional[str] = None
    date: Optional[date_type] = None
    purpose: Optional[str] = None
    context: Optional[str] = None

    class Config:
        from_attributes = True


class CrimeReportCreate(BaseModel):
    entity_id: str
    crime_type: str
    place: Optional[str] = None
    date: Optional[date_type] = None
    description: Optional[str] = None
    drug_related: bool = False
    vehicle_info: Optional[str] = None


class FinancialFlowCreate(BaseModel):
    from_entity: str
    to_entity: str
    amount: float
    currency: str = "INR"
    date: Optional[date_type] = None
    purpose: str
    context: Optional[str] = None


class CommunicationCreate(BaseModel):
    entity_1: str
    entity_2: str
    call_count: int
    note: Optional[str] = None


class EntityUpdate(BaseModel):
    """Supervisor-only edit of a suspect's core profile fields — used to fill
    in role/affiliation/country/phone for a suspect that was auto-created
    from a report filing with just a name."""
    role: Optional[str] = None
    affiliation: Optional[str] = None
    country_base: Optional[str] = None
    phone_number: Optional[str] = None
    influence_level: Optional[str] = None
    base_location: Optional[str] = None
    description: Optional[str] = None


class SuspectProfile(BaseModel):
    """Full 360-view of one suspect for the profile page / graph side card."""
    entity: EntityOut
    crime_reports: List[dict]
    financial_flows: List[dict]
    communications: List[dict]
    top_connections: List[dict]
