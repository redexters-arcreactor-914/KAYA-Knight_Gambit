// // import { useState, useEffect } from "react";
// // import { api, getSession } from "../api";

// // /**
// //  * Shows the right "add record" form based on the logged-in officer's role.
// //  * A supervisor sees all three forms as tabs; other roles only see their own.
// //  */
// // export default function AddRecordModal({ onClose, onSaved, entities }) {
// //   const session = getSession();
// //   const role = session?.role;

// //   const availableTabs = role === "supervisor"
// //     ? ["crime", "financial", "call"]
// //     : role === "fir" ? ["crime"]
// //     : role === "financial" ? ["financial"]
// //     : role === "call_recording" ? ["call"]
// //     : [];

// //   const [tab, setTab] = useState(availableTabs[0]);

// //   return (
// //     <div style={styles.overlay} onClick={onClose}>
// //       <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
// //         <div style={styles.modalTab}>New record</div>
// //         <button style={styles.closeBtn} onClick={onClose} aria-label="Close">&times;</button>

// //         {availableTabs.length > 1 && (
// //           <div style={styles.tabRow}>
// //             {availableTabs.map((t) => (
// //               <button
// //                 key={t}
// //                 onClick={() => setTab(t)}
// //                 style={{ ...styles.tabBtn, ...(tab === t ? styles.tabBtnActive : {}) }}
// //               >
// //                 {labelForTab(t)}
// //               </button>
// //             ))}
// //           </div>
// //         )}

// //         {tab === "crime" && <CrimeForm entities={entities} onSaved={onSaved} />}
// //         {tab === "financial" && <FinancialForm entities={entities} onSaved={onSaved} />}
// //         {tab === "call" && <CallForm entities={entities} onSaved={onSaved} />}

// //         {availableTabs.length === 0 && (
// //           <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
// //             Your role ({role}) doesn't file any of these record types.
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // function labelForTab(t) {
// //   return { crime: "Crime report", financial: "Financial flag", call: "Call record" }[t];
// // }

// // // --- FIR / Crime report form ---
// // function CrimeForm({ entities, onSaved }) {
// //   const [entityId, setEntityId] = useState("");
// //   const [crimeType, setCrimeType] = useState("");
// //   const [place, setPlace] = useState("");
// //   const [date, setDate] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [drugRelated, setDrugRelated] = useState(false);
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [suggesting, setSuggesting] = useState(false);
// //   const [error, setError] = useState("");
// //   const [saving, setSaving] = useState(false);

// //   // Debounced auto-suggest as the officer types the description
// //   useEffect(() => {
// //     if (description.trim().length < 15) {
// //       setSuggestions([]);
// //       return;
// //     }
// //     const handle = setTimeout(() => {
// //       setSuggesting(true);
// //       api.suggestCrimeCategory(description)
// //         .then((d) => setSuggestions(d.suggestions || []))
// //         .catch(() => {})
// //         .finally(() => setSuggesting(false));
// //     }, 500);
// //     return () => clearTimeout(handle);
// //   }, [description]);

// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     setError("");
// //     if (!entityId || !crimeType) {
// //       setError("Suspect and crime type are required.");
// //       return;
// //     }
// //     setSaving(true);
// //     try {
// //       await api.fileCrimeReport({
// //         entity_id: entityId, crime_type: crimeType, place: place || undefined,
// //         date: date || undefined, description: description || undefined, drug_related: drugRelated,
// //       });
// //       onSaved();
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setSaving(false);
// //     }
// //   }

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <EntityPicker entities={entities} value={entityId} onChange={setEntityId} />

// //       <Field label="Crime type">
// //         <input style={styles.input} value={crimeType} onChange={(e) => setCrimeType(e.target.value)}
// //           placeholder="e.g. murder, kidnapping, drug trafficking" required />
// //       </Field>

// //       <Field label="Place">
// //         <input style={styles.input} value={place} onChange={(e) => setPlace(e.target.value)} />
// //       </Field>

// //       <Field label="Date">
// //         <input type="date" style={styles.input} value={date} onChange={(e) => setDate(e.target.value)} />
// //       </Field>

// //       <Field label="Description">
// //         <textarea style={{ ...styles.input, minHeight: 70 }} value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //           placeholder="What happened, as reported..." />
// //       </Field>

