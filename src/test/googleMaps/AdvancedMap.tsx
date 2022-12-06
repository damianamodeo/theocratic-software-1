import { DrawingManager } from '@test-googleMaps/DrawingManager';
import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import { useMemo, useCallback, useRef } from 'react';

const mapContainerStyle = {
  height: '600px',
  width: '1000px',
};

export const AdvancedMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["drawing"]
  });
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: -32.74, lng: 151.59 }), []);
  const options = useMemo(
    () => ({
      mapId: '3472b06d9b651a3f',
      disableDefaultUI: true,
      clickableIcons: true,
    }),
    []
  );
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap
      zoom={11}
      center={center}
      mapContainerStyle={mapContainerStyle}
      mapContainerClassName={``}
      mapTypeId={`ROADMAP`} // HYBRID SATELLITE TERRAIN
      clickableIcons={true}
      options={options}
      onLoad={onLoad}
    >
      <DrawingManager />
    </GoogleMap>
  );
};
