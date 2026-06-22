import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";

const riderPosition = [12.9716, 77.5946];
const customerPosition = [12.9616, 77.5846];

const route = [
  riderPosition,
  [12.968, 77.59],
  customerPosition
];

export default function LiveTrackingMap() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mt-10">

      <h2 className="text-3xl font-bold mb-6">
        Live Delivery Tracking 🗺️
      </h2>

      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={13}
        style={{
          height: "500px",
          width: "100%"
        }}
        className="rounded-2xl"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Rider Marker */}
        <Marker position={riderPosition}>
          <Popup>
            Delivery Partner 🚴
          </Popup>
        </Marker>

        {/* Customer Marker */}
        <Marker position={customerPosition}>
          <Popup>
            Customer Location 📍
          </Popup>
        </Marker>

        {/* Route */}
        <Polyline
          positions={route}
          pathOptions={{
            color: "purple",
            weight: 6
          }}
        />

      </MapContainer>
    </div>
  );
}