const fs = require("fs");

const pwd = function(environment) {
  return {...environment, output: environment.pwd};
};

const expandSegment = function(currentPathSegments, segment) {
  const home = process.env.HOME;

  switch(segment) {
    case "~": return home.split("/");
    case ".": return currentPathSegments;
    case "..": return currentPathSegments.slice(0, -1); 
    default: return [...currentPathSegments, segment]; 
  };
};

const resolvePath = function(environment, path) {
  const currentPathSegments = environment.pwd.split("/");
  const pathSegments = path.split("/");

  return pathSegments.reduce(expandSegment, currentPathSegments).join("/"); 
};

const cd = function(environment, path) {
  const pwd = resolvePath(environment, path);
  return {...environment, pwd, output: ""};
};

const ls = function(environment) {
  const {pwd} = environment;
  const list = fs.readdirSync(pwd).join(" ");
  return {...environment, output: list};
};

exports.pwd = pwd;
exports.cd = cd;
exports.ls = ls;
