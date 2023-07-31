const geocode = require("./utils/geocode");
// const url =
//   "http://api.weatherstack.com/current?access_key=9e82707545e486aa7ee2e6ed4f2a9f8e&query=23.0225,72.5714&units=m";

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to the weather service.");
//   } else if (response.body.error) {
//     console.log("Unable to find the location.");
//   } else {
//     console.log(
//       `${response.body.current.weather_descriptions[0]}. It is currently ${
//         response.body.current.temperature
//       } degrees out. There is ${
//         response.body.current.precip * 100
//       }% chance of rain.`
//     );
//   }
// });

geocode("ahmedabad", (error, data) => {
  console.log("error", error);
  console.log("data", data);
});
