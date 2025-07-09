var http = require("http");
var fs = require("fs");

var server = http.createServer(function (req, res) {
  console.log("request was made: " + req.url);
  res.writeHead(200, { "content-type": "text/html" });
  var myReadStream = fs.createReadStream(__dirname + "/index.html", "utf8");
  var myWriteStream = fs.createWriteStream(__dirname + "/writeMe.txt");
  myReadStream.pipe(res);
});

server.listen(3000, "127.0.0.1");
console.log("Server is listening on port 3000");
