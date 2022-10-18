import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";

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
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        useTsconfigDeclarationDir: true,
        exclude: [
          // Exclude test files
          /\.test.((js|jsx|ts|tsx))$/,
          // Exclude story files
          /\.stories.((js|jsx|ts|tsx|mdx))$/,
        ],
      }),
      postcss(),
    ],
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