import React, { useRef, useState } from "react";
import { LeafletMouseEvent } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import axios from "axios";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// hack to fix broken image paths in leaflet
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export interface Coordinates {
  lat: number;
  lng: number;
}

interface DraggableMarkerProps {
  initialPosition: Coordinates;
}

const handleMapClick = async (e: LeafletMouseEvent) => {
  const { lat, lng } = e.latlng;
  try {
    const response = await axios.get(
      `http://localhost:8000/max_wave_height?latitude=${lat}&longitude=${lng}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching wave data:", error);
  }
};

function DraggableMarker({ initialPosition }: DraggableMarkerProps) {
  const [position, setPosition] = useState<Coordinates>(initialPosition);
  const [maxWaveHeight, setMaxWaveHeight] = useState(null);
  let markerRef: React.RefObject<L.Marker> | null = React.useRef(null);

  useMapEvents({
    click: async (e) => {
      const res = await handleMapClick(e);
      setPosition(e.latlng);
      setMaxWaveHeight(res?.max_wave_height);

      if (markerRef != null) {
        markerRef.current?.openPopup();
      }
    },
  });

  return (
    <Marker position={position} ref={markerRef}>
      <Popup keepInView={true} autoPan={true} minWidth={90}>
        {maxWaveHeight
          ? `Max wave height: ${maxWaveHeight} meters`
          : "Click on the water area in the map to get max wave height information"}
      </Popup>
    </Marker>
  );
}

interface AnimateMapProps {
  initialMapCenter: Coordinates;
}

export const AnimateMap: React.FC<AnimateMapProps> = ({ initialMapCenter }) => {
  const mapRef = useRef(null);

  return (
    <MapContainer
      center={[initialMapCenter.lat, initialMapCenter.lng]}
      zoom={6}
      ref={mapRef}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker initialPosition={initialMapCenter} />
    </MapContainer>
  );
};
