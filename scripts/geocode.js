const request = require("request");

const geoCode = (address, callback) => {
  const geoURI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmFuaml0aHRob3RhIiwiYSI6ImNsYnhueGdoeTE5Njkzbm55bTM5M2ZrOHkifQ.e2VLPEAsHyCbqNv_ybrNbQ`;
  let message;
  request({ url: geoURI, json: true }, (error, response) => {
    if (error) {
      message = "Unable to connect to MapBox";
      callback(message, undefined);
      return;
    } else if (response.body.features.length === 0) {
      message = "Unable to find the location";
      callback(message, undefined);
      return;
    } else {
      const long = response.body.features[0].center[0];
      const lat = response.body.features[0].center[1];
      const data = { long, lat };
      message = "Here is long and lat";
      callback(message, data);
    }
  });
};

module.exports = geoCode;
