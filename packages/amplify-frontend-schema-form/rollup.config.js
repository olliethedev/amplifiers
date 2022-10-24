import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import nodePolyfills from 'rollup-plugin-node-polyfills';

const packageJson = require("./package.json");

console.log(dts);
const dtsInstance = dts.default();

const out = [
  {
    input: "src/entry.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    external: ["react", "react-dom"],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      commonjs(),
      json(),
      typescript({
        useTsconfigDeclarationDir: true,
        exclude: [
          // Exclude test files
          /\.test.((js|jsx|ts|tsx))$/,
          // Exclude story files
          /\.stories.((js|jsx|ts|tsx|mdx))$/,
        ],
      }),
      postcss({
        minimize: true,
        modules: true,
        extract: true,
      }),
      
    ],
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: "globalThis", //<-- AWS SDK 
        },
      },
    },
    build: {
      rollupOptions: {
        plugins: [
          // Enable rollup polyfills plugin
          // used during production bundling
          nodePolyfills(),
        ],
      },
    },
  },
  {
    // path to your declaration files root
    input: "./dist/dts/entry.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    external: [/\.scss$/, /\.css$/],   // ignore .css and .scss files
    plugins: [dtsInstance],
  },
];
export default out;
