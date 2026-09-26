// // // // import { useEffect, useState, useCallback, useRef } from "react";
// // // // import ForceGraph2D from "react-force-graph-2d";
// // // // import { Link } from "react-router-dom";
// // // // import Sidebar from "../components/Sidebar";
// // // // import { api } from "../api";

// // // // // Fixed color per cluster so the legend and the graph always agree.
// // // // const CLUSTER_COLORS = {
// // // //   cluster_1: "#3d6b8a",    // Indian intelligence — slate blue
// // // //   cluster_2: "#7a5c3e",    // ISI — brown
// // // //   cluster_3: "#4b6d4f",    // Lyari Task Force — green
// // // //   cluster_4: "#96323b",    // Syndicate/financiers — deep red
// // // //   cluster_4a: "#c15d3f",   // Baloch gang — burnt orange
// // // //   cluster_4b: "#a9793b",   // Pathan gang — brass
// // // //   cluster_4c: "#8a5a7a",   // Rehman's faction — muted plum
// // // //   cluster_5: "#6b6456",    // civilians — warm gray
// // // //   cluster_6: "#3e7a8a",    // USA — teal-blue
// // // //   cluster_7: "#7a8a3e",    // Afghanistan — olive
// // // //   cluster_8: "#a8a196",    // isolated nodes — light gray
// // // // };
// // // // const DEFAULT_COLOR = "#a8a196";

// // // // export default function GraphAnalytics() {
// // // //   const [graph, setGraph] = useState({ nodes: [], links: [] });
// // // //   const [selected, setSelected] = useState(null);
// // // //   const [profile, setProfile] = useState(null);
// // // //   const fgRef = useRef();

// // // //   useEffect(() => {
// // // //     api.getGraph().then((data) => {
// // // //       setGraph({
// // // //         nodes: data.nodes,
// // // //         links: data.edges.map((e) => ({ source: e.source, target: e.target, type: e.type })),
// // // //       });
// // // //     });
// // // //   }, []);

// // // //   const handleNodeClick = useCallback((node) => {
// // // //     setSelected(node);
// // // //     setProfile(null);
// // // //     api.getSuspectProfile(node.id).then(setProfile).catch(() => {});
// // // //   }, []);

// // // //   const clustersPresent = [...new Set(graph.nodes.map((n) => n.cluster_id))].filter(Boolean);

// // // //   return (
// // // //     <div className="app-shell">
// // // //       <Sidebar />
// // // //       <main className="main-content" style={{ maxWidth: "none" }}>
// // // //         <div className="page-header">
// // // //           <div className="kicker">NETWORK</div>
// // // //           <h1>Graph analytics</h1>
// // // //         </div>

// // // //         <div style={styles.layout}>
// // // //           {/* Left: selected suspect card */}
// // // //           <div style={styles.sideCard}>
// // // //             {!selected && (
// // // //               <div className="panel">
// // // //                 <p style={{ color: "var(--text-muted)", fontSize: 13.5, margin: 0 }}>
// // // //                   Click a node to see that person's overview here.
// // // //                 </p>
// // // //               </div>
// // // //             )}
// // // //             {selected && (
// // // //               <div className="panel">
// // // //                 <h3 style={{ marginBottom: 2 }}>{selected.name}</h3>
// // // //                 <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 12px" }}>
// // // //                   {selected.role} &middot; {selected.country_base}
// // // //                 </p>
// // // //                 <span className={`tag tag-influence-${selected.influence_level}`}>
// // // //                   {selected.influence_level} influence
// // // //                 </span>
// // // //                 <div style={{ marginTop: 12, fontSize: 13 }}>
// // // //                   <div>Centrality score: <span className="data">{selected.computed_centrality}</span></div>
// // // //                 </div>
// // // //                 {profile && (
// // // //                   <>
// // // //                     <hr style={styles.hr} />
// // // //                     <div style={{ fontSize: 13 }}>
// // // //                       <strong>Top connections</strong>
// // // //                       {profile.top_connections.slice(0, 4).map((c) => (
// // // //                         <div key={c.id} style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
// // // //                           <span>{c.name}</span>
// // // //                           <span className="data" style={{ color: "var(--text-muted)" }}>{c.call_count}x</span>
// // // //                         </div>
// // // //                       ))}
// // // //                     </div>
// // // //                   </>
// // // //                 )}
// // // //                 <Link to={`/suspect/${selected.id}`} className="btn btn-secondary" style={{ marginTop: 14, width: "100%", justifyContent: "center" }}>
// // // //                   Full profile
// // // //                 </Link>
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           {/* Center: the graph */}
// // // //           <div className="panel" style={styles.graphPanel}>
// // // //             <ForceGraph2D
// // // //               ref={fgRef}
// // // //               graphData={graph}
// // // //               nodeId="id"
// // // //               nodeLabel={(n) => n.name}
// // // //               nodeColor={(n) => CLUSTER_COLORS[n.cluster_id] || DEFAULT_COLOR}
// // // //               nodeRelSize={5}
// // // //               linkColor={() => "rgba(150, 50, 59, 0.35)"}
// // // //               linkWidth={1}
// // // //               backgroundColor="#f4efe3"
// // // //               onNodeClick={handleNodeClick}
// // // //               width={720}
// // // //               height={560}
// // // //             />
// // // //           </div>

// // // //           {/* Right: legend */}
// // // //           <div style={styles.legend}>
// // // //             <div className="panel">
// // // //               <h3 style={{ marginBottom: 10 }}>Legend</h3>
// // // //               {clustersPresent.map((cid) => {
// // // //                 const label = graph.nodes.find((n) => n.cluster_id === cid)?.cluster_label || cid;
// // // //                 return (
// // // //                   <div key={cid} style={styles.legendRow}>
// // // //                     <span style={{ ...styles.swatch, background: CLUSTER_COLORS[cid] || DEFAULT_COLOR }} />
// // // //                     <span style={{ fontSize: 12.5 }}>{label}</span>
// // // //                   </div>
// // // //                 );
// // // //               })}
// // // //               <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 12 }}>
// // // //                 Node size reflects call/relationship volume. Red lines are relationship edges.
// // // //               </p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </main>
// // // //     </div>
// // // //   );
// // // // }

// // // // const styles = {
// // // //   layout: {
// // // //     display: "grid",
// // // //     gridTemplateColumns: "260px 1fr 200px",
// // // //     gap: 16,
// // // //     alignItems: "start",
// // // //   },
// // // //   sideCard: { position: "sticky", top: 20 },
// // // //   legend: { position: "sticky", top: 20 },
// // // //   graphPanel: { padding: 0, overflow: "hidden" },
// // // //   legendRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 },
// // // //   swatch: { width: 10, height: 10, borderRadius: "50%", flexShrink: 0 },
// // // //   hr: { border: "none", borderTop: "1px solid var(--paper-line)", margin: "14px 0" },
// // // // };

