# uni-app + vue3 + ts + vite

## 基础框架 (uni-app + vue3 + vite + ts)

1.创建 Vue3 / Vite 工程

```shell
# 创建以 javascript 开发的工程
npx degit dcloudio/uni-preset-vue#vite team-helper

# 创建以 typescript 开发的工程
npx degit dcloudio/uni-preset-vue#vite-ts team-helper
```

2.进入工程项目

```shell
cd team-helper
```

3.安装依赖

```shell
yarn
```

4.运行

```shell
# 运行到 h5
npm run dev:h5
# 运行到 app
npm run dev:app
# 运行到 微信小程序
npm run dev:mp-weixin
```

5.打包

```shell
# 打包到 h5
npm run build:h5
# 打包到 app
npm run build:app
# 打包到 微信小程序
npm run build:mp-weixin
```

## 自动格式化代码 (eslint + prettier)

1.安装相关 npm 包

```js
  "devDependencies": {
    "@types/node": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^5.15.0",
    "@typescript-eslint/parser": "^5.15.0",
    "eslint": "^8.11.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-vue": "^8.5.0",
    "prettier": "2.6.0",
    "vite-plugin-eslint": "^1.3.0"
  }
```

2.配置 .eslintrc.js 文件

```js
module.exports = {
  env: { node: true },
  globals: { uni: true, wx: true, my: true, swan: true },
  parser: 'vue-eslint-parser',
  parserOptions: { parser: '@typescript-eslint/parser', sourceType: 'module' },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 0,
  },
}
```

3.配置 .prettierrc.js 文件

```js
module.exports = {
  printWidth: 120,
  tabWidth: 2,
  tabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  tailingComma: 'all',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'auto',
}
```

4.配置 vscode/setting.json 文件

```js
{
 "editor.tabSize": 2,

 "vetur.validation.template": false,
 "editor.formatOnSave": true,
 "editor.codeActionsOnSave": {
   "source.fixAll.eslint": true
 },
 "[vue]": {
   "editor.defaultFormatter": "esbenp.prettier-vscode"
 },
 "[javascript]": {
   "editor.defaultFormatter": "esbenp.prettier-vscode"
 },
 "[typescript]": {
   "editor.defaultFormatter": "esbenp.prettier-vscode"
 }
}

```

5.配置 tsconfig.json 文件

```js
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "useDefineForClassFields": true,
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "sourceMap": true,
    "skipLibCheck": true,
    "noImplicitAny": false,
    "resolveJsonModule": true,
    "noUnusedLocals": false,
    "baseUrl": ".",
    "paths": { "~/*": ["./src/*"] },
    "lib": ["esnext", "dom"],
    "types": ["@dcloudio/types", "node"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}

```

## 使用 SASS

1.安装依赖

```shell
yarn add -D sass node-sass sass-loader
```

2.配置全局公共变量并导入

- 新建文件 src/style/var.scss

```scss
$test-size: 400rpx;
```

- 修改 vite.config.ts 文件

```js
import { defineConfig, loadEnv, UserConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import * as path from 'path'

import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(command, mode, env)

  let config: UserConfig = {
    resolve: { alias: { '~': path.resolve(__dirname, './src') } },
    css: {
      preprocessorOptions: {
        scss: { charset: false, additionalData: `@import "~/styles/var.scss";` },
      },
    },

    plugins: [uni(), eslintPlugin()],
  }

  if (command === 'serve') {
    // 仅开发
    return config
  } else {
    // 生产
    return config
  }
})
```

## 使用 pinia

1.安装依赖

```shell
yarn add pinia pinia-plugin-persistedstate
```

2.创建 store/useStore.ts 文件

```ts
import { defineStore, createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { User } from '../types/user'

type StateType = {
  user?: User
}
export default defineStore('global', {
  persist: {
    key: 'pinia',
    paths: ['user'],
  },
  state: (): StateType => ({
    user: undefined,
  }),
  actions: {
    setData<T extends keyof StateType>({ key, value }: { key: T; value: any }) {
      this[key] = value
    },
  },
})

export const pinia = createPinia().use(
  createPersistedState({
    storage: {
      getItem(key: string): string | null {
        return uni.getStorageSync(key)
      },
      setItem(key: string, value: string) {
        uni.setStorageSync(key, value)
      },
    },
  })
)
```

3.在 main.ts 中引入

```ts
import { createSSRApp } from 'vue'
import App from './App.vue'
import { pinia } from './store/useStore'

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  return {
    app,
  }
}
```

4.代码中使用

```ts
import useStore from '@/store/useStore'
const store = useStore()

// 取值
console.log(store.user)

// 赋值
store.setData({ key: 'user', value: { id: 0, name: 'oil ' } })
```

> 具体查看项目代码

## 使用 husky, commitlint

- 使用 husky 触发 Git 钩子 Ts 检查和 Eslint 检查

  1.安装依赖

  ```shell
  yarn add husky -D
  ```

  2.初始化 husky

  ```shell
  npx husky install
  ```

  3.添加 pre-commit 命令 (测试)

  ```
  npx husky add .husky/pre-commit "echo test"
  ```

  4.修改文件 .husky/pre-commit

  ```shell
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"

  echo "---eslint start---"
  npm run lint
  echo "---eslint end---"

  echo "---ts lint start---"
  npm run tsc
  echo "---ts lint end---"
  ```

- 使用 commitlint 控制提交说明

  1.安装依赖

  ```shell
  yarn add -D @commitlint/{cli,config-conventional}
  ```

  2.新建 commitlint.config.js 文件

  ```js
  module.exports = { extends: ['@commitlint/config-conventional'] }
  ```

  3.添加 husky 的 commit-msg 命令

  ```shell
  npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
  ```

## 使用 uni-ui

由于试了一圈，发现 uview 不支持 vue3；vant 虽然支持 vue3，但是无法编译问题很多；firstUI 吃相太难看；于是决定还是使用官方的 uni-ui

1.安装依赖

```shell
yarn add @dcloudio/uni-ui
```

2.新建文件 vue.config.js

```js
module.exports = {
  transpileDependencies: ['@dcloudio/uni-ui'],
}
```

3.在 pages.json 文件中配置

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      // uni-ui 规则如下配置
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
    }
  },

  // 其他内容
  "pages": [
    // ...
  ]
}
```