// //       {suggesting && <p style={styles.hint}>Checking suggested category...</p>}
// //       {suggestions.length > 0 && (
// //         <div style={styles.suggestBox}>
// //           <div style={styles.hint}>Suggested category (from description text — confirm or ignore):</div>
// //           {suggestions.map((s) => (
// //             <button
// //               type="button"
// //               key={s.crime_type}
// //               onClick={() => setCrimeType(s.crime_type)}
// //               style={styles.suggestChip}
// //             >
// //               {s.crime_type} <span className="data" style={{ opacity: 0.7 }}>({(s.confidence * 100).toFixed(0)}%)</span>
// //             </button>
// //           ))}
// //         </div>
// //       )}

// //       <label style={styles.checkboxRow}>
// //         <input type="checkbox" checked={drugRelated} onChange={(e) => setDrugRelated(e.target.checked)} />
// //         Drug-related
// //       </label>

// //       {error && <div style={styles.error}>{error}</div>}
// //       <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 14 }} disabled={saving}>
// //         {saving ? "Filing..." : "File crime report"}
// //       </button>
// //     </form>
// //   );
// // }

// // // --- Financial flag form ---
// // function FinancialForm({ entities, onSaved }) {
// //   const [fromEntity, setFromEntity] = useState("");
// //   const [toEntity, setToEntity] = useState("");
// //   const [amount, setAmount] = useState("");
// //   const [currency, setCurrency] = useState("INR");
// //   const [date, setDate] = useState("");
// //   const [purpose, setPurpose] = useState("funding operation");
// //   const [context, setContext] = useState("");
// //   const [error, setError] = useState("");
// //   const [saving, setSaving] = useState(false);

// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     setError("");
// //     if (!fromEntity || !toEntity || !amount) {
// //       setError("From, to, and amount are required.");
// //       return;
// //     }
// //     setSaving(true);
// //     try {
// //       await api.fileFinancialFlag({
// //         from_entity: fromEntity, to_entity: toEntity, amount: parseFloat(amount),
// //         currency, date: date || undefined, purpose, context: context || undefined,
// //       });
// //       onSaved();
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setSaving(false);
// //     }
// //   }

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <EntityPicker entities={entities} value={fromEntity} onChange={setFromEntity} label="From" />
// //       <EntityPicker entities={entities} value={toEntity} onChange={setToEntity} label="To" />

// //       <div style={{ display: "flex", gap: 10 }}>
// //         <Field label="Amount" style={{ flex: 2 }}>
// //           <input type="number" style={styles.input} value={amount} onChange={(e) => setAmount(e.target.value)} required />
// //         </Field>
// //         <Field label="Currency" style={{ flex: 1 }}>
// //           <select style={styles.input} value={currency} onChange={(e) => setCurrency(e.target.value)}>
// //             <option>INR</option><option>USD</option><option>PKR</option>
// //           </select>
// //         </Field>
// //       </div>

// //       <Field label="Purpose">
// //         <select style={styles.input} value={purpose} onChange={(e) => setPurpose(e.target.value)}>
// //           <option value="funding operation">Funding operation</option>
// //           <option value="laundering">Laundering</option>
// //           <option value="payment for supply">Payment for supply</option>
// //         </select>
// //       </Field>

// //       <Field label="Date">
// //         <input type="date" style={styles.input} value={date} onChange={(e) => setDate(e.target.value)} />
// //       </Field>

// //       <Field label="Context">
// //         <textarea style={{ ...styles.input, minHeight: 60 }} value={context} onChange={(e) => setContext(e.target.value)} />
// //       </Field>

// //       {error && <div style={styles.error}>{error}</div>}
// //       <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 14 }} disabled={saving}>
// //         {saving ? "Filing..." : "File financial flag"}
// //       </button>
// //     </form>
// //   );
// // }

// // // --- Call record form ---
// // function CallForm({ entities, onSaved }) {
// //   const [entity1, setEntity1] = useState("");
// //   const [entity2, setEntity2] = useState("");
// //   const [callCount, setCallCount] = useState("");
// //   const [note, setNote] = useState("");
// //   const [error, setError] = useState("");
// //   const [saving, setSaving] = useState(false);

// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     setError("");
// //     if (!entity1 || !entity2 || !callCount) {
// //       setError("Both parties and a call count are required.");
// //       return;
// //     }
// //     setSaving(true);
// //     try {
// //       await api.fileCallRecord({
// //         entity_1: entity1, entity_2: entity2, call_count: parseInt(callCount, 10), note: note || undefined,
// //       });
// //       onSaved();
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setSaving(false);
// //     }
// //   }

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <EntityPicker entities={entities} value={entity1} onChange={setEntity1} label="Contacted (person 1)" />
// //       <EntityPicker entities={entities} value={entity2} onChange={setEntity2} label="Contacted (person 2)" />

