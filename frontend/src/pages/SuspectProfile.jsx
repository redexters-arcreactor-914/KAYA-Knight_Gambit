// // // import { useEffect, useState } from "react";
// // // import { useParams, Link } from "react-router-dom";
// // // import Sidebar from "../components/Sidebar";
// // // import { api } from "../api";

// // // export default function SuspectProfile() {
// // //   const { id } = useParams();
// // //   const [profile, setProfile] = useState(null);
// // //   const [error, setError] = useState("");

// // //   useEffect(() => {
// // //     api.getSuspectProfile(id).then(setProfile).catch((e) => setError(e.message));
// // //   }, [id]);

// // //   if (error) {
// // //     return (
// // //       <div className="app-shell">
// // //         <Sidebar />
// // //         <main className="main-content">
// // //           <p>Could not load this suspect: {error}</p>
// // //         </main>
// // //       </div>
// // //     );
// // //   }

// // //   if (!profile) {
// // //     return (
// // //       <div className="app-shell">
// // //         <Sidebar />
// // //         <main className="main-content"><p>Loading...</p></main>
// // //       </div>
// // //     );
// // //   }

// // //   const { entity, crime_reports, financial_flows, communications, top_connections } = profile;

// // //   return (
// // //     <div className="app-shell">
// // //       <Sidebar />
// // //       <main className="main-content">
// // //         <Link to="/reports" style={{ fontSize: 13 }}>&larr; Back to reports</Link>

// // //         <div style={styles.header}>
// // //           <div style={styles.photoPlaceholder}>{initials(entity.name)}</div>
// // //           <div>
// // //             <h1 style={{ marginBottom: 4 }}>{entity.name}</h1>
// // //             <p style={{ margin: 0, color: "var(--text-secondary)" }}>
// // //               {entity.role} &middot; {entity.affiliation} &middot; {entity.country_base}
// // //             </p>
// // //             <span className={`tag tag-influence-${entity.influence_level}`} style={{ marginTop: 8, display: "inline-block" }}>
// // //               {entity.influence_level} influence
// // //             </span>
// // //           </div>
// // //         </div>

// // //         <div style={styles.grid}>
// // //           <div className="panel">
// // //             <h2>Crime reports</h2>
// // //             {crime_reports.length === 0 && <Empty text="No FIRs filed yet." />}
// // //             {crime_reports.map((r) => (
// // //               <div key={r.id} style={styles.recordRow}>
// // //                 <strong>{r.crime_type}</strong> — {r.place || "location unknown"}
// // //                 <div style={styles.recordMeta}>{r.date || "date unrecorded"}{r.drug_related ? " · drug-related" : ""}</div>
// // //                 {r.description && <p style={styles.recordDesc}>{r.description}</p>}
// // //               </div>
// // //             ))}
// // //           </div>

// // //           <div className="panel">
// // //             <h2>Financial flags</h2>
// // //             {financial_flows.length === 0 && <Empty text="No financial flags yet." />}
// // //             {financial_flows.map((f) => (
// // //               <div key={f.id} style={styles.recordRow}>
// // //                 <span className="data">{f.currency} {formatAmount(f.amount)}</span>
// // //                 <div style={styles.recordMeta}>{f.purpose} &middot; {f.date || "date unrecorded"}</div>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           <div className="panel">
// // //             <h2>Call records</h2>
// // //             {communications.length === 0 && <Empty text="No call records yet." />}
// // //             {communications.map((c) => (
// // //               <div key={c.id} style={styles.recordRow}>
// // //                 Contacted <strong>{c.entity_1 === entity.id ? c.entity_2 : c.entity_1}</strong>
// // //                 {" "}(<span className="data">{c.call_count}x</span>)
// // //                 {c.note && <div style={styles.recordMeta}>{c.note}</div>}
// // //               </div>
// // //             ))}
// // //           </div>

// // //           <div className="panel">
// // //             <h2>Top connections</h2>
// // //             {top_connections.length === 0 && <Empty text="No connections recorded." />}
// // //             {top_connections.map((c) => (
// // //               <Link key={c.id} to={`/suspect/${c.id}`} style={styles.connectionRow}>
// // //                 <span>{c.name}</span>
// // //                 <span className="data" style={{ color: "var(--text-muted)" }}>{c.call_count} calls</span>
// // //               </Link>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // function Empty({ text }) {
// // //   return <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>{text}</p>;
// // // }

