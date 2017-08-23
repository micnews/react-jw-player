/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/react-jw-player.jsx',
  output: {
    file: 'dist/react-jw-player.js',
    format: 'umd',
  },
  name: 'ReactJWPlayer',
  external: ['react', 'prop-types'],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes',
  },
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        ['es2015', { modules: false }],
        'react',
      ],
      plugins: ['transform-object-assign'],
    }),
    uglify(),
  ],
};
