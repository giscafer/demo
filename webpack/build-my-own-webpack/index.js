/**
 * @created 2022-03-31 14:08:05
 * @description 实现自己的构建工具
 */

const fs = require('fs');
const path = require('path');
// 用于分析源码，产出AST
const parser = require('@babel/parser');
// 用于遍历AST，找到import 声明
const traverse = require('@babel/traverse').default;
// 用于编译，将源码编译为 ES5
const babel = require('@babel/core');
const resolve = require('resolve').sync;

let ID = 0;

/**
 * 维护一个全局 ID，并通过遍历 AST，访问ImportDeclaration节点，收集依赖到deps数组中，同时完成 Babel 降级编译
 * @param {String} filePath
 * @returns
 */
function createModuleInfo(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module',
  });
  // 相关模块依赖数组
  const deps = [];

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      deps.push(node.source.value);
    },
  });

  const id = ID++;
  // 编译为 ES5
  const { code } = babel.transformFromAstSync(ast, null, {
    presets: ['@babel/preset-env'],
  });

  return {
    id, // 该模块对应 ID
    filePath, // 该模块路径
    deps, // 该模块的依赖数组
    code, // 该模块经过 Babel 编译后的代码
  };
}

/**
 * 生成依赖树 Dependency Graph
 * @param {String} entry
 */
function createDependencyGraph(entry) {
  // 获取模块信息
  const entryInfo = createModuleInfo(entry);
  // 项目依赖树
  const graphArr = [];
  graphArr.push(entryInfo);
  // 以入口模块为起点，遍历整个项目依赖的模块，并将模块信息维护到 graphArr 中
  for (const module of graphArr) {
    module.map = {};
    module.deps.forEach((depPath) => {
      const basedir = path.dirname(module.filePath);
      const moduleDepPath = resolve(depPath, { basedir });
      console.log('====================================');
      console.log(moduleDepPath);
      console.log('====================================');
      const moduleInfo = createModuleInfo(moduleDepPath);
      graphArr.push(moduleInfo);
      module.map[depPath] = moduleInfo.id;
    });
  }
  return graphArr;
}

function pack(graph) {
  const moduleArgArr = graph.map((module) => {
    return `${module.id}:{
      factory: (exports,require) => {
        ${module.code}
      },
      map: ${JSON.stringify(module.map)}
    }`;
  });

  const iifeBundler = `(function(module){
    const require=id=>{
      const {factory,map}=module[id];
      const localRequire=requireDeclarationName=>require(map[requireDeclarationName]);
      const module={exports:{}};
      factory(module.exports,localRequire);
      return module.exports;
    }
    require(0)
  })({${moduleArgArr.join(',')}})`;

  return iifeBundler;
}

const graph = createDependencyGraph('../index.js');
const iifeBundler = pack(graph);
fs.writeFileSync('../dist/own-bundle.js', iifeBundler);
