import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { api, getSession } from "../api";

const TYPE_LABELS = {
  crime_report: "Crime report",
  financial_flow: "Financial flag",
  communication_link: "Call record",
};

export default function AuditLog() {
  const session = getSession();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getAuditLog()
      .then((d) => setEntries(d.entries))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (session?.role !== "supervisor") {
    return (
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div className="kicker">ACCESS RESTRICTED</div>
            <h1>Audit log</h1>
          </div>
          <p style={{ color: "var(--text-secondary)" }}>
            Only a case supervisor can view the audit log.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div className="page-header">
          <div className="kicker">ACCOUNTABILITY</div>
          <h1>Audit log</h1>
        </div>
        <p style={{ color: "var(--text-secondary)", maxWidth: 620 }}>
          Every crime report, financial flag, and call record filed in the
          system, with the officer who filed it and when.
        </p>

        {loading && <p style={{ color: "var(--text-muted)" }}>Loading...</p>}
        {error && <div className="panel" style={{ color: "var(--thread)", padding: 14 }}>{error}</div>}

        {!loading && !error && (
          <table className="panel" style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Suspect</th>
                <th style={styles.th}>Summary</th>
                <th style={styles.th}>Filed by</th>
                <th style={styles.th}>When</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={`${e.record_type}-${e.id}`}>
                  <td style={styles.td}>{TYPE_LABELS[e.record_type] || e.record_type}</td>
                  <td style={styles.td}>
                    <Link to={`/suspect/${e.entity_id}`}>{e.entity_id}</Link>
                  </td>
                  <td style={styles.td}>{e.summary}</td>
                  <td style={styles.td}>
                    {e.officer.full_name}
                    {e.officer.role && (
                      <span style={{ color: "var(--text-muted)", fontSize: 11.5 }}> ({e.officer.role})</span>
                    )}
                  </td>
                  <td style={{ ...styles.td, fontFamily: "var(--font-data)", fontSize: 12 }}>
                    {e.filed_at ? new Date(e.filed_at).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr><td style={styles.td} colSpan={5}>No records filed yet.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

const styles = {
  table: { width: "100%", borderCollapse: "collapse", marginTop: 20 },
  th: {
    textAlign: "left", fontSize: 11.5, letterSpacing: "0.05em", color: "var(--text-muted)",
    padding: "10px 14px", borderBottom: "1px solid var(--paper-line)",
  },
  td: {
    padding: "10px 14px", borderBottom: "1px solid var(--paper-line)", fontSize: 13,
  },
};
