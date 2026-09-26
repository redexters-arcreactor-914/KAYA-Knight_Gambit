# # from fastapi import APIRouter, Depends
# # from sqlalchemy.orm import Session
# # import networkx as nx

# # from ..database import get_db
# # from .. import models
# # from ..auth import get_current_officer
# # from ..ml.anomaly import score_anomalies

# # router = APIRouter(prefix="/graph", tags=["graph"])


# # @router.get("/anomalies")
# # def get_anomalies(top_n: int = 10, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
# #     """
# #     Unsupervised anomaly scores (Isolation Forest) — entities whose network
# #     footprint (relationships, call volume, money flow, centrality) looks
# #     statistically unusual. No labels given to the model; see app/ml/anomaly.py.
# #     """
# #     return {"anomalies": score_anomalies(db, top_n=top_n)}


# # @router.get("/predicted-links")
# # def get_predicted_links(top_n: int = 15, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
# #     """
# #     node2vec + Logistic Regression predicted hidden connections.
# #     NOTE: requires `pip install node2vec gensim` — heavy dependency, imported
# #     lazily inside app/ml/link_prediction.py so the rest of the API works
# #     without it installed.
# #     """
# #     from ..ml.link_prediction import train_and_evaluate
# #     return train_and_evaluate(db, top_n=top_n)


# # # @router.get("")
# # # def get_graph(db: Session = Depends(get_db), officer=Depends(get_current_officer)):
# # #     """
# # #     Returns nodes + edges for the Graph Analytics page.
# # #     Influence is computed with networkx degree centrality — this is the
# # #     'key individuals playing influential roles' requirement, done without
# # #     needing a graph database.
# # #     """
# # #     entities = db.query(models.Entity).all()
# # #     relationships = db.query(models.RelationshipEdge).all()

# # #     G = nx.Graph()
# # #     for e in entities:
# # #         G.add_node(e.id)
# # #     for r in relationships:
# # #         G.add_edge(r.source_id, r.target_id)

# # #     centrality = nx.degree_centrality(G) if len(G.nodes) > 0 else {}

# # #     nodes = []
# # #     for e in entities:
# # #         nodes.append({
# # #             "id": e.id,
# # #             "name": e.name,
# # #             "cluster_id": e.cluster_id,
# # #             "cluster_label": e.cluster_label,
# # #             "country_base": e.country_base,
# # #             "influence_level": e.influence_level,
# # #             "role": e.role,
# # #             "computed_centrality": round(centrality.get(e.id, 0), 4),
# # #         })

# # #     edges = [{"source": r.source_id, "target": r.target_id, "type": r.relationship_type} for r in relationships]

# # #     return {"nodes": nodes, "edges": edges}


# # @router.get("")
# # def get_graph(db: Session = Depends(get_db), officer=Depends(get_current_officer)):
# #     """
# #     Returns nodes + edges for the Graph Analytics page.
# #     Edges come from THREE sources, not just the manually-entered relationships
# #     table: a call record or a financial flow between two entities also draws
# #     a connection — so a newly-added suspect shows up connected in the graph
# #     as soon as any officer logs a call or transaction involving them.
# #     """
# #     entities = db.query(models.Entity).all()
# #     relationships = db.query(models.RelationshipEdge).all()
# #     comms = db.query(models.CommunicationLink).all()
# #     flows = db.query(models.FinancialFlow).all()

# #     G = nx.Graph()
# #     for e in entities:
# #         G.add_node(e.id)

# #     edge_labels = {}
# #     for r in relationships:
# #         pair = frozenset([r.source_id, r.target_id])
# #         edge_labels.setdefault(pair, (r.source_id, r.target_id, r.relationship_type))
# #         G.add_edge(r.source_id, r.target_id)
# #     for c in comms:
# #         pair = frozenset([c.entity_1, c.entity_2])
# #         edge_labels.setdefault(pair, (c.entity_1, c.entity_2, "calls"))
# #         G.add_edge(c.entity_1, c.entity_2)
# #     for f in flows:
# #         pair = frozenset([f.from_entity, f.to_entity])
# #         edge_labels.setdefault(pair, (f.from_entity, f.to_entity, f.purpose or "financial"))
# #         G.add_edge(f.from_entity, f.to_entity)

# #     centrality = nx.degree_centrality(G) if len(G.nodes) > 0 else {}

# #     nodes = []
# #     for e in entities:
# #         nodes.append({
# #             "id": e.id,
# #             "name": e.name,
# #             "cluster_id": e.cluster_id,
# #             "cluster_label": e.cluster_label,
# #             "country_base": e.country_base,
# #             "influence_level": e.influence_level,
# #             "role": e.role,
# #             "computed_centrality": round(centrality.get(e.id, 0), 4),
# #         })

