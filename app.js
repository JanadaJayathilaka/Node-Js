const fs = require("fs");

const http = require("http");
const html = fs.readFileSync("./index.html", "utf-8");
const server = http.createServer((request, response) => {
  let path = request.url;
  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    response.end(html.replace("{{%CONTENT%}}", "You are in Home page"));
  } else if (path.toLocaleLowerCase() === "/about") {
    response.end(html.replace("{{%CONTENT%}}", "You are in About page"));
  } else {
    response.end(html.replace("{{%CONTENT%}}", "Page not found"));
  }
});

server.listen(4000, "127.0.0.1", () => {
  console.log("Server is running on http://127.0.0.1:4000");
});
