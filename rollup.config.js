import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import postcss from 'rollup-plugin-postcss'

const name = 'ATAmbient'

export default [{
  input: 'src/rollup_index.js',
  output: {
    file: 'dist/index.dev.js',
    format: 'umd',
    name
  },
  plugins: [
    resolve(),
    babel({
      comments: true,
      plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
      presets: [["@babel/preset-env"]],
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    commonjs(),
    postcss()
  ]
}, {
  input: 'src/rollup_index.js',
  output: {
    file: 'dist/index.min.js',
    sourcemap: true,
    format: 'umd',
    name
  },
  plugins: [
    resolve(),
    babel({
      plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
      presets: [["@babel/preset-env"]],
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    commonjs(),
    postcss(),
    uglify()
  ]
}]
