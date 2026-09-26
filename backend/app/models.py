


from sqlalchemy import Column, String, Integer, Float, Date, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base


class Officer(Base):
    """An admin/officer account. Different roles see/add different data."""
    __tablename__ = "officers"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    # role controls what kind of report this officer files:
    # "fir" | "financial" | "call_recording" | "supervisor" (sees everything)
    role = Column(String, nullable=False, default="fir")


class Entity(Base):
    """A person, organization, or location node in the criminal network."""
    __tablename__ = "entities"

    id = Column(String, primary_key=True, index=True)  # e.g. "hamza_mazari"
    name = Column(String, nullable=False, index=True)
    type = Column(String, nullable=False)  # person / organization / location
    role = Column(String)
    affiliation = Column(String)
    country_base = Column(String, index=True)
    phone_number = Column(String, index=True)
    cluster_id = Column(String, index=True)
    cluster_label = Column(String)
    cluster_color = Column(String, nullable=True)  # hex color, e.g. "#a9793b" — supervisor-set
    base_location = Column(String, nullable=True)  # city/area, e.g. "Lyari" — used for the map view
    influence_level = Column(String, index=True)  # high / medium / low
    description = Column(Text)
    photo_url = Column(String, nullable=True)


class RelationshipEdge(Base):
    """A connection between two entities in the graph."""
    __tablename__ = "relationships"

    id = Column(Integer, primary_key=True, index=True)
    source_id = Column(String, ForeignKey("entities.id"), index=True)
    target_id = Column(String, ForeignKey("entities.id"), index=True)
    relationship_type = Column(String)
    date = Column(Date, nullable=True)
    context = Column(Text)


class Event(Base):
    """A crime-related event: meeting, transaction, attack, etc."""
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    event_name = Column(String, nullable=False)
    date = Column(Date, nullable=True)
    location = Column(String)
    event_type = Column(String, index=True)
    description = Column(Text)
    entities_involved = Column(Text)  # comma-separated entity ids


class CommunicationLink(Base):
    """Call/message record between two entities (filed by call-recording officers)."""
    __tablename__ = "communication_links"

    id = Column(Integer, primary_key=True, index=True)
    entity_1 = Column(String, ForeignKey("entities.id"), index=True)
    entity_2 = Column(String, ForeignKey("entities.id"), index=True)
    call_count = Column(Integer, default=0)
    date_range_start = Column(Date, nullable=True)
    date_range_end = Column(Date, nullable=True)
    note = Column(Text)
    logged_by_officer_id = Column(Integer, ForeignKey("officers.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class FinancialFlow(Base):
    """A flagged financial transaction (filed by financial officers)."""
    __tablename__ = "financial_flows"

    id = Column(Integer, primary_key=True, index=True)
    from_entity = Column(String, ForeignKey("entities.id"), index=True)
    to_entity = Column(String, ForeignKey("entities.id"), index=True)
    amount = Column(Float)
    currency = Column(String)
    date = Column(Date, nullable=True)
    purpose = Column(String, index=True)  # funding operation / laundering / payment for supply
    context = Column(Text)
    logged_by_officer_id = Column(Integer, ForeignKey("officers.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class CrimeReport(Base):
    """An FIR / crime report filed against an entity (filed by FIR officers)."""
    __tablename__ = "crime_reports"

    id = Column(Integer, primary_key=True, index=True)
    entity_id = Column(String, ForeignKey("entities.id"), index=True)
    crime_type = Column(String, index=True)  # murder / kidnapping / drug trafficking / etc.
    place = Column(String, index=True)
    date = Column(Date, nullable=True)
    description = Column(Text)
    drug_related = Column(Integer, default=0)  # 0/1 boolean flag for filtering
    vehicle_info = Column(String, nullable=True)  # free text — plate, make, whatever was noted
    logged_by_officer_id = Column(Integer, ForeignKey("officers.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