# #     edges = [{"source": s, "target": t, "type": label} for (s, t, label) in edge_labels.values()]

# #     return {"nodes": nodes, "edges": edges}



# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# import networkx as nx

# from ..database import get_db
# from .. import models
# from ..auth import get_current_officer
# from ..ml.anomaly import score_anomalies

# router = APIRouter(prefix="/graph", tags=["graph"])


# @router.get("/anomalies")
# def get_anomalies(top_n: int = 10, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
#     """
#     Unsupervised anomaly scores (Isolation Forest) — entities whose network
#     footprint (relationships, call volume, money flow, centrality) looks
#     statistically unusual. No labels given to the model; see app/ml/anomaly.py.
#     """
#     return {"anomalies": score_anomalies(db, top_n=top_n)}


# @router.get("/predicted-links")
# def get_predicted_links(top_n: int = 15, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
#     """
#     node2vec + Logistic Regression predicted hidden connections.
#     NOTE: requires `pip install node2vec gensim` — heavy dependency, imported
#     lazily inside app/ml/link_prediction.py so the rest of the API works
#     without it installed.
#     """
#     from ..ml.link_prediction import train_and_evaluate
#     return train_and_evaluate(db, top_n=top_n)


# @router.get("")
# def get_graph(db: Session = Depends(get_db), officer=Depends(get_current_officer)):
#     """
#     Returns nodes + edges for the Graph Analytics page.
#     Edges come from THREE sources, not just the manually-entered relationships
#     table: a call record or a financial flow between two entities also draws
#     a connection — so a newly-added suspect shows up connected in the graph
#     as soon as any officer logs a call or transaction involving them, even
#     before anyone manually records a formal "relationship".
#     Influence is computed with networkx degree centrality over this combined
#     graph — this is the 'key individuals playing influential roles' requirement,
#     done without needing a graph database.
#     """
#     entities = db.query(models.Entity).all()
#     relationships = db.query(models.RelationshipEdge).all()
#     comms = db.query(models.CommunicationLink).all()
#     flows = db.query(models.FinancialFlow).all()

#     G = nx.Graph()
#     for e in entities:
#         G.add_node(e.id)

#     # Collect edges from all three sources, keeping the first label seen for
#     # each pair (a pair might have a relationship AND calls AND money — we
#     # only need one line drawn between them, not three overlapping ones).
#     edge_labels = {}
#     for r in relationships:
#         pair = frozenset([r.source_id, r.target_id])
#         edge_labels.setdefault(pair, (r.source_id, r.target_id, r.relationship_type))
#         G.add_edge(r.source_id, r.target_id)
#     for c in comms:
#         pair = frozenset([c.entity_1, c.entity_2])
#         edge_labels.setdefault(pair, (c.entity_1, c.entity_2, "calls"))
#         G.add_edge(c.entity_1, c.entity_2)
#     for f in flows:
#         pair = frozenset([f.from_entity, f.to_entity])
#         edge_labels.setdefault(pair, (f.from_entity, f.to_entity, f.purpose or "financial"))
#         G.add_edge(f.from_entity, f.to_entity)

#     centrality = nx.degree_centrality(G) if len(G.nodes) > 0 else {}

#     nodes = []
#     for e in entities:
#         nodes.append({
#             "id": e.id,
#             "name": e.name,
#             "cluster_id": e.cluster_id,
#             "cluster_label": e.cluster_label,
#             "cluster_color": e.cluster_color,
#             "country_base": e.country_base,
#             "influence_level": e.influence_level,
#             "role": e.role,
#             "computed_centrality": round(centrality.get(e.id, 0), 4),
#         })

#     edges = [{"source": s, "target": t, "type": label} for (s, t, label) in edge_labels.values()]

#     return {"nodes": nodes, "edges": edges}


from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import networkx as nx

from ..database import get_db
from .. import models
from ..auth import get_current_officer
from ..ml.anomaly import score_anomalies
from ..geo_lookup import resolve_coordinates, jitter

router = APIRouter(prefix="/graph", tags=["graph"])


