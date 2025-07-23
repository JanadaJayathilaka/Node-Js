const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

//express app setup
const app = express();

//connect mongodb
const dbURI = "mongodb://127.0.0.1:27017/netninja";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Connected to DB and listening on port 3000");
    });
  });

//register view engine
app.set("view engine", "ejs");

//middleware and static files
app.use(express.static("public"));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  // res.send("<h1>Home Page</h1>");
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home Page", blogs: blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About page" });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Page" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "error page" });
});
