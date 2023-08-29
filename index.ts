import type { Plugin } from "postcss";

interface Options {
	type?: "vw" | "rem";
	rootValue?: number;
}

const defineOptions: Required<Options> = {
	type: "vw" /** 转换的单位 */,
	rootValue: 375 /** 设计稿宽度(type为vw时) / font-size值(type为rem时) */
};

export const PostcssPx2Vw = (options: Options = defineOptions): Plugin => {
	const { type, rootValue } = Object.assign(defineOptions, options);

	/** 是否跳过当前文件不处理 */
	let skip = false;

	return {
		postcssPlugin: "postcss-px2vw",
		Comment(comment) {
			/** 判断是否有 postcss-px2vw disable 注释 */
			if (comment.text === "postcss-px2vw disable") {
				skip = true;
			}
		},
		Declaration(node) {
			if (skip) return;
			if (!node.value.includes("px")) return;

			function converUnit() {
				const num = parseFloat(node.value);
				if (type === "vw") {
					node.value = `${((num / rootValue) * 100).toFixed(2)}vw`;
				} else if (type === "rem") {
					node.value = `${(num / rootValue).toFixed(2)}rem`;
				}
			}
			converUnit();
		}
	};
};