// // // import { useEffect, useState, useCallback, useRef } from "react";
// // // import ForceGraph2D from "react-force-graph-2d";
// // // import { Link } from "react-router-dom";
// // // import Sidebar from "../components/Sidebar";
// // // import { api, getSession } from "../api";

// // // // Fixed color per cluster so the legend and the graph always agree.
// // // const CLUSTER_COLORS = {
// // //   cluster_1: "#3d6b8a",    // Indian intelligence — slate blue
// // //   cluster_2: "#7a5c3e",    // ISI — brown
// // //   cluster_3: "#4b6d4f",    // Lyari Task Force — green
// // //   cluster_4: "#96323b",    // Syndicate/financiers — deep red
// // //   cluster_4a: "#c15d3f",   // Baloch gang — burnt orange
// // //   cluster_4b: "#a9793b",   // Pathan gang — brass
// // //   cluster_4c: "#8a5a7a",   // Rehman's faction — muted plum
// // //   cluster_5: "#6b6456",    // civilians — warm gray
// // //   cluster_6: "#3e7a8a",    // USA — teal-blue
// // //   cluster_7: "#7a8a3e",    // Afghanistan — olive
// // //   cluster_8: "#a8a196",    // isolated nodes — light gray
// // //     cluster_iet_leadership: "#5a4a7a",   // IeT leadership — deep violet
// // //   cluster_iet_command: "#b0473f",      // IeT operational command — brick red
// // //   cluster_iet_operatives: "#c98a3a",   // IeT mid-level operatives — amber
// // //   cluster_iet_front: "#4a7a6b",        // IeT front orgs — teal green
// // //   cluster_hawala: "#8a6a2e",           // Hawala funding network — gold-brown
// // //   cluster_iet_watch: "#8f8a7d"       // Unconnected/watch — neutral gray

// // // };
// // // const DEFAULT_COLOR = "#a8a196";

// // // export default function GraphAnalytics() {
// // //   const [graph, setGraph] = useState({ nodes: [], links: [] });
// // //   const [selected, setSelected] = useState(null);
// // //   const [profile, setProfile] = useState(null);
// // //   const [editingCluster, setEditingCluster] = useState(null);
// // //   const [editValue, setEditValue] = useState("");
// // //   const [savingCluster, setSavingCluster] = useState(false);
// // //   const fgRef = useRef();
// // //   const session = getSession();
// // //   const canRenameClusters = session?.role === "supervisor";

// // //   function loadGraph() {
// // //     api.getGraph().then((data) => {
// // //       setGraph({
// // //         nodes: data.nodes,
// // //         links: data.edges.map((e) => ({ source: e.source, target: e.target, type: e.type })),
// // //       });
// // //     });
// // //   }

// // //   useEffect(() => { loadGraph(); }, []);

// // //   const handleNodeClick = useCallback((node) => {
// // //     setSelected(node);
// // //     setProfile(null);
// // //     api.getSuspectProfile(node.id).then(setProfile).catch(() => {});
// // //   }, []);

// // //   const clustersPresent = [...new Set(graph.nodes.map((n) => n.cluster_id))].filter(Boolean);

// // //   function startEditing(cid, currentLabel) {
// // //     setEditingCluster(cid);
// // //     setEditValue(currentLabel);
// // //   }

// // //   async function saveClusterLabel(cid) {
// // //     const trimmed = editValue.trim();
// // //     if (!trimmed) return;
// // //     setSavingCluster(true);
// // //     try {
// // //       await api.renameCluster(cid, trimmed);
// // //       setEditingCluster(null);
// // //       loadGraph(); // refresh so the new label shows everywhere (legend + side card)
// // //     } catch (err) {
// // //       alert(err.message);
// // //     } finally {
// // //       setSavingCluster(false);
// // //     }
// // //   }

// // //   return (
// // //     <div className="app-shell">
// // //       <Sidebar />
// // //       <main className="main-content" style={{ maxWidth: "none" }}>
// // //         <div className="page-header">
// // //           <div className="kicker">NETWORK</div>
// // //           <h1>Graph analytics</h1>
// // //         </div>

// // //         <div style={styles.layout}>
// // //           {/* Left: selected suspect card */}
// // //           <div style={styles.sideCard}>
// // //             {!selected && (
// // //               <div className="panel">
// // //                 <p style={{ color: "var(--text-muted)", fontSize: 13.5, margin: 0 }}>
// // //                   Click a node to see that person's overview here.
// // //                 </p>
// // //               </div>
// // //             )}
// // //             {selected && (
// // //               <div className="panel">
// // //                 <h3 style={{ marginBottom: 2 }}>{selected.name}</h3>
// // //                 <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 12px" }}>
// // //                   {selected.role} &middot; {selected.country_base}
// // //                 </p>
// // //                 <span className={`tag tag-influence-${selected.influence_level}`}>
// // //                   {selected.influence_level} influence
// // //                 </span>
// // //                 <div style={{ marginTop: 12, fontSize: 13 }}>
// // //                   <div>Centrality score: <span className="data">{selected.computed_centrality}</span></div>
// // //                 </div>
// // //                 {profile && (
// // //                   <>
// // //                     <hr style={styles.hr} />
// // //                     <div style={{ fontSize: 13 }}>
// // //                       <strong>Top connections</strong>
// // //                       {profile.top_connections.slice(0, 4).map((c) => (
// // //                         <div key={c.id} style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
// // //                           <span>{c.name}</span>
// // //                           <span className="data" style={{ color: "var(--text-muted)" }}>{c.call_count}x</span>
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   </>
// // //                 )}
// // //                 <Link to={`/suspect/${selected.id}`} className="btn btn-secondary" style={{ marginTop: 14, width: "100%", justifyContent: "center" }}>
// // //                   Full profile
// // //                 </Link>
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Center: the graph */}
// // //           <div className="panel" style={styles.graphPanel}>
// // //             <ForceGraph2D
// // //               ref={fgRef}
// // //               graphData={graph}
// // //               nodeId="id"
// // //               nodeLabel={(n) => n.name}
// // //               nodeColor={(n) => CLUSTER_COLORS[n.cluster_id] || DEFAULT_COLOR}
// // //               nodeRelSize={5}
// // //               linkColor={() => "rgba(150, 50, 59, 0.35)"}
// // //               linkWidth={1}
// // //               backgroundColor="#f4efe3"
// // //               onNodeClick={handleNodeClick}
// // //               width={720}
// // //               height={560}
// // //             />
// // //           </div>

