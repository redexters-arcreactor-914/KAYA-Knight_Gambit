# # """
# # Anomaly Detection — Isolation Forest.

# # Unsupervised: no one tells the model who the "kingpins" are. It just looks
# # at each entity's numeric footprint in the network (how many people they
# # talk to, how much money moves through them, how connected they are) and
# # flags whoever looks statistically unusual compared to the rest of the
# # population. In this dataset that naturally surfaces the kingpins and
# # lieutenants — which is exactly what "unusual" should mean in a criminal
# # network — but the model was never told which nodes were important.

# # Run standalone to test: python -m app.ml.anomaly
# # Used by: GET /graph/anomalies (graph_router.py)
# # """
# # from sklearn.ensemble import IsolationForest
# # from sqlalchemy.orm import Session
# # from sqlalchemy import or_
# # import networkx as nx

# # from .. import models


# # def build_feature_table(db: Session):
# #     """One row per entity: total_calls, total_financial_amount, num_relationships, centrality."""
# #     entities = db.query(models.Entity).all()
# #     relationships = db.query(models.RelationshipEdge).all()
# #     comms = db.query(models.CommunicationLink).all()
# #     flows = db.query(models.FinancialFlow).all()

# #     G = nx.Graph()
# #     for e in entities:
# #         G.add_node(e.id)
# #     for r in relationships:
# #         G.add_edge(r.source_id, r.target_id)
# #     centrality = nx.degree_centrality(G) if len(G.nodes) > 0 else {}

# #     rel_count, call_count, flow_amount = {}, {}, {}
# #     for r in relationships:
# #         rel_count[r.source_id] = rel_count.get(r.source_id, 0) + 1
# #         rel_count[r.target_id] = rel_count.get(r.target_id, 0) + 1
# #     for c in comms:
# #         call_count[c.entity_1] = call_count.get(c.entity_1, 0) + (c.call_count or 0)
# #         call_count[c.entity_2] = call_count.get(c.entity_2, 0) + (c.call_count or 0)
# #     for f in flows:
# #         flow_amount[f.from_entity] = flow_amount.get(f.from_entity, 0) + (f.amount or 0)
# #         flow_amount[f.to_entity] = flow_amount.get(f.to_entity, 0) + (f.amount or 0)

# #     rows = []
# #     for e in entities:
# #         rows.append({
# #             "id": e.id,
# #             "name": e.name,
# #             "num_relationships": rel_count.get(e.id, 0),
# #             "total_calls": call_count.get(e.id, 0),
# #             "total_financial_amount": flow_amount.get(e.id, 0),
# #             "centrality": centrality.get(e.id, 0.0),
# #         })
# #     return rows


# # def score_anomalies(db: Session, top_n: int = 10):
# #     rows = build_feature_table(db)
# #     if len(rows) < 5:
# #         return []  # not enough data to train meaningfully

# #     feature_cols = ["num_relationships", "total_calls", "total_financial_amount", "centrality"]
# #     X = [[r[c] for c in feature_cols] for r in rows]

# #     # contamination='auto' — we don't tell it how many anomalies to expect
# #     model = IsolationForest(n_estimators=200, contamination="auto", random_state=42)
# #     model.fit(X)
# #     # decision_function: lower score = more anomalous. We flip sign so
# #     # higher = more anomalous, which is more intuitive for the UI.
# #     raw_scores = model.decision_function(X)
# #     for r, s in zip(rows, raw_scores):
# #         r["anomaly_score"] = round(-1 * float(s), 4)

# #     rows.sort(key=lambda r: r["anomaly_score"], reverse=True)
# #     return rows[:top_n]


# # if __name__ == "__main__":
# #     # Quick standalone sanity check against the seeded dataset
# #     from ..database import SessionLocal
# #     db = SessionLocal()
# #     results = score_anomalies(db, top_n=10)
# #     print(f"{'name':30s} {'anomaly_score':>14s} {'relationships':>14s} {'calls':>8s} {'amount':>14s}")
# #     for r in results:
# #         print(f"{r['name'][:30]:30s} {r['anomaly_score']:14.4f} {r['num_relationships']:14d} "
# #               f"{r['total_calls']:8d} {r['total_financial_amount']:14.0f}")
# #     db.close()


# """
# Anomaly Detection — Isolation Forest.

# Unsupervised: no one tells the model who the "kingpins" are. It looks at
# each entity's numeric footprint in the network and flags whoever looks
# statistically unusual compared to the rest of the population.

# IMPORTANT FRAMING: this model detects RARE, not IMPORTANT. A courier who
# calls one contact obsessively can score higher than a well-connected
# kingpin who blends into normal-looking traffic patterns. Influence/
# importance ranking is a separate, better-suited job for graph centrality
# (see graph_router.py's computed_centrality on /graph). Recommend labeling
# this panel "Unusual activity patterns" in the UI rather than "AI-flagged
# anomalies", with a short line distinguishing it from the influence ranking
# — that relabeling happens in the frontend, not here.

