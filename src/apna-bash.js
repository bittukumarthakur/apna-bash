const fs = require("fs");

const getPwd = function() {
  return pwd;
};

let pwd = process.env.PWD; // global pwd;

const cd = function(path) {
  pwd = pwd + "/" + path;
}

const ls = function() {
  return fs.readdirSync(pwd).join(" ");
};

const loadFile = function(path) {
  return fs.readFileSync(path, "utf-8");
};

const loadCommand = function(script) {
  return script.trim().split("\n");
}

const executeCommand = function(commandAndArgument) {
  const commands = {"pwd": getPwd, "ls": ls, "cd": cd}; 
  const [command, argument] = commandAndArgument.split(" ");
  return commands[command](argument); 
}

const display = function(lines) { 
  console.log(lines.join("\n"));
};

const main = function() {
  const filePath = process.argv[2];
  const script = loadFile(filePath);
  const commands = loadCommand(script);

  display(commands.map(executeCommand));
};

main();