// // // function initials(name) {
// // //   return name.split(/[\s/]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
// // // }

// // // function formatAmount(n) {
// // //   if (n == null) return "—";
// // //   return n.toLocaleString();
// // // }

// // // const styles = {
// // //   header: {
// // //     display: "flex",
// // //     alignItems: "center",
// // //     gap: 20,
// // //     margin: "20px 0 28px",
// // //   },
// // //   photoPlaceholder: {
// // //     width: 72,
// // //     height: 72,
// // //     borderRadius: 6,
// // //     background: "var(--ink)",
// // //     color: "var(--text-on-ink)",
// // //     display: "flex",
// // //     alignItems: "center",
// // //     justifyContent: "center",
// // //     fontFamily: "var(--font-display)",
// // //     fontSize: 24,
// // //     flexShrink: 0,
// // //   },
// // //   grid: {
// // //     display: "grid",
// // //     gridTemplateColumns: "1fr 1fr",
// // //     gap: 16,
// // //   },
// // //   recordRow: {
// // //     padding: "10px 0",
// // //     borderBottom: "1px solid var(--paper-line)",
// // //     fontSize: 14,
// // //   },
// // //   recordMeta: {
// // //     fontSize: 12.5,
// // //     color: "var(--text-muted)",
// // //     marginTop: 2,
// // //   },
// // //   recordDesc: {
// // //     fontSize: 13,
// // //     color: "var(--text-secondary)",
// // //     margin: "4px 0 0",
// // //   },
// // //   connectionRow: {
// // //     display: "flex",
// // //     justifyContent: "space-between",
// // //     padding: "9px 0",
// // //     borderBottom: "1px solid var(--paper-line)",
// // //     color: "var(--text-primary)",
// // //     fontSize: 14,
// // //   },
// // // };

// // import { useEffect, useState } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import Sidebar from "../components/Sidebar";
// // import { api, getSession } from "../api";

// // export default function SuspectProfile() {
// //   const { id } = useParams();
// //   const [profile, setProfile] = useState(null);
// //   const [error, setError] = useState("");
// //   const [editing, setEditing] = useState(false);
// //   const [form, setForm] = useState({});
// //   const [saving, setSaving] = useState(false);
// //   const session = getSession();
// //   const canEdit = session?.role === "supervisor";

// //   function loadProfile() {
// //     api.getSuspectProfile(id).then((p) => {
// //       setProfile(p);
// //       setForm({
// //         role: p.entity.role || "", affiliation: p.entity.affiliation || "",
// //         country_base: p.entity.country_base || "", phone_number: p.entity.phone_number || "",
// //         influence_level: p.entity.influence_level || "low", description: p.entity.description || "",
// //       });
// //     }).catch((e) => setError(e.message));
// //   }

// //   useEffect(() => { loadProfile(); }, [id]);

// //   async function handleSaveDetails() {
// //     setSaving(true);
// //     try {
// //       await api.updateEntity(id, form);
// //       setEditing(false);
// //       loadProfile();
// //     } catch (err) {
// //       alert(err.message);
// //     } finally {
// //       setSaving(false);
// //     }
// //   }

// //   if (error) {
// //     return (
// //       <div className="app-shell">
// //         <Sidebar />
// //         <main className="main-content">
// //           <p>Could not load this suspect: {error}</p>
// //         </main>
// //       </div>
// //     );
// //   }

// //   if (!profile) {
// //     return (
// //       <div className="app-shell">
// //         <Sidebar />
// //         <main className="main-content"><p>Loading...</p></main>
// //       </div>
// //     );
// //   }

// //   const { entity, crime_reports, financial_flows, communications, top_connections } = profile;

// //   return (
// //     <div className="app-shell">
// //       <Sidebar />
// //       <main className="main-content">
// //         <Link to="/reports" style={{ fontSize: 13 }}>&larr; Back to reports</Link>

// //         <div style={styles.header}>
// //           <div style={styles.photoPlaceholder}>{initials(entity.name)}</div>
// //           <div style={{ flex: 1 }}>
// //             <h1 style={{ marginBottom: 4 }}>{entity.name}</h1>

