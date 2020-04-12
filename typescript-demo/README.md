# typescript-demo

typescript demo 和 typescript 校验环境配置


### 在项目中 使用 ESLint 做 TypeScript 检测

当涉及到 Lining TypeScript代码时，有两种主要的 Linting 选项可供选择：  TSLint  和  ESLint。TSLint是仅可用于 TypeScript 的lint，而 **ESLint** 支持 JavaScript 和 TypeScript。

在  [TypeScript 2019 RoadMap](https://github.com/Microsoft/TypeScript/issues/29288#developer-productivity-tools-and-integration)中，TypeScript 核心团队解释说 **ESLint具有比TSLint更高性能的体系结构** ，  并且在  为TypeScript提供编辑器整合时，他们 **只会专注于ESLint** 。因此，社区中大家都建议使用 ESLint 来整理 TypeScript 项目。

#### 设置 ESLint 使用 TypeScript

```bash
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
```

- [eslint](https://www.npmjs.com/package/eslint) 核心ESLint linting库
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) 允许ESLint转换TypeScript代码的解析器
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) 包含一堆特定于 TypeScript 的 ESLint 规则的插件

接下来，`.eslintrc.js` 在根项目目录中添加一个  配置文件。这是 TypeScript 项目的示例配置：

```js
module.exports =  {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends:  [
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
 parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
  },
  rules:  {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};
```

如果将 TypeScript 与 React 一起使用，  `eslint-plugin-react` 则应安装dev依赖项，并可以使用以下配置：

```js
module.exports =  {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends:  [
    'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  parserOptions:  {
  ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
  sourceType:  'module',  // Allows for the use of imports
  ecmaFeatures:  {
    jsx:  true,  // Allows for the parsing of JSX
  },
  },
  rules:  {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
  settings:  {
    react:  {
      version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
```

可以在 `extends` 中扩展哪些规则以及在 `rules` 配置使用哪些规则 。

