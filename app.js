const fs = require("fs");
const express = require("express");
const path = require("path");
const hbs = require("hbs");

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

app.get("*", (req, res) => {
  res.render("about.hbs", {
    header: "404 : Page Not Found",
    name: "Ranjith",
  });
});

app.listen(3000, () => {
  console.log("server is running");
});
