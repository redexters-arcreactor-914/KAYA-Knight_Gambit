// // // // // const API_BASE = "http://localhost:8000";

// // // // // // --- Session (stored in localStorage) ---
// // // // // function saveSession(data) {
// // // // //   localStorage.setItem("netra_token", data.access_token);
// // // // //   localStorage.setItem("netra_role", data.role);
// // // // //   localStorage.setItem("netra_full_name", data.full_name);
// // // // // }

// // // // // function getSession() {
// // // // //   const token = localStorage.getItem("netra_token");
// // // // //   if (!token) return null;
// // // // //   return {
// // // // //     token,
// // // // //     role: localStorage.getItem("netra_role"),
// // // // //     fullName: localStorage.getItem("netra_full_name"),
// // // // //   };
// // // // // }

// // // // // function clearSession() {
// // // // //   localStorage.removeItem("netra_token");
// // // // //   localStorage.removeItem("netra_role");
// // // // //   localStorage.removeItem("netra_full_name");
// // // // // }

// // // // // function getToken() {
// // // // //   return localStorage.getItem("netra_token");
// // // // // }

// // // // // // --- Core request helper ---
// // // // // async function request(path, options = {}) {
// // // // //   const token = getToken();
// // // // //   const headers = {
// // // // //     "Content-Type": "application/json",
// // // // //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
// // // // //     ...(options.headers || {}),
// // // // //   };

// // // // //   let res;
// // // // //   try {
// // // // //     res = await fetch(`${API_BASE}${path}`, { ...options, headers });
// // // // //   } catch (err) {
// // // // //     throw new Error("Couldn't reach the server. Is the backend running on localhost:8000?");
// // // // //   }

// // // // //   if (!res.ok) {
// // // // //     let detail;
// // // // //     try {
// // // // //       const body = await res.json();
// // // // //       detail = body.detail;
// // // // //     } catch {
// // // // //       detail = res.statusText;
// // // // //     }
// // // // //     throw new Error(typeof detail === "string" ? detail : "Request failed");
// // // // //   }

// // // // //   if (res.status === 204) return null;
// // // // //   return res.json();
// // // // // }

// // // // // function qs(params = {}) {
// // // // //   const clean = Object.fromEntries(
// // // // //     Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
// // // // //   );
// // // // //   const s = new URLSearchParams(clean).toString();
// // // // //   return s ? `?${s}` : "";
// // // // // }

// // // // // // --- API surface ---
// // // // // const api = {
// // // // //   login(username, password) {
// // // // //     return request("/auth/login", {
// // // // //       method: "POST",
// // // // //       body: JSON.stringify({ username, password }),
// // // // //     });
// // // // //   },

// // // // //   listEntities(filters = {}) {
// // // // //     return request(`/entities${qs(filters)}`);
// // // // //   },

// // // // //   getSuspectProfile(entityId) {
// // // // //     return request(`/entities/${entityId}/profile`);
// // // // //   },

// // // // //   getGraph() {
// // // // //     return request("/graph");
// // // // //   },

// // // // //   getAnomalies(topN = 10) {
// // // // //     return request(`/graph/anomalies${qs({ top_n: topN })}`);
// // // // //   },

// // // // //   getPredictedLinks(topN = 15) {
// // // // //     return request(`/graph/predicted-links${qs({ top_n: topN })}`);
// // // // //   },

// // // // //   filterReports(filters = {}) {
// // // // //     return request(`/reports/filter${qs(filters)}`);
// // // // //   },

// // // // //   fileCrimeReport(payload) {
// // // // //     return request("/reports/crime", { method: "POST", body: JSON.stringify(payload) });
// // // // //   },

// // // // //   fileFinancialFlag(payload) {
// // // // //     return request("/reports/financial", { method: "POST", body: JSON.stringify(payload) });
// // // // //   },

// // // // //   fileCallRecord(payload) {
// // // // //     return request("/reports/call", { method: "POST", body: JSON.stringify(payload) });
// // // // //   },

// // // // //   suggestCrimeCategory(description) {
// // // // //     return request("/reports/crime/suggest-category", {
// // // // //       method: "POST",
// // // // //       body: JSON.stringify({ description }),
// // // // //     });
// // // // //   },
// // // // // };

