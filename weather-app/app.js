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
  geocode(location, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return console.log(error);
    }
    forecast(
      latitude,
      longitude,
      (error, { description, temperature, rain } = {}) => {
        if (error) {
          return console.log(error);
        }
        console.log(
          `${description} in ${location}. It is currently ${temperature} degrees out. There is ${rain}% chance of rain.`
        );
      }
    );
  });
};
yargs.parse();
