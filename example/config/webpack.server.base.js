
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')
const webpack = require('webpack')

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
  externals: nodeExternals({
    whitelist: [/\.(css|vue)$/]
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRPlugin({
      filename: 'main.server.json'
    }),
    new VueSSRServerPlugin()
  ],
  devtool: '#eval-source-map'
}
