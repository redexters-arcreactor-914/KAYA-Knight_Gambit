// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api, saveSession } from "../api";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const data = await api.login(username, password);
//       saveSession(data);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.message === "Invalid username or password"
//         ? "That username or password isn't recognized."
//         : "Couldn't reach the server. Is the backend running on localhost:8000?");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div style={styles.page}>
//       <div style={styles.boardTexture} aria-hidden="true" />

//       <div style={styles.centerColumn}>
//         <div style={styles.brandBlock}>
//           <div style={styles.eyeMark}>
//             <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
//               <path d="M2 17C2 17 8 6 17 6C26 6 32 17 32 17C32 17 26 28 17 28C8 28 2 17 2 17Z"
//                 stroke="#a9793b" strokeWidth="1.6" />
//               <circle cx="17" cy="17" r="6" fill="#a9793b" />
//               <circle cx="17" cy="17" r="2" fill="#eae3d2" />
//             </svg>
//           </div>
//           <h1 style={styles.brandTitle}>NETRA</h1>
//           <p style={styles.brandSub}>Network Intelligence &amp; Threat Relationship Analysis</p>
//         </div>

//         <form onSubmit={handleSubmit} style={styles.card}>
//           <div style={styles.cardTab}>Restricted access</div>

//           <label style={styles.label} htmlFor="username">Officer ID</label>
//           <input
//             id="username"
//             style={styles.input}
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             autoComplete="username"
//             required
//           />

//           <label style={styles.label} htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             style={styles.input}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             autoComplete="current-password"
//             required
//           />

//           {error && <div style={styles.error}>{error}</div>}

//           <button type="submit" style={styles.submitBtn} disabled={loading}>
//             {loading ? "Verifying..." : "Enter case system"}
//           </button>
//         </form>

//         <p style={styles.footNote}>
//           Authorized personnel only. All access is logged.
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   page: {
//     minHeight: "100vh",
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "#c9a876",
//     overflow: "hidden",
//   },
//   boardTexture: {
//     position: "absolute",
//     inset: 0,
//     backgroundImage:
//       "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.06) 0, transparent 40%), " +
//       "radial-gradient(circle at 80% 70%, rgba(0,0,0,0.08) 0, transparent 45%), " +
//       "repeating-linear-gradient(115deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 2px, transparent 2px, transparent 4px)",
//   },
//   centerColumn: {
//     position: "relative",
//     zIndex: 1,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     width: "100%",
//     maxWidth: 380,
//     padding: "0 20px",
//   },
//   brandBlock: {
//     textAlign: "center",
//     marginBottom: 28,
//   },
//   eyeMark: { marginBottom: 8, display: "flex", justifyContent: "center" },
//   brandTitle: {
//     fontFamily: "'Source Serif 4', serif",
//     fontSize: 34,
//     letterSpacing: "0.08em",
//     color: "#1b2a38",
//     margin: "0 0 2px 0",
//   },
//   brandSub: {
//     fontFamily: "'IBM Plex Mono', monospace",
//     fontSize: 11.5,
//     color: "#4a3f2f",
//     letterSpacing: "0.02em",
//     margin: 0,
//   },
//   card: {
//     width: "100%",
//     background: "#f4efe3",
//     border: "1px solid #d8cfb8",
//     borderRadius: 6,
//     padding: "28px 28px 24px",
//     boxShadow: "0 8px 24px rgba(27,42,56,0.18)",
//     position: "relative",
//   },
//   cardTab: {
//     position: "absolute",
//     top: -14,
//     left: 24,
//     background: "#1b2a38",
//     color: "#eae3d2",
//     fontFamily: "'IBM Plex Mono', monospace",
//     fontSize: 10.5,
//     letterSpacing: "0.04em",
//     padding: "4px 10px",
//     borderRadius: 3,
//   },
//   label: {
//     display: "block",
//     fontSize: 12.5,
//     fontWeight: 500,
//     color: "#5b574c",
//     marginTop: 14,
//     marginBottom: 5,
//   },
//   input: {
//     width: "100%",
//     padding: "10px 12px",
//     border: "1px solid #d8cfb8",
//     borderRadius: 4,
//     background: "#fffdf8",
//     fontSize: 14,
//   },
//   submitBtn: {
//     width: "100%",
//     marginTop: 22,
//     padding: "11px 0",
//     background: "#1b2a38",
//     color: "#eae3d2",
//     border: "none",
//     borderRadius: 4,
//     fontSize: 14.5,
//     fontWeight: 500,
//   },
//   error: {
//     marginTop: 14,
//     fontSize: 13,
//     color: "#96323b",
//     background: "#f3e2e0",
//     padding: "8px 10px",
//     borderRadius: 4,
//   },
//   footNote: {
//     marginTop: 20,
//     fontSize: 12,
//     color: "#4a3f2f",
//     opacity: 0.75,
//   },
// };
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, saveSession } from "../api";

