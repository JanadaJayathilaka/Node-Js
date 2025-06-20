const fs = require("fs");

const http = require("http");
const html = fs.readFileSync("./index.html", "utf-8");
const server = http.createServer((request, response) => {
  response.end(html);
  console.log("New request received from browser");
});

server.listen(4000, "127.0.0.1", () => {
  console.log("Server is running on http://127.0.0.1:4000");
});