// //             {!editing && (
// //               <>
// //                 <p style={{ margin: 0, color: "var(--text-secondary)" }}>
// //                   {entity.role || "role unknown"} &middot; {entity.affiliation || "affiliation unknown"} &middot; {entity.country_base || "country unknown"}
// //                   {entity.phone_number && <> &middot; <span className="data">{entity.phone_number}</span></>}
// //                 </p>
// //                 <span className={`tag tag-influence-${entity.influence_level}`} style={{ marginTop: 8, display: "inline-block" }}>
// //                   {entity.influence_level} influence
// //                 </span>
// //                 {canEdit && (
// //                   <button className="btn btn-secondary" style={{ marginLeft: 10, fontSize: 12.5 }} onClick={() => setEditing(true)}>
// //                     Edit details
// //                   </button>
// //                 )}
// //               </>
// //             )}

// //             {editing && (
// //               <div style={styles.editGrid}>
// //                 <input style={styles.editInput} placeholder="Role" value={form.role}
// //                   onChange={(e) => setForm({ ...form, role: e.target.value })} />
// //                 <input style={styles.editInput} placeholder="Affiliation" value={form.affiliation}
// //                   onChange={(e) => setForm({ ...form, affiliation: e.target.value })} />
// //                 <input style={styles.editInput} placeholder="Country" value={form.country_base}
// //                   onChange={(e) => setForm({ ...form, country_base: e.target.value })} />
// //                 <input style={styles.editInput} placeholder="Phone number" value={form.phone_number}
// //                   onChange={(e) => setForm({ ...form, phone_number: e.target.value })} />
// //                 <select style={styles.editInput} value={form.influence_level}
// //                   onChange={(e) => setForm({ ...form, influence_level: e.target.value })}>
// //                   <option value="low">low</option>
// //                   <option value="medium">medium</option>
// //                   <option value="high">high</option>
// //                 </select>
// //                 <textarea style={{ ...styles.editInput, gridColumn: "1 / -1", minHeight: 50 }} placeholder="Description"
// //                   value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
// //                 <div style={{ display: "flex", gap: 8 }}>
// //                   <button className="btn btn-primary" onClick={handleSaveDetails} disabled={saving}>
// //                     {saving ? "Saving..." : "Save"}
// //                   </button>
// //                   <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         <div style={styles.grid}>
// //           <div className="panel">
// //             <h2>Crime reports</h2>
// //             {crime_reports.length === 0 && <Empty text="No FIRs filed yet." />}
// //             {crime_reports.map((r) => (
// //               <div key={r.id} style={styles.recordRow}>
// //                 <strong>{r.crime_type}</strong> — {r.place || "location unknown"}
// //                 <div style={styles.recordMeta}>{r.date || "date unrecorded"}{r.drug_related ? " · drug-related" : ""}</div>
// //                 {r.description && <p style={styles.recordDesc}>{r.description}</p>}
// //               </div>
// //             ))}
// //           </div>

// //           <div className="panel">
// //             <h2>Financial flags</h2>
// //             {financial_flows.length === 0 && <Empty text="No financial flags yet." />}
// //             {financial_flows.map((f) => (
// //               <div key={f.id} style={styles.recordRow}>
// //                 <span className="data">{f.currency} {formatAmount(f.amount)}</span>
// //                 <div style={styles.recordMeta}>
// //                   {f.from_entity_name} &rarr; {f.to_entity_name} &middot; {f.purpose} &middot; {f.date || "date unrecorded"}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="panel">
// //             <h2>Call records</h2>
// //             {communications.length === 0 && <Empty text="No call records yet." />}
// //             {communications.map((c) => (
// //               <div key={c.id} style={styles.recordRow}>
// //                 Contacted <strong>{c.entity_1 === entity.id ? c.entity_2_name : c.entity_1_name}</strong>
// //                 {" "}(<span className="data">{c.call_count}x</span>)
// //                 {c.note && <div style={styles.recordMeta}>{c.note}</div>}
// //               </div>
// //             ))}
// //           </div>

// //           <div className="panel">
// //             <h2>Top connections</h2>
// //             {top_connections.length === 0 && <Empty text="No connections recorded." />}
// //             {top_connections.map((c) => (
// //               <Link key={c.id} to={`/suspect/${c.id}`} style={styles.connectionRow}>
// //                 <span>{c.name}</span>
// //                 <span className="data" style={{ color: "var(--text-muted)" }}>{c.call_count} calls</span>
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // function Empty({ text }) {
// //   return <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>{text}</p>;
// // }