# CHANGES FROM THE ORIGINAL VERSION (fixing a real review finding):
# 1. Multi-layer graph — relationships, calls, AND financial flows are all
#    edges now. Previously the graph was built from RelationshipEdge only,
#    so an entity connected purely through calls/money got num_relationships=0
#    and centrality=0.0 even when clearly well-connected. That's why a
#    0-relationship/122-call entity was ranking #1 before.
# 2. Dropped the duplicate feature — num_relationships (raw degree) and
#    degree_centrality are the same signal (centrality = degree / (n-1),
#    a constant divisor), so using both double-weighted degree. Replaced
#    centrality with betweenness (better bridge/broker signal for
#    kingpin-style roles) and added calls_per_contact + distinct_contacts,
#    which is what actually explains "few contacts, huge call volume"
#    courier/handler patterns.
# 3. Log-transformed the two heavy-tailed features (total_calls,
#    total_financial_amount) before feeding Isolation Forest — it splits
#    uniformly across each feature's raw range, so anything in a long right
#    tail isolates trivially regardless of whether it's actually unusual.
# 4. Added is_person (0/1) so organizations (which naturally have different
#    call/money profiles than individuals) aren't compared on the same
#    footing without at least one signal marking the difference.
# 5. Raw decision_function scores are meaningless to a viewer. Added a
#    percentile rank and a "reason" string (which feature deviates most
#    from the population median) so the UI can show *why* something was
#    flagged, not just a bare number.

# Run standalone to test: python -m app.ml.anomaly
# Used by: GET /graph/anomalies (graph_router.py)
# """
# import numpy as np
# from sklearn.ensemble import IsolationForest
# from sqlalchemy.orm import Session
# import networkx as nx

# from .. import models

# # Order must match the columns built in score_anomalies() below —
# # used only to label the "reason" string, not for computation.
# FEATURE_NAMES = [
#     "call volume",
#     "financial volume",
#     "betweenness (broker position)",
#     "calls per contact",
#     "is_person",
# ]


# def build_feature_table(db: Session):
#     """
#     One row per entity, built from a graph that includes relationships,
#     calls, AND financial flows as edges — not relationships alone.
#     """
#     entities = db.query(models.Entity).all()
#     relationships = db.query(models.RelationshipEdge).all()
#     comms = db.query(models.CommunicationLink).all()
#     flows = db.query(models.FinancialFlow).all()

#     G = nx.Graph()
#     for e in entities:
#         G.add_node(e.id)
#     for r in relationships:
#         G.add_edge(r.source_id, r.target_id)
#     for c in comms:
#         G.add_edge(c.entity_1, c.entity_2)
#     for f in flows:
#         G.add_edge(f.from_entity, f.to_entity)

#     betweenness = nx.betweenness_centrality(G) if len(G.nodes) > 2 else {n: 0.0 for n in G.nodes()}

#     call_count, flow_amount, contacts = {}, {}, {}
#     for c in comms:
#         call_count[c.entity_1] = call_count.get(c.entity_1, 0) + (c.call_count or 0)
#         call_count[c.entity_2] = call_count.get(c.entity_2, 0) + (c.call_count or 0)
#         contacts.setdefault(c.entity_1, set()).add(c.entity_2)
#         contacts.setdefault(c.entity_2, set()).add(c.entity_1)
#     for f in flows:
#         flow_amount[f.from_entity] = flow_amount.get(f.from_entity, 0) + (f.amount or 0)
#         flow_amount[f.to_entity] = flow_amount.get(f.to_entity, 0) + (f.amount or 0)

#     rows = []
#     for e in entities:
#         total_calls = call_count.get(e.id, 0)
#         distinct_contacts = len(contacts.get(e.id, set()))
#         calls_per_contact = round(total_calls / distinct_contacts, 2) if distinct_contacts > 0 else 0.0
#         rows.append({
#             "id": e.id,
#             "name": e.name,
#             # kept for display — no longer used as a model feature, since
#             # it's redundant with betweenness/degree in the graph
#             "num_relationships": G.degree(e.id) if e.id in G else 0,
#             "total_calls": total_calls,
#             "distinct_contacts": distinct_contacts,
#             "calls_per_contact": calls_per_contact,
#             "total_financial_amount": flow_amount.get(e.id, 0),
#             "betweenness": round(betweenness.get(e.id, 0.0), 4),
#             "is_person": 1 if e.type == "person" else 0,
#         })
#     return rows


# def score_anomalies(db: Session, top_n: int = 10):
#     rows = build_feature_table(db)
#     if len(rows) < 5:
#         return []  # not enough data to train meaningfully

