const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicGFyZXNoMTczNCIsImEiOiJjbGtxaDZ2em4wMGloM2VsanpnNnlsMjNyIn0.eJ2Yc71TlgtREcR77D8O7A&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    console.log(error, body);
    if (error) {
      callback("Unable to connect to the location services.", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location in the map.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
