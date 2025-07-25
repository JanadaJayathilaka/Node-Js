const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { result } = require("lodash");
const { urlencoded } = require("body-parser");

//express app setup
const app = express();

//connect mongodb
const dbURI = "mongodb://127.0.0.1:27017/netninja";

mongoose.connect(dbURI).then(() => {
  app.listen(3000, () => {
    console.log("Connected to DB and listening on port 3000");
  });
});

//register view engine
app.set("view engine", "ejs");

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  // res.send("<h1>Home Page</h1>");
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About page" });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).render("404", { title: "Blog not found" });
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Page" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "error page" });
});
