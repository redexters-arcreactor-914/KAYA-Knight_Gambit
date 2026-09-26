// import { NavLink, useNavigate } from "react-router-dom";
// import { getSession, clearSession } from "../api";

// const NAV_ITEMS = [
//   { to: "/dashboard", label: "Dashboard" },
//   { to: "/reports", label: "Criminal reports" },
//   { to: "/graph", label: "Graph analytics" },
//   { to: "/alerts", label: "Alerts" },
//   { to: "/search", label: "Search" },
//   { to: "/about", label: "About" },
// ];

// export default function Sidebar() {
//   const session = getSession();
//   const navigate = useNavigate();

//   function handleLogout() {
//     clearSession();
//     navigate("/");
//   }

//   return (
//     <nav style={styles.sidebar}>
//       <div style={styles.brand}>
//         <div style={styles.brandMark}>
//           <svg width="20" height="20" viewBox="0 0 34 34" fill="none">
//             <path d="M2 17C2 17 8 6 17 6C26 6 32 17 32 17C32 17 26 28 17 28C8 28 2 17 2 17Z"
//               stroke="#a9793b" strokeWidth="2" />
//             <circle cx="17" cy="17" r="6" fill="#a9793b" />
//           </svg>
//         </div>
//         <div>
//           <div style={styles.brandTitle}>NETRA</div>
//           <div style={styles.brandSub}>Case system</div>
//         </div>
//       </div>

//       <div style={styles.navList}>
//         {NAV_ITEMS.map((item) => (
//           <NavLink
//             key={item.to}
//             to={item.to}
//             style={({ isActive }) => ({
//               ...styles.navItem,
//               ...(isActive ? styles.navItemActive : {}),
//             })}
//           >
//             {item.label}
//           </NavLink>
//         ))}
//       </div>

//       <div style={styles.footer}>
//         {session && (
//           <>
//             <div style={styles.officerName}>{session.fullName}</div>
//             <div style={styles.officerRole}>{formatRole(session.role)}</div>
//           </>
//         )}
//         <button style={styles.logoutBtn} onClick={handleLogout}>Sign out</button>
//       </div>
//     </nav>
//   );
// }

// function formatRole(role) {
//   const map = {
//     supervisor: "Case supervisor",
//     fir: "FIR desk officer",
//     financial: "Financial intelligence",
//     call_recording: "Call records officer",
//   };
//   return map[role] || role;
// }

// const styles = {
//   sidebar: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     bottom: 0,
//     width: 240,
//     background: "#1b2a38",
//     color: "#eae3d2",
//     display: "flex",
//     flexDirection: "column",
//     padding: "22px 0",
//   },
//   brand: {
//     display: "flex",
//     alignItems: "center",
//     gap: 10,
//     padding: "0 22px 20px",
//     marginBottom: 8,
//     borderBottom: "1px solid rgba(234,227,210,0.14)",
//   },
//   brandMark: { display: "flex" },
//   brandTitle: {
//     fontFamily: "'Source Serif 4', serif",
//     fontSize: 17,
//     letterSpacing: "0.05em",
//   },
//   brandSub: {
//     fontFamily: "'IBM Plex Mono', monospace",
//     fontSize: 10,
//     color: "#a9a290",
//   },
//   navList: {
//     display: "flex",
//     flexDirection: "column",
//     padding: "8px 12px",
//     gap: 2,
//     flex: 1,
//   },
//   navItem: {
//     display: "block",
//     padding: "9px 12px",
//     borderRadius: 4,
//     color: "#c9c2ae",
//     fontSize: 14,
//     fontWeight: 500,
//     textDecoration: "none",
//   },
//   navItemActive: {
//     background: "rgba(169,121,59,0.22)",
//     color: "#eae3d2",
//   },
//   footer: {
//     padding: "16px 22px 0",
//     borderTop: "1px solid rgba(234,227,210,0.14)",
//   },
//   officerName: { fontSize: 13.5, fontWeight: 500 },
//   officerRole: {
//     fontFamily: "'IBM Plex Mono', monospace",
//     fontSize: 11,
//     color: "#a9a290",
//     marginBottom: 12,
//   },
//   logoutBtn: {
//     width: "100%",
//     padding: "7px 0",
//     background: "transparent",
//     border: "1px solid rgba(234,227,210,0.25)",
//     color: "#eae3d2",
//     borderRadius: 4,
//     fontSize: 13,
//   },
// };
import { NavLink, useNavigate } from "react-router-dom";
import { getSession, clearSession } from "../api";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/reports", label: "Criminal reports" },
  { to: "/graph", label: "Graph analytics" },
  { to: "/alerts", label: "Alerts" },
  { to: "/search", label: "Search" },
  { to: "/about", label: "About" },
];