#     X = np.array([[
#         np.log1p(r["total_calls"]),
#         np.log1p(r["total_financial_amount"]),
#         r["betweenness"],
#         r["calls_per_contact"],
#         r["is_person"],
#     ] for r in rows])

#     model = IsolationForest(n_estimators=200, contamination="auto", random_state=42)
#     model.fit(X)
#     # decision_function: lower = more anomalous. Flip sign so higher = more
#     # anomalous, which is the intuitive direction for the UI.
#     raw_scores = model.decision_function(X)
#     for r, s in zip(rows, raw_scores):
#         r["anomaly_score"] = round(-1 * float(s), 4)

#     # Percentile rank — far more legible to a viewer than a bare
#     # decision_function value like 0.2065.
#     order = np.argsort([r["anomaly_score"] for r in rows])
#     ranks = np.empty(len(rows), dtype=float)
#     ranks[order] = np.arange(1, len(rows) + 1)
#     for i, r in enumerate(rows):
#         r["percentile"] = round(100 * ranks[i] / len(rows), 1)

#     # "Why flagged" — the single feature furthest from the population
#     # median, in robust units. This is what turns "anomaly score: 0.21"
#     # into something explainable to an investigator.
#     #
#     # Caveat we found while testing: plain median/MAD blows up when a
#     # feature is mostly zeros across the population (common for
#     # total_financial_amount) — MAD collapses to ~0, so dividing by it
#     # produces nonsense like "+14 billion x typical". Fall back to
#     # standard deviation when MAD is degenerate, and phrase the reason
#     # qualitatively (above/below the population median) rather than as a
#     # multiplier, since a multiplier is meaningless when the median is 0.
#     med = np.median(X, axis=0)
#     mad = np.median(np.abs(X - med), axis=0)
#     std = np.std(X, axis=0)
#     scale = np.where(mad > 1e-6, mad, std)
#     scale = np.where(scale > 1e-6, scale, 1.0)  # last-resort floor if a feature is constant for everyone

#     for i, r in enumerate(rows):
#         z = (X[i] - med) / scale
#         # is_person (last column) is a segmentation flag, not a behavior —
#         # excluding it from the "reason" pick avoids confusing outputs like
#         # "is_person is unusually below the population median". It still
#         # takes part in scoring above, just not in the explanation.
#         j = int(np.argmax(np.abs(z[:-1])))
#         direction = "above" if X[i][j] >= med[j] else "below"
#         r["reason"] = f"{FEATURE_NAMES[j]} is unusually {direction} the population median"

#     rows.sort(key=lambda r: r["anomaly_score"], reverse=True)
#     return rows[:top_n]


# if __name__ == "__main__":
#     # Quick standalone sanity check against the seeded dataset
#     from ..database import SessionLocal
#     db = SessionLocal()
#     results = score_anomalies(db, top_n=10)
#     print(f"{'name':28s} {'score':>8s} {'pctl':>6s} {'reason':40s}")
#     for r in results:
#         print(f"{r['name'][:28]:28s} {r['anomaly_score']:8.4f} {r['percentile']:5.1f}% {r['reason']:40s}")
#     db.close()
"""
Anomaly Detection — Isolation Forest.

Unsupervised: no one tells the model who the "kingpins" are. It looks at
each entity's numeric footprint in the network and flags whoever looks
statistically unusual compared to the rest of the population.

IMPORTANT FRAMING: this model detects RARE, not IMPORTANT. Influence/
importance ranking is a separate job better suited to graph centrality
(see graph_router.py's computed_centrality on /graph). Recommend labeling
this panel "Unusual activity patterns" in the UI, with a short line
distinguishing it from an influence ranking — done in Alerts.jsx.

CHANGE IN THIS VERSION (fixing a real bug found while demoing):
A front organization with almost no calls/financial data ("Vidyarthi Kranti
Sangh" — no records at all) was scoring at the 99th percentile. Root cause:
we'd added an is_person (0/1) feature so people and organizations wouldn't
be compared on identical footing, but organizations are a small minority in
this dataset, so an org with a near-all-zero profile isolates instantly
just for BEING an org — not for doing anything unusual. Worse, the "reason"
string deliberately excluded is_person from being reported (to avoid a
confusing "is_person is unusually below median" message), so when is_person
actually was the dominant driver of the score, the displayed reason pointed
at some other, unrelated feature instead — a misleading explanation on top
of a misleading score.

Fix: score PEOPLE only. Organizations still count as nodes and edges in the
graph (so a person routing money through a shell company still gets credit
for that connection via betweenness/degree), but a front organization or
shell company is never itself compared against a population of individuals
and reported as "unusual" — that comparison doesn't mean anything. With
that scoping, is_person is dropped entirely (it would be constant across
every row now, and a constant feature carries no signal).

Run standalone to test: python -m app.ml.anomaly
Used by: GET /graph/anomalies (graph_router.py)
"""
import numpy as np
from sklearn.ensemble import IsolationForest
from sqlalchemy.orm import Session
import networkx as nx

