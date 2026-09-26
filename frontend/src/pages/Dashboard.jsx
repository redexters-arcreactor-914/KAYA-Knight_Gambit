import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { api } from "../api";

export default function Dashboard() {
  const [entities, setEntities] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.listEntities(), api.getAnomalies(3)])
      .then(([entityData, anomalyData]) => {
        setEntities(entityData);
        setAnomalies(anomalyData.anomalies || []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const clusters = new Set(entities.map((e) => e.cluster_id)).size;
  const highInfluence = entities.filter((e) => e.influence_level === "high").length;

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div className="page-header">
          <div className="kicker">OVERVIEW</div>
          <h1>Dashboard</h1>
        </div>

        {error && <ErrorNote message={error} />}
        {!error && loading && <p>Loading case data...</p>}

        {!error && !loading && (
          <>
            <div style={styles.statGrid}>
              <StatCard label="Tracked entities" value={entities.length} />
              <StatCard label="Network clusters" value={clusters} />
              <StatCard label="High-influence suspects" value={highInfluence} />
            </div>

            <div className="panel" style={{ marginTop: 24 }}>
              <h2>Top anomaly-flagged entities</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: 13.5 }}>
                Computed by the anomaly detection model from call volume, financial
                flow, and network centrality — no manual rules involved.
              </p>
              <table className="records">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Relationships</th>
                    <th>Calls</th>
                    <th>Anomaly score</th>
                  </tr>
                </thead>
                <tbody>
                  {anomalies.map((a) => (
                    <tr key={a.id}>
                      <td>{a.name}</td>
                      <td className="data">{a.num_relationships}</td>
                      <td className="data">{a.total_calls}</td>
                      <td className="data">{a.anomaly_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="panel" style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--ink)" }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>{label}</div>
    </div>
  );
}

function ErrorNote({ message }) {
  return (
    <div className="panel" style={{ borderColor: "var(--thread)", background: "var(--thread-soft)" }}>
      <strong style={{ color: "var(--thread)" }}>Couldn't load dashboard data.</strong>
      <p style={{ margin: "6px 0 0", fontSize: 13.5 }}>{message}</p>
      <p style={{ margin: "6px 0 0", fontSize: 13 }}>
        Make sure the backend is running: <code>uvicorn app.main:app --reload --port 8000</code>
      </p>
    </div>
  );
}

const styles = {
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
  },
};