// // //           {/* Right: legend */}
// // //           <div style={styles.legend}>
// // //             <div className="panel">
// // //               <h3 style={{ marginBottom: 10 }}>Legend</h3>
// // //               {clustersPresent.map((cid) => {
// // //                 const label = graph.nodes.find((n) => n.cluster_id === cid)?.cluster_label || cid;
// // //                 const isEditing = editingCluster === cid;
// // //                 return (
// // //                   <div key={cid} style={styles.legendRow}>
// // //                     <span style={{ ...styles.swatch, background: CLUSTER_COLORS[cid] || DEFAULT_COLOR }} />
// // //                     {isEditing ? (
// // //                       <span style={{ display: "flex", gap: 4, flex: 1 }}>
// // //                         <input
// // //                           autoFocus
// // //                           value={editValue}
// // //                           onChange={(e) => setEditValue(e.target.value)}
// // //                           onKeyDown={(e) => { if (e.key === "Enter") saveClusterLabel(cid); if (e.key === "Escape") setEditingCluster(null); }}
// // //                           style={styles.legendInput}
// // //                         />
// // //                         <button
// // //                           onClick={() => saveClusterLabel(cid)}
// // //                           disabled={savingCluster}
// // //                           style={styles.legendSaveBtn}
// // //                           aria-label="Save"
// // //                         >
// // //                           &#10003;
// // //                         </button>
// // //                       </span>
// // //                     ) : (
// // //                       <>
// // //                         <span style={{ fontSize: 12.5, flex: 1 }}>{label}</span>
// // //                         {canRenameClusters && (
// // //                           <button
// // //                             onClick={() => startEditing(cid, label)}
// // //                             style={styles.legendEditBtn}
// // //                             aria-label={`Rename ${label}`}
// // //                             title="Rename cluster"
// // //                           >
// // //                             &#9998;
// // //                           </button>
// // //                         )}
// // //                       </>
// // //                     )}
// // //                   </div>
// // //                 );
// // //               })}
// // //               <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 12 }}>
// // //                 Node size reflects call/relationship volume. Red lines are relationship edges.
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // const styles = {
// // //   layout: {
// // //     display: "grid",
// // //     gridTemplateColumns: "260px 1fr 200px",
// // //     gap: 16,
// // //     alignItems: "start",
// // //   },
// // //   sideCard: { position: "sticky", top: 20 },
// // //   legend: { position: "sticky", top: 20 },
// // //   graphPanel: { padding: 0, overflow: "hidden" },
// // //   legendRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 },
// // //   swatch: { width: 10, height: 10, borderRadius: "50%", flexShrink: 0 },
// // //   legendEditBtn: {
// // //     background: "none", border: "none", color: "var(--text-muted)",
// // //     fontSize: 12, padding: "0 2px", flexShrink: 0,
// // //   },
// // //   legendInput: {
// // //     flex: 1, fontSize: 12, padding: "3px 6px", border: "1px solid var(--paper-line)",
// // //     borderRadius: 3, background: "#fffdf8", minWidth: 0,
// // //   },
// // //   legendSaveBtn: {
// // //     background: "var(--ink)", color: "var(--text-on-ink)", border: "none",
// // //     borderRadius: 3, fontSize: 11, padding: "0 8px", flexShrink: 0,
// // //   },
// // //   hr: { border: "none", borderTop: "1px solid var(--paper-line)", margin: "14px 0" },
// // // };



// // import { useEffect, useState, useCallback, useRef } from "react";
// // import ForceGraph2D from "react-force-graph-2d";
// // import { Link } from "react-router-dom";
// // import Sidebar from "../components/Sidebar";
// // import { api, getSession } from "../api";

// // // Fallback colors for the originally-seeded clusters, used only when a
// // // cluster has no supervisor-set cluster_color yet.
// // const CLUSTER_COLORS = {
// //   cluster_1: "#3d6b8a",
// //   cluster_2: "#7a5c3e",
// //   cluster_3: "#4b6d4f",
// //   cluster_4: "#96323b",
// //   cluster_4a: "#c15d3f",
// //   cluster_4b: "#a9793b",
// //   cluster_4c: "#8a5a7a",
// //   cluster_5: "#6b6456",
// //   cluster_6: "#3e7a8a",
// //   cluster_7: "#7a8a3e",
// //   cluster_8: "#a8a196",
// // };
// // const DEFAULT_COLOR = "#a8a196";

// // function colorForCluster(node) {
// //   return node.cluster_color || CLUSTER_COLORS[node.cluster_id] || DEFAULT_COLOR;
// // }

// // function slugify(name) {
// //   return "cluster_" + name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
// // }

// // export default function GraphAnalytics() {
// //   const [graph, setGraph] = useState({ nodes: [], links: [] });
// //   const [selected, setSelected] = useState(null);
// //   const [profile, setProfile] = useState(null);
// //   const [editingCluster, setEditingCluster] = useState(null);
// //   const [editLabel, setEditLabel] = useState("");
// //   const [editColor, setEditColor] = useState("#a8a196");
// //   const [savingCluster, setSavingCluster] = useState(false);

// //   const [unclustered, setUnclustered] = useState([]);
// //   const [selectedIds, setSelectedIds] = useState(new Set());
// //   const [newClusterName, setNewClusterName] = useState("");
// //   const [newClusterColor, setNewClusterColor] = useState("#7a5c3e");
// //   const [grouping, setGrouping] = useState(false);

// //   const fgRef = useRef();
// //   const session = getSession();
// //   const canManageClusters = session?.role === "supervisor";

// //   function loadGraph() {
// //     api.getGraph().then((data) => {
// //       setGraph({
// //         nodes: data.nodes,
// //         links: data.edges.map((e) => ({ source: e.source, target: e.target, type: e.type })),
// //       });
// //     });
// //   }

// //   function loadUnclustered() {
// //     if (!canManageClusters) return;
// //     api.listUnclustered().then(setUnclustered).catch(() => {});
// //   }

// //   useEffect(() => { loadGraph(); loadUnclustered(); }, []);

// //   const handleNodeClick = useCallback((node) => {
// //     setSelected(node);
// //     setProfile(null);
// //     api.getSuspectProfile(node.id).then(setProfile).catch(() => {});
// //   }, []);

// //   const clustersPresent = [...new Set(graph.nodes.map((n) => n.cluster_id))].filter(Boolean);

// //   function startEditing(cid, currentLabel, currentColor) {
// //     setEditingCluster(cid);
// //     setEditLabel(currentLabel);
// //     setEditColor(currentColor || "#a8a196");
// //   }

// //   async function saveClusterLabel(cid) {
// //     const trimmed = editLabel.trim();
// //     if (!trimmed) return;
// //     setSavingCluster(true);
// //     try {
// //       await api.renameCluster(cid, trimmed, editColor);
// //       setEditingCluster(null);
// //       loadGraph();
// //     } catch (err) {
// //       alert(err.message);
// //     } finally {
// //       setSavingCluster(false);
// //     }
// //   }

