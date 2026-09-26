// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import AddRecordModal from "../components/AddRecordModal";
// import { api, getSession } from "../api";

// export default function CriminalReports() {
//   const [entities, setEntities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({ name: "", country_base: "", influence_level: "" });
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();
//   const session = getSession();
//   const canFile = ["fir", "financial", "call_recording", "supervisor"].includes(session?.role);

//   useEffect(() => {
//     load();
//   }, []);

//   function load(activeFilters = filters) {
//     setLoading(true);
//     const cleaned = Object.fromEntries(
//       Object.entries(activeFilters).filter(([, v]) => v)
//     );
//     api.listEntities(cleaned).then(setEntities).finally(() => setLoading(false));
//   }

//   function handleFilterChange(key, value) {
//     const next = { ...filters, [key]: value };
//     setFilters(next);
//     load(next);
//   }

//   return (
//     <div className="app-shell">
//       <Sidebar />
//       <main className="main-content">
//         <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
//           <div>
//             <div className="kicker">RECORDS</div>
//             <h1>Criminal reports</h1>
//           </div>
//           {canFile && (
//             <button className="btn btn-primary" onClick={() => setShowModal(true)}>
//               + Add record
//             </button>
//           )}
//         </div>

//         {showModal && (
//           <AddRecordModal
//             entities={entities}
//             onClose={() => setShowModal(false)}
//             onSaved={() => { setShowModal(false); load(); }}
//           />
//         )}

//         <div className="panel" style={{ marginBottom: 20 }}>
//           <div style={styles.filterRow}>
//             <div style={styles.filterField}>
//               <label style={styles.filterLabel}>Name</label>
//               <input
//                 style={styles.filterInput}
//                 placeholder="Search by name..."
//                 value={filters.name}
//                 onChange={(e) => handleFilterChange("name", e.target.value)}
//               />
//             </div>
//             <div style={styles.filterField}>
//               <label style={styles.filterLabel}>Country base</label>
//               <select
//                 style={styles.filterInput}
//                 value={filters.country_base}
//                 onChange={(e) => handleFilterChange("country_base", e.target.value)}
//               >
//                 <option value="">All</option>
//                 <option value="India">India</option>
//                 <option value="Pakistan">Pakistan</option>
//                 <option value="Afghanistan">Afghanistan</option>
//                 <option value="USA">USA</option>
//               </select>
//             </div>
//             <div style={styles.filterField}>
//               <label style={styles.filterLabel}>Influence level</label>
//               <select
//                 style={styles.filterInput}
//                 value={filters.influence_level}
//                 onChange={(e) => handleFilterChange("influence_level", e.target.value)}
//               >
//                 <option value="">All</option>
//                 <option value="high">High</option>
//                 <option value="medium">Medium</option>
//                 <option value="low">Low</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="panel">
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <table className="records">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Role</th>
//                   <th>Affiliation</th>
//                   <th>Country</th>
//                   <th>Phone</th>
//                   <th>Influence</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {entities.map((e) => (
//                   <tr key={e.id} onClick={() => navigate(`/suspect/${e.id}`)}>
//                     <td>{e.name}</td>
//                     <td style={{ color: "var(--text-secondary)" }}>{e.role || "—"}</td>
//                     <td style={{ color: "var(--text-secondary)" }}>{e.affiliation || "—"}</td>
//                     <td>{e.country_base || "—"}</td>
//                     <td className="data">{e.phone_number || "—"}</td>
//                     <td>
//                       <span className={`tag tag-influence-${e.influence_level}`}>
//                         {e.influence_level || "—"}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//           {!loading && entities.length === 0 && (
//             <p style={{ color: "var(--text-muted)" }}>No matching records.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// const styles = {
//   filterRow: { display: "flex", gap: 20, flexWrap: "wrap" },
//   filterField: { display: "flex", flexDirection: "column", minWidth: 200 },
//   filterLabel: {
//     fontSize: 12,
//     fontWeight: 500,
//     color: "var(--text-secondary)",
//     marginBottom: 5,
//   },
//   filterInput: {
//     padding: "8px 10px",
//     border: "1px solid var(--paper-line)",
//     borderRadius: 4,
//     background: "#fffdf8",
//   },
// };


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AddRecordModal from "../components/AddRecordModal";
import { api, getSession } from "../api";

