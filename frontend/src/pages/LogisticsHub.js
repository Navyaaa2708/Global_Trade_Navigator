import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./LogisticsHub.css";
import truckIconImg from "../assets/truck.png";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Truck icon
const truckIcon = new L.Icon({
  iconUrl: truckIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Define multiple truck routes
const truckRoutes = [
  {
    id: "Truck 1",
    route: [
      { lat: 35.6762, lng: 139.6503, label: "Tokyo Warehouse" },
      { lat: 34.6937, lng: 135.5023, label: "Osaka Transit" },
      { lat: 36.2048, lng: 138.2529, label: "Nagano Distribution" },
      { lat: 35.6895, lng: 139.6917, label: "Tokyo Delivery" },
    ],
    color: "blue",
    segmentDuration: 120, // minutes per segment (example)
  },
  {
    id: "Truck 2",
    route: [
      { lat: 35.0116, lng: 135.7681, label: "Kyoto Warehouse" },
      { lat: 34.3853, lng: 132.4553, label: "Hiroshima Transit" },
      { lat: 33.5902, lng: 130.4017, label: "Fukuoka Distribution" },
      { lat: 34.6937, lng: 135.5023, label: "Osaka Delivery" },
    ],
    color: "green",
    segmentDuration: 150, // minutes per segment
  },
];

const LogisticsHub = () => {
  const [trucks, setTrucks] = useState(
    truckRoutes.map((truck) => ({
      id: truck.id,
      currentIndex: 0,
      position: truck.route[0],
      progress: 0,
      eta: truck.segmentDuration, // minutes to next point
    }))
  );

 useEffect(() => {
  const frames = [];

  trucks.forEach((truck, tIdx) => {
    const animateTruck = () => {
      const route = truckRoutes[tIdx].route;
      const segmentDuration = truckRoutes[tIdx].segmentDuration;
      let startIndex = truck.currentIndex;
      let nextIndex = (startIndex + 1) % route.length;
      let progress = truck.progress;

      const step = () => {
        progress += 0.005;
        if (progress >= 1) {
          startIndex = nextIndex;
          nextIndex = (startIndex + 1) % route.length;
          progress = 0;
        }

        const start = route[startIndex];
        const end = route[nextIndex];
        const lat = start.lat + (end.lat - start.lat) * progress;
        const lng = start.lng + (end.lng - start.lng) * progress;
        const remainingTime = segmentDuration * (1 - progress);

        setTrucks((prev) =>
          prev.map((t, idx) =>
            idx === tIdx
              ? {
                  ...t,
                  currentIndex: startIndex,
                  position: { lat, lng, label: end.label },
                  progress,
                  eta: Math.round(remainingTime),
                }
              : t
          )
        );

        frames[tIdx] = requestAnimationFrame(step);
      };
      step();
    };

    animateTruck();
  });

  return () => frames.forEach((frame) => cancelAnimationFrame(frame));

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  return (
    <div className="lh-container">
      <h2>Logistics & Product Tracking Hub</h2>
      <MapContainer center={[35.6762, 139.6503]} zoom={5} className="lh-map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Draw routes */}
        {truckRoutes.map((truck, idx) => (
          <Polyline
            key={idx}
            positions={truck.route.map((p) => [p.lat, p.lng])}
            color={truck.color}
            weight={4}
            dashArray="10"
          />
        ))}

        {/* Moving trucks */}
        {trucks.map((truck, idx) => (
          <React.Fragment key={truck.id}>
            <Marker position={[truck.position.lat, truck.position.lng]} icon={truckIcon}>
              <Tooltip>{truck.id} — ETA: {truck.eta} min</Tooltip>
            </Marker>

            {/* Animated progress line */}
            <Polyline
              positions={truckRoutes[idx].route
                .slice(0, truck.currentIndex + 1)
                .map((p) => [p.lat, p.lng])
                .concat([[truck.position.lat, truck.position.lng]])}
              color={truckRoutes[idx].color}
              weight={6}
              dashArray="10"
            />
          </React.Fragment>
        ))}

        {/* Static markers */}
        {truckRoutes.map((truck, tIdx) =>
          truck.route.map((point, idx) => (
            <Marker key={`${tIdx}-${idx}`} position={[point.lat, point.lng]}>
              <Tooltip>{point.label}</Tooltip>
            </Marker>
          ))
        )}
      </MapContainer>

      <div className="lh-info">
        <h3>Product Tracking Status</h3>
        {trucks.map((truck) => (
          <div key={truck.id}>
            <h4>{truck.id} — ETA to next point: {truck.eta} min</h4>
            <ul>
              {truckRoutes
                .find((t) => t.id === truck.id)
                .route.map((point, idx) => (
                  <li key={idx}>
                    {point.label} —{" "}
                    {idx < truck.currentIndex
                      ? "Arrived"
                      : idx === truck.currentIndex
                      ? "In Transit"
                      : "Pending"}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogisticsHub;