// //   function toggleSelected(id) {
// //     setSelectedIds((prev) => {
// //       const next = new Set(prev);
// //       if (next.has(id)) next.delete(id); else next.add(id);
// //       return next;
// //     });
// //   }

// //   async function handleGroupSelected() {
// //     const name = newClusterName.trim();
// //     if (!name || selectedIds.size === 0) return;
// //     setGrouping(true);
// //     try {
// //       await api.assignCluster([...selectedIds], slugify(name), name, newClusterColor);
// //       setSelectedIds(new Set());
// //       setNewClusterName("");
// //       loadGraph();
// //       loadUnclustered();
// //     } catch (err) {
// //       alert(err.message);
// //     } finally {
// //       setGrouping(false);
// //     }
// //   }

// //   return (
// //     <div className="app-shell">
// //       <Sidebar />
// //       <main className="main-content" style={{ maxWidth: "none" }}>
// //         <div className="page-header">
// //           <div className="kicker">NETWORK</div>
// //           <h1>Graph analytics</h1>
// //         </div>

// //         <div style={styles.layout}>
// //           {/* Left: selected suspect card */}
// //           <div style={styles.sideCard}>
// //             {!selected && (
// //               <div className="panel">
// //                 <p style={{ color: "var(--text-muted)", fontSize: 13.5, margin: 0 }}>
// //                   Click a node to see that person's overview here.
// //                 </p>
// //               </div>
// //             )}
// //             {selected && (
// //               <div className="panel">
// //                 <h3 style={{ marginBottom: 2 }}>{selected.name}</h3>
// //                 <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 12px" }}>
// //                   {selected.role} &middot; {selected.country_base}
// //                 </p>
// //                 <span className={`tag tag-influence-${selected.influence_level}`}>
// //                   {selected.influence_level} influence
// //                 </span>
// //                 <div style={{ marginTop: 12, fontSize: 13 }}>
// //                   <div>Centrality score: <span className="data">{selected.computed_centrality}</span></div>
// //                 </div>
// //                 {profile && (
// //                   <>
// //                     <hr style={styles.hr} />
// //                     <div style={{ fontSize: 13 }}>
// //                       <strong>Top connections</strong>
// //                       {profile.top_connections.slice(0, 4).map((c) => (
// //                         <div key={c.id} style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
// //                           <span>{c.name}</span>
// //                           <span className="data" style={{ color: "var(--text-muted)" }}>{c.call_count}x</span>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </>
// //                 )}
// //                 <Link to={`/suspect/${selected.id}`} className="btn btn-secondary" style={{ marginTop: 14, width: "100%", justifyContent: "center" }}>
// //                   Full profile
// //                 </Link>
// //               </div>
// //             )}
// //           </div>

// //           {/* Center: the graph */}
// //           <div className="panel" style={styles.graphPanel}>
// //             <ForceGraph2D
// //               ref={fgRef}
// //               graphData={graph}
// //               nodeId="id"
// //               nodeLabel={(n) => n.name}
// //               nodeColor={colorForCluster}
// //               nodeRelSize={5}
// //               linkColor={() => "rgba(150, 50, 59, 0.35)"}
// //               linkWidth={1}
// //               backgroundColor="#f4efe3"
// //               onNodeClick={handleNodeClick}
// //               width={720}
// //               height={560}
// //             />
// //           </div>

// //           {/* Right: legend */}
// //           <div style={styles.legend}>
// //             <div className="panel">
// //               <h3 style={{ marginBottom: 10 }}>Legend</h3>
// //               {clustersPresent.map((cid) => {
// //                 const node = graph.nodes.find((n) => n.cluster_id === cid);
// //                 const label = node?.cluster_label || cid;
// //                 const color = colorForCluster(node || {});
// //                 const isEditing = editingCluster === cid;
// //                 return (
// //                   <div key={cid} style={styles.legendRow}>
// //                     {isEditing ? (
// //                       <span style={{ display: "flex", gap: 4, flex: 1, alignItems: "center" }}>
// //                         <input
// //                           type="color"
// //                           value={editColor}
// //                           onChange={(e) => setEditColor(e.target.value)}
// //                           style={styles.colorInput}
// //                           title="Cluster color"
// //                         />
// //                         <input
// //                           autoFocus
// //                           value={editLabel}
// //                           onChange={(e) => setEditLabel(e.target.value)}
// //                           onKeyDown={(e) => { if (e.key === "Enter") saveClusterLabel(cid); if (e.key === "Escape") setEditingCluster(null); }}
// //                           style={styles.legendInput}
// //                         />
// //                         <button
// //                           onClick={() => saveClusterLabel(cid)}
// //                           disabled={savingCluster}
// //                           style={styles.legendSaveBtn}
// //                           aria-label="Save"
// //                         >
// //                           &#10003;
// //                         </button>
// //                       </span>
// //                     ) : (
// //                       <>
// //                         <span style={{ ...styles.swatch, background: color }} />
// //                         <span style={{ fontSize: 12.5, flex: 1 }}>{label}</span>
// //                         {canManageClusters && (
// //                           <button
// //                             onClick={() => startEditing(cid, label, color)}
// //                             style={styles.legendEditBtn}
// //                             aria-label={`Edit ${label}`}
// //                             title="Rename / recolor cluster"
// //                           >
// //                             &#9998;
// //                           </button>
// //                         )}
// //                       </>
// //                     )}
// //                   </div>
// //                 );
// //               })}
// //               <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 12 }}>
// //                 Node size reflects call/relationship volume. Red lines are relationship edges.
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Full-width: group unclustered suspects into a new cluster (supervisor only) */}
// //         {canManageClusters && (
// //           <div className="panel" style={{ marginTop: 20 }}>
// //             <h3 style={{ marginBottom: 4 }}>Group unclustered suspects</h3>
// //             <p style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 0, marginBottom: 14 }}>
// //               These suspects showed up grey on the graph because no one has assigned them a cluster yet.
// //               Look at their connections, tick the ones that belong together, and give them a name and color.
// //             </p>

// //             {unclustered.length === 0 && (
// //               <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
// //                 No unclustered suspects right now — everyone has a cluster.
// //               </p>
// //             )}

// //             {unclustered.length > 0 && (
// //               <>
// //                 <div style={styles.unclusteredList}>
// //                   {unclustered.map((e) => (
// //                     <label key={e.id} style={styles.unclusteredRow}>
// //                       <input
// //                         type="checkbox"
// //                         checked={selectedIds.has(e.id)}
// //                         onChange={() => toggleSelected(e.id)}
// //                       />
// //                       <span>{e.name}</span>
// //                       <Link to={`/suspect/${e.id}`} style={{ fontSize: 11.5, color: "var(--text-muted)" }}>
// //                         view
// //                       </Link>
// //                     </label>
// //                   ))}
// //                 </div>

