# 沙箱实现

## Proxy 实现思路

> 参考 https://github.com/umijs/qiankun/blob/master/src/sandbox/proxySandbox.ts

- `rawWindow` 为 原始 window 对象，`fakeWindow` 作为 Proxy 代理对象
- 沙箱环境下通过代理 fakeWindow 对象对 set 劫持，存储记录 `rawWindow` 原始值`modifiedPropsOriginalValueMapInSandbox`，和记录沙箱环境下新增的全局变量 `addedPropsMapInSandbox`，以及记录新增和修改的全局变量 `currentUpdatedPropsValueMap`。
- 截止 set\set\definedProperty
- 避免通过`window.top\window.self\window.parent\window.window`绕开 沙箱环境

## diff 实现思路（不支持 Proxy 的情况）

> snapshotSandbox