// //       <Field label="Call count">
// //         <input type="number" style={styles.input} value={callCount} onChange={(e) => setCallCount(e.target.value)} required />
// //       </Field>

// //       <Field label="Note">
// //         <textarea style={{ ...styles.input, minHeight: 60 }} value={note} onChange={(e) => setNote(e.target.value)}
// //           placeholder="What was found in the call..." />
// //       </Field>

// //       {error && <div style={styles.error}>{error}</div>}
// //       <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 14 }} disabled={saving}>
// //         {saving ? "Filing..." : "File call record"}
// //       </button>
// //     </form>
// //   );
// // }

// // // --- Shared bits ---
// // function Field({ label, children, style }) {
// //   return (
// //     <div style={{ marginTop: 12, ...style }}>
// //       <label style={styles.label}>{label}</label>
// //       {children}
// //     </div>
// //   );
// // }

// // function EntityPicker({ entities, value, onChange, label = "Suspect" }) {
// //   return (
// //     <Field label={label}>
// //       <select style={styles.input} value={value} onChange={(e) => onChange(e.target.value)} required>
// //         <option value="">Select...</option>
// //         {entities.map((e) => (
// //           <option key={e.id} value={e.id}>{e.name}</option>
// //         ))}
// //       </select>
// //     </Field>
// //   );
// // }

// // const styles = {
// //   overlay: {
// //     position: "fixed", inset: 0, background: "rgba(27,42,56,0.45)",
// //     display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
// //   },
// //   modal: {
// //     position: "relative", width: 460, maxHeight: "85vh", overflowY: "auto",
// //     background: "var(--paper-light)", border: "1px solid var(--paper-line)",
// //     borderRadius: 6, padding: "26px 24px 22px", boxShadow: "0 12px 32px rgba(27,42,56,0.3)",
// //   },
// //   modalTab: {
// //     position: "absolute", top: -14, left: 24, background: "var(--ink)", color: "var(--text-on-ink)",
// //     fontFamily: "var(--font-data)", fontSize: 10.5, letterSpacing: "0.04em", padding: "4px 10px", borderRadius: 3,
// //   },
// //   closeBtn: {
// //     position: "absolute", top: 14, right: 16, background: "none", border: "none",
// //     fontSize: 22, lineHeight: 1, color: "var(--text-muted)",
// //   },
// //   tabRow: { display: "flex", gap: 6, marginBottom: 4, marginTop: 6 },
// //   tabBtn: {
// //     flex: 1, padding: "7px 0", fontSize: 12.5, background: "transparent",
// //     border: "1px solid var(--paper-line)", borderRadius: 4, color: "var(--text-secondary)",
// //   },
// //   tabBtnActive: { background: "var(--ink)", color: "var(--text-on-ink)", borderColor: "var(--ink)" },
// //   label: { display: "block", fontSize: 12.5, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5 },
// //   input: {
// //     width: "100%", padding: "9px 10px", border: "1px solid var(--paper-line)",
// //     borderRadius: 4, background: "#fffdf8", fontSize: 13.5, fontFamily: "var(--font-body)",
// //   },
// //   checkboxRow: { display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 13.5 },
// //   error: {
// //     marginTop: 14, fontSize: 13, color: "var(--thread)", background: "var(--thread-soft)",
// //     padding: "8px 10px", borderRadius: 4,
// //   },
// //   hint: { fontSize: 12, color: "var(--text-muted)", marginTop: 8 },
// //   suggestBox: { marginTop: 6 },
// //   suggestChip: {
// //     display: "inline-block", marginRight: 6, marginTop: 6, padding: "5px 10px",
// //     fontSize: 12, background: "#f4ecd8", color: "var(--brass-dark)",
// //     border: "1px solid var(--paper-line)", borderRadius: 12,
// //   },
// // };


// import { useState, useEffect } from "react";
// import { api, getSession } from "../api";

// /**
//  * Shows the right "add record" form based on the logged-in officer's role.
//  * A supervisor sees all three forms as tabs; other roles only see their own.
//  */
// export default function AddRecordModal({ onClose, onSaved, entities }) {
//   const session = getSession();
//   const role = session?.role;

//   const availableTabs = role === "supervisor"
//     ? ["crime", "financial", "call"]
//     : role === "fir" ? ["crime"]
//     : role === "financial" ? ["financial"]
//     : role === "call_recording" ? ["call"]
//     : [];