// //                 <div style={styles.groupForm}>
// //                   <input
// //                     type="color"
// //                     value={newClusterColor}
// //                     onChange={(e) => setNewClusterColor(e.target.value)}
// //                     style={styles.colorInput}
// //                     title="New cluster color"
// //                   />
// //                   <input
// //                     style={styles.groupNameInput}
// //                     placeholder="New cluster name, e.g. 'Riverside Crew'"
// //                     value={newClusterName}
// //                     onChange={(e) => setNewClusterName(e.target.value)}
// //                   />
// //                   <button
// //                     className="btn btn-primary"
// //                     onClick={handleGroupSelected}
// //                     disabled={grouping || selectedIds.size === 0 || !newClusterName.trim()}
// //                   >
// //                     {grouping ? "Grouping..." : `Group ${selectedIds.size || ""} selected`}
// //                   </button>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }

// // const styles = {
// //   layout: {
// //     display: "grid",
// //     gridTemplateColumns: "260px 1fr 200px",
// //     gap: 16,
// //     alignItems: "start",
// //   },
// //   sideCard: { position: "sticky", top: 20 },
// //   legend: { position: "sticky", top: 20 },
// //   graphPanel: { padding: 0, overflow: "hidden" },
// //   legendRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 },
// //   swatch: { width: 10, height: 10, borderRadius: "50%", flexShrink: 0 },
// //   legendEditBtn: {
// //     background: "none", border: "none", color: "var(--text-muted)",
// //     fontSize: 12, padding: "0 2px", flexShrink: 0,
// //   },
// //   legendInput: {
// //     flex: 1, fontSize: 12, padding: "3px 6px", border: "1px solid var(--paper-line)",
// //     borderRadius: 3, background: "#fffdf8", minWidth: 0,
// //   },
// //   legendSaveBtn: {
// //     background: "var(--ink)", color: "var(--text-on-ink)", border: "none",
// //     borderRadius: 3, fontSize: 11, padding: "0 8px", flexShrink: 0,
// //   },
// //   colorInput: {
// //     width: 26, height: 26, padding: 0, border: "1px solid var(--paper-line)",
// //     borderRadius: 4, flexShrink: 0, cursor: "pointer",
// //   },
// //   hr: { border: "none", borderTop: "1px solid var(--paper-line)", margin: "14px 0" },
// //   unclusteredList: {
// //     display: "flex", flexWrap: "wrap", gap: "6px 20px", marginBottom: 16,
// //     maxHeight: 160, overflowY: "auto", padding: "4px 0",
// //   },
// //   unclusteredRow: {
// //     display: "flex", alignItems: "center", gap: 8, fontSize: 13, minWidth: 200,
// //   },
// //   groupForm: { display: "flex", alignItems: "center", gap: 10 },
// //   groupNameInput: {
// //     flex: 1, maxWidth: 320, padding: "8px 10px", border: "1px solid var(--paper-line)",
// //     borderRadius: 4, background: "#fffdf8", fontSize: 13.5,
// //   },
// // };


// import { useEffect, useState, useCallback, useRef } from "react";
// import ForceGraph2D from "react-force-graph-2d";
// import { Link } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import SuspectMap from "../components/SuspectMap";
// import { api, getSession } from "../api";

// // Fallback colors for the originally-seeded clusters, used only when a
// // cluster has no supervisor-set cluster_color yet.
// const CLUSTER_COLORS = {
//   cluster_1: "#3d6b8a",
//   cluster_2: "#7a5c3e",
//   cluster_3: "#4b6d4f",
//   cluster_4: "#96323b",
//   cluster_4a: "#c15d3f",
//   cluster_4b: "#a9793b",
//   cluster_4c: "#8a5a7a",
//   cluster_5: "#6b6456",
//   cluster_6: "#3e7a8a",
//   cluster_7: "#7a8a3e",
//   cluster_8: "#a8a196",
// };
// const DEFAULT_COLOR = "#a8a196";

// function colorForCluster(node) {
//   return node.cluster_color || CLUSTER_COLORS[node.cluster_id] || DEFAULT_COLOR;
// }

// function slugify(name) {
//   return "cluster_" + name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
// }

// export default function GraphAnalytics() {
//   const [graph, setGraph] = useState({ nodes: [], links: [] });
//   const [selected, setSelected] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [editingCluster, setEditingCluster] = useState(null);
//   const [editLabel, setEditLabel] = useState("");
//   const [editColor, setEditColor] = useState("#a8a196");
//   const [savingCluster, setSavingCluster] = useState(false);

//   const [unclustered, setUnclustered] = useState([]);
//   const [selectedIds, setSelectedIds] = useState(new Set());
//   const [newClusterName, setNewClusterName] = useState("");
//   const [newClusterColor, setNewClusterColor] = useState("#7a5c3e");
//   const [grouping, setGrouping] = useState(false);

//   const fgRef = useRef();
//   const session = getSession();
//   const canManageClusters = session?.role === "supervisor";

//   function loadGraph() {
//     api.getGraph().then((data) => {
//       setGraph({
//         nodes: data.nodes,
//         links: data.edges.map((e) => ({ source: e.source, target: e.target, type: e.type })),
//       });
//     });
//   }

//   function loadUnclustered() {
//     if (!canManageClusters) return;
//     api.listUnclustered().then(setUnclustered).catch(() => {});
//   }

//   useEffect(() => { loadGraph(); loadUnclustered(); }, []);

//   const handleNodeClick = useCallback((node) => {
//     setSelected(node);
//     setProfile(null);
//     api.getSuspectProfile(node.id).then(setProfile).catch(() => {});
//   }, []);

//   const clustersPresent = [...new Set(graph.nodes.map((n) => n.cluster_id))].filter(Boolean);

//   function startEditing(cid, currentLabel, currentColor) {
//     setEditingCluster(cid);
//     setEditLabel(currentLabel);
//     setEditColor(currentColor || "#a8a196");
//   }

//   async function saveClusterLabel(cid) {
//     const trimmed = editLabel.trim();
//     if (!trimmed) return;
//     setSavingCluster(true);
//     try {
//       await api.renameCluster(cid, trimmed, editColor);
//       setEditingCluster(null);
//       loadGraph();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setSavingCluster(false);
//     }
//   }

//   function toggleSelected(id) {
//     setSelectedIds((prev) => {
//       const next = new Set(prev);
//       if (next.has(id)) next.delete(id); else next.add(id);
//       return next;
//     });
//   }

