import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
// import Places from "./Places";
import Distance from "./Distance";

// type LatLngLiteral = google.maps.LatLngLiteral;
// type DirectionsResult = google.maps.DirectionsResult;
// type MapOptions = google.maps.MapOptions;

export default function Map({ addresses }) {
  // const [office, setOffice] = useState<LatLngLiteral>();
  // const [directions, setDirections] = useState<DirectionsResult>();
  // const mapRef = useRef<GoogleMap>();
  const mapRef = useRef();
  // const center = useMemo<LatLngLiteral>(
  const center = useMemo(() => ({ lat: -32.71, lng: 151.59 }), []);
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

  return (
    <div className="flex h-screen">
      <div className="w-full h-full">
        <GoogleMap
          zoom={12}
          center={center}
          mapContainerClassName="h-full w-full"
          options={options}
          onLoad={onLoad}
        >
          <MarkerClusterer>
            {(clusterer) =>
              Object.keys(addresses)
                .filter((id) => {
                  const address = addresses[id];
                  if (id === "cong" || id === "id" || address.letter) {
                    return false;
                  }
                  return true;
                })
                .map((id) => (
                  <Marker
                    key={addresses[id].lat}
                    position={{
                      lat: addresses[id].lat,
                      lng: addresses[id].lng,
                    }}
                    clusterer={clusterer}
                    onClick={() => {
                      console.log("Clicked=", {
                        lat: addresses[id].lat,
                        lng: addresses[id].lng,
                      });
                    }}
                  />
                ))
            }
          </MarkerClusterer>
        </GoogleMap>
      </div>
    </div>
  );
}