// // function initials(name) {
// //   return name.split(/[\s/]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
// // }

// // function formatAmount(n) {
// //   if (n == null) return "—";
// //   return n.toLocaleString();
// // }

// // const styles = {
// //   editGrid: {
// //     display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8, maxWidth: 480,
// //   },
// //   editInput: {
// //     padding: "7px 9px", border: "1px solid var(--paper-line)", borderRadius: 4,
// //     background: "#fffdf8", fontSize: 13, fontFamily: "var(--font-body)",
// //   },
// //   header: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: 20,
// //     margin: "20px 0 28px",
// //   },
// //   photoPlaceholder: {
// //     width: 72,
// //     height: 72,
// //     borderRadius: 6,
// //     background: "var(--ink)",
// //     color: "var(--text-on-ink)",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     fontFamily: "var(--font-display)",
// //     fontSize: 24,
// //     flexShrink: 0,
// //   },
// //   grid: {
// //     display: "grid",
// //     gridTemplateColumns: "1fr 1fr",
// //     gap: 16,
// //   },
// //   recordRow: {
// //     padding: "10px 0",
// //     borderBottom: "1px solid var(--paper-line)",
// //     fontSize: 14,
// //   },
// //   recordMeta: {
// //     fontSize: 12.5,
// //     color: "var(--text-muted)",
// //     marginTop: 2,
// //   },
// //   recordDesc: {
// //     fontSize: 13,
// //     color: "var(--text-secondary)",
// //     margin: "4px 0 0",
// //   },
// //   connectionRow: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     padding: "9px 0",
// //     borderBottom: "1px solid var(--paper-line)",
// //     color: "var(--text-primary)",
// //     fontSize: 14,
// //   },
// // };


// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import { api, getSession } from "../api";

// export default function SuspectProfile() {
//   const { id } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState("");
//   const [editing, setEditing] = useState(false);
//   const [form, setForm] = useState({});
//   const [saving, setSaving] = useState(false);
//   const session = getSession();
//   const canEdit = session?.role === "supervisor";

//   function loadProfile() {
//     api.getSuspectProfile(id).then((p) => {
//       setProfile(p);
//       setForm({
//         role: p.entity.role || "", affiliation: p.entity.affiliation || "",
//         country_base: p.entity.country_base || "", phone_number: p.entity.phone_number || "",
//         influence_level: p.entity.influence_level || "low", description: p.entity.description || "",
//         base_location: p.entity.base_location || "",
//       });
//     }).catch((e) => setError(e.message));
//   }

//   useEffect(() => { loadProfile(); }, [id]);

//   async function handleSaveDetails() {
//     setSaving(true);
//     try {
//       await api.updateEntity(id, form);
//       setEditing(false);
//       loadProfile();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (error) {
//     return (
//       <div className="app-shell">
//         <Sidebar />
//         <main className="main-content">
//           <p>Could not load this suspect: {error}</p>
//         </main>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="app-shell">
//         <Sidebar />
//         <main className="main-content"><p>Loading...</p></main>
//       </div>
//     );
//   }

//   const { entity, crime_reports, financial_flows, communications, top_connections } = profile;

//   return (
//     <div className="app-shell">
//       <Sidebar />
//       <main className="main-content">
//         <Link to="/reports" style={{ fontSize: 13 }}>&larr; Back to reports</Link>

//         <div style={styles.header}>
//           <div style={styles.photoPlaceholder}>{initials(entity.name)}</div>
//           <div style={{ flex: 1 }}>
//             <h1 style={{ marginBottom: 4 }}>{entity.name}</h1>

//             {!editing && (
//               <>
//                 <p style={{ margin: 0, color: "var(--text-secondary)" }}>
//                   {entity.role || "role unknown"} &middot; {entity.affiliation || "affiliation unknown"} &middot; {entity.country_base || "country unknown"}
//                   {entity.phone_number && <> &middot; <span className="data">{entity.phone_number}</span></>}
//                 </p>
//                 <span className={`tag tag-influence-${entity.influence_level}`} style={{ marginTop: 8, display: "inline-block" }}>
//                   {entity.influence_level} influence
//                 </span>
//                 {canEdit && (
//                   <button className="btn btn-secondary" style={{ marginLeft: 10, fontSize: 12.5 }} onClick={() => setEditing(true)}>
//                     Edit details
//                   </button>
//                 )}
//               </>
//             )}

