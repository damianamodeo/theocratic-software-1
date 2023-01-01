export const getCoordinates = async ({
  houseNumber,
  street,
  suburb,
  state,
}) => {
  const searchAddress = `${houseNumber},+${street.trim()},+${suburb.trim()},${state}`;
  return await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${searchAddress.replace(
      / /g,
      "+"
    )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      return {
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
      };
    });
};
