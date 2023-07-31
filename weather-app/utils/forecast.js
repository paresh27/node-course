const request = require("postman-request");
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=9e82707545e486aa7ee2e6ed4f2a9f8e&query=${
    (latitude, longitude)
  }&units=m`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the weather service.", undefined);
    } else if (response.body.error) {
      callback("Unable to find the location.", undefined);
    } else {
      callback(undefined, {
        description: response.body.current.weather_descriptions[0],
        temperature: response.body.current.temperature,
        rain: response.body.current.precip * 100,
      });
    }
  });
};

module.exports = forecast;