//             {editing && (
//               <div style={styles.editGrid}>
//                 <input style={styles.editInput} placeholder="Role" value={form.role}
//                   onChange={(e) => setForm({ ...form, role: e.target.value })} />
//                 <input style={styles.editInput} placeholder="Affiliation" value={form.affiliation}
//                   onChange={(e) => setForm({ ...form, affiliation: e.target.value })} />
//                 <input style={styles.editInput} placeholder="Country" value={form.country_base}
//                   onChange={(e) => setForm({ ...form, country_base: e.target.value })} />
//                 <input style={styles.editInput} placeholder="Phone number" value={form.phone_number}
//                   onChange={(e) => setForm({ ...form, phone_number: e.target.value })} />
//                 <input style={styles.editInput} placeholder="Base location (city, e.g. Lyari)" value={form.base_location}
//                   onChange={(e) => setForm({ ...form, base_location: e.target.value })} />
//                 <select style={styles.editInput} value={form.influence_level}
//                   onChange={(e) => setForm({ ...form, influence_level: e.target.value })}>
//                   <option value="low">low</option>
//                   <option value="medium">medium</option>
//                   <option value="high">high</option>
//                 </select>
//                 <textarea style={{ ...styles.editInput, gridColumn: "1 / -1", minHeight: 50 }} placeholder="Description"
//                   value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//                 <div style={{ display: "flex", gap: 8 }}>
//                   <button className="btn btn-primary" onClick={handleSaveDetails} disabled={saving}>
//                     {saving ? "Saving..." : "Save"}
//                   </button>
//                   <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div style={styles.grid}>
//           <div className="panel">
//             <h2>Crime reports</h2>
//             {crime_reports.length === 0 && <Empty text="No FIRs filed yet." />}
//             {crime_reports.map((r) => (
//               <div key={r.id} style={styles.recordRow}>
//                 <strong>{r.crime_type}</strong> — {r.place || "location unknown"}
//                 <div style={styles.recordMeta}>{r.date || "date unrecorded"}{r.drug_related ? " · drug-related" : ""}</div>
//                 {r.description && <p style={styles.recordDesc}>{r.description}</p>}
//               </div>
//             ))}
//           </div>

//           <div className="panel">
//             <h2>Financial flags</h2>
//             {financial_flows.length === 0 && <Empty text="No financial flags yet." />}
//             {financial_flows.map((f) => (
//               <div key={f.id} style={styles.recordRow}>
//                 <span className="data">{f.currency} {formatAmount(f.amount)}</span>
//                 <div style={styles.recordMeta}>
//                   {f.from_entity_name} &rarr; {f.to_entity_name} &middot; {f.purpose} &middot; {f.date || "date unrecorded"}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="panel">
//             <h2>Call records</h2>
//             {communications.length === 0 && <Empty text="No call records yet." />}
//             {communications.map((c) => (
//               <div key={c.id} style={styles.recordRow}>
//                 Contacted <strong>{c.entity_1 === entity.id ? c.entity_2_name : c.entity_1_name}</strong>
//                 {" "}(<span className="data">{c.call_count}x</span>)
//                 {c.note && <div style={styles.recordMeta}>{c.note}</div>}
//               </div>
//             ))}
//           </div>

//           <div className="panel">
//             <h2>Top connections</h2>
//             {top_connections.length === 0 && <Empty text="No connections recorded." />}
//             {top_connections.map((c) => (
//               <Link key={c.id} to={`/suspect/${c.id}`} style={styles.connectionRow}>
//                 <span>{c.name}</span>
//                 <span className="data" style={{ color: "var(--text-muted)" }}>{c.call_count} calls</span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// function Empty({ text }) {
//   return <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>{text}</p>;
// }

// function initials(name) {
//   return name.split(/[\s/]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
// }

// function formatAmount(n) {
//   if (n == null) return "—";
//   return n.toLocaleString();
// }

