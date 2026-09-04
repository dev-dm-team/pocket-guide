// src/components/map/MapView.jsx
import { MapContainer, TileLayer } from "react-leaflet";

const MADAGASCAR_CENTER = [-18.8792, 47.5079]; // à ajuster selon la destination pilote choisie
const DEFAULT_ZOOM = 7;

export default function MapView({ children }) {
  return (
    <MapContainer
      center={MADAGASCAR_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