//   async function handleGroupSelected() {
//     const name = newClusterName.trim();
//     if (!name || selectedIds.size === 0) return;
//     setGrouping(true);
//     try {
//       await api.assignCluster([...selectedIds], slugify(name), name, newClusterColor);
//       setSelectedIds(new Set());
//       setNewClusterName("");
//       loadGraph();
//       loadUnclustered();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setGrouping(false);
//     }
//   }

//   return (
//     <div className="app-shell">
//       <Sidebar />
//       <main className="main-content" style={{ maxWidth: "none" }}>
//         <div className="page-header">
//           <div className="kicker">NETWORK</div>
//           <h1>Graph analytics</h1>
//         </div>

//         <div style={styles.layout}>
//           {/* Left: selected suspect card */}
//           <div style={styles.sideCard}>
//             {!selected && (
//               <div className="panel">
//                 <p style={{ color: "var(--text-muted)", fontSize: 13.5, margin: 0 }}>
//                   Click a node to see that person's overview here.
//                 </p>
//               </div>
//             )}
//             {selected && (
//               <div className="panel">
//                 <h3 style={{ marginBottom: 2 }}>{selected.name}</h3>
//                 <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 12px" }}>
//                   {selected.role} &middot; {selected.country_base}
//                 </p>
//                 <span className={`tag tag-influence-${selected.influence_level}`}>
//                   {selected.influence_level} influence
//                 </span>
//                 <div style={{ marginTop: 12, fontSize: 13 }}>
//                   <div>Centrality score: <span className="data">{selected.computed_centrality}</span></div>
//                 </div>
//                 {profile && (
//                   <>
//                     <hr style={styles.hr} />
//                     <div style={{ fontSize: 13 }}>
//                       <strong>Top connections</strong>
//                       {profile.top_connections.slice(0, 4).map((c) => (
//                         <div key={c.id} style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
//                           <span>{c.name}</span>
//                           <span className="data" style={{ color: "var(--text-muted)" }}>{c.call_count}x</span>
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 )}
//                 <Link to={`/suspect/${selected.id}`} className="btn btn-secondary" style={{ marginTop: 14, width: "100%", justifyContent: "center" }}>
//                   Full profile
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Center: the graph */}
//           <div className="panel" style={styles.graphPanel}>
//             <ForceGraph2D
//               ref={fgRef}
//               graphData={graph}
//               nodeId="id"
//               nodeLabel={(n) => n.name}
//               nodeColor={colorForCluster}
//               nodeRelSize={5}
//               linkColor={() => "rgba(150, 50, 59, 0.35)"}
//               linkWidth={1}
//               backgroundColor="#f4efe3"
//               onNodeClick={handleNodeClick}
//               width={720}
//               height={560}
//             />
//           </div>

//           {/* Right: legend */}
//           <div style={styles.legend}>
//             <div className="panel">
//               <h3 style={{ marginBottom: 10 }}>Legend</h3>
//               {clustersPresent.map((cid) => {
//                 const node = graph.nodes.find((n) => n.cluster_id === cid);
//                 const label = node?.cluster_label || cid;
//                 const color = colorForCluster(node || {});
//                 const isEditing = editingCluster === cid;
//                 return (
//                   <div key={cid} style={styles.legendRow}>
//                     {isEditing ? (
//                       <span style={{ display: "flex", gap: 4, flex: 1, alignItems: "center" }}>
//                         <input
//                           type="color"
//                           value={editColor}
//                           onChange={(e) => setEditColor(e.target.value)}
//                           style={styles.colorInput}
//                           title="Cluster color"
//                         />
//                         <input
//                           autoFocus
//                           value={editLabel}
//                           onChange={(e) => setEditLabel(e.target.value)}
//                           onKeyDown={(e) => { if (e.key === "Enter") saveClusterLabel(cid); if (e.key === "Escape") setEditingCluster(null); }}
//                           style={styles.legendInput}
//                         />
//                         <button
//                           onClick={() => saveClusterLabel(cid)}
//                           disabled={savingCluster}
//                           style={styles.legendSaveBtn}
//                           aria-label="Save"
//                         >
//                           &#10003;
//                         </button>
//                       </span>
//                     ) : (
//                       <>
//                         <span style={{ ...styles.swatch, background: color }} />
//                         <span style={{ fontSize: 12.5, flex: 1 }}>{label}</span>
//                         {canManageClusters && (
//                           <button
//                             onClick={() => startEditing(cid, label, color)}
//                             style={styles.legendEditBtn}
//                             aria-label={`Edit ${label}`}
//                             title="Rename / recolor cluster"
//                           >
//                             &#9998;
//                           </button>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 );
//               })}
//               <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 12 }}>
//                 Node size reflects call/relationship volume. Red lines are relationship edges.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Full-width: group unclustered suspects into a new cluster (supervisor only) */}
//         {canManageClusters && (
//           <div className="panel" style={{ marginTop: 20 }}>
//             <h3 style={{ marginBottom: 4 }}>Group unclustered suspects</h3>
//             <p style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 0, marginBottom: 14 }}>
//               These suspects showed up grey on the graph because no one has assigned them a cluster yet.
//               Look at their connections, tick the ones that belong together, and give them a name and color.
//             </p>

//             {unclustered.length === 0 && (
//               <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
//                 No unclustered suspects right now — everyone has a cluster.
//               </p>
//             )}

//             {unclustered.length > 0 && (
//               <>
//                 <div style={styles.unclusteredList}>
//                   {unclustered.map((e) => (
//                     <label key={e.id} style={styles.unclusteredRow}>
//                       <input
//                         type="checkbox"
//                         checked={selectedIds.has(e.id)}
//                         onChange={() => toggleSelected(e.id)}
//                       />
//                       <span>{e.name}</span>
//                       <Link to={`/suspect/${e.id}`} style={{ fontSize: 11.5, color: "var(--text-muted)" }}>
//                         view
//                       </Link>
//                     </label>
//                   ))}
//                 </div>

//                 <div style={styles.groupForm}>
//                   <input
//                     type="color"
//                     value={newClusterColor}
//                     onChange={(e) => setNewClusterColor(e.target.value)}
//                     style={styles.colorInput}
//                     title="New cluster color"
//                   />
//                   <input
//                     style={styles.groupNameInput}
//                     placeholder="New cluster name, e.g. 'Riverside Crew'"
//                     value={newClusterName}
//                     onChange={(e) => setNewClusterName(e.target.value)}
//                   />
//                   <button
//                     className="btn btn-primary"
//                     onClick={handleGroupSelected}
//                     disabled={grouping || selectedIds.size === 0 || !newClusterName.trim()}
//                   >
//                     {grouping ? "Grouping..." : `Group ${selectedIds.size || ""} selected`}
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         )}

//         <SuspectMap />
//       </main>
//     </div>
//   );
// }

