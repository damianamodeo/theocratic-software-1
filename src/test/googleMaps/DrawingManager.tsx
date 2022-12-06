import { DrawingManagerF } from '@react-google-maps/api';

export const DrawingManager = () => {
  const onPolygonComplete = (polygon: any) => {
    polygon.getPath().forEach((polygon: any, id: number) => {
      console.log(id, "lat=", polygon.toJSON().lat, "lng=", polygon.toJSON().lng);
    });
  };
  return (
    <DrawingManagerF
      // onLoad={onLoadManager}
      // onUnmount={onPolygonComplete}
      onPolygonComplete={onPolygonComplete}
      options={{
        polygonOptions: {
          fillColor: '#ff8888',
          fillOpacity: 0.1,
          strokeWeight: 2,
          clickable: true,
          editable: false,
          zIndex: 1,
        },
        drawingControlOptions: {
          drawingModes: [
            google.maps.drawing.OverlayType.POLYGON,
            // google.maps.drawing.OverlayType.MARKER,
          ],
        },
      }}
    />
  );
};
