import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	dts: true,
	clean: true,
	treeshake: true,
	sourcemap: true,
	outDir: "dist",
	noExternal: [/@repo\/.*/], // TODO: this doesn't really work
});
