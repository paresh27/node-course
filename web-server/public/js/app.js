// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
var messageOne = document.querySelector("#message-1");
var messageTwo = document.querySelector("#message-2");
const baseURL = "https://maheshwari-weather-app.onrender.com//weather?address=";
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  getWeatherForecast(baseURL + location);
});

const getWeatherForecast = (url) => {
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
};
