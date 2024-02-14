import { useRef, useState } from 'react';
import { LeafletMouseEvent } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import axios from 'axios';

import "leaflet/dist/leaflet.css";
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;



const handleMapClick = async (e: LeafletMouseEvent) => {

  const { lat, lng } = e.latlng;

  try {
    const response = await axios.get(`http://localhost:8000/max_wave_height?latitude=${lat}&longitude=${lng}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wave data:', error);
  }
};

function DraggableMarker() {
  const [position, setPosition] = useState({ lat: 50.3243, lng: 6.9438});
  const [maxWaveHeight, setMaxWaveHeight] = useState(null);
  

  const markerRef = useRef(null)


  useMapEvents({
    click: async (e) => {
      const res = await handleMapClick(e);
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng});
      console.log(res, 'res');
      setMaxWaveHeight(res?.max_wave_height);
    }
  });

  return (
    <Marker
      position={position}
      ref={markerRef}
      >
      <Popup minWidth={90}>
        {maxWaveHeight ? `Max wave height: ${maxWaveHeight} meters` : 'Click on the water area in the map to get max wave height information'}
      </Popup>
    </Marker>
  )
}




export const AnimateMap = () => {
  const mapRef = useRef(null);
  const latitude = 57.505;
  const longitude = 14.09;

  return ( 

      <MapContainer center={[latitude, longitude]} zoom={6} ref={mapRef} style={{height: "100vh", width: "100vw"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
         <DraggableMarker  />
      </MapContainer>
  );
};