// const styles = {
//   layout: {
//     display: "grid",
//     gridTemplateColumns: "260px 1fr 200px",
//     gap: 16,
//     alignItems: "start",
//   },
//   sideCard: { position: "sticky", top: 20 },
//   legend: { position: "sticky", top: 20 },
//   graphPanel: { padding: 0, overflow: "hidden" },
//   legendRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 },
//   swatch: { width: 10, height: 10, borderRadius: "50%", flexShrink: 0 },
//   legendEditBtn: {
//     background: "none", border: "none", color: "var(--text-muted)",
//     fontSize: 12, padding: "0 2px", flexShrink: 0,
//   },
//   legendInput: {
//     flex: 1, fontSize: 12, padding: "3px 6px", border: "1px solid var(--paper-line)",
//     borderRadius: 3, background: "#fffdf8", minWidth: 0,
//   },
//   legendSaveBtn: {
//     background: "var(--ink)", color: "var(--text-on-ink)", border: "none",
//     borderRadius: 3, fontSize: 11, padding: "0 8px", flexShrink: 0,
//   },
//   colorInput: {
//     width: 26, height: 26, padding: 0, border: "1px solid var(--paper-line)",
//     borderRadius: 4, flexShrink: 0, cursor: "pointer",
//   },
//   hr: { border: "none", borderTop: "1px solid var(--paper-line)", margin: "14px 0" },
//   unclusteredList: {
//     display: "flex", flexWrap: "wrap", gap: "6px 20px", marginBottom: 16,
//     maxHeight: 160, overflowY: "auto", padding: "4px 0",
//   },
//   unclusteredRow: {
//     display: "flex", alignItems: "center", gap: 8, fontSize: 13, minWidth: 200,
//   },
//   groupForm: { display: "flex", alignItems: "center", gap: 10 },
//   groupNameInput: {
//     flex: 1, maxWidth: 320, padding: "8px 10px", border: "1px solid var(--paper-line)",
//     borderRadius: 4, background: "#fffdf8", fontSize: 13.5,
//   },
// };
import { useEffect, useState, useCallback, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SuspectMap from "../components/SuspectMap";
import { api, getSession } from "../api";

// Fallback colors for the originally-seeded clusters, used only when a
// cluster has no supervisor-set cluster_color yet.
const CLUSTER_COLORS = {
  cluster_1: "#3d6b8a",
  cluster_2: "#7a5c3e",
  cluster_3: "#4b6d4f",
  cluster_4: "#96323b",
  cluster_4a: "#c15d3f",
  cluster_4b: "#a9793b",
  cluster_4c: "#8a5a7a",
  cluster_5: "#6b6456",
  cluster_6: "#3e7a8a",
  cluster_7: "#7a8a3e",
  cluster_8: "#a8a196",
};
const DEFAULT_COLOR = "#a8a196";

function colorForCluster(node) {
  return node.cluster_color || CLUSTER_COLORS[node.cluster_id] || DEFAULT_COLOR;
}

function slugify(name) {
  return "cluster_" + name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

export default function GraphAnalytics() {
  const [graph, setGraph] = useState({ nodes: [], links: [] });
  const [selected, setSelected] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editingCluster, setEditingCluster] = useState(null);
  const [editLabel, setEditLabel] = useState("");
  const [editColor, setEditColor] = useState("#a8a196");
  const [savingCluster, setSavingCluster] = useState(false);

  const [unclustered, setUnclustered] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [newClusterName, setNewClusterName] = useState("");
  const [newClusterColor, setNewClusterColor] = useState("#7a5c3e");
  const [grouping, setGrouping] = useState(false);

  const fgRef = useRef();
  const graphContainerRef = useRef();
  const [graphDims, setGraphDims] = useState({ width: 600, height: 560 });
  const session = getSession();
  const canManageClusters = session?.role === "supervisor";

  function loadGraph() {
    api.getGraph().then((data) => {
      setGraph({
        nodes: data.nodes,
        links: data.edges.map((e) => ({ source: e.source, target: e.target, type: e.type })),
      });
    });
  }

  function loadUnclustered() {
    if (!canManageClusters) return;
    api.listUnclustered().then(setUnclustered).catch(() => {});
  }

  useEffect(() => { loadGraph(); loadUnclustered(); }, []);

  // Keep the canvas sized to its actual container — a mismatch here is
  // exactly what makes clicks miss: react-force-graph hit-tests against
  // the width/height it was given, so if that's bigger or smaller than
  // the real rendered box, clicks land on the wrong coordinates.
  useEffect(() => {
    const el = graphContainerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setGraphDims({ width, height });
        }
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleNodeClick = useCallback((node) => {
    setSelected(node);
    setProfile(null);
    api.getSuspectProfile(node.id).then(setProfile).catch(() => {});
  }, []);

  const clustersPresent = [...new Set(graph.nodes.map((n) => n.cluster_id))].filter(Boolean);

  function startEditing(cid, currentLabel, currentColor) {
    setEditingCluster(cid);
    setEditLabel(currentLabel);
    setEditColor(currentColor || "#a8a196");
  }

  async function saveClusterLabel(cid) {
    const trimmed = editLabel.trim();
    if (!trimmed) return;
    setSavingCluster(true);
    try {
      await api.renameCluster(cid, trimmed, editColor);
      setEditingCluster(null);
      loadGraph();
    } catch (err) {
      alert(err.message);
    } finally {
      setSavingCluster(false);
    }
  }

  function toggleSelected(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  async function handleGroupSelected() {
    const name = newClusterName.trim();
    if (!name || selectedIds.size === 0) return;
    setGrouping(true);
    try {
      await api.assignCluster([...selectedIds], slugify(name), name, newClusterColor);
      setSelectedIds(new Set());
      setNewClusterName("");
      loadGraph();
      loadUnclustered();
    } catch (err) {
      alert(err.message);
    } finally {
      setGrouping(false);
    }
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content" style={{ maxWidth: "none" }}>
        <div className="page-header">
          <div className="kicker">NETWORK</div>
          <h1>Graph analytics</h1>
        </div>

        <div style={styles.layout}>
          {/* Left: selected suspect card */}
          <div style={styles.sideCard}>
            {!selected && (
              <div className="panel">
                <p style={{ color: "var(--text-muted)", fontSize: 13.5, margin: 0 }}>
                  Click a node to see that person's overview here.
                </p>
              </div>
            )}
            {selected && (
              <div className="panel">
                <h3 style={{ marginBottom: 2 }}>{selected.name}</h3>
                <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: "0 0 12px" }}>
                  {selected.role} &middot; {selected.country_base}
                </p>
                <span className={`tag tag-influence-${selected.influence_level}`}>
                  {selected.influence_level} influence
                </span>
                <div style={{ marginTop: 12, fontSize: 13 }}>
                  <div>Centrality score: <span className="data">{selected.computed_centrality}</span></div>
                </div>
                {profile && (
                  <>
                    <hr style={styles.hr} />
                    <div style={{ fontSize: 13 }}>
                      <strong>Top connections</strong>
                      {profile.top_connections.slice(0, 4).map((c) => (
                        <div key={c.id} style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                          <span>{c.name}</span>
                          <span className="data" style={{ color: "var(--text-muted)" }}>{c.call_count}x</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <Link to={`/suspect/${selected.id}`} className="btn btn-secondary" style={{ marginTop: 14, width: "100%", justifyContent: "center" }}>
                  Full profile
                </Link>
              </div>
            )}
          </div>

          {/* Center: the graph */}
          <div className="panel" style={styles.graphPanel} ref={graphContainerRef}>
            <ForceGraph2D
              ref={fgRef}
              graphData={graph}
              nodeId="id"
              nodeLabel={(n) => n.name}
              nodeColor={colorForCluster}
              nodeRelSize={5}
              linkColor={() => "rgba(150, 50, 59, 0.35)"}
              linkWidth={1}
              backgroundColor="#f4efe3"
              onNodeClick={handleNodeClick}
              width={graphDims.width}
              height={graphDims.height}
            />
          </div>

          {/* Right: legend */}
          <div style={styles.legend}>
            <div className="panel">
              <h3 style={{ marginBottom: 10 }}>Legend</h3>
              {clustersPresent.map((cid) => {
                const node = graph.nodes.find((n) => n.cluster_id === cid);
                const label = node?.cluster_label || cid;
                const color = colorForCluster(node || {});
                const isEditing = editingCluster === cid;
                return (
                  <div key={cid} style={styles.legendRow}>
                    {isEditing ? (
                      <span style={{ display: "flex", gap: 4, flex: 1, alignItems: "center" }}>
                        <input
                          type="color"
                          value={editColor}
                          onChange={(e) => setEditColor(e.target.value)}
                          style={styles.colorInput}
                          title="Cluster color"
                        />
                        <input
                          autoFocus
                          value={editLabel}
                          onChange={(e) => setEditLabel(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") saveClusterLabel(cid); if (e.key === "Escape") setEditingCluster(null); }}
                          style={styles.legendInput}
                        />
                        <button
                          onClick={() => saveClusterLabel(cid)}
                          disabled={savingCluster}
                          style={styles.legendSaveBtn}
                          aria-label="Save"
                        >
                          &#10003;
                        </button>
                      </span>
                    ) : (
                      <>
                        <span style={{ ...styles.swatch, background: color }} />
                        <span style={{ fontSize: 12.5, flex: 1 }}>{label}</span>
                        {canManageClusters && (
                          <button
                            onClick={() => startEditing(cid, label, color)}
                            style={styles.legendEditBtn}
                            aria-label={`Edit ${label}`}
                            title="Rename / recolor cluster"
                          >
                            &#9998;
                          </button>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 12 }}>
                Node size reflects call/relationship volume. Red lines are relationship edges.
              </p>
            </div>
          </div>
        </div>

        {/* Full-width: group unclustered suspects into a new cluster (supervisor only) */}
        {canManageClusters && (
          <div className="panel" style={{ marginTop: 20 }}>
            <h3 style={{ marginBottom: 4 }}>Group unclustered suspects</h3>
            <p style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 0, marginBottom: 14 }}>
              These suspects showed up grey on the graph because no one has assigned them a cluster yet.
              Look at their connections, tick the ones that belong together, and give them a name and color.
            </p>

            {unclustered.length === 0 && (
              <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                No unclustered suspects right now — everyone has a cluster.
              </p>
            )}

            {unclustered.length > 0 && (
              <>
                <div style={styles.unclusteredList}>
                  {unclustered.map((e) => (
                    <label key={e.id} style={styles.unclusteredRow}>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(e.id)}
                        onChange={() => toggleSelected(e.id)}
                      />
                      <span>{e.name}</span>
                      <Link to={`/suspect/${e.id}`} style={{ fontSize: 11.5, color: "var(--text-muted)" }}>
                        view
                      </Link>
                    </label>
                  ))}
                </div>

                <div style={styles.groupForm}>
                  <input
                    type="color"
                    value={newClusterColor}
                    onChange={(e) => setNewClusterColor(e.target.value)}
                    style={styles.colorInput}
                    title="New cluster color"
                  />
                  <input
                    style={styles.groupNameInput}
                    placeholder="New cluster name, e.g. 'Riverside Crew'"
                    value={newClusterName}
                    onChange={(e) => setNewClusterName(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleGroupSelected}
                    disabled={grouping || selectedIds.size === 0 || !newClusterName.trim()}
                  >
                    {grouping ? "Grouping..." : `Group ${selectedIds.size || ""} selected`}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <SuspectMap />
      </main>
    </div>
  );
}

const styles = {
  layout: {
    display: "grid",
    gridTemplateColumns: "260px 1fr 200px",
    gap: 16,
    alignItems: "start",
  },
  sideCard: { position: "sticky", top: 20 },
  legend: { position: "sticky", top: 20 },
  graphPanel: { padding: 0, overflow: "hidden", height: 560, width: "100%" },
  legendRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 },
  swatch: { width: 10, height: 10, borderRadius: "50%", flexShrink: 0 },
  legendEditBtn: {
    background: "none", border: "none", color: "var(--text-muted)",
    fontSize: 12, padding: "0 2px", flexShrink: 0,
  },
  legendInput: {
    flex: 1, fontSize: 12, padding: "3px 6px", border: "1px solid var(--paper-line)",
    borderRadius: 3, background: "#fffdf8", minWidth: 0,
  },
  legendSaveBtn: {
    background: "var(--ink)", color: "var(--text-on-ink)", border: "none",
    borderRadius: 3, fontSize: 11, padding: "0 8px", flexShrink: 0,
  },
  colorInput: {
    width: 26, height: 26, padding: 0, border: "1px solid var(--paper-line)",
    borderRadius: 4, flexShrink: 0, cursor: "pointer",
  },
  hr: { border: "none", borderTop: "1px solid var(--paper-line)", margin: "14px 0" },
  unclusteredList: {
    display: "flex", flexWrap: "wrap", gap: "6px 20px", marginBottom: 16,
    maxHeight: 160, overflowY: "auto", padding: "4px 0",
  },
  unclusteredRow: {
    display: "flex", alignItems: "center", gap: 8, fontSize: 13, minWidth: 200,
  },
  groupForm: { display: "flex", alignItems: "center", gap: 10 },
  groupNameInput: {
    flex: 1, maxWidth: 320, padding: "8px 10px", border: "1px solid var(--paper-line)",
    borderRadius: 4, background: "#fffdf8", fontSize: 13.5,
  },
};
