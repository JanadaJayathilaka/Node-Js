const express = require("express");

//express app setup
const app = express();

//listen for requests
app.listen(3000, () => {
  console.log("listening on port 3000");
});

app.get("/", (req, res) => {
  // res.send("<h1>Home Page</h1>");
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
