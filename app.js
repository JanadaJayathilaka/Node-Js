const fs = require("fs");
const http = require("http");
const url = require("url");

const html = fs.readFileSync("./index.html", "utf-8");
let products = JSON.parse(fs.readFileSync("./Data/products.json", "utf-8"));
let productListHtml = fs.readFileSync("./Template/product-List.html", "utf-8");
let productDetailHtml = fs.readFileSync(
  "./Template/product-details.html",
  "utf-8"
);
function replaceHtml(template, product) {
  let output = template.replace("{{%MODELNAME%}}", product.name);
  output = output.replace("{{%PRICE%}}", product.price);
  output = output.replace("{{%IMAGE%}}", product.image);
  output = output.replace("{{%MODELNUMBER%}}", product.id);
  output = output.replace("{{%SIZE%}}", product.size);
  output = output.replace("{{%CAMERA%}}", product.camera);
  output = output.replace("{{%COLOR%}}", product.color);
  output = output.replace("{{%ID%}}", product.id);
  return output;
}

const server = http.createServer((request, response) => {
  let { query, pathname: path } = url.parse(request.url, true);
  // console.log(x);
  // let path = request.url;

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
    if (!query.id) {
      let productHtmlArray = products.map((prod) => {
        return replaceHtml(productListHtml, prod);
      });
      let productResponseHtml = html.replace(
        "{{%CONTENT%}}",
        productHtmlArray.join(",")
      );
      response.writeHead(200, {
        "content-type": "text/html",
        "my-header": "my-hello world",
      });
      response.end(productResponseHtml);
    } else {
      let prod = products[query.id];
      let productDetailsResponse = replaceHtml(productDetailHtml, prod);
      response.end(html.replace("{{%CONTENT%}}", productDetailsResponse));
    }
  } else {
    response.writeHead(404);
    response.end(html.replace("{{%CONTENT%}}", "Page not found"));
  }
});

server.listen(4000, "127.0.0.1", () => {
  console.log("Server is running on http://127.0.0.1:4000");
});
