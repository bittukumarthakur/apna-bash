const fs = require("fs");
const {ls, cd, pwd} = require("./commands.js")
const commands = {pwd, ls, cd}; 

const parse = function(script) {
  return script.trim().split("\n");
};

const execute = function(environment, line) {
  const outputStream = environment.outputStream;
  const [commandName, argument] = line.split(" ");
  const command = commands[commandName];

  const {pwd, output} = command(environment, argument);

  return {pwd, outputStream: outputStream.concat(output)};
};

const isNotEmpty = function(line) {
  return line !== "";
};

const bash = function(lines) {
  const environment = {pwd: process.env.PWD, outputStream: []};
  return lines.reduce(execute, environment).outputStream.filter(isNotEmpty);
};

exports.bash = bash;
exports.parse = parse;
