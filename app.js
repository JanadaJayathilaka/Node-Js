var http = require("http");
var fs = require("fs");

var server = http.createServer(function (req, res) {
  console.log("request was made: " + req.url);
  res.writeHead(200, { "content-type": "text/html" });
  var myObj = {
    name: "John Doe",
    age: 30,
    occupation: "Software Developer",
  };
  res.end(JSON.stringify(myObj)); //we have to convert the object to a string before sending it
});

server.listen(3000, "127.0.0.1");
console.log("Server is listening on port 3000");
