var express = require("express");
var bodyParser = require("body-parser");
var todoController = require("./controllers/todoController");
var app = express();

//set up template engine
app.set("view engine", "ejs");

//static files
app.use(express.static("./public"));

//fire controllers
todoController(app);

//listen to port
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