//   const [tab, setTab] = useState(availableTabs[0]);
//   // Local copy so a suspect created in one tab is instantly available in
//   // every EntityPicker in this modal, without needing to close and reopen it.
//   const [localEntities, setLocalEntities] = useState(entities);
//   function handleEntityCreated(entity) {
//     setLocalEntities((prev) => [...prev, entity]);
//   }

//   return (
//     <div style={styles.overlay} onClick={onClose}>
//       <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
//         <div style={styles.modalTab}>New record</div>
//         <button style={styles.closeBtn} onClick={onClose} aria-label="Close">&times;</button>

//         {availableTabs.length > 1 && (
//           <div style={styles.tabRow}>
//             {availableTabs.map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 style={{ ...styles.tabBtn, ...(tab === t ? styles.tabBtnActive : {}) }}
//               >
//                 {labelForTab(t)}
//               </button>
//             ))}
//           </div>
//         )}

//         {tab === "crime" && <CrimeForm entities={entities} onSaved={onSaved} />}
//         {tab === "financial" && <FinancialForm entities={entities} onSaved={onSaved} />}
//         {tab === "call" && <CallForm entities={entities} onSaved={onSaved} />}

//         {availableTabs.length === 0 && (
//           <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
//             Your role ({role}) doesn't file any of these record types.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// function labelForTab(t) {
//   return { crime: "Crime report", financial: "Financial flag", call: "Call record" }[t];
// }

// // --- FIR / Crime report form ---
// function CrimeForm({ entities, onSaved }) {
//   const [entityId, setEntityId] = useState("");
//   const [crimeType, setCrimeType] = useState("");
//   const [place, setPlace] = useState("");
//   const [date, setDate] = useState("");
//   const [description, setDescription] = useState("");
//   const [drugRelated, setDrugRelated] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);
//   const [suggesting, setSuggesting] = useState(false);
//   const [error, setError] = useState("");
//   const [saving, setSaving] = useState(false);

//   // Debounced auto-suggest as the officer types the description
//   useEffect(() => {
//     if (description.trim().length < 15) {
//       setSuggestions([]);
//       return;
//     }
//     const handle = setTimeout(() => {
//       setSuggesting(true);
//       api.suggestCrimeCategory(description)
//         .then((d) => setSuggestions(d.suggestions || []))
//         .catch(() => {})
//         .finally(() => setSuggesting(false));
//     }, 500);
//     return () => clearTimeout(handle);
//   }, [description]);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     if (!entityId || !crimeType) {
//       setError("Suspect and crime type are required.");
//       return;
//     }
//     setSaving(true);
//     try {
//       await api.fileCrimeReport({
//         entity_id: entityId, crime_type: crimeType, place: place || undefined,
//         date: date || undefined, description: description || undefined, drug_related: drugRelated,
//       });
//       onSaved();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <EntityPicker entities={entities} value={entityId} onChange={setEntityId} />

//       <Field label="Crime type">
//         <input style={styles.input} value={crimeType} onChange={(e) => setCrimeType(e.target.value)}
//           placeholder="e.g. murder, kidnapping, drug trafficking" required />
//       </Field>

//       <Field label="Place">
//         <input style={styles.input} value={place} onChange={(e) => setPlace(e.target.value)} />
//       </Field>

//       <Field label="Date">
//         <input type="date" style={styles.input} value={date} onChange={(e) => setDate(e.target.value)} />
//       </Field>

//       <Field label="Description">
//         <textarea style={{ ...styles.input, minHeight: 70 }} value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="What happened, as reported..." />
//       </Field>

//       {suggesting && <p style={styles.hint}>Checking suggested category...</p>}
//       {suggestions.length > 0 && (
//         <div style={styles.suggestBox}>
//           <div style={styles.hint}>Suggested category (from description text — confirm or ignore):</div>
//           {suggestions.map((s) => (
//             <button
//               type="button"
//               key={s.crime_type}
//               onClick={() => setCrimeType(s.crime_type)}
//               style={styles.suggestChip}
//             >
//               {s.crime_type} <span className="data" style={{ opacity: 0.7 }}>({(s.confidence * 100).toFixed(0)}%)</span>
//             </button>
//           ))}
//         </div>
//       )}

//       <label style={styles.checkboxRow}>
//         <input type="checkbox" checked={drugRelated} onChange={(e) => setDrugRelated(e.target.checked)} />
//         Drug-related
//       </label>

//       {error && <div style={styles.error}>{error}</div>}
//       <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 14 }} disabled={saving}>
//         {saving ? "Filing..." : "File crime report"}
//       </button>
//     </form>
//   );
// }

