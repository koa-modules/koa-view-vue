
const VueSSRPlugin = require('vue-ssr-webpack-plugin')

module.exports = {
  target: 'node',
  entry: './main.server.js',
  output: {
    libraryTarget: 'commonjs2',
    publicPath: '/dist/',
    filename: '[name].server.js'
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
  devtool: '#eval-source-map',
  plugins: [
    new VueSSRPlugin({
      filename: 'main.server.json'
    })
  ]
}
