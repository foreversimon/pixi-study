const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const _resolve = p => path.join(__dirname, '..', p)

module.exports = {
  entry: _resolve('src/main.js'),
  output: {
    path: _resolve('dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: _resolve('index.html')
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: _resolve('src/assets'), to: 'assets' }
      ]
    })
  ]
}