const request = require("postman-request");

const url =
  "http://api.weatherstack.com/current?access_key=9e82707545e486aa7ee2e6ed4f2a9f8e&query=23.0225,72.5714";

request({ url: url }, (error, response) => {
  const data = JSON.parse(response.body);
  console.log(data.current);
});
