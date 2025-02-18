// rollup.config.ts
import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      file: "dist/bundle.js",
      // format: "iife",
      format: "cjs",
      // format: "umd",
      name: "MyLibrary",
    },
    plugins: [typescript(), json(), commonjs(), resolve()],
  },
]);
