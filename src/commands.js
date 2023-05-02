const fs = require("fs");

const pwd = function(environment) {
  return {...environment, output: environment.pwd};
};

// decode -> ~, ., ..
// decode(finalPath, symbol) ==> finalPath.
// decode([~, bittu], "~") ==> assign finalpath to home.
// decode([.., bin, bittu], ".." ) ==> remove one dir from final path.
// decode([., bin, bittu], ".") ==> return nothing.
// decode([bin ,bittu]", "bin") ==> return symbol.

const expandPath = function(finalPath, directory) {
  const home = process.env.HOME;

  switch(directory) {
    case "~": return home.split("/");
    case ".": return finalPath;
    case "..": return finalPath.slice(0, -1); 
    default: return [...finalPath, directory]; 
  };
};

const resolvePath = function(environment, path) {
  const home = process.env.HOME;
  const finalPath = environment.pwd.split("/");
  const pathDirectories = path.split("/");
  return pathDirectories.reduce(expandPath, finalPath).join("/");

};

const cd = function(environment, path) {
  //  const pwd = `${environment.pwd}/${path}`;
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
