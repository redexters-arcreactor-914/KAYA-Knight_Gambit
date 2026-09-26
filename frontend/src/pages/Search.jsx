// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import { api } from "../api";

// export default function Search() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [searched, setSearched] = useState(false);

//   function handleSearch(e) {
//     e.preventDefault();
//     if (!query.trim()) return;
//     api.listEntities({ name: query }).then((data) => {
//       setResults(data);
//       setSearched(true);
//     });
//   }

//   return (
//     <div className="app-shell">
//       <Sidebar />
//       <main className="main-content">
//         <div className="page-header">
//           <div className="kicker">LOOKUP</div>
//           <h1>Search</h1>
//         </div>

//         <form onSubmit={handleSearch} style={styles.searchRow}>
//           <input
//             style={styles.searchInput}
//             placeholder="Search by name, phone number, or location..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             autoFocus
//           />
//           <button type="submit" className="btn btn-primary">Search</button>
//         </form>

//         {searched && (
//           <div className="panel" style={{ marginTop: 20 }}>
//             {results.length === 0 ? (
//               <p style={{ color: "var(--text-muted)" }}>No matches for "{query}".</p>
//             ) : (
//               results.map((r) => (
//                 <Link key={r.id} to={`/suspect/${r.id}`} style={styles.resultRow}>
//                   <div>
//                     <strong>{r.name}</strong>
//                     <div style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>
//                       {r.role} &middot; {r.country_base}
//                     </div>
//                   </div>
//                   <span className="data" style={{ color: "var(--text-muted)" }}>{r.phone_number}</span>
//                 </Link>
//               ))
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// const styles = {
//   searchRow: { display: "flex", gap: 10, maxWidth: 560, margin: "0 auto" },
//   searchInput: {
//     flex: 1,
//     padding: "12px 16px",
//     fontSize: 15,
//     border: "1px solid var(--paper-line)",
//     borderRadius: 6,
//     background: "var(--paper-light)",
//   },
//   resultRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "12px 0",
//     borderBottom: "1px solid var(--paper-line)",
//     color: "var(--text-primary)",
//   },
// };
import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { api } from "../api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    api.listEntities({ q: query }).then((data) => {
      setResults(data);
      setSearched(true);
    });
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div className="page-header">
          <div className="kicker">LOOKUP</div>
          <h1>Search</h1>
        </div>

        <form onSubmit={handleSearch} style={styles.searchRow}>
          <input
            style={styles.searchInput}
            placeholder="Search by name, phone number, or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        {searched && (
          <div className="panel" style={{ marginTop: 20 }}>
            {results.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>No matches for "{query}".</p>
            ) : (
              results.map((r) => (
                <Link key={r.id} to={`/suspect/${r.id}`} style={styles.resultRow}>
                  <div>
                    <strong>{r.name}</strong>
                    <div style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>
                      {r.role} &middot; {r.country_base}
                    </div>
                  </div>
                  <span className="data" style={{ color: "var(--text-muted)" }}>{r.phone_number}</span>
                </Link>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  searchRow: { display: "flex", gap: 10, maxWidth: 560, margin: "0 auto" },
  searchInput: {
    flex: 1,
    padding: "12px 16px",
    fontSize: 15,
    border: "1px solid var(--paper-line)",
    borderRadius: 6,
    background: "var(--paper-light)",
  },
  resultRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid var(--paper-line)",
    color: "var(--text-primary)",
  },
};
