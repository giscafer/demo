# DCE（dead code elimination）

基于 acorn ast 实现一个简易 Tree Shaking 脚本

```js
function add(a, b) {
  return a + b;
}
// 该方法应该被摇掉
function multiple(a, b) {
  return a * b;
}
var firstOp = 9;
var secondOp = 10;
add(firstOp, secondOp);
```

- test.js 测试脚本
- jsEmitter.js: AST 产出 JavaScript 代码
- treeShaking.js: 摇树优化
