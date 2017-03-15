
const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  target: 'node',
  entry: './main.server.js',
  output: {
    path: resolve(__dirname, './dist'),
    libraryTarget: 'umd', // 'commonjs2',
    publicPath: '/dist/',
    filename: 'build.server.js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}
