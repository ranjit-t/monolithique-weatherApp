const request = require("request");

// const geoURI =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Puranipet.json?access_token=pk.eyJ1IjoicmFuaml0aHRob3RhIiwiYSI6ImNsYnhueGdoeTE5Njkzbm55bTM5M2ZrOHkifQ.e2VLPEAsHyCbqNv_ybrNbQ";

// request({ url: geoURI, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to MapBox");
//   } else if (response.body.features.length === 0) {
//     console.log("Unable to find the location");
//   } else {
//     const long = response.body.features[0].center[0];
//     const lat = response.body.features[0].center[1];
//     console.log("long =", long, "and lat =", lat);
//   }
// });

// const weatherURI =
//   "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true";

// request({ url: weatherURI, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect to weather services");
//   } else if (response.body.error) {
//     console.log(
//       "Unable to find the location, So can't fetch weather for given location"
//     );
//   } else {
//     console.log(response.body.current_weather);
//   }
// });

// // Callback concept

// const getData = (address, callback) => {
//   setTimeout(() => {
//     const data = {
//       long: 0,
//       lat: 0,
//     };
//     callback(data);
//   }, 2000);
// };

// getData("london", (longlat) => {
//   console.log(longlat);
// });

// const addSum = (num1, num2, callback) => {
//   setTimeout(() => {
//     const sum = num1 + num2;
//     callback(sum);
//   }, 2000);
// };

// addSum(4, 8, (sum) => {
//   console.log(sum);
// });

//Geocodes using Callback concept

const geoCode = (address, callback) => {
  const geoURI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmFuaml0aHRob3RhIiwiYSI6ImNsYnhueGdoeTE5Njkzbm55bTM5M2ZrOHkifQ.e2VLPEAsHyCbqNv_ybrNbQ`;
  let resp;
  request({ url: geoURI, json: true }, (error, response) => {
    if (error) {
      resp = "Unable to connect to MapBox";
      callback(resp, undefined);
      return;
    } else if (response.body.features.length === 0) {
      resp = "Unable to find the location";
      callback(resp, undefined);
      return;
    } else {
      const long = response.body.features[0].center[0];
      const lat = response.body.features[0].center[1];
      const data = { long, lat };
      resp = "Here is the data";
      callback(resp, data);
    }
    // callback(resp);
  });
};

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

geoCode("Paris", (resp, data) => {
  // console.log(resp, data);
  if (!data) {
    console.log(resp);
  } else {
    weatherData(data.long, data.lat, (message, result) => {
      if (!result) {
        console.log(message);
      } else {
        console.log(message, result);
      }
    });
  }
});

// console.log("weather is", x);
