const {readFile, display} = require("../lib/utils.js");
const {bash, parse} = require("./apna-bash.js");

const main = function() {
  const script = readFile(process.argv[2]);
  const lines = parse(script);
  const output = bash(lines);

  display(output);
};

main();