// // // // // export { api, saveSession, getSession, clearSession, getToken };


// // // // const API_BASE = "http://localhost:8000";

// // // // // --- Session (stored in localStorage) ---
// // // // function saveSession(data) {
// // // //   localStorage.setItem("netra_token", data.access_token);
// // // //   localStorage.setItem("netra_role", data.role);
// // // //   localStorage.setItem("netra_full_name", data.full_name);
// // // // }

// // // // function getSession() {
// // // //   const token = localStorage.getItem("netra_token");
// // // //   if (!token) return null;
// // // //   return {
// // // //     token,
// // // //     role: localStorage.getItem("netra_role"),
// // // //     fullName: localStorage.getItem("netra_full_name"),
// // // //   };
// // // // }

// // // // function clearSession() {
// // // //   localStorage.removeItem("netra_token");
// // // //   localStorage.removeItem("netra_role");
// // // //   localStorage.removeItem("netra_full_name");
// // // // }

// // // // function getToken() {
// // // //   return localStorage.getItem("netra_token");
// // // // }

// // // // // --- Core request helper ---
// // // // async function request(path, options = {}) {
// // // //   const token = getToken();
// // // //   const headers = {
// // // //     "Content-Type": "application/json",
// // // //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
// // // //     ...(options.headers || {}),
// // // //   };

// // // //   let res;
// // // //   try {
// // // //     res = await fetch(`${API_BASE}${path}`, { ...options, headers });
// // // //   } catch (err) {
// // // //     throw new Error("Couldn't reach the server. Is the backend running on localhost:8000?");
// // // //   }

// // // //   if (!res.ok) {
// // // //     let detail;
// // // //     try {
// // // //       const body = await res.json();
// // // //       detail = body.detail;
// // // //     } catch {
// // // //       detail = res.statusText;
// // // //     }
// // // //     throw new Error(typeof detail === "string" ? detail : "Request failed");
// // // //   }

// // // //   if (res.status === 204) return null;
// // // //   return res.json();
// // // // }

// // // // function qs(params = {}) {
// // // //   const clean = Object.fromEntries(
// // // //     Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
// // // //   );
// // // //   const s = new URLSearchParams(clean).toString();
// // // //   return s ? `?${s}` : "";
// // // // }

// // // // // --- API surface ---
// // // // const api = {
// // // //   login(username, password) {
// // // //     return request("/auth/login", {
// // // //       method: "POST",
// // // //       body: JSON.stringify({ username, password }),
// // // //     });
// // // //   },

// // // //   listEntities(filters = {}) {
// // // //     return request(`/entities${qs(filters)}`);
// // // //   },

// // // //   getSuspectProfile(entityId) {
// // // //     return request(`/entities/${entityId}/profile`);
// // // //   },

// // // //   getGraph() {
// // // //     return request("/graph");
// // // //   },

// // // //   getAnomalies(topN = 10) {
// // // //     return request(`/graph/anomalies${qs({ top_n: topN })}`);
// // // //   },

// // // //   getPredictedLinks(topN = 15) {
// // // //     return request(`/graph/predicted-links${qs({ top_n: topN })}`);
// // // //   },

// // // //   filterReports(filters = {}) {
// // // //     return request(`/reports/filter${qs(filters)}`);
// // // //   },

// // // //   fileCrimeReport(payload) {
// // // //     return request("/reports/crime", { method: "POST", body: JSON.stringify(payload) });
// // // //   },

// // // //   fileFinancialFlag(payload) {
// // // //     return request("/reports/financial", { method: "POST", body: JSON.stringify(payload) });
// // // //   },

// // // //   fileCallRecord(payload) {
// // // //     return request("/reports/call", { method: "POST", body: JSON.stringify(payload) });
// // // //   },

// // // //   suggestCrimeCategory(description) {
// // // //     return request("/reports/crime/suggest-category", {
// // // //       method: "POST",
// // // //       body: JSON.stringify({ description }),
// // // //     });
// // // //   },

// // // //   listClusters() {
// // // //     return request("/clusters");
// // // //   },

