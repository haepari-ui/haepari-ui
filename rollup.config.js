import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: './src/index.js',
  external: [/@babel\/runtime/],
  plugins: [
    babel({
      babelHelpers: 'runtime',
      extensions,
      include: ['src/**/*'],
      configFile: './.babelrc'
    }),
    commonjs({
      extensions
    }),
    nodeResolve({ extensions }),
    peerDepsExternal(),
    terser()
  ],
  output: {
    file: './dist/bundle.js',
    format: 'es',
    sourcemap: true
  }
};
