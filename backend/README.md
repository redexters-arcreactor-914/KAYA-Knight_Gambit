# Knight Gambit — Backend

FastAPI backend for the criminal network analysis system.

## Local setup (no deployment yet — this is just for running on your own machine)

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m app.seed              # loads dataset.json, creates officer logins
uvicorn app.main:app --reload --port 8000
```

Open http://localhost:8000/docs — this gives you an interactive page to try
every API endpoint without needing the frontend built yet.

## Default officer logins (created by the seed script)

| username | password | role | can file |
|---|---|---|---|
| supervisor | supervisor123 | supervisor | sees/does everything |
| fir_officer | fir123 | fir | crime reports |
| financial_officer | financial123 | financial | financial flags |
| call_officer | call123 | call_recording | call records |

**Change these before you ever deploy this anywhere public.**

## Project layout

```
app/
  main.py              FastAPI app + route registration
  database.py          SQLite connection (swap DATABASE_URL env var for Postgres later)
  models.py            SQLAlchemy tables
  schemas.py           Pydantic request/response shapes
  auth.py              JWT login + password hashing
  seed.py              Loads dataset.json into the database
  dataset.json          The Dhurandhar-inspired demo network data
  routers/
    auth_router.py     POST /auth/login
    entities_router.py GET /entities (filters), GET /entities/{id}/profile
    graph_router.py    GET /graph, GET /graph/anomalies, GET /graph/predicted-links
    reports_router.py  POST /reports/crime | financial | call, GET /reports/filter,
                        POST /reports/crime/suggest-category
  ml/
    anomaly.py          Isolation Forest — unsupervised anomaly scoring
    link_prediction.py  node2vec + Logistic Regression — hidden link prediction
    crime_classifier.py TF-IDF + Logistic Regression — crime type suggestion
    crime_training_data.json  ~30 synthetic example FIR sentences
```

## About the three ML features — what to tell judges

**Anomaly detection (Isolation Forest)**: fully unsupervised — the model is
never told who the important criminals are. It flags entities whose network
footprint (call volume, money flow, relationship count, graph centrality)
looks statistically unusual. Tested against the seeded dataset: it correctly
surfaces the story's kingpins and lieutenants at the top, with isolated
civilian nodes at the bottom, purely from the numbers.

**Link prediction (node2vec + Logistic Regression)**: learns embeddings from
the existing relationship graph, then predicts which currently-unconnected
pairs are likely to actually be connected. Test AUC ≈ 0.83 on held-out edges.
Requires `pip install node2vec gensim` (listed in requirements.txt).

**Crime classification (TF-IDF + Logistic Regression)**: suggests a crime
category from an FIR officer's free-text description.
**Be upfront about this one**: training accuracy is ~100%, but that's
because it's trained on ~30 sentences we wrote ourselves, not real FIR
records. 3-fold cross-validation accuracy is much lower (~13%) — a more
honest number that shows the model is overfitting to our small, clean
synthetic examples. State this proactively rather than waiting to be asked:
"we're demonstrating the pipeline, not claiming production accuracy — this
would need real, larger, anonymized FIR data to be a trustworthy classifier."
