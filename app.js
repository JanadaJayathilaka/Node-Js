var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  console.log("Request was made: " + req.url);
  res.render("partials/index");
});

app.get("/contact", function (req, res) {
  console.log("Request was made: " + req.url);
  res.render("partials/contact");
});

app.get("/profile/:name", function (req, res) {
  var data = { age: 29, job: "ninja" };
  res.render("profile", {
    person: req.params.name,
    data: data,
    hobbies: ["eating", "sleeping", "coding"],
  });
});

app.listen(3000, function () {
  console.log("Server is running on http://localhost:3000");
});
