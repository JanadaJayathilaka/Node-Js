const fs = require("fs");
const http = require("http");

const html = fs.readFileSync("./index.html", "utf-8");
let products = JSON.parse(fs.readFileSync("./Data/products.json", "utf-8"));
let productListHtml = fs.readFileSync("./Template/product-List.html", "utf-8");

let productHtmlArray = products.map((prod) => {
  let output = productListHtml.replace("{{%MODELNAME%}}", prod.name);
  output = output.replace("{{%PRICE%}}", prod.price);
  output = output.replace("{{%IMAGE%}}", prod.image);
  output = output.replace("{{%MODELNUMBER%}}", prod.id);
  output = output.replace("{{%SIZE%}}", prod.size);
  output = output.replace("{{%CAMERA%}}", prod.camera);
  output = output.replace("{{%COLOR%}}", prod.color);
  return output;
});

const server = http.createServer((request, response) => {
  let path = request.url;

  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    response.writeHead(200, {
      "content-type": "text/html",
      "my-header": "my-hello world",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in Home page"));
  } else if (path.toLocaleLowerCase() === "/about") {
    response.writeHead(200);
    response.end(html.replace("{{%CONTENT%}}", "You are in About page"));
  } else if (path.toLocaleLowerCase() === "/products") {
    response.writeHead(200, {
      "content-type": "text/html",
      "my-header": "my-hello world",
    });
    console.log(productHtmlArray);
    response.end(html.replace("{{%CONTENT%}}", productHtmlArray));
  } else {
    response.writeHead(404);
    response.end(html.replace("{{%CONTENT%}}", "Page not found"));
  }
});

server.listen(4000, "127.0.0.1", () => {
  console.log("Server is running on http://127.0.0.1:4000");
});
