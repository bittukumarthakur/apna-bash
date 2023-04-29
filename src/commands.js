const fs = require("fs");

const pwd = function(environment) {
  return {...environment, output: environment.pwd};
};

const cd = function(environment, path) {
  const pwd = `${environment.pwd}/${path}`;
  return {...environment, pwd, output: pwd};
};

const ls = function(environment) {
  const {pwd} = environment;
  const list = fs.readdirSync(pwd).join(" ");
  return {...environment, output: list};
};

exports.pwd = pwd;
exports.cd = cd;
exports.ls = ls;