const TAGLINE = "Network Intelligence & Threat Relationship Analysis";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [typed, setTyped] = useState("");
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Typewriter reveal for the tagline
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(TAGLINE.slice(0, i));
      if (i >= TAGLINE.length) clearInterval(interval);
    }, 22);
    return () => clearInterval(interval);
  }, []);

  // Animated "living network" background — small drifting nodes with
  // connecting lines that fade in/out by distance. Pure canvas, no library,
  // kept subtle (low opacity, muted brand colors) so it doesn't fight the
  // login card for attention.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let w = 0, h = 0;
    let nodes = [];

    const NODE_COUNT = 32;
    const LINK_DIST = 140;
    const dotColors = ["#1b2a38", "#a9793b", "#8a4a4a"];

    function resize() {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    }

    function initNodes() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        color: dotColors[Math.floor(Math.random() * dotColors.length)],
      }));
    }

    function step() {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            ctx.strokeStyle = `rgba(150, 50, 59, ${0.14 * (1 - dist / LINK_DIST)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.globalAlpha = 0.45;
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(step);
    }

    resize();
    initNodes();
    step();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.login(username, password);
      saveSession(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message === "Invalid username or password"
        ? "That username or password isn't recognized."
        : "Couldn't reach the server. Is the backend running on localhost:8000?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes netra-sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes netra-pupil-breathe { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
        @keyframes netra-blink { 50% { opacity: 0; } }
        .netra-eye-sweep { transform-origin: 17px 17px; animation: netra-sweep 3.2s linear infinite; }
        .netra-pupil-pulse { animation: netra-pupil-breathe 2.4s ease-in-out infinite; transform-origin: 17px 17px; }
        .netra-cursor { animation: netra-blink 1s step-start infinite; }
      `}</style>

      <canvas ref={canvasRef} style={styles.networkCanvas} aria-hidden="true" />
      <div style={styles.boardTexture} aria-hidden="true" />

      <div style={styles.centerColumn}>
        <div style={styles.brandBlock}>
          <div style={styles.eyeMark}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path d="M2 17C2 17 8 6 17 6C26 6 32 17 32 17C32 17 26 28 17 28C8 28 2 17 2 17Z"
                stroke="#a9793b" strokeWidth="1.6" />
              <circle cx="17" cy="17" r="6" fill="#a9793b" className="netra-pupil-pulse" />
              <circle cx="17" cy="17" r="2" fill="#eae3d2" />
              <line x1="17" y1="17" x2="17" y2="8" stroke="#a9793b" strokeWidth="1"
                opacity="0.6" className="netra-eye-sweep" />
            </svg>
          </div>
          <h1 style={styles.brandTitle}>NETRA</h1>
          <p style={styles.brandSub}>
            {typed}
            <span className="netra-cursor">|</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.card}>
          <div style={styles.cardTab}>Restricted access</div>

          <label style={styles.label} htmlFor="username">Officer ID</label>
          <input
            id="username"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />

          <label style={styles.label} htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Verifying..." : "Enter case system"}
          </button>
        </form>

        <p style={styles.footNote}>
          Authorized personnel only. All access is logged.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#c9a876",
    overflow: "hidden",
  },
  networkCanvas: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  },
  boardTexture: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.06) 0, transparent 40%), " +
      "radial-gradient(circle at 80% 70%, rgba(0,0,0,0.08) 0, transparent 45%), " +
      "repeating-linear-gradient(115deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 2px, transparent 2px, transparent 4px)",
  },
  centerColumn: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: 380,
    padding: "0 20px",
  },
  brandBlock: {
    textAlign: "center",
    marginBottom: 28,
  },
  eyeMark: { marginBottom: 8, display: "flex", justifyContent: "center" },
  brandTitle: {
    fontFamily: "'Source Serif 4', serif",
    fontSize: 34,
    letterSpacing: "0.08em",
    color: "#1b2a38",
    margin: "0 0 2px 0",
  },
  brandSub: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11.5,
    color: "#4a3f2f",
    letterSpacing: "0.02em",
    margin: 0,
    minHeight: 16,
  },
  card: {
    width: "100%",
    background: "#f4efe3",
    border: "1px solid #d8cfb8",
    borderRadius: 6,
    padding: "28px 28px 24px",
    boxShadow: "0 8px 24px rgba(27,42,56,0.18)",
    position: "relative",
  },
  cardTab: {
    position: "absolute",
    top: -14,
    left: 24,
    background: "#1b2a38",
    color: "#eae3d2",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 10.5,
    letterSpacing: "0.04em",
    padding: "4px 10px",
    borderRadius: 3,
  },
  label: {
    display: "block",
    fontSize: 12.5,
    fontWeight: 500,
    color: "#5b574c",
    marginTop: 14,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #d8cfb8",
    borderRadius: 4,
    background: "#fffdf8",
    fontSize: 14,
  },
  submitBtn: {
    width: "100%",
    marginTop: 22,
    padding: "11px 0",
    background: "#1b2a38",
    color: "#eae3d2",
    border: "none",
    borderRadius: 4,
    fontSize: 14.5,
    fontWeight: 500,
  },
  error: {
    marginTop: 14,
    fontSize: 13,
    color: "#96323b",
    background: "#f3e2e0",
    padding: "8px 10px",
    borderRadius: 4,
  },
  footNote: {
    marginTop: 20,
    fontSize: 12,
    color: "#4a3f2f",
    opacity: 0.75,
  },
};
