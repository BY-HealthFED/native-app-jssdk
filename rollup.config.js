import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
  name: 'byhealth-native-jssdk',
  input: 'src/index.js',
  output: {
    file: pkg.main,
    format: 'umd',
  },
  plugins: [
    babel({
      plugins: ['external-helpers'],
      externalHelpers: true
    })
  ]
}
