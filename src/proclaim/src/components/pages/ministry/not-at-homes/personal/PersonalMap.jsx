import { useState, useMemo, useCallback, useRef } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";

const libraries = ["places"]

export const PersonalMap = ({ position }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    // libraries,
  });

  const mapRef = useRef();
  // const center = useMemo<LatLngLiteral>(
  const center = useMemo(() => position, []);
  // const options = useMemo<MapOptions>(
  const options = useMemo(
    () => ({
      mapId: "3472b06d9b651a3f",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap
      zoom={18}
      center={position}
      mapContainerClassName="h-full w-full"
      options={options}
      onLoad={onLoad}
    >
      <Marker
        position={position}
        // onClick={() => {
        //   console.log("Clicked=", {
        //     lat: addresses[id].lat,
        //     lng: addresses[id].lng,
        //   });
        // }}
      />
    </GoogleMap>
  );
};