export default function Sidebar() {
  const session = getSession();
  const navigate = useNavigate();

  function handleLogout() {
    clearSession();
    navigate("/");
  }

  return (
    <nav style={styles.sidebar}>
      <div style={styles.brand}>
        <div style={styles.brandMark}>
          <svg width="20" height="20" viewBox="0 0 34 34" fill="none">
            <path d="M2 17C2 17 8 6 17 6C26 6 32 17 32 17C32 17 26 28 17 28C8 28 2 17 2 17Z"
              stroke="#a9793b" strokeWidth="2" />
            <circle cx="17" cy="17" r="6" fill="#a9793b" />
          </svg>
        </div>
        <div>
          <div style={styles.brandTitle}>NETRA</div>
          <div style={styles.brandSub}>Case system</div>
        </div>
      </div>

      <div style={styles.navList}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              ...styles.navItem,
              ...(isActive ? styles.navItemActive : {}),
            })}
          >
            {item.label}
          </NavLink>
        ))}
        {session?.role === "supervisor" && (
          <NavLink
            to="/audit"
            style={({ isActive }) => ({
              ...styles.navItem,
              ...(isActive ? styles.navItemActive : {}),
            })}
          >
            Audit log
          </NavLink>
        )}
      </div>

      <div style={styles.footer}>
        {session && (
          <>
            <div style={styles.officerName}>{session.fullName}</div>
            <div style={styles.officerRole}>{formatRole(session.role)}</div>
          </>
        )}
        <button style={styles.logoutBtn} onClick={handleLogout}>Sign out</button>
      </div>
    </nav>
  );
}

function formatRole(role) {
  const map = {
    supervisor: "Case supervisor",
    fir: "FIR desk officer",
    financial: "Financial intelligence",
    call_recording: "Call records officer",
  };
  return map[role] || role;
}

const styles = {
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    width: 240,
    background: "#1b2a38",
    color: "#eae3d2",
    display: "flex",
    flexDirection: "column",
    padding: "22px 0",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "0 22px 20px",
    marginBottom: 8,
    borderBottom: "1px solid rgba(234,227,210,0.14)",
  },
  brandMark: { display: "flex" },
  brandTitle: {
    fontFamily: "'Source Serif 4', serif",
    fontSize: 17,
    letterSpacing: "0.05em",
  },
  brandSub: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 10,
    color: "#a9a290",
  },
  navList: {
    display: "flex",
    flexDirection: "column",
    padding: "8px 12px",
    gap: 2,
    flex: 1,
  },
  navItem: {
    display: "block",
    padding: "9px 12px",
    borderRadius: 4,
    color: "#c9c2ae",
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
  },
  navItemActive: {
    background: "rgba(169,121,59,0.22)",
    color: "#eae3d2",
  },
  footer: {
    padding: "16px 22px 0",
    borderTop: "1px solid rgba(234,227,210,0.14)",
  },
  officerName: { fontSize: 13.5, fontWeight: 500 },
  officerRole: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11,
    color: "#a9a290",
    marginBottom: 12,
  },
  logoutBtn: {
    width: "100%",
    padding: "7px 0",
    background: "transparent",
    border: "1px solid rgba(234,227,210,0.25)",
    color: "#eae3d2",
    borderRadius: 4,
    fontSize: 13,
  },
};