// // // //   renameCluster(clusterId, label) {
// // // //     return request(`/clusters/${encodeURIComponent(clusterId)}`, {
// // // //       method: "PATCH",
// // // //       body: JSON.stringify({ label }),
// // // //     });
// // // //   },
// // // // };

// // // // export { api, saveSession, getSession, clearSession, getToken };
// // // const API_BASE = "http://localhost:8000";

// // // // --- Session (stored in localStorage) ---
// // // function saveSession(data) {
// // //   localStorage.setItem("netra_token", data.access_token);
// // //   localStorage.setItem("netra_role", data.role);
// // //   localStorage.setItem("netra_full_name", data.full_name);
// // // }

// // // function getSession() {
// // //   const token = localStorage.getItem("netra_token");
// // //   if (!token) return null;
// // //   return {
// // //     token,
// // //     role: localStorage.getItem("netra_role"),
// // //     fullName: localStorage.getItem("netra_full_name"),
// // //   };
// // // }

// // // function clearSession() {
// // //   localStorage.removeItem("netra_token");
// // //   localStorage.removeItem("netra_role");
// // //   localStorage.removeItem("netra_full_name");
// // // }

// // // function getToken() {
// // //   return localStorage.getItem("netra_token");
// // // }

// // // // --- Core request helper ---
// // // async function request(path, options = {}) {
// // //   const token = getToken();
// // //   const headers = {
// // //     "Content-Type": "application/json",
// // //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
// // //     ...(options.headers || {}),
// // //   };

// // //   let res;
// // //   try {
// // //     res = await fetch(`${API_BASE}${path}`, { ...options, headers });
// // //   } catch (err) {
// // //     throw new Error("Couldn't reach the server. Is the backend running on localhost:8000?");
// // //   }

// // //   if (!res.ok) {
// // //     let detail;
// // //     try {
// // //       const body = await res.json();
// // //       detail = body.detail;
// // //     } catch {
// // //       detail = res.statusText;
// // //     }
// // //     throw new Error(typeof detail === "string" ? detail : "Request failed");
// // //   }

// // //   if (res.status === 204) return null;
// // //   return res.json();
// // // }

// // // function qs(params = {}) {
// // //   const clean = Object.fromEntries(
// // //     Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
// // //   );
// // //   const s = new URLSearchParams(clean).toString();
// // //   return s ? `?${s}` : "";
// // // }

// // // // --- API surface ---
// // // const api = {
// // //   login(username, password) {
// // //     return request("/auth/login", {
// // //       method: "POST",
// // //       body: JSON.stringify({ username, password }),
// // //     });
// // //   },

// // //   listEntities(filters = {}) {
// // //     return request(`/entities${qs(filters)}`);
// // //   },

// // //   getSuspectProfile(entityId) {
// // //     return request(`/entities/${entityId}/profile`);
// // //   },

// // //   getGraph() {
// // //     return request("/graph");
// // //   },

// // //   getAnomalies(topN = 10) {
// // //     return request(`/graph/anomalies${qs({ top_n: topN })}`);
// // //   },

// // //   getPredictedLinks(topN = 15) {
// // //     return request(`/graph/predicted-links${qs({ top_n: topN })}`);
// // //   },

// // //   filterReports(filters = {}) {
// // //     return request(`/reports/filter${qs(filters)}`);
// // //   },

// // //   fileCrimeReport(payload) {
// // //     return request("/reports/crime", { method: "POST", body: JSON.stringify(payload) });
// // //   },

// // //   fileFinancialFlag(payload) {
// // //     return request("/reports/financial", { method: "POST", body: JSON.stringify(payload) });
// // //   },

// // //   fileCallRecord(payload) {
// // //     return request("/reports/call", { method: "POST", body: JSON.stringify(payload) });
// // //   },

// // //   suggestCrimeCategory(description) {
// // //     return request("/reports/crime/suggest-category", {
// // //       method: "POST",
// // //       body: JSON.stringify({ description }),
// // //     });
// // //   },

// // //   listClusters() {
// // //     return request("/clusters");
// // //   },

