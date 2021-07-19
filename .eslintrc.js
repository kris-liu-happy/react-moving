module.exports = {
  // // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量
  "env": {
    "browser": true,
    "es6": true,
    "commonjs": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  // // 脚本在执行期间访问的额外的全局变量
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  // 指定校验的ECMAScript的版本及特性
  "parserOptions": {
    "ecmaFeatures": {
      // Enable JSX support.
      "jsx": true
    },
    "ecmaVersion": 11, // ECMAScript版本，11为ES11
    "sourceType": "module" //默认script，如果代码是ECMAScript模块，设置为module
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  // Enable JSX support.
  "rules": {
    "indent": ["error", 2], // JavaScript代码强制使用一致的缩进：2格缩进
    "@typescript-eslint/no-explicit-any": 0,
  }
};
