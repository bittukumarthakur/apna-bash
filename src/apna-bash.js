// node apna-bash.js script.ab
// ls - least files/directory
const fs = require("fs");

const pwd = function() {
  return process.env.PWD;
};

const main = function() {
  const fileName = process.argv[2];

  const command = fs.readFileSync("./src/command.ab", "utf-8");
};





console.log(main());
