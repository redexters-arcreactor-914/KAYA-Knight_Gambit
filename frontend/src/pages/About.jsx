




// import Sidebar from "../components/Sidebar";

// export default function About() {
//   return (
//     <div className="app-shell">
//       <Sidebar />
//       <main className="main-content">
//         <div className="page-header">
//           <div className="kicker">TEAM KNIGHT GAMBIT</div>
//           <h1 style={{ fontSize: 30, letterSpacing: "0.04em" }}>KNIGHT_GAMBIT</h1>
//         </div>

//         <p style={{ maxWidth: 640, color: "var(--text-secondary)" }}>
//           NETRA (Network Intelligence &amp; Threat Relationship Analysis) was built for
//           this hackathon to help investigators surface hidden relationships across
//           fragmented crime data — call records, financial flows, FIRs, and surveillance
//           notes — using graph analytics and a small set of supporting ML models.
//         </p>

//         <div style={styles.teamGrid}>
//           <TeamCard name="Anshuman Bhartiya" role="Full name & role" />
//           <TeamCard name="Avneet Singh" role="Full name & role" />
//         </div>

//         <div className="panel" style={{ marginTop: 24, maxWidth: 480 }}>
//           <h3>Contact</h3>
//           <p style={{ fontSize: 13.5, margin: 0 }}>anshumanbhartiya19@gmail.com</p>
//           <p style={{ fontSize: 13.5, margin: 0 }}>avneet.com</p>
//         </div>
//       </main>
//     </div>
//   );
// }

// function TeamCard({ name, role }) {
//   return (
//     <div className="panel" style={{ textAlign: "center", width: 200 }}>
//       <div style={styles.photoPlaceholder}>Photo</div>
//       <h3 style={{ marginTop: 12, marginBottom: 2 }}>{name}</h3>
//       <p style={{ fontSize: 12.5, color: "var(--text-secondary)", margin: 0 }}>{role}</p>
//     </div>
//   );
// }

// const styles = {
//   teamGrid: { display: "flex", gap: 16, marginTop: 20 },
//   photoPlaceholder: {
//     width: "100%",
//     height: 140,
//     background: "var(--paper)",
//     border: "1px dashed var(--paper-line)",
//     borderRadius: 4,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "var(--text-muted)",
//     fontSize: 13,
//   },
// };

//part2
// import Sidebar from "../components/Sidebar";

// export default function About() {
//   return (
//     <div className="app-shell">
//       <Sidebar />
//       <main className="main-content">
//         <div className="page-header">
//           <div className="kicker">TEAM KNIGHT GAMBIT</div>
//           <h1 style={{ fontSize: 30, letterSpacing: "0.04em", fontWeight: 700 }}>
//             KNIGHT_GAMBIT
//           </h1>
//         </div>

//         <p style={{ maxWidth: 640, color: "var(--text-secondary)" }}>
//           NETRA (Network Intelligence &amp; Threat Relationship Analysis) was built for
//           this hackathon to help investigators surface hidden relationships across
//           fragmented crime data — call records, financial flows, FIRs, and surveillance
//           notes — using graph analytics and a small set of supporting ML models.
//         </p>

//         <div style={styles.teamList}>
//           <TeamCard
//             image="/team/founder.jpg"
//             name="Anshuman Bhartiya"
//             role="Backend + ML"
//             branch="Mining"
//             thought="When you feel like quitting, think why you started"
//           />
//           <TeamCard
//             image="/team/avneet.jpg"
//             name="Avneet Singh"
//             role="Frontend + Design"
//             branch="Metallurgy"
//             thought="Coming together is a beginning, staying together is progress, and working together is success"
//           />
//         </div>

//         <div className="panel" style={{ marginTop: 24, maxWidth: 480 }}>
//           <h3>Contact</h3>
//           <p style={{ fontSize: 13.5, margin: 0 }}>anshumanbhartiya19@gmail.com</p>
//           <p style={{ fontSize: 13.5, margin: 0 }}>avneet.com</p>
//         </div>
//       </main>
//     </div>
//   );
// }

