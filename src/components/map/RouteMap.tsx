import React, { useState, useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapPin from '@/assets/map-pin.svg';

// Define the university position
const universityPosition: [number, number] = [
  4.862452806129654, -74.03160975545464,
];

// Custom marker icon
const createCustomIcon = (number: number) => {
  return new L.Icon({
    iconUrl: mapPin,
    iconSize: [35, 51],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    html: `<div class="marker-icon">${number}</div>`,
  });
};

interface RouteMapProps {
  onRouteChange: (route: string[]) => Promise<void>;
}

const RouteMap: React.FC<RouteMapProps> = ({ onRouteChange }) => {
  const [markers, setMarkers] = useState<L.LatLng[]>([]);
  const [isStartAtUniversity, setIsStartAtUniversity] = useState<
    boolean | null
  >(null);
  const routeRef = useRef<L.Polyline | null>(null);
  const [isRouteSet, setIsRouteSet] = useState(false);

  useEffect(() => {
    if (markers.length >= 1) {
      const routeCoordinates = markers.map(
        (marker) => `${marker.lat},${marker.lng}`
      );
      if (isStartAtUniversity) {
        routeCoordinates.unshift(
          `${universityPosition[0]},${universityPosition[1]}`
        );
      } else {
        routeCoordinates.push(
          `${universityPosition[0]},${universityPosition[1]}`
        );
      }
      onRouteChange(routeCoordinates);
    }
  }, [markers]);

  const MapEvents = () => {
    const map = useMap();

    useMapEvents({
      click: (e) => handleMapClick(e, map),
    });

    return null;
  };

  const handleMapClick = (e: L.LeafletMouseEvent, map: L.Map) => {
    if (isStartAtUniversity === null) return;

    if (!isRouteSet) {
      const newMarker = new L.LatLng(e.latlng.lat, e.latlng.lng);
      setMarkers((prev) => [...prev, newMarker]);
      setIsRouteSet(true);

      const start = isStartAtUniversity
        ? L.latLng(universityPosition)
        : newMarker;
      const end = isStartAtUniversity
        ? newMarker
        : L.latLng(universityPosition);

      routeRef.current = L.polyline([start, end], { color: 'blue' }).addTo(map);
    } else {
      if (markers.length >= 6) return;

      const nearestPoint = routeRef.current?.closestLayerPoint(
        map.latLngToLayerPoint(e.latlng)
      );
      const isNearRoute =
        nearestPoint &&
        map.layerPointToLatLng(nearestPoint).distanceTo(e.latlng) <= 5000;

      if (isNearRoute) {
        const newMarker = new L.LatLng(e.latlng.lat, e.latlng.lng);
        setMarkers((prev) => {
          const newMarkers = [...prev];
          newMarkers.splice(-1, 0, newMarker);
          return newMarkers;
        });
      }
    }
  };

  const handleMarkerClick = (index: number) => {
    if (index === 0 || index === markers.length - 1) return;
    setMarkers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="h-[40vh] w-full lg:h-full lg:m">
      {isStartAtUniversity === null ? (
        <div className="h-full flex justify-center items-center bg-white p-4 rounded-lg shadow-md">
          <div>
            <h2 className="text-lg font-bold mb-2">Choose starting point:</h2>
            <button
              className="bg-emerald-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => setIsStartAtUniversity(true)}
            >
              Start at University
            </button>
            <button
              className="bg-emerald-500 text-white px-4 py-2 rounded"
              onClick={() => setIsStartAtUniversity(false)}
            >
              End at University
            </button>
          </div>
        </div>
      ) : (
        <MapContainer
          center={universityPosition}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapEvents />

          {isStartAtUniversity !== null && (
            <Marker
              position={universityPosition}
              icon={createCustomIcon(
                isStartAtUniversity ? 1 : markers.length + 2
              )}
            >
              <Popup>University</Popup>
            </Marker>
          )}
          {markers.map((position, index) => (
            <Marker
              key={`${position.lat},${position.lng}`}
              position={position}
              icon={createCustomIcon(
                isStartAtUniversity ? index + 2 : index + 1
              )}
              eventHandlers={{
                click: () => handleMarkerClick(index),
              }}
            >
              <Popup>
                {index === 0 && !isStartAtUniversity
                  ? 'Start'
                  : index === markers.length - 1 && isStartAtUniversity
                    ? 'End'
                    : `Waypoint ${index}`}
              </Popup>
            </Marker>
          ))}
          {markers.length > 1 && (
            <Polyline
              positions={
                isStartAtUniversity
                  ? [universityPosition, ...markers]
                  : [...markers, universityPosition]
              }
              color="blue"
            />
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default RouteMap;
