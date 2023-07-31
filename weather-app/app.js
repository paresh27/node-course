const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const yargs = require("yargs");

yargs.command({
  command: "forecast",
  describe: "Get the weather forecast for provided location.",
  builder: {
    location: {
      describe: "Location name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    getWeatherForecast(argv.location);
  },
});

const getWeatherForecast = (location) => {
  geocode(location, (error, data) => {
    if (error) {
      return console.log(error);
    }
    forecast(data.latitude, data.longitude, (error, response) => {
      if (error) {
        return console.log(error);
      }
      console.log(
        `${response.description} in ${data.location}. It is currently ${response.temperature} degrees out. There is ${response.rain}% chance of rain.`
      );
    });
  });
};
yargs.parse();
