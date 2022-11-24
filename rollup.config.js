import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { uglify } from "rollup-plugin-uglify";

export default {
  input: 'bin/lib/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    name: 'main',
    compact: true
  },
  plugins: [json(), commonjs(), nodeResolve(), typescript(), uglify()],
}