// const styles = {
//   editGrid: {
//     display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8, maxWidth: 480,
//   },
//   editInput: {
//     padding: "7px 9px", border: "1px solid var(--paper-line)", borderRadius: 4,
//     background: "#fffdf8", fontSize: 13, fontFamily: "var(--font-body)",
//   },
//   header: {
//     display: "flex",
//     alignItems: "center",
//     gap: 20,
//     margin: "20px 0 28px",
//   },
//   photoPlaceholder: {
//     width: 72,
//     height: 72,
//     borderRadius: 6,
//     background: "var(--ink)",
//     color: "var(--text-on-ink)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontFamily: "var(--font-display)",
//     fontSize: 24,
//     flexShrink: 0,
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: 16,
//   },
//   recordRow: {
//     padding: "10px 0",
//     borderBottom: "1px solid var(--paper-line)",
//     fontSize: 14,
//   },
//   recordMeta: {
//     fontSize: 12.5,
//     color: "var(--text-muted)",
//     marginTop: 2,
//   },
//   recordDesc: {
//     fontSize: 13,
//     color: "var(--text-secondary)",
//     margin: "4px 0 0",
//   },
//   connectionRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "9px 0",
//     borderBottom: "1px solid var(--paper-line)",
//     color: "var(--text-primary)",
//     fontSize: 14,
//   },
// };


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { api, getSession } from "../api";

