## 介绍

`开发工具类库`

## 安装

```bash
npm i wxc-tools
```

### vite 插件

- textCompile `多语言编译`

1. 使用

```js
// vite.config.ts
export default defineConfig((mode: ConfigEnv): UserConfig => {
···
plugins: [
    textCompile()
]
···
}

```

2. 需要在根目录创建 wxc.config.json 配置文件

```json
{
  /** text 入口文件 */
  "textEntry": "/src/languages/ts",
  /** text 出口文件 */
  "textOut": "/public/textDir/bitgood-index.json",
  /** json文件上传入口 */
  "jsonEntry": "/public/textDir",
  /** i18n Ally 文案提示地址*/
  "locales": "/locales/zh-CN.json"
}
```