// // //   renameCluster(clusterId, label) {
// // //     return request(`/clusters/${encodeURIComponent(clusterId)}`, {
// // //       method: "PATCH",
// // //       body: JSON.stringify({ label }),
// // //     });
// // //   },

// // //   getAuditLog() {
// // //     return request("/audit/log");
// // //   },
// // // };

// // // export { api, saveSession, getSession, clearSession, getToken };

// // const API_BASE = "http://localhost:8000";

// // // --- Session (stored in localStorage) ---
// // function saveSession(data) {
// //   localStorage.setItem("netra_token", data.access_token);
// //   localStorage.setItem("netra_role", data.role);
// //   localStorage.setItem("netra_full_name", data.full_name);
// // }

// // function getSession() {
// //   const token = localStorage.getItem("netra_token");
// //   if (!token) return null;
// //   return {
// //     token,
// //     role: localStorage.getItem("netra_role"),
// //     fullName: localStorage.getItem("netra_full_name"),
// //   };
// // }

// // function clearSession() {
// //   localStorage.removeItem("netra_token");
// //   localStorage.removeItem("netra_role");
// //   localStorage.removeItem("netra_full_name");
// // }

// // function getToken() {
// //   return localStorage.getItem("netra_token");
// // }

// // // --- Core request helper ---
// // async function request(path, options = {}) {
// //   const token = getToken();
// //   const headers = {
// //     "Content-Type": "application/json",
// //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
// //     ...(options.headers || {}),
// //   };

// //   let res;
// //   try {
// //     res = await fetch(`${API_BASE}${path}`, { ...options, headers });
// //   } catch (err) {
// //     throw new Error("Couldn't reach the server. Is the backend running on localhost:8000?");
// //   }

// //   if (!res.ok) {
// //     let detail;
// //     try {
// //       const body = await res.json();
// //       detail = body.detail;
// //     } catch {
// //       detail = res.statusText;
// //     }
// //     throw new Error(typeof detail === "string" ? detail : "Request failed");
// //   }

// //   if (res.status === 204) return null;
// //   return res.json();
// // }

// // function qs(params = {}) {
// //   const clean = Object.fromEntries(
// //     Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
// //   );
// //   const s = new URLSearchParams(clean).toString();
// //   return s ? `?${s}` : "";
// // }

// // // --- API surface ---
// // const api = {
// //   login(username, password) {
// //     return request("/auth/login", {
// //       method: "POST",
// //       body: JSON.stringify({ username, password }),
// //     });
// //   },

// //   listEntities(filters = {}) {
// //     return request(`/entities${qs(filters)}`);
// //   },

// //   createEntity(payload) {
// //     return request("/entities", { method: "POST", body: JSON.stringify(payload) });
// //   },

// //   getSuspectProfile(entityId) {
// //     return request(`/entities/${entityId}/profile`);
// //   },

// //   getGraph() {
// //     return request("/graph");
// //   },

// //   getAnomalies(topN = 10) {
// //     return request(`/graph/anomalies${qs({ top_n: topN })}`);
// //   },

// //   getPredictedLinks(topN = 15) {
// //     return request(`/graph/predicted-links${qs({ top_n: topN })}`);
// //   },

// //   filterReports(filters = {}) {
// //     return request(`/reports/filter${qs(filters)}`);
// //   },

// //   fileCrimeReport(payload) {
// //     return request("/reports/crime", { method: "POST", body: JSON.stringify(payload) });
// //   },

// //   fileFinancialFlag(payload) {
// //     return request("/reports/financial", { method: "POST", body: JSON.stringify(payload) });
// //   },

// //   fileCallRecord(payload) {
// //     return request("/reports/call", { method: "POST", body: JSON.stringify(payload) });
// //   },

// //   suggestCrimeCategory(description) {
// //     return request("/reports/crime/suggest-category", {
// //       method: "POST",
// //       body: JSON.stringify({ description }),
// //     });
// //   },

// //   listClusters() {
// //     return request("/clusters");
// //   },

// //   renameCluster(clusterId, label) {
// //     return request(`/clusters/${encodeURIComponent(clusterId)}`, {
// //       method: "PATCH",
// //       body: JSON.stringify({ label }),
// //     });
// //   },

