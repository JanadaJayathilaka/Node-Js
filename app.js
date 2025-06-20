const readLine = require("readline");
const fs = require("fs");

// const rl = readLine.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Please Enter name: ", (name) => {
//   console.log(`Hello ${name}`);
//   rl.close();
// });

// rl.on("close", () => {
//   console.log("Goodbye!");
//   process.exit(0);
// });

//reading and writing to a file
// let textIn = fs.readFileSync("./Files/input.txt", "utf-8");
// console.log(textIn);

// let content = `Data read from input.txt: ${textIn}. \nDate created ${new Date()}`;
// fs.writeFileSync("./Files/output.txt", content);

fs.readFile("./Files/start.txt", "utf-8", (error, data) => {
  console.log(data);
  fs.readFile(`./Files/${data}.txt`, "utf-8", (error2, data2) => {
    console.log(data2);
    fs.readFile("./Files/append.txt", "utf-8", (error3, data3) => {
      console.log(data3);
      fs.writeFile(
        "./Files/output.txt",
        `${data2}\n ${data3} \n Date created: ${new Date()}`,
        () => {
          console.log("File written successfully!");
        }
      );
    });
  });
});
console.log("reading file....");
