var http = require("http");

var server = http.createServer(function (req, res) {
  console.log(`Request was made: ${req.url}`);
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Hello World\n");
});

server.listen(3000, "127.0.0.1");
console.log("Server running at port http://localhost:3000/");