// // --- Financial flag form ---
// function FinancialForm({ entities, onSaved }) {
//   const [fromEntity, setFromEntity] = useState("");
//   const [toEntity, setToEntity] = useState("");
//   const [amount, setAmount] = useState("");
//   const [currency, setCurrency] = useState("INR");
//   const [date, setDate] = useState("");
//   const [purpose, setPurpose] = useState("funding operation");
//   const [context, setContext] = useState("");
//   const [error, setError] = useState("");
//   const [saving, setSaving] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     if (!fromEntity || !toEntity || !amount) {
//       setError("From, to, and amount are required.");
//       return;
//     }
//     setSaving(true);
//     try {
//       await api.fileFinancialFlag({
//         from_entity: fromEntity, to_entity: toEntity, amount: parseFloat(amount),
//         currency, date: date || undefined, purpose, context: context || undefined,
//       });
//       onSaved();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <EntityPicker entities={entities} value={fromEntity} onChange={setFromEntity} label="From" />
//       <EntityPicker entities={entities} value={toEntity} onChange={setToEntity} label="To" />

//       <div style={{ display: "flex", gap: 10 }}>
//         <Field label="Amount" style={{ flex: 2 }}>
//           <input type="number" style={styles.input} value={amount} onChange={(e) => setAmount(e.target.value)} required />
//         </Field>
//         <Field label="Currency" style={{ flex: 1 }}>
//           <select style={styles.input} value={currency} onChange={(e) => setCurrency(e.target.value)}>
//             <option>INR</option><option>USD</option><option>PKR</option>
//           </select>
//         </Field>
//       </div>

//       <Field label="Purpose">
//         <select style={styles.input} value={purpose} onChange={(e) => setPurpose(e.target.value)}>
//           <option value="funding operation">Funding operation</option>
//           <option value="laundering">Laundering</option>
//           <option value="payment for supply">Payment for supply</option>
//         </select>
//       </Field>

//       <Field label="Date">
//         <input type="date" style={styles.input} value={date} onChange={(e) => setDate(e.target.value)} />
//       </Field>

//       <Field label="Context">
//         <textarea style={{ ...styles.input, minHeight: 60 }} value={context} onChange={(e) => setContext(e.target.value)} />
//       </Field>

//       {error && <div style={styles.error}>{error}</div>}
//       <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 14 }} disabled={saving}>
//         {saving ? "Filing..." : "File financial flag"}
//       </button>
//     </form>
//   );
// }

// // --- Call record form ---
// function CallForm({ entities, onSaved }) {
//   const [entity1, setEntity1] = useState("");
//   const [entity2, setEntity2] = useState("");
//   const [callCount, setCallCount] = useState("");
//   const [note, setNote] = useState("");
//   const [error, setError] = useState("");
//   const [saving, setSaving] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     if (!entity1 || !entity2 || !callCount) {
//       setError("Both parties and a call count are required.");
//       return;
//     }
//     setSaving(true);
//     try {
//       await api.fileCallRecord({
//         entity_1: entity1, entity_2: entity2, call_count: parseInt(callCount, 10), note: note || undefined,
//       });
//       onSaved();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <EntityPicker entities={entities} value={entity1} onChange={setEntity1} label="Contacted (person 1)" />
//       <EntityPicker entities={entities} value={entity2} onChange={setEntity2} label="Contacted (person 2)" />

//       <Field label="Call count">
//         <input type="number" style={styles.input} value={callCount} onChange={(e) => setCallCount(e.target.value)} required />
//       </Field>

//       <Field label="Note">
//         <textarea style={{ ...styles.input, minHeight: 60 }} value={note} onChange={(e) => setNote(e.target.value)}
//           placeholder="What was found in the call..." />
//       </Field>

//       {error && <div style={styles.error}>{error}</div>}
//       <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 14 }} disabled={saving}>
//         {saving ? "Filing..." : "File call record"}
//       </button>
//     </form>
//   );
// }

// // --- Shared bits ---
// function Field({ label, children, style }) {
//   return (
//     <div style={{ marginTop: 12, ...style }}>
//       <label style={styles.label}>{label}</label>
//       {children}
//     </div>
//   );
// }

// function EntityPicker({ entities, value, onChange, label = "Suspect" }) {
//   // A datalist combobox: officer can pick an existing name from the
//   // suggestions, or type a name that doesn't exist yet — the backend
//   // creates a new (not-yet-profiled) suspect automatically in that case.
//   const listId = `entities-list-${label.replace(/\s+/g, "-").toLowerCase()}`;
//   return (
//     <Field label={label}>
//       <input
//         list={listId}
//         style={styles.input}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder="Type or select a name..."
//         required
//       />
//       <datalist id={listId}>
//         {entities.map((e) => (
//           <option key={e.id} value={e.name} />
//         ))}
//       </datalist>
//       <div style={styles.hint}>New name, not in the list yet? It'll be added as a new suspect.</div>
//     </Field>
//   );
// }

