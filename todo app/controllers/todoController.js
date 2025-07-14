var bodyParser = require("body-parser");

var data = [
  { item: "Get groceries" },
  { item: "Walk the dog" },
  { item: "Do laundry" },
];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get("/todo", function (req, res) {
    res.render("todo", { todos: data });
  });
  app.post("/todo", urlencodedParser, function (req, res) {
    if (req.body.item && req.body.item.trim() !== "") {
      data.push(req.body);
    }
    res.json(data);
  });

  app.delete("/todo/:item", function (req, res) {});
};
