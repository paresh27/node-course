const request = require("postman-request");

const url =
  "http://api.weatherstack.com/current?access_key=9e82707545e486aa7ee2e6ed4f2a9f8e&query=23.0225,72.5714&units=m";

request({ url: url, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to the weather service.");
  } else if (response.body.error) {
    console.log("Unable to find the location.");
  } else {
    console.log(
      `${response.body.current.weather_descriptions[0]}. It is currently ${
        response.body.current.temperature
      } degrees out. There is ${
        response.body.current.precip * 100
      }% chance of rain.`
    );
  }
});

const geocodeURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/x.json?access_token=pk.eyJ1IjoicGFyZXNoMTczNCIsImEiOiJjbGtxaDZ2em4wMGloM2VsanpnNnlsMjNyIn0.eJ2Yc71TlgtREcR77D8O7A&limit=1";

request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to the map service.");
  } else if (response.body.features.lenght === 0) {
    console.log("Unable to find the location in the map.");
  } else {
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];
    console.log(latitude, longitude);
  }
});
