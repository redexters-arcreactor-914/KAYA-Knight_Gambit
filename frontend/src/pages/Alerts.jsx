import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { api } from "../api";

export default function Alerts() {
  const [anomalies, setAnomalies] = useState([]);
  const [links, setLinks] = useState(null);
  const [linksError, setLinksError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAnomalies(10).then((d) => setAnomalies(d.anomalies || [])).finally(() => setLoading(false));
    api.getPredictedLinks(10).then(setLinks).catch((e) => setLinksError(e.message));
  }, []);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div className="page-header">
          <div className="kicker">MONITORING</div>
          <h1>Alerts &amp; suspicious activity</h1>
        </div>

        <div className="panel" style={{ marginBottom: 20 }}>
          <h2>AI-flagged anomalies</h2>
          <p style={{ fontSize: 13.5, color: "var(--text-secondary)" }}>
            Unsupervised — the model isn't told who's important. It flags entities whose
            call volume, money flow, and network position stand out statistically.
          </p>
          {loading && <p>Loading...</p>}
          {!loading && (
            <table className="records">
              <thead>
                <tr><th>Name</th><th>Anomaly score</th><th>Relationships</th><th>Calls</th></tr>
              </thead>
              <tbody>
                {anomalies.map((a) => (
                  <tr key={a.id}>
                    <td><Link to={`/suspect/${a.id}`}>{a.name}</Link></td>
                    <td className="data" style={{ color: "var(--thread)", fontWeight: 500 }}>{a.anomaly_score}</td>
                    <td className="data">{a.num_relationships}</td>
                    <td className="data">{a.total_calls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="panel">
          <h2>Potential undetected links</h2>
          <p style={{ fontSize: 13.5, color: "var(--text-secondary)" }}>
            Predicted by comparing network position patterns — pairs with no recorded
            relationship that the model thinks are likely connected.
            {links && <> Model test accuracy (AUC): <span className="data">{links.test_auc}</span></>}
          </p>
          {linksError && (
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
              Not available yet — this needs <code>node2vec</code> and <code>gensim</code> installed
              in the backend (see backend/README.md).
            </p>
          )}
          {links && (
            <table className="records">
              <thead>
                <tr><th>Entity 1</th><th>Entity 2</th><th>Confidence</th></tr>
              </thead>
              <tbody>
                {links.predicted_links.map((l, i) => (
                  <tr key={i}>
                    <td><Link to={`/suspect/${l.entity_1}`}>{l.entity_1_name}</Link></td>
                    <td><Link to={`/suspect/${l.entity_2}`}>{l.entity_2_name}</Link></td>
                    <td className="data">{l.confidence}</td>
                  </tr>

                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
