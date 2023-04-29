const fs = require("fs");

const getPwd = function(environment) {
  return environment.pwd;
};

const cd = function(environment, path) {
  environment.pwd = environment.pwd + "/" + path;
  return environment.pwd;
};

const ls = function(environment) {
  return fs.readdirSync(environment.pwd).join(" ");
};

const loadFile = function(path) {
  return fs.readFileSync(path, "utf-8");
};

const loadLines = function(script) {
  return script.trim().split("\n");
};

const executeCommand = function(environment, line) {
  const commands = {"pwd": getPwd, "ls": ls, "cd": cd}; 
  const [command, argument] = line.split(" ");

  return commands[command](environment, argument); 
};

const display = function(lines) { 
  console.log(lines.join("\n"));
};

const main = function() {
  const pwd = process.env.PWD; 
  const filePath = process.argv[2];
  const script = loadFile(filePath);
  const lines = loadLines(script);

  const context = lines.reduce( function(environment, line) {  
    environment.output.push(executeCommand(environment, line));

    return environment;
  }, {"pwd": pwd, "output": []});

  display(context.output);
};

main();
