const acorn = require('acorn');

const l = console.log;
const JSEmitter = require('./jsEmitter');
const fs = require('fs');

// 获取命令行参数
const args = process.argv[2];
const buffer = fs.readFileSync(args).toString();
const body = acorn.parse(buffer, { ecmaVersion: 'latest' }).body;

const jsEmitter = new JSEmitter();
let decls = new Map();
let calledDecls = [];
let code = [];

body.forEach((node) => {
  if (node.type === 'FunctionDeclaration') {
    const code = jsEmitter.run([node]);
    decls.set(jsEmitter.visitNode(node.id), code);
    return;
  }
  if (node.type === 'ExpressionStatement') {
    if (node.expression.type === 'CallExpression') {
      const callNode = node.expression;
      calledDecls.push(jsEmitter.visitIdentifier(callNode.callee));
      const args = callNode.arguments;
      for (const arg of args) {
        if (arg.type === 'Identifier') {
          calledDecls.push(jsEmitter.visitNode(arg));
        }
      }
    }
  }
  if (node.type === 'VariableDeclaration') {
    const kind = node.kind;
    for (const decl of node.declarations) {
      decls.set(
        jsEmitter.visitNode(decl.id),
        jsEmitter.visitVariableDeclarator(decl, kind),
      );
    }
    return;
  }
  if (node.type === 'Identifier') {
    calledDecls.push(node.name);
  }
  code.push(jsEmitter.run([node]));
});

// 生成code

code = calledDecls
  .map((c) => {
    return decls.get(c);
  })
  .concat([code])
  .join('');

fs.writeFileSync('test.shaked.js', code);
