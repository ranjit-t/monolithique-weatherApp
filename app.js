const fs = require("fs");
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./scripts/geocode.js");
const weatherData = require("./scripts/weatherfetc.js");

const app = express();

const hbsDirViews = path.join(__dirname, "./templates/views");
const hbsDirPartials = path.join(__dirname, "./templates/partials");

app.set("view engine", "hbs");
app.set("views", hbsDirViews);
app.use(express.static("public"));

hbs.registerPartials(hbsDirPartials);

app.get("/", (req, res) => {
  res.render("index", {
    header: "Weather",
    name: "Ranjith",
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    header: "About",
    name: "Ranjith",
  });
});

app.get("/weather", (req, res) => {
  let city = req.query.city;
  console.log(city);

  geoCode(city, (resp, data) => {
    if (!data) {
      console.log(resp);
      res.render("404.hbs", {
        header: resp,
        name: "Ranjith",
      });
    } else {
      weatherData(data.long, data.lat, (message, result) => {
        if (!result) {
          console.log(message);
        } else {
          console.log(message, result);
          res.render("weather.hbs", {
            header: "Weather Report",
            city: city.slice(0, 1).toUpperCase() + city.slice(1),
            name: "Ranjith",
            report: result,
          });
        }
      });
    }
  });
});

app.get("*", (req, res) => {
  res.render("404.hbs", {
    header: "404 : Page Not Found",
    name: "Ranjith",
  });
});

app.listen(3000, () => {
  console.log("server is running");
});
