import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import Button from "../components/Button";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMap,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeolocation";
import { useCities } from "../contexts/CitiesContext";
import useUrlPosition from "../hooks/useUrlPosition";
export default function Map() {
  //hooks
  const [lat, lng] = useUrlPosition();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const navigate = useNavigate();
  const {
    isLoading: isLoadingPostion,
    position: getLocationPosiion,
    getPosition,
  } = useGeolocation();
  //to sync map with changing urls we are using the useeffect hook
  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (getLocationPosiion) {
      setMapPosition([getLocationPosiion.lat, getLocationPosiion.lng]);
      console.log(getLocationPosiion);
    }
  }, [getLocationPosiion]);
  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPostion ? "..Loading" : "use Location"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
        <DetectClick />
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}
//creating a custom component to detect a click
const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
};
function ChangeCenter({ position }) {
  const map = useMap();
  if (position) map.setView(position);
  return null;
}
