const esprima = require("esprima");
const fs = require("fs");

const program = fs.readFileSync('example.js', { encoding: 'utf8' });
const ast = esprima.parse(program);

console.log(ast);
