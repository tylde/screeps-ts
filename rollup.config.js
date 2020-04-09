import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const plugins = [
  clear({targets: ['default']}),
  resolve(),
  typescript({
    abortOnError: false,
    tsconfig: './tsconfig.json',
    clean: true
  })
];

const inputFile = 'src/main.ts';

const outputFile = 'default/main.js';

export default {
  input: inputFile,
  output: {
    file: outputFile,
    format: 'cjs',
    sourcemap: true
  },
  plugins
};