// //   getAuditLog() {
// //     return request("/audit/log");
// //   },

// //   updateEntity(entityId, fields) {
// //     return request(`/entities/${encodeURIComponent(entityId)}`, {
// //       method: "PATCH",
// //       body: JSON.stringify(fields),
// //     });
// //   },
// // };

// // export { api, saveSession, getSession, clearSession, getToken };



// const API_BASE = "http://localhost:8000";

// // --- Session (stored in localStorage) ---
// function saveSession(data) {
//   localStorage.setItem("netra_token", data.access_token);
//   localStorage.setItem("netra_role", data.role);
//   localStorage.setItem("netra_full_name", data.full_name);
// }

// function getSession() {
//   const token = localStorage.getItem("netra_token");
//   if (!token) return null;
//   return {
//     token,
//     role: localStorage.getItem("netra_role"),
//     fullName: localStorage.getItem("netra_full_name"),
//   };
// }

// function clearSession() {
//   localStorage.removeItem("netra_token");
//   localStorage.removeItem("netra_role");
//   localStorage.removeItem("netra_full_name");
// }

// function getToken() {
//   return localStorage.getItem("netra_token");
// }

// // --- Core request helper ---
// async function request(path, options = {}) {
//   const token = getToken();
//   const headers = {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     ...(options.headers || {}),
//   };

//   let res;
//   try {
//     res = await fetch(`${API_BASE}${path}`, { ...options, headers });
//   } catch (err) {
//     throw new Error("Couldn't reach the server. Is the backend running on localhost:8000?");
//   }

//   if (!res.ok) {
//     let detail;
//     try {
//       const body = await res.json();
//       detail = body.detail;
//     } catch {
//       detail = res.statusText;
//     }
//     throw new Error(typeof detail === "string" ? detail : "Request failed");
//   }

//   if (res.status === 204) return null;
//   return res.json();
// }

// function qs(params = {}) {
//   const clean = Object.fromEntries(
//     Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
//   );
//   const s = new URLSearchParams(clean).toString();
//   return s ? `?${s}` : "";
// }

// // --- API surface ---
// const api = {
//   login(username, password) {
//     return request("/auth/login", {
//       method: "POST",
//       body: JSON.stringify({ username, password }),
//     });
//   },

//   listEntities(filters = {}) {
//     return request(`/entities${qs(filters)}`);
//   },

//   createEntity(payload) {
//     return request("/entities", { method: "POST", body: JSON.stringify(payload) });
//   },

//   getSuspectProfile(entityId) {
//     return request(`/entities/${entityId}/profile`);
//   },

//   getGraph() {
//     return request("/graph");
//   },

//   getAnomalies(topN = 10) {
//     return request(`/graph/anomalies${qs({ top_n: topN })}`);
//   },

//   getPredictedLinks(topN = 15) {
//     return request(`/graph/predicted-links${qs({ top_n: topN })}`);
//   },

//   filterReports(filters = {}) {
//     return request(`/reports/filter${qs(filters)}`);
//   },

//   fileCrimeReport(payload) {
//     return request("/reports/crime", { method: "POST", body: JSON.stringify(payload) });
//   },

//   fileFinancialFlag(payload) {
//     return request("/reports/financial", { method: "POST", body: JSON.stringify(payload) });
//   },

//   fileCallRecord(payload) {
//     return request("/reports/call", { method: "POST", body: JSON.stringify(payload) });
//   },

//   suggestCrimeCategory(description) {
//     return request("/reports/crime/suggest-category", {
//       method: "POST",
//       body: JSON.stringify({ description }),
//     });
//   },

//   listClusters() {
//     return request("/clusters");
//   },

//   renameCluster(clusterId, label, color) {
//     return request(`/clusters/${encodeURIComponent(clusterId)}`, {
//       method: "PATCH",
//       body: JSON.stringify({ label, color: color || undefined }),
//     });
//   },

//   assignCluster(entityIds, clusterId, label, color) {
//     return request("/clusters/assign", {
//       method: "POST",
//       body: JSON.stringify({ entity_ids: entityIds, cluster_id: clusterId, label, color: color || undefined }),
//     });
//   },