// function TeamCard({ image, name, role, branch, thought }) {
//   return (
//     <div className="panel" style={styles.card}>
//       <div style={styles.photoWrap}>
//         <img src={image} alt={name} style={styles.photo} />
//       </div>
//       <div style={styles.info}>
//         <h3 style={{ margin: 0, fontSize: 19 }}>{name}</h3>
//         <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "var(--text-secondary)" }}>
//           {role}
//         </p>
//         <p style={{ margin: "2px 0 10px", fontSize: 12.5, color: "var(--text-muted)" }}>
//           {branch}
//         </p>
//         <p style={styles.thought}>“{thought}”</p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   teamList: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 16,
//     marginTop: 20,
//     maxWidth: 720,
//   },
//   card: {
//     display: "flex",
//     alignItems: "flex-start",
//     gap: 20,
//     padding: 20,
//   },
//   photoWrap: {
//     flexShrink: 0,
//     width: 160,
//     height: 160,
//     borderRadius: 6,
//     overflow: "hidden",
//     border: "1px solid var(--paper-line)",
//   },
//   photo: {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     display: "block",
//   },
//   info: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//   },
//   thought: {
//     fontStyle: "italic",
//     fontSize: 13.5,
//     color: "var(--text-secondary)",
//     margin: 0,
//     lineHeight: 1.5,
//   },
// };

import Sidebar from "../components/Sidebar";

export default function About() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <div className="kicker">ABOUT US</div>
          <h1 style={{ fontSize: 30, letterSpacing: "0.04em", fontWeight: 700, margin: "6px 0 0" }}>
            TEAM: KNIGHT_GAMBIT
          </h1>

          {/* <p style={{ color: "var(--text-secondary)", marginTop: 20 }}>
            NETRA (Network Intelligence &amp; Threat Relationship Analysis) was built for
            this hackathon to help investigators surface hidden relationships across
            fragmented crime data — call records, financial flows, FIRs, and surveillance
            notes — using graph analytics and a small set of supporting ML models.
          </p> */}
          <p style={{ color: "var(--text-secondary)", marginTop: 20 }}>
  <span
    style={{
      fontWeight: 800,
      background: "linear-gradient(180deg, #ff4d4d 0%, #4a0000 60%, #1a0000 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    NETRA
  </span>{" "}
  (Network Intelligence &amp; Threat Relationship Analysis) was built for
  this hackathon to help investigators surface hidden relationships across
  fragmented crime data — call records, financial flows, FIRs, and surveillance
  notes — using graph analytics and a small set of supporting ML models.
</p>
        </div>

        <div style={styles.teamList}>
          <TeamCard
            image="/team/founder.jpg"
            name="Anshuman Bhartiya"
            role="Backend + ML"
            branch="Mining"
            thought="When you feel like quitting, think why you started"
          />
          <TeamCard
            image="/team/avneet.jpg"
            name="Avneet Singh"
            role="Frontend + Design"
            branch="Metallurgy"
            thought="Coming together is a beginning, staying together is progress, and working together is success"
          />
        </div>

        <div className="panel" style={{ marginTop: 24, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          <h3>Contact</h3>
          <p style={{ fontSize: 13.5, margin: 0 }}>anshumanbhartiya19@gmail.com</p>
          <p style={{ fontSize: 13.5, margin: 0 }}>avneet.singh.met25@itbhu.ac.in</p>
        </div>
      </main>
    </div>
  );
}

function TeamCard({ image, name, role, branch, thought }) {
  return (
    <div className="panel" style={styles.card}>
      <div style={styles.photoWrap}>
        <img src={image} alt={name} style={styles.photo} />
      </div>
      <div style={styles.info}>
        <h3 style={{ margin: 0, fontSize: 19 }}>{name}</h3>
        <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "var(--text-secondary)" }}>
          {role}
        </p>
        <p style={{ margin: "2px 0 10px", fontSize: 12.5, color: "var(--text-muted)" }}>
          {branch}
        </p>
        <p style={styles.thought}>“{thought}”</p>
      </div>
    </div>
  );
}

const styles = {
  teamList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    marginTop: 28,
  },
  card: {
    display: "flex",
    alignItems: "flex-start",
    gap: 20,
    padding: 20,
    maxWidth: 720,
    width: "100%",
  },
  photoWrap: {
    flexShrink: 0,
    width: 160,
    height: 160,
    borderRadius: 6,
    overflow: "hidden",
    border: "1px solid var(--paper-line)",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  thought: {
    fontStyle: "italic",
    fontSize: 13.5,
    color: "var(--text-secondary)",
    margin: 0,
    lineHeight: 1.5,
  },
};