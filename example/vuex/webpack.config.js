
const base = require('../config/webpack.base')
const merge = require('webpack-merge')
const { resolve } = require('path')

module.exports = merge(base, {
  output: {
    path: resolve(__dirname, './dist')
  }
})
