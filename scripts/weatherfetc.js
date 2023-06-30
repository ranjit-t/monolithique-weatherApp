const request = require("request");

const weatherData = (long, lat, callback) => {
  const weatherURI = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;
  request({ url: weatherURI, json: true }, (error, response) => {
    let resp;
    if (error) {
      // console.log("Unable to connect to weather services");
      resp = "Unable to connect to weather services";
      callback(resp, undefined);
    } else if (response.body.error) {
      // console.log(
      //   "Unable to find the location, So can't fetch weather for given location"
      // );
      resp =
        "Unable to find the location, So can't fetch weather for given location";
      callback(resp, undefined);
    } else {
      // console.log(response.body.current_weather);
      const data = response.body.current_weather;
      resp = "Here is the weather";
      callback(resp, data);
    }
  });
};

// geoCode("Paris", (resp, data) => {
//   // console.log(resp, data);
//   weatherData(data.long, data.lat, (message, result) => {
//     console.log(message, result);
//   });
// });

module.exports = weatherData;
