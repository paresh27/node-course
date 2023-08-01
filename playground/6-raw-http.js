const http = require("http");
const url = `http://api.weatherstack.com/current?access_key=9e82707545e486aa7ee2e6ed4f2a9f8e&query=23.0225,72.5714&units=m`;

const request = http.request(url, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data += chunk.toString();
  });
  response.on("end", () => {
    const responseBody = JSON.parse(data);
    console.log(responseBody);
  });
});

request.on("error", (error) => {
  console.log(error);
});

request.end();