// const styles = {
//   overlay: {
//     position: "fixed", inset: 0, background: "rgba(27,42,56,0.45)",
//     display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
//   },
//   modal: {
//     position: "relative", width: 460, maxHeight: "85vh", overflowY: "auto",
//     background: "var(--paper-light)", border: "1px solid var(--paper-line)",
//     borderRadius: 6, padding: "26px 24px 22px", boxShadow: "0 12px 32px rgba(27,42,56,0.3)",
//   },
//   modalTab: {
//     position: "absolute", top: -14, left: 24, background: "var(--ink)", color: "var(--text-on-ink)",
//     fontFamily: "var(--font-data)", fontSize: 10.5, letterSpacing: "0.04em", padding: "4px 10px", borderRadius: 3,
//   },
//   closeBtn: {
//     position: "absolute", top: 14, right: 16, background: "none", border: "none",
//     fontSize: 22, lineHeight: 1, color: "var(--text-muted)",
//   },
//   tabRow: { display: "flex", gap: 6, marginBottom: 4, marginTop: 6 },
//   tabBtn: {
//     flex: 1, padding: "7px 0", fontSize: 12.5, background: "transparent",
//     border: "1px solid var(--paper-line)", borderRadius: 4, color: "var(--text-secondary)",
//   },
//   tabBtnActive: { background: "var(--ink)", color: "var(--text-on-ink)", borderColor: "var(--ink)" },
//   label: { display: "block", fontSize: 12.5, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5 },
//   input: {
//     width: "100%", padding: "9px 10px", border: "1px solid var(--paper-line)",
//     borderRadius: 4, background: "#fffdf8", fontSize: 13.5, fontFamily: "var(--font-body)",
//   },
//   checkboxRow: { display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 13.5 },
//   error: {
//     marginTop: 14, fontSize: 13, color: "var(--thread)", background: "var(--thread-soft)",
//     padding: "8px 10px", borderRadius: 4,
//   },
//   hint: { fontSize: 12, color: "var(--text-muted)", marginTop: 8 },
//   suggestBox: { marginTop: 6 },
//   suggestChip: {
//     display: "inline-block", marginRight: 6, marginTop: 6, padding: "5px 10px",
//     fontSize: 12, background: "#f4ecd8", color: "var(--brass-dark)",
//     border: "1px solid var(--paper-line)", borderRadius: 12,
//   },
// };

import { useState, useEffect } from "react";
import { api, getSession } from "../api";

/**
 * Shows the right "add record" form based on the logged-in officer's role.
 * A supervisor sees all three forms as tabs; other roles only see their own.
 */
export default function AddRecordModal({ onClose, onSaved, entities }) {
  const session = getSession();
  const role = session?.role;

  const availableTabs = role === "supervisor"
    ? ["crime", "financial", "call"]
    : role === "fir" ? ["crime"]
    : role === "financial" ? ["financial"]
    : role === "call_recording" ? ["call"]
    : [];

  const [tab, setTab] = useState(availableTabs[0]);
  // Local copy so a suspect created in one tab is instantly available in
  // every EntityPicker in this modal, without needing to close and reopen it.
  const [localEntities, setLocalEntities] = useState(entities);
  function handleEntityCreated(entity) {
    setLocalEntities((prev) => [...prev, entity]);
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalTab}>New record</div>
        <button style={styles.closeBtn} onClick={onClose} aria-label="Close">&times;</button>

        {availableTabs.length > 1 && (
          <div style={styles.tabRow}>
            {availableTabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{ ...styles.tabBtn, ...(tab === t ? styles.tabBtnActive : {}) }}
              >
                {labelForTab(t)}
              </button>
            ))}
          </div>
        )}

        {tab === "crime" && <CrimeForm entities={entities} onSaved={onSaved} />}
        {tab === "financial" && <FinancialForm entities={entities} onSaved={onSaved} />}
        {tab === "call" && <CallForm entities={entities} onSaved={onSaved} />}

        {availableTabs.length === 0 && (
          <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
            Your role ({role}) doesn't file any of these record types.
          </p>
        )}
      </div>
    </div>
  );
}

function labelForTab(t) {
  return { crime: "Crime report", financial: "Financial flag", call: "Call record" }[t];
}

