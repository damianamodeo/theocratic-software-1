import {
  useLoadScript,
  GoogleMap,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useMemo, useContext, useCallback, useRef } from "react";
import {
  PageContext,
  AddressContext,
} from "../../../../../services/context/notAtHomesContext";

const libraries = ["places"]

export const CallBackMap = ({ addresses }) => {
  const { address, setAddress } = useContext(AddressContext);
  const { page, setPage } = useContext(PageContext);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    // libraries,
  });
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: -32.74, lng: 151.59 }), []);
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
      <div className="w-full h-full">
        <GoogleMap
          zoom={11}
          center={center}
          mapContainerClassName="h-full w-full"
          options={options}
          onLoad={onLoad}
        >
          <MarkerClusterer
            gridSize={60}
            averageCenter={true}
            zoomOnClick={true}
            // maxZoom={null}
            // onClick={(cluster) => {
            //   console.log(cluster.getMarkers());
            // }}
          >
            {(clusterer) =>
              Object.keys(addresses)
                .filter((id) => {
                  const address = addresses[id];
                  if (id === "cong" || id === "id" || address.letter) {
                    return false;
                  }
                  return true;
                })
                .map(
                  (id) =>
                    addresses[id].lat && (
                      <Marker
                        key={addresses[id].lat + addresses[id].unitNumber}
                        label={`${
                          addresses[id].unitNumber
                            ? `${addresses[id].unitNumber}/`
                            : ""
                        }${addresses[id].houseNumber}`}
                        position={{
                          lat:
                            addresses[id].lat +
                            (isNaN(addresses[id].unitNumber)
                              ? 0
                              : (addresses[id].unitNumber - 5) * 0.00001),
                          lng:
                            addresses[id].lng +
                            (isNaN(addresses[id].unitNumber)
                              ? 0
                              : ((addresses[id].unitNumber % 7) - 2) * 0.00003),
                        }}
                        clusterer={clusterer}
                        onClick={() => {
                          setAddress(id);
                          setPage("CallBackForm");
                        }}
                      />
                    )
                )
            }
          </MarkerClusterer>
        </GoogleMap>
      </div>
  );
};
