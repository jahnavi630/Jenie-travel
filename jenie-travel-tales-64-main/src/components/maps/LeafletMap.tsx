
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import './LeafletMap.css';

// Fix for default marker icons in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom colored icons
const createColoredIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

interface RouteControlProps {
  start: [number, number];
  end: [number, number];
}

// Component to add routing control to the map
const RouteControl = ({ start, end }: RouteControlProps) => {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    if (!map || !start || !end) return;

    try {
      // Clean up previous routing control if it exists
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }

      // Create new routing control
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(start[0], start[1]),
          L.latLng(end[0], end[1])
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        showAlternatives: false,
        fitSelectedRoutes: true,
        lineOptions: {
          styles: [
            { color: '#6366F1', opacity: 0.8, weight: 6 }
          ]
        },
        createMarker: function(i, waypoint, n) {
          const marker = L.marker(waypoint.latLng, {
            icon: i === 0 ? createColoredIcon('#22c55e') : createColoredIcon('#ef4444')
          });
          return marker;
        }
      }).addTo(map);

      routingControlRef.current = routingControl;
      
      return () => {
        if (routingControlRef.current) {
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }
      };
    } catch (error) {
      console.error("Error creating routing control:", error);
    }
  }, [map, start, end]);

  return null;
};

interface LeafletMapProps {
  startPoint: {
    name: string;
    coordinates: [number, number];
  };
  endPoint: {
    name: string;
    coordinates: [number, number];
  };
  height?: string;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ 
  startPoint, 
  endPoint,
  height = "400px"
}) => {
  const [mapKey, setMapKey] = useState(Date.now()); // Used to force re-render

  // If coordinates change, force re-render of map
  useEffect(() => {
    setMapKey(Date.now());
  }, [startPoint.coordinates, endPoint.coordinates]);

  // Create the start and end icons
  const startIcon = createColoredIcon('#22c55e');
  const endIcon = createColoredIcon('#ef4444');

  return (
    <div className="leaflet-map-container" style={{ height }}>
      <MapContainer 
        key={mapKey}
        center={[(startPoint.coordinates[0] + endPoint.coordinates[0]) / 2,
                (startPoint.coordinates[1] + endPoint.coordinates[1]) / 2] as [number, number]}
        zoom={5} 
        style={{ height: "100%", width: "100%" }}
        className="leaflet-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker 
          position={startPoint.coordinates}
          icon={startIcon as unknown as L.Icon}
        >
          <Popup>
            <strong>Start:</strong> {startPoint.name}
          </Popup>
        </Marker>
        
        <Marker 
          position={endPoint.coordinates}
          icon={endIcon as unknown as L.Icon}
        >
          <Popup>
            <strong>Destination:</strong> {endPoint.name}
          </Popup>
        </Marker>
        
        <RouteControl 
          start={startPoint.coordinates}
          end={endPoint.coordinates}
        />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