from .. import models

FEATURE_NAMES = [
    "call volume",
    "financial volume",
    "betweenness (broker position)",
    "calls per contact",
]


def build_feature_table(db: Session):
    """
    One row per PERSON entity (organizations are excluded from scoring —
    see module docstring). The graph itself still includes every entity
    and every relationship/call/financial edge, so a person's connections
    through an organization still count toward their own betweenness and
    degree.
    """
    all_entities = db.query(models.Entity).all()
    relationships = db.query(models.RelationshipEdge).all()
    comms = db.query(models.CommunicationLink).all()
    flows = db.query(models.FinancialFlow).all()

    G = nx.Graph()
    for e in all_entities:
        G.add_node(e.id)
    for r in relationships:
        G.add_edge(r.source_id, r.target_id)
    for c in comms:
        G.add_edge(c.entity_1, c.entity_2)
    for f in flows:
        G.add_edge(f.from_entity, f.to_entity)

    betweenness = nx.betweenness_centrality(G) if len(G.nodes) > 2 else {n: 0.0 for n in G.nodes()}

    call_count, flow_amount, contacts = {}, {}, {}
    for c in comms:
        call_count[c.entity_1] = call_count.get(c.entity_1, 0) + (c.call_count or 0)
        call_count[c.entity_2] = call_count.get(c.entity_2, 0) + (c.call_count or 0)
        contacts.setdefault(c.entity_1, set()).add(c.entity_2)
        contacts.setdefault(c.entity_2, set()).add(c.entity_1)
    for f in flows:
        flow_amount[f.from_entity] = flow_amount.get(f.from_entity, 0) + (f.amount or 0)
        flow_amount[f.to_entity] = flow_amount.get(f.to_entity, 0) + (f.amount or 0)

    rows = []
    for e in all_entities:
        if e.type != "person":
            continue  # organizations don't get scored — see docstring
        total_calls = call_count.get(e.id, 0)
        distinct_contacts = len(contacts.get(e.id, set()))
        calls_per_contact = round(total_calls / distinct_contacts, 2) if distinct_contacts > 0 else 0.0
        rows.append({
            "id": e.id,
            "name": e.name,
            "num_relationships": G.degree(e.id) if e.id in G else 0,
            "total_calls": total_calls,
            "distinct_contacts": distinct_contacts,
            "calls_per_contact": calls_per_contact,
            "total_financial_amount": flow_amount.get(e.id, 0),
            "betweenness": round(betweenness.get(e.id, 0.0), 4),
        })
    return rows


def score_anomalies(db: Session, top_n: int = 10):
    rows = build_feature_table(db)
    if len(rows) < 5:
        return []  # not enough data to train meaningfully

    X = np.array([[
        np.log1p(r["total_calls"]),
        np.log1p(r["total_financial_amount"]),
        r["betweenness"],
        r["calls_per_contact"],
    ] for r in rows])

    model = IsolationForest(n_estimators=200, contamination="auto", random_state=42)
    model.fit(X)
    raw_scores = model.decision_function(X)
    for r, s in zip(rows, raw_scores):
        r["anomaly_score"] = round(-1 * float(s), 4)

    order = np.argsort([r["anomaly_score"] for r in rows])
    ranks = np.empty(len(rows), dtype=float)
    ranks[order] = np.arange(1, len(rows) + 1)
    for i, r in enumerate(rows):
        r["percentile"] = round(100 * ranks[i] / len(rows), 1)

    med = np.median(X, axis=0)
    mad = np.median(np.abs(X - med), axis=0)
    std = np.std(X, axis=0)
    scale = np.where(mad > 1e-6, mad, std)
    scale = np.where(scale > 1e-6, scale, 1.0)

    for i, r in enumerate(rows):
        z = (X[i] - med) / scale
        j = int(np.argmax(np.abs(z)))
        direction = "above" if X[i][j] >= med[j] else "below"
        r["reason"] = f"{FEATURE_NAMES[j]} is unusually {direction} the population median"

    rows.sort(key=lambda r: r["anomaly_score"], reverse=True)
    return rows[:top_n]


if __name__ == "__main__":
    from ..database import SessionLocal
    db = SessionLocal()
    results = score_anomalies(db, top_n=10)
    print(f"{'name':28s} {'score':>8s} {'pctl':>6s} {'reason':40s}")
    for r in results:
        print(f"{r['name'][:28]:28s} {r['anomaly_score']:8.4f} {r['percentile']:5.1f}% {r['reason']:40s}")
    db.close()
