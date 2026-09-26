import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { api } from "../api";

const DEFAULT_COLOR = "#a8a196";

// Colored circle marker instead of Leaflet's default pin — avoids the
// classic broken-icon-path issue with bundlers, and lets us match the
// same cluster colors used on the dot-graph.
function makeIcon(color) {
  return L.divIcon({
    className: "",
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid #f4efe3;box-shadow:0 0 3px rgba(27,42,56,0.5);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -8],
  });
}

export default function SuspectMap() {
  const [data, setData] = useState({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMapData().then(setData).finally(() => setLoading(false));
  }, []);

  const byId = Object.fromEntries(data.nodes.map((n) => [n.id, n]));

  return (
    <div className="panel" style={{ marginTop: 20, padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "18px 20px 4px" }}>
        <h3 style={{ marginBottom: 4 }}>Suspect locations</h3>
        <p style={{ fontSize: 12.5, color: "var(--text-muted)", margin: 0 }}>
          Same network, plotted by known city/country. A suspect with no
          location on file yet won't have a pin — add one via "Edit details"
          on their profile.
        </p>
      </div>

      {loading && <p style={{ padding: "0 20px 20px", color: "var(--text-muted)" }}>Loading map...</p>}

      {!loading && (
        <MapContainer
          center={[28, 68]}
          zoom={4}
          scrollWheelZoom={true}
          style={{ height: 480, width: "100%", marginTop: 12 }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {data.edges.map((e, i) => {
            const a = byId[e.source];
            const b = byId[e.target];
            if (!a || !b) return null;
            return (
              <Polyline
                key={i}
                positions={[[a.lat, a.lng], [b.lat, b.lng]]}
                pathOptions={{ color: "#96323b", weight: 1, opacity: 0.35 }}
              />
            );
          })}

          {data.nodes.map((n) => (
            <Marker key={n.id} position={[n.lat, n.lng]} icon={makeIcon(n.cluster_color || DEFAULT_COLOR)}>
              <Popup>
                <strong>{n.name}</strong>
                <br />
                {n.base_location || n.country_base}
                <br />
                <Link to={`/suspect/${n.id}`}>View profile</Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import { Link } from "react-router-dom";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { api } from "../api";

// const DEFAULT_COLOR = "#a8a196";

// // Colored circle marker instead of Leaflet's default pin — avoids the
// // classic broken-icon-path issue with bundlers, and lets us match the
// // same cluster colors used on the dot-graph.
// function makeIcon(color) {
//   return L.divIcon({
//     className: "",
//     html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid #f4efe3;box-shadow:0 0 3px rgba(27,42,56,0.5);"></div>`,
//     iconSize: [14, 14],
//     iconAnchor: [7, 7],
//     popupAnchor: [0, -8],
//   });
// }

// export default function SuspectMap() {
//   const [data, setData] = useState({ nodes: [], edges: [] });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.getMapData().then(setData).finally(() => setLoading(false));
//   }, []);

//   const byId = Object.fromEntries(data.nodes.map((n) => [n.id, n]));

//   return (
//     <div className="panel" style={{ marginTop: 20, padding: 0, overflow: "hidden" }}>
//       <div style={{ padding: "18px 20px 4px" }}>
//         <h3 style={{ marginBottom: 4 }}>Suspect locations</h3>
//         <p style={{ fontSize: 12.5, color: "var(--text-muted)", margin: 0 }}>
//           Same network, plotted by known city/country. A suspect with no
//           location on file yet won't have a pin — add one via "Edit details"
//           on their profile.
//         </p>
//       </div>

//       {loading && <p style={{ padding: "0 20px 20px", color: "var(--text-muted)" }}>Loading map...</p>}

//       {!loading && (
//         <MapContainer
//           center={[28, 68]}
//           zoom={4}
//           scrollWheelZoom={true}
//           style={{ height: 480, width: "100%", marginTop: 12 }}
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
//             url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
//           />

//           {data.edges.map((e, i) => {
//             const a = byId[e.source];
//             const b = byId[e.target];
//             if (!a || !b) return null;
//             return (
//               <Polyline
//                 key={i}
//                 positions={[[a.lat, a.lng], [b.lat, b.lng]]}
//                 pathOptions={{ color: "#c9767d", weight: 1.2, opacity: 0.55 }}
//               />
//             );
//           })}

//           {data.nodes.map((n) => (
//             <Marker key={n.id} position={[n.lat, n.lng]} icon={makeIcon(n.cluster_color || DEFAULT_COLOR)}>
//               <Popup>
//                 <strong>{n.name}</strong>
//                 <br />
//                 {n.base_location || n.country_base}
//                 <br />
//                 <Link to={`/suspect/${n.id}`}>View profile</Link>
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       )}
//     </div>
//   );
// }
