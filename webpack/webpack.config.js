const path = require('path')

module.exports = {
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './source/',
    resolve: {
      alias: {
        '@api': '../../src/api',
        '@utils': '../../src/utils'
      }
    }
  },
}