// --- FIR / Crime report form ---
function CrimeForm({ entities, onSaved }) {
  const [entityId, setEntityId] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [drugRelated, setDrugRelated] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggesting, setSuggesting] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Debounced auto-suggest as the officer types the description
  useEffect(() => {
    if (description.trim().length < 15) {
      setSuggestions([]);
      return;
    }
    const handle = setTimeout(() => {
      setSuggesting(true);
      api.suggestCrimeCategory(description)
        .then((d) => setSuggestions(d.suggestions || []))
        .catch(() => {})
        .finally(() => setSuggesting(false));
    }, 500);
    return () => clearTimeout(handle);
  }, [description]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!entityId || !crimeType) {
      setError("Suspect and crime type are required.");
      return;
    }
    setSaving(true);
    try {
      await api.fileCrimeReport({
        entity_id: entityId, crime_type: crimeType, place: place || undefined,
        date: date || undefined, description: description || undefined, drug_related: drugRelated,
        vehicle_info: vehicleInfo || undefined,
      });
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <EntityPicker entities={entities} value={entityId} onChange={setEntityId} />

      <Field label="Crime type">
        <input style={styles.input} value={crimeType} onChange={(e) => setCrimeType(e.target.value)}
          placeholder="e.g. murder, kidnapping, drug trafficking" required />
      </Field>

      <Field label="Place">
        <input style={styles.input} value={place} onChange={(e) => setPlace(e.target.value)} />
      </Field>

      <Field label="Date">
        <input type="date" style={styles.input} value={date} onChange={(e) => setDate(e.target.value)} />
      </Field>

      <Field label="Description">
        <textarea style={{ ...styles.input, minHeight: 70 }} value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What happened, as reported..." />
      </Field>

      {suggesting && <p style={styles.hint}>Checking suggested category...</p>}
      {suggestions.length > 0 && (
        <div style={styles.suggestBox}>
          <div style={styles.hint}>Suggested category (from description text — confirm or ignore):</div>
          {suggestions.map((s) => (
            <button
              type="button"
              key={s.crime_type}
              onClick={() => setCrimeType(s.crime_type)}
              style={styles.suggestChip}
            >
              {s.crime_type} <span className="data" style={{ opacity: 0.7 }}>({(s.confidence * 100).toFixed(0)}%)</span>
            </button>
          ))}
        </div>
      )}

      <Field label="Vehicle info (optional)">
        <input style={styles.input} value={vehicleInfo} onChange={(e) => setVehicleInfo(e.target.value)}
          placeholder="e.g. white Suzuki van, plate partially seen KHI-4471" />
      </Field>

      <label style={styles.checkboxRow}>
        <input type="checkbox" checked={drugRelated} onChange={(e) => setDrugRelated(e.target.checked)} />
        Drug-related
      </label>

      {error && <div style={styles.error}>{error}</div>}
      <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 14 }} disabled={saving}>
        {saving ? "Filing..." : "File crime report"}
      </button>
    </form>
  );
}

// --- Financial flag form ---
function FinancialForm({ entities, onSaved }) {
  const [fromEntity, setFromEntity] = useState("");
  const [toEntity, setToEntity] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("funding operation");
  const [context, setContext] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!fromEntity || !toEntity || !amount) {
      setError("From, to, and amount are required.");
      return;
    }
    setSaving(true);
    try {
      await api.fileFinancialFlag({
        from_entity: fromEntity, to_entity: toEntity, amount: parseFloat(amount),
        currency, date: date || undefined, purpose, context: context || undefined,
      });
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <EntityPicker entities={entities} value={fromEntity} onChange={setFromEntity} label="From" />
      <EntityPicker entities={entities} value={toEntity} onChange={setToEntity} label="To" />

      <div style={{ display: "flex", gap: 10 }}>
        <Field label="Amount" style={{ flex: 2 }}>
          <input type="number" style={styles.input} value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </Field>
        <Field label="Currency" style={{ flex: 1 }}>
          <select style={styles.input} value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option>INR</option><option>USD</option><option>PKR</option>
          </select>
        </Field>
      </div>

      <Field label="Purpose">
        <select style={styles.input} value={purpose} onChange={(e) => setPurpose(e.target.value)}>
          <option value="funding operation">Funding operation</option>
          <option value="laundering">Laundering</option>
          <option value="payment for supply">Payment for supply</option>
        </select>
      </Field>

      <Field label="Date">
        <input type="date" style={styles.input} value={date} onChange={(e) => setDate(e.target.value)} />
      </Field>

      <Field label="Context">
        <textarea style={{ ...styles.input, minHeight: 60 }} value={context} onChange={(e) => setContext(e.target.value)} />
      </Field>

      {error && <div style={styles.error}>{error}</div>}
      <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 14 }} disabled={saving}>
        {saving ? "Filing..." : "File financial flag"}
      </button>
    </form>
  );
}