@router.get("/anomalies")
def get_anomalies(top_n: int = 10, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
    """
    Unsupervised anomaly scores (Isolation Forest) — entities whose network
    footprint (relationships, call volume, money flow, centrality) looks
    statistically unusual. No labels given to the model; see app/ml/anomaly.py.
    """
    return {"anomalies": score_anomalies(db, top_n=top_n)}


@router.get("/predicted-links")
def get_predicted_links(top_n: int = 15, db: Session = Depends(get_db), officer=Depends(get_current_officer)):
    """
    Classical-features + Logistic Regression predicted hidden connections
    (see app/ml/link_prediction.py for the method and honest AUC).
    """
    from ..ml.link_prediction import train_and_evaluate
    result = train_and_evaluate(db, top_n=top_n)

    # Attach human-readable names so the UI doesn't have to show raw ids
    for link in result.get("predicted_links", []):
        name1 = db.query(models.Entity.name).filter(models.Entity.id == link["entity_1"]).scalar()
        name2 = db.query(models.Entity.name).filter(models.Entity.id == link["entity_2"]).scalar()
        link["entity_1_name"] = name1 or link["entity_1"]
        link["entity_2_name"] = name2 or link["entity_2"]

    return result

@router.get("")
def get_graph(db: Session = Depends(get_db), officer=Depends(get_current_officer)):
    """
    Returns nodes + edges for the Graph Analytics page.
    Edges come from THREE sources, not just the manually-entered relationships
    table: a call record or a financial flow between two entities also draws
    a connection — so a newly-added suspect shows up connected in the graph
    as soon as any officer logs a call or transaction involving them, even
    before anyone manually records a formal "relationship".
    Influence is computed with networkx degree centrality over this combined
    graph — this is the 'key individuals playing influential roles' requirement,
    done without needing a graph database.
    """
    entities = db.query(models.Entity).all()
    relationships = db.query(models.RelationshipEdge).all()
    comms = db.query(models.CommunicationLink).all()
    flows = db.query(models.FinancialFlow).all()

    G = nx.Graph()
    for e in entities:
        G.add_node(e.id)

    # Collect edges from all three sources, keeping the first label seen for
    # each pair (a pair might have a relationship AND calls AND money — we
    # only need one line drawn between them, not three overlapping ones).
    edge_labels = {}
    for r in relationships:
        pair = frozenset([r.source_id, r.target_id])
        edge_labels.setdefault(pair, (r.source_id, r.target_id, r.relationship_type))
        G.add_edge(r.source_id, r.target_id)
    for c in comms:
        pair = frozenset([c.entity_1, c.entity_2])
        edge_labels.setdefault(pair, (c.entity_1, c.entity_2, "calls"))
        G.add_edge(c.entity_1, c.entity_2)
    for f in flows:
        pair = frozenset([f.from_entity, f.to_entity])
        edge_labels.setdefault(pair, (f.from_entity, f.to_entity, f.purpose or "financial"))
        G.add_edge(f.from_entity, f.to_entity)

    centrality = nx.degree_centrality(G) if len(G.nodes) > 0 else {}

    nodes = []
    for e in entities:
        nodes.append({
            "id": e.id,
            "name": e.name,
            "cluster_id": e.cluster_id,
            "cluster_label": e.cluster_label,
            "cluster_color": e.cluster_color,
            "country_base": e.country_base,
            "influence_level": e.influence_level,
            "role": e.role,
            "computed_centrality": round(centrality.get(e.id, 0), 4),
        })

    edges = [{"source": s, "target": t, "type": label} for (s, t, label) in edge_labels.values()]

    return {"nodes": nodes, "edges": edges}


@router.get("/map")
def get_map_data(db: Session = Depends(get_db), officer=Depends(get_current_officer)):
    """
    Same underlying network as /graph, but with a resolved lat/lng per
    entity so it can be plotted on a real map instead of an abstract
    force-directed layout. Uses base_location (city) if set, falling back
    to country_base. Entities with no resolvable location are left out of
    the map (they still show fine on the regular graph).
    """
    entities = db.query(models.Entity).all()
    relationships = db.query(models.RelationshipEdge).all()
    comms = db.query(models.CommunicationLink).all()
    flows = db.query(models.FinancialFlow).all()

    located = {}
    for e in entities:
        coords = resolve_coordinates(e.base_location, e.country_base)
        if coords:
            lat, lng = jitter(e.id, *coords)
            located[e.id] = {
                "id": e.id, "name": e.name,
                "cluster_id": e.cluster_id, "cluster_label": e.cluster_label,
                "cluster_color": e.cluster_color, "base_location": e.base_location,
                "country_base": e.country_base, "lat": lat, "lng": lng,
            }

    edge_pairs = set()
    for r in relationships:
        edge_pairs.add(frozenset([r.source_id, r.target_id]))
    for c in comms:
        edge_pairs.add(frozenset([c.entity_1, c.entity_2]))
    for f in flows:
        edge_pairs.add(frozenset([f.from_entity, f.to_entity]))

    edges = []
    for pair in edge_pairs:
        a, b = tuple(pair) if len(pair) == 2 else (list(pair)[0], list(pair)[0])
        if a in located and b in located and a != b:
            edges.append({"source": a, "target": b})

    return {"nodes": list(located.values()), "edges": edges}
