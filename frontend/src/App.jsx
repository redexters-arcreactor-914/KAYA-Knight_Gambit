// import { Routes, Route, Navigate } from "react-router-dom";
// import { getSession } from "./api";

// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import CriminalReports from "./pages/CriminalReports";
// import SuspectProfile from "./pages/SuspectProfile";
// import GraphAnalytics from "./pages/GraphAnalytics";
// import Alerts from "./pages/Alerts";
// import Search from "./pages/Search";
// import About from "./pages/About";

// function RequireAuth({ children }) {
//   const session = getSession();
//   if (!session) return <Navigate to="/" replace />;
//   return children;
// }

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
//       <Route path="/reports" element={<RequireAuth><CriminalReports /></RequireAuth>} />
//       <Route path="/suspect/:id" element={<RequireAuth><SuspectProfile /></RequireAuth>} />
//       <Route path="/graph" element={<RequireAuth><GraphAnalytics /></RequireAuth>} />
//       <Route path="/alerts" element={<RequireAuth><Alerts /></RequireAuth>} />
//       <Route path="/search" element={<RequireAuth><Search /></RequireAuth>} />
//       <Route path="/about" element={<RequireAuth><About /></RequireAuth>} />
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }
import { Routes, Route, Navigate } from "react-router-dom";
import { getSession } from "./api";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CriminalReports from "./pages/CriminalReports";
import SuspectProfile from "./pages/SuspectProfile";
import GraphAnalytics from "./pages/GraphAnalytics";
import Alerts from "./pages/Alerts";
import Search from "./pages/Search";
import About from "./pages/About";
import AuditLog from "./pages/AuditLog";

function RequireAuth({ children }) {
  const session = getSession();
  if (!session) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/reports" element={<RequireAuth><CriminalReports /></RequireAuth>} />
      <Route path="/suspect/:id" element={<RequireAuth><SuspectProfile /></RequireAuth>} />
      <Route path="/graph" element={<RequireAuth><GraphAnalytics /></RequireAuth>} />
      <Route path="/alerts" element={<RequireAuth><Alerts /></RequireAuth>} />
      <Route path="/search" element={<RequireAuth><Search /></RequireAuth>} />
      <Route path="/about" element={<RequireAuth><About /></RequireAuth>} />
      <Route path="/audit" element={<RequireAuth><AuditLog /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
