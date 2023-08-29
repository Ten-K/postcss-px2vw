import { defineConfig } from "tsup";

const config = {
	outDir: "dist",
	clean: true,
	minify: true,
  treeshake: true,
	sourcemap: false
};

export default defineConfig([
	{
		entry: ["index.ts"],
		format: "esm",
		...config
	},
  {
		entry: ["index.ts"],
    dts: true,
		format: "cjs",
		...config
	}
]);