// --- Call record form ---
function CallForm({ entities, onSaved }) {
  const [entity1, setEntity1] = useState("");
  const [entity2, setEntity2] = useState("");
  const [callCount, setCallCount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!entity1 || !entity2 || !callCount) {
      setError("Both parties and a call count are required.");
      return;
    }
    setSaving(true);
    try {
      await api.fileCallRecord({
        entity_1: entity1, entity_2: entity2, call_count: parseInt(callCount, 10), note: note || undefined,
      });
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <EntityPicker entities={entities} value={entity1} onChange={setEntity1} label="Contacted (person 1)" />
      <EntityPicker entities={entities} value={entity2} onChange={setEntity2} label="Contacted (person 2)" />

      <Field label="Call count">
        <input type="number" style={styles.input} value={callCount} onChange={(e) => setCallCount(e.target.value)} required />
      </Field>

      <Field label="Note">
        <textarea style={{ ...styles.input, minHeight: 60 }} value={note} onChange={(e) => setNote(e.target.value)}
          placeholder="What was found in the call..." />
      </Field>

      {error && <div style={styles.error}>{error}</div>}
      <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 14 }} disabled={saving}>
        {saving ? "Filing..." : "File call record"}
      </button>
    </form>
  );
}

// --- Shared bits ---
function Field({ label, children, style }) {
  return (
    <div style={{ marginTop: 12, ...style }}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

function EntityPicker({ entities, value, onChange, label = "Suspect" }) {
  // A datalist combobox: officer can pick an existing name from the
  // suggestions, or type a name that doesn't exist yet — the backend
  // creates a new (not-yet-profiled) suspect automatically in that case.
  const listId = `entities-list-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <Field label={label}>
      <input
        list={listId}
        style={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type or select a name..."
        required
      />
      <datalist id={listId}>
        {entities.map((e) => (
          <option key={e.id} value={e.name} />
        ))}
      </datalist>
      <div style={styles.hint}>New name, not in the list yet? It'll be added as a new suspect.</div>
    </Field>
  );
}

const styles = {
  overlay: {
    position: "fixed", inset: 0, background: "rgba(27,42,56,0.45)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50,
  },
  modal: {
    position: "relative", width: 460, maxHeight: "85vh", overflowY: "auto",
    background: "var(--paper-light)", border: "1px solid var(--paper-line)",
    borderRadius: 6, padding: "26px 24px 22px", boxShadow: "0 12px 32px rgba(27,42,56,0.3)",
  },
  modalTab: {
    position: "absolute", top: -14, left: 24, background: "var(--ink)", color: "var(--text-on-ink)",
    fontFamily: "var(--font-data)", fontSize: 10.5, letterSpacing: "0.04em", padding: "4px 10px", borderRadius: 3,
  },
  closeBtn: {
    position: "absolute", top: 14, right: 16, background: "none", border: "none",
    fontSize: 22, lineHeight: 1, color: "var(--text-muted)",
  },
  tabRow: { display: "flex", gap: 6, marginBottom: 4, marginTop: 6 },
  tabBtn: {
    flex: 1, padding: "7px 0", fontSize: 12.5, background: "transparent",
    border: "1px solid var(--paper-line)", borderRadius: 4, color: "var(--text-secondary)",
  },
  tabBtnActive: { background: "var(--ink)", color: "var(--text-on-ink)", borderColor: "var(--ink)" },
  label: { display: "block", fontSize: 12.5, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 5 },
  input: {
    width: "100%", padding: "9px 10px", border: "1px solid var(--paper-line)",
    borderRadius: 4, background: "#fffdf8", fontSize: 13.5, fontFamily: "var(--font-body)",
  },
  checkboxRow: { display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 13.5 },
  error: {
    marginTop: 14, fontSize: 13, color: "var(--thread)", background: "var(--thread-soft)",
    padding: "8px 10px", borderRadius: 4,
  },
  hint: { fontSize: 12, color: "var(--text-muted)", marginTop: 8 },
  suggestBox: { marginTop: 6 },
  suggestChip: {
    display: "inline-block", marginRight: 6, marginTop: 6, padding: "5px 10px",
    fontSize: 12, background: "#f4ecd8", color: "var(--brass-dark)",
    border: "1px solid var(--paper-line)", borderRadius: 12,
  },
};
