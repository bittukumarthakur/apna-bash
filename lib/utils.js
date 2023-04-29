const fs = require("fs");

const readFile = function(path) {
  return fs.readFileSync(path, "utf-8");
};

const display = function(lines) { 
  console.log(lines.join("\n"));
};

exports.readFile = readFile;
exports.display = display;