//   listUnclustered() {
//     return request(`/entities${qs({ unclustered: true })}`);
//   },

//   getAuditLog() {
//     return request("/audit/log");
//   },

//   updateEntity(entityId, fields) {
//     return request(`/entities/${encodeURIComponent(entityId)}`, {
//       method: "PATCH",
//       body: JSON.stringify(fields),
//     });
//   },
// };

// export { api, saveSession, getSession, clearSession, getToken };
const API_BASE = "http://localhost:8000";

// --- Session (stored in localStorage) ---
function saveSession(data) {
  localStorage.setItem("netra_token", data.access_token);
  localStorage.setItem("netra_role", data.role);
  localStorage.setItem("netra_full_name", data.full_name);
}

function getSession() {
  const token = localStorage.getItem("netra_token");
  if (!token) return null;
  return {
    token,
    role: localStorage.getItem("netra_role"),
    fullName: localStorage.getItem("netra_full_name"),
  };
}

function clearSession() {
  localStorage.removeItem("netra_token");
  localStorage.removeItem("netra_role");
  localStorage.removeItem("netra_full_name");
}

function getToken() {
  return localStorage.getItem("netra_token");
}

// --- Core request helper ---
async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch (err) {
    throw new Error("Couldn't reach the server. Is the backend running on localhost:8000?");
  }

  if (!res.ok) {
    let detail;
    try {
      const body = await res.json();
      detail = body.detail;
    } catch {
      detail = res.statusText;
    }
    throw new Error(typeof detail === "string" ? detail : "Request failed");
  }

  if (res.status === 204) return null;
  return res.json();
}

function qs(params = {}) {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
  );
  const s = new URLSearchParams(clean).toString();
  return s ? `?${s}` : "";
}

// --- API surface ---
const api = {
  login(username, password) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  },

  listEntities(filters = {}) {
    return request(`/entities${qs(filters)}`);
  },

  createEntity(payload) {
    return request("/entities", { method: "POST", body: JSON.stringify(payload) });
  },

  getSuspectProfile(entityId) {
    return request(`/entities/${entityId}/profile`);
  },

  getGraph() {
    return request("/graph");
  },

  getMapData() {
    return request("/graph/map");
  },

  getAnomalies(topN = 10) {
    return request(`/graph/anomalies${qs({ top_n: topN })}`);
  },

  getPredictedLinks(topN = 15) {
    return request(`/graph/predicted-links${qs({ top_n: topN })}`);
  },

  filterReports(filters = {}) {
    return request(`/reports/filter${qs(filters)}`);
  },

  fileCrimeReport(payload) {
    return request("/reports/crime", { method: "POST", body: JSON.stringify(payload) });
  },

  fileFinancialFlag(payload) {
    return request("/reports/financial", { method: "POST", body: JSON.stringify(payload) });
  },

  fileCallRecord(payload) {
    return request("/reports/call", { method: "POST", body: JSON.stringify(payload) });
  },

  suggestCrimeCategory(description) {
    return request("/reports/crime/suggest-category", {
      method: "POST",
      body: JSON.stringify({ description }),
    });
  },

  listClusters() {
    return request("/clusters");
  },

  renameCluster(clusterId, label, color) {
    return request(`/clusters/${encodeURIComponent(clusterId)}`, {
      method: "PATCH",
      body: JSON.stringify({ label, color: color || undefined }),
    });
  },

  assignCluster(entityIds, clusterId, label, color) {
    return request("/clusters/assign", {
      method: "POST",
      body: JSON.stringify({ entity_ids: entityIds, cluster_id: clusterId, label, color: color || undefined }),
    });
  },

  listUnclustered() {
    return request(`/entities${qs({ unclustered: true })}`);
  },

  getAuditLog() {
    return request("/audit/log");
  },

  updateEntity(entityId, fields) {
    return request(`/entities/${encodeURIComponent(entityId)}`, {
      method: "PATCH",
      body: JSON.stringify(fields),
    });
  },
};

export { api, saveSession, getSession, clearSession, getToken };
