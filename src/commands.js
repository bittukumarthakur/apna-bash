const fs = require("fs");

const pwd = function(environment) {
  return {...environment, output: environment.pwd};
};

const expandPath = function(currentPathSegment, segment) {
  const home = process.env.HOME;

  switch(segment) {
    case "~": return home.split("/");
    case ".": return currentPathSegment;
    case "..": return currentPathSegment.slice(0, -1); 
    default: return [...currentPathSegment, segment]; 
  };
};

// pwdPathSegments
// pwdSegments
// pathSegments
const resolvePath = function(environment, path) {
  const currentPathSegment = environment.pwd.split("/");
  const pathSegment = path.split("/");

  return pathSegment.reduce(expandPath, currentPathSegment).join("/"); //review name - expandPath
};

const cd = function(environment, path) {
  const pwd = resolvePath(environment, path);
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
