
"""
Knight Gambit — Criminal Network Analysis System, backend entrypoint.

Run locally:
    cd backend
    python -m venv venv && source venv/bin/activate   (Windows: venv\\Scripts\\activate)
    pip install -r requirements.txt
    python -m app.seed          # loads dataset.json + creates default officer logins
    uvicorn app.main:app --reload --port 8000

Then open http://localhost:8000/docs for interactive API docs.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import auth_router, entities_router, graph_router, reports_router, clusters_router, audit_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Knight Gambit API", version="0.1.0")

# Allow the local React dev server to call this API. Tighten this list
# before deploying anywhere public.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(entities_router.router)
app.include_router(graph_router.router)
app.include_router(reports_router.router)
app.include_router(clusters_router.router)
app.include_router(audit_router.router)


@app.get("/")
def root():
    return {"status": "Knight Gambit API running", "docs": "/docs"}
