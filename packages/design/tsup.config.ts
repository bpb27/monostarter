import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm"],
  dts: true, // need declaration files for consumers
  clean: true,
  sourcemap: true,
  external: ["@repo/design-system", "react", "react-dom"], // don't bundle react (consumers provide it)
});