export default function CriminalReports() {
  const [entities, setEntities] = useState([]); // used to feed the Add Record modal's suspect picker
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ crime_type: "", place: "", drug_related: "" });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const session = getSession();
  const canFile = ["fir", "financial", "call_recording", "supervisor"].includes(session?.role);

  useEffect(() => {
    api.listEntities().then(setEntities);
    load();
  }, []);

  function load(activeFilters = filters) {
    setLoading(true);
    const cleaned = Object.fromEntries(
      Object.entries(activeFilters).filter(([, v]) => v !== "")
    );
    if (cleaned.drug_related !== undefined) {
      cleaned.drug_related = cleaned.drug_related === "true";
    }
    api.filterReports(cleaned).then(setReports).finally(() => setLoading(false));
  }

  function handleFilterChange(key, value) {
    const next = { ...filters, [key]: value };
    setFilters(next);
    load(next);
  }

  function handleSaved() {
    setShowModal(false);
    load();
    api.listEntities().then(setEntities); // refresh in case a new suspect was created
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div className="kicker">RECORDS</div>
            <h1>Criminal reports</h1>
          </div>
          {canFile && (
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + Add record
            </button>
          )}
        </div>

        {showModal && (
          <AddRecordModal
            entities={entities}
            onClose={() => setShowModal(false)}
            onSaved={handleSaved}
          />
        )}

        <div className="panel" style={{ marginBottom: 20 }}>
          <div style={styles.filterRow}>
            <div style={styles.filterField}>
              <label style={styles.filterLabel}>Crime type</label>
              <input
                style={styles.filterInput}
                placeholder="e.g. kidnapping..."
                value={filters.crime_type}
                onChange={(e) => handleFilterChange("crime_type", e.target.value)}
              />
            </div>
            <div style={styles.filterField}>
              <label style={styles.filterLabel}>Place</label>
              <input
                style={styles.filterInput}
                placeholder="e.g. Lyari, Mumbai..."
                value={filters.place}
                onChange={(e) => handleFilterChange("place", e.target.value)}
              />
            </div>
            <div style={styles.filterField}>
              <label style={styles.filterLabel}>Drug-related</label>
              <select
                style={styles.filterInput}
                value={filters.drug_related}
                onChange={(e) => handleFilterChange("drug_related", e.target.value)}
              >
                <option value="">All</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="panel">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="records">
              <thead>
                <tr>
                  <th>Suspect</th>
                  <th>Crime type</th>
                  <th>Place</th>
                  <th>Date</th>
                  <th>Vehicle</th>
                  <th>Drugs</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id} onClick={() => navigate(`/suspect/${r.entity_id}`)}>
                    <td>{r.entity_name}</td>
                    <td style={{ color: "var(--text-secondary)" }}>{r.crime_type}</td>
                    <td>{r.place || "—"}</td>
                    <td className="data">{r.date || "—"}</td>
                    <td style={{ color: "var(--text-secondary)" }}>{r.vehicle_info || "—"}</td>
                    <td>{r.drug_related ? <span className="tag tag-influence-high">yes</span> : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && reports.length === 0 && (
            <p style={{ color: "var(--text-muted)" }}>No matching records.</p>
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  filterRow: { display: "flex", gap: 20, flexWrap: "wrap" },
  filterField: { display: "flex", flexDirection: "column", minWidth: 200 },
  filterLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: "var(--text-secondary)",
    marginBottom: 5,
  },
  filterInput: {
    padding: "8px 10px",
    border: "1px solid var(--paper-line)",
    borderRadius: 4,
    background: "#fffdf8",
  },
};
