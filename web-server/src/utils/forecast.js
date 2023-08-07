const request = require("postman-request");
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=9e82707545e486aa7ee2e6ed4f2a9f8e&query=${
    (latitude, longitude)
  }&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service.", undefined);
    } else if (body.error) {
      callback("Unable to find the location.", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike}% out. There is ${body.current.precip}% chance of rain. The humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