export default function SuspectProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const session = getSession();
  const canEdit = session?.role === "supervisor";

  function loadProfile() {
    api.getSuspectProfile(id).then((p) => {
      setProfile(p);
      setForm({
        role: p.entity.role || "", affiliation: p.entity.affiliation || "",
        country_base: p.entity.country_base || "", phone_number: p.entity.phone_number || "",
        influence_level: p.entity.influence_level || "low", description: p.entity.description || "",
        base_location: p.entity.base_location || "",
      });
    }).catch((e) => setError(e.message));
  }

  useEffect(() => { loadProfile(); }, [id]);

  async function handleSaveDetails() {
    setSaving(true);
    try {
      await api.updateEntity(id, form);
      setEditing(false);
      loadProfile();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (error) {
    return (
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          <p>Could not load this suspect: {error}</p>
        </main>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="app-shell">
        <Sidebar />
        <main className="main-content"><p>Loading...</p></main>
      </div>
    );
  }

  const { entity, crime_reports, financial_flows, communications, top_connections } = profile;

  return (
    <>
      <style>{`
        .print-only { display: none; }
        @media print {
          .screen-only { display: none !important; }
          .print-only { display: block !important; }
          body { background: #fff; }
        }
      `}</style>

      {/* ---------- Normal on-screen view ---------- */}
      <div className="app-shell screen-only">
        <Sidebar />
        <main className="main-content">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link to="/reports" style={{ fontSize: 13 }}>&larr; Back to reports</Link>
            <button className="btn btn-secondary" onClick={() => window.print()}>
              Print report
            </button>
          </div>

          <div style={styles.header}>
            <div style={styles.photoPlaceholder}>{initials(entity.name)}</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ marginBottom: 4 }}>{entity.name}</h1>

              {!editing && (
                <>
                  <p style={{ margin: 0, color: "var(--text-secondary)" }}>
                    {entity.role || "role unknown"} &middot; {entity.affiliation || "affiliation unknown"} &middot; {entity.country_base || "country unknown"}
                    {entity.phone_number && <> &middot; <span className="data">{entity.phone_number}</span></>}
                  </p>
                  <span className={`tag tag-influence-${entity.influence_level}`} style={{ marginTop: 8, display: "inline-block" }}>
                    {entity.influence_level} influence
                  </span>
                  {canEdit && (
                    <button className="btn btn-secondary" style={{ marginLeft: 10, fontSize: 12.5 }} onClick={() => setEditing(true)}>
                      Edit details
                    </button>
                  )}
                </>
              )}

              {editing && (
                <div style={styles.editGrid}>
                  <input style={styles.editInput} placeholder="Role" value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })} />
                  <input style={styles.editInput} placeholder="Affiliation" value={form.affiliation}
                    onChange={(e) => setForm({ ...form, affiliation: e.target.value })} />
                  <input style={styles.editInput} placeholder="Country" value={form.country_base}
                    onChange={(e) => setForm({ ...form, country_base: e.target.value })} />
                  <input style={styles.editInput} placeholder="Phone number" value={form.phone_number}
                    onChange={(e) => setForm({ ...form, phone_number: e.target.value })} />
                  <input style={styles.editInput} placeholder="Base location (city, e.g. Lyari)" value={form.base_location}
                    onChange={(e) => setForm({ ...form, base_location: e.target.value })} />
                  <select style={styles.editInput} value={form.influence_level}
                    onChange={(e) => setForm({ ...form, influence_level: e.target.value })}>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>
                  <textarea style={{ ...styles.editInput, gridColumn: "1 / -1", minHeight: 50 }} placeholder="Description"
                    value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-primary" onClick={handleSaveDetails} disabled={saving}>
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={styles.grid}>
            <div className="panel">
              <h2>Crime reports</h2>
              {crime_reports.length === 0 && <Empty text="No FIRs filed yet." />}
              {crime_reports.map((r) => (
                <div key={r.id} style={styles.recordRow}>
                  <strong>{r.crime_type}</strong> — {r.place || "location unknown"}
                  <div style={styles.recordMeta}>{r.date || "date unrecorded"}{r.drug_related ? " · drug-related" : ""}</div>
                  {r.vehicle_info && <div style={styles.recordMeta}>Vehicle: {r.vehicle_info}</div>}
                  {r.description && <p style={styles.recordDesc}>{r.description}</p>}
                </div>
              ))}
            </div>

            <div className="panel">
              <h2>Financial flags</h2>
              {financial_flows.length === 0 && <Empty text="No financial flags yet." />}
              {financial_flows.map((f) => (
                <div key={f.id} style={styles.recordRow}>
                  <span className="data">{f.currency} {formatAmount(f.amount)}</span>
                  <div style={styles.recordMeta}>
                    {f.from_entity_name} &rarr; {f.to_entity_name} &middot; {f.purpose} &middot; {f.date || "date unrecorded"}
                  </div>
                </div>
              ))}
            </div>

            <div className="panel">
              <h2>Call records</h2>
              {communications.length === 0 && <Empty text="No call records yet." />}
              {communications.map((c) => (
                <div key={c.id} style={styles.recordRow}>
                  Contacted <strong>{c.entity_1 === entity.id ? c.entity_2_name : c.entity_1_name}</strong>
                  {" "}(<span className="data">{c.call_count}x</span>)
                  {c.note && <div style={styles.recordMeta}>{c.note}</div>}
                </div>
              ))}
            </div>

            <div className="panel">
              <h2>Top connections</h2>
              {top_connections.length === 0 && <Empty text="No connections recorded." />}
              {top_connections.map((c) => (
                <Link key={c.id} to={`/suspect/${c.id}`} style={styles.connectionRow}>
                  <span>{c.name}</span>
                  <span className="data" style={{ color: "var(--text-muted)" }}>{c.call_count} calls</span>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* ---------- Print-only layout ---------- */}
      <div className="print-only" style={printStyles.page}>
        <div style={printStyles.header}>
          <div>
            <div style={printStyles.kicker}>NETRA &middot; CASE SYSTEM</div>
            <h1 style={printStyles.title}>Profile Report</h1>
            <div style={printStyles.generated}>Generated {new Date().toLocaleDateString()}</div>
          </div>
          <div style={printStyles.photoBox}>Photo</div>
        </div>

        <div style={printStyles.infoGrid}>
          <PrintField label="Name" value={entity.name} full />
          <PrintField label="Role" value={entity.role} />
          <PrintField label="Affiliation" value={entity.affiliation} />
          <PrintField label="Country" value={entity.country_base} />
          <PrintField label="Base location" value={entity.base_location} />
          <PrintField label="Phone" value={entity.phone_number} />
          <PrintField label="Influence" value={entity.influence_level} />
          <PrintField label="Cluster" value={entity.cluster_label || entity.cluster_id} />
        </div>
        {entity.description && (
          <p style={printStyles.description}>{entity.description}</p>
        )}

        <PrintSection title="Crime reports">
          {crime_reports.length === 0 && <PrintEmpty />}
          {crime_reports.map((r) => (
            <div key={r.id} style={printStyles.row}>
              <strong>{r.crime_type}</strong> — {r.place || "—"} ({r.date || "—"})
              {r.drug_related ? " · drug-related" : ""}
              {r.vehicle_info && <div>Vehicle: {r.vehicle_info}</div>}
              {r.description && <div style={printStyles.rowDesc}>{r.description}</div>}
            </div>
          ))}
        </PrintSection>

        <PrintSection title="Financial flags">
          {financial_flows.length === 0 && <PrintEmpty />}
          {financial_flows.map((f) => (
            <div key={f.id} style={printStyles.row}>
              {f.currency} {formatAmount(f.amount)} — {f.from_entity_name} &rarr; {f.to_entity_name}
              {" "}&middot; {f.purpose} &middot; {f.date || "—"}
            </div>
          ))}
        </PrintSection>

        <PrintSection title="Call records">
          {communications.length === 0 && <PrintEmpty />}
          {communications.map((c) => (
            <div key={c.id} style={printStyles.row}>
              Contacted {c.entity_1 === entity.id ? c.entity_2_name : c.entity_1_name} ({c.call_count}x)
              {c.note && <div style={printStyles.rowDesc}>{c.note}</div>}
            </div>
          ))}
        </PrintSection>

        <PrintSection title="Top connections">
          {top_connections.length === 0 && <PrintEmpty />}
          {top_connections.map((c) => (
            <div key={c.id} style={printStyles.row}>
              {c.name} — {c.call_count} calls
            </div>
          ))}
        </PrintSection>

        <div style={printStyles.footer}>
          Authorized personnel only. All access is logged. — NETRA Case System
        </div>
      </div>
    </>
  );
}

