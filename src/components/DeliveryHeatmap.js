import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

const locations = [
  {
    city: "Bangalore",
    position: [12.9716, 77.5946],
    orders: 120
  },
  {
    city: "Hyderabad",
    position: [17.385, 78.4867],
    orders: 90
  },
  {
    city: "Chennai",
    position: [13.0827, 80.2707],
    orders: 70
  },
  {
    city: "Mumbai",
    position: [19.076, 72.8777],
    orders: 150
  }
];

export default function DeliveryHeatmap() {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Delivery Heatmap 🌍
      </h2>

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "500px", width: "100%" }}
        className="rounded-2xl"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location, index) => (
          <CircleMarker
            key={index}
            center={location.position}
            radius={location.orders / 10}
            pathOptions={{
              color: "purple",
              fillColor: "hotpink",
              fillOpacity: 0.5
            }}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{location.city}</h3>
                <p>{location.orders} active deliveries</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}