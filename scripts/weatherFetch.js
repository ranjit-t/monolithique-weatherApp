const request = require("request");

const geoURI =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Puranipet.json?access_token=pk.eyJ1IjoicmFuaml0aHRob3RhIiwiYSI6ImNsYnhueGdoeTE5Njkzbm55bTM5M2ZrOHkifQ.e2VLPEAsHyCbqNv_ybrNbQ";

request({ url: geoURI, json: true }, (error, response) => {
  if (error) {
    // console.log(error);
    console.log("Unable to connect to MapBox");
  } else if (response.body.features.length === 0) {
    console.log("Unable to find the location");
  } else {
    //   console.log(response.body.features[0].center);
    const long = response.body.features[0].center[0];
    const lat = response.body.features[0].center[1];
    console.log("long =", long, "and lat =", lat);
  }
});

const weatherURI =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true";

request({ url: weatherURI, json: true }, (error, response) => {
  if (error) {
    // console.log(error);
    console.log("Unable to connect to weather services");
  } else if (response.body.error) {
    console.log(
      "Unable to find the location, So can't fetch weather for given location"
    );
  } else {
    console.log(response.body.current_weather);
  }
});

// request({ url: url, json: true }, (error, response) => {
//   console.log(response.body.current_weather);
// });