function Empty({ text }) {
  return <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>{text}</p>;
}

function PrintEmpty() {
  return <div style={{ fontSize: 12, color: "#888" }}>None on file.</div>;
}

function PrintField({ label, value, full }) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : "auto" }}>
      <div style={printStyles.fieldLabel}>{label}</div>
      <div style={printStyles.fieldValue}>{value || "—"}</div>
    </div>
  );
}

function PrintSection({ title, children }) {
  return (
    <div style={printStyles.section}>
      <div style={printStyles.sectionTitle}>{title}</div>
      {children}
    </div>
  );
}

function initials(name) {
  return name.split(/[\s/]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function formatAmount(n) {
  if (n == null) return "—";
  return n.toLocaleString();
}

const styles = {
  editGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8, maxWidth: 480,
  },
  editInput: {
    padding: "7px 9px", border: "1px solid var(--paper-line)", borderRadius: 4,
    background: "#fffdf8", fontSize: 13, fontFamily: "var(--font-body)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    margin: "20px 0 28px",
  },
  photoPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 6,
    background: "var(--ink)",
    color: "var(--text-on-ink)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-display)",
    fontSize: 24,
    flexShrink: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  recordRow: {
    padding: "10px 0",
    borderBottom: "1px solid var(--paper-line)",
    fontSize: 14,
  },
  recordMeta: {
    fontSize: 12.5,
    color: "var(--text-muted)",
    marginTop: 2,
  },
  recordDesc: {
    fontSize: 13,
    color: "var(--text-secondary)",
    margin: "4px 0 0",
  },
  connectionRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "9px 0",
    borderBottom: "1px solid var(--paper-line)",
    color: "var(--text-primary)",
    fontSize: 14,
  },
};

const printStyles = {
  page: { padding: "20px 30px", fontFamily: "Georgia, serif", color: "#1b2a38" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #1b2a38", paddingBottom: 12, marginBottom: 16 },
  kicker: { fontSize: 10, letterSpacing: "0.1em", color: "#7a5c3e", fontFamily: "monospace" },
  title: { fontSize: 24, margin: "2px 0" },
  generated: { fontSize: 11, color: "#555" },
  photoBox: {
    width: 90, height: 110, border: "1.5px solid #1b2a38", display: "flex",
    alignItems: "center", justifyContent: "center", fontSize: 11, color: "#999",
  },
  infoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px 16px", marginBottom: 14 },
  fieldLabel: { fontSize: 9.5, letterSpacing: "0.06em", color: "#7a7a7a", textTransform: "uppercase" },
  fieldValue: { fontSize: 13 },
  description: { fontSize: 12.5, color: "#333", borderTop: "1px solid #ddd", paddingTop: 8, marginBottom: 14 },
  section: { marginBottom: 14, breakInside: "avoid" },
  sectionTitle: { fontSize: 13, fontWeight: "bold", borderBottom: "1px solid #1b2a38", paddingBottom: 3, marginBottom: 6 },
  row: { fontSize: 12, padding: "4px 0", borderBottom: "1px dotted #ccc" },
  rowDesc: { fontSize: 11.5, color: "#555" },
  footer: { marginTop: 20, fontSize: 10, color: "#888", textAlign: "center", borderTop: "1px solid #ccc", paddingTop: 8 },
};
