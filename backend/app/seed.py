
import json
from datetime import datetime
from pathlib import Path

from .database import SessionLocal, engine, Base
from . import models
from .auth import hash_password

DATASET_PATH = Path(__file__).parent / "dataset.json"


def parse_date(s):
    if not s:
        return None
    try:
        return datetime.strptime(s, "%Y-%m-%d").date()
    except ValueError:
        return None


def run():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    with open(DATASET_PATH) as f:
        data = json.load(f)

    # Clear existing seed data (not officers or crime_reports — those are live data)
    db.query(models.FinancialFlow).delete()
    db.query(models.CommunicationLink).delete()
    db.query(models.Event).delete()
    db.query(models.RelationshipEdge).delete()
    db.query(models.Entity).delete()
    db.commit()

    for e in data["entities"]:
        db.add(models.Entity(
            id=e["id"], name=e["name"], type=e["type"], role=e.get("role"),
            affiliation=e.get("affiliation"), country_base=e.get("country_base"),
            phone_number=e.get("phone_number"), cluster_id=e.get("cluster_id"),
            cluster_label=e.get("cluster_label"), influence_level=e.get("influence_level"),
            description=e.get("description"), base_location=e.get("base_location"),
        ))
    db.commit()

    for r in data["relationships"]:
        db.add(models.RelationshipEdge(
            source_id=r["source_id"], target_id=r["target_id"],
            relationship_type=r.get("relationship_type"),
            date=parse_date(r.get("date")), context=r.get("context"),
        ))

    for ev in data["events"]:
        db.add(models.Event(
            event_name=ev["event_name"], date=parse_date(ev.get("date")),
            location=ev.get("location"), event_type=ev.get("event_type"),
            description=ev.get("description"),
            entities_involved=",".join(ev.get("entities_involved", [])),
        ))

    for c in data["communication_links"]:
        start, end = None, None
        if c.get("date_range"):
            parts = c["date_range"].split(" to ")
            if len(parts) == 2:
                start, end = parse_date(parts[0]), parse_date(parts[1])
        db.add(models.CommunicationLink(
            entity_1=c["entity_1"], entity_2=c["entity_2"],
            call_count=c.get("call_count", 0),
            date_range_start=start, date_range_end=end, note=c.get("note"),
        ))

    for fl in data["financial_flows"]:
        db.add(models.FinancialFlow(
            from_entity=fl["from_entity"], to_entity=fl["to_entity"],
            amount=fl.get("amount"), currency=fl.get("currency"),
            date=parse_date(fl.get("date")), purpose=fl.get("purpose"),
            context=fl.get("context"),
        ))

    db.commit()

    # Create default officer accounts if none exist yet
    if db.query(models.Officer).count() == 0:
        default_officers = [
            ("supervisor", "supervisor123", "Case Supervisor", "supervisor"),
            ("fir_officer", "fir123", "FIR Desk Officer", "fir"),
            ("financial_officer", "financial123", "Financial Intelligence Officer", "financial"),
            ("call_officer", "call123", "Call Records Officer", "call_recording"),
        ]
        for username, pw, full_name, role in default_officers:
            db.add(models.Officer(
                username=username, hashed_password=hash_password(pw),
                full_name=full_name, role=role,
            ))
        db.commit()

    db.close()
    print("Seed complete.")
    print(f"  Entities: {len(data['entities'])}")
    print(f"  Relationships: {len(data['relationships'])}")
    print(f"  Events: {len(data['events'])}")
    print(f"  Communication links: {len(data['communication_links'])}")
    print(f"  Financial flows: {len(data['financial_flows'])}")
    print("Default officer logins created: supervisor/supervisor123, "
          "fir_officer/fir123, financial_officer/financial123, call_officer/call123")


if __name__ == "__main__":
    run()
