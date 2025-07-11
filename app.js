var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));
app.get("/", function (req, res) {
  console.log("Request was made: " + req.url);
  res.render("partials/index");
});

app.get("/contact", function (req, res) {
  res.render("partials/contact", { qs: req.query });
});

app.post("/contact", urlencodedParser, function (req, res) {
  console.log(req.body);
  res.render("partials/contact-success", { qs: req.body });
});

app.get("/profile/:name", function (req, res) {
  var data = { age: 29, job: "ninja" };
  res.render("partials/profile", {
    person: req.params.name,
    data: data,
    hobbies: ["eating", "sleeping", "coding"],
  });
});

app.listen(3000, function () {
  console.log("Server is running on http://localhost:3000");
});
