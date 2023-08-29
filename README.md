# postcss-px2vw

一款 [PostCSS](https://github.com/postcss/postcss) 插件，将 px 转换成 vw 或 rem。

## 安装

```bash
npm i @ten-k/postcss-px2vw -D
```

## 使用

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { PostcssPx2Vw } from "@ten-k/postcss-px2vw";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	css: {
		postcss: {
			plugins: [
				PostcssPx2Vw()
			]
		}
	}
});
```

## 配置

```js
interface Options {
	type?: "vw" | "rem";
	rootValue?: number;
}

const defineOptions: Required<Options> = {
	type: "vw" /** 转换的单位 */,
	rootValue: 375 /** 设计稿宽度(type为vw时) / font-size值(type为rem时) */
};
```

type 为 rem 时，除了传递 rootValue 还需自行设置根元素 font-size 等于 rootValue。
示例：

```js
// vite.config.ts
PostcssPx2Vw({
  type: "rem",
  rootValue: 100
})
```

```css
html, body {
  font-size: 100px;
}
```

## 忽略

### 属性

``` css
/* `Px` or `PX` is ignored by `postcss-px2vw` but still accepted by browsers*/
.ignore {
    width: 1Px; // ignored
    height: 2PX; // ignored
}
```

### 文件

对于头部包含注释/*postcss-px2vw disable*/ 的文件，插件不予处理。
